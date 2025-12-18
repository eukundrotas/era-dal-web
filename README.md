# ERA DAL Web Frontend

A modern web interface for the ERA Decision & Arbitration Layer system with comprehensive AI integrations.

## Project Overview

- **Name**: ERA DAL Web
- **Goal**: Universal AI integration platform with multi-model support and external service connections
- **Stack**: Hono + TypeScript + TailwindCSS + Chart.js + OpenRouter + MCP + Multi-Provider APIs

## Live URLs

- **Dev Server**: https://3000-i7wko3nccxkuw0hvvjjte-b9b802c4.sandbox.novita.ai
- **GitHub Web**: https://github.com/eukundrotas/era-dal-web
- **GitHub Backend**: https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer

## 🚀 Key Features

### OpenRouter AI Integration
- **400+ AI Models** via OpenRouter API
- **12 Free Models** including DeepSeek R1, Llama 3.2, Qwen 2.5, Gemma 2
- **23+ Paid Models** from OpenAI, Anthropic, Google, Meta, Mistral
- **Ensemble Queries** - Query multiple models in parallel
- **Quality Gate** - Built-in response quality assessment (ALLOW/WARN/RETRY/BLOCK)
- **Model Presets** - Pre-configured model sets for different use cases

### 🆕 Multi-Platform Integrations
- **MCP (Model Context Protocol)** - Anthropic's standard for AI-to-tool integration
- **Ollama** - Local model execution
- **OpenAI-Compatible APIs** - Connect to any OpenAI-compatible endpoint
- **Groq** - Ultra-fast inference
- **Anthropic Claude** - Direct API access
- **Google Gemini** - Direct API access
- **Hugging Face** - Thousands of models
- **LangChain** - Agent frameworks
- **LlamaIndex** - Data indexing
- **LangGraph** - Multi-agent workflows
- **CrewAI** - Role-playing AI agents
- **AutoGen** - Multi-agent conversations
- **Custom Webhooks** - Connect to any service

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

### AI Providers Configuration (`/ai-config`)
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

### 🆕 Integrations Hub (`/integrations`)
- **15+ Integration Providers**
- Provider browser with filters (Protocol/Framework/Runtime/API)
- Configuration forms with validation
- Connection testing
- MCP Explorer (Tools, Resources, Prompts)
- Quick test panel for configured integrations
- Active integrations summary

### Other Pages
- **Profile** (`/profile`) - User info, API keys, subscription
- **Playground** (`/playground`) - Query interface with domain/mode selection
- **History** (`/history`) - Query history with filtering
- **Settings** (`/settings`) - API config, preferences
- **Pricing** (`/pricing`) - Plan comparison
- **Documentation** (`/docs`) - Getting started guide

## API Endpoints

### Core API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/models` | Model statistics |
| GET | `/api/history` | Query history |
| POST | `/api/query` | Submit new query |
| GET | `/api/settings` | User settings |

### OpenRouter API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/openrouter/models` | Available models |
| GET | `/api/openrouter/presets` | Model presets |
| POST | `/api/openrouter/chat` | Single model chat |
| POST | `/api/openrouter/ensemble` | Multi-model query |
| POST | `/api/openrouter/quality-gate` | Quality assessment |

### 🆕 Integrations API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/integrations/providers` | List all providers |
| GET | `/api/integrations/providers/:id` | Provider details |
| POST | `/api/integrations/test-connection` | Test provider connection |
| POST | `/api/integrations/mcp/tools` | List MCP tools |
| POST | `/api/integrations/mcp/tools/call` | Execute MCP tool |
| POST | `/api/integrations/mcp/resources` | List MCP resources |
| POST | `/api/integrations/mcp/prompts` | List MCP prompts |
| POST | `/api/integrations/ollama/models` | List Ollama models |
| POST | `/api/integrations/ollama/chat` | Ollama chat |
| POST | `/api/integrations/openai-compatible/chat` | OpenAI-compatible chat |
| POST | `/api/integrations/groq/chat` | Groq chat |
| POST | `/api/integrations/anthropic/chat` | Anthropic chat |
| POST | `/api/integrations/google/chat` | Google AI chat |
| POST | `/api/integrations/webhook/send` | Custom webhook |

## Integration Providers

### Protocols
| Provider | Description | Status |
|----------|-------------|--------|
| **MCP** | Anthropic's Model Context Protocol for AI-to-tool integration | Stable |

### Runtimes
| Provider | Description | Status |
|----------|-------------|--------|
| **Ollama** | Local LLM execution (Llama, Mistral, CodeLlama) | Stable |

### Frameworks
| Provider | Description | Status |
|----------|-------------|--------|
| **LangChain** | Chain prompts, tools, and agents | Stable |
| **LlamaIndex** | Document indexing and retrieval | Stable |
| **LangGraph** | Stateful multi-actor workflows | Beta |
| **CrewAI** | Role-playing AI agents | Beta |
| **AutoGen** | Multi-agent conversations | Beta |

### APIs
| Provider | Description | Status |
|----------|-------------|--------|
| **OpenAI-Compatible** | Any OpenAI-compatible endpoint | Stable |
| **Groq** | Ultra-fast inference (LPU) | Stable |
| **Anthropic** | Claude models direct access | Stable |
| **Google AI** | Gemini models direct access | Stable |
| **Together AI** | Open-source models | Stable |
| **Fireworks AI** | Fast inference, function calling | Stable |
| **Hugging Face** | Inference API | Stable |
| **Replicate** | Model marketplace | Stable |
| **Custom Webhook** | Any HTTP endpoint | Stable |

## Project Structure

```
era-dal-web/
├── src/
│   ├── index.tsx          # Main Hono application
│   ├── pages/
│   │   ├── landing.ts     # Landing page
│   │   ├── dashboard.ts   # Dashboard
│   │   ├── ai-config.ts   # AI Providers Configuration
│   │   ├── integrations.ts # Integrations Hub ⭐
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
│   │   ├── openrouter.ts  # OpenRouter API
│   │   └── integrations.ts # Multi-platform integrations ⭐
│   └── i18n/
│       └── translations.ts # EN/RU translations
├── public/                # Static assets
├── dist/                  # Built output
├── ecosystem.config.cjs   # PM2 configuration
├── wrangler.jsonc         # Cloudflare configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies
```

## Quick Start

```bash
# Install dependencies
npm install

# Build project
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# Or with wrangler directly
npm run dev:sandbox
```

## Usage Examples

### OpenRouter Chat
```javascript
const response = await fetch('/api/openrouter/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    apiKey: 'sk-or-v1-...',
    model: 'deepseek/deepseek-chat:free',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});
```

### MCP Tool Execution
```javascript
const tools = await fetch('/api/integrations/mcp/tools', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    serverUrl: 'http://localhost:3001',
    apiKey: 'optional-key'
  })
});

const result = await fetch('/api/integrations/mcp/tools/call', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    serverUrl: 'http://localhost:3001',
    toolName: 'search_documents',
    arguments: { query: 'AI integration' }
  })
});
```

### Ollama Local Model
```javascript
const response = await fetch('/api/integrations/ollama/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    baseUrl: 'http://localhost:11434',
    model: 'llama3.2',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});
```

### Groq Fast Inference
```javascript
const response = await fetch('/api/integrations/groq/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    apiKey: 'gsk_...',
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});
```

## Tech Stack

- **Framework**: Hono (Cloudflare Workers compatible)
- **Build**: Vite
- **Styling**: TailwindCSS (CDN)
- **Icons**: Font Awesome
- **Charts**: Chart.js
- **AI**: OpenRouter + MCP + Multi-Provider APIs

## Status

- ✅ Landing Page - Complete
- ✅ Dashboard - Complete
- ✅ AI Providers Configuration - Complete
- ✅ Integrations Hub - Complete ⭐
- ✅ Profile/Personal Account - Complete
- ✅ Playground - Complete
- ✅ History - Complete
- ✅ Settings - Complete
- ✅ Pricing - Complete
- ✅ Documentation - Complete
- ✅ OpenRouter Integration - Complete
- ✅ MCP Integration - Complete ⭐
- ✅ Multi-Provider APIs - Complete ⭐
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
