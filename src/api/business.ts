import { Hono } from 'hono'
import { dbFirst, dbAll } from '../lib/db/index'

type Bindings = { DB: D1Database }

export const businessApi = new Hono<{ Bindings: Bindings }>()

// ── Helpers ──────────────────────────────────────────────────────────────────
function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function nowIso(): string {
  return new Date().toISOString().replace('T', ' ').split('.')[0]
}

// ════════════════════════════════════════════════════════════════════════════
// TASKS
// ════════════════════════════════════════════════════════════════════════════

businessApi.get('/tasks', async (c) => {
  const { status, priority, project_id, search, limit = '50', offset = '0' } = c.req.query() as Record<string, string>

  if (!c.env?.DB) return c.json({ tasks: [] })

  try {
    let sql = 'SELECT * FROM tasks WHERE 1=1'
    const params: any[] = []

    if (status && status !== 'all') { sql += ' AND status = ?';     params.push(status) }
    if (priority)                   { sql += ' AND priority = ?';   params.push(priority) }
    if (project_id)                 { sql += ' AND project_id = ?'; params.push(project_id) }
    if (search)                     { sql += ' AND title LIKE ?';   params.push(`%${search}%`) }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
    params.push(Number(limit), Number(offset))

    const tasks = await dbAll(c.env.DB, sql, params)
    return c.json({ tasks })
  } catch {
    return c.json({ tasks: [] })
  }
})

businessApi.post('/tasks', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)

  const body = await c.req.json()
  const id = uid()
  const now = nowIso()

  await c.env.DB.prepare(
    `INSERT INTO tasks (id,project_id,title,description,status,priority,assigned_agent_role,due_date,estimated_hours,tags,created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(
    id,
    body.project_id || null,
    body.title,
    body.description || '',
    body.status || 'todo',
    body.priority || 'medium',
    body.assigned_agent_role || null,
    body.due_date || null,
    body.estimated_hours || null,
    JSON.stringify(body.tags || []),
    now, now
  ).run()

  return c.json({ id, created_at: now })
})

businessApi.put('/tasks/:id', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)

  const id = c.req.param('id')
  const body = await c.req.json()
  const now = nowIso()

  const fields: string[] = []
  const params: any[] = []

  const allowed = ['title','description','status','priority','assigned_agent_role','project_id','due_date','estimated_hours','actual_hours','plan_id']
  for (const f of allowed) {
    if (body[f] !== undefined) { fields.push(`${f} = ?`); params.push(body[f]) }
  }
  if (!fields.length) return c.json({ ok: true })

  fields.push('updated_at = ?')
  params.push(now, id)

  await c.env.DB.prepare(`UPDATE tasks SET ${fields.join(',')} WHERE id = ?`).bind(...params).run()
  return c.json({ ok: true })
})

businessApi.delete('/tasks/:id', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)
  await c.env.DB.prepare('DELETE FROM tasks WHERE id = ?').bind(c.req.param('id')).run()
  return c.json({ ok: true })
})

// ════════════════════════════════════════════════════════════════════════════
// PROJECTS
// ════════════════════════════════════════════════════════════════════════════

businessApi.get('/projects', async (c) => {
  if (!c.env?.DB) return c.json({ projects: [] })

  try {
    const { status } = c.req.query() as Record<string,string>
    let sql = `SELECT p.*, (SELECT COUNT(*) FROM tasks t WHERE t.project_id=p.id) as task_count,
               (SELECT COUNT(*) FROM tasks t WHERE t.project_id=p.id AND t.status='done') as done_count
               FROM projects p WHERE 1=1`
    const params: any[] = []
    if (status) { sql += ' AND p.status = ?'; params.push(status) }
    sql += ' ORDER BY p.created_at DESC'

    const projects = await dbAll(c.env.DB, sql, params)
    return c.json({ projects })
  } catch {
    return c.json({ projects: [] })
  }
})

businessApi.post('/projects', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)

  const body = await c.req.json()
  const id = uid()
  const now = nowIso()

  await c.env.DB.prepare(
    `INSERT INTO projects (id,name,description,status,color,budget_usd,due_date,created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,?,?)`
  ).bind(id, body.name, body.description || '', body.status || 'active',
         body.color || '#3b82f6', body.budget_usd || 0, body.due_date || null, now, now).run()

  return c.json({ id, created_at: now })
})

businessApi.put('/projects/:id', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)

  const id = c.req.param('id')
  const body = await c.req.json()
  const now = nowIso()

  const fields: string[] = []
  const params: any[] = []
  for (const f of ['name','description','status','color','budget_usd','spent_usd','due_date']) {
    if (body[f] !== undefined) { fields.push(`${f} = ?`); params.push(body[f]) }
  }
  if (!fields.length) return c.json({ ok: true })
  fields.push('updated_at = ?')
  params.push(now, id)

  await c.env.DB.prepare(`UPDATE projects SET ${fields.join(',')} WHERE id = ?`).bind(...params).run()
  return c.json({ ok: true })
})

// ════════════════════════════════════════════════════════════════════════════
// GOALS
// ════════════════════════════════════════════════════════════════════════════

businessApi.get('/goals', async (c) => {
  if (!c.env?.DB) return c.json({ goals: [] })

  try {
    const { period, status } = c.req.query() as Record<string,string>
    let sql = 'SELECT * FROM goals WHERE 1=1'
    const params: any[] = []
    if (period) { sql += ' AND period = ?'; params.push(period) }
    if (status) { sql += ' AND status = ?'; params.push(status) }
    sql += ' ORDER BY created_at DESC'

    const goals = await dbAll(c.env.DB, sql, params)

    // Attach key results to each goal
    const goalIds = goals.map((g: any) => g.id)
    if (goalIds.length > 0) {
      const krs = await dbAll(c.env.DB,
        `SELECT * FROM goal_key_results WHERE goal_id IN (${goalIds.map(() => '?').join(',')}) ORDER BY order_index`,
        goalIds)
      const krMap: Record<string, any[]> = {}
      for (const kr of krs) { (krMap[kr.goal_id] ||= []).push(kr) }
      for (const g of goals) { (g as any).key_results = krMap[g.id] || [] }
    }

    return c.json({ goals })
  } catch {
    return c.json({ goals: [] })
  }
})

businessApi.post('/goals', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)

  const body = await c.req.json()
  const id = uid()
  const now = nowIso()

  await c.env.DB.prepare(
    `INSERT INTO goals (id,title,description,owner,period,status,progress,project_id,created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?)`
  ).bind(id, body.title, body.description || '', body.owner || 'default',
         body.period || 'Q2-2025', body.status || 'on_track', 0,
         body.project_id || null, now, now).run()

  // Insert key results
  if (Array.isArray(body.key_results)) {
    for (let i = 0; i < body.key_results.length; i++) {
      const kr = body.key_results[i]
      await c.env.DB.prepare(
        `INSERT INTO goal_key_results (id,goal_id,title,metric_type,target,current,unit,order_index)
         VALUES (?,?,?,?,?,?,?,?)`
      ).bind(uid(), id, kr.title, kr.metric_type || 'percent',
             kr.target || 100, 0, kr.unit || '%', i).run()
    }
  }

  return c.json({ id, created_at: now })
})

businessApi.patch('/goals/:id/progress', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)

  const id = c.req.param('id')
  const { progress, status } = await c.req.json()
  const now = nowIso()

  await c.env.DB.prepare(
    'UPDATE goals SET progress = ?, status = ?, updated_at = ? WHERE id = ?'
  ).bind(progress, status || 'on_track', now, id).run()

  return c.json({ ok: true })
})

// ════════════════════════════════════════════════════════════════════════════
// REGULATIONS
// ════════════════════════════════════════════════════════════════════════════

businessApi.get('/regulations', async (c) => {
  if (!c.env?.DB) return c.json({ regulations: [] })

  try {
    const { category, active } = c.req.query() as Record<string,string>
    let sql = 'SELECT * FROM regulations WHERE 1=1'
    const params: any[] = []
    if (category) { sql += ' AND category = ?';   params.push(category) }
    if (active !== undefined) { sql += ' AND active = ?'; params.push(active === 'true' ? 1 : 0) }
    sql += ' ORDER BY updated_at DESC'

    const regulations = await dbAll(c.env.DB, sql, params)
    return c.json({ regulations })
  } catch {
    return c.json({ regulations: [] })
  }
})

businessApi.post('/regulations', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)

  const body = await c.req.json()
  const id = uid()
  const now = nowIso()

  await c.env.DB.prepare(
    `INSERT INTO regulations (id,title,description,content_md,target_roles,category,version,active,created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?)`
  ).bind(id, body.title, body.description || '', body.content_md || '',
         JSON.stringify(body.target_roles || []), body.category || 'general',
         1, body.active !== false ? 1 : 0, now, now).run()

  return c.json({ id, created_at: now })
})

businessApi.put('/regulations/:id', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)

  const id = c.req.param('id')
  const body = await c.req.json()
  const now = nowIso()

  await c.env.DB.prepare(
    `UPDATE regulations SET title=?,description=?,content_md=?,target_roles=?,category=?,active=?,
     version=version+1,updated_at=? WHERE id=?`
  ).bind(body.title, body.description || '', body.content_md || '',
         JSON.stringify(body.target_roles || []), body.category || 'general',
         body.active !== false ? 1 : 0, now, id).run()

  return c.json({ ok: true })
})

// ════════════════════════════════════════════════════════════════════════════
// KNOWLEDGE BASES
// ════════════════════════════════════════════════════════════════════════════

businessApi.get('/knowledge-bases', async (c) => {
  if (!c.env?.DB) return c.json({ knowledge_bases: [] })

  try {
    const kbs = await dbAll(c.env.DB, 'SELECT * FROM knowledge_bases ORDER BY created_at DESC', [])
    return c.json({ knowledge_bases: kbs })
  } catch {
    return c.json({ knowledge_bases: [] })
  }
})

businessApi.post('/knowledge-bases', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)

  const body = await c.req.json()
  const id = uid()
  const now = nowIso()

  await c.env.DB.prepare(
    `INSERT INTO knowledge_bases (id,name,description,document_count,chunk_count,embedding_model,created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,?)`
  ).bind(id, body.name, body.description || '', 0, 0,
         body.embedding_model || 'text-embedding-3-small', now, now).run()

  return c.json({ id, created_at: now })
})

businessApi.delete('/knowledge-bases/:id', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)
  await c.env.DB.prepare('DELETE FROM knowledge_bases WHERE id = ?').bind(c.req.param('id')).run()
  return c.json({ ok: true })
})

// ════════════════════════════════════════════════════════════════════════════
// EXPENSES (read-only from action_logs)
// ════════════════════════════════════════════════════════════════════════════

businessApi.get('/expenses/summary', async (c) => {
  if (!c.env?.DB) return c.json({ summary: null })

  try {
    const total = await dbFirst(c.env.DB,
      `SELECT SUM(cost_usd) as total, COUNT(*) as calls FROM action_logs WHERE status='success'`, [])

    const byModel = await dbAll(c.env.DB,
      `SELECT model_id as model, SUM(cost_usd) as cost, COUNT(*) as calls
       FROM action_logs WHERE model_id IS NOT NULL GROUP BY model_id ORDER BY cost DESC LIMIT 10`, [])

    const byAgent = await dbAll(c.env.DB,
      `SELECT agent_role, SUM(cost_usd) as cost, COUNT(*) as calls
       FROM action_logs GROUP BY agent_role ORDER BY cost DESC LIMIT 10`, [])

    return c.json({ summary: total, by_model: byModel, by_agent: byAgent })
  } catch {
    return c.json({ summary: { total: 0, calls: 0 }, by_model: [], by_agent: [] })
  }
})

// ════════════════════════════════════════════════════════════════════════════
// COMPANY MEMBERS
// ════════════════════════════════════════════════════════════════════════════

businessApi.get('/company/members', async (c) => {
  if (!c.env?.DB) return c.json({ members: [] })

  try {
    const members = await dbAll(c.env.DB,
      'SELECT * FROM company_members WHERE active=1 ORDER BY created_at ASC', [])
    return c.json({ members })
  } catch {
    return c.json({ members: [] })
  }
})

businessApi.post('/company/members', async (c) => {
  if (!c.env?.DB) return c.json({ error: 'No DB' }, 500)

  const body = await c.req.json()
  const id = uid()
  const now = nowIso()

  await c.env.DB.prepare(
    `INSERT INTO company_members (id,name,email,role_title,department_id,avatar_color,type,agent_role,skills,active,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(id, body.name, body.email || '', body.role_title || '', body.department_id || null,
         body.avatar_color || '#4f46e5', body.type || 'human', body.agent_role || null,
         JSON.stringify(body.skills || []), 1, now).run()

  return c.json({ id, created_at: now })
})
