import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const goalsPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const t = {
    title:    isRu ? 'Цели и OKR'       : 'Goals & OKR',
    newGoal:  isRu ? '+ Новая цель'     : '+ New Goal',
    period:   isRu ? 'Период'           : 'Period',
    on_track: isRu ? 'В графике'        : 'On Track',
    at_risk:  isRu ? 'Под угрозой'      : 'At Risk',
    achieved: isRu ? 'Достигнуто'       : 'Achieved',
    missed:   isRu ? 'Не достигнуто'    : 'Missed',
    progress: isRu ? 'Прогресс'         : 'Progress',
    keyResults: isRu ? 'Ключевые результаты' : 'Key Results',
    owner:    isRu ? 'Ответственный'    : 'Owner',
  }

  const goals = [
    { id:'g1', title: isRu ? 'Вырасти выручку на 40%' : 'Grow revenue by 40%',
      owner:'Eugene', period:'Q2-2025', status:'on_track', progress:62,
      krs:[
        { title: isRu ? 'Привлечь 50 новых клиентов' : 'Acquire 50 new clients', current:31, target:50, unit:'клиентов' },
        { title: isRu ? 'Увеличить средний чек до $2k' : 'Raise average deal to $2k', current:1650, target:2000, unit:'$' },
        { title: isRu ? 'Снизить churn до 3%' : 'Reduce churn to 3%', current:4.2, target:3, unit:'%', inverse:true },
      ]
    },
    { id:'g2', title: isRu ? 'Автоматизировать 80% рутинных задач' : 'Automate 80% of routine tasks',
      owner:'Eugene', period:'Q2-2025', status:'on_track', progress:55,
      krs:[
        { title: isRu ? 'Запустить 10 AI-сценариев' : 'Launch 10 AI scenarios', current:6, target:10, unit:'' },
        { title: isRu ? 'Сократить ручной труд на 20ч/нед' : 'Reduce manual work by 20h/week', current:12, target:20, unit:'ч' },
        { title: isRu ? 'Точность AI > 90%' : 'AI accuracy > 90%', current:87, target:90, unit:'%' },
      ]
    },
    { id:'g3', title: isRu ? 'Выйти на 3 новых рынка' : 'Enter 3 new markets',
      owner:'Eugene', period:'Q2-2025', status:'at_risk', progress:33,
      krs:[
        { title: isRu ? 'Завершить исследование 3 рынков' : 'Complete research for 3 markets', current:1, target:3, unit:'' },
        { title: isRu ? 'Подготовить локализованный продукт' : 'Prepare localized product', current:0, target:1, unit:'' },
        { title: isRu ? 'Первые продажи в каждом рынке' : 'First sales in each market', current:0, target:3, unit:'' },
      ]
    },
    { id:'g4', title: isRu ? 'Построить команду цифровых сотрудников' : 'Build digital employee team',
      owner:'Eugene', period:'Q2-2025', status:'achieved', progress:100,
      krs:[
        { title: isRu ? 'Настроить 15 ролей агентов' : 'Configure 15 agent roles', current:15, target:15, unit:'' },
        { title: isRu ? 'Запустить Meta-Orchestrator' : 'Launch Meta-Orchestrator', current:1, target:1, unit:'' },
        { title: isRu ? 'Выполнить 100 задач успешно' : 'Complete 100 tasks successfully', current:143, target:100, unit:'' },
      ]
    },
  ]

  const statusStyle: Record<string,{cls:string,dot:string}> = {
    on_track: { cls:'bg-green-900/50 text-green-300 border border-green-700/50',  dot:'bg-green-400' },
    at_risk:  { cls:'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50', dot:'bg-yellow-400' },
    achieved: { cls:'bg-blue-900/50 text-blue-300 border border-blue-700/50',     dot:'bg-blue-400'  },
    missed:   { cls:'bg-red-900/50 text-red-300 border border-red-700/50',        dot:'bg-red-400'   },
  }

  const cards = goals.map(g => {
    const ss = statusStyle[g.status] || statusStyle.on_track
    const pColor = g.status === 'achieved' ? '#3b82f6' : g.status === 'at_risk' ? '#eab308' : '#10b981'

    const krItems = g.krs.map(kr => {
      const pct = kr.inverse
        ? Math.max(0, Math.min(100, Math.round((kr.target / kr.current) * 100)))
        : Math.min(100, Math.round((kr.current / kr.target) * 100))
      return `<div>
        <div class="flex items-center justify-between text-xs mb-1">
          <span class="text-gray-300 truncate flex-1 mr-2">${kr.title}</span>
          <span class="text-gray-400 flex-shrink-0">${kr.current}/${kr.target}${kr.unit}</span>
        </div>
        <div class="w-full bg-gray-800 rounded-full h-1">
          <div class="h-1 rounded-full" style="width:${pct}%;background:${pColor}"></div>
        </div>
      </div>`
    }).join('')

    return `
    <div class="glass rounded-2xl p-5 flex flex-col gap-4">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-white text-sm leading-snug">${g.title}</h3>
          <div class="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
            <span><i class="fas fa-user mr-1"></i>${g.owner}</span>
            <span><i class="fas fa-calendar mr-1"></i>${g.period}</span>
          </div>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-full flex-shrink-0 ${ss.cls}">
          <span class="inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${ss.dot} align-middle"></span>${(t as any)[g.status] || g.status}
        </span>
      </div>

      <!-- Overall progress -->
      <div>
        <div class="flex items-center justify-between text-xs mb-1.5">
          <span class="text-gray-400">${t.progress}</span>
          <span class="text-white font-bold">${g.progress}%</span>
        </div>
        <div class="w-full bg-gray-800 rounded-full h-2">
          <div class="h-2 rounded-full transition-all" style="width:${g.progress}%;background:${pColor}"></div>
        </div>
      </div>

      <!-- Key Results -->
      <div>
        <p class="text-xs text-gray-500 mb-2 uppercase tracking-wider">${t.keyResults}</p>
        <div class="space-y-2.5">${krItems}</div>
      </div>
    </div>`
  }).join('')

  const summary = [
    { label: t.on_track, count: goals.filter(g=>g.status==='on_track').length, color:'text-green-400' },
    { label: t.at_risk,  count: goals.filter(g=>g.status==='at_risk').length,  color:'text-yellow-400' },
    { label: t.achieved, count: goals.filter(g=>g.status==='achieved').length, color:'text-blue-400' },
    { label: t.missed,   count: goals.filter(g=>g.status==='missed').length,   color:'text-red-400' },
  ]

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t.title, '', lang)}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${sidebar('goals', lang)}
  <main class="ml-56 pt-4 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 pb-10">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-white">${t.title}</h1>
          <p class="text-gray-400 text-sm mt-0.5">${isRu ? 'Цели компании и ключевые результаты' : 'Company goals and key results'}</p>
        </div>
        <div class="flex items-center gap-3">
          <select class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none">
            <option>Q2-2025</option>
            <option>Q3-2025</option>
            <option>2025</option>
          </select>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
            <i class="fas fa-plus"></i> ${t.newGoal}
          </button>
        </div>
      </div>

      <!-- Summary chips -->
      <div class="flex gap-4 mb-6">
        ${summary.map(s => `
        <div class="glass rounded-xl px-4 py-3 flex items-center gap-3">
          <span class="text-2xl font-bold ${s.color}">${s.count}</span>
          <span class="text-gray-400 text-sm">${s.label}</span>
        </div>`).join('')}
        <div class="glass rounded-xl px-4 py-3 flex items-center gap-3 ml-auto">
          <span class="text-gray-400 text-sm">${isRu ? 'Средний прогресс' : 'Avg Progress'}</span>
          <span class="text-2xl font-bold text-white">${Math.round(goals.reduce((a,g)=>a+g.progress,0)/goals.length)}%</span>
        </div>
      </div>

      <!-- Goals grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${cards}
      </div>
    </div>
  </main>
</body>
</html>`
}
