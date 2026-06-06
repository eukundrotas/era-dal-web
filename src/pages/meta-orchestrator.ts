import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const metaOrchestratorPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'

  const title = isRu ? 'Мета-Оркестратор' : 'Meta-Orchestrator'
  const subtitle = isRu
    ? 'Поставьте задачу — система соберёт план, выберет агентов и запустит цифровую команду'
    : 'Set a task — the system builds a plan, selects agents, and launches your digital team'

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, subtitle, lang)}
  <script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.9/dist/purify.min.js"></script>
  <style>
    .result-md { font-size: 13px; line-height: 1.65; color: #d1d5db; word-break: break-word; }
    .result-md > *:first-child { margin-top: 0; }
    .result-md h1,.result-md h2,.result-md h3,.result-md h4 { color:#fff; font-weight:600; margin:.9em 0 .45em; line-height:1.3; }
    .result-md h1{font-size:1.3em} .result-md h2{font-size:1.16em} .result-md h3{font-size:1.05em} .result-md h4{font-size:1em}
    .result-md p{margin:.5em 0}
    .result-md ul,.result-md ol{margin:.5em 0; padding-left:1.4em}
    .result-md li{margin:.22em 0}
    .result-md strong{color:#fff}
    .result-md em{color:#e5e7eb}
    .result-md a{color:#818cf8; text-decoration:underline}
    .result-md code{background:rgba(255,255,255,.08); padding:1px 5px; border-radius:4px; font-size:.9em}
    .result-md pre{background:rgba(0,0,0,.4); padding:10px 12px; border-radius:8px; overflow-x:auto; margin:.6em 0}
    .result-md pre code{background:none; padding:0}
    .result-md table{border-collapse:collapse; width:100%; margin:.7em 0; font-size:12px; display:block; overflow-x:auto}
    .result-md th,.result-md td{border:1px solid rgba(255,255,255,.12); padding:6px 9px; text-align:left; vertical-align:top}
    .result-md th{background:rgba(255,255,255,.06); color:#e5e7eb; font-weight:600}
    .result-md blockquote{border-left:3px solid rgba(139,92,246,.5); padding-left:10px; color:#9ca3af; margin:.6em 0}
    .result-md hr{border:none; border-top:1px solid rgba(255,255,255,.1); margin:1em 0}
    .agent-chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 20px; font-size: 12px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
    }
    .step-line { border-left: 2px solid rgba(99,102,241,0.3); }
    .step-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .autonomy-safe { background: rgba(16,185,129,0.15); border-color: rgba(16,185,129,0.3); color: #34d399; }
    .autonomy-confirm { background: rgba(245,158,11,0.15); border-color: rgba(245,158,11,0.3); color: #fbbf24; }
    .strategy-badge { padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; }
    .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #3b82f6; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
    .fade-in { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
    .model-chip { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:20px; font-size:11px; cursor:pointer; border:1px solid; transition:all .15s; }
    .model-chip.selected { background:rgba(139,92,246,.25); border-color:rgba(139,92,246,.6); color:#c4b5fd; }
    .model-chip.unselected { background:rgba(255,255,255,.04); border-color:rgba(255,255,255,.1); color:#9ca3af; }
    .model-chip.unselected:hover { border-color:rgba(139,92,246,.4); color:#e2e8f0; }
    .provider-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('meta', lang)}

  <main class="ml-56 pt-4 min-h-screen">
    <div class="p-6 max-w-7xl">

      <!-- Header -->
      <div class="mb-6 flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <i class="fas fa-sitemap text-white text-sm"></i>
            </div>
            <h1 class="text-2xl font-bold">${title}</h1>
            <span class="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">v1.0</span>
          </div>
          <p class="text-gray-400 ml-12">${subtitle}</p>
        </div>
        <div class="flex items-center gap-3">
          <div id="api-key-status" class="flex items-center gap-2 text-sm text-gray-500">
            <i class="fas fa-key text-gray-600"></i>
            <span>${isRu ? 'API ключ не задан' : 'API key not set'}</span>
          </div>
          <button onclick="showApiKeyModal()"
            class="text-sm px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-cog"></i>
            ${isRu ? 'Настройки' : 'Settings'}
          </button>
        </div>
      </div>

      <!-- API Key Modal -->
      <div id="api-key-modal" style="display:none;"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div class="glass rounded-2xl p-6 w-full max-w-md mx-4">
          <h3 class="font-semibold mb-1">${isRu ? 'OpenRouter API ключ' : 'OpenRouter API Key'}</h3>
          <p class="text-xs text-gray-400 mb-1">${isRu
            ? 'Ключ хранится только в вашем браузере (localStorage) и никогда не покидает вашего устройства.'
            : 'Key is stored only in your browser (localStorage) and never leaves your device.'}</p>
          <a href="/ai-config?lang=${lang}" class="text-xs text-blue-400 hover:text-blue-300 mb-4 inline-block">
            <i class="fas fa-sliders-h mr-1"></i>
            ${isRu ? 'Управлять всеми провайдерами →' : 'Manage all providers →'}
          </a>
          <input id="api-key-input" type="password"
            placeholder="sk-or-..."
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm mb-4 focus:outline-none focus:border-violet-500">
          <div class="flex items-center gap-2">
            <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" id="execution-model-free"
                class="rounded border-gray-600 bg-gray-800 text-violet-500">
              ${isRu ? 'Только бесплатные модели' : 'Free models only'}
            </label>
          </div>
          <div class="flex gap-2 mt-4">
            <button onclick="saveApiKey()"
              class="flex-1 bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg text-sm font-medium transition">
              ${isRu ? 'Сохранить' : 'Save'}
            </button>
            <button onclick="document.getElementById('api-key-modal').style.display='none'"
              class="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white glass transition">
              ${isRu ? 'Отмена' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- LEFT: Task input + Plan -->
        <div class="lg:col-span-2 space-y-5">

          <!-- Task Input -->
          <div class="glass rounded-xl p-6">
            <label class="block text-gray-300 text-sm font-medium mb-3">
              <i class="fas fa-keyboard text-violet-400 mr-2"></i>
              ${isRu ? 'Поставьте задачу' : 'Describe your task'}
            </label>
            <textarea id="task-input" rows="4"
              placeholder="${isRu
                ? 'Например: «Найди 20 компаний в нише EdTech, оцени их потенциал, подготовь персональные КП и занеси в таблицу»'
                : 'E.g. "Find 20 EdTech companies, assess their potential, prepare personalized proposals and add to spreadsheet"'}"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition resize-none text-sm leading-relaxed"></textarea>

            <!-- Model Selector Panel -->
            <div class="mt-3 mb-3 border border-gray-700/60 rounded-lg bg-gray-800/40" id="model-selector-wrap">
              <button onclick="toggleModelPanel()" class="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-700/30 rounded-lg transition">
                <div class="flex items-center gap-2">
                  <i class="fas fa-robot text-violet-400 text-xs"></i>
                  <span class="text-gray-300 font-medium">${isRu ? 'Модели оркестрации' : 'Orchestration Models'}</span>
                  <span id="model-count-badge" class="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">0/5</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">${isRu ? 'выберите 1–5 моделей' : 'select 1–5 models'}</span>
                  <i id="model-panel-chevron" class="fas fa-chevron-down text-xs text-gray-500 transition-transform"></i>
                </div>
              </button>

              <!-- Selected chips row -->
              <div id="selected-model-chips" class="px-4 pb-2 flex flex-wrap gap-1.5 hidden"></div>

              <!-- Model picker (expanded) -->
              <div id="model-panel-body" class="hidden px-4 pb-4 pt-1">
                <div id="model-panel-no-providers" class="text-xs text-gray-500 py-2">
                  ${isRu
                    ? '<i class="fas fa-key mr-1"></i> Настройте API ключи в <a href="/ai-config?lang=' + lang + '" class="text-blue-400 hover:text-blue-300">разделе AI Провайдеры</a>'
                    : '<i class="fas fa-key mr-1"></i> Configure API keys in <a href="/ai-config?lang=' + lang + '" class="text-blue-400 hover:text-blue-300">AI Providers</a>'}
                </div>
                <div id="model-panel-providers" class="space-y-3"></div>
              </div>
            </div>

            <!-- Quick tasks -->
            <div class="flex flex-wrap gap-2 mt-3 mb-4">
              ${[
                isRu
                  ? ['🔍 Найти клиентов', 'Найди 30 потенциальных клиентов в нише B2B SaaS, собери контакты и подготовь персональные сообщения']
                  : ['🔍 Find leads', 'Find 30 potential B2B SaaS clients, gather contacts and prepare personalized messages'],
                isRu
                  ? ['📊 Анализ рынка', 'Сделай конкурентный анализ рынка AI-автоматизации: игроки, цены, позиционирование, тренды']
                  : ['📊 Market analysis', 'Do a competitive analysis of the AI automation market: players, pricing, positioning, trends'],
                isRu
                  ? ['📝 Контент-план', 'Составь контент-план на месяц для Telegram-канала про ИИ в бизнесе']
                  : ['📝 Content plan', 'Create a month-long content plan for a Telegram channel about AI in business'],
                isRu
                  ? ['🚀 Запуск услуги', 'Помоги запустить услугу AI-автоматизации: описание, оффер, КП, база клиентов, рассылка']
                  : ['🚀 Launch service', 'Help launch an AI automation service: description, offer, proposal, client base, outreach'],
              ].map(([label, prompt]) => `
                <button onclick="document.getElementById('task-input').value='${(prompt as string).replace(/'/g, "\\'")}'"
                  class="text-xs px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 hover:text-white transition">
                  ${label}
                </button>
              `).join('')}
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <select id="strategy-select"
                  class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
                  <option value="PLANNER">${isRu ? '🗺️ Планировщик' : '🗺️ Planner'}</option>
                  <option value="RELAY">${isRu ? '🔄 Эстафета' : '🔄 Relay'}</option>
                  <option value="PARALLEL">${isRu ? '⚡ Параллельно' : '⚡ Parallel'}</option>
                  <option value="VERIFIED">${isRu ? '✅ Верификация' : '✅ Verified'}</option>
                  <option value="EXPERT_PANEL">${isRu ? '👥 Экспертная комиссия' : '👥 Expert Panel'}</option>
                  <option value="DEBATE">${isRu ? '🗣️ Дебаты' : '🗣️ Debate'}</option>
                  <option value="FALLBACK">${isRu ? '🔁 Резервный' : '🔁 Fallback'}</option>
                  <option value="SINGLE">${isRu ? '⚡ Одиночный' : '⚡ Single'}</option>
                </select>
                <select id="mode-select"
                  class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
                  <option value="standard">${isRu ? '🧠 Стандартное' : '🧠 Standard'}</option>
                  <option value="systems">${isRu ? '🌐 Системное' : '🌐 Systems'}</option>
                  <option value="critical">${isRu ? '⚖️ Критическое' : '⚖️ Critical'}</option>
                  <option value="first_principles">${isRu ? '🔬 Первые принципы' : '🔬 First Principles'}</option>
                  <option value="triz">${isRu ? '⚙️ ТРИЗ' : '⚙️ TRIZ'}</option>
                </select>
              </div>
              <button onclick="generatePlan()" id="gen-btn"
                class="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-6 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium">
                <i class="fas fa-magic"></i>
                ${isRu ? 'Сгенерировать план' : 'Generate Plan'}
              </button>
            </div>

            <!-- Error banner -->
            <div id="error-banner" style="display:none;"
              class="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-start gap-2">
              <i class="fas fa-exclamation-circle mt-0.5 flex-shrink-0"></i>
              <span id="error-text"></span>
            </div>
          </div>

          <!-- Generated Plan -->
          <div id="plan-container" style="display:none;" class="glass rounded-xl p-6 fade-in">
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-2">
                <i class="fas fa-project-diagram text-violet-400"></i>
                <h3 class="font-semibold">${isRu ? 'Сгенерированный план' : 'Generated Plan'}</h3>
                <span id="plan-strategy-badge" class="strategy-badge bg-violet-500/20 text-violet-300 border border-violet-500/30"></span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <span class="text-gray-500">${isRu ? 'Оценка:' : 'Est:'}</span>
                <span id="plan-cost" class="text-green-400 font-medium"></span>
                <span id="plan-time" class="text-gray-400"></span>
              </div>
            </div>

            <div id="plan-reasoning" class="text-xs text-gray-400 italic bg-gray-800/40 rounded-lg px-4 py-3 mb-4 border-l-2 border-violet-500/40"></div>
            <div id="plan-steps" class="space-y-1"></div>

            <div class="mt-5 pt-4 border-t border-gray-800 flex items-center justify-between">
              <div class="flex items-center gap-4 text-sm text-gray-400">
                <span><i class="fas fa-robot mr-1"></i> <span id="plan-agents-count"></span></span>
                <span><i class="fas fa-shield-alt text-yellow-400 mr-1"></i>
                  <span id="confirm-count" class="text-yellow-400"></span>
                </span>
              </div>
              <button onclick="executePlan()" id="exec-btn"
                class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium">
                <i class="fas fa-play"></i>
                ${isRu ? 'Запустить' : 'Execute'}
              </button>
            </div>
          </div>

          <!-- Execution progress -->
          <div id="exec-container" style="display:none;" class="glass rounded-xl p-6 fade-in">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold flex items-center gap-2">
                <div class="pulse-dot"></div>
                <span id="exec-title">${isRu ? 'Выполнение...' : 'Executing...'}</span>
              </h3>
              <span id="exec-progress-label" class="text-sm text-gray-400"></span>
            </div>
            <div id="exec-steps" class="space-y-2"></div>
          </div>

          <!-- Confirmation Gate Banner -->
          <div id="confirm-gate" style="display:none;"
            class="glass rounded-xl p-5 border border-yellow-500/40 bg-yellow-500/5 fade-in">
            <div class="flex items-start gap-3">
              <i class="fas fa-shield-alt text-yellow-400 text-lg mt-0.5"></i>
              <div class="flex-1">
                <p class="font-semibold text-yellow-300 mb-1">Autonomy Gate — ${isRu ? 'требуется подтверждение' : 'confirmation required'}</p>
                <p id="gate-action-text" class="text-sm text-gray-400 mb-4"></p>
                <div class="flex gap-2">
                  <button onclick="approveGate()"
                    class="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                    <i class="fas fa-check"></i>
                    ${isRu ? 'Одобрить и продолжить' : 'Approve & continue'}
                  </button>
                  <button onclick="rejectGate()"
                    class="border border-red-500/40 text-red-400 hover:bg-red-500/10 px-5 py-2 rounded-lg text-sm transition flex items-center gap-2">
                    <i class="fas fa-times"></i>
                    ${isRu ? 'Отменить' : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Result -->
          <div id="result-container" style="display:none;" class="glass rounded-xl p-6 fade-in">
            <div class="flex items-center gap-2 mb-4">
              <i class="fas fa-check-circle text-green-400 text-xl"></i>
              <h3 class="font-semibold text-green-400">${isRu ? 'Задача выполнена' : 'Task completed'}</h3>
              <span id="result-cost" class="ml-auto text-sm text-gray-400"></span>
            </div>
            <div id="result-content" class="space-y-3"></div>
            <a href="/journal?lang=${lang}" class="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
              <i class="fas fa-scroll"></i>
              ${isRu ? 'Просмотреть полный журнал' : 'View full journal'}
            </a>
          </div>
        </div>

        <!-- RIGHT: Status sidebar -->
        <div class="space-y-5">

          <!-- Digital Staff roster (from plan) -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <i class="fas fa-users text-blue-400"></i>
              ${isRu ? 'Цифровой штат' : 'Digital Staff'}
            </h3>
            <div id="agent-roster" class="space-y-2">
              <p class="text-sm text-gray-600 italic">${isRu ? 'Агенты появятся после генерации плана' : 'Agents appear after plan generation'}</p>
            </div>
            <a href="/agents?lang=${lang}" class="mt-3 w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition py-2 border border-dashed border-gray-700 rounded-lg">
              <i class="fas fa-plus"></i>
              ${isRu ? 'Управлять агентами' : 'Manage agents'}
            </a>
          </div>

          <!-- Autonomy Gate legend -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <i class="fas fa-shield-alt text-yellow-400"></i>
              Autonomy Gate
            </h3>
            <div class="space-y-2 text-xs">
              <div class="autonomy-safe rounded-lg px-3 py-2 border flex items-center gap-2">
                <i class="fas fa-check-circle"></i>
                <span>${isRu ? 'Сбор / анализ — авто' : 'Gather / analyse — auto'}</span>
              </div>
              <div class="autonomy-confirm rounded-lg px-3 py-2 border flex items-center gap-2">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${isRu ? 'Email / CRM / публикация — подтверждение' : 'Email / CRM / publish — confirmation'}</span>
              </div>
            </div>
          </div>

          <!-- Recent runs -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <i class="fas fa-history text-gray-400"></i>
              ${isRu ? 'Последние запуски' : 'Recent runs'}
            </h3>
            <div id="recent-runs" class="space-y-2">
              <p class="text-xs text-gray-600">${isRu ? 'Загрузка...' : 'Loading...'}</p>
            </div>
            <a href="/journal?lang=${lang}" class="mt-2 text-xs text-blue-400 hover:text-blue-300 block">
              ${isRu ? 'Полный журнал →' : 'Full journal →'}
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    const isRu = ${isRu};
    const lang = '${lang}';

    let currentPlanId = null;
    let pausedStepId = null;
    let currentSteps = [];

    // ─── Multi-provider model registry ─────────────────────────────────────
    const PROVIDERS_META = [
      { id:'openrouter', name:'OpenRouter', color:'#3b82f6', models:[
        { id:'meta-llama/llama-3.3-70b-instruct:free', name:'Llama 3.3 70B', free:true },
        { id:'google/gemini-2.0-flash-exp:free', name:'Gemini 2.0 Flash', free:true },
        { id:'deepseek/deepseek-r1:free', name:'DeepSeek R1', free:true },
        { id:'mistralai/mistral-7b-instruct:free', name:'Mistral 7B', free:true },
        { id:'anthropic/claude-3.5-sonnet', name:'Claude 3.5 Sonnet', free:false },
        { id:'openai/gpt-4o', name:'GPT-4o', free:false },
        { id:'openai/gpt-4o-mini', name:'GPT-4o mini', free:false },
        { id:'google/gemini-pro-1.5', name:'Gemini 1.5 Pro', free:false },
        { id:'anthropic/claude-3-haiku', name:'Claude 3 Haiku', free:false },
      ]},
      { id:'anthropic', name:'Anthropic', color:'#f97316', models:[
        { id:'claude-opus-4-8', name:'Claude Opus 4.8', free:false },
        { id:'claude-sonnet-4-6', name:'Claude Sonnet 4.6', free:false },
        { id:'claude-haiku-4-5-20251001', name:'Claude Haiku 4.5', free:false },
        { id:'claude-3-5-sonnet-20241022', name:'Claude 3.5 Sonnet', free:false },
      ]},
      { id:'openai', name:'OpenAI', color:'#10b981', models:[
        { id:'gpt-4o', name:'GPT-4o', free:false },
        { id:'gpt-4o-mini', name:'GPT-4o mini', free:false },
        { id:'o1', name:'o1', free:false },
        { id:'o1-mini', name:'o1-mini', free:false },
        { id:'o3-mini', name:'o3-mini', free:false },
      ]},
      { id:'gemini', name:'Google Gemini', color:'#8b5cf6', models:[
        { id:'gemini-2.0-flash-exp', name:'Gemini 2.0 Flash', free:true },
        { id:'gemini-1.5-pro-latest', name:'Gemini 1.5 Pro', free:false },
        { id:'gemini-1.5-flash-latest', name:'Gemini 1.5 Flash', free:true },
      ]},
      { id:'groq', name:'Groq', color:'#f59e0b', models:[
        { id:'llama-3.3-70b-versatile', name:'Llama 3.3 70B', free:true },
        { id:'llama-3.1-8b-instant', name:'Llama 3.1 8B', free:true },
        { id:'mixtral-8x7b-32768', name:'Mixtral 8x7B', free:true },
        { id:'gemma2-9b-it', name:'Gemma 2 9B', free:true },
      ]},
      { id:'mistral', name:'Mistral', color:'#ec4899', models:[
        { id:'mistral-large-latest', name:'Mistral Large', free:false },
        { id:'mistral-medium-latest', name:'Mistral Medium', free:false },
        { id:'mistral-small-latest', name:'Mistral Small', free:false },
      ]},
      { id:'cohere', name:'Cohere', color:'#06b6d4', models:[
        { id:'command-r-plus', name:'Command R+', free:false },
        { id:'command-r', name:'Command R', free:false },
      ]},
      { id:'together', name:'Together AI', color:'#84cc16', models:[
        { id:'meta-llama/Llama-3.3-70B-Instruct-Turbo', name:'Llama 3.3 70B Turbo', free:false },
        { id:'mistralai/Mixtral-8x7B-Instruct-v0.1', name:'Mixtral 8x7B', free:false },
      ]},
      { id:'perplexity', name:'Perplexity', color:'#6366f1', models:[
        { id:'llama-3.1-sonar-large-128k-online', name:'Sonar Large', free:false },
        { id:'llama-3.1-sonar-small-128k-online', name:'Sonar Small', free:false },
      ]},
    ];

    // ─── Model selector state ───────────────────────────────────────────────
    let selectedModels = new Set(
      JSON.parse(localStorage.getItem('era_orchestrator_models') || '[]')
    );
    let modelPanelOpen = false;

    function getProviderKey(providerId) {
      if (providerId === 'openrouter') {
        return localStorage.getItem('era_key_openrouter')
          || localStorage.getItem('openrouter_api_key')
          || localStorage.getItem('ora_api_key')
          || '';
      }
      return localStorage.getItem('era_key_' + providerId) || '';
    }

    function toggleModelPanel() {
      modelPanelOpen = !modelPanelOpen;
      const body = document.getElementById('model-panel-body');
      const chips = document.getElementById('selected-model-chips');
      const chevron = document.getElementById('model-panel-chevron');
      if (modelPanelOpen) {
        body.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
        renderModelPanel();
      } else {
        body.classList.add('hidden');
        chevron.style.transform = '';
      }
      if (selectedModels.size > 0) chips.classList.remove('hidden');
    }

    function renderModelPanel() {
      const customModels = JSON.parse(localStorage.getItem('era_custom_models') || '[]');
      const noProviders = document.getElementById('model-panel-no-providers');
      const providersDiv = document.getElementById('model-panel-providers');

      // Always hide the "no providers" placeholder — we show all providers
      noProviders.classList.add('hidden');

      // Build custom models by provider
      const customByProvider = {};
      customModels.forEach(m => {
        if (!customByProvider[m.provider]) customByProvider[m.provider] = [];
        customByProvider[m.provider].push(m);
      });

      // Show ALL providers; mark ones without keys as locked
      providersDiv.innerHTML = PROVIDERS_META.map(p => {
        const hasKey = !!getProviderKey(p.id);
        const allModels = [
          ...p.models,
          ...(customByProvider[p.id] || []).map(m => ({ ...m, custom: true }))
        ];
        const chips = allModels.map(m => {
          const sel = selectedModels.has(p.id + '|' + m.id);
          const clickHandler = hasKey
            ? \`toggleOrcModel('\${p.id}', '\${m.id.replace(/'/g,"\\\\'")}', '\${(m.name||m.id).replace(/'/g,"\\\\'")}', '\${p.name}', '\${p.color}')\`
            : \`goToAiConfig()\`;
          return \`<span class="model-chip \${sel ? 'selected' : 'unselected'} \${!hasKey ? 'opacity-50' : ''}"
                        onclick="\${clickHandler}"
                        title="\${m.id}\${!hasKey ? ' (API key required)' : ''}">
            <span class="provider-dot" style="background:\${p.color}"></span>
            \${m.name || m.id}
            \${m.free ? '<span style="color:#4ade80;font-size:9px">free</span>' : ''}
            \${m.custom ? '<span style="color:#c084fc;font-size:9px">✦</span>' : ''}
          </span>\`;
        }).join('');

        const lockBadge = !hasKey
          ? \`<a href="/ai-config?lang=\${lang}" class="ml-auto text-[10px] text-gray-600 hover:text-orange-400 transition flex items-center gap-1" title="Add API key">
               <i class="fas fa-lock"></i> key
             </a>\`
          : '';

        return \`
          <div class="\${!hasKey ? 'opacity-70' : ''}">
            <div class="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style="color:\${p.color}">
              <span class="provider-dot" style="background:\${p.color}"></span>
              \${p.name}
              \${lockBadge}
            </div>
            <div class="flex flex-wrap gap-1.5">\${chips}</div>
          </div>
        \`;
      }).join('');
    }

    function goToAiConfig() {
      window.location.href = '/ai-config?lang=' + lang;
    }

    function toggleOrcModel(providerId, modelId, modelName, providerName, color) {
      const key = providerId + '|' + modelId;
      if (selectedModels.has(key)) {
        selectedModels.delete(key);
      } else {
        if (selectedModels.size >= 5) {
          const msg = isRu ? 'Можно выбрать не более 5 моделей' : 'You can select at most 5 models';
          const t = document.createElement('div');
          t.className = 'fixed bottom-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg z-50 text-sm';
          t.textContent = msg;
          document.body.appendChild(t);
          setTimeout(() => t.remove(), 2500);
          return;
        }
        selectedModels.add(key);
        // Store extra info for display
        localStorage.setItem('era_orc_model_meta_' + key, JSON.stringify({ modelName, providerName, color }));
      }
      localStorage.setItem('era_orchestrator_models', JSON.stringify(Array.from(selectedModels)));
      updateModelBadge();
      updateSelectedChips();
      if (modelPanelOpen) renderModelPanel();
    }

    function updateModelBadge() {
      document.getElementById('model-count-badge').textContent = selectedModels.size + '/5';
    }

    function updateSelectedChips() {
      const container = document.getElementById('selected-model-chips');
      if (!selectedModels.size) {
        container.classList.add('hidden');
        container.innerHTML = '';
        return;
      }
      container.classList.remove('hidden');
      container.innerHTML = Array.from(selectedModels).map(key => {
        const meta = JSON.parse(localStorage.getItem('era_orc_model_meta_' + key) || '{}');
        const [, modelId] = key.split('|');
        const name = meta.modelName || modelId.split('/').pop() || modelId;
        const color = meta.color || '#888';
        return \`<span class="model-chip selected" style="background:\${color}22;border-color:\${color}66;color:#e2e8f0">
          <span class="provider-dot" style="background:\${color}"></span>
          \${name}
          <button onclick="event.stopPropagation();removeOrcModel('\${key.replace(/'/g,"\\\\'")}')">
            <i class="fas fa-times" style="font-size:9px;opacity:.7"></i>
          </button>
        </span>\`;
      }).join('');
    }

    function removeOrcModel(key) {
      selectedModels.delete(key);
      localStorage.setItem('era_orchestrator_models', JSON.stringify(Array.from(selectedModels)));
      updateModelBadge();
      updateSelectedChips();
      if (modelPanelOpen) renderModelPanel();
    }

    function getSelectedModelsForApi() {
      return Array.from(selectedModels).map(key => {
        const [providerId, modelId] = key.split('|');
        return { providerId, modelId, apiKey: getProviderKey(providerId) };
      });
    }

    // ─── API key helpers ────────────────────────────────────────────────────

    function getApiKey() {
      return localStorage.getItem('era_key_openrouter')
        || localStorage.getItem('openrouter_api_key')
        || localStorage.getItem('ora_api_key')
        || '';
    }
    function getFreeOnly() { return localStorage.getItem('ora_free_only') === 'true'; }

    function updateKeyStatus() {
      const key = getApiKey();
      const el = document.getElementById('api-key-status');
      if (key) {
        el.innerHTML = '<i class="fas fa-key text-green-400"></i><span class="text-green-400">sk-or-…' + key.slice(-4) + '</span>';
      } else {
        el.innerHTML = '<i class="fas fa-key text-gray-600"></i><span class="text-gray-500">' + (isRu?'API ключ не задан':'API key not set') + '</span>';
      }
    }

    function showApiKeyModal() {
      document.getElementById('api-key-input').value = getApiKey();
      document.getElementById('execution-model-free').checked = getFreeOnly();
      document.getElementById('api-key-modal').style.display = 'flex';
    }

    function saveApiKey() {
      const key = document.getElementById('api-key-input').value.trim();
      const freeOnly = document.getElementById('execution-model-free').checked;
      if (key) localStorage.setItem('ora_api_key', key);
      else localStorage.removeItem('ora_api_key');
      localStorage.setItem('ora_free_only', freeOnly ? 'true' : 'false');
      document.getElementById('api-key-modal').style.display = 'none';
      updateKeyStatus();
    }

    // ─── Error display ──────────────────────────────────────────────────────

    function showError(msg) {
      document.getElementById('error-text').textContent = msg;
      document.getElementById('error-banner').style.display = 'flex';
    }
    function hideError() {
      document.getElementById('error-banner').style.display = 'none';
    }

    // ─── Generate Plan ──────────────────────────────────────────────────────

    async function generatePlan() {
      hideError();
      const task = document.getElementById('task-input').value.trim();
      if (!task) { showError(isRu?'Введите задачу':'Enter a task'); return; }

      const apiKey = getApiKey();
      if (!apiKey) {
        showError(isRu?'Укажите API ключ OpenRouter в настройках':'Set your OpenRouter API key in Settings');
        return;
      }

      const btn = document.getElementById('gen-btn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (isRu?'Генерация...':'Generating...');
      btn.disabled = true;
      document.getElementById('plan-container').style.display = 'none';

      try {
        const orchModels = getSelectedModelsForApi();
        const res = await fetch('/api/meta/plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userPrompt: task,
            apiKey,
            freeModelsOnly: getFreeOnly(),
            userId: 'user',
            selectedModels: orchModels.length ? orchModels : undefined,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          showError((data.error || 'Plan generation failed') + (data.raw ? ' — LLM raw: ' + data.raw.slice(0,120) : ''));
          return;
        }

        renderPlan(data.plan, data.reasoning);
      } catch (e) {
        showError(e.message || 'Network error');
      } finally {
        btn.innerHTML = '<i class="fas fa-magic"></i> ' + (isRu?'Сгенерировать план':'Generate Plan');
        btn.disabled = false;
      }
    }

    function renderPlan(plan, reasoning) {
      currentPlanId = plan.id;
      currentSteps = plan.steps;

      document.getElementById('plan-strategy-badge').textContent = plan.strategy;
      document.getElementById('plan-cost').textContent = '~$' + plan.estimatedCostUsd.toFixed(3);
      document.getElementById('plan-time').textContent = Math.round(plan.estimatedSeconds / 60) + ' min';
      document.getElementById('plan-agents-count').textContent = plan.steps.length + ' ' + (isRu?'агентов':'agents');
      document.getElementById('plan-reasoning').textContent = reasoning || '';

      const confirms = plan.steps.filter(s => s.autonomyLevel === 'REQUIRES_CONFIRMATION').length;
      document.getElementById('confirm-count').textContent =
        confirms + ' ' + (isRu ? (confirms===1?'подтверждение':'подтверждения') : 'confirmation' + (confirms!==1?'s':''));

      const roleColors = {
        lead_researcher: 'text-blue-400 fa-search',
        market_analyst: 'text-cyan-400 fa-chart-bar',
        copywriter: 'text-purple-400 fa-pen-nib',
        quality_controller: 'text-yellow-400 fa-check-double',
        crm_agent: 'text-green-400 fa-database',
        sales_director: 'text-orange-400 fa-bullhorn',
        marketing_strategist: 'text-pink-400 fa-bullseye',
        business_radar: 'text-teal-400 fa-satellite-dish',
        project_manager: 'text-indigo-400 fa-tasks',
        research_scientist: 'text-rose-400 fa-flask',
        data_scientist: 'text-fuchsia-400 fa-chart-area',
        experiment_designer: 'text-pink-400 fa-vials',
        peer_reviewer: 'text-red-400 fa-microscope',
        literature_researcher: 'text-orange-400 fa-book-open',
        ml_engineer: 'text-indigo-400 fa-brain',
        prompt_engineer: 'text-violet-400 fa-terminal',
        llm_engineer: 'text-purple-400 fa-robot',
        ai_architect: 'text-blue-400 fa-sitemap',
        mlops_engineer: 'text-cyan-400 fa-server',
        default: 'text-gray-400 fa-robot',
      };

      const stepsHtml = plan.steps.map((s, i) => {
        const [iconColor, iconName] = (roleColors[s.agentRole] || roleColors.default).split(' ');
        const isLast = i === plan.steps.length - 1;
        const isConfirm = s.autonomyLevel === 'REQUIRES_CONFIRMATION';
        const isBlocked = s.autonomyLevel === 'BLOCKED';

        return \`
          <div class="flex gap-3 py-2 \${isLast?'':'border-b border-gray-800/60'}">
            <div class="flex flex-col items-center pt-1">
              <div class="step-dot \${isBlocked?'bg-gray-600':isConfirm?'bg-yellow-500':'bg-green-500'}"></div>
              \${!isLast ? '<div class="step-line flex-1 mx-auto mt-1" style="width:2px"></div>' : ''}
            </div>
            <div class="flex-1 pb-1">
              <div class="flex items-center gap-2 flex-wrap mb-0.5">
                <span class="agent-chip">
                  <i class="fas \${iconName} \${iconColor} text-xs"></i>
                  <span class="text-gray-300">\${roleName(s.agentRole)}</span>
                </span>
                <span class="text-xs px-2 py-0.5 rounded
                  \${isBlocked?'bg-gray-500/10 text-gray-500':isConfirm?'bg-yellow-500/10 text-yellow-400':'bg-green-500/10 text-green-400'}">
                  \${isBlocked?(isRu?'заблокировано':'blocked'):isConfirm?(isRu?'подтверждение':'confirm'):(isRu?'авто':'auto')}
                </span>
                <span class="text-xs text-gray-600">\${s.estimatedSeconds}s · $\${s.estimatedCostUsd.toFixed(4)}</span>
              </div>
              <p class="text-sm text-gray-300">\${s.action}</p>
            </div>
          </div>
        \`;
      }).join('');

      document.getElementById('plan-steps').innerHTML = stepsHtml;

      // Update agent roster sidebar
      const seen = new Set();
      const rosterHtml = plan.steps
        .filter(s => { if(seen.has(s.agentRole)) return false; seen.add(s.agentRole); return true; })
        .map(s => {
          const [iconColor, iconName] = (roleColors[s.agentRole] || roleColors.default).split(' ');
          return \`
            <div class="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50">
              <div class="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                <i class="fas \${iconName} \${iconColor} text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">\${roleName(s.agentRole)}</p>
                <p class="text-xs text-gray-500">\${s.autonomyLevel}</p>
              </div>
              <div class="w-2 h-2 rounded-full \${s.autonomyLevel==='SAFE'?'bg-green-500':'bg-yellow-500'} flex-shrink-0"></div>
            </div>
          \`;
        }).join('');
      document.getElementById('agent-roster').innerHTML = rosterHtml || '<p class="text-sm text-gray-600 italic">No agents</p>';

      document.getElementById('plan-container').style.display = 'block';
      document.getElementById('plan-container').scrollIntoView({ behavior:'smooth', block:'nearest' });
    }

    // ─── Execute Plan ───────────────────────────────────────────────────────

    async function executePlan() {
      if (!currentPlanId) return;

      const apiKey = getApiKey();
      if (!apiKey) { showError(isRu?'Укажите API ключ':'Set API key'); return; }

      document.getElementById('plan-container').style.display = 'none';
      document.getElementById('confirm-gate').style.display = 'none';
      document.getElementById('result-container').style.display = 'none';
      document.getElementById('exec-container').style.display = 'block';
      document.getElementById('exec-title').textContent = isRu?'Выполнение...':'Executing...';
      document.getElementById('exec-steps').innerHTML =
        '<p class="text-sm text-gray-500"><i class="fas fa-spinner fa-spin mr-2"></i>' +
        (isRu?'Выполняю шаги...':'Running steps...') + '</p>';

      try {
        const res = await fetch('/api/meta/plans/' + currentPlanId + '/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey, userId: 'user' }),
        });

        const data = await res.json();

        if (!res.ok && res.status !== 500) {
          showError(data.error || 'Execution failed');
          document.getElementById('exec-container').style.display = 'none';
          document.getElementById('plan-container').style.display = 'block';
          return;
        }

        renderExecSteps(data.steps || []);
        document.getElementById('exec-progress-label').textContent =
          (data.completedSteps || 0) + ' / ' + (data.totalSteps || 0);

        if (data.status === 'paused' && data.pausedAt) {
          pausedStepId = data.pausedAt.stepId;
          document.getElementById('gate-action-text').textContent = data.pausedAt.action;
          document.getElementById('confirm-gate').style.display = 'block';
          document.getElementById('exec-title').textContent =
            isRu ? '⏸ Ожидание подтверждения' : '⏸ Awaiting confirmation';
        } else if (data.status === 'completed') {
          renderResult(data);
        } else if (data.status === 'failed' && data.failedAt) {
          showError((isRu?'Ошибка на шаге ':'Error at step ') + data.failedAt.orderIndex + ': ' + data.failedAt.error);
        }

        loadRecentRuns();
      } catch (e) {
        showError(e.message || 'Network error');
        document.getElementById('exec-container').style.display = 'none';
        document.getElementById('plan-container').style.display = 'block';
      }
    }

    function renderExecSteps(steps) {
      const iconFor = status => {
        if (status === 'done') return '<i class="fas fa-check text-green-400 text-xs"></i>';
        if (status === 'failed') return '<i class="fas fa-times text-red-400 text-xs"></i>';
        if (status === 'skipped') return '<i class="fas fa-ban text-gray-500 text-xs"></i>';
        if (status === 'pending_confirmation') return '<i class="fas fa-shield-alt text-yellow-400 text-xs"></i>';
        return '<i class="fas fa-spinner fa-spin text-blue-400 text-xs"></i>';
      };
      const labelFor = status => {
        if (status === 'done') return isRu?'готово':'done';
        if (status === 'failed') return isRu?'ошибка':'failed';
        if (status === 'skipped') return isRu?'пропущено':'skipped';
        if (status === 'pending_confirmation') return isRu?'ждёт':'pending';
        return isRu?'...':'...';
      };

      document.getElementById('exec-steps').innerHTML = steps.map(s => \`
        <div class="flex items-start gap-3 p-2 rounded-lg bg-gray-800/40">
          <div class="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            \${iconFor(s.status)}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs text-gray-500">\${roleName(s.agentRole)}</p>
            <p class="text-sm text-gray-300 truncate">\${s.action}</p>
            \${s.outputData ? '<p class="text-xs text-gray-500 mt-1 line-clamp-2">' + escHtml(s.outputData.slice(0,200)) + '</p>' : ''}
          </div>
          <span class="text-xs flex-shrink-0 \${s.status==='done'?'text-green-400':s.status==='failed'?'text-red-400':s.status==='pending_confirmation'?'text-yellow-400':'text-gray-500'}">
            \${labelFor(s.status)}
          </span>
        </div>
      \`).join('');
    }

    function renderResult(data) {
      document.getElementById('exec-container').style.display = 'none';
      document.getElementById('result-container').style.display = 'block';
      document.getElementById('result-cost').textContent =
        (isRu?'Стоимость: ':'Cost: ') + '$' + (data.accumulatedCostUsd || 0).toFixed(4);

      const doneSteps = (data.steps || []).filter(s => s.status === 'done' && s.outputData);
      document.getElementById('result-content').innerHTML = doneSteps.length
        ? doneSteps.map(s => \`
            <div class="bg-gray-800/40 rounded-lg p-3">
              <p class="text-xs text-gray-500 mb-1">\${roleName(s.agentRole)} · ${isRu?'шаг':'step'} \${s.orderIndex}</p>
              <div class="result-md">\${renderMd(s.outputData)}</div>
            </div>
          \`).join('')
        : '<p class="text-gray-400 text-sm">' + (isRu?'Все шаги выполнены успешно.':'All steps completed successfully.') + '</p>';
    }

    // ─── Autonomy Gate ──────────────────────────────────────────────────────

    async function approveGate() {
      if (!currentPlanId || !pausedStepId) return;
      document.getElementById('confirm-gate').style.display = 'none';

      try {
        await fetch('/api/meta/plans/' + currentPlanId + '/steps/' + pausedStepId + '/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'user', note: 'Approved by user' }),
        });
        pausedStepId = null;
        await executePlan(); // resume
      } catch (e) {
        showError(e.message || 'Confirm failed');
      }
    }

    function rejectGate() {
      document.getElementById('confirm-gate').style.display = 'none';
      document.getElementById('exec-container').style.display = 'none';
      showError(isRu ? 'Выполнение остановлено пользователем.' : 'Execution stopped by user.');
    }

    // ─── Recent runs ────────────────────────────────────────────────────────

    async function loadRecentRuns() {
      try {
        const res = await fetch('/api/meta/logs?limit=5');
        if (!res.ok) return;
        const data = await res.json();
        const logs = data.logs || [];
        const container = document.getElementById('recent-runs');
        if (!logs.length) {
          container.innerHTML = '<p class="text-xs text-gray-600">' + (isRu?'Нет запусков':'No runs yet') + '</p>';
          return;
        }
        container.innerHTML = logs.map(l => \`
          <div class="flex items-center justify-between py-1 text-sm">
            <div class="flex items-center gap-2 min-w-0">
              <span>\${l.status==='success'?'✅':l.status==='error'?'❌':'⏳'}</span>
              <span class="text-gray-300 truncate max-w-[130px]">\${l.action.slice(0,40)}</span>
            </div>
            <span class="text-xs text-green-400 flex-shrink-0">$\${(l.costUsd||0).toFixed(3)}</span>
          </div>
        \`).join('');
      } catch { /* silent */ }
    }

    function escHtml(s) {
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    // Localised agent role names
    var ROLE_NAMES = {
      researcher:'${isRu?'Исследователь':'Researcher'}',analyst:'${isRu?'Аналитик':'Analyst'}',
      writer:'${isRu?'Автор':'Writer'}',critic:'${isRu?'Критик':'Critic'}',
      planner:'${isRu?'Планировщик':'Planner'}',executor:'${isRu?'Исполнитель':'Executor'}',
      reviewer:'${isRu?'Ревьюер':'Reviewer'}',supervisor:'${isRu?'Супервизор':'Supervisor'}',
      coordinator:'${isRu?'Координатор':'Coordinator'}',custom:'${isRu?'Свой агент':'Custom Agent'}',
      sales_manager:'${isRu?'Менеджер продаж':'Sales Manager'}',
      marketing_manager:'${isRu?'Маркетолог':'Marketing Manager'}',
      financial_analyst:'${isRu?'Финансовый аналитик':'Financial Analyst'}',
      legal_counsel:'${isRu?'Юрист':'Legal Counsel'}',
      hr_specialist:'${isRu?'HR-специалист':'HR Specialist'}',
      project_manager:'${isRu?'Менеджер проектов':'Project Manager'}',
      software_engineer:'${isRu?'Разработчик':'Software Engineer'}',
      data_engineer:'${isRu?'Data-инженер':'Data Engineer'}',
      devops_engineer:'${isRu?'DevOps-инженер':'DevOps Engineer'}',
      security_analyst:'${isRu?'Аналитик ИБ':'Security Analyst'}',
      research_scientist:'${isRu?'Учёный-исследователь':'Research Scientist'}',
      data_scientist:'${isRu?'Дата-сайентист':'Data Scientist'}',
      experiment_designer:'${isRu?'Дизайнер экспериментов':'Experiment Designer'}',
      peer_reviewer:'${isRu?'Рецензент':'Peer Reviewer'}',
      literature_researcher:'${isRu?'Обзор литературы':'Literature Researcher'}',
      ml_engineer:'${isRu?'ML-инженер':'ML Engineer'}',
      prompt_engineer:'${isRu?'Prompt-инженер':'Prompt Engineer'}',
      llm_engineer:'${isRu?'LLM-инженер':'LLM Engineer'}',
      ai_architect:'${isRu?'AI-архитектор':'AI Architect'}',
      mlops_engineer:'${isRu?'MLOps-инженер':'MLOps Engineer'}',
    };
    function roleName(r) {
      return ROLE_NAMES[r] || r.replace(/_/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});
    }

    // Render Markdown (tables, headings, lists, bold) into safe HTML.
    // Falls back to plain escaped text if the libraries failed to load.
    function renderMd(s) {
      const text = String(s == null ? '' : s);
      try {
        if (window.marked) {
          const html = window.marked.parse(text, { breaks: true, gfm: true });
          return window.DOMPurify ? window.DOMPurify.sanitize(html) : html;
        }
      } catch (e) { /* fall through to plain text */ }
      return '<p style="white-space:pre-wrap">' + escHtml(text) + '</p>';
    }

    // ─── Init ───────────────────────────────────────────────────────────────

    updateKeyStatus();
    loadRecentRuns();
    updateModelBadge();
    updateSelectedChips();

    // Pre-fill task from ?task= URL param (e.g. launched from Scenarios / Meta-Agents pages)
    const _params = new URLSearchParams(location.search);
    const _urlTask = _params.get('task');
    if (_urlTask) {
      const el = document.getElementById('task-input');
      if (el) el.value = _urlTask;
    }
    // Pre-select strategy / thinking mode when launched from a Meta-Agent squad
    const _urlStrategy = _params.get('strategy');
    if (_urlStrategy) {
      const sel = document.getElementById('strategy-select');
      if (sel && [...sel.options].some(o => o.value === _urlStrategy)) sel.value = _urlStrategy;
    }
    const _urlMode = _params.get('mode');
    if (_urlMode) {
      const sel = document.getElementById('mode-select');
      if (sel && [...sel.options].some(o => o.value === _urlMode)) sel.value = _urlMode;
    }

    document.addEventListener('click', e => {
      if (e.target === document.getElementById('api-key-modal')) {
        document.getElementById('api-key-modal').style.display = 'none';
      }
    });
  </script>
</body>
</html>
`
}
