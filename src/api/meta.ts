import { Hono } from 'hono'
import type { AgentRole, MetaPlanLLMResponse, OrchestrationStrategy } from '../types/orchestration'
import type { ThinkingMode } from '../types/thinking-modes'
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
import {
  createPlanFromLLMResponse,
  getPlan,
  listPlans,
} from '../lib/db/meta-plans'
import { logAction, listLogs, getTodayStats, confirmPendingAction } from '../lib/db/action-logs'
import { now } from '../lib/db/index'
import { META_SYSTEM_PROMPT } from '../lib/meta-system-prompt'

// ─── Constants for validation ──────────────────────────────────────────────

const VALID_STRATEGIES: OrchestrationStrategy[] = [
  'SINGLE', 'PARALLEL', 'FALLBACK', 'RELAY',
  'VERIFIED', 'DEBATE', 'PLANNER', 'EXPERT_PANEL',
]

const VALID_MODES: ThinkingMode[] = [
  'standard', 'triz', 'lateral', 'systems', 'design',
  'first_principles', 'critical', 'divergent', 'convergent',
  'bayesian', 'six_hats', 'quantum', 'abductive',
  'metacognitive', 'synectics',
]

const VALID_AGENT_ROLES: AgentRole[] = [
  'lead_researcher', 'market_analyst', 'copywriter', 'sales_director',
  'marketing_strategist', 'quality_controller', 'crm_agent', 'business_radar',
  'support_agent', 'project_manager', 'legal_assistant', 'technical_agent',
  'hr_assistant', 'financial_analyst', 'innovation_strategist', 'custom',
]

const VALID_AUTONOMY = ['SAFE', 'REQUIRES_CONFIRMATION', 'BLOCKED']

const DEFAULT_PLANNING_MODEL = 'openai/gpt-4o-mini'

// ─── LLM response validator ────────────────────────────────────────────────

function validateLLMResponse(raw: unknown): { ok: true; data: MetaPlanLLMResponse } | { ok: false; error: string } {
  if (typeof raw !== 'object' || raw === null) return { ok: false, error: 'Response is not an object' }
  const r = raw as Record<string, unknown>

  if (!VALID_STRATEGIES.includes(r.strategy as OrchestrationStrategy))
    return { ok: false, error: `Invalid strategy: ${r.strategy}` }

  if (!VALID_MODES.includes(r.thinkingMode as ThinkingMode))
    return { ok: false, error: `Invalid thinkingMode: ${r.thinkingMode}` }

  if (typeof r.estimatedCostUsd !== 'number')
    return { ok: false, error: 'estimatedCostUsd must be a number' }

  if (typeof r.estimatedSeconds !== 'number')
    return { ok: false, error: 'estimatedSeconds must be a number' }

  if (typeof r.reasoning !== 'string' || !r.reasoning.trim())
    return { ok: false, error: 'reasoning must be a non-empty string' }

  if (!Array.isArray(r.steps) || r.steps.length === 0)
    return { ok: false, error: 'steps must be a non-empty array' }

  for (let i = 0; i < r.steps.length; i++) {
    const s = r.steps[i] as Record<string, unknown>

    if (s.orderIndex !== i + 1)
      return { ok: false, error: `steps[${i}].orderIndex must be ${i + 1}, got ${s.orderIndex}` }

    if (!VALID_AGENT_ROLES.includes(s.agentRole as AgentRole))
      return { ok: false, error: `steps[${i}].agentRole invalid: ${s.agentRole}` }

    if (typeof s.action !== 'string' || !s.action.trim())
      return { ok: false, error: `steps[${i}].action must be a non-empty string` }

    if (!VALID_AUTONOMY.includes(s.autonomyLevel as string))
      return { ok: false, error: `steps[${i}].autonomyLevel invalid: ${s.autonomyLevel}` }

    if (s.thinkingModeOverride !== null && s.thinkingModeOverride !== undefined &&
        !VALID_MODES.includes(s.thinkingModeOverride as ThinkingMode))
      return { ok: false, error: `steps[${i}].thinkingModeOverride invalid: ${s.thinkingModeOverride}` }

    if (typeof s.estimatedSeconds !== 'number')
      return { ok: false, error: `steps[${i}].estimatedSeconds must be a number` }

    if (typeof s.estimatedCostUsd !== 'number')
      return { ok: false, error: `steps[${i}].estimatedCostUsd must be a number` }
  }

  return { ok: true, data: r as unknown as MetaPlanLLMResponse }
}

type Env = {
  Bindings: {
    DB: D1Database
    KV?: KVNamespace
  }
}

export const metaApi = new Hono<Env>()

// ─── Meta Plans ────────────────────────────────────────────────────────────

metaApi.post('/plan', async (c) => {
  const db = c.env.DB
  let body: any
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  const {
    userPrompt,
    apiKey,
    model = DEFAULT_PLANNING_MODEL,
    userId = 'anonymous',
    budgetUsd = null,
    freeModelsOnly = false,
    maxSteps = 10,
  } = body

  if (!userPrompt || typeof userPrompt !== 'string') {
    return c.json({ error: 'userPrompt is required' }, 400)
  }
  if (!apiKey || typeof apiKey !== 'string') {
    return c.json({ error: 'apiKey is required' }, 400)
  }

  const inputContext = {
    userPrompt,
    availableAgents: VALID_AGENT_ROLES.filter(r => r !== 'custom'),
    availableThinkingModes: VALID_MODES,
    availableStrategies: VALID_STRATEGIES,
    budgetUsd,
    projectPolicy: {
      freeModelsOnly,
      allowedAgents: null,
      maxSteps,
      requireConfirmationFor: ['email_send', 'crm_write', 'publish', 'delete'],
    },
    recentSuccessfulPlans: [],
  }

  let llmRaw: string
  let modelUsed = model
  let usage: unknown

  try {
    const llmRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://era-dal.pages.dev',
        'X-Title': 'ERA DAL Meta-Orchestrator',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: META_SYSTEM_PROMPT },
          { role: 'user', content: JSON.stringify(inputContext, null, 2) },
        ],
        temperature: 0.1,
        max_tokens: 4096,
      }),
    })

    if (!llmRes.ok) {
      const errData = await llmRes.json().catch(() => ({})) as any
      return c.json({
        error: errData?.error?.message ?? `LLM API error: HTTP ${llmRes.status}`,
      }, 502)
    }

    const llmData = await llmRes.json() as any
    llmRaw = llmData?.choices?.[0]?.message?.content ?? ''
    usage = llmData?.usage
  } catch (err: any) {
    return c.json({ error: `LLM request failed: ${err?.message ?? 'unknown'}` }, 502)
  }

  // Extract JSON even if the LLM accidentally wraps it in fences
  const jsonMatch = llmRaw.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    return c.json({ error: 'LLM returned no JSON object', raw: llmRaw }, 502)
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(jsonMatch[0])
  } catch {
    return c.json({ error: 'LLM JSON parse failed', raw: llmRaw }, 502)
  }

  const validation = validateLLMResponse(parsed)
  if (!validation.ok) {
    return c.json({ error: `LLM response invalid: ${validation.error}`, raw: llmRaw }, 502)
  }

  const plan = await createPlanFromLLMResponse(db, userId, userPrompt, validation.data)

  return c.json({
    plan,
    reasoning: validation.data.reasoning,
    modelUsed,
    usage,
  }, 201)
})

metaApi.get('/plans', async (c) => {
  const db = c.env.DB
  const userId = c.req.query('userId') ?? 'anonymous'
  const limit = parseInt(c.req.query('limit') ?? '20')
  const offset = parseInt(c.req.query('offset') ?? '0')

  const plans = await listPlans(db, userId, limit, offset)
  return c.json({ plans, total: plans.length })
})

metaApi.get('/plans/:id', async (c) => {
  const db = c.env.DB
  const plan = await getPlan(db, c.req.param('id'))
  if (!plan) return c.json({ error: 'Plan not found' }, 404)
  return c.json(plan)
})

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
