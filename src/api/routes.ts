import { Hono } from 'hono'
import { dbFirst, dbAll } from '../lib/db/index'

type Bindings = { DB: D1Database }

export const apiRoutes = new Hono<{ Bindings: Bindings }>()

// ─── Helpers ────────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

// Mock data for demonstration
const mockDashboardData = {
  problems: 142,
  runs: 847,
  apiCalls: 1250,
  models: 7,
  avgConfidence: 87,
  avgLatency: 1850,
  successRate: 94,
  topDomain: 'Science',
  topModel: 'GPT-4o',
  events: [
    { type: 'success', title: 'Query Completed', description: 'Scientific hypothesis analysis', time: '2m ago' },
    { type: 'success', title: 'Consensus Reached', description: '5/7 models agreed on dark matter evidence', time: '5m ago' },
    { type: 'pending', title: 'Processing', description: 'Clinical trial data analysis', time: '8m ago' },
    { type: 'success', title: 'Literature Review', description: 'Systematic review — 94% CI stability', time: '15m ago' },
    { type: 'error', title: 'Timeout', description: 'Model Llama-3.1 exceeded timeout', time: '22m ago' }
  ]
}

const mockModels = [
  { name: 'gpt-4o', calls: 234, avgLatency: 1.2, successRate: 0.95, rank: 1 },
  { name: 'claude-3.5-sonnet', calls: 198, avgLatency: 1.5, successRate: 0.92, rank: 2 },
  { name: 'gemini-1.5-pro', calls: 176, avgLatency: 1.8, successRate: 0.90, rank: 3 },
  { name: 'llama-3.1-70b', calls: 145, avgLatency: 2.1, successRate: 0.88, rank: 4 },
  { name: 'mistral-large', calls: 132, avgLatency: 1.4, successRate: 0.87, rank: 5 },
  { name: 'qwen-2.5-72b', calls: 98, avgLatency: 2.5, successRate: 0.85, rank: 6 },
  { name: 'deepseek-v3', calls: 64, avgLatency: 2.0, successRate: 0.83, rank: 7 }
]

const mockEvents = [
  { id: 'evt_001', type: 'query_completed', timestamp: new Date().toISOString(), data: { query: 'Dark matter evidence', confidence: 0.92 } },
  { id: 'evt_002', type: 'consensus_reached', timestamp: new Date(Date.now() - 180000).toISOString(), data: { agreement: 5, total: 7 } },
  { id: 'evt_003', type: 'model_timeout', timestamp: new Date(Date.now() - 360000).toISOString(), data: { model: 'llama-3.1-70b' } },
  { id: 'evt_004', type: 'query_completed', timestamp: new Date(Date.now() - 900000).toISOString(), data: { query: 'Fermat theorem', confidence: 0.88 } },
  { id: 'evt_005', type: 'rebuttal_round', timestamp: new Date(Date.now() - 1200000).toISOString(), data: { improvements: 2 } }
]

const mockHistory = [
  {
    id: 'q_001',
    query: 'What is the current scientific evidence for dark matter in the universe?',
    domain: 'science',
    status: 'success',
    confidence: 0.92,
    latency: 2.3,
    models: 5,
    runs: 3,
    wilsonCi: [0.78, 0.96],
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    answer: 'Based on the ensemble analysis, dark matter evidence comes from several key observations...'
  },
  {
    id: 'q_002',
    query: 'Explain the proof of Fermat\'s Last Theorem by Andrew Wiles',
    domain: 'math',
    status: 'success',
    confidence: 0.88,
    latency: 1.8,
    models: 5,
    runs: 3,
    wilsonCi: [0.72, 0.94],
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    answer: 'Wiles\' proof connects Fermat\'s Last Theorem to the modularity theorem...'
  },
  {
    id: 'q_003',
    query: 'What are the latest treatments for treatment-resistant depression?',
    domain: 'med',
    status: 'partial',
    confidence: 0.65,
    latency: 3.1,
    models: 7,
    runs: 5,
    wilsonCi: [0.48, 0.79],
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    answer: 'Current treatments for TRD include ketamine/esketamine, TMS, ECT...'
  }
]

// Health check
apiRoutes.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.2.0',
    uptime: process.uptime ? Math.floor(process.uptime()) : 0
  })
})

// Dashboard statistics — real D1 when available, mock fallback otherwise
apiRoutes.get('/dashboard', async (c) => {
  const db = c.env?.DB
  if (!db) return c.json(mockDashboardData)

  try {
    const today = new Date().toISOString().slice(0, 10)

    const [todayRow, totalPlansRow, totalLogsRow, modelRow, recentRows] = await Promise.all([
      dbFirst<{ total: number; success: number; cost: number }>(
        db,
        `SELECT COUNT(*) as total,
                SUM(CASE WHEN status='success' THEN 1 ELSE 0 END) as success,
                SUM(cost_usd) as cost
         FROM action_logs WHERE date(created_at) = ?`,
        today
      ),
      dbFirst<{ cnt: number }>(db, 'SELECT COUNT(*) as cnt FROM meta_plans'),
      dbFirst<{ cnt: number }>(db, 'SELECT COUNT(*) as cnt FROM action_logs'),
      dbFirst<{ model_id: string | null }>(
        db,
        `SELECT model_id FROM action_logs
         WHERE model_id IS NOT NULL AND date(created_at) = ?
         GROUP BY model_id ORDER BY COUNT(*) DESC LIMIT 1`,
        today
      ),
      dbAll<{ action: string; agent_role: string; status: string; created_at: string }>(
        db,
        'SELECT action, agent_role, status, created_at FROM action_logs ORDER BY created_at DESC LIMIT 5'
      ),
    ])

    const totalToday = todayRow?.total ?? 0
    const successToday = todayRow?.success ?? 0

    return c.json({
      problems: totalLogsRow?.cnt ?? 0,
      runs: totalPlansRow?.cnt ?? 0,
      apiCalls: totalToday,
      models: 0,
      avgConfidence: 0,
      avgLatency: 0,
      successRate: totalToday > 0 ? Math.round((successToday / totalToday) * 100) : 0,
      topDomain: '',
      topModel: modelRow?.model_id ?? '—',
      costToday: todayRow?.cost ?? 0,
      events: recentRows.map(r => ({
        type: r.status === 'success' ? 'success' : r.status === 'error' ? 'error' : 'pending',
        title: r.action.length > 70 ? r.action.slice(0, 67) + '…' : r.action,
        description: r.agent_role,
        time: relativeTime(r.created_at),
      })),
    })
  } catch {
    return c.json(mockDashboardData)
  }
})

// Events
apiRoutes.get('/events', (c) => {
  const limit = parseInt(c.req.query('limit') || '50')
  return c.json({
    events: mockEvents.slice(0, limit),
    total: mockEvents.length
  })
})

// Models
apiRoutes.get('/models', (c) => {
  return c.json({
    models: mockModels,
    total: mockModels.length
  })
})

// History — real meta_plans from D1, mock fallback
apiRoutes.get('/history', async (c) => {
  const db = c.env?.DB
  if (!db) return c.json({ items: mockHistory, total: mockHistory.length, limit: 20, offset: 0 })

  const status = c.req.query('status') || ''
  const strategy = c.req.query('strategy') || ''
  const search = c.req.query('search') || ''
  const limit = Math.min(parseInt(c.req.query('limit') || '20'), 100)
  const offset = parseInt(c.req.query('offset') || '0')

  const conds: string[] = []
  const vals: unknown[] = []
  if (status)   { conds.push('p.status = ?');        vals.push(status) }
  if (strategy) { conds.push('p.strategy = ?');      vals.push(strategy) }
  if (search)   { conds.push('p.user_prompt LIKE ?'); vals.push(`%${search}%`) }
  const where = conds.length ? `WHERE ${conds.join(' AND ')}` : ''

  try {
    const [countRow, rows] = await Promise.all([
      dbFirst<{ cnt: number }>(db, `SELECT COUNT(*) as cnt FROM meta_plans p ${where}`, ...vals),
      dbAll<{
        id: string; user_prompt: string; status: string; strategy: string
        global_thinking_mode: string; estimated_cost_usd: number; actual_cost_usd: number | null
        created_at: string; completed_at: string | null
        step_count: number; done_count: number
      }>(
        db,
        `SELECT p.id, p.user_prompt, p.status, p.strategy, p.global_thinking_mode,
                p.estimated_cost_usd, p.actual_cost_usd, p.created_at, p.completed_at,
                COUNT(s.id) as step_count,
                SUM(CASE WHEN s.status='done' THEN 1 ELSE 0 END) as done_count
         FROM meta_plans p
         LEFT JOIN meta_plan_steps s ON s.plan_id = p.id
         ${where}
         GROUP BY p.id
         ORDER BY p.created_at DESC
         LIMIT ? OFFSET ?`,
        ...vals, limit, offset
      ),
    ])

    return c.json({
      items: rows.map(r => ({
        id: r.id,
        prompt: r.user_prompt,
        status: r.status,
        strategy: r.strategy,
        thinkingMode: r.global_thinking_mode,
        estimatedCostUsd: r.estimated_cost_usd,
        actualCostUsd: r.actual_cost_usd,
        stepCount: r.step_count,
        doneCount: r.done_count ?? 0,
        createdAt: r.created_at,
        completedAt: r.completed_at,
      })),
      total: countRow?.cnt ?? 0,
      limit,
      offset,
    })
  } catch {
    return c.json({ items: mockHistory, total: mockHistory.length, limit, offset })
  }
})

// Single query details
apiRoutes.get('/query/:id', (c) => {
  const id = c.req.param('id')
  const query = mockHistory.find(h => h.id === id)
  
  if (!query) {
    return c.json({ error: 'Query not found' }, 404)
  }

  return c.json({
    ...query,
    modelResponses: [
      { model: 'GPT-4o', rank: 1, score: 0.95, response: 'According to current evidence...' },
      { model: 'Claude 3.5', rank: 2, score: 0.92, response: 'The scientific consensus suggests...' },
      { model: 'Gemini 1.5', rank: 3, score: 0.88, response: 'Based on observations...' },
      { model: 'Llama 3.1', rank: 4, score: 0.85, response: 'Research indicates...' },
      { model: 'Mistral', rank: 5, score: 0.82, response: 'Studies show...' }
    ]
  })
})

// User profile
apiRoutes.get('/profile', (c) => {
  return c.json({
    id: 'usr_001',
    name: 'Researcher',
    email: '',
    institution: '',
    location: '',
    plan: 'individual',
    createdAt: new Date().toISOString()
  })
})

// Research access tokens (read-only — stored in browser localStorage)
apiRoutes.get('/api-keys', (c) => {
  return c.json({
    note: 'API keys are stored in browser localStorage only — the server never holds them.',
    keys: []
  })
})

// Submit query (mock)
apiRoutes.post('/query', async (c) => {
  const body = await c.req.json()
  
  // Simulate processing time
  const id = 'q_' + Math.random().toString(36).substr(2, 9)
  
  return c.json({
    id,
    status: 'processing',
    query: body.query,
    domain: body.domain || 'science',
    config: {
      mode: body.mode || 'consensus_top2',
      thinking_mode: body.thinking_mode || 'standard',
      repeats: body.repeats || 3,
      consensusTopK: body.consensus_topk || 2,
      epsilon: body.epsilon || 0.05,
      rebuttal: body.rebuttal || false
    },
    createdAt: new Date().toISOString()
  }, 202)
})

// Settings
apiRoutes.get('/settings', (c) => {
  return c.json({
    api: {
      baseUrl: 'https://openrouter.ai/api/v1',
      solverTimeout: 30,
      arbiterTimeout: 60
    },
    defaults: {
      domain: 'science',
      mode: 'consensus_top2',
      thinking_mode: 'standard',
      repeats: 3,
      consensusTopK: 2,
      epsilon: 0.05,
      rebuttal: false,
      hardOnly: false
    },
    models: {
      enabled: ['gpt-4o', 'claude-3.5-sonnet', 'llama-3.1-70b', 'mistral-large', 'gemini-1.5-pro']
    },
    notifications: {
      email: true,
      usageAlerts: true,
      weeklyDigest: false
    }
  })
})

// Update settings (mock)
apiRoutes.put('/settings', async (c) => {
  const body = await c.req.json()
  return c.json({
    success: true,
    message: 'Settings updated successfully',
    updatedAt: new Date().toISOString()
  })
})

// Usage statistics
apiRoutes.get('/usage', (c) => {
  const period = c.req.query('period') || '30d'
  
  return c.json({
    period,
    summary: {
      totalCalls: 847,
      avgLatency: 1.85,
      successRate: 0.942,
      topDomain: 'science',
      topModel: 'gpt-4o'
    },
    daily: [
      { date: '2024-12-11', calls: 28 },
      { date: '2024-12-12', calls: 35 },
      { date: '2024-12-13', calls: 42 },
      { date: '2024-12-14', calls: 31 },
      { date: '2024-12-15', calls: 48 },
      { date: '2024-12-16', calls: 56 },
      { date: '2024-12-17', calls: 62 },
      { date: '2024-12-18', calls: 45 }
    ],
    byDomain: {
      science: 340,
      math: 210,
      med: 180,
      social_science: 117
    },
    byModel: {
      'gpt-4o': 234,
      'claude-3.5-sonnet': 198,
      'gemini-1.5-pro': 176,
      'llama-3.1-70b': 145,
      'mistral-large': 94
    }
  })
})
