import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-pages'
import { Language } from './i18n/translations'

// Pages
import { landingPage } from './pages/landing'
import { dashboardPage } from './pages/dashboard'
import { profilePage } from './pages/profile'
import { playgroundPage } from './pages/playground'
import { historyPage } from './pages/history'
import { settingsPage } from './pages/settings'
import { pricingPage } from './pages/pricing'
import { docsPage } from './pages/docs'
import { aiConfigPage } from './pages/ai-config'
import { integrationsPage } from './pages/integrations'
// Meta-Orchestrator Layer
import { metaOrchestratorPage } from './pages/meta-orchestrator'
import { agentsPage } from './pages/agents'
import { scenariosPage } from './pages/scenarios'
import { journalPage } from './pages/journal'

// API Routes
import { apiRoutes } from './api/routes'
import { openRouterApi } from './api/openrouter'
import { integrationsApi } from './api/integrations'
import { metaApi } from './api/meta'

type Bindings = {
  DB: D1Database    // Cloudflare D1 — run: wrangler d1 create era-dal
  KV?: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

// Helper to get language from query params
const getLang = (c: any): Language => {
  const lang = c.req.query('lang')
  return (lang === 'ru' ? 'ru' : 'en') as Language
}

// CORS
app.use('/api/*', cors())

// Static files
app.use('/static/*', serveStatic({ root: './public' }))

// ============================================
// Landing & Marketing Pages
// ============================================
app.get('/', (c) => c.html(landingPage(getLang(c))))
app.get('/pricing', (c) => c.html(pricingPage(getLang(c))))
app.get('/docs', (c) => c.html(docsPage(getLang(c))))

// ============================================
// Dashboard & App Pages
// ============================================
app.get('/dashboard', (c) => c.html(dashboardPage(getLang(c))))
app.get('/playground', (c) => c.html(playgroundPage(getLang(c))))
app.get('/history', (c) => c.html(historyPage(getLang(c))))
app.get('/settings', (c) => c.html(settingsPage(getLang(c))))
app.get('/profile', (c) => c.html(profilePage(getLang(c))))
app.get('/ai-config', (c) => c.html(aiConfigPage(getLang(c))))
app.get('/integrations', (c) => c.html(integrationsPage(getLang(c))))
// Meta-Orchestrator Layer
app.get('/meta', (c) => c.html(metaOrchestratorPage(getLang(c))))
app.get('/agents', (c) => c.html(agentsPage(getLang(c))))
app.get('/scenarios', (c) => c.html(scenariosPage(getLang(c))))
app.get('/journal', (c) => c.html(journalPage(getLang(c))))

// ============================================
// API Routes
// ============================================
app.route('/api', apiRoutes)
app.route('/api/openrouter', openRouterApi)
app.route('/api/integrations', integrationsApi)
app.route('/api/meta', metaApi)

// ============================================
// 404 Handler
// ============================================
app.notFound((c) => {
  const lang = getLang(c)
  const isRu = lang === 'ru'
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="${lang}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404 - ERA DAL</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-blue-500 mb-4">404</h1>
        <p class="text-xl text-gray-400 mb-8">${isRu ? 'Страница не найдена' : 'Page not found'}</p>
        <a href="/?lang=${lang}" class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
          ${isRu ? 'На главную' : 'Back to Home'}
        </a>
      </div>
    </body>
    </html>
  `, 404)
})

export default app
