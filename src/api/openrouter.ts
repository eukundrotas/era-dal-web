import { Hono } from 'hono'

export const openRouterApi = new Hono()

// ============================================
// OpenRouter Models Database
// ============================================

// Free models available on OpenRouter
export const FREE_MODELS = [
  { id: 'mistralai/devstral-2-2512:free', name: 'Mistral Devstral 2', provider: 'Mistral', context: 32768, type: 'code' },
  { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1', provider: 'DeepSeek', context: 64000, type: 'reasoning' },
  { id: 'deepseek/deepseek-chat:free', name: 'DeepSeek Chat', provider: 'DeepSeek', context: 64000, type: 'chat' },
  { id: 'google/gemma-2-9b-it:free', name: 'Gemma 2 9B', provider: 'Google', context: 8192, type: 'chat' },
  { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Llama 3.2 3B', provider: 'Meta', context: 131072, type: 'chat' },
  { id: 'meta-llama/llama-3.2-1b-instruct:free', name: 'Llama 3.2 1B', provider: 'Meta', context: 131072, type: 'chat' },
  { id: 'qwen/qwen-2.5-7b-instruct:free', name: 'Qwen 2.5 7B', provider: 'Alibaba', context: 32768, type: 'chat' },
  { id: 'qwen/qwen-2.5-coder-7b-instruct:free', name: 'Qwen 2.5 Coder 7B', provider: 'Alibaba', context: 32768, type: 'code' },
  { id: 'microsoft/phi-3-mini-128k-instruct:free', name: 'Phi-3 Mini 128K', provider: 'Microsoft', context: 128000, type: 'chat' },
  { id: 'huggingfaceh4/zephyr-7b-beta:free', name: 'Zephyr 7B', provider: 'HuggingFace', context: 4096, type: 'chat' },
  { id: 'openchat/openchat-7b:free', name: 'OpenChat 7B', provider: 'OpenChat', context: 8192, type: 'chat' },
  { id: 'nousresearch/nous-capybara-7b:free', name: 'Nous Capybara 7B', provider: 'NousResearch', context: 4096, type: 'chat' },
]

// Paid models (popular choices)
export const PAID_MODELS = [
  // OpenAI
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI', context: 128000, type: 'flagship', price: '$2.50/$10' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', context: 128000, type: 'fast', price: '$0.15/$0.60' },
  { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', context: 128000, type: 'flagship', price: '$10/$30' },
  { id: 'openai/o1-preview', name: 'O1 Preview', provider: 'OpenAI', context: 128000, type: 'reasoning', price: '$15/$60' },
  { id: 'openai/o1-mini', name: 'O1 Mini', provider: 'OpenAI', context: 128000, type: 'reasoning', price: '$3/$12' },
  
  // Anthropic
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', context: 200000, type: 'flagship', price: '$3/$15' },
  { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', context: 200000, type: 'flagship', price: '$15/$75' },
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', context: 200000, type: 'fast', price: '$0.25/$1.25' },
  
  // Google
  { id: 'google/gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', provider: 'Google', context: 1000000, type: 'fast', price: '$0.075/$0.30' },
  { id: 'google/gemini-pro-1.5', name: 'Gemini 1.5 Pro', provider: 'Google', context: 2000000, type: 'flagship', price: '$1.25/$5' },
  
  // Meta Llama
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', provider: 'Meta', context: 131072, type: 'flagship', price: '$2.70/$2.70' },
  { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', provider: 'Meta', context: 131072, type: 'balanced', price: '$0.35/$0.40' },
  { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B', provider: 'Meta', context: 131072, type: 'balanced', price: '$0.12/$0.30' },
  
  // Mistral
  { id: 'mistralai/mistral-large-2411', name: 'Mistral Large', provider: 'Mistral', context: 128000, type: 'flagship', price: '$2/$6' },
  { id: 'mistralai/mistral-medium', name: 'Mistral Medium', provider: 'Mistral', context: 32000, type: 'balanced', price: '$2.70/$8.10' },
  { id: 'mistralai/mistral-small', name: 'Mistral Small', provider: 'Mistral', context: 32000, type: 'fast', price: '$0.20/$0.60' },
  { id: 'mistralai/codestral-latest', name: 'Codestral', provider: 'Mistral', context: 32000, type: 'code', price: '$0.30/$0.90' },
  
  // DeepSeek
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3', provider: 'DeepSeek', context: 64000, type: 'chat', price: '$0.14/$0.28' },
  { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', context: 64000, type: 'reasoning', price: '$0.55/$2.19' },
  
  // Qwen
  { id: 'qwen/qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B', provider: 'Alibaba', context: 131072, type: 'flagship', price: '$0.35/$0.40' },
  { id: 'qwen/qwq-32b-preview', name: 'QwQ 32B Preview', provider: 'Alibaba', context: 32768, type: 'reasoning', price: '$0.15/$0.15' },
  
  // Cohere
  { id: 'cohere/command-r-plus', name: 'Command R+', provider: 'Cohere', context: 128000, type: 'flagship', price: '$2.50/$10' },
  { id: 'cohere/command-r', name: 'Command R', provider: 'Cohere', context: 128000, type: 'balanced', price: '$0.15/$0.60' },
]

// All models combined
export const ALL_MODELS = [...FREE_MODELS, ...PAID_MODELS]

// ============================================
// OpenRouter API Routes
// ============================================

// Get available models list
openRouterApi.get('/models', (c) => {
  const type = c.req.query('type') // free, paid, all
  const provider = c.req.query('provider')
  const modelType = c.req.query('modelType') // chat, code, reasoning, flagship, etc.

  let models = type === 'free' ? FREE_MODELS : type === 'paid' ? PAID_MODELS : ALL_MODELS

  if (provider) {
    models = models.filter(m => m.provider.toLowerCase() === provider.toLowerCase())
  }

  if (modelType) {
    models = models.filter(m => m.type === modelType)
  }

  return c.json({
    models,
    total: models.length,
    providers: [...new Set(ALL_MODELS.map(m => m.provider))],
    types: [...new Set(ALL_MODELS.map(m => m.type))]
  })
})

// Get single model info
openRouterApi.get('/models/:id', (c) => {
  const id = decodeURIComponent(c.req.param('id'))
  const model = ALL_MODELS.find(m => m.id === id)
  
  if (!model) {
    return c.json({ error: 'Model not found' }, 404)
  }

  return c.json(model)
})

// Test OpenRouter API connection
openRouterApi.post('/test-connection', async (c) => {
  try {
    const body = await c.req.json()
    const apiKey = body.apiKey

    if (!apiKey) {
      return c.json({ success: false, error: 'API key is required' }, 400)
    }

    // Test connection to OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return c.json({ 
        success: false, 
        error: errorData.error?.message || `HTTP ${response.status}: ${response.statusText}` 
      }, 400)
    }

    const data = await response.json()
    
    return c.json({
      success: true,
      message: 'Connection successful',
      modelsAvailable: data.data?.length || 0
    })
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message || 'Connection failed' 
    }, 500)
  }
})

// Chat completion endpoint (proxy to OpenRouter)
openRouterApi.post('/chat', async (c) => {
  try {
    const body = await c.req.json()
    const { 
      apiKey, 
      model, 
      messages, 
      temperature = 0.7, 
      max_tokens = 2048,
      stream = false 
    } = body

    if (!apiKey) {
      return c.json({ error: 'API key is required' }, 400)
    }

    if (!model) {
      return c.json({ error: 'Model is required' }, 400)
    }

    if (!messages || !Array.isArray(messages)) {
      return c.json({ error: 'Messages array is required' }, 400)
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://era-dal.pages.dev',
        'X-Title': 'ERA DAL'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
        stream
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return c.json({ 
        error: errorData.error?.message || `HTTP ${response.status}: ${response.statusText}` 
      }, response.status)
    }

    const data = await response.json()
    return c.json(data)
  } catch (error: any) {
    return c.json({ error: error.message || 'Request failed' }, 500)
  }
})

// Multi-model query (ERA DAL ensemble)
openRouterApi.post('/ensemble', async (c) => {
  try {
    const body = await c.req.json()
    const { 
      apiKey, 
      models, 
      query, 
      systemPrompt,
      temperature = 0.7,
      max_tokens = 2048
    } = body

    if (!apiKey) {
      return c.json({ error: 'API key is required' }, 400)
    }

    if (!models || !Array.isArray(models) || models.length === 0) {
      return c.json({ error: 'At least one model is required' }, 400)
    }

    if (!query) {
      return c.json({ error: 'Query is required' }, 400)
    }

    const messages = [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      { role: 'user', content: query }
    ]

    // Execute queries in parallel
    const startTime = Date.now()
    const results = await Promise.allSettled(
      models.map(async (modelId: string) => {
        const modelStartTime = Date.now()
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://era-dal.pages.dev',
            'X-Title': 'ERA DAL Ensemble'
          },
          body: JSON.stringify({
            model: modelId,
            messages,
            temperature,
            max_tokens
          })
        })

        const modelEndTime = Date.now()

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error?.message || `HTTP ${response.status}`)
        }

        const data = await response.json()
        
        return {
          model: modelId,
          response: data.choices?.[0]?.message?.content || '',
          usage: data.usage,
          latency: modelEndTime - modelStartTime
        }
      })
    )

    const endTime = Date.now()

    // Process results
    const successful = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
      .map(r => r.value)

    const failed = results
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
      .map((r, i) => ({
        model: models[i],
        error: r.reason?.message || 'Unknown error'
      }))

    return c.json({
      query,
      totalLatency: endTime - startTime,
      successful: successful.length,
      failed: failed.length,
      results: successful,
      errors: failed
    })
  } catch (error: any) {
    return c.json({ error: error.message || 'Ensemble query failed' }, 500)
  }
})

// Get OpenRouter usage/credits
openRouterApi.post('/credits', async (c) => {
  try {
    const body = await c.req.json()
    const apiKey = body.apiKey

    if (!apiKey) {
      return c.json({ error: 'API key is required' }, 400)
    }

    const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return c.json({ 
        error: errorData.error?.message || `HTTP ${response.status}` 
      }, response.status)
    }

    const data = await response.json()
    return c.json(data)
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to get credits' }, 500)
  }
})

// ERA DAL Quality Gate - Judge response
openRouterApi.post('/quality-gate', async (c) => {
  try {
    const body = await c.req.json()
    const { 
      apiKey, 
      judgeModel = 'openai/gpt-4o-mini',
      userQuestion,
      assistantAnswer,
      context = ''
    } = body

    if (!apiKey) {
      return c.json({ error: 'API key is required' }, 400)
    }

    if (!userQuestion || !assistantAnswer) {
      return c.json({ error: 'userQuestion and assistantAnswer are required' }, 400)
    }

    const judgePrompt = `You are a strict AI quality judge. Evaluate the following AI response.

USER QUESTION:
${userQuestion}

ASSISTANT ANSWER:
${assistantAnswer}

${context ? `CONTEXT PROVIDED:\n${context}\n` : ''}

Evaluate on these criteria (1-5 scale):
1. relevance: Does it answer the question?
2. factual_correctness: Is it factually accurate?
3. no_hallucination: Does it avoid making things up?
4. usefulness: Is it helpful and actionable?
5. context_usage: Does it use provided context well?

Also identify any STOP FACTORS:
- factual_error: Critical factual mistake
- hallucination: Made up information
- harmful_content: Dangerous or inappropriate
- off_topic: Doesn't address the question

Respond ONLY with valid JSON:
{
  "scores": {
    "relevance": <1-5>,
    "factual_correctness": <1-5>,
    "no_hallucination": <1-5>,
    "usefulness": <1-5>,
    "context_usage": <1-5>
  },
  "stop_factors": ["factual_error" | "hallucination" | "harmful_content" | "off_topic"],
  "eqi": <0-100>,
  "decision": "ALLOW" | "WARN" | "RETRY" | "BLOCK",
  "explanation": "<brief explanation>"
}`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://era-dal.pages.dev',
        'X-Title': 'ERA DAL Quality Gate'
      },
      body: JSON.stringify({
        model: judgeModel,
        messages: [
          { role: 'system', content: 'You are an AI quality judge. Respond only with valid JSON.' },
          { role: 'user', content: judgePrompt }
        ],
        temperature: 0.1,
        max_tokens: 1024
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return c.json({ 
        error: errorData.error?.message || `HTTP ${response.status}` 
      }, response.status)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || '{}'

    // Parse JSON response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const judgeResult = JSON.parse(jsonMatch[0])
        return c.json({
          success: true,
          judgeModel,
          result: judgeResult,
          usage: data.usage
        })
      }
    } catch (parseError) {
      // If parsing fails, return raw content
    }

    return c.json({
      success: true,
      judgeModel,
      raw: content,
      usage: data.usage
    })
  } catch (error: any) {
    return c.json({ error: error.message || 'Quality gate check failed' }, 500)
  }
})

// Provider configuration presets
openRouterApi.get('/presets', (c) => {
  return c.json({
    presets: [
      {
        id: 'free-only',
        name: 'Free Models Only',
        description: 'Use only free models for zero-cost experimentation',
        models: FREE_MODELS.slice(0, 5).map(m => m.id)
      },
      {
        id: 'balanced',
        name: 'Balanced Performance',
        description: 'Mix of quality and cost efficiency',
        models: [
          'openai/gpt-4o-mini',
          'anthropic/claude-3-haiku',
          'google/gemini-2.0-flash-exp',
          'meta-llama/llama-3.3-70b-instruct',
          'mistralai/mistral-small'
        ]
      },
      {
        id: 'flagship',
        name: 'Flagship Models',
        description: 'Best quality, highest cost',
        models: [
          'openai/gpt-4o',
          'anthropic/claude-3.5-sonnet',
          'google/gemini-pro-1.5',
          'meta-llama/llama-3.1-405b-instruct',
          'mistralai/mistral-large-2411'
        ]
      },
      {
        id: 'reasoning',
        name: 'Reasoning Specialists',
        description: 'Models optimized for complex reasoning',
        models: [
          'openai/o1-preview',
          'openai/o1-mini',
          'deepseek/deepseek-r1',
          'qwen/qwq-32b-preview'
        ]
      },
      {
        id: 'code',
        name: 'Code Generation',
        description: 'Models optimized for coding tasks',
        models: [
          'mistralai/codestral-latest',
          'qwen/qwen-2.5-coder-7b-instruct:free',
          'mistralai/devstral-2-2512:free',
          'deepseek/deepseek-chat'
        ]
      }
    ]
  })
})
