import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const scenariosPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'Сценарии' : 'Scenarios'
  const subtitle = isRu
    ? 'Готовые цепочки агентов для типовых бизнес-задач'
    : 'Ready-made agent chains for common business tasks'

  // Built-in showcase scenarios — rendered server-side as templates
  const SHOWCASE = [
    {
      id: 'tpl_leads',
      icon: 'fa-crosshairs', gradFrom: 'from-blue-600', gradTo: 'to-blue-800',
      tag: isRu ? 'Продажи' : 'Sales', tagColor: 'bg-blue-500/20 text-blue-300',
      nameEn: 'Lead Generation', nameRu: 'Поиск клиентов',
      descEn: 'Find companies in a niche, gather contacts, score leads, personalize messages, push to CRM.',
      descRu: 'Найти компании в нише, собрать контакты, оценить лиды, персонализировать сообщения, занести в CRM.',
      prompt: isRu
        ? 'Найди 30 потенциальных клиентов в нише B2B SaaS, собери контакты и ЛПР, оцени релевантность, подготовь персональные сообщения и занеси в таблицу'
        : 'Find 30 potential B2B SaaS clients, collect contacts and decision-makers, score relevance, prepare personalized messages and add to spreadsheet',
      steps: [
        { icon: 'fa-search',      agent: isRu?'Лид-исследователь':'Lead Researcher', action: isRu?'Поиск компаний':'Company search' },
        { icon: 'fa-address-book',agent: isRu?'Лид-исследователь':'Lead Researcher', action: isRu?'Сбор контактов':'Contact collection' },
        { icon: 'fa-star',        agent: isRu?'Аналитик':'Analyst',                  action: isRu?'Оценка лидов':'Lead scoring' },
        { icon: 'fa-pen',         agent: isRu?'Копирайтер':'Copywriter',             action: isRu?'Персональные сообщения':'Personalized messages' },
        { icon: 'fa-database',    agent: isRu?'CRM-агент':'CRM Agent',               action: isRu?'Запись в CRM':'Write to CRM', confirm: true },
      ],
      time: isRu?'~4 мин':'~4 min', cost: '~$0.18', runs: 127,
    },
    {
      id: 'tpl_proposal',
      icon: 'fa-file-contract', gradFrom: 'from-violet-600', gradTo: 'to-violet-800',
      tag: isRu ? 'Продажи' : 'Sales', tagColor: 'bg-violet-500/20 text-violet-300',
      nameEn: 'Proposal Preparation', nameRu: 'Подготовка КП',
      descEn: 'Analyze client needs, find matching cases, build proposal structure, write copy, quality-check.',
      descRu: 'Анализ потребностей клиента, подбор кейсов, структура КП, написание текста, контроль качества.',
      prompt: isRu
        ? 'Подготовь персональное коммерческое предложение для клиента: проанализируй потребности, найди релевантные кейсы, составь структуру и напиши текст КП'
        : 'Prepare a personalized commercial proposal for a client: analyze needs, find relevant cases, build structure and write the proposal copy',
      steps: [
        { icon: 'fa-user-circle', agent: isRu?'Аналитик':'Analyst',    action: isRu?'Анализ клиента':'Client analysis' },
        { icon: 'fa-book',        agent: isRu?'Аналитик':'Analyst',    action: isRu?'Поиск кейсов':'Find cases' },
        { icon: 'fa-pen-nib',     agent: isRu?'Копирайтер':'Copywriter',action: isRu?'Текст КП':'Proposal copy' },
        { icon: 'fa-check-double',agent: isRu?'Контролёр':'QC',        action: isRu?'Проверка полноты':'Completeness check' },
        { icon: 'fa-envelope',    agent: isRu?'CRM-агент':'CRM Agent', action: isRu?'Отправка клиенту':'Send to client', confirm: true },
      ],
      time: isRu?'~5 мин':'~5 min', cost: '~$0.20', runs: 89,
    },
    {
      id: 'tpl_market',
      icon: 'fa-chart-pie', gradFrom: 'from-cyan-600', gradTo: 'to-cyan-800',
      tag: isRu ? 'Аналитика' : 'Analytics', tagColor: 'bg-cyan-500/20 text-cyan-300',
      nameEn: 'Market Analysis', nameRu: 'Анализ рынка',
      descEn: 'Gather sources, extract key figures, check facts, prepare analytical overview with structure.',
      descRu: 'Сбор источников, извлечение ключевых цифр, проверка фактов, аналитический обзор со структурой.',
      prompt: isRu
        ? 'Сделай конкурентный анализ рынка: собери источники, извлеки ключевые цифры и тренды, проверь факты, подготовь структурированный аналитический обзор'
        : 'Do a competitive market analysis: gather sources, extract key figures and trends, verify facts, prepare a structured analytical overview',
      steps: [
        { icon: 'fa-globe',    agent: isRu?'Аналитик':'Analyst', action: isRu?'Сбор источников':'Source collection' },
        { icon: 'fa-table',    agent: isRu?'Аналитик':'Analyst', action: isRu?'Извлечение данных':'Data extraction' },
        { icon: 'fa-check',    agent: isRu?'Контролёр':'QC',     action: isRu?'Проверка фактов':'Fact check' },
        { icon: 'fa-file-alt', agent: isRu?'Копирайтер':'Copywriter', action: isRu?'Подготовка обзора':'Prepare overview' },
      ],
      time: isRu?'~3 мин':'~3 min', cost: '~$0.12', runs: 203,
    },
    {
      id: 'tpl_content',
      icon: 'fa-calendar-alt', gradFrom: 'from-pink-600', gradTo: 'to-pink-800',
      tag: isRu ? 'Маркетинг' : 'Marketing', tagColor: 'bg-pink-500/20 text-pink-300',
      nameEn: 'Content Machine', nameRu: 'Контент-машина',
      descEn: 'Select topics, validate with facts, write posts in brand style, edit, schedule for publishing.',
      descRu: 'Подбор тем, проверка фактуры, написание постов в стиле бренда, редактура, расписание публикаций.',
      prompt: isRu
        ? 'Составь контент-план на месяц для Telegram-канала про ИИ в бизнесе: подбери актуальные темы, напиши посты в стиле канала, проверь качество и подготовь расписание'
        : 'Create a month-long content plan for a Telegram channel about AI in business: select relevant topics, write posts in channel style, check quality and prepare the schedule',
      steps: [
        { icon: 'fa-hashtag', agent: isRu?'Маркетолог':'Marketer',   action: isRu?'Подбор тем':'Topic selection' },
        { icon: 'fa-pen-nib', agent: isRu?'Копирайтер':'Copywriter', action: isRu?'Написание постов':'Write posts' },
        { icon: 'fa-edit',    agent: isRu?'Контролёр':'QC',          action: isRu?'Редактура стиля':'Style editing' },
        { icon: 'fa-calendar',agent: isRu?'CRM-агент':'CRM Agent',   action: isRu?'Публикация по расписанию':'Schedule publishing', confirm: true },
      ],
      time: isRu?'~4 мин':'~4 min', cost: '~$0.14', runs: 156,
    },
    {
      id: 'tpl_radar',
      icon: 'fa-satellite-dish', gradFrom: 'from-orange-600', gradTo: 'to-orange-800',
      tag: isRu ? 'Разведка' : 'Intelligence', tagColor: 'bg-orange-500/20 text-orange-300',
      nameEn: 'Business Radar', nameRu: 'Бизнес-радар',
      descEn: 'Monitor news, competitors, price changes, new products, and regulatory updates. Deliver digest.',
      descRu: 'Мониторинг новостей, конкурентов, изменений цен, новых продуктов и регуляторики. Дайджест.',
      prompt: isRu
        ? 'Мониторинг рынка: собери последние новости о конкурентах и трендах в нашей нише, отфильтруй самые важные, оцени приоритет и подготовь дайджест'
        : 'Market monitoring: gather latest news about competitors and trends in our niche, filter the most important ones, score priority and prepare a digest',
      steps: [
        { icon: 'fa-rss',         agent: isRu?'Бизнес-радар':'Biz Radar', action: isRu?'Сбор сигналов':'Signal collection' },
        { icon: 'fa-filter',      agent: isRu?'Аналитик':'Analyst',       action: isRu?'Фильтрация и группировка':'Filter & group' },
        { icon: 'fa-comment',     agent: isRu?'Аналитик':'Analyst',       action: isRu?'Оценка важности':'Importance scoring' },
        { icon: 'fa-paper-plane', agent: isRu?'CRM-агент':'CRM Agent',    action: isRu?'Отправка дайджеста':'Send digest', confirm: true },
      ],
      time: isRu?'~2 мин':'~2 min', cost: '~$0.06', runs: 312,
    },
    {
      id: 'tpl_launch',
      icon: 'fa-rocket', gradFrom: 'from-green-600', gradTo: 'to-green-800',
      tag: isRu ? 'Операции' : 'Operations', tagColor: 'bg-green-500/20 text-green-300',
      nameEn: 'Service Launch', nameRu: 'Запуск услуги',
      descEn: 'Full cycle: market analysis, offer creation, lead generation, proposals, outreach, CRM setup.',
      descRu: 'Полный цикл: анализ рынка, создание оффера, лидогенерация, КП, рассылка, настройка CRM.',
      prompt: isRu
        ? 'Помоги запустить новую услугу: проанализируй рынок и ЦА, создай оффер и описание, найди первых потенциальных клиентов, подготовь персональные КП и занеси всё в CRM'
        : 'Help launch a new service: analyze market and audience, create the offer and description, find first potential clients, prepare personalized proposals and add everything to CRM',
      steps: [
        { icon: 'fa-search',   agent: isRu?'Аналитик':'Analyst',              action: isRu?'Анализ рынка и ЦА':'Market & audience analysis' },
        { icon: 'fa-star',     agent: isRu?'Маркетолог':'Marketer',           action: isRu?'Оффер и описание':'Offer & description' },
        { icon: 'fa-users',    agent: isRu?'Лид-исследователь':'Lead Researcher', action: isRu?'База первых клиентов':'First client base' },
        { icon: 'fa-file-alt', agent: isRu?'Копирайтер':'Copywriter',         action: isRu?'Персональные КП':'Personal proposals' },
        { icon: 'fa-database', agent: isRu?'CRM-агент':'CRM Agent',           action: isRu?'Настройка CRM':'CRM setup', confirm: true },
      ],
      time: isRu?'~6 мин':'~6 min', cost: '~$0.28', runs: 44,
    },
  ]

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, subtitle, lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('scenarios', lang)}

  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6">

      <!-- Header -->
      <div class="mb-6 flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center">
              <i class="fas fa-layer-group text-white text-sm"></i>
            </div>
            <h1 class="text-2xl font-bold">${title}</h1>
          </div>
          <p class="text-gray-400 ml-12">${subtitle}</p>
        </div>
        <div class="flex items-center gap-3">
          <span id="db-count" class="text-sm text-gray-500"></span>
          <button onclick="showCreateModal()"
            class="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <i class="fas fa-plus"></i>
            ${isRu ? 'Создать сценарий' : 'Create scenario'}
          </button>
        </div>
      </div>

      <!-- Category filter tabs -->
      <div class="flex flex-wrap gap-2 mb-6">
        ${[
          ['', isRu ? 'Все' : 'All'],
          ['Sales', isRu ? 'Продажи' : 'Sales'],
          ['Analytics', isRu ? 'Аналитика' : 'Analytics'],
          ['Marketing', isRu ? 'Маркетинг' : 'Marketing'],
          ['Intelligence', isRu ? 'Разведка' : 'Intelligence'],
          ['Operations', isRu ? 'Операции' : 'Operations'],
        ].map(([val, label]) => `
          <button onclick="filterCategory('${val}')"
            class="tag-btn text-xs px-3 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition"
            data-cat="${val}">
            ${label}
          </button>
        `).join('')}
      </div>

      <!-- Saved (DB) scenarios section -->
      <div id="saved-section" style="display:none;" class="mb-8">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <i class="fas fa-bookmark text-green-400"></i>
          ${isRu ? 'Сохранённые сценарии' : 'Saved scenarios'}
        </h2>
        <div id="saved-grid" class="grid grid-cols-1 lg:grid-cols-2 gap-5"></div>
      </div>

      <!-- Built-in templates -->
      <div id="showcase-section">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <i class="fas fa-layer-group text-teal-400"></i>
          ${isRu ? 'Встроенные шаблоны' : 'Built-in templates'}
        </h2>
        <div id="scenarios-grid" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          ${SHOWCASE.map(s => `
            <div class="scenario-card glass rounded-xl overflow-hidden hover:border-gray-600 transition" data-tag="${s.tag}">
              <div class="p-5">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradFrom} ${s.gradTo} flex items-center justify-center shadow-lg">
                      <i class="fas ${s.icon} text-white text-base"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <p class="font-semibold">${isRu ? s.nameRu : s.nameEn}</p>
                        <span class="text-xs px-2 py-0.5 rounded-full ${s.tagColor}">${s.tag}</span>
                      </div>
                      <div class="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                        <span><i class="fas fa-clock mr-1"></i>${s.time}</span>
                        <span><i class="fas fa-dollar-sign mr-1"></i>${s.cost.replace('~$','')}</span>
                        <span><i class="fas fa-play-circle mr-1"></i>${s.runs} ${isRu?'запусков':'runs'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p class="text-sm text-gray-400 mb-4 leading-relaxed">${isRu ? s.descRu : s.descEn}</p>

                <!-- Steps chain -->
                <div class="flex items-center gap-1 flex-wrap mb-4">
                  ${s.steps.map((step, i) => `
                    <div class="flex items-center gap-1">
                      <div title="${step.agent}: ${step.action}"
                        class="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg bg-gray-800 ${step.confirm ? 'border border-yellow-500/30 text-yellow-300' : 'text-gray-300'}">
                        <i class="fas ${step.icon} text-xs"></i>
                        <span class="hidden sm:inline">${step.action}</span>
                      </div>
                      ${i < s.steps.length - 1 ? '<i class="fas fa-chevron-right text-gray-700 text-xs"></i>' : ''}
                    </div>
                  `).join('')}
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-500">${isRu ? 'шаблон' : 'template'}</span>
                  <div class="flex gap-2">
                    <button onclick="saveScenarioTemplate('${s.id}')"
                      class="text-xs px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition flex items-center gap-1">
                      <i class="fas fa-bookmark text-xs"></i>
                      ${isRu ? 'Сохранить' : 'Save'}
                    </button>
                    <button onclick="launchTemplate('${s.prompt.replace(/'/g, "\\'")}')"
                      class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                      <i class="fas fa-play text-xs"></i>
                      ${isRu ? 'Запустить' : 'Launch'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </main>

  <!-- Run result modal -->
  <div id="run-modal" style="display:none;"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold flex items-center gap-2">
          <i id="run-icon" class="fas fa-spinner fa-spin text-blue-400"></i>
          <span id="run-title">${isRu ? 'Выполнение...' : 'Running...'}</span>
        </h3>
        <button onclick="document.getElementById('run-modal').style.display='none'" class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div id="run-steps" class="space-y-2 mb-4"></div>
      <div id="run-result" style="display:none;" class="mt-3 p-3 bg-gray-800/40 rounded-lg">
        <p class="text-xs text-gray-500 mb-1">${isRu ? 'Результат' : 'Result'}</p>
        <p id="run-result-text" class="text-sm text-gray-300"></p>
      </div>
      <div id="run-error" style="display:none;" class="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3"></div>
    </div>
  </div>

  <!-- Create scenario modal -->
  <div id="create-modal" style="display:none;"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-lg font-semibold">${isRu ? 'Создать сценарий' : 'Create scenario'}</h3>
        <button onclick="document.getElementById('create-modal').style.display='none'" class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Название' : 'Name'} *</label>
          <input id="sc-name" type="text" placeholder="${isRu ? 'Мой сценарий' : 'My scenario'}"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500">
        </div>
        <div>
          <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Описание' : 'Description'}</label>
          <textarea id="sc-desc" rows="3"
            placeholder="${isRu ? 'Что делает этот сценарий...' : 'What this scenario does...'}"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500 resize-none"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Категория' : 'Category'}</label>
            <select id="sc-cat"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500">
              <option value="sales">${isRu ? 'Продажи' : 'Sales'}</option>
              <option value="analytics">${isRu ? 'Аналитика' : 'Analytics'}</option>
              <option value="marketing">${isRu ? 'Маркетинг' : 'Marketing'}</option>
              <option value="intelligence">${isRu ? 'Разведка' : 'Intelligence'}</option>
              <option value="operations">${isRu ? 'Операции' : 'Operations'}</option>
              <option value="custom">${isRu ? 'Кастомный' : 'Custom'}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Стратегия' : 'Strategy'}</label>
            <select id="sc-strategy"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500">
              <option value="RELAY">RELAY</option>
              <option value="SINGLE">SINGLE</option>
              <option value="PARALLEL">PARALLEL</option>
              <option value="VERIFIED">VERIFIED</option>
              <option value="PLANNER">PLANNER</option>
            </select>
          </div>
        </div>
        <div class="bg-gray-800/40 rounded-lg p-3 text-xs text-gray-500">
          <i class="fas fa-info-circle mr-1 text-blue-400"></i>
          ${isRu
            ? 'Шаги сценария можно добавить через API или сгенерировать автоматически в Мета-Оркестраторе'
            : 'Scenario steps can be added via API or auto-generated by the Meta-Orchestrator'}
        </div>
      </div>
      <div id="create-error" style="display:none;"
        class="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-2"></div>
      <div class="flex gap-3 mt-5">
        <button onclick="document.getElementById('create-modal').style.display='none'"
          class="flex-1 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white text-sm transition">
          ${isRu ? 'Отмена' : 'Cancel'}
        </button>
        <button id="create-save-btn" onclick="createScenario()"
          class="flex-1 py-2 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm font-medium">
          ${isRu ? 'Создать' : 'Create'}
        </button>
      </div>
    </div>
  </div>

  <script>
    const isRu = ${isRu};
    const lang = '${lang}';
    let savedScenarios = [];

    // ─── Templates (built-in) ───────────────────────────────────────────────

    function launchTemplate(prompt) {
      const encoded = encodeURIComponent(prompt);
      window.location.href = '/meta?lang=' + lang + '&task=' + encoded;
    }

    async function saveScenarioTemplate(tplId) {
      // Templates don't have real steps yet — just create the header
      const tpl = ${JSON.stringify(SHOWCASE.map(s => ({ id: s.id, nameEn: s.nameEn, nameRu: s.nameRu })))}.find(t => t.id === tplId);
      if (!tpl) return;
      const name = isRu ? tpl.nameRu : tpl.nameEn;
      try {
        const res = await fetch('/api/meta/scenarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description: '', category: 'custom', strategy: 'RELAY', steps: [] }),
        });
        if (res.ok) {
          alert((isRu ? 'Сценарий сохранён: ' : 'Scenario saved: ') + name);
          loadSavedScenarios();
        }
      } catch(e) { alert(e.message); }
    }

    // ─── Saved scenarios (DB) ───────────────────────────────────────────────

    async function loadSavedScenarios() {
      try {
        const res = await fetch('/api/meta/scenarios');
        if (!res.ok) return;
        const data = await res.json();
        savedScenarios = data.scenarios || [];
        renderSavedScenarios();
        if (savedScenarios.length) {
          document.getElementById('db-count').textContent =
            savedScenarios.length + ' ' + (isRu?'сохранённых':'saved');
        }
      } catch { /* silent */ }
    }

    function renderSavedScenarios() {
      const section = document.getElementById('saved-section');
      const grid = document.getElementById('saved-grid');
      if (!savedScenarios.length) { section.style.display = 'none'; return; }
      section.style.display = '';

      grid.innerHTML = savedScenarios.map(s => \`
        <div class="scenario-card glass rounded-xl overflow-hidden hover:border-green-500/30 transition" data-tag="\${s.category}">
          <div class="p-5">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center shadow-lg">
                  <i class="fas fa-layer-group text-white text-base"></i>
                </div>
                <div>
                  <p class="font-semibold">\${s.name}</p>
                  <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span>\${s.strategy}</span>
                    <span>·</span>
                    <span><i class="fas fa-play-circle mr-1"></i>\${s.runCount} ${isRu?'запусков':'runs'}</span>
                  </div>
                </div>
              </div>
              <span class="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">${isRu ? 'сохранён' : 'saved'}</span>
            </div>

            \${s.description ? '<p class="text-sm text-gray-400 mb-3">' + escHtml(s.description) + '</p>' : ''}

            \${s.steps.length ? \`
              <div class="flex items-center gap-1 flex-wrap mb-3">
                \${s.steps.slice(0,5).map((st, i) => \`
                  <div class="flex items-center gap-1">
                    <span class="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400">\${st.agentRole.replace(/_/g,' ')}</span>
                    \${i < Math.min(s.steps.length,5)-1 ? '<i class="fas fa-chevron-right text-gray-700 text-xs"></i>' : ''}
                  </div>
                \`).join('')}
                \${s.steps.length > 5 ? '<span class="text-xs text-gray-600">+' + (s.steps.length-5) + '</span>' : ''}
              </div>
            \` : '<p class="text-xs text-gray-600 mb-3 italic">${isRu ? 'Шаги не добавлены' : 'No steps added'}</p>'}

            <div class="flex items-center justify-between">
              <button onclick="deleteScenario('\${s.id}')"
                class="text-xs text-red-400 hover:text-red-300">
                <i class="fas fa-trash mr-1"></i>${isRu ? 'Удалить' : 'Delete'}
              </button>
              <button onclick="runSavedScenario('\${s.id}', '\${escHtml(s.name)}')"
                class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                <i class="fas fa-play text-xs"></i>
                ${isRu ? 'Запустить' : 'Launch'}
              </button>
            </div>
          </div>
        </div>
      \`).join('');
    }

    async function runSavedScenario(id, name) {
      document.getElementById('run-title').textContent = (isRu?'Выполнение: ':'Running: ') + name;
      document.getElementById('run-icon').className = 'fas fa-spinner fa-spin text-blue-400';
      document.getElementById('run-steps').innerHTML = '';
      document.getElementById('run-result').style.display = 'none';
      document.getElementById('run-error').style.display = 'none';
      document.getElementById('run-modal').style.display = 'flex';

      try {
        const res = await fetch('/api/meta/scenarios/' + id + '/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: '', userId: 'user' }),
        });
        const data = await res.json();

        if (!res.ok) {
          document.getElementById('run-error').textContent = data.error || 'Run failed';
          document.getElementById('run-error').style.display = '';
          document.getElementById('run-icon').className = 'fas fa-times-circle text-red-400';
          return;
        }

        // Render steps
        document.getElementById('run-steps').innerHTML = (data.steps || []).map(s => \`
          <div class="flex items-center gap-3 p-2 rounded-lg bg-gray-800/40">
            <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
              \${s.status==='success'?'<i class="fas fa-check text-green-400 text-xs"></i>':
                s.status==='pending_confirmation'?'<i class="fas fa-shield-alt text-yellow-400 text-xs"></i>':
                s.status==='cancelled'?'<i class="fas fa-ban text-gray-500 text-xs"></i>':
                '<i class="fas fa-times text-red-400 text-xs"></i>'}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-gray-500">\${s.agentRole.replace(/_/g,' ')}</p>
              <p class="text-sm text-gray-300 truncate">\${s.action}</p>
            </div>
            <span class="text-xs \${s.status==='success'?'text-green-400':s.status==='pending_confirmation'?'text-yellow-400':'text-gray-500'}">
              \${s.status}
            </span>
          </div>
        \`).join('');

        const icon = document.getElementById('run-icon');
        if (data.status === 'completed') {
          icon.className = 'fas fa-check-circle text-green-400';
          document.getElementById('run-title').textContent = isRu?'Завершено: ':'Completed: ';
        } else if (data.status === 'paused') {
          icon.className = 'fas fa-pause-circle text-yellow-400';
          document.getElementById('run-title').textContent = isRu?'Ожидание подтверждения':'Awaiting confirmation';
        }

        loadSavedScenarios(); // refresh run count
      } catch(e) {
        document.getElementById('run-error').textContent = e.message || 'Network error';
        document.getElementById('run-error').style.display = '';
      }
    }

    async function deleteScenario(id) {
      if (!confirm(isRu?'Удалить сценарий?':'Delete this scenario?')) return;
      try {
        const res = await fetch('/api/meta/scenarios/' + id, { method: 'DELETE' });
        if (res.ok) {
          savedScenarios = savedScenarios.filter(s => s.id !== id);
          renderSavedScenarios();
        }
      } catch(e) { alert(e.message); }
    }

    // ─── Create scenario ────────────────────────────────────────────────────

    function showCreateModal() {
      document.getElementById('create-error').style.display = 'none';
      document.getElementById('sc-name').value = '';
      document.getElementById('sc-desc').value = '';
      document.getElementById('create-modal').style.display = 'flex';
    }

    async function createScenario() {
      const name = document.getElementById('sc-name').value.trim();
      const errEl = document.getElementById('create-error');
      if (!name) { errEl.textContent = isRu?'Введите название':'Enter name'; errEl.style.display=''; return; }

      const btn = document.getElementById('create-save-btn');
      btn.textContent = isRu?'Создание...':'Creating...'; btn.disabled = true;
      errEl.style.display = 'none';

      try {
        const res = await fetch('/api/meta/scenarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            description: document.getElementById('sc-desc').value.trim(),
            category: document.getElementById('sc-cat').value,
            strategy: document.getElementById('sc-strategy').value,
            steps: [],
          }),
        });
        const data = await res.json();
        if (!res.ok) { errEl.textContent = data.error || 'Failed'; errEl.style.display=''; return; }
        savedScenarios = [data, ...savedScenarios];
        renderSavedScenarios();
        document.getElementById('create-modal').style.display = 'none';
        document.getElementById('db-count').textContent =
          savedScenarios.length + ' ' + (isRu?'сохранённых':'saved');
      } catch(e) {
        errEl.textContent = e.message || 'Network error'; errEl.style.display='';
      } finally {
        btn.textContent = isRu?'Создать':'Create'; btn.disabled = false;
      }
    }

    // ─── Category filter ────────────────────────────────────────────────────

    function filterCategory(cat) {
      document.querySelectorAll('.tag-btn').forEach(b => {
        b.classList.toggle('bg-gray-700', b.dataset.cat === cat);
        b.classList.toggle('text-white', b.dataset.cat === cat);
      });
      document.querySelectorAll('.scenario-card').forEach(card => {
        card.style.display = !cat || card.dataset.tag === cat ||
          card.dataset.tag.toLowerCase() === cat.toLowerCase() ? '' : 'none';
      });
    }

    function escHtml(s) {
      return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    // ─── Init ───────────────────────────────────────────────────────────────

    document.querySelector('[data-cat=""]').classList.add('bg-gray-700', 'text-white');
    loadSavedScenarios();

    // Pre-fill task if redirected from a template
    const urlTask = new URLSearchParams(location.search).get('task');
    if (urlTask) {
      // We're here via the meta page redirect — nothing to do on scenarios page
    }
  </script>
</body>
</html>
`
}
