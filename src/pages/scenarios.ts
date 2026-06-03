import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const scenariosPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'Сценарии' : 'Scenarios'
  const subtitle = isRu
    ? 'Готовые цепочки агентов для типовых бизнес-задач'
    : 'Ready-made agent chains for common business tasks'

  const SCENARIOS = [
    {
      icon: 'fa-crosshairs', gradFrom: 'from-blue-600', gradTo: 'to-blue-800',
      tag: isRu ? 'Продажи' : 'Sales', tagColor: 'bg-blue-500/20 text-blue-300',
      nameEn: 'Lead Generation', nameRu: 'Поиск клиентов',
      descEn: 'Find companies in a niche, gather contacts, score leads, personalize messages, push to CRM.',
      descRu: 'Найти компании в нише, собрать контакты, оценить лиды, персонализировать сообщения, занести в CRM.',
      steps: [
        { icon: 'fa-search',   agent: isRu?'Лид-исследователь':'Lead Researcher', action: isRu?'Поиск компаний':'Company search' },
        { icon: 'fa-address-book', agent: isRu?'Лид-исследователь':'Lead Researcher', action: isRu?'Сбор контактов':'Contact collection' },
        { icon: 'fa-star',     agent: isRu?'Аналитик':'Analyst',    action: isRu?'Оценка лидов':'Lead scoring' },
        { icon: 'fa-pen',      agent: isRu?'Копирайтер':'Copywriter',    action: isRu?'Персональные сообщения':'Personalized messages' },
        { icon: 'fa-database', agent: isRu?'CRM-агент':'CRM Agent',    action: isRu?'Запись в CRM':'Write to CRM', confirm: true },
      ],
      time: isRu?'~4 мин':'~4 min', cost: '~$0.18', runs: 127,
    },
    {
      icon: 'fa-file-contract', gradFrom: 'from-violet-600', gradTo: 'to-violet-800',
      tag: isRu ? 'Продажи' : 'Sales', tagColor: 'bg-violet-500/20 text-violet-300',
      nameEn: 'Proposal Preparation', nameRu: 'Подготовка КП',
      descEn: 'Analyze client needs, find matching cases, build proposal structure, write copy, quality-check.',
      descRu: 'Анализ потребностей клиента, подбор кейсов, структура КП, написание текста, контроль качества.',
      steps: [
        { icon: 'fa-user-circle', agent: isRu?'Аналитик':'Analyst', action: isRu?'Анализ клиента':'Client analysis' },
        { icon: 'fa-book',     agent: isRu?'Аналитик':'Analyst',    action: isRu?'Поиск кейсов в базе знаний':'Find cases in knowledge base' },
        { icon: 'fa-pen-nib', agent: isRu?'Копирайтер':'Copywriter',    action: isRu?'Структура и текст КП':'Proposal structure & copy' },
        { icon: 'fa-check-double', agent: isRu?'Контролёр':'QC',   action: isRu?'Проверка полноты':'Completeness check' },
        { icon: 'fa-envelope', agent: isRu?'CRM-агент':'CRM Agent',    action: isRu?'Отправка клиенту':'Send to client', confirm: true },
      ],
      time: isRu?'~5 мин':'~5 min', cost: '~$0.20', runs: 89,
    },
    {
      icon: 'fa-chart-pie', gradFrom: 'from-cyan-600', gradTo: 'to-cyan-800',
      tag: isRu ? 'Аналитика' : 'Analytics', tagColor: 'bg-cyan-500/20 text-cyan-300',
      nameEn: 'Market Analysis', nameRu: 'Анализ рынка',
      descEn: 'Gather sources, extract key figures, check facts, prepare analytical overview with structure.',
      descRu: 'Сбор источников, извлечение ключевых цифр, проверка фактов, аналитический обзор со структурой.',
      steps: [
        { icon: 'fa-globe',    agent: isRu?'Аналитик':'Analyst',    action: isRu?'Сбор источников':'Source collection' },
        { icon: 'fa-table',    agent: isRu?'Аналитик':'Analyst',    action: isRu?'Извлечение данных':'Data extraction' },
        { icon: 'fa-check',    agent: isRu?'Контролёр':'QC',        action: isRu?'Проверка фактов':'Fact check' },
        { icon: 'fa-file-alt', agent: isRu?'Копирайтер':'Copywriter',    action: isRu?'Подготовка обзора':'Prepare overview' },
      ],
      time: isRu?'~3 мин':'~3 min', cost: '~$0.12', runs: 203,
    },
    {
      icon: 'fa-calendar-alt', gradFrom: 'from-pink-600', gradTo: 'to-pink-800',
      tag: isRu ? 'Маркетинг' : 'Marketing', tagColor: 'bg-pink-500/20 text-pink-300',
      nameEn: 'Content Machine', nameRu: 'Контент-машина',
      descEn: 'Select topics, validate with facts, write posts in brand style, edit, schedule for publishing.',
      descRu: 'Подбор тем, проверка фактуры, написание постов в стиле бренда, редактура, расписание публикаций.',
      steps: [
        { icon: 'fa-hashtag',  agent: isRu?'Маркетолог':'Marketer', action: isRu?'Подбор тем':'Topic selection' },
        { icon: 'fa-pen-nib',  agent: isRu?'Копирайтер':'Copywriter',    action: isRu?'Написание постов':'Write posts' },
        { icon: 'fa-edit',     agent: isRu?'Контролёр':'QC',        action: isRu?'Редактура стиля':'Style editing' },
        { icon: 'fa-calendar', agent: isRu?'CRM-агент':'CRM Agent',    action: isRu?'Публикация по расписанию':'Schedule publishing', confirm: true },
      ],
      time: isRu?'~4 мин':'~4 min', cost: '~$0.14', runs: 156,
    },
    {
      icon: 'fa-satellite-dish', gradFrom: 'from-orange-600', gradTo: 'to-orange-800',
      tag: isRu ? 'Разведка' : 'Intelligence', tagColor: 'bg-orange-500/20 text-orange-300',
      nameEn: 'Business Radar', nameRu: 'Бизнес-радар',
      descEn: 'Monitor news, competitors, price changes, new products, and regulatory updates. Deliver digest.',
      descRu: 'Мониторинг новостей, конкурентов, изменений цен, новых продуктов и регуляторики. Дайджест.',
      steps: [
        { icon: 'fa-rss',      agent: isRu?'Бизнес-радар':'Biz Radar', action: isRu?'Сбор сигналов':'Signal collection' },
        { icon: 'fa-filter',   agent: isRu?'Аналитик':'Analyst',    action: isRu?'Фильтрация и группировка':'Filter & group' },
        { icon: 'fa-comment',  agent: isRu?'Аналитик':'Analyst',    action: isRu?'Оценка важности':'Importance scoring' },
        { icon: 'fa-paper-plane', agent: isRu?'CRM-агент':'CRM Agent', action: isRu?'Отправка дайджеста':'Send digest', confirm: true },
      ],
      time: isRu?'~2 мин':'~2 min', cost: '~$0.06', runs: 312,
    },
    {
      icon: 'fa-rocket', gradFrom: 'from-green-600', gradTo: 'to-green-800',
      tag: isRu ? 'Операции' : 'Operations', tagColor: 'bg-green-500/20 text-green-300',
      nameEn: 'Service Launch', nameRu: 'Запуск услуги',
      descEn: 'Full cycle: market analysis, offer creation, lead generation, proposals, outreach, CRM setup.',
      descRu: 'Полный цикл: анализ рынка, создание оффера, лидогенерация, КП, рассылка, настройка CRM.',
      steps: [
        { icon: 'fa-search',   agent: isRu?'Аналитик':'Analyst',    action: isRu?'Анализ рынка и ЦА':'Market & audience analysis' },
        { icon: 'fa-star',     agent: isRu?'Маркетолог':'Marketer', action: isRu?'Оффер и описание':'Offer & description' },
        { icon: 'fa-users',    agent: isRu?'Лид-исследователь':'Lead Researcher', action: isRu?'База первых клиентов':'First client base' },
        { icon: 'fa-file-alt', agent: isRu?'Копирайтер':'Copywriter',    action: isRu?'Персональные КП':'Personal proposals' },
        { icon: 'fa-database', agent: isRu?'CRM-агент':'CRM Agent',    action: isRu?'Настройка CRM':'CRM setup', confirm: true },
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
        <button class="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <i class="fas fa-plus"></i>
          ${isRu ? 'Создать сценарий' : 'Create scenario'}
        </button>
      </div>

      <!-- Category filter -->
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

      <!-- Scenarios grid -->
      <div id="scenarios-grid" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        ${SCENARIOS.map(s => `
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
                      <span><i class="fas fa-dollar-sign mr-1"></i>${s.cost}</span>
                      <span><i class="fas fa-play-circle mr-1"></i>${s.runs} ${isRu?'запусков':'runs'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p class="text-sm text-gray-400 mb-4 leading-relaxed">${isRu ? s.descRu : s.descEn}</p>

              <!-- Steps preview -->
              <div class="flex items-center gap-1 flex-wrap mb-4">
                ${s.steps.map((step, i) => `
                  <div class="flex items-center gap-1">
                    <div title="${step.agent}: ${step.action}"
                      class="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg bg-gray-800 text-gray-300 ${step.confirm ? 'border border-yellow-500/30 text-yellow-300' : ''}">
                      <i class="fas ${step.icon} text-xs"></i>
                      <span class="hidden sm:inline">${step.action}</span>
                    </div>
                    ${i < s.steps.length - 1 ? '<i class="fas fa-chevron-right text-gray-700 text-xs"></i>' : ''}
                  </div>
                `).join('')}
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1 text-xs text-gray-500">
                  <i class="fas fa-robot mr-1"></i>
                  ${s.steps.map(st => `<span class="bg-gray-800 px-1.5 py-0.5 rounded">${st.agent}</span>`).join('<span class="text-gray-700">·</span>')}
                </div>
                <button onclick="launchScenario('${isRu ? s.nameRu : s.nameEn}')"
                  class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 flex-shrink-0">
                  <i class="fas fa-play text-xs"></i>
                  ${isRu ? 'Запустить' : 'Launch'}
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  </main>

  <script>
    function filterCategory(cat) {
      document.querySelectorAll('.tag-btn').forEach(b => {
        b.classList.toggle('bg-gray-700', b.dataset.cat === cat);
        b.classList.toggle('text-white', b.dataset.cat === cat);
      });
      document.querySelectorAll('.scenario-card').forEach(card => {
        card.style.display = !cat || card.dataset.tag === cat ? '' : 'none';
      });
    }
    function launchScenario(name) {
      window.location.href = '/meta?lang=${lang}';
    }
    // Activate "All" by default
    document.querySelector('[data-cat=""]').classList.add('bg-gray-700', 'text-white');
  </script>
</body>
</html>
`
}
