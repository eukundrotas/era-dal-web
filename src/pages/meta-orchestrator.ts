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
  <style>
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
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('meta', lang)}

  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6 max-w-7xl">

      <!-- Header -->
      <div class="mb-6 flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <i class="fas fa-sitemap text-white text-sm"></i>
            </div>
            <h1 class="text-2xl font-bold">${title}</h1>
            <span class="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">v1.0 MVP</span>
          </div>
          <p class="text-gray-400 ml-12">${subtitle}</p>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-400">
          <div class="pulse-dot"></div>
          <span>${isRu ? '5 агентов готовы' : '5 agents ready'}</span>
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

            <!-- Quick tasks -->
            <div class="flex flex-wrap gap-2 mt-3 mb-4">
              ${[
                isRu ? ['🔍 Найти клиентов', 'Найди 30 потенциальных клиентов в нише B2B SaaS, собери контакты и подготовь персональные сообщения'] : ['🔍 Find leads', 'Find 30 potential B2B SaaS clients, gather contacts and prepare personalized messages'],
                isRu ? ['📊 Анализ рынка', 'Сделай конкурентный анализ рынка AI-автоматизации: игроки, цены, позиционирование, тренды'] : ['📊 Market analysis', 'Do a competitive analysis of the AI automation market: players, pricing, positioning, trends'],
                isRu ? ['📝 Контент-план', 'Составь контент-план на месяц для Telegram-канала про ИИ в бизнесе'] : ['📝 Content plan', 'Create a month-long content plan for a Telegram channel about AI in business'],
                isRu ? ['🚀 Запуск услуги', 'Помоги запустить услугу AI-автоматизации: описание, оффер, КП, база клиентов, рассылка'] : ['🚀 Launch service', 'Help launch an AI automation service: description, offer, proposal, client base, outreach'],
              ].map(([label, prompt]) => `
                <button onclick="document.getElementById('task-input').value='${(prompt as string).replace(/'/g, "\\'")}'; updateTaskPreview();"
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
                  <option value="PARALLEL">${isRu ? '⚡ Параллельно' : '⚡ Parallel'}</option>
                  <option value="RELAY">${isRu ? '🔄 Эстафета' : '🔄 Relay'}</option>
                  <option value="DEBATE">${isRu ? '🗣️ Дебаты' : '🗣️ Debate'}</option>
                  <option value="EXPERT_PANEL">${isRu ? '👥 Экспертная комиссия' : '👥 Expert Panel'}</option>
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
              <button onclick="generatePlan()"
                class="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-6 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium">
                <i class="fas fa-magic"></i>
                ${isRu ? 'Сгенерировать план' : 'Generate Plan'}
              </button>
            </div>
          </div>

          <!-- Generated Plan (hidden until generated) -->
          <div id="plan-container" style="display:none;" class="glass rounded-xl p-6">
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-2">
                <i class="fas fa-project-diagram text-violet-400"></i>
                <h3 class="font-semibold">${isRu ? 'Сгенерированный план' : 'Generated Plan'}</h3>
                <span id="plan-strategy-badge" class="strategy-badge bg-violet-500/20 text-violet-300 border border-violet-500/30">PLANNER</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <span class="text-gray-400">${isRu ? 'Оценка стоимости:' : 'Est. cost:'}</span>
                <span id="plan-cost" class="text-green-400 font-medium">~$0.12</span>
              </div>
            </div>

            <div id="plan-steps" class="space-y-1"></div>

            <div class="mt-5 pt-4 border-t border-gray-800 flex items-center justify-between">
              <div class="flex items-center gap-4 text-sm text-gray-400">
                <span><i class="fas fa-clock mr-1"></i> <span id="plan-time">~4 min</span></span>
                <span><i class="fas fa-robot mr-1"></i> <span id="plan-agents-count">5 agents</span></span>
                <span><i class="fas fa-shield-alt text-yellow-400 mr-1"></i>
                  <span id="confirm-count" class="text-yellow-400">2 ${isRu ? 'подтверждения' : 'confirmations'}</span>
                </span>
              </div>
              <button onclick="executePlan()"
                class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium">
                <i class="fas fa-play"></i>
                ${isRu ? 'Запустить' : 'Execute'}
              </button>
            </div>
          </div>

          <!-- Execution progress (hidden) -->
          <div id="exec-container" style="display:none;" class="glass rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold flex items-center gap-2">
                <div class="pulse-dot"></div>
                ${isRu ? 'Выполнение...' : 'Executing...'}
              </h3>
              <span id="exec-progress-label" class="text-sm text-gray-400">0 / 5</span>
            </div>
            <div id="exec-steps" class="space-y-2"></div>
          </div>

          <!-- Result (hidden) -->
          <div id="result-container" style="display:none;" class="glass rounded-xl p-6">
            <div class="flex items-center gap-2 mb-4">
              <i class="fas fa-check-circle text-green-400 text-xl"></i>
              <h3 class="font-semibold text-green-400">${isRu ? 'Задача выполнена' : 'Task completed'}</h3>
            </div>
            <div id="result-content" class="text-gray-300 text-sm leading-relaxed bg-gray-800 rounded-lg p-4"></div>
          </div>
        </div>

        <!-- RIGHT: Agents + Status -->
        <div class="space-y-5">

          <!-- Selected Agents -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <i class="fas fa-users text-blue-400"></i>
              ${isRu ? 'Цифровой штат' : 'Digital Staff'}
            </h3>
            <div id="agent-roster" class="space-y-2">
              ${[
                ['fa-search text-blue-400',    isRu ? 'Лид-исследователь' : 'Lead Researcher',   isRu ? 'Поиск компаний и контактов' : 'Finds companies & contacts',            'green'],
                ['fa-chart-bar text-cyan-400',  isRu ? 'Аналитик' : 'Analyst',                   isRu ? 'Анализ данных и рынка' : 'Data & market analysis',                    'green'],
                ['fa-file-alt text-purple-400', isRu ? 'Копирайтер' : 'Copywriter',              isRu ? 'Тексты и КП' : 'Texts & proposals',                                  'green'],
                ['fa-check-double text-yellow-400', isRu ? 'Контролёр' : 'Quality Control',      isRu ? 'Проверка результатов' : 'Results validation',                        'yellow'],
                ['fa-database text-green-400',  isRu ? 'CRM-агент' : 'CRM Agent',                isRu ? 'Запись в системы' : 'Write to systems',                              'gray'],
              ].map(([icon, name, desc, status]) => `
                <div class="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50">
                  <div class="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <i class="fas ${icon} text-sm"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium truncate">${name}</p>
                    <p class="text-xs text-gray-500 truncate">${desc}</p>
                  </div>
                  <div class="w-2 h-2 rounded-full flex-shrink-0 ${status === 'green' ? 'bg-green-500' : status === 'yellow' ? 'bg-yellow-500' : 'bg-gray-600'}"></div>
                </div>
              `).join('')}
            </div>
            <a href="/agents?lang=${lang}" class="mt-3 w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition py-2 border border-dashed border-gray-700 rounded-lg">
              <i class="fas fa-plus"></i>
              ${isRu ? 'Управлять агентами' : 'Manage agents'}
            </a>
          </div>

          <!-- Autonomy Gate -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <i class="fas fa-shield-alt text-yellow-400"></i>
              Autonomy Gate
            </h3>
            <div class="space-y-2 text-xs">
              <div class="autonomy-safe rounded-lg px-3 py-2 border flex items-center gap-2">
                <i class="fas fa-check-circle"></i>
                <span>${isRu ? 'Сбор данных — авто' : 'Data collection — auto'}</span>
              </div>
              <div class="autonomy-safe rounded-lg px-3 py-2 border flex items-center gap-2">
                <i class="fas fa-check-circle"></i>
                <span>${isRu ? 'Анализ — авто' : 'Analysis — auto'}</span>
              </div>
              <div class="autonomy-confirm rounded-lg px-3 py-2 border flex items-center gap-2">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${isRu ? 'Отправка email — подтверждение' : 'Send email — confirmation'}</span>
              </div>
              <div class="autonomy-confirm rounded-lg px-3 py-2 border flex items-center gap-2">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${isRu ? 'Запись в CRM — подтверждение' : 'Write to CRM — confirmation'}</span>
              </div>
            </div>
          </div>

          <!-- Recent Runs -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <i class="fas fa-history text-gray-400"></i>
              ${isRu ? 'Последние запуски' : 'Recent runs'}
            </h3>
            <div class="space-y-2">
              ${[
                ['✅', isRu ? 'Анализ конкурентов' : 'Competitor analysis', isRu ? '3 мин назад' : '3 min ago', '$0.08'],
                ['✅', isRu ? 'Контент-план на неделю' : 'Weekly content plan', isRu ? '1 ч назад' : '1h ago', '$0.15'],
                ['⚠️', isRu ? 'Поиск лидов' : 'Lead search', isRu ? '2 ч назад' : '2h ago', '$0.22'],
              ].map(([icon, name, time, cost]) => `
                <div class="flex items-center justify-between py-1.5 text-sm">
                  <div class="flex items-center gap-2">
                    <span>${icon}</span>
                    <span class="text-gray-300 truncate max-w-[130px]">${name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs text-gray-500">
                    <span>${time}</span>
                    <span class="text-green-400">${cost}</span>
                  </div>
                </div>
              `).join('')}
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

    const PLAN_TEMPLATES = {
      leads: {
        steps: [
          { agent: isRu?'Лид-исследователь':'Lead Researcher', icon:'fa-search', color:'blue',   action: isRu?'Поиск компаний по критериям ниши':'Search companies by niche criteria',  autonomy:'SAFE',    time:'45s' },
          { agent: isRu?'Лид-исследователь':'Lead Researcher', icon:'fa-address-book', color:'blue',   action: isRu?'Сбор контактов и ЛПР':'Collect contacts and decision-makers',             autonomy:'SAFE',    time:'60s' },
          { agent: isRu?'Аналитик':'Analyst',     icon:'fa-chart-bar', color:'cyan',  action: isRu?'Оценка релевантности и сегментация':'Score relevance and segment leads',           autonomy:'SAFE',    time:'30s' },
          { agent: isRu?'Копирайтер':'Copywriter', icon:'fa-pen', color:'purple', action: isRu?'Персональные сообщения для каждого лида':'Personalized messages for each lead',         autonomy:'SAFE',    time:'90s' },
          { agent: isRu?'CRM-агент':'CRM Agent',    icon:'fa-database', color:'green',  action: isRu?'Запись лидов и сообщений в таблицу':'Write leads and messages to spreadsheet',     autonomy:'CONFIRM', time:'10s' },
        ],
        cost: '~$0.18', time: isRu?'~4 мин':'~4 min'
      },
      market: {
        steps: [
          { agent: isRu?'Аналитик':'Analyst',     icon:'fa-globe', color:'cyan',   action: isRu?'Поиск источников и публикаций по рынку':'Search market sources and publications',      autonomy:'SAFE',    time:'60s' },
          { agent: isRu?'Аналитик':'Analyst',     icon:'fa-table', color:'cyan',   action: isRu?'Извлечение ключевых цифр и данных':'Extract key figures and data',                   autonomy:'SAFE',    time:'45s' },
          { agent: isRu?'Контролёр':'Quality Control', icon:'fa-check-double', color:'yellow', action: isRu?'Проверка источников и фактов':'Verify sources and facts',               autonomy:'SAFE',    time:'30s' },
          { agent: isRu?'Копирайтер':'Copywriter', icon:'fa-file-alt', color:'purple', action: isRu?'Подготовка аналитического обзора':'Prepare analytical overview',               autonomy:'SAFE',    time:'75s' },
        ],
        cost: '~$0.12', time: isRu?'~3 мин':'~3 min'
      },
      content: {
        steps: [
          { agent: isRu?'Аналитик':'Analyst',     icon:'fa-hashtag', color:'cyan',   action: isRu?'Подбор актуальных тем для аудитории':'Find relevant topics for the audience',         autonomy:'SAFE',    time:'30s' },
          { agent: isRu?'Копирайтер':'Copywriter', icon:'fa-pen-nib', color:'purple', action: isRu?'Создание постов и описаний':'Create posts and descriptions',                         autonomy:'SAFE',    time:'90s' },
          { agent: isRu?'Контролёр':'Quality Control', icon:'fa-check', color:'yellow', action: isRu?'Редактура и проверка тона':'Edit and check tone of voice',                       autonomy:'SAFE',    time:'30s' },
          { agent: isRu?'CRM-агент':'CRM Agent',  icon:'fa-calendar', color:'green', action: isRu?'Оформление контент-плана':'Format content calendar',                               autonomy:'SAFE',    time:'15s' },
        ],
        cost: '~$0.10', time: isRu?'~3 мин':'~3 min'
      },
      launch: {
        steps: [
          { agent: isRu?'Аналитик':'Analyst',     icon:'fa-search', color:'cyan',   action: isRu?'Анализ рынка и целевой аудитории':'Market and target audience analysis',              autonomy:'SAFE',    time:'60s' },
          { agent: isRu?'Копирайтер':'Copywriter', icon:'fa-star', color:'purple', action: isRu?'Создание оффера и описания услуги':'Create offer and service description',              autonomy:'SAFE',    time:'60s' },
          { agent: isRu?'Лид-исследователь':'Lead Researcher', icon:'fa-users', color:'blue', action: isRu?'Поиск первых потенциальных клиентов':'Find first potential clients',        autonomy:'SAFE',    time:'75s' },
          { agent: isRu?'Копирайтер':'Copywriter', icon:'fa-envelope', color:'purple', action: isRu?'Подготовка персональных КП':'Prepare personalized proposals',                     autonomy:'SAFE',    time:'90s' },
          { agent: isRu?'CRM-агент':'CRM Agent',  icon:'fa-database', color:'green', action: isRu?'Занести лиды и КП в CRM':'Add leads and proposals to CRM',                          autonomy:'CONFIRM', time:'10s' },
        ],
        cost: '~$0.24', time: isRu?'~5 мин':'~5 min'
      }
    };

    function detectTemplate(text) {
      text = text.toLowerCase();
      if (text.includes(isRu?'клиент':'lead') || text.includes(isRu?'лид':'client') || text.includes('crm') || text.includes(isRu?'контакт':'contact')) return 'leads';
      if (text.includes(isRu?'конкурент':'competitor') || text.includes(isRu?'рынок':'market') || text.includes(isRu?'анализ':'analys')) return 'market';
      if (text.includes(isRu?'контент':'content') || text.includes(isRu?'пост':'post') || text.includes(isRu?'план':'plan')) return 'content';
      if (text.includes(isRu?'запуск':'launch') || text.includes(isRu?'услуг':'service') || text.includes(isRu?'продаж':'sales')) return 'launch';
      return 'leads';
    }

    function generatePlan() {
      const text = document.getElementById('task-input').value.trim();
      if (!text) { alert(isRu?'Введите задачу':'Enter a task'); return; }

      const strategy = document.getElementById('strategy-select').value;
      const tpl = PLAN_TEMPLATES[detectTemplate(text)] || PLAN_TEMPLATES.leads;

      document.getElementById('plan-strategy-badge').textContent = strategy;
      document.getElementById('plan-cost').textContent = tpl.cost;
      document.getElementById('plan-time').textContent = tpl.time;
      document.getElementById('plan-agents-count').textContent = tpl.steps.length + ' ' + (isRu?'агентов':'agents');

      const confirms = tpl.steps.filter(s => s.autonomy === 'CONFIRM').length;
      document.getElementById('confirm-count').textContent = confirms + ' ' + (isRu?'подтверждения':'confirmations');

      const colorMap = { blue:'text-blue-400', cyan:'text-cyan-400', purple:'text-purple-400', yellow:'text-yellow-400', green:'text-green-400' };

      document.getElementById('plan-steps').innerHTML = tpl.steps.map((s, i) => \`
        <div class="flex gap-3 py-2 \${i < tpl.steps.length - 1 ? 'border-b border-gray-800' : ''}">
          <div class="flex flex-col items-center pt-1">
            <div class="step-dot \${s.autonomy === 'SAFE' ? 'bg-green-500' : 'bg-yellow-500'}"></div>
            \${i < tpl.steps.length - 1 ? '<div class="step-line flex-1 mx-auto mt-1" style="width:2px"></div>' : ''}
          </div>
          <div class="flex-1 pb-1">
            <div class="flex items-center gap-2 flex-wrap mb-0.5">
              <span class="agent-chip">
                <i class="fas \${s.icon} \${colorMap[s.color]} text-xs"></i>
                <span class="text-gray-300">\${s.agent}</span>
              </span>
              <span class="text-xs px-2 py-0.5 rounded \${s.autonomy === 'SAFE' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}">
                \${s.autonomy === 'SAFE' ? (isRu?'авто':'auto') : (isRu?'подтверждение':'confirm')}
              </span>
              <span class="text-xs text-gray-600">\${s.time}</span>
            </div>
            <p class="text-sm text-gray-300">\${s.action}</p>
          </div>
        </div>
      \`).join('');

      document.getElementById('plan-container').style.display = 'block';
      document.getElementById('plan-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    async function executePlan() {
      document.getElementById('plan-container').style.display = 'none';
      document.getElementById('exec-container').style.display = 'block';

      const text = document.getElementById('task-input').value;
      const tpl = PLAN_TEMPLATES[detectTemplate(text)] || PLAN_TEMPLATES.leads;
      const colorMap = { blue:'text-blue-400', cyan:'text-cyan-400', purple:'text-purple-400', yellow:'text-yellow-400', green:'text-green-400' };

      const execSteps = document.getElementById('exec-steps');
      execSteps.innerHTML = tpl.steps.map((s, i) => \`
        <div id="exec-step-\${i}" class="flex items-center gap-3 p-2 rounded-lg bg-gray-800/40">
          <div id="exec-icon-\${i}" class="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-circle text-gray-600 text-xs"></i>
          </div>
          <div class="flex-1">
            <span class="text-xs text-gray-400">\${s.agent}</span>
            <p class="text-sm text-gray-300">\${s.action}</p>
          </div>
          <span id="exec-status-\${i}" class="text-xs text-gray-600">${isRu?'ожидание':'pending'}</span>
        </div>
      \`).join('');

      for (let i = 0; i < tpl.steps.length; i++) {
        const s = tpl.steps[i];
        document.getElementById(\`exec-icon-\${i}\`).innerHTML = '<i class="fas fa-spinner fa-spin text-blue-400 text-xs"></i>';
        document.getElementById(\`exec-status-\${i}\`).textContent = isRu?'выполняется...':'running...';
        document.getElementById(\`exec-status-\${i}\`).className = 'text-xs text-blue-400';
        document.getElementById('exec-progress-label').textContent = (i+1) + ' / ' + tpl.steps.length;

        if (s.autonomy === 'CONFIRM') {
          const ok = confirm((isRu?'Подтвердите действие: ':'Confirm action: ') + s.action);
          if (!ok) { document.getElementById(\`exec-status-\${i}\`).textContent = isRu?'отменено':'cancelled'; break; }
        }

        await new Promise(r => setTimeout(r, 800 + Math.random() * 700));
        document.getElementById(\`exec-icon-\${i}\`).innerHTML = '<i class="fas fa-check text-green-400 text-xs"></i>';
        document.getElementById(\`exec-status-\${i}\`).textContent = isRu?'готово':'done';
        document.getElementById(\`exec-status-\${i}\`).className = 'text-xs text-green-400';
      }

      document.getElementById('exec-container').style.display = 'none';
      document.getElementById('result-container').style.display = 'block';
      document.getElementById('result-content').innerHTML = isRu
        ? '<p><strong>Задача выполнена успешно.</strong> Все шаги завершены. Результаты сохранены в журнале действий.</p><p class="mt-2 text-gray-400">Просмотрите полный отчёт в <a href="/journal?lang=ru" class="text-blue-400 hover:underline">журнале</a>.</p>'
        : '<p><strong>Task completed successfully.</strong> All steps finished. Results saved to the action journal.</p><p class="mt-2 text-gray-400">View the full report in the <a href="/journal?lang=en" class="text-blue-400 hover:underline">journal</a>.</p>';
    }
  </script>
</body>
</html>
`
}
