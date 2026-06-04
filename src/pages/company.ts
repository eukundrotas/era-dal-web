import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const companyPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const t = {
    title:       isRu ? 'Компания'           : 'Company',
    overview:    isRu ? 'Обзор'              : 'Overview',
    team:        isRu ? 'Команда'            : 'Team',
    orgStructure:isRu ? 'Оргструктура'       : 'Org Structure',
    skills:      isRu ? 'Навыки'             : 'Skills',
    addMember:   isRu ? '+ Сотрудник'        : '+ Add Member',
    human:       isRu ? 'Люди'               : 'Humans',
    digital:     isRu ? 'Цифровые'           : 'Digital',
    department:  isRu ? 'Отдел'             : 'Department',
    role:        isRu ? 'Роль'               : 'Role',
    tasks:       isRu ? 'Задач'              : 'Tasks',
    cost:        isRu ? 'Стоимость'          : 'Cost',
  }

  const departments = [
    { id:'d1', name: isRu?'Маркетинг':'Marketing',       color:'#3b82f6', head:isRu?'Анна М.':'Anna M.', members:4 },
    { id:'d2', name: isRu?'Продажи':'Sales',             color:'#10b981', head:isRu?'Иван С.':'Ivan S.', members:3 },
    { id:'d3', name: isRu?'Исследования':'Research',     color:'#8b5cf6', head:isRu?'Мария К.':'Maria K.', members:5 },
    { id:'d4', name: isRu?'Технологии':'Tech',           color:'#f59e0b', head:isRu?'Дмитрий П.':'Dmitry P.', members:3 },
  ]

  const members = [
    { name:'Eugene',          role:isRu?'Директор':'Director',        dept:'d1', type:'human',   color:'#4f46e5', skills:['Strategy','AI','Management'] },
    { name:isRu?'Анна':'Anna',role:isRu?'Маркетолог':'Marketer',      dept:'d1', type:'human',   color:'#7c3aed', skills:['Marketing','Content','SEO'] },
    { name:isRu?'Иван':'Ivan',role:isRu?'Менеджер продаж':'Sales Mgr',dept:'d2', type:'human',   color:'#0284c7', skills:['Sales','CRM','Negotiation'] },
    { name:isRu?'Исследователь AI':'AI Researcher', role:isRu?'Ведущий исследователь':'Lead Researcher', dept:'d3', type:'digital', color:'#7f52ff', skills:['Research','Analysis','Synthesis'] },
    { name:isRu?'Маркетолог AI':'AI Marketer',     role:isRu?'Рыночный аналитик':'Market Analyst',      dept:'d1', type:'digital', color:'#10b981', skills:['Market Analysis','Forecasting','Reports'] },
    { name:isRu?'Копирайтер AI':'AI Copywriter',   role:isRu?'Копирайтер':'Copywriter',                   dept:'d1', type:'digital', color:'#f59e0b', skills:['Writing','SEO','Creativity'] },
    { name:isRu?'Продажник AI':'AI Sales',         role:isRu?'Директор продаж':'Sales Director',          dept:'d2', type:'digital', color:'#ef4444', skills:['Sales Scripts','Objections','Closing'] },
    { name:isRu?'Юрист AI':'AI Legal',             role:isRu?'Юридический помощник':'Legal Assistant',    dept:'d4', type:'digital', color:'#8b5cf6', skills:['Contracts','Compliance','Risk'] },
  ]

  const skills = [
    { name:'AI/ML',          level:92, category:'tech',    icon:'fa-brain' },
    { name:isRu?'Маркетинг':'Marketing', level:85, category:'business', icon:'fa-bullhorn' },
    { name:isRu?'Аналитика':'Analytics', level:88, category:'business', icon:'fa-chart-bar' },
    { name:isRu?'Продажи':'Sales',       level:79, category:'business', icon:'fa-handshake' },
    { name:isRu?'Контент':'Content',     level:83, category:'creative', icon:'fa-pen-nib' },
    { name:isRu?'Право':'Legal',         level:71, category:'compliance',icon:'fa-balance-scale' },
    { name:isRu?'Финансы':'Finance',     level:75, category:'business', icon:'fa-dollar-sign' },
    { name:'Python/TS',      level:90, category:'tech',    icon:'fa-code' },
  ]

  const catColor: Record<string,string> = {
    tech:'text-blue-400', business:'text-green-400', creative:'text-yellow-400', compliance:'text-red-400'
  }

  const memberCards = members.map(m => `
  <div class="glass rounded-xl p-4 flex items-start gap-3">
    <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
        style="background:${m.color}">
      ${m.type === 'digital' ? '<i class="fas fa-robot" style="font-size:14px"></i>' : m.name.charAt(0)}
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-0.5">
        <span class="font-medium text-white text-sm truncate">${m.name}</span>
        <span class="text-xs px-1.5 py-0.5 rounded ${m.type==='digital' ? 'bg-violet-900 text-violet-300' : 'bg-gray-700 text-gray-300'}">${m.type==='digital'?(isRu?'AI':'AI'):(isRu?'Человек':'Human')}</span>
      </div>
      <p class="text-xs text-gray-400 truncate">${m.role}</p>
      <div class="flex flex-wrap gap-1 mt-2">
        ${m.skills.map(s => `<span class="text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">${s}</span>`).join('')}
      </div>
    </div>
  </div>`).join('')

  const deptCards = departments.map(d => `
  <div class="glass rounded-xl p-4 border-l-4" style="border-left-color:${d.color}">
    <div class="flex items-center justify-between mb-2">
      <h3 class="font-semibold text-white text-sm">${d.name}</h3>
      <span class="text-xs text-gray-400">${d.members} ${isRu?'чел.':'members'}</span>
    </div>
    <p class="text-xs text-gray-400"><i class="fas fa-user mr-1"></i>${isRu?'Руководитель':'Head'}: ${d.head}</p>
    <div class="w-full bg-gray-800 rounded-full h-1 mt-3">
      <div class="h-1 rounded-full" style="width:${Math.round(d.members/8*100)}%;background:${d.color}"></div>
    </div>
  </div>`).join('')

  const skillBars = skills.map(s => `
  <div class="flex items-center gap-3">
    <div class="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
      <i class="fas ${s.icon} ${catColor[s.category]||'text-gray-400'}" style="font-size:12px"></i>
    </div>
    <div class="flex-1">
      <div class="flex items-center justify-between text-xs mb-1">
        <span class="text-gray-300">${s.name}</span>
        <span class="text-white font-medium">${s.level}%</span>
      </div>
      <div class="w-full bg-gray-800 rounded-full h-1.5">
        <div class="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style="width:${s.level}%"></div>
      </div>
    </div>
  </div>`).join('')

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t.title, '', lang)}
  <style>
    .tab-btn.active { background:rgba(59,130,246,0.2); color:white; border-bottom:2px solid #3b82f6; }
  </style>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${sidebar('company', lang)}
  <main class="ml-56 pt-4 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 pb-10">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-white">${t.title}</h1>
          <p class="text-gray-400 text-sm mt-0.5">${isRu ? 'Команда людей и цифровых сотрудников' : 'Human and digital employee team'}</p>
        </div>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
          <i class="fas fa-plus"></i> ${t.addMember}
        </button>
      </div>

      <!-- Summary row -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        ${[
          { label: isRu?'Сотрудников':'Members',  v:members.length, icon:'fa-users',     c:'text-blue-400'   },
          { label: t.human,                         v:members.filter(m=>m.type==='human').length,  icon:'fa-user',     c:'text-green-400'  },
          { label: t.digital,                       v:members.filter(m=>m.type==='digital').length,icon:'fa-robot',    c:'text-violet-400' },
          { label: isRu?'Отделов':'Departments',   v:departments.length, icon:'fa-sitemap', c:'text-yellow-400' },
        ].map(s => `<div class="glass rounded-xl p-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-xs">${s.label}</span>
            <i class="fas ${s.icon} ${s.c}" style="font-size:13px"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-1">${s.v}</p>
        </div>`).join('')}
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 border-b border-gray-800 mb-5">
        ${[
          { id:'overview',  label: t.overview },
          { id:'team',      label: t.team },
          { id:'org',       label: t.orgStructure },
          { id:'skills',    label: t.skills },
        ].map((tab,i) => `
        <button onclick="showTab('${tab.id}')" data-tab="${tab.id}"
            class="tab-btn px-4 py-2 text-sm text-gray-400 rounded-t-lg hover:text-white transition ${i===0?'active':''}">
          ${tab.label}
        </button>`).join('')}
      </div>

      <!-- Overview tab -->
      <div id="tab-overview" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="glass rounded-xl p-5">
            <h3 class="text-sm font-semibold text-white mb-3">${isRu ? 'Активность за неделю' : 'Weekly Activity'}</h3>
            <div class="space-y-2">
              ${[
                { label: isRu?'Задач выполнено':'Tasks completed',   value:'43', color:'text-green-400' },
                { label: isRu?'AI-запросов':'AI requests',          value:'847', color:'text-blue-400'  },
                { label: isRu?'Потрачено':'Spent',                   value:'$38.08', color:'text-yellow-400' },
                { label: isRu?'Сэкономлено часов':'Hours saved',    value:'~120h', color:'text-violet-400' },
              ].map(row => `<div class="flex items-center justify-between text-sm">
                <span class="text-gray-400">${row.label}</span>
                <span class="${row.color} font-medium">${row.value}</span>
              </div>`).join('')}
            </div>
          </div>
          <div class="glass rounded-xl p-5">
            <h3 class="text-sm font-semibold text-white mb-3">${isRu ? 'Топ агенты' : 'Top Agents'}</h3>
            <div class="space-y-2.5">
              ${[
                { name: isRu?'Исследователь':'Researcher', tasks:187, pct:85 },
                { name: isRu?'Маркетолог':'Analyst',       tasks:152, pct:70 },
                { name: isRu?'Копирайтер':'Copywriter',    tasks:143, pct:65 },
                { name: isRu?'Продажник':'Sales',          tasks:98,  pct:45 },
              ].map(a => `<div>
                <div class="flex justify-between text-xs text-gray-400 mb-1">
                  <span>${a.name}</span><span>${a.tasks} ${t.tasks}</span>
                </div>
                <div class="w-full bg-gray-800 h-1.5 rounded-full">
                  <div class="h-1.5 rounded-full bg-blue-500" style="width:${a.pct}%"></div>
                </div>
              </div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Team tab -->
      <div id="tab-team" class="hidden">
        <div class="flex gap-3 mb-4">
          <button onclick="filterMembers('all')" data-mf="all"
              class="member-filter text-xs px-3 py-1.5 rounded-lg bg-blue-700 text-white">
            ${isRu?'Все':'All'} (${members.length})
          </button>
          <button onclick="filterMembers('human')" data-mf="human"
              class="member-filter text-xs px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white">
            ${t.human} (${members.filter(m=>m.type==='human').length})
          </button>
          <button onclick="filterMembers('digital')" data-mf="digital"
              class="member-filter text-xs px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white">
            ${t.digital} (${members.filter(m=>m.type==='digital').length})
          </button>
        </div>
        <div id="members-grid" class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${memberCards}
        </div>
      </div>

      <!-- Org tab -->
      <div id="tab-org" class="hidden">
        <!-- CEO row -->
        <div class="flex justify-center mb-6">
          <div class="glass rounded-xl p-4 text-center border border-violet-700/30 min-w-40">
            <div class="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center mx-auto mb-2 text-white font-bold">E</div>
            <p class="font-semibold text-white text-sm">Eugene</p>
            <p class="text-xs text-gray-400">${isRu?'Генеральный директор':'CEO'}</p>
          </div>
        </div>
        <!-- Depts row -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          ${deptCards}
        </div>
      </div>

      <!-- Skills tab -->
      <div id="tab-skills" class="hidden">
        <div class="glass rounded-xl p-5">
          <h3 class="text-sm font-semibold text-white mb-4">${isRu ? 'Матрица навыков команды' : 'Team Skills Matrix'}</h3>
          <div class="space-y-4">
            ${skillBars}
          </div>
        </div>
      </div>

    </div>
  </main>

  <script>
  function showTab(id) {
    ['overview','team','org','skills'].forEach(function(t) {
      document.getElementById('tab-'+t).classList.add('hidden');
      var btn = document.querySelector('[data-tab="'+t+'"]');
      if (btn) btn.classList.remove('active');
    });
    document.getElementById('tab-'+id).classList.remove('hidden');
    var btn = document.querySelector('[data-tab="'+id+'"]');
    if (btn) btn.classList.add('active');
  }

  function filterMembers(type) {
    document.querySelectorAll('.member-filter').forEach(function(el) {
      el.classList.remove('bg-blue-700','text-white');
      el.classList.add('bg-gray-800','text-gray-400');
    });
    document.querySelector('[data-mf="'+type+'"]').classList.add('bg-blue-700','text-white');
  }
  </script>
</body>
</html>`
}
