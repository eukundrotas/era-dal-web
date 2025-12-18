import { Hono } from 'hono'

export const integrationsApi = new Hono()

// ============================================
// Integration Providers Configuration
// ============================================

export interface IntegrationProvider {
  id: string
  name: string
  description: string
  type: 'protocol' | 'framework' | 'runtime' | 'api'
  status: 'stable' | 'beta' | 'experimental'
  features: string[]
  configFields: ConfigField[]
  endpoints?: EndpointConfig[]
}

export interface ConfigField {
  key: string
  label: string
  type: 'text' | 'password' | 'url' | 'number' | 'select' | 'boolean'
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  default?: any
}

export interface EndpointConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  description: string
}

// ============================================
// Available Integration Providers
// ============================================

export const INTEGRATION_PROVIDERS: IntegrationProvider[] = [
  // MCP - Model Context Protocol
  {
    id: 'mcp',
    name: 'Model Context Protocol (MCP)',
    description: 'Anthropic\'s open standard for AI-to-tool integration. Connect to MCP servers for tools, resources, and prompts.',
    type: 'protocol',
    status: 'stable',
    features: [
      'Tool discovery & execution',
      'Resource access (files, databases)',
      'Prompt templates',
      'Sampling requests',
      'Server-sent events',
      'Bidirectional communication'
    ],
    configFields: [
      { key: 'serverUrl', label: 'MCP Server URL', type: 'url', required: true, placeholder: 'http://localhost:3001' },
      { key: 'transportType', label: 'Transport', type: 'select', required: true, options: [
        { value: 'stdio', label: 'Standard I/O' },
        { value: 'sse', label: 'Server-Sent Events' },
        { value: 'websocket', label: 'WebSocket' }
      ], default: 'sse' },
      { key: 'apiKey', label: 'API Key (optional)', type: 'password', required: false },
      { key: 'timeout', label: 'Timeout (ms)', type: 'number', required: false, default: 30000 }
    ],
    endpoints: [
      { method: 'GET', path: '/tools', description: 'List available tools' },
      { method: 'POST', path: '/tools/call', description: 'Execute a tool' },
      { method: 'GET', path: '/resources', description: 'List resources' },
      { method: 'GET', path: '/prompts', description: 'List prompt templates' }
    ]
  },

  // OpenAI-Compatible APIs
  {
    id: 'openai-compatible',
    name: 'OpenAI-Compatible API',
    description: 'Connect to any OpenAI-compatible API endpoint (vLLM, LocalAI, text-generation-webui, etc.)',
    type: 'api',
    status: 'stable',
    features: [
      'Chat completions',
      'Text completions',
      'Embeddings',
      'Custom base URL',
      'Model selection',
      'Streaming support'
    ],
    configFields: [
      { key: 'baseUrl', label: 'Base URL', type: 'url', required: true, placeholder: 'http://localhost:8000/v1' },
      { key: 'apiKey', label: 'API Key', type: 'password', required: false, placeholder: 'sk-...' },
      { key: 'model', label: 'Model Name', type: 'text', required: true, placeholder: 'gpt-3.5-turbo' },
      { key: 'maxTokens', label: 'Max Tokens', type: 'number', required: false, default: 2048 },
      { key: 'temperature', label: 'Temperature', type: 'number', required: false, default: 0.7 }
    ]
  },

  // Ollama
  {
    id: 'ollama',
    name: 'Ollama',
    description: 'Run LLMs locally with Ollama. Supports Llama, Mistral, CodeLlama, and many more models.',
    type: 'runtime',
    status: 'stable',
    features: [
      'Local model execution',
      'No API key required',
      'Model management',
      'Embeddings support',
      'Multi-modal support',
      'Low latency'
    ],
    configFields: [
      { key: 'baseUrl', label: 'Ollama URL', type: 'url', required: true, placeholder: 'http://localhost:11434', default: 'http://localhost:11434' },
      { key: 'model', label: 'Model', type: 'text', required: true, placeholder: 'llama3.2' },
      { key: 'keepAlive', label: 'Keep Alive (minutes)', type: 'number', required: false, default: 5 }
    ]
  },

  // LangChain
  {
    id: 'langchain',
    name: 'LangChain',
    description: 'Framework for developing applications powered by language models. Chain prompts, tools, and agents.',
    type: 'framework',
    status: 'stable',
    features: [
      'Prompt templates',
      'Chain composition',
      'Agent frameworks',
      'Memory management',
      'Tool integration',
      'Retrieval augmentation'
    ],
    configFields: [
      { key: 'langsmithApiKey', label: 'LangSmith API Key', type: 'password', required: false, placeholder: 'ls__...' },
      { key: 'langsmithProject', label: 'LangSmith Project', type: 'text', required: false },
      { key: 'tracingEnabled', label: 'Enable Tracing', type: 'boolean', required: false, default: false },
      { key: 'callbackUrl', label: 'Callback URL', type: 'url', required: false }
    ]
  },

  // LlamaIndex
  {
    id: 'llamaindex',
    name: 'LlamaIndex',
    description: 'Data framework for LLM applications. Index, query, and retrieve from your data.',
    type: 'framework',
    status: 'stable',
    features: [
      'Document indexing',
      'Vector stores',
      'Query engines',
      'Data connectors',
      'Retrieval strategies',
      'Response synthesis'
    ],
    configFields: [
      { key: 'indexType', label: 'Index Type', type: 'select', required: true, options: [
        { value: 'vector', label: 'Vector Store Index' },
        { value: 'keyword', label: 'Keyword Table Index' },
        { value: 'tree', label: 'Tree Index' },
        { value: 'knowledge_graph', label: 'Knowledge Graph' }
      ], default: 'vector' },
      { key: 'chunkSize', label: 'Chunk Size', type: 'number', required: false, default: 1024 },
      { key: 'chunkOverlap', label: 'Chunk Overlap', type: 'number', required: false, default: 200 }
    ]
  },

  // LangGraph
  {
    id: 'langgraph',
    name: 'LangGraph',
    description: 'Build stateful, multi-actor applications with LLMs. Create complex agent workflows.',
    type: 'framework',
    status: 'beta',
    features: [
      'State machines',
      'Multi-agent systems',
      'Workflow orchestration',
      'Conditional branching',
      'Human-in-the-loop',
      'Persistence'
    ],
    configFields: [
      { key: 'checkpointStorage', label: 'Checkpoint Storage', type: 'select', required: false, options: [
        { value: 'memory', label: 'In Memory' },
        { value: 'sqlite', label: 'SQLite' },
        { value: 'postgres', label: 'PostgreSQL' }
      ], default: 'memory' },
      { key: 'recursionLimit', label: 'Recursion Limit', type: 'number', required: false, default: 25 }
    ]
  },

  // CrewAI
  {
    id: 'crewai',
    name: 'CrewAI',
    description: 'Framework for orchestrating role-playing AI agents. Build collaborative AI teams.',
    type: 'framework',
    status: 'beta',
    features: [
      'Agent roles',
      'Task delegation',
      'Process workflows',
      'Tool sharing',
      'Memory across tasks',
      'Hierarchical processes'
    ],
    configFields: [
      { key: 'processType', label: 'Process Type', type: 'select', required: true, options: [
        { value: 'sequential', label: 'Sequential' },
        { value: 'hierarchical', label: 'Hierarchical' },
        { value: 'consensual', label: 'Consensual' }
      ], default: 'sequential' },
      { key: 'verbose', label: 'Verbose Mode', type: 'boolean', required: false, default: true }
    ]
  },

  // AutoGen
  {
    id: 'autogen',
    name: 'Microsoft AutoGen',
    description: 'Framework for building multi-agent conversational systems. Create agent conversations.',
    type: 'framework',
    status: 'beta',
    features: [
      'Multi-agent conversations',
      'Code execution',
      'Human feedback',
      'Function calling',
      'Group chat',
      'Agent customization'
    ],
    configFields: [
      { key: 'codeExecutionEnabled', label: 'Enable Code Execution', type: 'boolean', required: false, default: false },
      { key: 'humanInputMode', label: 'Human Input Mode', type: 'select', required: false, options: [
        { value: 'NEVER', label: 'Never' },
        { value: 'TERMINATE', label: 'On Terminate' },
        { value: 'ALWAYS', label: 'Always' }
      ], default: 'TERMINATE' }
    ]
  },

  // Groq
  {
    id: 'groq',
    name: 'Groq',
    description: 'Ultra-fast inference with Groq LPU. Access Llama, Mixtral, and Gemma models with low latency.',
    type: 'api',
    status: 'stable',
    features: [
      'Ultra-low latency',
      'OpenAI-compatible API',
      'Multiple models',
      'JSON mode',
      'Streaming',
      'Tool use'
    ],
    configFields: [
      { key: 'apiKey', label: 'Groq API Key', type: 'password', required: true, placeholder: 'gsk_...' },
      { key: 'model', label: 'Model', type: 'select', required: true, options: [
        { value: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
        { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B Instant' },
        { value: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' },
        { value: 'gemma2-9b-it', label: 'Gemma 2 9B' }
      ], default: 'llama-3.3-70b-versatile' }
    ]
  },

  // Together AI
  {
    id: 'together',
    name: 'Together AI',
    description: 'Cloud platform for running open-source models. Fast inference with many model options.',
    type: 'api',
    status: 'stable',
    features: [
      'Open-source models',
      'Fine-tuning support',
      'Embeddings',
      'Image generation',
      'Competitive pricing',
      'OpenAI-compatible'
    ],
    configFields: [
      { key: 'apiKey', label: 'Together API Key', type: 'password', required: true },
      { key: 'model', label: 'Model', type: 'text', required: true, placeholder: 'meta-llama/Llama-3.3-70B-Instruct-Turbo' }
    ]
  },

  // Fireworks AI
  {
    id: 'fireworks',
    name: 'Fireworks AI',
    description: 'Fast and efficient model inference. Specialized in function calling and JSON output.',
    type: 'api',
    status: 'stable',
    features: [
      'Fast inference',
      'Function calling',
      'JSON mode',
      'Grammar mode',
      'Fire functions',
      'Model routing'
    ],
    configFields: [
      { key: 'apiKey', label: 'Fireworks API Key', type: 'password', required: true },
      { key: 'model', label: 'Model', type: 'text', required: true, placeholder: 'accounts/fireworks/models/llama-v3p1-70b-instruct' }
    ]
  },

  // Anthropic Direct
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'Direct Anthropic API access for Claude models. Advanced reasoning and analysis.',
    type: 'api',
    status: 'stable',
    features: [
      'Claude 3.5 Sonnet',
      'Claude 3 Opus',
      'Long context (200K)',
      'Vision support',
      'Tool use',
      'Computer use'
    ],
    configFields: [
      { key: 'apiKey', label: 'Anthropic API Key', type: 'password', required: true, placeholder: 'sk-ant-...' },
      { key: 'model', label: 'Model', type: 'select', required: true, options: [
        { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
        { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus' },
        { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' }
      ], default: 'claude-3-5-sonnet-20241022' },
      { key: 'maxTokens', label: 'Max Tokens', type: 'number', required: false, default: 4096 }
    ]
  },

  // Google AI
  {
    id: 'google',
    name: 'Google AI (Gemini)',
    description: 'Access Google\'s Gemini models directly. Multi-modal capabilities with large context.',
    type: 'api',
    status: 'stable',
    features: [
      'Gemini 2.0 Flash',
      'Gemini 1.5 Pro',
      '2M context window',
      'Multi-modal',
      'Code execution',
      'Grounding'
    ],
    configFields: [
      { key: 'apiKey', label: 'Google AI API Key', type: 'password', required: true },
      { key: 'model', label: 'Model', type: 'select', required: true, options: [
        { value: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash' },
        { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
        { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' }
      ], default: 'gemini-2.0-flash-exp' }
    ]
  },

  // Hugging Face
  {
    id: 'huggingface',
    name: 'Hugging Face Inference',
    description: 'Access thousands of models via Hugging Face Inference API or local Transformers.',
    type: 'api',
    status: 'stable',
    features: [
      'Thousands of models',
      'Inference endpoints',
      'Serverless inference',
      'Dedicated endpoints',
      'Text generation',
      'Embeddings'
    ],
    configFields: [
      { key: 'apiKey', label: 'HF API Token', type: 'password', required: true, placeholder: 'hf_...' },
      { key: 'model', label: 'Model ID', type: 'text', required: true, placeholder: 'mistralai/Mistral-7B-Instruct-v0.2' },
      { key: 'endpointUrl', label: 'Endpoint URL (optional)', type: 'url', required: false }
    ]
  },

  // Replicate
  {
    id: 'replicate',
    name: 'Replicate',
    description: 'Run machine learning models in the cloud. Access community models and deploy your own.',
    type: 'api',
    status: 'stable',
    features: [
      'Model marketplace',
      'Version control',
      'Predictions API',
      'Webhooks',
      'Image models',
      'Audio models'
    ],
    configFields: [
      { key: 'apiKey', label: 'Replicate API Token', type: 'password', required: true },
      { key: 'model', label: 'Model', type: 'text', required: true, placeholder: 'meta/llama-2-70b-chat' }
    ]
  },

  // Custom Webhook
  {
    id: 'webhook',
    name: 'Custom Webhook',
    description: 'Integrate with any service via webhooks. Send requests to your own endpoints.',
    type: 'api',
    status: 'stable',
    features: [
      'Custom endpoints',
      'Flexible payloads',
      'Authentication',
      'Headers support',
      'Retry logic',
      'Async support'
    ],
    configFields: [
      { key: 'webhookUrl', label: 'Webhook URL', type: 'url', required: true },
      { key: 'method', label: 'HTTP Method', type: 'select', required: true, options: [
        { value: 'POST', label: 'POST' },
        { value: 'GET', label: 'GET' },
        { value: 'PUT', label: 'PUT' }
      ], default: 'POST' },
      { key: 'authHeader', label: 'Authorization Header', type: 'password', required: false },
      { key: 'customHeaders', label: 'Custom Headers (JSON)', type: 'text', required: false }
    ]
  }
]

// ============================================
// MCP Protocol Types
// ============================================

interface MCPTool {
  name: string
  description: string
  inputSchema: object
}

interface MCPResource {
  uri: string
  name: string
  description?: string
  mimeType?: string
}

interface MCPPrompt {
  name: string
  description?: string
  arguments?: { name: string; description?: string; required?: boolean }[]
}

// ============================================
// API Routes
// ============================================

// Get all available integrations
integrationsApi.get('/providers', (c) => {
  const type = c.req.query('type')
  const status = c.req.query('status')

  let providers = [...INTEGRATION_PROVIDERS]

  if (type) {
    providers = providers.filter(p => p.type === type)
  }

  if (status) {
    providers = providers.filter(p => p.status === status)
  }

  return c.json({
    providers,
    total: providers.length,
    types: [...new Set(INTEGRATION_PROVIDERS.map(p => p.type))],
    statuses: [...new Set(INTEGRATION_PROVIDERS.map(p => p.status))]
  })
})

// Get single provider details
integrationsApi.get('/providers/:id', (c) => {
  const id = c.req.param('id')
  const provider = INTEGRATION_PROVIDERS.find(p => p.id === id)

  if (!provider) {
    return c.json({ error: 'Provider not found' }, 404)
  }

  return c.json(provider)
})

// ============================================
// MCP Server Integration
// ============================================

// List MCP tools
integrationsApi.post('/mcp/tools', async (c) => {
  try {
    const { serverUrl, apiKey } = await c.req.json()

    if (!serverUrl) {
      return c.json({ error: 'Server URL is required' }, 400)
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }

    const response = await fetch(`${serverUrl}/tools/list`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ jsonrpc: '2.0', method: 'tools/list', id: 1 })
    })

    if (!response.ok) {
      return c.json({ error: `MCP server error: ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json({
      tools: data.result?.tools || [],
      total: data.result?.tools?.length || 0
    })
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to list MCP tools' }, 500)
  }
})

// Call MCP tool
integrationsApi.post('/mcp/tools/call', async (c) => {
  try {
    const { serverUrl, apiKey, toolName, arguments: toolArgs } = await c.req.json()

    if (!serverUrl || !toolName) {
      return c.json({ error: 'Server URL and tool name are required' }, 400)
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }

    const response = await fetch(`${serverUrl}/tools/call`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/call',
        params: { name: toolName, arguments: toolArgs || {} },
        id: 1
      })
    })

    if (!response.ok) {
      return c.json({ error: `MCP server error: ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json({
      result: data.result,
      toolName,
      executedAt: new Date().toISOString()
    })
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to call MCP tool' }, 500)
  }
})

// List MCP resources
integrationsApi.post('/mcp/resources', async (c) => {
  try {
    const { serverUrl, apiKey } = await c.req.json()

    if (!serverUrl) {
      return c.json({ error: 'Server URL is required' }, 400)
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }

    const response = await fetch(`${serverUrl}/resources/list`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ jsonrpc: '2.0', method: 'resources/list', id: 1 })
    })

    if (!response.ok) {
      return c.json({ error: `MCP server error: ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json({
      resources: data.result?.resources || [],
      total: data.result?.resources?.length || 0
    })
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to list MCP resources' }, 500)
  }
})

// Read MCP resource
integrationsApi.post('/mcp/resources/read', async (c) => {
  try {
    const { serverUrl, apiKey, uri } = await c.req.json()

    if (!serverUrl || !uri) {
      return c.json({ error: 'Server URL and resource URI are required' }, 400)
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }

    const response = await fetch(`${serverUrl}/resources/read`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'resources/read',
        params: { uri },
        id: 1
      })
    })

    if (!response.ok) {
      return c.json({ error: `MCP server error: ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json({
      contents: data.result?.contents || [],
      uri
    })
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to read MCP resource' }, 500)
  }
})

// List MCP prompts
integrationsApi.post('/mcp/prompts', async (c) => {
  try {
    const { serverUrl, apiKey } = await c.req.json()

    if (!serverUrl) {
      return c.json({ error: 'Server URL is required' }, 400)
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }

    const response = await fetch(`${serverUrl}/prompts/list`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ jsonrpc: '2.0', method: 'prompts/list', id: 1 })
    })

    if (!response.ok) {
      return c.json({ error: `MCP server error: ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json({
      prompts: data.result?.prompts || [],
      total: data.result?.prompts?.length || 0
    })
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to list MCP prompts' }, 500)
  }
})

// ============================================
// Ollama Integration
// ============================================

// List Ollama models
integrationsApi.post('/ollama/models', async (c) => {
  try {
    const { baseUrl } = await c.req.json()
    const url = baseUrl || 'http://localhost:11434'

    const response = await fetch(`${url}/api/tags`)

    if (!response.ok) {
      return c.json({ error: `Ollama error: ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json({
      models: data.models || [],
      total: data.models?.length || 0
    })
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to connect to Ollama' }, 500)
  }
})

// Ollama chat
integrationsApi.post('/ollama/chat', async (c) => {
  try {
    const { baseUrl, model, messages, stream = false } = await c.req.json()
    const url = baseUrl || 'http://localhost:11434'

    if (!model || !messages) {
      return c.json({ error: 'Model and messages are required' }, 400)
    }

    const response = await fetch(`${url}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, stream })
    })

    if (!response.ok) {
      return c.json({ error: `Ollama error: ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json(data)
  } catch (error: any) {
    return c.json({ error: error.message || 'Ollama chat failed' }, 500)
  }
})

// ============================================
// OpenAI-Compatible API
// ============================================

integrationsApi.post('/openai-compatible/chat', async (c) => {
  try {
    const { baseUrl, apiKey, model, messages, temperature = 0.7, max_tokens = 2048 } = await c.req.json()

    if (!baseUrl || !model || !messages) {
      return c.json({ error: 'Base URL, model, and messages are required' }, 400)
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model, messages, temperature, max_tokens })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return c.json({ error: errorData.error?.message || `HTTP ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json(data)
  } catch (error: any) {
    return c.json({ error: error.message || 'Request failed' }, 500)
  }
})

// ============================================
// Direct Provider APIs
// ============================================

// Groq API
integrationsApi.post('/groq/chat', async (c) => {
  try {
    const { apiKey, model, messages, temperature = 0.7, max_tokens = 2048 } = await c.req.json()

    if (!apiKey || !model || !messages) {
      return c.json({ error: 'API key, model, and messages are required' }, 400)
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model, messages, temperature, max_tokens })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return c.json({ error: errorData.error?.message || `HTTP ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json(data)
  } catch (error: any) {
    return c.json({ error: error.message || 'Groq request failed' }, 500)
  }
})

// Anthropic API
integrationsApi.post('/anthropic/chat', async (c) => {
  try {
    const { apiKey, model, messages, max_tokens = 4096 } = await c.req.json()

    if (!apiKey || !model || !messages) {
      return c.json({ error: 'API key, model, and messages are required' }, 400)
    }

    // Convert messages to Anthropic format
    const systemMessage = messages.find((m: any) => m.role === 'system')?.content
    const anthropicMessages = messages.filter((m: any) => m.role !== 'system')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens,
        system: systemMessage,
        messages: anthropicMessages
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return c.json({ error: errorData.error?.message || `HTTP ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json(data)
  } catch (error: any) {
    return c.json({ error: error.message || 'Anthropic request failed' }, 500)
  }
})

// Google AI (Gemini) API
integrationsApi.post('/google/chat', async (c) => {
  try {
    const { apiKey, model, messages } = await c.req.json()

    if (!apiKey || !model || !messages) {
      return c.json({ error: 'API key, model, and messages are required' }, 400)
    }

    // Convert messages to Gemini format
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return c.json({ error: errorData.error?.message || `HTTP ${response.status}` }, response.status)
    }

    const data = await response.json()
    return c.json(data)
  } catch (error: any) {
    return c.json({ error: error.message || 'Google AI request failed' }, 500)
  }
})

// ============================================
// Custom Webhook
// ============================================

integrationsApi.post('/webhook/send', async (c) => {
  try {
    const { webhookUrl, method = 'POST', authHeader, customHeaders, payload } = await c.req.json()

    if (!webhookUrl) {
      return c.json({ error: 'Webhook URL is required' }, 400)
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    if (authHeader) {
      headers['Authorization'] = authHeader
    }

    if (customHeaders) {
      try {
        const parsed = typeof customHeaders === 'string' ? JSON.parse(customHeaders) : customHeaders
        Object.assign(headers, parsed)
      } catch (e) {
        // Ignore invalid JSON
      }
    }

    const fetchOptions: RequestInit = {
      method,
      headers
    }

    if (method !== 'GET' && payload) {
      fetchOptions.body = JSON.stringify(payload)
    }

    const response = await fetch(webhookUrl, fetchOptions)
    const data = await response.json().catch(() => response.text())

    return c.json({
      status: response.status,
      ok: response.ok,
      data
    })
  } catch (error: any) {
    return c.json({ error: error.message || 'Webhook request failed' }, 500)
  }
})

// ============================================
// Test Connection Endpoint
// ============================================

integrationsApi.post('/test-connection', async (c) => {
  try {
    const { providerId, config } = await c.req.json()

    if (!providerId || !config) {
      return c.json({ error: 'Provider ID and config are required' }, 400)
    }

    const provider = INTEGRATION_PROVIDERS.find(p => p.id === providerId)
    if (!provider) {
      return c.json({ error: 'Unknown provider' }, 404)
    }

    let testResult: { success: boolean; message: string; details?: any }

    switch (providerId) {
      case 'ollama':
        try {
          const ollamaRes = await fetch(`${config.baseUrl || 'http://localhost:11434'}/api/tags`)
          if (ollamaRes.ok) {
            const data = await ollamaRes.json()
            testResult = { success: true, message: 'Connected to Ollama', details: { models: data.models?.length || 0 } }
          } else {
            testResult = { success: false, message: `Ollama returned ${ollamaRes.status}` }
          }
        } catch (e: any) {
          testResult = { success: false, message: `Cannot connect to Ollama: ${e.message}` }
        }
        break

      case 'groq':
        try {
          const groqRes = await fetch('https://api.groq.com/openai/v1/models', {
            headers: { 'Authorization': `Bearer ${config.apiKey}` }
          })
          if (groqRes.ok) {
            testResult = { success: true, message: 'Groq API key is valid' }
          } else {
            testResult = { success: false, message: 'Invalid Groq API key' }
          }
        } catch (e: any) {
          testResult = { success: false, message: `Groq error: ${e.message}` }
        }
        break

      case 'anthropic':
        // Anthropic doesn't have a simple test endpoint, so we just validate key format
        if (config.apiKey?.startsWith('sk-ant-')) {
          testResult = { success: true, message: 'Anthropic API key format is valid' }
        } else {
          testResult = { success: false, message: 'Invalid Anthropic API key format' }
        }
        break

      case 'openai-compatible':
        try {
          const oaiRes = await fetch(`${config.baseUrl}/models`, {
            headers: config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {}
          })
          if (oaiRes.ok) {
            testResult = { success: true, message: 'OpenAI-compatible API connected' }
          } else {
            testResult = { success: false, message: `API returned ${oaiRes.status}` }
          }
        } catch (e: any) {
          testResult = { success: false, message: `Cannot connect: ${e.message}` }
        }
        break

      case 'mcp':
        try {
          const mcpRes = await fetch(`${config.serverUrl}/health`)
          if (mcpRes.ok) {
            testResult = { success: true, message: 'MCP server is reachable' }
          } else {
            // Try JSON-RPC initialize
            const initRes = await fetch(`${config.serverUrl}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ jsonrpc: '2.0', method: 'initialize', id: 1 })
            })
            if (initRes.ok) {
              testResult = { success: true, message: 'MCP server connected via JSON-RPC' }
            } else {
              testResult = { success: false, message: 'MCP server not responding' }
            }
          }
        } catch (e: any) {
          testResult = { success: false, message: `Cannot connect to MCP server: ${e.message}` }
        }
        break

      default:
        testResult = { success: true, message: `Configuration saved for ${provider.name}` }
    }

    return c.json(testResult)
  } catch (error: any) {
    return c.json({ error: error.message || 'Connection test failed' }, 500)
  }
})
