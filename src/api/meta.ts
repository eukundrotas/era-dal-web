import { Hono } from 'hono'
import type { AgentRole } from '../types/orchestration'
import {
  getAgent,
  listAgents,
  createAgent,
  updateAgent,
  deleteAgent,
} from '../lib/db/agents'
import {
  getScenario,
  listScenarios,
  createScenario,
  incrementRunCount,
  deleteScenario,
} from '../lib/db/scenarios'
import { logAction, listLogs, getTodayStats, confirmPendingAction } from '../lib/db/action-logs'
import { now } from '../lib/db/index'

type Env = {
  Bindings: {
    DB: D1Database
    KV?: KVNamespace
  }
}

export const metaApi = new Hono<Env>()

// ─── Agents ────────────────────────────────────────────────────────────────

metaApi.get('/agents', async (c) => {
  const db = c.env.DB
  const role = c.req.query('role') as AgentRole | undefined
  const agents = await listAgents(db, role)
  return c.json({ agents, total: agents.length })
})

metaApi.get('/agents/:id', async (c) => {
  const db = c.env.DB
  const agent = await getAgent(db, c.req.param('id'))
  if (!agent) return c.json({ error: 'Agent not found' }, 404)
  return c.json(agent)
})

metaApi.post('/agents', async (c) => {
  const db = c.env.DB
  let body: any
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  const required = ['role', 'nameEn', 'nameRu', 'instructions']
  for (const field of required) {
    if (!body[field]) return c.json({ error: `Missing required field: ${field}` }, 400)
  }

  const agent = await createAgent(db, {
    role: body.role,
    nameEn: body.nameEn,
    nameRu: body.nameRu,
    instructions: body.instructions,
    tools: body.tools ?? [],
    thinkingMode: body.thinkingMode ?? 'standard',
    knowledgeBaseIds: body.knowledgeBaseIds ?? [],
    outputFormat: body.outputFormat ?? 'text',
    maxTokens: body.maxTokens ?? 2048,
    temperature: body.temperature ?? 0.7,
  })

  return c.json(agent, 201)
})

metaApi.put('/agents/:id', async (c) => {
  const db = c.env.DB
  let body: any
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  const agent = await updateAgent(db, c.req.param('id'), body)
  if (!agent) return c.json({ error: 'Agent not found' }, 404)
  return c.json(agent)
})

metaApi.delete('/agents/:id', async (c) => {
  const db = c.env.DB
  const deleted = await deleteAgent(db, c.req.param('id'))
  if (!deleted) return c.json({ error: 'Agent not found' }, 404)
  return c.json({ success: true })
})

// ─── Scenarios ─────────────────────────────────────────────────────────────

metaApi.get('/scenarios', async (c) => {
  const db = c.env.DB
  const category = c.req.query('category') as any
  const scenarios = await listScenarios(db, category)
  return c.json({ scenarios, total: scenarios.length })
})

metaApi.get('/scenarios/:id', async (c) => {
  const db = c.env.DB
  const scenario = await getScenario(db, c.req.param('id'))
  if (!scenario) return c.json({ error: 'Scenario not found' }, 404)
  return c.json(scenario)
})

metaApi.post('/scenarios', async (c) => {
  const db = c.env.DB
  let body: any
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  const required = ['name', 'description', 'category', 'strategy']
  for (const field of required) {
    if (!body[field]) return c.json({ error: `Missing required field: ${field}` }, 400)
  }

  const scenario = await createScenario(db, {
    name: body.name,
    description: body.description,
    category: body.category,
    strategy: body.strategy,
    steps: body.steps ?? [],
    estimatedTotalSeconds: body.estimatedTotalSeconds ?? 0,
    estimatedTotalCostUsd: body.estimatedTotalCostUsd ?? 0,
  })

  return c.json(scenario, 201)
})

metaApi.delete('/scenarios/:id', async (c) => {
  const db = c.env.DB
  const deleted = await deleteScenario(db, c.req.param('id'))
  if (!deleted) return c.json({ error: 'Scenario not found' }, 404)
  return c.json({ success: true })
})

// ─── Scenario execution ────────────────────────────────────────────────────

metaApi.post('/scenarios/:id/run', async (c) => {
  const db = c.env.DB
  const scenarioId = c.req.param('id')

  const scenario = await getScenario(db, scenarioId)
  if (!scenario) return c.json({ error: 'Scenario not found' }, 404)

  let body: { input?: string; userId?: string } = {}
  try { body = await c.req.json() } catch { /* input is optional */ }

  const userId = body.userId ?? 'anonymous'
  const inputText = body.input ?? ''

  interface StepResult {
    stepId: string
    orderIndex: number
    agentRole: string
    action: string
    autonomyLevel: string
    status: 'success' | 'pending_confirmation' | 'cancelled' | 'skipped'
    logId: string
    outputData?: string
  }

  const stepResults: StepResult[] = []
  let pausedAt: { stepId: string; logId: string; action: string } | null = null

  for (const step of scenario.steps) {
    if (step.autonomyLevel === 'BLOCKED') {
      const entry = await logAction(db, {
        scenarioId,
        agentId: step.agentId || 'unassigned',
        agentRole: step.agentRole,
        action: step.action,
        autonomyLevel: step.autonomyLevel,
        status: 'cancelled',
        inputData: inputText || undefined,
        outputData: undefined,
        errorMessage: 'Step is BLOCKED — requires manual execution',
        costUsd: 0,
        durationMs: 0,
        thinkingMode: step.thinkingModeOverride ?? 'standard',
        completedAt: now(),
      })
      stepResults.push({
        stepId: step.id,
        orderIndex: step.orderIndex,
        agentRole: step.agentRole,
        action: step.action,
        autonomyLevel: step.autonomyLevel,
        status: 'cancelled',
        logId: entry.id,
      })
      continue
    }

    if (step.autonomyLevel === 'REQUIRES_CONFIRMATION') {
      const entry = await logAction(db, {
        scenarioId,
        agentId: step.agentId || 'unassigned',
        agentRole: step.agentRole,
        action: step.action,
        autonomyLevel: step.autonomyLevel,
        status: 'pending_confirmation',
        inputData: inputText || undefined,
        costUsd: 0,
        durationMs: 0,
        thinkingMode: step.thinkingModeOverride ?? 'standard',
      })
      stepResults.push({
        stepId: step.id,
        orderIndex: step.orderIndex,
        agentRole: step.agentRole,
        action: step.action,
        autonomyLevel: step.autonomyLevel,
        status: 'pending_confirmation',
        logId: entry.id,
      })
      pausedAt = { stepId: step.id, logId: entry.id, action: step.action }
      break
    }

    // SAFE — simulate execution (T-META-5 will wire real LLM calls)
    const startMs = Date.now()
    const simulatedOutput = `[Simulated] ${step.agentRole} completed: ${step.action}`
    const durationMs = Date.now() - startMs

    const entry = await logAction(db, {
      scenarioId,
      agentId: step.agentId || 'unassigned',
      agentRole: step.agentRole,
      action: step.action,
      autonomyLevel: step.autonomyLevel,
      status: 'success',
      inputData: inputText || undefined,
      outputData: simulatedOutput,
      costUsd: step.estimatedCostUsd,
      durationMs,
      thinkingMode: step.thinkingModeOverride ?? 'standard',
      completedAt: now(),
    })

    stepResults.push({
      stepId: step.id,
      orderIndex: step.orderIndex,
      agentRole: step.agentRole,
      action: step.action,
      autonomyLevel: step.autonomyLevel,
      status: 'success',
      logId: entry.id,
      outputData: simulatedOutput,
    })
  }

  await incrementRunCount(db, scenarioId)

  const overallStatus = pausedAt
    ? 'paused'
    : stepResults.every(s => s.status === 'success' || s.status === 'cancelled')
    ? 'completed'
    : 'partial'

  return c.json({
    scenarioId,
    scenarioName: scenario.name,
    status: overallStatus,
    steps: stepResults,
    pausedAt,
    totalSteps: scenario.steps.length,
    completedSteps: stepResults.filter(s => s.status === 'success').length,
  })
})

// ─── Action logs ───────────────────────────────────────────────────────────

metaApi.get('/logs', async (c) => {
  const db = c.env.DB
  const planId = c.req.query('planId')
  const agentId = c.req.query('agentId')
  const status = c.req.query('status') as any
  const limit = parseInt(c.req.query('limit') ?? '50')
  const offset = parseInt(c.req.query('offset') ?? '0')

  const logs = await listLogs(db, { planId, agentId, status, limit, offset })
  return c.json({ logs, total: logs.length })
})

metaApi.get('/logs/today', async (c) => {
  const db = c.env.DB
  const stats = await getTodayStats(db)
  return c.json(stats)
})

metaApi.post('/logs/:id/confirm', async (c) => {
  const db = c.env.DB
  let body: { userId?: string } = {}
  try { body = await c.req.json() } catch { /* userId optional */ }

  const confirmed = await confirmPendingAction(
    db,
    c.req.param('id'),
    body.userId ?? 'anonymous'
  )

  if (!confirmed) {
    return c.json({ error: 'Log entry not found or not pending confirmation' }, 404)
  }
  return c.json({ success: true })
})
