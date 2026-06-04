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
  updatePlanStatus,
  updateStep,
  confirmStep,
} from '../lib/db/meta-plans'
import { logAction, listLogs, getTodayStats, confirmPendingAction } from '../lib/db/action-logs'
import { now } from '../lib/db/index'
import { META_SYSTEM_PROMPT } from '../lib/meta-system-prompt'
import { applyThinkingMode } from '../types/thinking-modes'

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
  'hr_assistant', 'financial_analyst', 'innovation_strategist',
  // Scientific & experimental
  'research_scientist', 'data_scientist', 'experiment_designer',
  'peer_reviewer', 'literature_researcher',
  // AI & LLM engineering
  'ml_engineer', 'prompt_engineer', 'llm_engineer', 'ai_architect', 'mlops_engineer',
  'custom',
]

const VALID_AUTONOMY = ['SAFE', 'REQUIRES_CONFIRMATION', 'BLOCKED']

const DEFAULT_PLANNING_MODEL = 'openai/gpt-4o-mini'
const DEFAULT_EXECUTION_MODEL = 'openai/gpt-4o-mini'

// ─── Default role instructions ─────────────────────────────────────────────

const ROLE_INSTRUCTIONS: Partial<Record<AgentRole, string>> = {
  lead_researcher:      'You are a Lead Researcher. Find, collect, and organise information about leads, companies, and contacts. Output structured, factual data. Cite sources where possible.',
  market_analyst:       'You are a Market Analyst. Analyse market data, identify trends, segment audiences, and score opportunities. Produce clear, data-driven insights.',
  copywriter:           'You are a Copywriter. Write compelling, clear, and audience-appropriate content. Adapt tone and format to the brief. Output polished, ready-to-use text.',
  sales_director:       'You are a Sales Director. Develop outreach strategies, prioritise accounts, and craft persuasive sales messaging aligned with business goals.',
  marketing_strategist: 'You are a Marketing Strategist. Design campaign strategies, channel plans, and positioning frameworks. Output actionable, measurable plans.',
  quality_controller:   'You are a Quality Controller. Review outputs for completeness, accuracy, consistency, and compliance. Identify gaps and provide a structured quality report.',
  crm_agent:            'You are a CRM Agent. Manage contact data, log interactions, and update records. Output precise data operations in a structured format.',
  business_radar:       'You are a Business Radar agent. Monitor market signals, competitor moves, and industry news. Summarise findings with relevance scores.',
  support_agent:        'You are a Support Agent. Resolve customer queries with empathy and accuracy. Escalate when needed. Output clear, friendly, helpful responses.',
  project_manager:      'You are a Project Manager. Decompose tasks, assign owners, set milestones, and track risks. Output structured plans with owners and deadlines.',
  legal_assistant:      'You are a Legal Assistant. Review documents for compliance and risk. Flag issues clearly. Do not give formal legal advice — summarise concerns for human review.',
  technical_agent:      'You are a Technical Agent. Analyse technical requirements, write or review code, and diagnose issues. Output precise, working technical artefacts.',
  hr_assistant:         'You are an HR Assistant. Draft job descriptions, evaluate profiles, and support HR processes. Output professional, fair, and clear HR documents.',
  financial_analyst:    'You are a Financial Analyst. Build models, analyse data, and produce forecasts. Output structured financial insights with assumptions stated.',
  innovation_strategist:'You are an Innovation Strategist. Identify breakthrough opportunities, challenge assumptions, and generate novel solutions. Output bold, creative, evidence-based ideas.',
  // ─── Scientific & experimental ───
  research_scientist:   'You are a Research Scientist. Formulate testable hypotheses, design rigorous methodology, and reason via the scientific method. State assumptions, variables, controls, and falsifiability criteria. Output structured research plans grounded in evidence.',
  data_scientist:       'You are a Data Scientist. Perform statistical analysis, feature engineering, and model selection. Quantify uncertainty, report effect sizes and confidence intervals, and avoid p-hacking. Output reproducible, statistically sound analyses.',
  experiment_designer:  'You are an Experiment Designer. Design controlled experiments and A/B tests: define hypotheses, control/treatment groups, sample size and power, randomisation, and success metrics. Output a complete, unbiased experimental protocol.',
  peer_reviewer:        'You are a Peer Reviewer. Critically evaluate methodology, validity, reproducibility, statistics, and conclusions. Identify confounds, biases, and overclaiming. Output a structured, constructive review with severity-rated findings.',
  literature_researcher:'You are a Literature Researcher. Conduct systematic reviews: search, screen, and synthesise prior work. Summarise findings, identify gaps and contradictions, and cite sources. Output an organised, referenced literature synthesis.',
  // ─── AI & LLM engineering ───
  ml_engineer:          'You are an ML Engineer. Design training pipelines, select architectures, tune hyperparameters, and define evaluation metrics. Address data leakage, overfitting, and reproducibility. Output precise, production-minded ML specifications and code.',
  prompt_engineer:      'You are a Prompt Engineer. Craft, test, and optimise prompts for reliability and quality. Apply few-shot, chain-of-thought, and structured-output techniques. Define eval criteria and edge cases. Output well-structured, tested prompt templates.',
  llm_engineer:         'You are an LLM Engineer. Build RAG pipelines, fine-tuning workflows, and LLM evaluations. Handle chunking, embeddings, retrieval, context windows, and hallucination mitigation. Output concrete, measurable LLM system designs.',
  ai_architect:         'You are an AI Architect. Design end-to-end AI system architecture: data flow, model serving, orchestration, scalability, cost, and safety. Make explicit trade-offs. Output clear architecture diagrams-as-text and decision rationale.',
  mlops_engineer:       'You are an MLOps Engineer. Design deployment, CI/CD, monitoring, observability, and model lifecycle management. Address drift, rollback, versioning, and reliability. Output operational, infrastructure-aware specifications.',
  custom:               'You are a specialised AI agent. Follow the task instructions precisely and produce high-quality, structured output.',
}

// ─── Execution helper — call OpenRouter for one step ───────────────────────

async function executeStepWithLLM(params: {
  apiKey: string
  model: string
  role: AgentRole
  action: string
  thinkingMode: ThinkingMode
  agentInstructions?: string
  contextFromPreviousSteps: string
}): Promise<{ output: string; costUsd: number; durationMs: number }> {
  const instructions = params.agentInstructions ?? ROLE_INSTRUCTIONS[params.role] ?? ROLE_INSTRUCTIONS.custom!

  const contextBlock = params.contextFromPreviousSteps
    ? `\n\n--- Context from previous steps ---\n${params.contextFromPreviousSteps}\n---`
    : ''

  const baseMessages: Array<{ role: string; content: string }> = [
    { role: 'system', content: instructions },
    { role: 'user', content: `${params.action}${contextBlock}` },
  ]

  const messages = applyThinkingMode(baseMessages, params.thinkingMode)

  const startMs = Date.now()

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${params.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://era-dal.pages.dev',
      'X-Title': 'ERA DAL Execution',
    },
    body: JSON.stringify({
      model: params.model,
      messages,
      temperature: 0.4,
      max_tokens: 2048,
    }),
  })

  const durationMs = Date.now() - startMs

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as any
    throw new Error(err?.error?.message ?? `LLM HTTP ${res.status}`)
  }

  const data = await res.json() as any
  const output = data?.choices?.[0]?.message?.content ?? ''
  const totalTokens = data?.usage?.total_tokens ?? 0
  const costUsd = totalTokens * 0.00000015 // gpt-4o-mini approx

  return { output, costUsd, durationMs }
}

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

// ─── Plan execution ────────────────────────────────────────────────────────

metaApi.post('/plans/:id/execute', async (c) => {
  const db = c.env.DB
  const planId = c.req.param('id')

  const plan = await getPlan(db, planId)
  if (!plan) return c.json({ error: 'Plan not found' }, 404)

  if (plan.status === 'completed') return c.json({ error: 'Plan already completed' }, 409)
  if (plan.status === 'running')   return c.json({ error: 'Plan already running' }, 409)
  if (plan.status === 'failed')    return c.json({ error: 'Plan failed — create a new plan' }, 409)
  if (plan.status === 'cancelled') return c.json({ error: 'Plan cancelled' }, 409)

  let body: { apiKey?: string; model?: string; userId?: string } = {}
  try { body = await c.req.json() } catch { /* all fields optional */ }

  const apiKey = body.apiKey
  if (!apiKey) return c.json({ error: 'apiKey is required to execute steps' }, 400)

  const model = body.model ?? DEFAULT_EXECUTION_MODEL
  const userId = body.userId ?? 'anonymous'

  await updatePlanStatus(db, planId, 'running')

  // Collect outputs from already-done steps for context chaining
  const doneOutputs: string[] = plan.steps
    .filter(s => s.status === 'done' && s.outputData)
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map(s => `Step ${s.orderIndex} (${s.agentRole}): ${s.outputData}`)

  const pendingSteps = plan.steps
    .filter(s => s.status === 'pending')
    .sort((a, b) => a.orderIndex - b.orderIndex)

  if (pendingSteps.length === 0) {
    await updatePlanStatus(db, planId, 'completed')
    return c.json({ planId, status: 'completed', completedSteps: plan.steps.length, pendingSteps: 0 })
  }

  interface StepResult {
    stepId: string
    orderIndex: number
    agentRole: string
    action: string
    autonomyLevel: string
    status: 'done' | 'skipped' | 'failed' | 'pending_confirmation'
    logId: string
    outputData?: string
    errorMessage?: string
    costUsd?: number
    durationMs?: number
  }

  const results: StepResult[] = []
  let pausedAt: { stepId: string; logId: string; action: string; orderIndex: number } | null = null
  let accumulatedCostUsd = 0

  for (const step of pendingSteps) {
    // ── BLOCKED ──────────────────────────────────────────────────────────
    if (step.autonomyLevel === 'BLOCKED') {
      await updateStep(db, step.id, { status: 'skipped', errorMessage: 'BLOCKED — requires manual execution' })
      const logEntry = await logAction(db, {
        planId,
        agentId: step.agentId || 'unassigned',
        agentRole: step.agentRole,
        action: step.action,
        autonomyLevel: step.autonomyLevel,
        status: 'cancelled',
        errorMessage: 'BLOCKED — requires manual execution',
        costUsd: 0,
        durationMs: 0,
        thinkingMode: step.thinkingMode,
        completedAt: now(),
      })
      results.push({
        stepId: step.id,
        orderIndex: step.orderIndex,
        agentRole: step.agentRole,
        action: step.action,
        autonomyLevel: step.autonomyLevel,
        status: 'skipped',
        logId: logEntry.id,
      })
      continue
    }

    // ── REQUIRES_CONFIRMATION ─────────────────────────────────────────────
    if (step.autonomyLevel === 'REQUIRES_CONFIRMATION') {
      const logEntry = await logAction(db, {
        planId,
        agentId: step.agentId || 'unassigned',
        agentRole: step.agentRole,
        action: step.action,
        autonomyLevel: step.autonomyLevel,
        status: 'pending_confirmation',
        inputData: doneOutputs.length ? doneOutputs.join('\n') : undefined,
        costUsd: 0,
        durationMs: 0,
        thinkingMode: step.thinkingMode,
      })
      await updatePlanStatus(db, planId, 'paused')
      pausedAt = { stepId: step.id, logId: logEntry.id, action: step.action, orderIndex: step.orderIndex }
      results.push({
        stepId: step.id,
        orderIndex: step.orderIndex,
        agentRole: step.agentRole,
        action: step.action,
        autonomyLevel: step.autonomyLevel,
        status: 'pending_confirmation',
        logId: logEntry.id,
      })
      break
    }

    // ── SAFE — call the LLM ───────────────────────────────────────────────
    await updateStep(db, step.id, { status: 'running' })

    // Try to fetch the stored agent config for richer instructions
    let agentInstructions: string | undefined
    if (step.agentId) {
      const agent = await getAgent(db, step.agentId).catch(() => null)
      if (agent) agentInstructions = agent.instructions
    }

    let stepOutput: string
    let stepCost: number
    let stepDuration: number

    try {
      const result = await executeStepWithLLM({
        apiKey,
        model,
        role: step.agentRole,
        action: step.action,
        thinkingMode: step.thinkingMode,
        agentInstructions,
        contextFromPreviousSteps: doneOutputs.join('\n\n'),
      })
      stepOutput = result.output
      stepCost = result.costUsd
      stepDuration = result.durationMs
    } catch (err: any) {
      const errMsg = err?.message ?? 'LLM call failed'
      await updateStep(db, step.id, { status: 'failed', errorMessage: errMsg })
      await updatePlanStatus(db, planId, 'failed', { resultSummary: `Failed at step ${step.orderIndex}: ${errMsg}` })

      const logEntry = await logAction(db, {
        planId,
        agentId: step.agentId || 'unassigned',
        agentRole: step.agentRole,
        action: step.action,
        autonomyLevel: step.autonomyLevel,
        status: 'error',
        errorMessage: errMsg,
        costUsd: 0,
        durationMs: 0,
        thinkingMode: step.thinkingMode,
        modelId: model,
        completedAt: now(),
      })

      results.push({
        stepId: step.id,
        orderIndex: step.orderIndex,
        agentRole: step.agentRole,
        action: step.action,
        autonomyLevel: step.autonomyLevel,
        status: 'failed',
        logId: logEntry.id,
        errorMessage: errMsg,
      })

      return c.json({
        planId,
        status: 'failed',
        failedAt: { stepId: step.id, orderIndex: step.orderIndex, error: errMsg },
        completedSteps: results.filter(r => r.status === 'done').length,
        steps: results,
        accumulatedCostUsd,
      }, 500)
    }

    accumulatedCostUsd += stepCost
    doneOutputs.push(`Step ${step.orderIndex} (${step.agentRole}): ${stepOutput}`)

    await updateStep(db, step.id, {
      status: 'done',
      outputData: stepOutput,
      costUsd: stepCost,
    })

    const logEntry = await logAction(db, {
      planId,
      agentId: step.agentId || 'unassigned',
      agentRole: step.agentRole,
      action: step.action,
      autonomyLevel: step.autonomyLevel,
      status: 'success',
      outputData: stepOutput,
      costUsd: stepCost,
      durationMs: stepDuration,
      thinkingMode: step.thinkingMode,
      modelId: model,
      completedAt: now(),
    })

    results.push({
      stepId: step.id,
      orderIndex: step.orderIndex,
      agentRole: step.agentRole,
      action: step.action,
      autonomyLevel: step.autonomyLevel,
      status: 'done',
      logId: logEntry.id,
      outputData: stepOutput,
      costUsd: stepCost,
      durationMs: stepDuration,
    })
  }

  // Determine final plan status
  const freshPlan = await getPlan(db, planId)
  const allDone = freshPlan?.steps.every(s => s.status === 'done' || s.status === 'skipped') ?? false

  if (!pausedAt && allDone) {
    await updatePlanStatus(db, planId, 'completed', {
      actualCostUsd: accumulatedCostUsd,
      resultSummary: doneOutputs.at(-1) ?? 'Completed',
    })
  }

  const finalStatus = pausedAt ? 'paused' : allDone ? 'completed' : 'partial'

  return c.json({
    planId,
    status: finalStatus,
    steps: results,
    pausedAt,
    completedSteps: results.filter(r => r.status === 'done').length,
    totalSteps: plan.steps.length,
    accumulatedCostUsd,
  })
})

// Approve a REQUIRES_CONFIRMATION step — mark it done and unblock the plan
metaApi.post('/plans/:id/steps/:stepId/confirm', async (c) => {
  const db = c.env.DB
  const planId = c.req.param('id')
  const stepId = c.req.param('stepId')

  const plan = await getPlan(db, planId)
  if (!plan) return c.json({ error: 'Plan not found' }, 404)
  if (plan.status !== 'paused') return c.json({ error: 'Plan is not paused' }, 409)

  const step = plan.steps.find(s => s.id === stepId)
  if (!step) return c.json({ error: 'Step not found in this plan' }, 404)
  if (step.autonomyLevel !== 'REQUIRES_CONFIRMATION') {
    return c.json({ error: 'Step does not require confirmation' }, 409)
  }

  let body: { userId?: string; note?: string } = {}
  try { body = await c.req.json() } catch { /* optional */ }

  const confirmedOutput = body.note
    ? `Approved by ${body.userId ?? 'user'}: ${body.note}`
    : `Approved by ${body.userId ?? 'user'}`

  await confirmStep(db, stepId, confirmedOutput)
  await updatePlanStatus(db, planId, 'draft')

  return c.json({
    success: true,
    stepId,
    planId,
    message: 'Step confirmed. Call POST /api/meta/plans/:id/execute to resume.',
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
