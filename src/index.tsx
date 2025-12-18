import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-pages'

// Pages
import { landingPage } from './pages/landing'
import { dashboardPage } from './pages/dashboard'
import { profilePage } from './pages/profile'
import { playgroundPage } from './pages/playground'
import { historyPage } from './pages/history'
import { settingsPage } from './pages/settings'
import { pricingPage } from './pages/pricing'
import { docsPage } from './pages/docs'

// API Routes
import { apiRoutes } from './api/routes'

// i18n
import { Language } from './i18n/translations'

type Bindings = {
  DB?: D1Database
  KV?: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

// Helper to get language from request
function getLang(c: any): Language {
  const langQuery = c.req.query('lang')
  if (langQuery === 'ru') return 'ru'
  if (langQuery === 'en') return 'en'
  
  // Check Accept-Language header as fallback
  const acceptLang = c.req.header('Accept-Language') || ''
  if (acceptLang.includes('ru')) return 'ru'
  
  return 'en'
}

// CORS
app.use('/api/*', cors())

// Static files
app.use('/static/*', serveStatic({ root: './public' }))

// ============================================
// Landing & Marketing Pages
// ============================================
app.get('/', (c) => {
  const lang = getLang(c)
  return c.html(landingPage(lang))
})

app.get('/pricing', (c) => {
  const lang = getLang(c)
  return c.html(pricingPage(lang))
})

app.get('/docs', (c) => {
  const lang = getLang(c)
  return c.html(docsPage(lang))
})

// ============================================
// Dashboard & App Pages
// ============================================
app.get('/dashboard', (c) => {
  const lang = getLang(c)
  return c.html(dashboardPage(lang))
})

app.get('/playground', (c) => {
  const lang = getLang(c)
  return c.html(playgroundPage(lang))
})

app.get('/history', (c) => {
  const lang = getLang(c)
  return c.html(historyPage(lang))
})

app.get('/settings', (c) => {
  const lang = getLang(c)
  return c.html(settingsPage(lang))
})

app.get('/profile', (c) => {
  const lang = getLang(c)
  return c.html(profilePage(lang))
})

// ============================================
// API Routes
// ============================================
app.route('/api', apiRoutes)

// ============================================
// 404 Handler
// ============================================
app.notFound((c) => {
  const lang = getLang(c)
  const title = lang === 'ru' ? 'Страница не найдена' : 'Page not found'
  const backText = lang === 'ru' ? 'На главную' : 'Back to Home'
  
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
        <p class="text-xl text-gray-400 mb-8">${title}</p>
        <a href="/${lang === 'ru' ? '?lang=ru' : ''}" class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
          ${backText}
        </a>
      </div>
    </body>
    </html>
  `, 404)
})

export default app
