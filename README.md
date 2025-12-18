# ERA DAL Web Frontend

A modern web interface for the ERA Decision & Arbitration Layer system.

## Project Overview

- **Name**: ERA DAL Web
- **Goal**: Provide a user-friendly web interface for ERA DAL functionality
- **Stack**: Hono + TypeScript + TailwindCSS + Chart.js

## Live URLs

- **Production**: https://3000-i7wko3nccxkuw0hvvjjte-b9b802c4.sandbox.novita.ai
- **GitHub Backend**: https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer

## Pages & Features

### Landing Page (`/`)
- Hero section with product introduction
- Problem/Solution presentation
- Feature showcase
- Use cases
- Statistics
- Call-to-action

### Dashboard (`/dashboard`)
- Real-time statistics (problems, runs, API calls, models)
- Usage charts over time
- Model performance comparison
- Recent activity feed
- Quick stats (confidence, latency, success rate)
- System status indicators

### Profile / Personal Account (`/profile`)
- User information management
- API keys management (view, generate, revoke)
- Subscription details
- Usage statistics
- Account settings

### Playground (`/playground`)
- Query input interface
- Domain selection (science, math, med, econ)
- Mode selection (consensus_top2, consensus_top3, hard_select)
- Advanced settings (repeats, top-k, epsilon, rebuttal)
- Real-time processing indicator
- Results display with metrics
- Model responses breakdown

### History (`/history`)
- Query history list with filtering
- Search by text
- Filter by domain, status, date
- Detailed view modal
- Export functionality
- Pagination

### Settings (`/settings`)
- API configuration (key, base URL, timeouts)
- Default query settings
- Model preferences
- Notifications
- Appearance (theme, language)

### Pricing (`/pricing`)
- Plan comparison (Free, Pro, Enterprise)
- Feature comparison table
- Monthly/yearly toggle
- FAQ section

### Documentation (`/docs`)
- Getting started guide
- Core concepts explanation
- API reference
- Code examples

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/events` | Recent events |
| GET | `/api/models` | Model statistics |
| GET | `/api/history` | Query history |
| GET | `/api/query/:id` | Single query details |
| GET | `/api/profile` | User profile |
| GET | `/api/api-keys` | API keys list |
| POST | `/api/api-keys` | Generate new API key |
| POST | `/api/query` | Submit new query |
| GET | `/api/settings` | User settings |
| PUT | `/api/settings` | Update settings |
| GET | `/api/usage` | Usage statistics |

## Project Structure

```
era-dal-web/
├── src/
│   ├── index.tsx          # Main Hono application
│   ├── pages/
│   │   ├── landing.ts     # Landing page
│   │   ├── dashboard.ts   # Dashboard
│   │   ├── profile.ts     # Profile/Personal account
│   │   ├── playground.ts  # Query playground
│   │   ├── history.ts     # Query history
│   │   ├── settings.ts    # Settings
│   │   ├── pricing.ts     # Pricing page
│   │   └── docs.ts        # Documentation
│   ├── components/
│   │   └── layout.ts      # Shared components (head, navbar, sidebar, footer)
│   └── api/
│       └── routes.ts      # API endpoints
├── public/                # Static assets
├── dist/                  # Built output
├── ecosystem.config.cjs   # PM2 configuration
├── wrangler.jsonc         # Cloudflare configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Development

### Quick Start

```bash
# Install dependencies
npm install

# Build project
npm run build

# Start development server
npm run dev:sandbox

# Or with PM2
pm2 start ecosystem.config.cjs
```

### Available Scripts

- `npm run dev` - Vite dev server
- `npm run dev:sandbox` - Wrangler pages dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

### Local Development
```bash
npm run build
pm2 start ecosystem.config.cjs
```

### Cloudflare Pages
```bash
npm run build
npx wrangler pages deploy dist --project-name era-dal-web
```

## Tech Stack

- **Framework**: Hono (Cloudflare Workers compatible)
- **Build**: Vite
- **Styling**: TailwindCSS (CDN)
- **Icons**: Font Awesome
- **Charts**: Chart.js
- **HTTP Client**: Axios

## Status

- ✅ Landing Page - Complete
- ✅ Dashboard - Complete
- ✅ Profile/Personal Account - Complete
- ✅ Playground - Complete
- ✅ History - Complete
- ✅ Settings - Complete
- ✅ Pricing - Complete
- ✅ Documentation - Complete
- ✅ API Routes - Complete (mock data)

## Next Steps

1. Connect to real ERA DAL backend
2. Implement authentication
3. Add database storage (Cloudflare D1)
4. Deploy to Cloudflare Pages
5. Set up CI/CD

## Author

Eugene Kundrotas

## License

MIT
