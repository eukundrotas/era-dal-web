import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { writeFileSync } from 'fs'

// Post-build plugin: extend _routes.json so static assets bypass the Worker
const fixRoutes = () => ({
  name: 'fix-routes-json',
  closeBundle() {
    const routes = {
      version: 1,
      include: ['/*'],
      exclude: ['/static/*', '/favicon.svg', '/icon-192.svg', '/manifest.json'],
    }
    writeFileSync('./dist/_routes.json', JSON.stringify(routes))
  },
})

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx',
    }),
    fixRoutes(),
  ],
})
