import type { ScenarioConfig, ScenarioStep, AgentRole } from '../../types/orchestration'
import type { OrchestrationStrategy } from '../../types/orchestration'
import type { ThinkingMode } from '../../types/thinking-modes'
import { dbFirst, dbAll, dbRun, newId, now, type D1DB } from './index'

// ─── Row shapes ────────────────────────────────────────────────────────────

interface ScenarioRow {
  id: string
  name: string
  description: string
  category: string
  strategy: string
  estimated_total_seconds: number
  estimated_total_cost_usd: number
  run_count: number
  created_at: string
  updated_at: string
}

interface StepRow {
  id: string
  scenario_id: string
  order_index: number
  agent_id: string | null
  agent_role: string
  action: string
  input_from_step_id: string | null
  autonomy_level: string
  thinking_mode_override: string | null
  estimated_seconds: number
  estimated_cost_usd: number
}

function rowToScenario(row: ScenarioRow, steps: ScenarioStep[] = []): ScenarioConfig {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category as ScenarioConfig['category'],
    strategy: row.strategy as OrchestrationStrategy,
    steps,
    estimatedTotalSeconds: row.estimated_total_seconds,
    estimatedTotalCostUsd: row.estimated_total_cost_usd,
    runCount: row.run_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function rowToStep(row: StepRow): ScenarioStep {
  return {
    id: row.id,
    orderIndex: row.order_index,
    agentId: row.agent_id ?? '',
    agentRole: row.agent_role as AgentRole,
    action: row.action,
    inputFromStepId: row.input_from_step_id ?? undefined,
    autonomyLevel: row.autonomy_level as ScenarioStep['autonomyLevel'],
    thinkingModeOverride: (row.thinking_mode_override ?? undefined) as ThinkingMode | undefined,
    estimatedSeconds: row.estimated_seconds,
    estimatedCostUsd: row.estimated_cost_usd,
  }
}

// ─── Queries ───────────────────────────────────────────────────────────────

export async function getScenario(db: D1DB, id: string): Promise<ScenarioConfig | null> {
  const row = await dbFirst<ScenarioRow>(db, 'SELECT * FROM scenarios WHERE id = ?', id)
  if (!row) return null
  const steps = await dbAll<StepRow>(
    db, 'SELECT * FROM scenario_steps WHERE scenario_id = ? ORDER BY order_index', id
  )
  return rowToScenario(row, steps.map(rowToStep))
}

export async function listScenarios(
  db: D1DB,
  category?: ScenarioConfig['category']
): Promise<ScenarioConfig[]> {
  const rows = category
    ? await dbAll<ScenarioRow>(db, 'SELECT * FROM scenarios WHERE category = ? ORDER BY run_count DESC', category)
    : await dbAll<ScenarioRow>(db, 'SELECT * FROM scenarios ORDER BY run_count DESC')
  return rows.map(r => rowToScenario(r))
}

export async function createScenario(
  db: D1DB,
  input: Omit<ScenarioConfig, 'id' | 'runCount' | 'createdAt' | 'updatedAt'>
): Promise<ScenarioConfig> {
  const id = newId('scn')
  const ts = now()

  await dbRun(
    db,
    `INSERT INTO scenarios
      (id, name, description, category, strategy,
       estimated_total_seconds, estimated_total_cost_usd, run_count, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?)`,
    id, input.name, input.description, input.category, input.strategy,
    input.estimatedTotalSeconds, input.estimatedTotalCostUsd, ts, ts
  )

  for (const s of input.steps) {
    const stepId = newId('sst')
    await dbRun(
      db,
      `INSERT INTO scenario_steps
        (id, scenario_id, order_index, agent_id, agent_role, action,
         input_from_step_id, autonomy_level, thinking_mode_override,
         estimated_seconds, estimated_cost_usd)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      stepId, id, s.orderIndex, s.agentId || null, s.agentRole,
      s.action, s.inputFromStepId ?? null, s.autonomyLevel,
      s.thinkingModeOverride ?? null, s.estimatedSeconds, s.estimatedCostUsd
    )
  }

  return (await getScenario(db, id))!
}

export async function incrementRunCount(db: D1DB, id: string): Promise<void> {
  await dbRun(db, 'UPDATE scenarios SET run_count = run_count + 1 WHERE id = ?', id)
}

export async function deleteScenario(db: D1DB, id: string): Promise<boolean> {
  const result = await dbRun(db, 'DELETE FROM scenarios WHERE id = ?', id)
  return (result.meta?.changes ?? 0) > 0
}
