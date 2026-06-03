import { Hono } from 'hono'

export const apiRoutes = new Hono()

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
    { type: 'success', title: 'Consensus Reached', description: '5/7 models agreed', time: '5m ago' },
    { type: 'pending', title: 'Processing', description: 'Medical diagnosis query', time: '8m ago' },
    { type: 'success', title: 'High Confidence', description: 'Financial forecast - 94% CI', time: '15m ago' },
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

// Dashboard statistics
apiRoutes.get('/dashboard', (c) => {
  return c.json(mockDashboardData)
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

// History
apiRoutes.get('/history', (c) => {
  const domain = c.req.query('domain')
  const status = c.req.query('status')
  const limit = parseInt(c.req.query('limit') || '20')
  const offset = parseInt(c.req.query('offset') || '0')

  let filtered = [...mockHistory]
  
  if (domain) {
    filtered = filtered.filter(h => h.domain === domain)
  }
  if (status) {
    filtered = filtered.filter(h => h.status === status)
  }

  return c.json({
    items: filtered.slice(offset, offset + limit),
    total: filtered.length,
    limit,
    offset
  })
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
    name: 'Eugene Kundrotas',
    email: 'eukundrotas@gmail.com',
    company: 'UAB Propriezura',
    location: 'Lithuania',
    plan: 'pro',
    apiCalls: {
      used: 847,
      limit: 10000,
      resetDate: '2025-01-18'
    },
    createdAt: '2024-12-01T00:00:00Z'
  })
})

// API keys
apiRoutes.get('/api-keys', (c) => {
  return c.json({
    keys: [
      { id: 'key_001', name: 'Production Key', prefix: 'era_sk_prod_****...****7a3f', status: 'active', createdAt: '2024-12-01' },
      { id: 'key_002', name: 'Development Key', prefix: 'era_sk_dev_****...****9b2e', status: 'active', createdAt: '2024-12-15' }
    ]
  })
})

// Generate new API key (mock)
apiRoutes.post('/api-keys', async (c) => {
  const body = await c.req.json()
  return c.json({
    id: 'key_' + Math.random().toString(36).substr(2, 9),
    name: body.name || 'New Key',
    key: 'era_sk_' + Math.random().toString(36).substr(2, 32),
    status: 'active',
    createdAt: new Date().toISOString()
  }, 201)
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
      weeklyReports: false,
      marketing: false
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
      econ: 117
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
