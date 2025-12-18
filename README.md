# ERA DAL Web Frontend

A modern web interface for the ERA Decision & Arbitration Layer system with full OpenRouter AI integration.

## Project Overview

- **Name**: ERA DAL Web
- **Goal**: Provide a user-friendly web interface for ERA DAL functionality with multi-model AI integration
- **Stack**: Hono + TypeScript + TailwindCSS + Chart.js + OpenRouter API

## Live URLs

- **Production**: https://3000-i7wko3nccxkuw0hvvjjte-b9b802c4.sandbox.novita.ai
- **GitHub Web**: https://github.com/eukundrotas/era-dal-web
- **GitHub Backend**: https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer

## 🚀 Key Features

### OpenRouter AI Integration
- **400+ AI Models** via OpenRouter API
- **12 Free Models** including DeepSeek R1, Llama 3.2, Qwen 2.5, Gemma 2
- **23+ Paid Models** from OpenAI, Anthropic, Google, Meta, Mistral
- **Ensemble Queries** - Query multiple models in parallel
- **Quality Gate** - Built-in response quality assessment
- **Model Presets** - Pre-configured model sets for different use cases

### Bilingual Interface (EN/RU)
- Full English and Russian language support
- Language switcher in navigation and sidebar
- Persistent language preference

## Pages & Features

### Landing Page (`/`)
- Hero section with product introduction
- Problem/Solution presentation
- Feature showcase
- Use cases & Statistics

### Dashboard (`/dashboard`)
- Real-time statistics (problems, runs, API calls, models)
- Usage charts over time
- Model performance comparison
- Recent activity feed

### AI Providers Configuration (`/ai-config`) ⭐ NEW
- OpenRouter API key management
- Model browser with filters (free/paid, provider, type)
- Pre-configured model presets:
  - **Free Only** - Zero-cost experimentation
  - **Balanced** - Quality + cost efficiency mix
  - **Flagship** - Best quality models
  - **Reasoning** - Complex reasoning specialists
  - **Code** - Programming specialists
- Quick test functionality (single model & ensemble)
- Credits balance display

### Profile (`/profile`)
- User information management
- API keys management
- Subscription details
- Usage statistics

### Playground (`/playground`)
- Query input interface
- Domain selection (science, math, med, econ)
- Mode selection (consensus_top2, consensus_top3, hard_select)
- Advanced settings

### History (`/history`)
- Query history with filtering
- Search, filter by domain/status
- Detailed view modal

### Settings (`/settings`)
- API configuration
- Default query settings
- Model preferences
- Notifications

### Pricing (`/pricing`)
- Plan comparison (Free, Pro, Enterprise)
- Feature comparison table

### Documentation (`/docs`)
- Getting started guide
- Core concepts
- API reference

## API Endpoints

### Core API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/events` | Recent events |
| GET | `/api/models` | Model statistics |
| GET | `/api/history` | Query history |
| GET | `/api/query/:id` | Single query details |
| GET | `/api/profile` | User profile |
| POST | `/api/query` | Submit new query |
| GET | `/api/settings` | User settings |
| PUT | `/api/settings` | Update settings |
| GET | `/api/usage` | Usage statistics |

### OpenRouter API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/openrouter/models` | Available models (filters: type, provider, modelType) |
| GET | `/api/openrouter/models/:id` | Single model info |
| GET | `/api/openrouter/presets` | Model presets |
| POST | `/api/openrouter/test-connection` | Test API key |
| POST | `/api/openrouter/credits` | Get credits balance |
| POST | `/api/openrouter/chat` | Single model chat completion |
| POST | `/api/openrouter/ensemble` | Multi-model ensemble query |
| POST | `/api/openrouter/quality-gate` | Quality assessment (ALLOW/WARN/RETRY/BLOCK) |

## Available AI Models

### Free Models (12)
| Model | Provider | Context | Type |
|-------|----------|---------|------|
| Mistral Devstral 2 | Mistral | 32K | Code |
| DeepSeek R1 | DeepSeek | 64K | Reasoning |
| DeepSeek Chat | DeepSeek | 64K | Chat |
| Gemma 2 9B | Google | 8K | Chat |
| Llama 3.2 3B | Meta | 131K | Chat |
| Llama 3.2 1B | Meta | 131K | Chat |
| Qwen 2.5 7B | Alibaba | 32K | Chat |
| Qwen 2.5 Coder 7B | Alibaba | 32K | Code |
| Phi-3 Mini 128K | Microsoft | 128K | Chat |
| Zephyr 7B | HuggingFace | 4K | Chat |
| OpenChat 7B | OpenChat | 8K | Chat |
| Nous Capybara 7B | NousResearch | 4K | Chat |

### Premium Models (Selection)
| Model | Provider | Context | Price (input/output) |
|-------|----------|---------|----------------------|
| GPT-4o | OpenAI | 128K | $2.50/$10 |
| GPT-4o Mini | OpenAI | 128K | $0.15/$0.60 |
| O1 Preview | OpenAI | 128K | $15/$60 |
| Claude 3.5 Sonnet | Anthropic | 200K | $3/$15 |
| Claude 3 Opus | Anthropic | 200K | $15/$75 |
| Gemini 2.0 Flash | Google | 1M | $0.075/$0.30 |
| Gemini 1.5 Pro | Google | 2M | $1.25/$5 |
| Llama 3.1 405B | Meta | 131K | $2.70/$2.70 |
| Mistral Large | Mistral | 128K | $2/$6 |
| DeepSeek R1 (paid) | DeepSeek | 64K | $0.55/$2.19 |

## Project Structure

```
era-dal-web/
├── src/
│   ├── index.tsx          # Main Hono application
│   ├── pages/
│   │   ├── landing.ts     # Landing page
│   │   ├── dashboard.ts   # Dashboard
│   │   ├── ai-config.ts   # AI Providers Configuration ⭐
│   │   ├── profile.ts     # Profile/Personal account
│   │   ├── playground.ts  # Query playground
│   │   ├── history.ts     # Query history
│   │   ├── settings.ts    # Settings
│   │   ├── pricing.ts     # Pricing page
│   │   └── docs.ts        # Documentation
│   ├── components/
│   │   └── layout.ts      # Shared components
│   ├── api/
│   │   ├── routes.ts      # Core API endpoints
│   │   └── openrouter.ts  # OpenRouter API integration ⭐
│   └── i18n/
│       └── translations.ts # EN/RU translations
├── public/                # Static assets
├── dist/                  # Built output
├── ecosystem.config.cjs   # PM2 configuration
├── wrangler.jsonc         # Cloudflare configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Quick Start

```bash
# Install dependencies
npm install

# Build project
npm run build

# Start development server (sandbox)
pm2 start ecosystem.config.cjs

# Or with wrangler directly
npm run dev:sandbox
```

## OpenRouter Integration Usage

### 1. Get API Key
1. Visit https://openrouter.ai/keys
2. Create a new API key
3. Copy the key

### 2. Configure in App
1. Go to `/ai-config` page
2. Paste your API key
3. Click "Test" to verify connection
4. Select models or use a preset
5. Save configuration

### 3. API Usage Example

```javascript
// Single model chat
const response = await fetch('/api/openrouter/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    apiKey: 'sk-or-v1-...',
    model: 'deepseek/deepseek-chat:free',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});

// Multi-model ensemble
const ensemble = await fetch('/api/openrouter/ensemble', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    apiKey: 'sk-or-v1-...',
    models: [
      'openai/gpt-4o-mini',
      'anthropic/claude-3-haiku',
      'deepseek/deepseek-chat:free'
    ],
    query: 'What is the capital of France?'
  })
});

// Quality Gate assessment
const quality = await fetch('/api/openrouter/quality-gate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    apiKey: 'sk-or-v1-...',
    judgeModel: 'openai/gpt-4o-mini',
    userQuestion: 'What is 2+2?',
    assistantAnswer: 'The answer is 4.'
  })
});
// Returns: { decision: "ALLOW", eqi: 95, scores: {...} }
```

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
- **AI**: OpenRouter API (400+ models)

## Status

- ✅ Landing Page - Complete
- ✅ Dashboard - Complete
- ✅ AI Providers Configuration - Complete ⭐
- ✅ Profile/Personal Account - Complete
- ✅ Playground - Complete
- ✅ History - Complete
- ✅ Settings - Complete
- ✅ Pricing - Complete
- ✅ Documentation - Complete
- ✅ API Routes - Complete
- ✅ OpenRouter Integration - Complete ⭐
- ✅ Bilingual Support (EN/RU) - Complete

## Next Steps

1. ⏳ Deploy to Cloudflare Pages (permanent hosting)
2. ⏳ Implement authentication (OAuth)
3. ⏳ Add database storage (Cloudflare D1)
4. ⏳ Connect to real ERA DAL backend
5. ⏳ Set up CI/CD pipeline
6. ⏳ Add Quality Gate System (Python backend)

## Author

Eugene Kundrotas

## License

MIT

---

**Last Updated**: 2024-12-18
