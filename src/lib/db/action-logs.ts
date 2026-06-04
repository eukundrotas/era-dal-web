import type { ActionLogEntry, ActionLogStatus, AgentRole } from '../../types/orchestration'
import type { ThinkingMode } from '../../types/thinking-modes'
import { dbFirst, dbAll, dbRun, newId, now, type D1DB } from './index'

interface LogRow {
  id: string
  plan_id: string | null
  scenario_id: string | null
  agent_id: string
  agent_role: string
  action: string
  autonomy_level: string
  status: string
  input_data: string | null
  output_data: string | null
  error_message: string | null
  cost_usd: number
  duration_ms: number
  model_id: string | null
  thinking_mode: string
  confirmed_by: string | null
  created_at: string
  completed_at: string | null
}

function rowToEntry(row: LogRow): ActionLogEntry {
  return {
    id: row.id,
    planId: row.plan_id ?? undefined,
    scenarioId: row.scenario_id ?? undefined,
    agentId: row.agent_id,
    agentRole: row.agent_role as AgentRole,
    action: row.action,
    autonomyLevel: row.autonomy_level as ActionLogEntry['autonomyLevel'],
    status: row.status as ActionLogStatus,
    inputData: row.input_data ?? undefined,
    outputData: row.output_data ?? undefined,
    errorMessage: row.error_message ?? undefined,
    costUsd: row.cost_usd,
    durationMs: row.duration_ms,
    modelId: row.model_id ?? undefined,
    thinkingMode: row.thinking_mode as ThinkingMode,
    confirmedBy: row.confirmed_by ?? undefined,
    createdAt: row.created_at,
    completedAt: row.completed_at ?? undefined,
  }
}

// ─── Queries ───────────────────────────────────────────────────────────────

export async function logAction(
  db: D1DB,
  entry: Omit<ActionLogEntry, 'id' | 'createdAt'>
): Promise<ActionLogEntry> {
  const id = newId('log')
  const ts = now()

  await dbRun(
    db,
    `INSERT INTO action_logs
      (id, plan_id, scenario_id, agent_id, agent_role, action, autonomy_level,
       status, input_data, output_data, error_message, cost_usd, duration_ms,
       model_id, thinking_mode, confirmed_by, created_at, completed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    entry.planId ?? null,
    entry.scenarioId ?? null,
    entry.agentId,
    entry.agentRole,
    entry.action,
    entry.autonomyLevel,
    entry.status,
    entry.inputData ?? null,
    entry.outputData ?? null,
    entry.errorMessage ?? null,
    entry.costUsd,
    entry.durationMs,
    entry.modelId ?? null,
    entry.thinkingMode,
    entry.confirmedBy ?? null,
    ts,
    entry.completedAt ?? null
  )

  return { ...entry, id, createdAt: ts }
}

export async function getLog(db: D1DB, id: string): Promise<ActionLogEntry | null> {
  const row = await dbFirst<LogRow>(db, 'SELECT * FROM action_logs WHERE id = ?', id)
  return row ? rowToEntry(row) : null
}

export async function listLogs(
  db: D1DB,
  filters: {
    planId?: string
    agentId?: string
    status?: ActionLogStatus
    limit?: number
    offset?: number
  } = {}
): Promise<ActionLogEntry[]> {
  const conditions: string[] = []
  const bindings: unknown[] = []

  if (filters.planId) { conditions.push('plan_id = ?'); bindings.push(filters.planId) }
  if (filters.agentId) { conditions.push('agent_id = ?'); bindings.push(filters.agentId) }
  if (filters.status) { conditions.push('status = ?'); bindings.push(filters.status) }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const limit = filters.limit ?? 50
  const offset = filters.offset ?? 0
  bindings.push(limit, offset)

  const rows = await dbAll<LogRow>(
    db,
    `SELECT * FROM action_logs ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    ...bindings
  )
  return rows.map(rowToEntry)
}

export async function getTodayStats(
  db: D1DB
): Promise<{ total: number; success: number; errors: number; costUsd: number }> {
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

  const row = await dbFirst<{
    total: number
    success: number
    errors: number
    cost: number
  }>(
    db,
    `SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as success,
      SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) as errors,
      SUM(cost_usd) as cost
     FROM action_logs
     WHERE date(created_at) = ?`,
    today
  )

  return {
    total: row?.total ?? 0,
    success: row?.success ?? 0,
    errors: row?.errors ?? 0,
    costUsd: row?.cost ?? 0,
  }
}

export async function confirmPendingAction(
  db: D1DB,
  logId: string,
  confirmedBy: string
): Promise<boolean> {
  const result = await dbRun(
    db,
    `UPDATE action_logs SET
      status = 'success', confirmed_by = ?, completed_at = ?
     WHERE id = ? AND status = 'pending_confirmation'`,
    confirmedBy, now(), logId
  )
  return (result.meta?.changes ?? 0) > 0
}
