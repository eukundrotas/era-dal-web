import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const agentsPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'Цифровой штат' : 'Digital Staff'
  const subtitle = isRu
    ? 'Управление ИИ-сотрудниками: роли, инструменты, инструкции, доступы'
    : 'Manage AI employees: roles, tools, instructions, and permissions'

  const AGENTS = [
    { icon: 'fa-search',        color: 'blue',   gradFrom: 'from-blue-600',   gradTo: 'to-blue-800',
      nameEn: 'Lead Researcher',       nameRu: 'Лид-исследователь',
      roleEn: 'Sales Intelligence',    roleRu: 'Поиск клиентов',
      descEn: 'Searches companies, collects contacts, identifies decision-makers, validates relevance.',
      descRu: 'Ищет компании, собирает контакты, определяет ЛПР, оценивает релевантность.',
      tools: ['Web Search', 'LinkedIn', 'CRM Read'], status: 'ready' },

    { icon: 'fa-chart-bar',     color: 'cyan',   gradFrom: 'from-cyan-600',   gradTo: 'to-cyan-800',
      nameEn: 'Market Analyst',        nameRu: 'Аналитик рынка',
      roleEn: 'Research & Analytics',  roleRu: 'Аналитика',
      descEn: 'Collects market data, compares competitors, extracts numbers, prepares analysis.',
      descRu: 'Собирает данные рынка, сравнивает конкурентов, извлекает цифры, готовит обзор.',
      tools: ['Web Search', 'Sheets', 'Critic'], status: 'ready' },

    { icon: 'fa-pen-nib',       color: 'purple', gradFrom: 'from-purple-600', gradTo: 'to-purple-800',
      nameEn: 'Copywriter',            nameRu: 'Копирайтер',
      roleEn: 'Content & Texts',       roleRu: 'Тексты и контент',
      descEn: 'Writes posts, articles, emails, proposals, scripts, and landing page copy.',
      descRu: 'Пишет посты, статьи, письма, КП, скрипты и тексты для лендингов.',
      tools: ['Text Gen', 'RAG Docs', 'Editor'], status: 'ready' },

    { icon: 'fa-briefcase',     color: 'indigo', gradFrom: 'from-indigo-600', gradTo: 'to-indigo-800',
      nameEn: 'Sales Director',        nameRu: 'Коммерческий директор',
      roleEn: 'Sales & Proposals',     roleRu: 'Продажи и оферты',
      descEn: 'Analyzes client needs, builds offers, prepares proposals, evaluates deal probability.',
      descRu: 'Анализирует потребности клиента, собирает оффер, готовит КП, оценивает сделку.',
      tools: ['RAG Docs', 'CRM Read', 'Calc'], status: 'ready' },

    { icon: 'fa-bullhorn',      color: 'pink',   gradFrom: 'from-pink-600',   gradTo: 'to-pink-800',
      nameEn: 'Marketing Strategist',  nameRu: 'Маркетолог',
      roleEn: 'Marketing & Positioning', roleRu: 'Маркетинг и позиционирование',
      descEn: 'Builds content plans, creates offers, analyzes audience, packages products.',
      descRu: 'Строит контент-план, создаёт офферы, анализирует аудиторию, упаковывает продукт.',
      tools: ['Web Search', 'Sheets', 'Text Gen'], status: 'ready' },

    { icon: 'fa-check-double',  color: 'yellow', gradFrom: 'from-yellow-600', gradTo: 'to-yellow-800',
      nameEn: 'Quality Controller',    nameRu: 'Контролёр качества',
      roleEn: 'Validation & Critic',   roleRu: 'Валидация и критика',
      descEn: 'Checks facts, logic, sources, completeness, and format of all outputs.',
      descRu: 'Проверяет факты, логику, источники, полноту и формат всех результатов.',
      tools: ['Critic LLM', 'Web Check', 'RAG'], status: 'ready' },

    { icon: 'fa-database',      color: 'green',  gradFrom: 'from-green-600',  gradTo: 'to-green-800',
      nameEn: 'CRM Agent',             nameRu: 'CRM-агент',
      roleEn: 'Data Management',       roleRu: 'Управление данными',
      descEn: 'Writes leads, tasks, and results to CRM, spreadsheets, and databases.',
      descRu: 'Заносит лиды, задачи и результаты в CRM, таблицы и базы данных.',
      tools: ['Google Sheets', 'CRM Write', 'Telegram'], status: 'idle' },

    { icon: 'fa-newspaper',     color: 'orange', gradFrom: 'from-orange-600', gradTo: 'to-orange-800',
      nameEn: 'Business Radar',        nameRu: 'Бизнес-радар',
      roleEn: 'Market Intelligence',   roleRu: 'Разведка рынка',
      descEn: 'Monitors news, competitor activity, price changes, and regulatory updates.',
      descRu: 'Мониторит новости, активность конкурентов, изменения цен и регуляторику.',
      tools: ['Web Search', 'RSS', 'Summarizer'], status: 'idle' },

    { icon: 'fa-headset',       color: 'teal',   gradFrom: 'from-teal-600',   gradTo: 'to-teal-800',
      nameEn: 'Support Agent',         nameRu: 'Поддержка',
      roleEn: 'Customer Service',      roleRu: 'Клиентская поддержка',
      descEn: 'Answers questions, classifies requests, prepares replies, escalates complex cases.',
      descRu: 'Отвечает на вопросы, классифицирует обращения, готовит ответы, эскалирует сложные случаи.',
      tools: ['RAG Docs', 'Telegram', 'CRM Read'], status: 'idle' },

    { icon: 'fa-tasks',         color: 'violet', gradFrom: 'from-violet-600', gradTo: 'to-violet-800',
      nameEn: 'Project Manager',       nameRu: 'Менеджер проектов',
      roleEn: 'Planning & Coordination', roleRu: 'Планирование и координация',
      descEn: 'Breaks down projects into tasks, assigns agents, tracks statuses, prepares reports.',
      descRu: 'Разбивает проекты на задачи, назначает агентов, отслеживает статусы, готовит отчёты.',
      tools: ['Planner', 'Sheets', 'Notifier'], status: 'idle' },

    { icon: 'fa-balance-scale',  color: 'red',   gradFrom: 'from-red-600',    gradTo: 'to-red-800',
      nameEn: 'Legal Assistant',       nameRu: 'Юрист-ассистент',
      roleEn: 'Legal & Compliance',    roleRu: 'Юридическая поддержка',
      descEn: 'Checks contracts, identifies risks, prepares legal summaries, validates clauses.',
      descRu: 'Проверяет договоры, выявляет риски, готовит юридические сводки, валидирует пункты.',
      tools: ['RAG Docs', 'Critic LLM', 'Search'], status: 'idle' },

    { icon: 'fa-code',           color: 'lime',  gradFrom: 'from-lime-600',   gradTo: 'to-lime-800',
      nameEn: 'Technical Agent',       nameRu: 'Технический агент',
      roleEn: 'Automation & Code',     roleRu: 'Автоматизация и код',
      descEn: 'Writes code, configures automations, builds integrations, debugs errors.',
      descRu: 'Пишет код, настраивает автоматизации, строит интеграции, дебажит ошибки.',
      tools: ['Code Gen', 'MCP Tools', 'API'], status: 'idle' },

    { icon: 'fa-users',          color: 'sky',   gradFrom: 'from-sky-600',    gradTo: 'to-sky-800',
      nameEn: 'HR Assistant',          nameRu: 'HR-ассистент',
      roleEn: 'Recruitment & Onboarding', roleRu: 'Подбор и онбординг',
      descEn: 'Searches candidates, screens resumes, writes job descriptions, prepares onboarding materials.',
      descRu: 'Ищет кандидатов, скринирует резюме, пишет описания вакансий, готовит онбординг.',
      tools: ['LinkedIn', 'RAG Docs', 'Sheets'], status: 'offline' },

    { icon: 'fa-chart-line',     color: 'emerald', gradFrom: 'from-emerald-600', gradTo: 'to-emerald-800',
      nameEn: 'Financial Analyst',     nameRu: 'Финансовый аналитик',
      roleEn: 'Finance & Forecasting', roleRu: 'Финансы и прогнозы',
      descEn: 'Analyzes financial data, builds forecasts, prepares reports, compares performance.',
      descRu: 'Анализирует финансовые данные, строит прогнозы, готовит отчёты, сравнивает показатели.',
      tools: ['Sheets', 'Calc', 'RAG Docs'], status: 'offline' },

    { icon: 'fa-lightbulb',      color: 'amber', gradFrom: 'from-amber-600',  gradTo: 'to-amber-800',
      nameEn: 'Innovation Strategist', nameRu: 'Стратег',
      roleEn: 'Strategy & Innovation', roleRu: 'Стратегия и инновации',
      descEn: 'Builds business models, identifies growth opportunities, applies TRIZ and systems thinking.',
      descRu: 'Строит бизнес-модели, находит точки роста, применяет ТРИЗ и системное мышление.',
      tools: ['Web Search', 'Thinking Modes', 'Sheets'], status: 'offline' },
  ]

  const colorClasses: Record<string, string> = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    pink: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    green: 'text-green-400 bg-green-500/10 border-green-500/30',
    orange: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    teal: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    violet: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
    red: 'text-red-400 bg-red-500/10 border-red-500/30',
    lime: 'text-lime-400 bg-lime-500/10 border-lime-500/30',
    sky: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  }

  const statusBadge = (s: string) =>
    s === 'ready'
      ? `<span class="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">${isRu ? 'Готов' : 'Ready'}</span>`
      : s === 'idle'
      ? `<span class="text-xs px-2 py-0.5 rounded-full bg-gray-500/15 text-gray-400 border border-gray-500/30">${isRu ? 'Ожидание' : 'Idle'}</span>`
      : `<span class="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">${isRu ? 'Офлайн' : 'Offline'}</span>`

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, subtitle, lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('agents', lang)}

  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6">

      <!-- Header -->
      <div class="mb-6 flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
              <i class="fas fa-users text-white text-sm"></i>
            </div>
            <h1 class="text-2xl font-bold">${title}</h1>
          </div>
          <p class="text-gray-400 ml-12">${subtitle}</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-4 text-sm text-gray-400 glass rounded-lg px-4 py-2">
            <span><span class="text-green-400 font-bold">6</span> ${isRu ? 'готовы' : 'ready'}</span>
            <span class="text-gray-700">|</span>
            <span><span class="text-gray-300 font-bold">6</span> ${isRu ? 'ожидают' : 'idle'}</span>
            <span class="text-gray-700">|</span>
            <span><span class="text-red-400 font-bold">3</span> ${isRu ? 'офлайн' : 'offline'}</span>
          </div>
          <button onclick="showCreateModal()"
            class="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <i class="fas fa-plus"></i>
            ${isRu ? 'Создать агента' : 'Create agent'}
          </button>
        </div>
      </div>

      <!-- Filter bar -->
      <div class="flex items-center gap-3 mb-6">
        <input id="agent-search" type="text" placeholder="${isRu ? 'Поиск агента...' : 'Search agent...'}"
          oninput="filterAgents()"
          class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 w-64">
        <select id="status-filter" onchange="filterAgents()"
          class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
          <option value="">${isRu ? 'Все статусы' : 'All statuses'}</option>
          <option value="ready">${isRu ? 'Готов' : 'Ready'}</option>
          <option value="idle">${isRu ? 'Ожидание' : 'Idle'}</option>
          <option value="offline">${isRu ? 'Офлайн' : 'Offline'}</option>
        </select>
      </div>

      <!-- Agent grid -->
      <div id="agent-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        ${AGENTS.map(a => `
          <div class="agent-card glass rounded-xl p-5 hover:border-gray-600 transition-all cursor-pointer group"
               data-name="${(isRu ? a.nameRu : a.nameEn).toLowerCase()}"
               data-status="${a.status}"
               onclick="openAgent('${isRu ? a.nameRu : a.nameEn}')">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-br ${a.gradFrom} ${a.gradTo} flex items-center justify-center shadow-lg">
                  <i class="fas ${a.icon} text-white text-base"></i>
                </div>
                <div>
                  <p class="font-semibold text-sm">${isRu ? a.nameRu : a.nameEn}</p>
                  <p class="text-xs text-gray-500">${isRu ? a.roleRu : a.roleEn}</p>
                </div>
              </div>
              ${statusBadge(a.status)}
            </div>

            <p class="text-xs text-gray-400 mb-3 leading-relaxed">${isRu ? a.descRu : a.descEn}</p>

            <div class="flex flex-wrap gap-1.5">
              ${a.tools.map(t => `
                <span class="text-xs px-2 py-0.5 rounded border ${colorClasses[a.color]}">${t}</span>
              `).join('')}
            </div>

            <div class="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="text-xs text-blue-400 hover:text-blue-300" onclick="event.stopPropagation()">
                <i class="fas fa-edit mr-1"></i>${isRu ? 'Настроить' : 'Configure'}
              </button>
              <button class="text-xs text-violet-400 hover:text-violet-300" onclick="event.stopPropagation(); runAgent('${isRu ? a.nameRu : a.nameEn}')">
                <i class="fas fa-play mr-1"></i>${isRu ? 'Запустить' : 'Run'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  </main>

  <!-- Create Agent Modal -->
  <div id="create-modal" style="display:none;"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl p-6 w-full max-w-lg">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-lg font-semibold">${isRu ? 'Создать агента' : 'Create agent'}</h3>
        <button onclick="document.getElementById('create-modal').style.display='none'"
          class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">${isRu ? 'Имя агента' : 'Agent name'}</label>
          <input type="text" placeholder="${isRu ? 'Например: Email-менеджер' : 'E.g. Email Manager'}"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">${isRu ? 'Роль и инструкции' : 'Role & instructions'}</label>
          <textarea rows="3" placeholder="${isRu ? 'Опишите, что делает агент и как он должен работать...' : 'Describe what the agent does and how it should work...'}"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"></textarea>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">${isRu ? 'Инструменты' : 'Tools'}</label>
          <div class="flex flex-wrap gap-2">
            ${['Web Search', 'Google Sheets', 'CRM', 'Telegram', 'Email', 'RAG Docs', 'Code Gen', 'Critic LLM'].map(t => `
              <label class="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                <input type="checkbox" class="rounded accent-violet-500"> ${t}
              </label>
            `).join('')}
          </div>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">${isRu ? 'Режим мышления по умолчанию' : 'Default thinking mode'}</label>
          <select class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
            <option>🧠 ${isRu ? 'Стандартное' : 'Standard'}</option>
            <option>⚙️ ${isRu ? 'ТРИЗ' : 'TRIZ'}</option>
            <option>⚖️ ${isRu ? 'Критическое' : 'Critical'}</option>
            <option>🌐 ${isRu ? 'Системное' : 'Systems'}</option>
          </select>
        </div>
      </div>
      <div class="flex gap-3 mt-5">
        <button onclick="document.getElementById('create-modal').style.display='none'"
          class="flex-1 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white text-sm transition">
          ${isRu ? 'Отмена' : 'Cancel'}
        </button>
        <button onclick="saveAgent()"
          class="flex-1 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium">
          ${isRu ? 'Создать' : 'Create'}
        </button>
      </div>
    </div>
  </div>

  <script>
    function filterAgents() {
      const q = document.getElementById('agent-search').value.toLowerCase();
      const s = document.getElementById('status-filter').value;
      document.querySelectorAll('.agent-card').forEach(el => {
        const nameMatch = !q || el.dataset.name.includes(q);
        const statusMatch = !s || el.dataset.status === s;
        el.style.display = nameMatch && statusMatch ? '' : 'none';
      });
    }
    function showCreateModal() { document.getElementById('create-modal').style.display = 'flex'; }
    function saveAgent() {
      alert('${isRu ? 'Агент будет создан после подключения базы данных (T-META-2)' : 'Agent will be created once the database layer is connected (T-META-2)'}');
      document.getElementById('create-modal').style.display = 'none';
    }
    function openAgent(name) { /* future: open detail panel */ }
    function runAgent(name) {
      window.location.href = '/meta?lang=${lang}';
    }
  </script>
</body>
</html>
`
}
