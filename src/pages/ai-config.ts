import { head, sidebar, footer } from '../components/layout'
import { Language, getSection } from '../i18n/translations'

export const aiConfigPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'

  return `
<!DOCTYPE html>
<html lang="${lang}">
${head(
  isRu ? 'Настройка AI провайдеров | ERA DAL' : 'AI Providers Configuration | ERA DAL',
  isRu ? 'Управляйте ключами всех AI провайдеров' : 'Manage API keys for all AI providers'
)}
<body class="bg-gray-900 text-white min-h-screen">
  <div class="flex">
    ${sidebar(lang)}
    <main class="flex-1 ml-56 p-8">
      <div class="max-w-6xl mx-auto">

        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold gradient-text mb-2">
            ${isRu ? 'AI Провайдеры' : 'AI Providers'}
          </h1>
          <p class="text-gray-400">
            ${isRu
              ? 'Ключи хранятся только в вашем браузере (localStorage) и никогда не покидают вашего устройства'
              : 'Keys are stored only in your browser (localStorage) and never leave your device'}
          </p>
          <div class="flex items-center gap-2 mt-2 text-xs text-green-400">
            <i class="fas fa-shield-alt"></i>
            <span>${isRu ? 'Полная конфиденциальность — сервер не видит ваши ключи' : 'Full privacy — server never sees your keys'}</span>
          </div>
        </div>

        <!-- Stats bar -->
        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="glass-card rounded-xl p-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <i class="fas fa-check-circle text-green-400"></i>
            </div>
            <div>
              <div id="stat-configured" class="text-2xl font-bold text-green-400">0</div>
              <div class="text-xs text-gray-500">${isRu ? 'Провайдеров настроено' : 'Providers configured'}</div>
            </div>
          </div>
          <div class="glass-card rounded-xl p-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <i class="fas fa-robot text-blue-400"></i>
            </div>
            <div>
              <div id="stat-models" class="text-2xl font-bold text-blue-400">0</div>
              <div class="text-xs text-gray-500">${isRu ? 'Моделей доступно' : 'Models available'}</div>
            </div>
          </div>
          <div class="glass-card rounded-xl p-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <i class="fas fa-plus text-purple-400"></i>
            </div>
            <div>
              <div id="stat-custom" class="text-2xl font-bold text-purple-400">0</div>
              <div class="text-xs text-gray-500">${isRu ? 'Кастомных моделей' : 'Custom models'}</div>
            </div>
          </div>
        </div>

        <!-- Provider Cards -->
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <i class="fas fa-plug text-blue-400"></i>
          ${isRu ? 'Провайдеры' : 'Providers'}
        </h2>
        <div id="providers-grid" class="grid md:grid-cols-2 gap-4 mb-8">
          <!-- Rendered by JS -->
        </div>

        <!-- Custom Models -->
        <div class="glass-card rounded-xl p-6 mb-8">
          <h2 class="text-xl font-semibold mb-1 flex items-center gap-2">
            <i class="fas fa-plus-circle text-purple-400"></i>
            ${isRu ? 'Добавить модель вручную' : 'Add Custom Model'}
          </h2>
          <p class="text-sm text-gray-500 mb-4">
            ${isRu
              ? 'Добавьте любой ID модели от любого провайдера'
              : 'Add any model ID from any provider'}
          </p>
          <div class="flex gap-3 mb-4">
            <select id="custom-provider-select" class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm w-40">
              <!-- Populated by JS -->
            </select>
            <input id="custom-model-id" type="text"
              placeholder="${isRu ? 'ID модели (напр. gpt-4-turbo)' : 'Model ID (e.g. gpt-4-turbo)'}"
              class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:border-purple-500 focus:outline-none">
            <input id="custom-model-name" type="text"
              placeholder="${isRu ? 'Название (необязательно)' : 'Display name (optional)'}"
              class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:border-purple-500 focus:outline-none">
            <button onclick="addCustomModel()"
              class="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-lg text-sm transition flex items-center gap-2">
              <i class="fas fa-plus"></i>
              ${isRu ? 'Добавить' : 'Add'}
            </button>
          </div>
          <div id="custom-models-list" class="flex flex-wrap gap-2">
            <span class="text-xs text-gray-600">${isRu ? 'Нет кастомных моделей' : 'No custom models yet'}</span>
          </div>
        </div>

        <!-- All Available Models Summary -->
        <div class="glass-card rounded-xl p-6 mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold flex items-center gap-2">
              <i class="fas fa-layer-group text-yellow-400"></i>
              ${isRu ? 'Все доступные модели' : 'All Available Models'}
            </h2>
            <input id="models-search" type="text" placeholder="${isRu ? 'Поиск...' : 'Search...'}"
              oninput="renderAllModels()"
              class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-yellow-500 w-48">
          </div>
          <div id="all-models-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
            <p class="text-sm text-gray-600 col-span-3">${isRu ? 'Настройте хотя бы одного провайдера' : 'Configure at least one provider to see models'}</p>
          </div>
        </div>

        <!-- Quick Test -->
        <div class="glass-card rounded-xl p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-flask text-green-400"></i>
            ${isRu ? 'Быстрый тест модели' : 'Quick Model Test'}
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-gray-500 mb-1">${isRu ? 'Выберите модель' : 'Select model'}</label>
              <select id="test-model-select" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm mb-3">
                <option value="">${isRu ? 'Нет настроенных моделей' : 'No configured models'}</option>
              </select>
              <textarea id="test-query" rows="3"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm resize-none focus:border-green-500 focus:outline-none"
                placeholder="${isRu ? 'Тестовый запрос...' : 'Test query...'}"
              >What is 2+2?</textarea>
              <button onclick="runModelTest()"
                class="mt-2 w-full bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm transition flex items-center justify-center gap-2">
                <i class="fas fa-play"></i>
                ${isRu ? 'Запустить тест' : 'Run Test'}
              </button>
            </div>
            <div id="test-result" class="bg-gray-800 rounded-lg p-4 text-sm text-gray-500 flex items-center justify-center">
              ${isRu ? 'Результат появится здесь' : 'Result will appear here'}
            </div>
          </div>
        </div>

        <!-- Save -->
        <div class="flex justify-end gap-3">
          <button onclick="clearAllKeys()"
            class="bg-red-900/40 hover:bg-red-900/60 border border-red-500/30 text-red-400 px-6 py-2.5 rounded-lg text-sm transition">
            <i class="fas fa-trash mr-2"></i>
            ${isRu ? 'Очистить все ключи' : 'Clear All Keys'}
          </button>
          <button onclick="saveAllToStorage()"
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-2.5 rounded-lg text-sm font-semibold transition">
            <i class="fas fa-save mr-2"></i>
            ${isRu ? 'Сохранить всё' : 'Save All'}
          </button>
        </div>

      </div>
    </main>
  </div>
  ${footer(lang)}

  <script>
  const isRu = ${isRu};

  // ─── Provider definitions ───────────────────────────────────────────────
  const PROVIDERS = [
    {
      id: 'openrouter',
      name: 'OpenRouter',
      icon: 'fa-route',
      color: '#3b82f6',
      tagColor: 'blue',
      desc: isRu ? '400+ моделей — Anthropic, OpenAI, Google и др. через единый API' : '400+ models — Anthropic, OpenAI, Google and more via unified API',
      placeholder: 'sk-or-v1-...',
      docsUrl: 'https://openrouter.ai/keys',
      models: [
        { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B', free: true },
        { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash', free: true },
        { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1', free: true },
        { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B', free: true },
        { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', free: false },
        { id: 'openai/gpt-4o', name: 'GPT-4o', free: false },
        { id: 'google/gemini-pro-1.5', name: 'Gemini 1.5 Pro', free: false },
        { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', free: false },
        { id: 'openai/gpt-4o-mini', name: 'GPT-4o mini', free: false },
        { id: 'cohere/command-r-plus', name: 'Command R+', free: false },
      ]
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      icon: 'fa-brain',
      color: '#f97316',
      tagColor: 'orange',
      desc: isRu ? 'Claude Opus, Sonnet, Haiku — прямой доступ к API Anthropic' : 'Claude Opus, Sonnet, Haiku — direct access to Anthropic API',
      placeholder: 'sk-ant-api03-...',
      docsUrl: 'https://console.anthropic.com/settings/keys',
      models: [
        { id: 'claude-opus-4-8', name: 'Claude Opus 4.8', free: false },
        { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', free: false },
        { id: 'claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5', free: false },
        { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', free: false },
        { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', free: false },
      ]
    },
    {
      id: 'openai',
      name: 'OpenAI',
      icon: 'fa-circle',
      color: '#10b981',
      tagColor: 'emerald',
      desc: isRu ? 'GPT-4o, o1, o3-mini — API OpenAI' : 'GPT-4o, o1, o3-mini — OpenAI API',
      placeholder: 'sk-proj-...',
      docsUrl: 'https://platform.openai.com/api-keys',
      models: [
        { id: 'gpt-4o', name: 'GPT-4o', free: false },
        { id: 'gpt-4o-mini', name: 'GPT-4o mini', free: false },
        { id: 'o1', name: 'o1', free: false },
        { id: 'o1-mini', name: 'o1-mini', free: false },
        { id: 'o3-mini', name: 'o3-mini', free: false },
        { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', free: false },
      ]
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      icon: 'fa-gem',
      color: '#8b5cf6',
      tagColor: 'violet',
      desc: isRu ? 'Gemini 2.0 Flash, 1.5 Pro — Google AI Studio' : 'Gemini 2.0 Flash, 1.5 Pro — Google AI Studio',
      placeholder: 'AIza...',
      docsUrl: 'https://aistudio.google.com/app/apikey',
      models: [
        { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', free: true },
        { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro', free: false },
        { id: 'gemini-1.5-flash-latest', name: 'Gemini 1.5 Flash', free: true },
        { id: 'gemini-1.0-pro', name: 'Gemini 1.0 Pro', free: false },
      ]
    },
    {
      id: 'groq',
      name: 'Groq',
      icon: 'fa-bolt',
      color: '#f59e0b',
      tagColor: 'amber',
      desc: isRu ? 'Сверхбыстрый инференс — Llama, Mixtral, Gemma' : 'Ultra-fast inference — Llama, Mixtral, Gemma',
      placeholder: 'gsk_...',
      docsUrl: 'https://console.groq.com/keys',
      models: [
        { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', free: true },
        { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', free: true },
        { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', free: true },
        { id: 'gemma2-9b-it', name: 'Gemma 2 9B', free: true },
        { id: 'llama3-70b-8192', name: 'Llama 3 70B', free: true },
      ]
    },
    {
      id: 'mistral',
      name: 'Mistral AI',
      icon: 'fa-wind',
      color: '#ec4899',
      tagColor: 'pink',
      desc: isRu ? 'Mistral Large, Medium, Small — прямой API' : 'Mistral Large, Medium, Small — direct API',
      placeholder: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      docsUrl: 'https://console.mistral.ai/api-keys/',
      models: [
        { id: 'mistral-large-latest', name: 'Mistral Large', free: false },
        { id: 'mistral-medium-latest', name: 'Mistral Medium', free: false },
        { id: 'mistral-small-latest', name: 'Mistral Small', free: false },
        { id: 'open-mixtral-8x22b', name: 'Mixtral 8x22B', free: false },
        { id: 'open-mistral-7b', name: 'Mistral 7B', free: false },
      ]
    },
    {
      id: 'cohere',
      name: 'Cohere',
      icon: 'fa-vector-square',
      color: '#06b6d4',
      tagColor: 'cyan',
      desc: isRu ? 'Command R+ — специализация на RAG и enterprise' : 'Command R+ — specialised for RAG and enterprise',
      placeholder: '...',
      docsUrl: 'https://dashboard.cohere.com/api-keys',
      models: [
        { id: 'command-r-plus', name: 'Command R+', free: false },
        { id: 'command-r', name: 'Command R', free: false },
        { id: 'command', name: 'Command', free: false },
      ]
    },
    {
      id: 'together',
      name: 'Together AI',
      icon: 'fa-object-group',
      color: '#84cc16',
      tagColor: 'lime',
      desc: isRu ? 'Open-source модели с высокой скоростью' : 'Open-source models at high throughput',
      placeholder: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      docsUrl: 'https://api.together.xyz/settings/api-keys',
      models: [
        { id: 'meta-llama/Llama-3.3-70B-Instruct-Turbo', name: 'Llama 3.3 70B Turbo', free: false },
        { id: 'mistralai/Mixtral-8x7B-Instruct-v0.1', name: 'Mixtral 8x7B', free: false },
        { id: 'Qwen/Qwen2.5-72B-Instruct-Turbo', name: 'Qwen 2.5 72B', free: false },
        { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B', free: false },
      ]
    },
    {
      id: 'perplexity',
      name: 'Perplexity',
      icon: 'fa-search',
      color: '#6366f1',
      tagColor: 'indigo',
      desc: isRu ? 'Sonar — поиск в реальном времени + LLM' : 'Sonar — real-time search + LLM',
      placeholder: 'pplx-...',
      docsUrl: 'https://www.perplexity.ai/settings/api',
      models: [
        { id: 'llama-3.1-sonar-large-128k-online', name: 'Sonar Large Online', free: false },
        { id: 'llama-3.1-sonar-small-128k-online', name: 'Sonar Small Online', free: false },
        { id: 'llama-3.1-sonar-huge-128k-online', name: 'Sonar Huge Online', free: false },
      ]
    },
    {
      id: 'ollama',
      name: 'Ollama (Local)',
      icon: 'fa-server',
      color: '#64748b',
      tagColor: 'slate',
      desc: isRu ? 'Локальные модели — укажите URL вашего сервера Ollama' : 'Local models — specify your Ollama server URL',
      placeholder: 'http://localhost:11434',
      docsUrl: 'https://ollama.com/download',
      isUrl: true,
      models: [
        { id: 'llama3.2', name: 'Llama 3.2', free: true },
        { id: 'mistral', name: 'Mistral 7B', free: true },
        { id: 'gemma2', name: 'Gemma 2', free: true },
        { id: 'qwen2.5', name: 'Qwen 2.5', free: true },
        { id: 'phi4', name: 'Phi-4', free: true },
      ]
    },
  ];

  let customModels = [];

  // ─── Init ───────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    customModels = JSON.parse(localStorage.getItem('era_custom_models') || '[]');
    renderProviders();
    renderAllModels();
    renderCustomModels();
    updateStats();
    populateTestSelect();
    populateCustomProviderSelect();
  });

  // ─── Render provider cards ──────────────────────────────────────────────
  function renderProviders() {
    const grid = document.getElementById('providers-grid');
    grid.innerHTML = PROVIDERS.map(p => {
      const savedKey = getSavedKey(p.id);
      const hasKey = !!savedKey;
      const keyLabel = p.isUrl ? (isRu ? 'URL сервера' : 'Server URL') : (isRu ? 'API ключ' : 'API key');
      return \`
        <div class="glass-card rounded-xl p-5 border \${hasKey ? 'border-green-500/30' : 'border-gray-700/50'} transition-all" id="card-\${p.id}">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:\${p.color}22">
                <i class="fas \${p.icon}" style="color:\${p.color}"></i>
              </div>
              <div>
                <h3 class="font-semibold">\${p.name}</h3>
                <p class="text-xs text-gray-500">\${p.desc}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span id="status-\${p.id}" class="text-xs px-2 py-0.5 rounded-full \${hasKey ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-500'}">
                \${hasKey ? (isRu ? '✓ Настроен' : '✓ Configured') : (isRu ? 'Не настроен' : 'Not set')}
              </span>
              <a href="\${p.docsUrl}" target="_blank" class="text-xs text-blue-400 hover:text-blue-300" title="\${isRu ? 'Получить ключ' : 'Get key'}">
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>

          <div class="flex gap-2 mb-3">
            <div class="flex-1 relative">
              <input type="password" id="key-\${p.id}"
                placeholder="\${p.placeholder}"
                value="\${savedKey ? '••••••••' + savedKey.slice(-4) : ''}"
                data-real-value="\${savedKey || ''}"
                onfocus="this.type='text'; this.value=this.dataset.realValue; this.dataset.focused='1'"
                onblur="blurKey('\${p.id}')"
                oninput="this.dataset.realValue=this.value"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none pr-8">
              <button onclick="toggleKeyVis('\${p.id}')" class="absolute right-2 top-2.5 text-gray-500 hover:text-gray-300">
                <i class="fas fa-eye text-xs"></i>
              </button>
            </div>
            <button onclick="saveKey('\${p.id}')"
              class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-xs transition">
              <i class="fas fa-save"></i>
            </button>
            \${!p.isUrl ? \`<button onclick="testKey('\${p.id}')"
              class="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-xs transition" title="\${isRu ? 'Тест' : 'Test'}">
              <i class="fas fa-plug"></i>
            </button>\` : ''}
          </div>

          <!-- Models chips -->
          <div class="flex flex-wrap gap-1">
            \${p.models.slice(0, 5).map(m => \`
              <span class="text-xs px-2 py-0.5 rounded \${m.free ? 'bg-green-900/40 text-green-400' : 'bg-gray-800 text-gray-400'}
                \${hasKey ? '' : 'opacity-40'}">
                \${m.name}
                \${m.free ? '<span class="text-green-600 ml-0.5">free</span>' : ''}
              </span>
            \`).join('')}
            \${p.models.length > 5 ? \`<span class="text-xs text-gray-600">+\${p.models.length - 5} more</span>\` : ''}
          </div>
        </div>
      \`;
    }).join('');
  }

  function blurKey(id) {
    const input = document.getElementById('key-' + id);
    if (input.dataset.focused) {
      delete input.dataset.focused;
      const val = input.dataset.realValue || '';
      if (val) {
        input.type = 'password';
        input.value = '••••••••' + val.slice(-4);
      } else {
        input.type = 'password';
        input.value = '';
      }
    }
  }

  function toggleKeyVis(id) {
    const input = document.getElementById('key-' + id);
    if (input.type === 'password') {
      input.type = 'text';
      input.value = input.dataset.realValue || '';
    } else {
      input.type = 'password';
      const val = input.dataset.realValue || '';
      input.value = val ? '••••••••' + val.slice(-4) : '';
    }
  }

  function getSavedKey(providerId) {
    // OpenRouter: also check legacy key names
    if (providerId === 'openrouter') {
      return localStorage.getItem('era_key_openrouter')
        || localStorage.getItem('openrouter_api_key')
        || localStorage.getItem('ora_api_key')
        || '';
    }
    return localStorage.getItem('era_key_' + providerId) || '';
  }

  function saveKey(providerId) {
    const input = document.getElementById('key-' + providerId);
    const val = input.dataset.realValue || '';
    if (!val) {
      showToast(isRu ? 'Введите значение' : 'Enter a value', 'error');
      return;
    }
    localStorage.setItem('era_key_' + providerId, val);
    // Backward compat for OpenRouter
    if (providerId === 'openrouter') {
      localStorage.setItem('openrouter_api_key', val);
      localStorage.setItem('ora_api_key', val);
    }
    // Update card status
    const status = document.getElementById('status-' + providerId);
    if (status) {
      status.textContent = isRu ? '✓ Настроен' : '✓ Configured';
      status.className = 'text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400';
    }
    const card = document.getElementById('card-' + providerId);
    if (card) card.classList.replace('border-gray-700/50', 'border-green-500/30');
    updateStats();
    renderAllModels();
    populateTestSelect();
    showToast(isRu ? 'Ключ сохранён!' : 'Key saved!', 'success');
  }

  async function testKey(providerId) {
    if (providerId !== 'openrouter') {
      showToast(isRu ? 'Тест доступен только для OpenRouter' : 'Test available for OpenRouter only', 'info');
      return;
    }
    const input = document.getElementById('key-' + providerId);
    const key = input.dataset.realValue || getSavedKey(providerId);
    if (!key) { showToast(isRu ? 'Введите ключ' : 'Enter key', 'error'); return; }

    showToast(isRu ? 'Проверка...' : 'Testing...', 'info');
    try {
      const res = await fetch('/api/openrouter/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(isRu ? \`OK · \${data.modelsAvailable} моделей\` : \`OK · \${data.modelsAvailable} models\`, 'success');
      } else {
        showToast(data.error || 'Failed', 'error');
      }
    } catch (e) {
      showToast(e.message, 'error');
    }
  }

  // ─── Custom models ──────────────────────────────────────────────────────
  function populateCustomProviderSelect() {
    const sel = document.getElementById('custom-provider-select');
    sel.innerHTML = PROVIDERS.map(p => \`<option value="\${p.id}">\${p.name}</option>\`).join('');
  }

  function addCustomModel() {
    const providerId = document.getElementById('custom-provider-select').value;
    const modelId = document.getElementById('custom-model-id').value.trim();
    const modelName = document.getElementById('custom-model-name').value.trim();
    if (!modelId) { showToast(isRu ? 'Введите ID модели' : 'Enter model ID', 'error'); return; }

    const exists = customModels.some(m => m.id === modelId && m.provider === providerId);
    if (exists) { showToast(isRu ? 'Модель уже добавлена' : 'Model already added', 'error'); return; }

    customModels.push({ id: modelId, name: modelName || modelId, provider: providerId, custom: true });
    localStorage.setItem('era_custom_models', JSON.stringify(customModels));
    document.getElementById('custom-model-id').value = '';
    document.getElementById('custom-model-name').value = '';
    renderCustomModels();
    renderAllModels();
    populateTestSelect();
    updateStats();
    showToast(isRu ? 'Модель добавлена!' : 'Model added!', 'success');
  }

  function removeCustomModel(idx) {
    customModels.splice(idx, 1);
    localStorage.setItem('era_custom_models', JSON.stringify(customModels));
    renderCustomModels();
    renderAllModels();
    populateTestSelect();
    updateStats();
  }

  function renderCustomModels() {
    const container = document.getElementById('custom-models-list');
    if (!customModels.length) {
      container.innerHTML = \`<span class="text-xs text-gray-600">\${isRu ? 'Нет кастомных моделей' : 'No custom models yet'}</span>\`;
      return;
    }
    container.innerHTML = customModels.map((m, i) => {
      const p = PROVIDERS.find(x => x.id === m.provider);
      return \`
        <span class="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300">
          \${p ? \`<i class="fas \${p.icon} text-xs"></i>\` : ''}
          \${m.name}
          <button onclick="removeCustomModel(\${i})" class="hover:text-red-400 ml-1">
            <i class="fas fa-times text-xs"></i>
          </button>
        </span>
      \`;
    }).join('');
  }

  // ─── All models grid ────────────────────────────────────────────────────
  function renderAllModels() {
    const query = (document.getElementById('models-search')?.value || '').toLowerCase();
    const grid = document.getElementById('all-models-grid');

    let allModels = [];
    PROVIDERS.forEach(p => {
      const key = getSavedKey(p.id);
      if (!key) return;
      p.models.forEach(m => {
        allModels.push({ ...m, provider: p.name, providerId: p.id, color: p.color, icon: p.icon });
      });
    });
    customModels.forEach(m => {
      const p = PROVIDERS.find(x => x.id === m.provider);
      allModels.push({ ...m, provider: p?.name || m.provider, providerId: m.provider, color: p?.color || '#888', icon: p?.icon || 'fa-robot', custom: true });
    });

    if (query) {
      allModels = allModels.filter(m =>
        m.name.toLowerCase().includes(query) ||
        m.id.toLowerCase().includes(query) ||
        m.provider.toLowerCase().includes(query)
      );
    }

    if (!allModels.length) {
      grid.innerHTML = \`<p class="text-sm text-gray-600 col-span-3">\${isRu ? 'Настройте хотя бы одного провайдера' : 'Configure at least one provider to see models'}</p>\`;
      return;
    }

    grid.innerHTML = allModels.map(m => \`
      <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 text-sm">
        <i class="fas \${m.icon} text-xs flex-shrink-0" style="color:\${m.color}"></i>
        <div class="flex-1 min-w-0">
          <div class="font-medium truncate">\${m.name}</div>
          <div class="text-xs text-gray-500 truncate">\${m.id}</div>
        </div>
        \${m.free ? '<span class="text-xs text-green-400 flex-shrink-0">free</span>' : ''}
        \${m.custom ? '<span class="text-xs text-purple-400 flex-shrink-0">custom</span>' : ''}
      </div>
    \`).join('');
  }

  // ─── Quick test ─────────────────────────────────────────────────────────
  function populateTestSelect() {
    const sel = document.getElementById('test-model-select');
    let options = '';
    PROVIDERS.forEach(p => {
      const key = getSavedKey(p.id);
      if (!key) return;
      p.models.forEach(m => {
        options += \`<option value="\${p.id}|\${m.id}">\${p.name} — \${m.name}</option>\`;
      });
    });
    customModels.forEach((m, i) => {
      options += \`<option value="\${m.provider}|\${m.id}">[Custom] \${m.name}</option>\`;
    });
    sel.innerHTML = options || \`<option value="">\${isRu ? 'Нет настроенных моделей' : 'No configured models'}</option>\`;
  }

  async function runModelTest() {
    const sel = document.getElementById('test-model-select').value;
    const query = document.getElementById('test-query').value.trim();
    const resultDiv = document.getElementById('test-result');

    if (!sel) { showToast(isRu ? 'Нет доступных моделей — сначала настройте провайдера' : 'No models — configure a provider first', 'error'); return; }
    if (!query) { showToast(isRu ? 'Введите запрос' : 'Enter a query', 'error'); return; }

    const [providerId, modelId] = sel.split('|');
    const apiKey = getSavedKey(providerId);
    if (!apiKey) { showToast(isRu ? 'Ключ провайдера не найден' : 'Provider key not found', 'error'); return; }

    resultDiv.innerHTML = '<i class="fas fa-spinner fa-spin text-blue-400 mr-2"></i>' + (isRu ? 'Запрос...' : 'Running...');

    try {
      // Use OpenRouter for test (other providers need backend support)
      const endpoint = providerId === 'openrouter' ? '/api/openrouter/chat' : '/api/openrouter/chat';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: providerId === 'openrouter' ? apiKey : getSavedKey('openrouter'),
          model: providerId === 'openrouter' ? modelId : modelId,
          messages: [{ role: 'user', content: query }]
        })
      });
      const data = await res.json();
      if (data.error) {
        resultDiv.innerHTML = \`<span class="text-red-400">\${data.error}</span>\`;
      } else {
        const content = data.choices?.[0]?.message?.content || 'No response';
        const tokens = data.usage?.total_tokens;
        resultDiv.innerHTML = \`
          <div class="text-xs text-gray-500 mb-2">\${modelId} \${tokens ? '· ' + tokens + ' tokens' : ''}</div>
          <div class="text-sm text-gray-200 whitespace-pre-wrap">\${escHtml(content)}</div>
        \`;
      }
    } catch (e) {
      resultDiv.innerHTML = \`<span class="text-red-400">\${e.message}</span>\`;
    }
  }

  // ─── Stats ──────────────────────────────────────────────────────────────
  function updateStats() {
    const configured = PROVIDERS.filter(p => getSavedKey(p.id)).length;
    const totalModels = PROVIDERS.filter(p => getSavedKey(p.id)).reduce((s, p) => s + p.models.length, 0);
    document.getElementById('stat-configured').textContent = configured;
    document.getElementById('stat-models').textContent = totalModels;
    document.getElementById('stat-custom').textContent = customModels.length;
  }

  // ─── Save all / Clear all ───────────────────────────────────────────────
  function saveAllToStorage() {
    PROVIDERS.forEach(p => {
      const input = document.getElementById('key-' + p.id);
      if (input) {
        const val = input.dataset.realValue || '';
        if (val && !val.startsWith('••')) {
          localStorage.setItem('era_key_' + p.id, val);
          if (p.id === 'openrouter') {
            localStorage.setItem('openrouter_api_key', val);
            localStorage.setItem('ora_api_key', val);
          }
        }
      }
    });
    localStorage.setItem('era_custom_models', JSON.stringify(customModels));
    updateStats();
    renderAllModels();
    populateTestSelect();
    showToast(isRu ? 'Всё сохранено!' : 'All saved!', 'success');
  }

  function clearAllKeys() {
    if (!confirm(isRu ? 'Очистить все API ключи? Это действие нельзя отменить.' : 'Clear all API keys? This cannot be undone.')) return;
    PROVIDERS.forEach(p => {
      localStorage.removeItem('era_key_' + p.id);
    });
    localStorage.removeItem('openrouter_api_key');
    localStorage.removeItem('ora_api_key');
    customModels = [];
    localStorage.removeItem('era_custom_models');
    renderProviders();
    renderCustomModels();
    renderAllModels();
    updateStats();
    populateTestSelect();
    showToast(isRu ? 'Все ключи удалены' : 'All keys cleared', 'info');
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────
  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function showToast(msg, type = 'info') {
    const colors = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-blue-600' };
    const toast = document.createElement('div');
    toast.className = \`fixed bottom-4 right-4 \${colors[type]} text-white px-5 py-3 rounded-lg shadow-lg z-50 text-sm flex items-center gap-2\`;
    toast.innerHTML = \`<i class="fas \${type==='success'?'fa-check-circle':type==='error'?'fa-times-circle':'fa-info-circle'}"></i> \${msg}\`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
  </script>
</body>
</html>
`
}
