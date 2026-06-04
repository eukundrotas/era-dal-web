import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const tasksPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const t = {
    title:       isRu ? 'Задачи'           : 'Tasks',
    newTask:     isRu ? '+ Новая задача'   : '+ New Task',
    all:         isRu ? 'Все'              : 'All',
    todo:        isRu ? 'К выполнению'     : 'To Do',
    inProgress:  isRu ? 'В работе'        : 'In Progress',
    review:      isRu ? 'На проверке'     : 'Review',
    done:        isRu ? 'Выполнено'       : 'Done',
    search:      isRu ? 'Поиск задач...'  : 'Search tasks...',
    priority:    isRu ? 'Приоритет'       : 'Priority',
    project:     isRu ? 'Проект'          : 'Project',
    assignee:    isRu ? 'Исполнитель'     : 'Assignee',
    dueDate:     isRu ? 'Срок'            : 'Due date',
    runAI:       isRu ? 'Запустить AI'    : 'Run AI',
    noTasks:     isRu ? 'Нет задач'       : 'No tasks',
    critical:    isRu ? 'Критический'     : 'Critical',
    high:        isRu ? 'Высокий'         : 'High',
    medium:      isRu ? 'Средний'         : 'Medium',
    low:         isRu ? 'Низкий'          : 'Low',
  }

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t.title, '', lang)}
  <style>
    .task-card { transition: all 0.2s; }
    .task-card:hover { transform: translateX(3px); }
    .priority-critical { border-left: 3px solid #ef4444; }
    .priority-high     { border-left: 3px solid #f97316; }
    .priority-medium   { border-left: 3px solid #eab308; }
    .priority-low      { border-left: 3px solid #22c55e; }
    .status-tab.active { background: rgba(59,130,246,0.2); color: white; border-bottom: 2px solid #3b82f6; }
  </style>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${sidebar('tasks', lang)}
  <main class="ml-56 pt-4 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 pb-10">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-white">${t.title}</h1>
          <p class="text-gray-400 text-sm mt-0.5">${isRu ? 'AI-задачи для цифровых сотрудников' : 'AI-powered tasks for digital employees'}</p>
        </div>
        <button onclick="openNewTask()"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
          <i class="fas fa-plus"></i> ${t.newTask}
        </button>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        ${[
          { label: isRu ? 'Всего' : 'Total',       value: '24', icon: 'fa-list-check',    color: 'text-blue-400'   },
          { label: isRu ? 'В работе' : 'Active',   value: '7',  icon: 'fa-spinner',       color: 'text-yellow-400' },
          { label: isRu ? 'Выполнено' : 'Done',    value: '15', icon: 'fa-check-circle',  color: 'text-green-400'  },
          { label: isRu ? 'Просрочено' : 'Overdue',value: '2',  icon: 'fa-clock',         color: 'text-red-400'    },
        ].map(s => `
        <div class="glass rounded-xl p-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-xs">${s.label}</span>
            <i class="fas ${s.icon} ${s.color}" style="font-size:13px"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-1">${s.value}</p>
        </div>`).join('')}
      </div>

      <!-- Filters & Tabs -->
      <div class="glass rounded-xl p-4 mb-4">
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <input id="task-search" type="text" placeholder="${t.search}"
              oninput="filterTasks()"
              class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 flex-1 min-w-48 focus:outline-none focus:border-blue-500">
          <select id="filter-priority" onchange="filterTasks()"
              class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500">
            <option value="">${t.priority}: ${isRu ? 'Все' : 'All'}</option>
            <option value="critical">${t.critical}</option>
            <option value="high">${t.high}</option>
            <option value="medium">${t.medium}</option>
            <option value="low">${t.low}</option>
          </select>
          <select id="filter-project" onchange="filterTasks()"
              class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500">
            <option value="">${t.project}: ${isRu ? 'Все' : 'All'}</option>
            <option value="marketing">${isRu ? 'Маркетинг' : 'Marketing'}</option>
            <option value="sales">${isRu ? 'Продажи' : 'Sales'}</option>
            <option value="research">${isRu ? 'Исследования' : 'Research'}</option>
          </select>
        </div>
        <!-- Status tabs -->
        <div class="flex gap-1 border-b border-gray-800 pb-0">
          ${['all','todo','in_progress','review','done'].map((s,i) => `
          <button onclick="setStatusFilter('${s}')" data-tab="${s}"
              class="status-tab px-3 py-2 text-sm text-gray-400 rounded-t-lg hover:text-white transition ${i===0?'active':''}">
            ${[t.all, t.todo, t.inProgress, t.review, t.done][i]}
            <span class="ml-1 text-xs bg-gray-800 px-1.5 py-0.5 rounded-full" id="count-${s}"></span>
          </button>`).join('')}
        </div>
      </div>

      <!-- Task list -->
      <div id="task-list" class="space-y-2"></div>
    </div>
  </main>

  <!-- New Task Modal -->
  <div id="task-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-bold">${isRu ? 'Новая задача' : 'New Task'}</h2>
        <button onclick="closeNewTask()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button>
      </div>
      <div class="space-y-4">
        <div>
          <label class="text-xs text-gray-400 mb-1 block">${isRu ? 'Название' : 'Title'}</label>
          <input id="new-task-title" type="text"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">${isRu ? 'Описание' : 'Description'}</label>
          <textarea id="new-task-desc" rows="3"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs text-gray-400 mb-1 block">${t.priority}</label>
            <select id="new-task-priority" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
              <option value="critical">${t.critical}</option>
              <option value="high">${t.high}</option>
              <option value="medium" selected>${t.medium}</option>
              <option value="low">${t.low}</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">${isRu ? 'Агент' : 'Agent'}</label>
            <select id="new-task-agent" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
              <option value="lead_researcher">${isRu ? 'Исследователь' : 'Lead Researcher'}</option>
              <option value="market_analyst">${isRu ? 'Маркетолог' : 'Market Analyst'}</option>
              <option value="copywriter">${isRu ? 'Копирайтер' : 'Copywriter'}</option>
              <option value="sales_director">${isRu ? 'Директор продаж' : 'Sales Director'}</option>
              <option value="project_manager">${isRu ? 'Менеджер проекта' : 'Project Manager'}</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs text-gray-400 mb-1 block">${t.project}</label>
            <select id="new-task-project" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
              <option value="marketing">${isRu ? 'Маркетинг' : 'Marketing'}</option>
              <option value="sales">${isRu ? 'Продажи' : 'Sales'}</option>
              <option value="research">${isRu ? 'Исследования' : 'Research'}</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">${t.dueDate}</label>
            <input id="new-task-due" type="date"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>
      </div>
      <div class="flex gap-3 mt-6">
        <button onclick="saveTask()"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
          ${isRu ? 'Создать' : 'Create'}
        </button>
        <button onclick="saveAndRun()"
            class="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg text-sm font-medium transition">
          <i class="fas fa-play mr-1"></i> ${isRu ? 'Создать и запустить AI' : 'Create & Run AI'}
        </button>
      </div>
    </div>
  </div>

  <script>
  var TASKS = [
    { id:'t1', title:${isRu ? "'Анализ конкурентов Q2'" : "'Competitor analysis Q2'"}, desc:${isRu ? "'Исследовать топ-10 конкурентов'" : "'Research top-10 competitors'"}, status:'in_progress', priority:'high', agent:'lead_researcher', project:'research', due:'2025-06-15', planId:null },
    { id:'t2', title:${isRu ? "'Написать email-кампанию'" : "'Write email campaign'"}, desc:${isRu ? "'Серия из 5 писем для онбординга'" : "'5-email onboarding series'"}, status:'todo', priority:'medium', agent:'copywriter', project:'marketing', due:'2025-06-20', planId:null },
    { id:'t3', title:${isRu ? "'Прогноз продаж на июль'" : "'July sales forecast'"}, desc:${isRu ? "'Модель прогнозирования на основе данных'" : "'Data-driven forecast model'"}, status:'todo', priority:'critical', agent:'market_analyst', project:'sales', due:'2025-06-10', planId:null },
    { id:'t4', title:${isRu ? "'SEO-аудит сайта'" : "'Website SEO audit'"}, desc:'', status:'done', priority:'low', agent:'lead_researcher', project:'marketing', due:'2025-06-01', planId:null },
    { id:'t5', title:${isRu ? "'Скрипт холодных звонков'" : "'Cold call script'"}, desc:'', status:'review', priority:'high', agent:'sales_director', project:'sales', due:'2025-06-12', planId:null },
    { id:'t6', title:${isRu ? "'Отчёт по рынку SaaS'" : "'SaaS market report'"}, desc:'', status:'in_progress', priority:'medium', agent:'market_analyst', project:'research', due:'2025-06-25', planId:null },
    { id:'t7', title:${isRu ? "'Контент-план на квартал'" : "'Quarterly content plan'"}, desc:'', status:'todo', priority:'medium', agent:'copywriter', project:'marketing', due:'2025-07-01', planId:null },
  ];

  var currentStatus = 'all';

  var PRIORITY_COLOR = { critical:'text-red-400', high:'text-orange-400', medium:'text-yellow-400', low:'text-green-400' };
  var PRIORITY_LABEL = { critical:'${t.critical}', high:'${t.high}', medium:'${t.medium}', low:'${t.low}' };
  var STATUS_LABEL   = { todo:'${t.todo}', in_progress:'${t.inProgress}', review:'${t.review}', done:'${t.done}', cancelled:${isRu ? "'Отменено'" : "'Cancelled'"} };
  var STATUS_COLOR   = { todo:'bg-gray-700 text-gray-300', in_progress:'bg-blue-900 text-blue-300', review:'bg-yellow-900 text-yellow-300', done:'bg-green-900 text-green-300', cancelled:'bg-red-900 text-red-300' };
  var AGENT_LABEL    = { lead_researcher:${isRu ? "'Исследователь'" : "'Lead Researcher'"}, market_analyst:${isRu ? "'Маркетолог'" : "'Market Analyst'"}, copywriter:${isRu ? "'Копирайтер'" : "'Copywriter'"}, sales_director:${isRu ? "'Директор продаж'" : "'Sales Director'"}, project_manager:${isRu ? "'Менеджер'" : "'Project Manager'"} };
  var PROJECT_LABEL  = { marketing:${isRu ? "'Маркетинг'" : "'Marketing'"}, sales:${isRu ? "'Продажи'" : "'Sales'"}, research:${isRu ? "'Исследования'" : "'Research'"} };

  function setStatusFilter(s) {
    currentStatus = s;
    document.querySelectorAll('.status-tab').forEach(function(el) { el.classList.remove('active'); });
    document.querySelector('[data-tab="'+s+'"]').classList.add('active');
    renderTasks();
  }

  function filterTasks() { renderTasks(); }

  function getFiltered() {
    var q  = document.getElementById('task-search').value.toLowerCase();
    var pr = document.getElementById('filter-priority').value;
    var pj = document.getElementById('filter-project').value;
    return TASKS.filter(function(t) {
      if (currentStatus !== 'all' && t.status !== currentStatus) return false;
      if (pr && t.priority !== pr) return false;
      if (pj && t.project  !== pj) return false;
      if (q  && !t.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }

  function renderTasks() {
    var list = getFiltered();
    var counts = { all:TASKS.length, todo:0, in_progress:0, review:0, done:0 };
    TASKS.forEach(function(t) { if (counts[t.status] !== undefined) counts[t.status]++; });
    Object.keys(counts).forEach(function(k) {
      var el = document.getElementById('count-'+k);
      if (el) el.textContent = counts[k];
    });

    var html = list.length === 0
      ? '<div class="text-center py-12 text-gray-500"><i class="fas fa-inbox text-3xl mb-3 block"></i>${t.noTasks}</div>'
      : list.map(function(task) {
        var borderClass = 'priority-' + task.priority;
        return '<div class="task-card glass rounded-xl p-4 flex items-center gap-4 '+borderClass+'" data-id="'+task.id+'">'
          + '<div class="flex-1 min-w-0">'
          + '<div class="flex items-center gap-2 mb-1">'
          + '<span class="font-medium text-white text-sm truncate">'+task.title+'</span>'
          + '</div>'
          + '<div class="flex flex-wrap items-center gap-2">'
          + '<span class="text-xs px-2 py-0.5 rounded-full '+STATUS_COLOR[task.status]+'">'+STATUS_LABEL[task.status]+'</span>'
          + '<span class="text-xs '+PRIORITY_COLOR[task.priority]+'"><i class="fas fa-flag mr-1"></i>'+PRIORITY_LABEL[task.priority]+'</span>'
          + (task.agent ? '<span class="text-xs text-gray-500"><i class="fas fa-robot mr-1"></i>'+(AGENT_LABEL[task.agent]||task.agent)+'</span>' : '')
          + (task.project ? '<span class="text-xs text-gray-500"><i class="fas fa-folder mr-1"></i>'+(PROJECT_LABEL[task.project]||task.project)+'</span>' : '')
          + (task.due ? '<span class="text-xs text-gray-500"><i class="fas fa-calendar mr-1"></i>'+task.due+'</span>' : '')
          + '</div>'
          + '</div>'
          + '<div class="flex items-center gap-2 flex-shrink-0">'
          + (task.status !== 'done' && task.status !== 'cancelled'
              ? '<button onclick="runTaskAI(\''+task.id+'\')" title="${t.runAI}" class="text-xs bg-violet-700 hover:bg-violet-600 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1"><i class="fas fa-play"></i> AI</button>'
              : '<span class="text-xs text-green-400"><i class="fas fa-check"></i></span>')
          + '</div>'
          + '</div>';
      }).join('');
    document.getElementById('task-list').innerHTML = html;
  }

  function openNewTask()  { document.getElementById('task-modal').classList.remove('hidden'); }
  function closeNewTask() { document.getElementById('task-modal').classList.add('hidden'); }

  function saveTask() {
    var title = document.getElementById('new-task-title').value.trim();
    if (!title) return;
    TASKS.unshift({
      id: 'new-'+Date.now(),
      title: title,
      desc: document.getElementById('new-task-desc').value,
      status: 'todo',
      priority: document.getElementById('new-task-priority').value,
      agent: document.getElementById('new-task-agent').value,
      project: document.getElementById('new-task-project').value,
      due: document.getElementById('new-task-due').value,
      planId: null
    });
    closeNewTask();
    renderTasks();
  }

  function saveAndRun() {
    var title = document.getElementById('new-task-title').value.trim();
    if (!title) return;
    var desc  = document.getElementById('new-task-desc').value;
    saveTask();
    window.location.href = '/meta?lang=${lang}&task='+encodeURIComponent(title + (desc ? ': ' + desc : ''));
  }

  function runTaskAI(id) {
    var task = TASKS.find(function(t) { return t.id === id; });
    if (!task) return;
    window.location.href = '/meta?lang=${lang}&task='+encodeURIComponent(task.title + (task.desc ? ': '+task.desc : ''));
  }

  renderTasks();
  </script>
</body>
</html>`
}
