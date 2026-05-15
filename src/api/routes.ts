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

// ──────────────────────────────────────────────
// Scraper API
// ──────────────────────────────────────────────

interface ScraperResult {
  url: string
  phones: string[]
  emails: string[]
  contact_page: string | null
  status: 'ok' | 'error'
  error: string | null
}

interface ScraperJob {
  id: string
  status: 'running' | 'done' | 'error' | 'stopped'
  createdAt: string
  urls: string[]
  results: ScraperResult[]
  log: string[]
  config: {
    proxy: string | null
    concurrency: number
    mobile_only: boolean
    deep_search: boolean
  }
}

const scraperJobs = new Map<string, ScraperJob>()

// Start a new scraper job
apiRoutes.post('/scraper/start', async (c) => {
  const body = await c.req.json()
  const { urls, proxy, concurrency = 5, mobile_only = true, deep_search = true } = body

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return c.json({ error: 'urls array is required' }, 400)
  }

  const jobId = 'job_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
  const job: ScraperJob = {
    id: jobId,
    status: 'running',
    createdAt: new Date().toISOString(),
    urls,
    results: [],
    log: [`[→] Queued ${urls.length} URLs, concurrency=${concurrency}`],
    config: { proxy: proxy || null, concurrency, mobile_only, deep_search },
  }
  scraperJobs.set(jobId, job)

  // Simulate async processing (in production this would spawn the Python process)
  simulateScraping(job)

  return c.json({ job_id: jobId, status: 'running', total: urls.length })
})

// Get job status and results
apiRoutes.get('/scraper/status/:jobId', (c) => {
  const jobId = c.req.param('jobId')
  const job = scraperJobs.get(jobId)
  if (!job) return c.json({ error: 'Job not found' }, 404)

  return c.json({
    job_id: job.id,
    status: job.status,
    total: job.urls.length,
    processed: job.results.length,
    results: job.results,
    log: job.log,
  })
})

// Stop a running job
apiRoutes.post('/scraper/stop/:jobId', (c) => {
  const jobId = c.req.param('jobId')
  const job = scraperJobs.get(jobId)
  if (job) {
    job.status = 'stopped'
    job.log.push('[!] Stopped by user')
  }
  return c.json({ ok: true })
})

// List recent jobs
apiRoutes.get('/scraper/jobs', (c) => {
  const jobs = Array.from(scraperJobs.values())
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 20)
    .map(j => ({
      id: j.id,
      status: j.status,
      createdAt: j.createdAt,
      total: j.urls.length,
      processed: j.results.length,
      withContacts: j.results.filter(r => r.phones.length || r.emails.length).length,
    }))
  return c.json({ jobs })
})

// Demo simulation — in production replace with actual Python subprocess call
function simulateScraping(job: ScraperJob) {
  const PHONE_RE = /(?:\+7|8)[\s\-_]?\(?\d{3}\)?[\s\-_]?\d{3}[\s\-_]?\d{2}[\s\-_]?\d{2}/g

  let idx = 0
  const tick = () => {
    if (job.status === 'stopped') return
    if (idx >= job.urls.length) {
      job.status = 'done'
      job.log.push(`[✓] Finished. ${job.results.filter(r => r.phones.length).length}/${job.urls.length} sites had phones.`)
      return
    }

    const url = job.urls[idx++]
    job.log.push(`[→] ${url}`)

    // Simulated result (real impl calls Python scraper)
    const hasMock = Math.random() > 0.5
    const result: ScraperResult = {
      url,
      phones: hasMock ? ['7' + (900_000_0000 + Math.floor(Math.random() * 99_999_999)).toString()] : [],
      emails: hasMock && Math.random() > 0.6 ? ['info@' + (new URL(url.startsWith('http') ? url : 'https://' + url)).hostname] : [],
      contact_page: job.config.deep_search && !hasMock && Math.random() > 0.7 ? url + '/contacts' : null,
      status: Math.random() > 0.1 ? 'ok' : 'error',
      error: null,
    }
    if (result.status === 'error') {
      result.phones = []
      result.emails = []
      result.error = 'Timeout'
      job.log.push(`  [!] Error: Timeout`)
    } else {
      job.log.push(`  [✓] phones=${result.phones.length} emails=${result.emails.length}`)
    }

    job.results.push(result)

    // Stagger per concurrency setting
    const delay = Math.max(300, 800 / job.config.concurrency + Math.random() * 500)
    setTimeout(tick, delay)
  }

  // Start concurrency workers
  const workers = Math.min(job.config.concurrency, job.urls.length)
  for (let i = 0; i < workers; i++) setTimeout(tick, i * 200)
}

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
