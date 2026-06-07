import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const scenariosPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'Сценарии' : 'Scenarios'
  const subtitle = isRu
    ? 'Готовые цепочки агентов для научно-исследовательских задач'
    : 'Ready-made agent chains for scientific research workflows'

  // Built-in showcase scenarios — rendered server-side as templates
  const SHOWCASE = [
    {
      id: 'tpl_lit_review',
      icon: 'fa-book-open', gradFrom: 'from-blue-600', gradTo: 'to-blue-800',
      tag: isRu ? 'Обзор' : 'Review', tagColor: 'bg-blue-500/20 text-blue-300',
      nameEn: 'Systematic Literature Review', nameRu: 'Систематический обзор литературы',
      descEn: 'Search databases, screen abstracts, assess full texts, extract data, synthesise findings following PRISMA guidelines.',
      descRu: 'Поиск по базам данных, скрининг аннотаций, оценка полных текстов, извлечение данных, синтез результатов по PRISMA.',
      prompt: isRu
        ? 'Проведи систематический обзор литературы по теме LLM-агентов: найди ключевые работы, отбери релевантные, извлеки данные, синтезируй результаты и выдели пробелы в исследованиях'
        : 'Conduct a systematic literature review on LLM agents: find key papers, screen for relevance, extract data, synthesise results and identify research gaps',
      steps: [
        { icon: 'fa-search',    agent: isRu?'Лит. обзор':'Lit. Researcher', action: isRu?'Поиск по базам':'Database search' },
        { icon: 'fa-filter',    agent: isRu?'Лит. обзор':'Lit. Researcher', action: isRu?'Скрининг аннотаций':'Abstract screening' },
        { icon: 'fa-microscope',agent: isRu?'Рецензент':'Peer Reviewer',    action: isRu?'Оценка полных текстов':'Full-text assessment' },
        { icon: 'fa-table',     agent: isRu?'Учёный':'Researcher',          action: isRu?'Извлечение данных':'Data extraction' },
        { icon: 'fa-file-alt',  agent: isRu?'Учёный':'Researcher',          action: isRu?'Синтез и отчёт':'Synthesis & report' },
      ],
      time: isRu?'~5 мин':'~5 min', cost: '~$0.22', runs: 84,
    },
    {
      id: 'tpl_clinical',
      icon: 'fa-stethoscope', gradFrom: 'from-rose-600', gradTo: 'to-rose-800',
      tag: isRu ? 'Медицина' : 'Medicine', tagColor: 'bg-rose-500/20 text-rose-300',
      nameEn: 'Clinical Study Design', nameRu: 'Дизайн клинического исследования',
      descEn: 'Define PICO, review prior evidence, design protocol, run power analysis, check ethics requirements.',
      descRu: 'Определить PICO, обзор доказательств, протокол исследования, анализ мощности, этическая проверка.',
      prompt: isRu
        ? 'Разработай дизайн клинического исследования: сформулируй PICO-вопрос, сделай обзор доказательств, опиши протокол, рассчитай объём выборки и проверь этические требования'
        : 'Design a clinical study: formulate the PICO question, review prior evidence, describe the protocol, calculate sample size and check ethics requirements',
      steps: [
        { icon: 'fa-question-circle', agent: isRu?'Учёный':'Researcher',        action: isRu?'Формулировка PICO':'PICO formulation' },
        { icon: 'fa-book-open',       agent: isRu?'Лит. обзор':'Lit. Researcher', action: isRu?'Обзор доказательств':'Evidence review' },
        { icon: 'fa-vials',           agent: isRu?'Методолог':'Exp. Designer',  action: isRu?'Протокол исследования':'Study protocol' },
        { icon: 'fa-calculator',      agent: isRu?'Аналитик':'Data Scientist',  action: isRu?'Анализ мощности':'Power analysis' },
        { icon: 'fa-shield-alt',      agent: isRu?'Рецензент':'Peer Reviewer',  action: isRu?'Этическая проверка':'Ethics checklist', confirm: true },
      ],
      time: isRu?'~6 мин':'~6 min', cost: '~$0.25', runs: 51,
    },
    {
      id: 'tpl_data_pipeline',
      icon: 'fa-chart-area', gradFrom: 'from-cyan-600', gradTo: 'to-cyan-800',
      tag: isRu ? 'Данные' : 'Data Science', tagColor: 'bg-cyan-500/20 text-cyan-300',
      nameEn: 'Data Analysis Pipeline', nameRu: 'Пайплайн анализа данных',
      descEn: 'Load and validate data, run exploratory analysis, engineer features, train a model, interpret and report results.',
      descRu: 'Загрузка и валидация данных, разведочный анализ, инжиниринг признаков, обучение модели, интерпретация.',
      prompt: isRu
        ? 'Построй пайплайн анализа данных: загрузи и провалидируй датасет, проведи EDA, подготовь признаки, обучи модель и интерпретируй результаты'
        : 'Build a data analysis pipeline: load and validate the dataset, run EDA, engineer features, train a model and interpret results',
      steps: [
        { icon: 'fa-database', agent: isRu?'Аналитик':'Data Scientist', action: isRu?'Загрузка и валидация':'Load & validate' },
        { icon: 'fa-eye',      agent: isRu?'Аналитик':'Data Scientist', action: isRu?'Разведочный анализ':'Exploratory analysis' },
        { icon: 'fa-wrench',   agent: isRu?'ML-инженер':'ML Engineer',  action: isRu?'Инжиниринг признаков':'Feature engineering' },
        { icon: 'fa-brain',    agent: isRu?'ML-инженер':'ML Engineer',  action: isRu?'Обучение модели':'Model training' },
        { icon: 'fa-file-alt', agent: isRu?'Учёный':'Researcher',       action: isRu?'Интерпретация':'Interpretation' },
      ],
      time: isRu?'~4 мин':'~4 min', cost: '~$0.18', runs: 137,
    },
    {
      id: 'tpl_hypothesis',
      icon: 'fa-lightbulb', gradFrom: 'from-violet-600', gradTo: 'to-violet-800',
      tag: isRu ? 'Методология' : 'Methodology', tagColor: 'bg-violet-500/20 text-violet-300',
      nameEn: 'Hypothesis Validation Chain', nameRu: 'Цепочка валидации гипотез',
      descEn: 'Formalise hypotheses, scan prior literature, design test, run analysis, collect peer critique.',
      descRu: 'Формализация гипотез, поиск литературы, дизайн теста, запуск анализа, рецензирование.',
      prompt: isRu
        ? 'Проведи цепочку валидации гипотезы: формализуй гипотезу, проверь литературу, спроектируй тест, проведи анализ и получи критику рецензента'
        : 'Run a hypothesis validation chain: formalise the hypothesis, scan literature, design the test, run analysis and get peer critique',
      steps: [
        { icon: 'fa-flask',      agent: isRu?'Учёный':'Researcher',          action: isRu?'Формализация гипотез':'Formalise hypotheses' },
        { icon: 'fa-book-open',  agent: isRu?'Лит. обзор':'Lit. Researcher', action: isRu?'Поиск литературы':'Literature scan' },
        { icon: 'fa-vials',      agent: isRu?'Методолог':'Exp. Designer',    action: isRu?'Дизайн теста':'Test design' },
        { icon: 'fa-chart-bar',  agent: isRu?'Аналитик':'Data Scientist',    action: isRu?'Анализ результатов':'Run analysis' },
        { icon: 'fa-microscope', agent: isRu?'Рецензент':'Peer Reviewer',    action: isRu?'Рецензия':'Peer critique' },
      ],
      time: isRu?'~5 мин':'~5 min', cost: '~$0.20', runs: 98,
    },
    {
      id: 'tpl_patent',
      icon: 'fa-certificate', gradFrom: 'from-amber-600', gradTo: 'to-amber-800',
      tag: isRu ? 'Инженерия' : 'Engineering', tagColor: 'bg-amber-500/20 text-amber-300',
      nameEn: 'Patent & Prior Art Search', nameRu: 'Патентный поиск и анализ новизны',
      descEn: 'Identify key concepts, search patent databases and academic literature, assess novelty, draft a prior-art summary.',
      descRu: 'Ключевые концепции, поиск по базам патентов и литературе, оценка новизны, патентный реферат.',
      prompt: isRu
        ? 'Проведи патентный поиск и анализ новизны: определи ключевые концепции, поищи по базам патентов и научным статьям, оцени новизну и подготовь реферат'
        : 'Conduct a patent and prior art search: identify key concepts, search patent databases and academic literature, assess novelty and draft a prior-art summary',
      steps: [
        { icon: 'fa-tags',        agent: isRu?'Учёный':'Researcher',          action: isRu?'Ключевые концепции':'Key concepts' },
        { icon: 'fa-search',      agent: isRu?'Лит. обзор':'Lit. Researcher', action: isRu?'Поиск патентов':'Patent search' },
        { icon: 'fa-book',        agent: isRu?'Лит. обзор':'Lit. Researcher', action: isRu?'Поиск литературы':'Academic search' },
        { icon: 'fa-check-circle',agent: isRu?'Рецензент':'Peer Reviewer',    action: isRu?'Оценка новизны':'Novelty assessment' },
        { icon: 'fa-file-alt',    agent: isRu?'Учёный':'Researcher',          action: isRu?'Патентный реферат':'Prior-art summary' },
      ],
      time: isRu?'~4 мин':'~4 min', cost: '~$0.15', runs: 62,
    },
    {
      id: 'tpl_replication',
      icon: 'fa-clone', gradFrom: 'from-emerald-600', gradTo: 'to-emerald-800',
      tag: isRu ? 'Воспроизводимость' : 'Reproducibility', tagColor: 'bg-emerald-500/20 text-emerald-300',
      nameEn: 'Experimental Replication Check', nameRu: 'Проверка воспроизводимости',
      descEn: 'Locate original study, replicate methodology, compare results, evaluate reproducibility, document deviations.',
      descRu: 'Найти оригинальное исследование, воспроизвести методологию, сравнить результаты, задокументировать отклонения.',
      prompt: isRu
        ? 'Проверь воспроизводимость исследования: найди оригинальную статью, воспроизведи методологию, сравни результаты и задокументируй отклонения'
        : 'Check experimental reproducibility: locate the original study, replicate the methodology, compare results and document any deviations',
      steps: [
        { icon: 'fa-search',      agent: isRu?'Лит. обзор':'Lit. Researcher', action: isRu?'Оригинальная статья':'Original study' },
        { icon: 'fa-copy',        agent: isRu?'Методолог':'Exp. Designer',    action: isRu?'Репликация методологии':'Replicate method' },
        { icon: 'fa-chart-bar',   agent: isRu?'Аналитик':'Data Scientist',    action: isRu?'Сравнение результатов':'Compare results' },
        { icon: 'fa-check-double',agent: isRu?'Рецензент':'Peer Reviewer',    action: isRu?'Оценка воспроизводимости':'Reproducibility' },
        { icon: 'fa-file-alt',    agent: isRu?'Учёный':'Researcher',          action: isRu?'Документирование':'Document deviations' },
      ],
      time: isRu?'~5 мин':'~5 min', cost: '~$0.20', runs: 39,
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

  <main class="ml-56 pt-4 min-h-screen">
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
          ['Review', isRu ? 'Обзор' : 'Review'],
          ['Medicine', isRu ? 'Медицина' : 'Medicine'],
          ['Data Science', isRu ? 'Данные' : 'Data Science'],
          ['Methodology', isRu ? 'Методология' : 'Methodology'],
          ['Engineering', isRu ? 'Инженерия' : 'Engineering'],
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
              <option value="review">${isRu ? 'Обзор' : 'Review'}</option>
              <option value="medicine">${isRu ? 'Медицина' : 'Medicine'}</option>
              <option value="data_science">${isRu ? 'Данные' : 'Data Science'}</option>
              <option value="methodology">${isRu ? 'Методология' : 'Methodology'}</option>
              <option value="engineering">${isRu ? 'Инженерия' : 'Engineering'}</option>
              <option value="reproducibility">${isRu ? 'Воспроизводимость' : 'Reproducibility'}</option>
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
