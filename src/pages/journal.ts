import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const journalPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'Журнал действий' : 'Action Journal'
  const subtitle = isRu
    ? 'Полная история работы агентов: действия, результаты, стоимость, подтверждения'
    : 'Complete agent activity log: actions, results, cost, and approval gates'

  const ENTRIES = [
    { time: '14:32', status: 'success', agent: isRu?'Лид-исследователь':'Lead Researcher', icon: 'fa-search', color: 'blue',
      action: isRu?'Поиск компаний в нише B2B SaaS — найдено 34 компании':'Company search in B2B SaaS niche — 34 companies found',
      scenario: isRu?'Поиск клиентов':'Lead Generation', cost: '$0.04', duration: '52s', autonomy: 'auto' },
    { time: '14:33', status: 'success', agent: isRu?'Аналитик':'Analyst', icon: 'fa-star', color: 'cyan',
      action: isRu?'Оценка релевантности лидов — отфильтровано 18 из 34':'Lead scoring — 18 of 34 qualified',
      scenario: isRu?'Поиск клиентов':'Lead Generation', cost: '$0.03', duration: '31s', autonomy: 'auto' },
    { time: '14:34', status: 'success', agent: isRu?'Копирайтер':'Copywriter', icon: 'fa-pen-nib', color: 'purple',
      action: isRu?'Написание 18 персональных сообщений с упоминанием болей':'18 personalized messages written with pain points',
      scenario: isRu?'Поиск клиентов':'Lead Generation', cost: '$0.07', duration: '78s', autonomy: 'auto' },
    { time: '14:35', status: 'confirm', agent: isRu?'CRM-агент':'CRM Agent', icon: 'fa-database', color: 'green',
      action: isRu?'Запись 18 лидов и сообщений в Google Sheets — ожидает подтверждения':'Write 18 leads to Google Sheets — awaiting confirmation',
      scenario: isRu?'Поиск клиентов':'Lead Generation', cost: '$0.01', duration: '—', autonomy: 'confirm' },
    { time: '12:14', status: 'success', agent: isRu?'Аналитик':'Analyst', icon: 'fa-globe', color: 'cyan',
      action: isRu?'Мониторинг конкурентов: 5 изменений цен, 2 новых продукта':'Competitor monitor: 5 price changes, 2 new products',
      scenario: isRu?'Бизнес-радар':'Business Radar', cost: '$0.03', duration: '44s', autonomy: 'auto' },
    { time: '12:15', status: 'success', agent: isRu?'Аналитик':'Analyst', icon: 'fa-compress-arrows-alt', color: 'cyan',
      action: isRu?'Группировка и приоритизация 23 сигналов рынка':'Grouping and prioritizing 23 market signals',
      scenario: isRu?'Бизнес-радар':'Business Radar', cost: '$0.02', duration: '21s', autonomy: 'auto' },
    { time: '11:45', status: 'error', agent: isRu?'Лид-исследователь':'Lead Researcher', icon: 'fa-search', color: 'blue',
      action: isRu?'Поиск контактов не завершён — превышен лимит запросов к источнику':'Contact search incomplete — rate limit exceeded on source',
      scenario: isRu?'Поиск клиентов':'Lead Generation', cost: '$0.01', duration: '15s', autonomy: 'auto' },
    { time: '10:22', status: 'success', agent: isRu?'Копирайтер':'Copywriter', icon: 'fa-calendar', color: 'purple',
      action: isRu?'Контент-план на 4 недели — 28 постов по темам ИИ и автоматизации':'4-week content plan — 28 posts on AI and automation topics',
      scenario: isRu?'Контент-машина':'Content Machine', cost: '$0.09', duration: '90s', autonomy: 'auto' },
    { time: '10:24', status: 'success', agent: isRu?'Контролёр':'Quality Control', icon: 'fa-check-double', color: 'yellow',
      action: isRu?'Проверка тона и фактуры: 2 исправления, качество 94%':'Tone and fact check: 2 corrections, quality 94%',
      scenario: isRu?'Контент-машина':'Content Machine', cost: '$0.02', duration: '28s', autonomy: 'auto' },
    { time: '09:10', status: 'success', agent: isRu?'Бизнес-радар':'Business Radar', icon: 'fa-newspaper', color: 'orange',
      action: isRu?'Дайджест новостей рынка AI: 14 значимых событий за неделю':'AI market news digest: 14 significant events this week',
      scenario: isRu?'Бизнес-радар':'Business Radar', cost: '$0.05', duration: '55s', autonomy: 'auto' },
  ]

  const totalCost = ENTRIES.reduce((sum, e) => {
    const n = parseFloat(e.cost.replace('$', ''))
    return isNaN(n) ? sum : sum + n
  }, 0)

  const colorClasses: Record<string, string> = {
    blue: 'text-blue-400', cyan: 'text-cyan-400', purple: 'text-purple-400',
    yellow: 'text-yellow-400', green: 'text-green-400', orange: 'text-orange-400',
  }

  const statusIcon = (s: string) => {
    if (s === 'success') return '<i class="fas fa-check-circle text-green-400"></i>'
    if (s === 'error') return '<i class="fas fa-times-circle text-red-400"></i>'
    return '<i class="fas fa-clock text-yellow-400"></i>'
  }

  const autonomyBadge = (a: string) =>
    a === 'auto'
      ? `<span class="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">${isRu ? 'авто' : 'auto'}</span>`
      : `<span class="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 animate-pulse">${isRu ? 'ждёт' : 'pending'}</span>`

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, subtitle, lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('journal', lang)}

  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6 max-w-5xl">

      <!-- Header -->
      <div class="mb-6 flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
              <i class="fas fa-scroll text-white text-sm"></i>
            </div>
            <h1 class="text-2xl font-bold">${title}</h1>
          </div>
          <p class="text-gray-400 ml-12">${subtitle}</p>
        </div>
        <button class="text-sm text-gray-400 hover:text-white glass px-3 py-2 rounded-lg flex items-center gap-2">
          <i class="fas fa-download"></i>
          ${isRu ? 'Экспорт' : 'Export'}
        </button>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        ${[
          ['fa-play-circle text-green-400', isRu?'Действий сегодня':'Actions today', '10'],
          ['fa-check-circle text-green-400', isRu?'Успешно':'Successful', '9'],
          ['fa-times-circle text-red-400', isRu?'Ошибок':'Errors', '1'],
          ['fa-dollar-sign text-blue-400', isRu?'Стоимость сегодня':'Cost today', '$' + totalCost.toFixed(2)],
        ].map(([icon, label, val]) => `
          <div class="glass rounded-xl p-4">
            <div class="flex items-center gap-2 mb-1">
              <i class="fas ${icon} text-sm"></i>
              <span class="text-xs text-gray-400">${label}</span>
            </div>
            <p class="text-2xl font-bold">${val}</p>
          </div>
        `).join('')}
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-3 mb-5">
        <select id="filter-status" onchange="filterJournal()"
          class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
          <option value="">${isRu ? 'Все статусы' : 'All statuses'}</option>
          <option value="success">${isRu ? 'Успешно' : 'Success'}</option>
          <option value="error">${isRu ? 'Ошибка' : 'Error'}</option>
          <option value="confirm">${isRu ? 'Ожидает' : 'Pending'}</option>
        </select>
        <select id="filter-agent" onchange="filterJournal()"
          class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
          <option value="">${isRu ? 'Все агенты' : 'All agents'}</option>
          ${[...new Set(ENTRIES.map(e => e.agent))].map(a => `<option value="${a}">${a}</option>`).join('')}
        </select>
        <input id="filter-search" type="text" placeholder="${isRu ? 'Поиск по тексту...' : 'Search...'}"
          oninput="filterJournal()"
          class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 flex-1">
      </div>

      <!-- Pending approvals banner -->
      <div class="glass rounded-xl p-4 mb-5 border border-yellow-500/30 bg-yellow-500/5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i class="fas fa-shield-alt text-yellow-400"></i>
            <div>
              <p class="font-medium text-yellow-300 text-sm">${isRu ? '1 действие ожидает подтверждения' : '1 action awaiting confirmation'}</p>
              <p class="text-xs text-gray-400">${isRu ? 'CRM-агент: запись 18 лидов в Google Sheets' : 'CRM Agent: write 18 leads to Google Sheets'}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button onclick="approveAction()" class="text-sm px-4 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium">
              <i class="fas fa-check mr-1"></i>${isRu ? 'Одобрить' : 'Approve'}
            </button>
            <button onclick="rejectAction()" class="text-sm px-4 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10">
              <i class="fas fa-times mr-1"></i>${isRu ? 'Отклонить' : 'Reject'}
            </button>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div id="journal-list" class="space-y-2">
        ${ENTRIES.map((e, i) => `
          <div class="journal-entry glass rounded-xl px-5 py-3.5 hover:border-gray-700 transition"
               data-status="${e.status}" data-agent="${e.agent}" data-text="${e.action.toLowerCase()}">
            <div class="flex items-start gap-4">
              <div class="flex flex-col items-center pt-1 flex-shrink-0 w-14">
                <span class="text-xs text-gray-500 font-mono">${e.time}</span>
                <div class="mt-1">${statusIcon(e.status)}</div>
              </div>

              <div class="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <i class="fas ${e.icon} ${colorClasses[e.color] || 'text-gray-400'} text-sm"></i>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-0.5">
                  <span class="text-sm font-medium text-gray-200">${e.agent}</span>
                  <span class="text-xs text-gray-600">·</span>
                  <span class="text-xs text-gray-500">${e.scenario}</span>
                  ${autonomyBadge(e.autonomy)}
                </div>
                <p class="text-sm text-gray-400 leading-relaxed">${e.action}</p>
              </div>

              <div class="flex flex-col items-end gap-1 flex-shrink-0 text-xs text-gray-500">
                <span class="text-green-400">${e.cost}</span>
                <span>${e.duration}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="text-center mt-6">
        <button class="text-sm text-gray-400 hover:text-white glass px-4 py-2 rounded-lg">
          ${isRu ? 'Загрузить ещё' : 'Load more'}
        </button>
      </div>
    </div>
  </main>

  <script>
    function filterJournal() {
      const status = document.getElementById('filter-status').value;
      const agent = document.getElementById('filter-agent').value;
      const q = document.getElementById('filter-search').value.toLowerCase();
      document.querySelectorAll('.journal-entry').forEach(el => {
        const sMatch = !status || el.dataset.status === status;
        const aMatch = !agent || el.dataset.agent === agent;
        const tMatch = !q || el.dataset.text.includes(q);
        el.style.display = sMatch && aMatch && tMatch ? '' : 'none';
      });
    }
    function approveAction() {
      alert('${isRu ? 'Действие одобрено. Агент продолжает выполнение.' : 'Action approved. Agent continues execution.'}');
      document.querySelector('.journal-entry[data-status="confirm"]').remove();
      document.querySelector('.border-yellow-500\\/30').remove();
    }
    function rejectAction() {
      alert('${isRu ? 'Действие отклонено.' : 'Action rejected.'}');
      document.querySelector('.border-yellow-500\\/30').remove();
    }
  </script>
</body>
</html>
`
}
