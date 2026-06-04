import type { AgentConfig, AgentRole } from '../../types/orchestration'
import type { ThinkingMode } from '../../types/thinking-modes'
import { dbFirst, dbAll, dbRun, newId, now, parseJson, type D1DB } from './index'

// ─── Row shape (flat SQL columns) ──────────────────────────────────────────
interface AgentRow {
  id: string
  role: string
  name_en: string
  name_ru: string
  instructions: string
  tools: string
  thinking_mode: string
  knowledge_base_ids: string
  output_format: string
  max_tokens: number
  temperature: number
  created_at: string
  updated_at: string
}

function rowToConfig(row: AgentRow): AgentConfig {
  return {
    id: row.id,
    role: row.role as AgentRole,
    nameEn: row.name_en,
    nameRu: row.name_ru,
    instructions: row.instructions,
    tools: parseJson(row.tools, []),
    thinkingMode: row.thinking_mode as ThinkingMode,
    knowledgeBaseIds: parseJson(row.knowledge_base_ids, []),
    outputFormat: row.output_format as AgentConfig['outputFormat'],
    maxTokens: row.max_tokens,
    temperature: row.temperature,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// ─── Queries ───────────────────────────────────────────────────────────────

export async function getAgent(db: D1DB, id: string): Promise<AgentConfig | null> {
  const row = await dbFirst<AgentRow>(db, 'SELECT * FROM agents WHERE id = ?', id)
  return row ? rowToConfig(row) : null
}

export async function listAgents(db: D1DB, role?: AgentRole): Promise<AgentConfig[]> {
  const rows = role
    ? await dbAll<AgentRow>(db, 'SELECT * FROM agents WHERE role = ? ORDER BY name_en', role)
    : await dbAll<AgentRow>(db, 'SELECT * FROM agents ORDER BY name_en')
  return rows.map(rowToConfig)
}

export async function createAgent(
  db: D1DB,
  input: Omit<AgentConfig, 'id' | 'createdAt' | 'updatedAt'>
): Promise<AgentConfig> {
  const id = newId('agt')
  const ts = now()

  await dbRun(
    db,
    `INSERT INTO agents
      (id, role, name_en, name_ru, instructions, tools, thinking_mode,
       knowledge_base_ids, output_format, max_tokens, temperature, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    id, input.role, input.nameEn, input.nameRu, input.instructions,
    JSON.stringify(input.tools), input.thinkingMode,
    JSON.stringify(input.knowledgeBaseIds), input.outputFormat,
    input.maxTokens, input.temperature, ts, ts
  )

  return { ...input, id, createdAt: ts, updatedAt: ts }
}

export async function updateAgent(
  db: D1DB,
  id: string,
  patch: Partial<Omit<AgentConfig, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<AgentConfig | null> {
  const existing = await getAgent(db, id)
  if (!existing) return null

  const merged = { ...existing, ...patch }
  const ts = now()

  await dbRun(
    db,
    `UPDATE agents SET
      role = ?, name_en = ?, name_ru = ?, instructions = ?,
      tools = ?, thinking_mode = ?, knowledge_base_ids = ?,
      output_format = ?, max_tokens = ?, temperature = ?, updated_at = ?
     WHERE id = ?`,
    merged.role, merged.nameEn, merged.nameRu, merged.instructions,
    JSON.stringify(merged.tools), merged.thinkingMode,
    JSON.stringify(merged.knowledgeBaseIds), merged.outputFormat,
    merged.maxTokens, merged.temperature, ts, id
  )

  return { ...merged, updatedAt: ts }
}

export async function deleteAgent(db: D1DB, id: string): Promise<boolean> {
  const result = await dbRun(db, 'DELETE FROM agents WHERE id = ?', id)
  return (result.meta?.changes ?? 0) > 0
}
