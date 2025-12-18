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

type Bindings = {
  DB?: D1Database
  KV?: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS
app.use('/api/*', cors())

// Static files
app.use('/static/*', serveStatic({ root: './public' }))

// ============================================
// Landing & Marketing Pages
// ============================================
app.get('/', (c) => c.html(landingPage()))
app.get('/pricing', (c) => c.html(pricingPage()))
app.get('/docs', (c) => c.html(docsPage()))

// ============================================
// Dashboard & App Pages
// ============================================
app.get('/dashboard', (c) => c.html(dashboardPage()))
app.get('/playground', (c) => c.html(playgroundPage()))
app.get('/history', (c) => c.html(historyPage()))
app.get('/settings', (c) => c.html(settingsPage()))
app.get('/profile', (c) => c.html(profilePage()))

// ============================================
// API Routes
// ============================================
app.route('/api', apiRoutes)

// ============================================
// 404 Handler
// ============================================
app.notFound((c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404 - ERA DAL</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-blue-500 mb-4">404</h1>
        <p class="text-xl text-gray-400 mb-8">Page not found</p>
        <a href="/" class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
          Back to Home
        </a>
      </div>
    </body>
    </html>
  `, 404)
})

export default app
