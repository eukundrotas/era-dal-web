import type { MetaPlan, MetaPlanStep, MetaPlanStatus, MetaPlanLLMResponse, AgentRole } from '../../types/orchestration'
import type { OrchestrationStrategy } from '../../types/orchestration'
import type { ThinkingMode } from '../../types/thinking-modes'
import { dbFirst, dbAll, dbRun, newId, now, type D1DB } from './index'

// ─── Row shapes ────────────────────────────────────────────────────────────

interface PlanRow {
  id: string
  user_id: string
  user_prompt: string
  status: string
  strategy: string
  global_thinking_mode: string
  estimated_cost_usd: number
  actual_cost_usd: number | null
  estimated_seconds: number
  actual_seconds: number | null
  schema_version: number
  result_summary: string | null
  created_at: string
  started_at: string | null
  completed_at: string | null
}

interface StepRow {
  id: string
  plan_id: string
  order_index: number
  agent_id: string | null
  agent_role: string
  action: string
  autonomy_level: string
  thinking_mode: string
  status: string
  input_data: string | null
  output_data: string | null
  started_at: string | null
  completed_at: string | null
  cost_usd: number | null
  error_message: string | null
}

function rowToPlan(row: PlanRow, steps: MetaPlanStep[] = []): MetaPlan {
  return {
    id: row.id,
    userId: row.user_id,
    userPrompt: row.user_prompt,
    status: row.status as MetaPlanStatus,
    strategy: row.strategy as OrchestrationStrategy,
    globalThinkingMode: row.global_thinking_mode as ThinkingMode,
    estimatedCostUsd: row.estimated_cost_usd,
    actualCostUsd: row.actual_cost_usd ?? undefined,
    estimatedSeconds: row.estimated_seconds,
    actualSeconds: row.actual_seconds ?? undefined,
    schemaVersion: row.schema_version,
    resultSummary: row.result_summary ?? undefined,
    createdAt: row.created_at,
    startedAt: row.started_at ?? undefined,
    completedAt: row.completed_at ?? undefined,
    steps,
  }
}

function rowToStep(row: StepRow): MetaPlanStep {
  return {
    id: row.id,
    planId: row.plan_id,
    orderIndex: row.order_index,
    agentId: row.agent_id ?? '',
    agentRole: row.agent_role as AgentRole,
    action: row.action,
    autonomyLevel: row.autonomy_level as MetaPlanStep['autonomyLevel'],
    thinkingMode: row.thinking_mode as ThinkingMode,
    status: row.status as MetaPlanStep['status'],
    inputData: row.input_data ?? undefined,
    outputData: row.output_data ?? undefined,
    startedAt: row.started_at ?? undefined,
    completedAt: row.completed_at ?? undefined,
    costUsd: row.cost_usd ?? undefined,
    errorMessage: row.error_message ?? undefined,
  }
}

// ─── Plan queries ──────────────────────────────────────────────────────────

export async function getPlan(db: D1DB, id: string): Promise<MetaPlan | null> {
  const row = await dbFirst<PlanRow>(db, 'SELECT * FROM meta_plans WHERE id = ?', id)
  if (!row) return null
  const stepRows = await dbAll<StepRow>(
    db, 'SELECT * FROM meta_plan_steps WHERE plan_id = ? ORDER BY order_index', id
  )
  return rowToPlan(row, stepRows.map(rowToStep))
}

export async function listPlans(
  db: D1DB,
  userId: string,
  limit = 20,
  offset = 0
): Promise<MetaPlan[]> {
  const rows = await dbAll<PlanRow>(
    db,
    'SELECT * FROM meta_plans WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    userId, limit, offset
  )
  return rows.map(r => rowToPlan(r))
}

export async function createPlanFromLLMResponse(
  db: D1DB,
  userId: string,
  userPrompt: string,
  llmResponse: MetaPlanLLMResponse
): Promise<MetaPlan> {
  const planId = newId('pln')
  const ts = now()

  await dbRun(
    db,
    `INSERT INTO meta_plans
      (id, user_id, user_prompt, status, strategy, global_thinking_mode,
       estimated_cost_usd, estimated_seconds, schema_version, created_at)
     VALUES (?, ?, ?, 'draft', ?, ?, ?, ?, 1, ?)`,
    planId, userId, userPrompt,
    llmResponse.strategy, llmResponse.thinkingMode,
    llmResponse.estimatedCostUsd, llmResponse.estimatedSeconds, ts
  )

  for (const s of llmResponse.steps) {
    const stepId = newId('stp')
    await dbRun(
      db,
      `INSERT INTO meta_plan_steps
        (id, plan_id, order_index, agent_role, action, autonomy_level, thinking_mode, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      stepId, planId, s.orderIndex, s.agentRole, s.action,
      s.autonomyLevel, s.thinkingModeOverride ?? llmResponse.thinkingMode
    )
  }

  return (await getPlan(db, planId))!
}

export async function updatePlanStatus(
  db: D1DB,
  planId: string,
  status: MetaPlanStatus,
  extra: { actualCostUsd?: number; actualSeconds?: number; resultSummary?: string } = {}
): Promise<void> {
  const ts = now()
  const startedAt = status === 'running' ? ts : null
  const completedAt = (status === 'completed' || status === 'failed' || status === 'cancelled') ? ts : null

  await dbRun(
    db,
    `UPDATE meta_plans SET
      status = ?,
      actual_cost_usd = COALESCE(?, actual_cost_usd),
      actual_seconds = COALESCE(?, actual_seconds),
      result_summary = COALESCE(?, result_summary),
      started_at = COALESCE(started_at, ?),
      completed_at = COALESCE(completed_at, ?)
     WHERE id = ?`,
    status,
    extra.actualCostUsd ?? null,
    extra.actualSeconds ?? null,
    extra.resultSummary ?? null,
    startedAt,
    completedAt,
    planId
  )
}

export async function confirmStep(
  db: D1DB,
  stepId: string,
  confirmedOutput: string
): Promise<void> {
  const ts = now()
  await dbRun(
    db,
    `UPDATE meta_plan_steps SET
      status = 'done', output_data = ?, completed_at = ?
     WHERE id = ? AND status = 'pending'`,
    confirmedOutput, ts, stepId
  )
}

// ─── Step queries ──────────────────────────────────────────────────────────

export async function updateStep(
  db: D1DB,
  stepId: string,
  patch: {
    status?: MetaPlanStep['status']
    outputData?: string
    costUsd?: number
    errorMessage?: string
  }
): Promise<void> {
  const ts = now()
  const completedAt = (patch.status === 'done' || patch.status === 'failed') ? ts : null
  const startedAt = patch.status === 'running' ? ts : null

  await dbRun(
    db,
    `UPDATE meta_plan_steps SET
      status = COALESCE(?, status),
      output_data = COALESCE(?, output_data),
      cost_usd = COALESCE(?, cost_usd),
      error_message = COALESCE(?, error_message),
      started_at = COALESCE(started_at, ?),
      completed_at = COALESCE(completed_at, ?)
     WHERE id = ?`,
    patch.status ?? null,
    patch.outputData ?? null,
    patch.costUsd ?? null,
    patch.errorMessage ?? null,
    startedAt,
    completedAt,
    stepId
  )
}
