// Core orchestration types for the Meta-Orchestrator Layer

// ─── Strategies ────────────────────────────────────────────────────────────

export type OrchestrationStrategy =
  | 'SINGLE'        // One agent, one model, one pass
  | 'PARALLEL'      // Multiple agents/models in parallel, results merged
  | 'FALLBACK'      // Try primary; on failure, try secondary
  | 'RELAY'         // Sequential hand-off: output of step N is input of step N+1
  | 'VERIFIED'      // Execute, then run Critic/QC on the result
  | 'DEBATE'        // Multiple agents argue positions, Arbiter synthesizes
  | 'PLANNER'       // Meta-Orchestrator builds a plan first, then executes steps
  | 'EXPERT_PANEL'  // Multiple specialist agents evaluate from different angles

export const STRATEGY_META: Record<OrchestrationStrategy, { icon: string; nameEn: string; nameRu: string; descEn: string; descRu: string }> = {
  SINGLE:       { icon: '⚡', nameEn: 'Single',        nameRu: 'Одиночный',         descEn: 'One agent, direct execution.',                           descRu: 'Один агент, прямое выполнение.' },
  PARALLEL:     { icon: '⚡⚡', nameEn: 'Parallel',      nameRu: 'Параллельный',      descEn: 'Multiple agents work simultaneously, results merged.',   descRu: 'Несколько агентов параллельно, результаты объединяются.' },
  FALLBACK:     { icon: '🔁', nameEn: 'Fallback',      nameRu: 'Резервный',         descEn: 'Primary agent; secondary activates on failure.',          descRu: 'Основной агент; резервный при сбое.' },
  RELAY:        { icon: '🔄', nameEn: 'Relay',         nameRu: 'Эстафета',          descEn: 'Sequential hand-off between agents.',                     descRu: 'Последовательная передача между агентами.' },
  VERIFIED:     { icon: '✅', nameEn: 'Verified',      nameRu: 'Верифицированный',  descEn: 'Execute, then critic validates the result.',              descRu: 'Выполнение, затем критик проверяет результат.' },
  DEBATE:       { icon: '🗣️', nameEn: 'Debate',        nameRu: 'Дебаты',            descEn: 'Agents argue positions; arbiter synthesizes consensus.',  descRu: 'Агенты отстаивают позиции; арбитр синтезирует.' },
  PLANNER:      { icon: '🗺️', nameEn: 'Planner',       nameRu: 'Планировщик',       descEn: 'Build plan first, then execute steps sequentially.',      descRu: 'Сначала строится план, затем шаги выполняются.' },
  EXPERT_PANEL: { icon: '👥', nameEn: 'Expert Panel',  nameRu: 'Экспертная комиссия', descEn: 'Specialists evaluate from different domain angles.',    descRu: 'Специалисты оценивают с разных предметных сторон.' },
}

// ─── Autonomy / Approval Gate ───────────────────────────────────────────────

export type AutonomyLevel =
  | 'SAFE'                 // Execute automatically, no confirmation needed
  | 'REQUIRES_CONFIRMATION' // Pause and wait for human approval
  | 'BLOCKED'              // Never execute; always requires human to do it manually

// ─── Agent types ────────────────────────────────────────────────────────────

export type AgentRole =
  | 'lead_researcher'
  | 'market_analyst'
  | 'copywriter'
  | 'sales_director'
  | 'marketing_strategist'
  | 'quality_controller'
  | 'crm_agent'
  | 'business_radar'
  | 'support_agent'
  | 'project_manager'
  | 'legal_assistant'
  | 'technical_agent'
  | 'hr_assistant'
  | 'financial_analyst'
  | 'innovation_strategist'
  // ─── Scientific & experimental roles ───
  | 'research_scientist'
  | 'data_scientist'
  | 'experiment_designer'
  | 'peer_reviewer'
  | 'literature_researcher'
  // ─── AI & LLM engineering roles ───
  | 'ml_engineer'
  | 'prompt_engineer'
  | 'llm_engineer'
  | 'ai_architect'
  | 'mlops_engineer'
  | 'custom'

export interface AgentTool {
  id: string
  name: string
  type: 'mcp' | 'api' | 'builtin'
  autonomyLevel: AutonomyLevel
}

export interface AgentConfig {
  id: string
  role: AgentRole
  nameEn: string
  nameRu: string
  instructions: string
  tools: AgentTool[]
  thinkingMode: import('./thinking-modes').ThinkingMode
  knowledgeBaseIds: string[]
  outputFormat: 'text' | 'json' | 'markdown' | 'table'
  maxTokens: number
  temperature: number
  createdAt: string
  updatedAt: string
}

// ─── Knowledge Base ─────────────────────────────────────────────────────────

export interface KnowledgeBase {
  id: string
  name: string
  description: string
  documentCount: number
  chunkCount: number
  embeddingModel: string
  createdAt: string
  updatedAt: string
}

// ─── Scenario / Chain of agents ─────────────────────────────────────────────

export interface ScenarioStep {
  id: string
  orderIndex: number
  agentId: string
  agentRole: AgentRole
  action: string
  inputFromStepId?: string   // take output of previous step as input
  autonomyLevel: AutonomyLevel
  thinkingModeOverride?: import('./thinking-modes').ThinkingMode
  estimatedSeconds: number
  estimatedCostUsd: number
}

export interface ScenarioConfig {
  id: string
  name: string
  description: string
  category: 'sales' | 'marketing' | 'analytics' | 'intelligence' | 'operations' | 'custom'
  strategy: OrchestrationStrategy
  steps: ScenarioStep[]
  estimatedTotalSeconds: number
  estimatedTotalCostUsd: number
  runCount: number
  createdAt: string
  updatedAt: string
}

// ─── Meta Plan ──────────────────────────────────────────────────────────────

export type MetaPlanStatus =
  | 'draft'       // Generated, not yet started
  | 'running'     // Currently executing
  | 'paused'      // Waiting for human confirmation on a gate
  | 'completed'   // All steps done
  | 'failed'      // Unrecoverable error
  | 'cancelled'   // Cancelled by user

export interface MetaPlanStep {
  id: string
  planId: string
  orderIndex: number
  agentId: string
  agentRole: AgentRole
  action: string
  autonomyLevel: AutonomyLevel
  thinkingMode: import('./thinking-modes').ThinkingMode
  status: 'pending' | 'running' | 'done' | 'failed' | 'skipped'
  inputData?: string
  outputData?: string
  startedAt?: string
  completedAt?: string
  costUsd?: number
  errorMessage?: string
}

export interface MetaPlan {
  id: string
  userId: string
  userPrompt: string
  status: MetaPlanStatus
  strategy: OrchestrationStrategy
  globalThinkingMode: import('./thinking-modes').ThinkingMode
  steps: MetaPlanStep[]
  estimatedCostUsd: number
  actualCostUsd?: number
  estimatedSeconds: number
  actualSeconds?: number
  schemaVersion: number
  createdAt: string
  startedAt?: string
  completedAt?: string
  resultSummary?: string
}

// ─── Action Log ─────────────────────────────────────────────────────────────

export type ActionLogStatus = 'success' | 'error' | 'pending_confirmation' | 'cancelled'

export interface ActionLogEntry {
  id: string
  planId?: string
  scenarioId?: string
  agentId: string
  agentRole: AgentRole
  action: string
  autonomyLevel: AutonomyLevel
  status: ActionLogStatus
  inputData?: string
  outputData?: string
  errorMessage?: string
  costUsd: number
  durationMs: number
  modelId?: string
  thinkingMode: import('./thinking-modes').ThinkingMode
  confirmedBy?: string   // userId who approved, if REQUIRES_CONFIRMATION
  createdAt: string
  completedAt?: string
}

// ─── Execution Status ────────────────────────────────────────────────────────

export interface ExecutionState {
  planId: string
  status: MetaPlanStatus
  currentStepIndex: number
  totalSteps: number
  completedSteps: number
  pendingConfirmationStepId?: string
  accumulatedCostUsd: number
  startedAt: string
  updatedAt: string
}

// ─── Zod-compatible JSON output shape from Meta System Prompt ───────────────
// This is what the LLM must return in POST /api/meta/plan

export interface MetaPlanLLMResponse {
  strategy: OrchestrationStrategy
  thinkingMode: import('./thinking-modes').ThinkingMode
  estimatedCostUsd: number
  estimatedSeconds: number
  reasoning: string
  steps: Array<{
    orderIndex: number
    agentRole: AgentRole
    action: string
    autonomyLevel: AutonomyLevel
    thinkingModeOverride?: import('./thinking-modes').ThinkingMode
    estimatedSeconds: number
    estimatedCostUsd: number
    reason: string
  }>
}
