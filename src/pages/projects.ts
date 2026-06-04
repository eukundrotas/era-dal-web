import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const projectsPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const t = {
    title:      isRu ? 'Проекты'            : 'Projects',
    newProject: isRu ? '+ Новый проект'     : '+ New Project',
    active:     isRu ? 'Активные'           : 'Active',
    onHold:     isRu ? 'На паузе'           : 'On Hold',
    completed:  isRu ? 'Завершённые'        : 'Completed',
    tasks:      isRu ? 'задач'              : 'tasks',
    budget:     isRu ? 'Бюджет'             : 'Budget',
    spent:      isRu ? 'Потрачено'          : 'Spent',
    progress:   isRu ? 'Прогресс'           : 'Progress',
    due:        isRu ? 'Срок'               : 'Due',
    openProject:isRu ? 'Открыть'            : 'Open',
    noProjects: isRu ? 'Нет проектов'       : 'No projects',
  }

  const projects = [
    { id:'p1', name: isRu ? 'Маркетинговая кампания Q2' : 'Marketing Campaign Q2',
      desc: isRu ? 'Запуск серии контент-кампаний' : 'Launch content campaign series',
      status:'active', color:'#3b82f6', tasks:15, done:8, budget:1200, spent:680, due:'2025-06-30' },
    { id:'p2', name: isRu ? 'Исследование рынка SaaS' : 'SaaS Market Research',
      desc: isRu ? 'Анализ конкурентного ландшафта' : 'Competitive landscape analysis',
      status:'active', color:'#8b5cf6', tasks:9, done:4, budget:500, spent:210, due:'2025-07-15' },
    { id:'p3', name: isRu ? 'Автоматизация продаж' : 'Sales Automation',
      desc: isRu ? 'Скрипты и воронка для outbound' : 'Outbound scripts and funnel',
      status:'in_progress', color:'#10b981', tasks:12, done:3, budget:800, spent:180, due:'2025-07-31' },
    { id:'p4', name: isRu ? 'Корпоративный сайт v2' : 'Corporate Website v2',
      desc: isRu ? 'Редизайн и новые лендинги' : 'Redesign and new landing pages',
      status:'on_hold', color:'#f59e0b', tasks:20, done:12, budget:2000, spent:1400, due:'2025-08-01' },
    { id:'p5', name: isRu ? 'HR-аналитика 2024' : 'HR Analytics 2024',
      desc: isRu ? 'Анализ данных по сотрудникам' : 'Employee data analysis',
      status:'completed', color:'#06b6d4', tasks:7, done:7, budget:300, spent:290, due:'2025-05-01' },
  ]

  const statusLabel: Record<string,string> = {
    active:      isRu ? 'Активный'   : 'Active',
    in_progress: isRu ? 'В работе'   : 'In Progress',
    on_hold:     isRu ? 'На паузе'   : 'On Hold',
    completed:   isRu ? 'Завершён'   : 'Completed',
    archived:    isRu ? 'Архив'      : 'Archived',
  }
  const statusBadge: Record<string,string> = {
    active:      'bg-green-900 text-green-300',
    in_progress: 'bg-blue-900 text-blue-300',
    on_hold:     'bg-yellow-900 text-yellow-300',
    completed:   'bg-gray-700 text-gray-300',
    archived:    'bg-gray-800 text-gray-500',
  }

  const cards = projects.map(p => {
    const pct = p.tasks > 0 ? Math.round(p.done / p.tasks * 100) : 0
    const budgetPct = p.budget > 0 ? Math.round(p.spent / p.budget * 100) : 0
    return `
    <div class="glass rounded-2xl p-5 flex flex-col gap-3 card-hover cursor-pointer" onclick="window.location='/tasks?lang=${lang}&project=${p.id}'">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:${p.color}22;border:1.5px solid ${p.color}44">
            <i class="fas fa-folder" style="color:${p.color};font-size:16px"></i>
          </div>
          <div>
            <h3 class="font-semibold text-white text-sm leading-tight">${p.name}</h3>
            <p class="text-gray-400 text-xs mt-0.5 line-clamp-1">${p.desc}</p>
          </div>
        </div>
        <span class="text-xs px-2 py-1 rounded-full flex-shrink-0 ${statusBadge[p.status] || statusBadge.active}">${statusLabel[p.status] || p.status}</span>
      </div>

      <!-- Progress -->
      <div>
        <div class="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>${t.progress}</span>
          <span class="text-white font-medium">${pct}%</span>
        </div>
        <div class="w-full bg-gray-800 rounded-full h-1.5">
          <div class="h-1.5 rounded-full transition-all" style="width:${pct}%;background:${p.color}"></div>
        </div>
        <p class="text-xs text-gray-500 mt-1">${p.done}/${p.tasks} ${t.tasks}</p>
      </div>

      <!-- Budget & Due -->
      <div class="flex items-center justify-between text-xs">
        <div class="text-gray-400">
          <i class="fas fa-dollar-sign mr-1"></i>
          <span class="text-white">$${p.spent}</span>
          <span class="text-gray-600"> / $${p.budget}</span>
          <span class="ml-1 ${budgetPct > 85 ? 'text-red-400' : 'text-gray-500'}">(${budgetPct}%)</span>
        </div>
        <div class="text-gray-400">
          <i class="fas fa-calendar mr-1"></i>${p.due}
        </div>
      </div>
    </div>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t.title, '', lang)}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${sidebar('projects', lang)}
  <main class="ml-56 pt-4 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 pb-10">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-white">${t.title}</h1>
          <p class="text-gray-400 text-sm mt-0.5">${isRu ? 'Управление проектами с AI-поддержкой' : 'AI-powered project management'}</p>
        </div>
        <button onclick="document.getElementById('new-project-modal').classList.remove('hidden')"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
          <i class="fas fa-plus"></i> ${t.newProject}
        </button>
      </div>

      <!-- Summary stats -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        ${[
          { label: isRu ? 'Всего'       : 'Total',    v: '5',    icon:'fa-folder',       c:'text-blue-400'   },
          { label: isRu ? 'Активных'    : 'Active',   v: '3',    icon:'fa-bolt',         c:'text-green-400'  },
          { label: isRu ? 'Задач'       : 'Tasks',    v: '63',   icon:'fa-list-check',   c:'text-yellow-400' },
          { label: isRu ? 'Бюджет всего': 'Budget',   v: '$4.8k',icon:'fa-dollar-sign',  c:'text-purple-400' },
        ].map(s => `<div class="glass rounded-xl p-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-xs">${s.label}</span>
            <i class="fas ${s.icon} ${s.c}" style="font-size:13px"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-1">${s.v}</p>
        </div>`).join('')}
      </div>

      <!-- Project cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${cards}
      </div>
    </div>
  </main>

  <!-- New Project Modal -->
  <div id="new-project-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-bold">${isRu ? 'Новый проект' : 'New Project'}</h2>
        <button onclick="document.getElementById('new-project-modal').classList.add('hidden')" class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="space-y-4">
        <div>
          <label class="text-xs text-gray-400 mb-1 block">${isRu ? 'Название' : 'Name'}</label>
          <input id="np-name" type="text" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">${isRu ? 'Описание' : 'Description'}</label>
          <textarea id="np-desc" rows="2" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs text-gray-400 mb-1 block">${t.budget} ($)</label>
            <input id="np-budget" type="number" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">${t.due}</label>
            <input id="np-due" type="date" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">${isRu ? 'Цвет' : 'Color'}</label>
          <div class="flex gap-2">
            ${['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4'].map(c =>
              `<button onclick="selectColor('${c}')" class="w-7 h-7 rounded-full border-2 border-transparent hover:border-white transition" style="background:${c}" data-color="${c}"></button>`
            ).join('')}
          </div>
        </div>
      </div>
      <div class="flex gap-3 mt-6">
        <button onclick="document.getElementById('new-project-modal').classList.add('hidden')"
            class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition">
          ${isRu ? 'Отмена' : 'Cancel'}
        </button>
        <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
          ${isRu ? 'Создать проект' : 'Create Project'}
        </button>
      </div>
    </div>
  </div>

  <script>
  function selectColor(c) {
    document.querySelectorAll('[data-color]').forEach(function(el) {
      el.style.borderColor = el.dataset.color === c ? 'white' : 'transparent';
    });
  }
  selectColor('#3b82f6');
  </script>
</body>
</html>`
}
