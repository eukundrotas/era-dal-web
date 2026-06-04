import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const agentsPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'Цифровой штат' : 'Digital Staff'
  const subtitle = isRu
    ? 'Управление ИИ-сотрудниками: роли, инструменты, инструкции, доступы'
    : 'Manage AI employees: roles, tools, instructions, and permissions'

  // Built-in role catalog — always shown as reference
  const SHOWCASE = [
    { icon: 'fa-search',        gradFrom: 'from-blue-600',    gradTo: 'to-blue-800',    role: 'lead_researcher',
      nameEn: 'Lead Researcher',        nameRu: 'Лид-исследователь',
      roleEn: 'Sales Intelligence',     roleRu: 'Поиск клиентов',
      descEn: 'Searches companies, collects contacts, identifies decision-makers.',
      descRu: 'Ищет компании, собирает контакты, определяет ЛПР.',
      tools: ['Web Search', 'LinkedIn', 'CRM Read'] },
    { icon: 'fa-chart-bar',     gradFrom: 'from-cyan-600',    gradTo: 'to-cyan-800',    role: 'market_analyst',
      nameEn: 'Market Analyst',         nameRu: 'Аналитик рынка',
      roleEn: 'Research & Analytics',   roleRu: 'Аналитика',
      descEn: 'Collects market data, compares competitors, prepares analysis.',
      descRu: 'Собирает данные рынка, сравнивает конкурентов, готовит обзор.',
      tools: ['Web Search', 'Sheets', 'Critic'] },
    { icon: 'fa-pen-nib',       gradFrom: 'from-purple-600',  gradTo: 'to-purple-800',  role: 'copywriter',
      nameEn: 'Copywriter',             nameRu: 'Копирайтер',
      roleEn: 'Content & Texts',        roleRu: 'Тексты и контент',
      descEn: 'Writes posts, emails, proposals, scripts, and landing copy.',
      descRu: 'Пишет посты, письма, КП, скрипты и тексты для лендингов.',
      tools: ['Text Gen', 'RAG Docs', 'Editor'] },
    { icon: 'fa-briefcase',     gradFrom: 'from-indigo-600',  gradTo: 'to-indigo-800',  role: 'sales_director',
      nameEn: 'Sales Director',         nameRu: 'Коммерческий директор',
      roleEn: 'Sales & Proposals',      roleRu: 'Продажи и оферты',
      descEn: 'Builds offers, prepares proposals, evaluates deal probability.',
      descRu: 'Собирает оффер, готовит КП, оценивает сделку.',
      tools: ['RAG Docs', 'CRM Read', 'Calc'] },
    { icon: 'fa-bullhorn',      gradFrom: 'from-pink-600',    gradTo: 'to-pink-800',    role: 'marketing_strategist',
      nameEn: 'Marketing Strategist',   nameRu: 'Маркетолог',
      roleEn: 'Marketing & Positioning',roleRu: 'Маркетинг и позиционирование',
      descEn: 'Builds content plans, creates offers, analyzes audience.',
      descRu: 'Строит контент-план, создаёт офферы, анализирует аудиторию.',
      tools: ['Web Search', 'Sheets', 'Text Gen'] },
    { icon: 'fa-check-double',  gradFrom: 'from-yellow-600',  gradTo: 'to-yellow-800',  role: 'quality_controller',
      nameEn: 'Quality Controller',     nameRu: 'Контролёр качества',
      roleEn: 'Validation & Critic',    roleRu: 'Валидация и критика',
      descEn: 'Checks facts, logic, sources, and format of all outputs.',
      descRu: 'Проверяет факты, логику, источники и формат результатов.',
      tools: ['Critic LLM', 'Web Check', 'RAG'] },
    { icon: 'fa-database',      gradFrom: 'from-green-600',   gradTo: 'to-green-800',   role: 'crm_agent',
      nameEn: 'CRM Agent',              nameRu: 'CRM-агент',
      roleEn: 'Data Management',        roleRu: 'Управление данными',
      descEn: 'Writes leads, tasks, and results to CRM and spreadsheets.',
      descRu: 'Заносит лиды, задачи и результаты в CRM и таблицы.',
      tools: ['Google Sheets', 'CRM Write', 'Telegram'] },
    { icon: 'fa-newspaper',     gradFrom: 'from-orange-600',  gradTo: 'to-orange-800',  role: 'business_radar',
      nameEn: 'Business Radar',         nameRu: 'Бизнес-радар',
      roleEn: 'Market Intelligence',    roleRu: 'Разведка рынка',
      descEn: 'Monitors news, competitor activity, price changes.',
      descRu: 'Мониторит новости, активность конкурентов, изменения цен.',
      tools: ['Web Search', 'RSS', 'Summarizer'] },
    { icon: 'fa-headset',       gradFrom: 'from-teal-600',    gradTo: 'to-teal-800',    role: 'support_agent',
      nameEn: 'Support Agent',          nameRu: 'Поддержка',
      roleEn: 'Customer Service',       roleRu: 'Клиентская поддержка',
      descEn: 'Answers questions, classifies requests, escalates complex cases.',
      descRu: 'Отвечает на вопросы, классифицирует обращения, эскалирует сложные.',
      tools: ['RAG Docs', 'Telegram', 'CRM Read'] },
    { icon: 'fa-tasks',         gradFrom: 'from-violet-600',  gradTo: 'to-violet-800',  role: 'project_manager',
      nameEn: 'Project Manager',        nameRu: 'Менеджер проектов',
      roleEn: 'Planning & Coordination',roleRu: 'Планирование и координация',
      descEn: 'Breaks down projects, assigns agents, tracks statuses.',
      descRu: 'Разбивает проекты на задачи, назначает агентов, отслеживает статусы.',
      tools: ['Planner', 'Sheets', 'Notifier'] },
    { icon: 'fa-balance-scale', gradFrom: 'from-red-600',     gradTo: 'to-red-800',     role: 'legal_assistant',
      nameEn: 'Legal Assistant',        nameRu: 'Юрист-ассистент',
      roleEn: 'Legal & Compliance',     roleRu: 'Юридическая поддержка',
      descEn: 'Checks contracts, identifies risks, validates clauses.',
      descRu: 'Проверяет договоры, выявляет риски, валидирует пункты.',
      tools: ['RAG Docs', 'Critic LLM', 'Search'] },
    { icon: 'fa-code',          gradFrom: 'from-lime-600',    gradTo: 'to-lime-800',    role: 'technical_agent',
      nameEn: 'Technical Agent',        nameRu: 'Технический агент',
      roleEn: 'Automation & Code',      roleRu: 'Автоматизация и код',
      descEn: 'Writes code, configures automations, builds integrations.',
      descRu: 'Пишет код, настраивает автоматизации, строит интеграции.',
      tools: ['Code Gen', 'MCP Tools', 'API'] },
    { icon: 'fa-users',         gradFrom: 'from-sky-600',     gradTo: 'to-sky-800',     role: 'hr_assistant',
      nameEn: 'HR Assistant',           nameRu: 'HR-ассистент',
      roleEn: 'Recruitment & Onboarding',roleRu: 'Подбор и онбординг',
      descEn: 'Screens resumes, writes job descriptions, prepares onboarding.',
      descRu: 'Скринирует резюме, пишет вакансии, готовит онбординг.',
      tools: ['LinkedIn', 'RAG Docs', 'Sheets'] },
    { icon: 'fa-chart-line',    gradFrom: 'from-emerald-600', gradTo: 'to-emerald-800', role: 'financial_analyst',
      nameEn: 'Financial Analyst',      nameRu: 'Финансовый аналитик',
      roleEn: 'Finance & Forecasting',  roleRu: 'Финансы и прогнозы',
      descEn: 'Analyzes financial data, builds forecasts, prepares reports.',
      descRu: 'Анализирует финансовые данные, строит прогнозы, готовит отчёты.',
      tools: ['Sheets', 'Calc', 'RAG Docs'] },
    { icon: 'fa-lightbulb',     gradFrom: 'from-amber-600',   gradTo: 'to-amber-800',   role: 'innovation_strategist',
      nameEn: 'Innovation Strategist',  nameRu: 'Стратег',
      roleEn: 'Strategy & Innovation',  roleRu: 'Стратегия и инновации',
      descEn: 'Identifies growth opportunities, applies TRIZ and systems thinking.',
      descRu: 'Находит точки роста, применяет ТРИЗ и системное мышление.',
      tools: ['Web Search', 'Thinking Modes', 'Sheets'] },
  ]

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, subtitle, lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('agents', lang)}

  <main class="ml-56 pt-4 min-h-screen">
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
          <div id="agent-stats" class="flex items-center gap-4 text-sm text-gray-400 glass rounded-lg px-4 py-2">
            <span><span class="text-green-400 font-bold" id="stat-ready">—</span> ${isRu ? 'готовы' : 'ready'}</span>
            <span class="text-gray-700">|</span>
            <span><span class="text-gray-300 font-bold">${SHOWCASE.length}</span> ${isRu ? 'ролей' : 'roles'}</span>
          </div>
          <button onclick="showCreateModal()"
            class="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <i class="fas fa-plus"></i>
            ${isRu ? 'Создать агента' : 'Create agent'}
          </button>
        </div>
      </div>

      <!-- Filter bar -->
      <div class="flex items-center gap-3 mb-5">
        <input id="agent-search" type="text" placeholder="${isRu ? 'Поиск агента...' : 'Search agent...'}"
          oninput="filterAgents()"
          class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 w-64">
        <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input type="checkbox" id="show-custom-only" onchange="filterAgents()" class="rounded accent-violet-500">
          ${isRu ? 'Только кастомные' : 'Custom only'}
        </label>
      </div>

      <!-- Custom agents section (populated from API) -->
      <div id="custom-section" style="display:none;" class="mb-8">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <i class="fas fa-user-cog text-violet-400"></i>
          ${isRu ? 'Ваши агенты' : 'Your agents'}
        </h2>
        <div id="custom-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>
      </div>

      <!-- Built-in showcase -->
      <div id="showcase-section">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <i class="fas fa-layer-group text-blue-400"></i>
          ${isRu ? 'Встроенные роли' : 'Built-in roles'}
        </h2>
        <div id="agent-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          ${SHOWCASE.map(a => `
            <div class="agent-card glass rounded-xl p-5 hover:border-gray-600 transition-all group"
                 data-name="${(isRu ? a.nameRu : a.nameEn).toLowerCase()}"
                 data-role="${a.role}"
                 data-custom="false">
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
                <span class="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">${isRu ? 'встроен' : 'built-in'}</span>
              </div>
              <p class="text-xs text-gray-400 mb-3 leading-relaxed">${isRu ? a.descRu : a.descEn}</p>
              <div class="flex flex-wrap gap-1.5">
                ${a.tools.map(t => `<span class="text-xs px-2 py-0.5 rounded border border-gray-700 text-gray-400">${t}</span>`).join('')}
              </div>
              <div class="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="customizeRole('${a.role}', '${(isRu ? a.nameRu : a.nameEn).replace(/'/g,"\\'")}', '${a.gradFrom}', '${a.gradTo}', '${a.icon}')"
                  class="text-xs text-violet-400 hover:text-violet-300">
                  <i class="fas fa-plus mr-1"></i>${isRu ? 'Кастомизировать' : 'Customize'}
                </button>
                <button onclick="runBuiltinAgent('${a.role}')"
                  class="text-xs text-green-400 hover:text-green-300">
                  <i class="fas fa-play mr-1"></i>${isRu ? 'Использовать' : 'Use'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </main>

  <!-- Create / Customize Agent Modal -->
  <div id="create-modal" style="display:none;"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-5">
        <h3 id="modal-title" class="text-lg font-semibold">${isRu ? 'Создать агента' : 'Create agent'}</h3>
        <button onclick="closeModal()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Имя (EN)' : 'Name (EN)'} *</label>
            <input id="m-name-en" type="text" placeholder="Lead Researcher"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Имя (RU)' : 'Name (RU)'}</label>
            <input id="m-name-ru" type="text" placeholder="Лид-исследователь"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
          </div>
        </div>

        <div>
          <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Роль' : 'Role'} *</label>
          <select id="m-role"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
            <option value="lead_researcher">lead_researcher</option>
            <option value="market_analyst">market_analyst</option>
            <option value="copywriter">copywriter</option>
            <option value="sales_director">sales_director</option>
            <option value="marketing_strategist">marketing_strategist</option>
            <option value="quality_controller">quality_controller</option>
            <option value="crm_agent">crm_agent</option>
            <option value="business_radar">business_radar</option>
            <option value="support_agent">support_agent</option>
            <option value="project_manager">project_manager</option>
            <option value="legal_assistant">legal_assistant</option>
            <option value="technical_agent">technical_agent</option>
            <option value="hr_assistant">hr_assistant</option>
            <option value="financial_analyst">financial_analyst</option>
            <option value="innovation_strategist">innovation_strategist</option>
            <option value="custom">custom</option>
          </select>
        </div>

        <div>
          <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Инструкции' : 'Instructions'} *</label>
          <textarea id="m-instructions" rows="4"
            placeholder="${isRu ? 'Опишите роль, задачи и стиль работы агента...' : 'Describe the agent\'s role, tasks, and working style...'}"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Режим мышления' : 'Thinking mode'}</label>
            <select id="m-thinking"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
              <option value="standard">${isRu ? '🧠 Стандартное' : '🧠 Standard'}</option>
              <option value="systems">${isRu ? '🌐 Системное' : '🌐 Systems'}</option>
              <option value="critical">${isRu ? '⚖️ Критическое' : '⚖️ Critical'}</option>
              <option value="first_principles">${isRu ? '🔬 Первые принципы' : '🔬 First Principles'}</option>
              <option value="triz">${isRu ? '⚙️ ТРИЗ' : '⚙️ TRIZ'}</option>
              <option value="lateral">${isRu ? '🔀 Латеральное' : '🔀 Lateral'}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Формат вывода' : 'Output format'}</label>
            <select id="m-output"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
              <option value="text">${isRu ? 'Текст' : 'Text'}</option>
              <option value="markdown">Markdown</option>
              <option value="json">JSON</option>
              <option value="table">${isRu ? 'Таблица' : 'Table'}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">Max tokens</label>
            <input id="m-tokens" type="number" value="2048" min="256" max="8192"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">Temperature</label>
            <input id="m-temp" type="number" value="0.7" min="0" max="2" step="0.1"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
          </div>
        </div>
      </div>

      <div id="modal-error" style="display:none;"
        class="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2"></div>

      <div class="flex gap-3 mt-5">
        <button onclick="closeModal()"
          class="flex-1 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white text-sm transition">
          ${isRu ? 'Отмена' : 'Cancel'}
        </button>
        <button id="save-btn" onclick="saveAgent()"
          class="flex-1 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium">
          ${isRu ? 'Создать' : 'Create'}
        </button>
      </div>
    </div>
  </div>

  <!-- Agent detail modal -->
  <div id="detail-modal" style="display:none;"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-4">
        <h3 id="detail-name" class="text-lg font-semibold"></h3>
        <button onclick="document.getElementById('detail-modal').style.display='none'" class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div id="detail-body" class="space-y-3 text-sm text-gray-400"></div>
      <div class="flex gap-2 mt-5">
        <button id="detail-delete" onclick="deleteAgent()"
          class="flex-1 py-2 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 text-sm transition">
          <i class="fas fa-trash mr-1"></i>${isRu ? 'Удалить' : 'Delete'}
        </button>
        <button onclick="document.getElementById('detail-modal').style.display='none'"
          class="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm transition">
          ${isRu ? 'Закрыть' : 'Close'}
        </button>
      </div>
    </div>
  </div>

  <script>
    const isRu = ${isRu};
    let currentAgentId = null;
    let customAgents = [];

    // ─── Custom agents from API ─────────────────────────────────────────────

    async function loadCustomAgents() {
      try {
        const res = await fetch('/api/meta/agents');
        if (!res.ok) return;
        const data = await res.json();
        customAgents = data.agents || [];
        renderCustomAgents();
        document.getElementById('stat-ready').textContent = customAgents.length;
      } catch { /* silent */ }
    }

    function renderCustomAgents() {
      const section = document.getElementById('custom-section');
      const grid = document.getElementById('custom-grid');
      if (!customAgents.length) { section.style.display = 'none'; return; }
      section.style.display = '';

      grid.innerHTML = customAgents.map(a => \`
        <div class="agent-card glass rounded-xl p-5 hover:border-violet-500/40 transition-all group cursor-pointer"
             data-name="\${(a.nameEn || '').toLowerCase()}"
             data-role="\${a.role}"
             data-custom="true"
             onclick="openAgentDetail('\${a.id}')">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg">
                <i class="fas fa-robot text-white text-base"></i>
              </div>
              <div>
                <p class="font-semibold text-sm">\${a.nameEn}</p>
                <p class="text-xs text-gray-500">\${a.role.replace(/_/g,' ')}</p>
              </div>
            </div>
            <span class="text-xs px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/30">${isRu ? 'кастом' : 'custom'}</span>
          </div>
          <p class="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">\${a.instructions || '—'}</p>
          <div class="flex items-center justify-between text-xs text-gray-600 mt-2">
            <span>\${a.thinkingMode}</span>
            <span>\${a.outputFormat}</span>
          </div>
        </div>
      \`).join('');
    }

    function openAgentDetail(id) {
      const a = customAgents.find(x => x.id === id);
      if (!a) return;
      currentAgentId = id;
      document.getElementById('detail-name').textContent = a.nameEn + (a.nameRu ? ' / ' + a.nameRu : '');
      document.getElementById('detail-body').innerHTML = \`
        <div><span class="text-gray-600">Role:</span> \${a.role}</div>
        <div><span class="text-gray-600">Thinking:</span> \${a.thinkingMode}</div>
        <div><span class="text-gray-600">Output:</span> \${a.outputFormat}</div>
        <div><span class="text-gray-600">Tokens:</span> \${a.maxTokens} · temp \${a.temperature}</div>
        <div class="mt-2"><span class="text-gray-600">${isRu ? 'Инструкции:' : 'Instructions:'}</span><p class="mt-1 text-gray-300 whitespace-pre-wrap">\${a.instructions}</p></div>
      \`;
      document.getElementById('detail-modal').style.display = 'flex';
    }

    async function deleteAgent() {
      if (!currentAgentId) return;
      if (!confirm(isRu?'Удалить агента?':'Delete this agent?')) return;
      try {
        const res = await fetch('/api/meta/agents/' + currentAgentId, { method: 'DELETE' });
        if (res.ok) {
          customAgents = customAgents.filter(a => a.id !== currentAgentId);
          renderCustomAgents();
          document.getElementById('detail-modal').style.display = 'none';
          document.getElementById('stat-ready').textContent = customAgents.length;
        }
      } catch(e) { alert(e.message); }
    }

    // ─── Create / Customize ─────────────────────────────────────────────────

    function showCreateModal() {
      document.getElementById('modal-title').textContent = isRu?'Создать агента':'Create agent';
      document.getElementById('m-name-en').value = '';
      document.getElementById('m-name-ru').value = '';
      document.getElementById('m-role').value = 'custom';
      document.getElementById('m-instructions').value = '';
      document.getElementById('m-thinking').value = 'standard';
      document.getElementById('m-output').value = 'text';
      document.getElementById('m-tokens').value = '2048';
      document.getElementById('m-temp').value = '0.7';
      document.getElementById('modal-error').style.display = 'none';
      document.getElementById('create-modal').style.display = 'flex';
    }

    function customizeRole(role, name, gradFrom, gradTo, icon) {
      document.getElementById('modal-title').textContent = (isRu?'Кастомизировать: ':'Customize: ') + name;
      document.getElementById('m-role').value = role;
      document.getElementById('m-name-en').value = name;
      document.getElementById('m-instructions').value = '';
      document.getElementById('modal-error').style.display = 'none';
      document.getElementById('create-modal').style.display = 'flex';
    }

    function closeModal() { document.getElementById('create-modal').style.display = 'none'; }

    async function saveAgent() {
      const nameEn = document.getElementById('m-name-en').value.trim();
      const instructions = document.getElementById('m-instructions').value.trim();
      const errEl = document.getElementById('modal-error');
      errEl.style.display = 'none';

      if (!nameEn) { errEl.textContent = isRu?'Введите имя агента':'Enter agent name'; errEl.style.display=''; return; }
      if (!instructions) { errEl.textContent = isRu?'Введите инструкции':'Enter instructions'; errEl.style.display=''; return; }

      const btn = document.getElementById('save-btn');
      btn.textContent = isRu?'Создание...':'Creating...';
      btn.disabled = true;

      try {
        const res = await fetch('/api/meta/agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nameEn,
            nameRu: document.getElementById('m-name-ru').value.trim() || nameEn,
            role: document.getElementById('m-role').value,
            instructions,
            thinkingMode: document.getElementById('m-thinking').value,
            outputFormat: document.getElementById('m-output').value,
            maxTokens: parseInt(document.getElementById('m-tokens').value) || 2048,
            temperature: parseFloat(document.getElementById('m-temp').value) || 0.7,
          }),
        });
        const data = await res.json();
        if (!res.ok) { errEl.textContent = data.error || 'Failed'; errEl.style.display=''; return; }
        customAgents = [data, ...customAgents];
        renderCustomAgents();
        document.getElementById('stat-ready').textContent = customAgents.length;
        closeModal();
      } catch(e) {
        errEl.textContent = e.message || 'Network error'; errEl.style.display='';
      } finally {
        btn.textContent = isRu?'Создать':'Create'; btn.disabled = false;
      }
    }

    // ─── Filtering ──────────────────────────────────────────────────────────

    function filterAgents() {
      const q = document.getElementById('agent-search').value.toLowerCase();
      const customOnly = document.getElementById('show-custom-only').checked;

      document.getElementById('showcase-section').style.display = customOnly ? 'none' : '';

      document.querySelectorAll('.agent-card').forEach(el => {
        const nameMatch = !q || el.dataset.name.includes(q) || el.dataset.role.includes(q);
        const customMatch = !customOnly || el.dataset.custom === 'true';
        el.style.display = nameMatch && customMatch ? '' : 'none';
      });
    }

    function runBuiltinAgent(role) {
      window.location.href = '/meta?lang=${lang}';
    }

    // ─── Init ───────────────────────────────────────────────────────────────

    loadCustomAgents();

    document.getElementById('create-modal').addEventListener('click', e => {
      if (e.target === document.getElementById('create-modal')) closeModal();
    });
  </script>
</body>
</html>
`
}
