import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const expensesPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const t = {
    title:    isRu ? 'Расходы'             : 'Expenses',
    total:    isRu ? 'Всего потрачено'      : 'Total Spent',
    budget:   isRu ? 'Бюджет'              : 'Budget',
    remaining:isRu ? 'Остаток'             : 'Remaining',
    daily:    isRu ? 'В среднем в день'     : 'Daily Average',
    byModel:  isRu ? 'По моделям'          : 'By Model',
    byProject:isRu ? 'По проектам'         : 'By Project',
    byAgent:  isRu ? 'По агентам'          : 'By Agent',
    model:    isRu ? 'Модель'              : 'Model',
    calls:    isRu ? 'Вызовов'             : 'Calls',
    cost:     isRu ? 'Стоимость'           : 'Cost',
    share:    isRu ? 'Доля'               : 'Share',
    period:   isRu ? 'Период'              : 'Period',
    export:   isRu ? 'Экспорт CSV'         : 'Export CSV',
  }

  const modelData = [
    { name:'GPT-4o',           calls:234, cost:12.47, color:'#10a37f' },
    { name:'Claude 3.5 Sonnet',calls:198, cost:9.31,  color:'#d4aa70' },
    { name:'Gemini 1.5 Pro',   calls:176, cost:6.18,  color:'#4285f4' },
    { name:'Llama 3.1 70B',    calls:145, cost:2.84,  color:'#7f52ff' },
    { name:'Mistral Large',    calls:132, cost:4.62,  color:'#ff6b35' },
    { name:'Qwen 2.5 72B',     calls:98,  cost:1.93,  color:'#00b4d8' },
    { name:'DeepSeek V3',      calls:64,  cost:0.73,  color:'#64dfdf' },
  ]
  const totalCost = modelData.reduce((a,m) => a+m.cost, 0)
  const budget = 60
  const remaining = budget - totalCost

  const projectData = [
    { name: isRu?'Маркетинг Q2':'Marketing Q2',   cost:14.20, color:'#3b82f6' },
    { name: isRu?'Исследования':'Research',        cost:11.80, color:'#8b5cf6' },
    { name: isRu?'Продажи':'Sales',                cost:8.90,  color:'#10b981' },
    { name: isRu?'Прочее':'Other',                 cost:3.18,  color:'#6b7280' },
  ]

  const agentData = [
    { role: isRu?'Исследователь':'Lead Researcher', cost:12.30, calls:187, icon:'fa-search' },
    { role: isRu?'Маркетолог':'Market Analyst',     cost:9.40,  calls:152, icon:'fa-chart-bar' },
    { role: isRu?'Копирайтер':'Copywriter',         cost:7.80,  calls:143, icon:'fa-pen' },
    { role: isRu?'Директор продаж':'Sales Director',cost:5.20,  calls:98,  icon:'fa-handshake' },
    { role: isRu?'Финансист':'Financial Analyst',   cost:3.38,  calls:67,  icon:'fa-dollar-sign' },
  ]

  const dailyData = [
    { day: isRu?'Пн':'Mon', cost:4.2 },
    { day: isRu?'Вт':'Tue', cost:6.8 },
    { day: isRu?'Ср':'Wed', cost:5.1 },
    { day: isRu?'Чт':'Thu', cost:8.3 },
    { day: isRu?'Пт':'Fri', cost:7.5 },
    { day: isRu?'Сб':'Sat', cost:2.4 },
    { day: isRu?'Вс':'Sun', cost:3.8 },
  ]
  const maxDay = Math.max(...dailyData.map(d => d.cost))

  const modelRows = modelData.map(m => {
    const pct = Math.round(m.cost / totalCost * 100)
    return `<tr class="border-b border-gray-800 hover:bg-gray-800/30 transition">
      <td class="py-3 px-4">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${m.color}"></div>
          <span class="text-white text-sm">${m.name}</span>
        </div>
      </td>
      <td class="py-3 px-4 text-gray-300 text-sm">${m.calls}</td>
      <td class="py-3 px-4 text-white text-sm font-medium">$${m.cost.toFixed(2)}</td>
      <td class="py-3 px-4">
        <div class="flex items-center gap-2">
          <div class="flex-1 bg-gray-800 rounded-full h-1.5">
            <div class="h-1.5 rounded-full" style="width:${pct}%;background:${m.color}"></div>
          </div>
          <span class="text-gray-400 text-xs w-8 text-right">${pct}%</span>
        </div>
      </td>
    </tr>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t.title, '', lang)}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${sidebar('expenses', lang)}
  <main class="ml-56 pt-4 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 pb-10">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-white">${t.title}</h1>
          <p class="text-gray-400 text-sm mt-0.5">${isRu ? 'Затраты на AI-вызовы и операции' : 'AI call costs and operations'}</p>
        </div>
        <div class="flex items-center gap-3">
          <select class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none">
            <option>${isRu ? 'Июнь 2025' : 'June 2025'}</option>
            <option>${isRu ? 'Май 2025'  : 'May 2025'}</option>
            <option>${isRu ? 'Апрель 2025' : 'April 2025'}</option>
          </select>
          <button onclick="exportCSV()"
              class="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition">
            <i class="fas fa-download"></i> ${t.export}
          </button>
        </div>
      </div>

      <!-- Summary cards -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div class="glass rounded-xl p-4">
          <p class="text-gray-400 text-xs mb-1">${t.total}</p>
          <p class="text-2xl font-bold text-white">$${totalCost.toFixed(2)}</p>
          <p class="text-xs text-green-400 mt-1"><i class="fas fa-arrow-down mr-1"></i>${isRu ? '12% vs прошлый месяц' : '12% vs last month'}</p>
        </div>
        <div class="glass rounded-xl p-4">
          <p class="text-gray-400 text-xs mb-1">${t.budget}</p>
          <p class="text-2xl font-bold text-white">$${budget.toFixed(2)}</p>
          <div class="w-full bg-gray-800 rounded-full h-1.5 mt-2">
            <div class="h-1.5 rounded-full ${totalCost/budget > 0.85 ? 'bg-red-500' : 'bg-blue-500'}"
                style="width:${Math.min(100, Math.round(totalCost/budget*100))}%"></div>
          </div>
        </div>
        <div class="glass rounded-xl p-4">
          <p class="text-gray-400 text-xs mb-1">${t.remaining}</p>
          <p class="text-2xl font-bold ${remaining > 0 ? 'text-green-400' : 'text-red-400'}">$${remaining.toFixed(2)}</p>
          <p class="text-xs text-gray-500 mt-1">${Math.round(remaining/budget*100)}% ${isRu ? 'от бюджета' : 'of budget'}</p>
        </div>
        <div class="glass rounded-xl p-4">
          <p class="text-gray-400 text-xs mb-1">${t.daily}</p>
          <p class="text-2xl font-bold text-white">$${(totalCost/7).toFixed(2)}</p>
          <p class="text-xs text-gray-500 mt-1">${isRu ? 'за последние 7 дней' : 'last 7 days'}</p>
        </div>
      </div>

      <!-- Charts row -->
      <div class="grid grid-cols-2 gap-4 mb-6">

        <!-- Daily bar chart -->
        <div class="glass rounded-xl p-5">
          <h3 class="text-sm font-semibold text-white mb-4">${isRu ? 'Расходы по дням' : 'Daily Spending'}</h3>
          <div class="flex items-end gap-2 h-24">
            ${dailyData.map(d => `
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full rounded-t-sm bg-blue-500/70 hover:bg-blue-500 transition" style="height:${Math.round(d.cost/maxDay*100)}%" title="$${d.cost}"></div>
              <span class="text-xs text-gray-500">${d.day}</span>
            </div>`).join('')}
          </div>
        </div>

        <!-- Project breakdown donut (visual) -->
        <div class="glass rounded-xl p-5">
          <h3 class="text-sm font-semibold text-white mb-4">${t.byProject}</h3>
          <div class="space-y-3">
            ${projectData.map(p => {
              const pct = Math.round(p.cost / totalCost * 100)
              return `<div>
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="text-gray-300 flex items-center gap-2">
                    <span class="inline-block w-2 h-2 rounded-full" style="background:${p.color}"></span>${p.name}
                  </span>
                  <span class="text-white font-medium">$${p.cost.toFixed(2)} <span class="text-gray-500">${pct}%</span></span>
                </div>
                <div class="w-full bg-gray-800 rounded-full h-1.5">
                  <div class="h-1.5 rounded-full" style="width:${pct}%;background:${p.color}"></div>
                </div>
              </div>`
            }).join('')}
          </div>
        </div>
      </div>

      <!-- By Model table -->
      <div class="glass rounded-xl mb-5">
        <div class="px-5 py-4 border-b border-gray-800">
          <h3 class="text-sm font-semibold text-white">${t.byModel}</h3>
        </div>
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="text-left py-3 px-4 text-xs text-gray-400 font-medium">${t.model}</th>
              <th class="text-left py-3 px-4 text-xs text-gray-400 font-medium">${t.calls}</th>
              <th class="text-left py-3 px-4 text-xs text-gray-400 font-medium">${t.cost}</th>
              <th class="text-left py-3 px-4 text-xs text-gray-400 font-medium">${t.share}</th>
            </tr>
          </thead>
          <tbody>${modelRows}</tbody>
          <tfoot>
            <tr class="border-t border-gray-700">
              <td class="py-3 px-4 text-white font-semibold text-sm">${isRu ? 'Итого' : 'Total'}</td>
              <td class="py-3 px-4 text-gray-300 text-sm">${modelData.reduce((a,m)=>a+m.calls,0)}</td>
              <td class="py-3 px-4 text-white font-bold text-sm">$${totalCost.toFixed(2)}</td>
              <td class="py-3 px-4 text-gray-400 text-sm">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- By Agent table -->
      <div class="glass rounded-xl">
        <div class="px-5 py-4 border-b border-gray-800">
          <h3 class="text-sm font-semibold text-white">${t.byAgent}</h3>
        </div>
        <div class="divide-y divide-gray-800">
          ${agentData.map(a => `
          <div class="flex items-center gap-4 px-5 py-3">
            <div class="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
              <i class="fas ${a.icon} text-gray-400" style="font-size:12px"></i>
            </div>
            <span class="flex-1 text-sm text-white">${a.role}</span>
            <span class="text-xs text-gray-400">${a.calls} ${t.calls}</span>
            <span class="text-sm font-medium text-white w-16 text-right">$${a.cost.toFixed(2)}</span>
            <div class="w-20 bg-gray-800 rounded-full h-1.5">
              <div class="h-1.5 rounded-full bg-violet-500" style="width:${Math.round(a.cost/totalCost*100)}%"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </main>

  <script>
  function exportCSV() {
    var rows = [['Model','Calls','Cost USD']];
    ${JSON.stringify(modelData)}.forEach(function(m) {
      rows.push([m.name, m.calls, m.cost.toFixed(2)]);
    });
    var csv = rows.map(function(r){ return r.join(','); }).join('\\n');
    var blob = new Blob([csv], {type:'text/csv'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'era-dal-expenses.csv';
    a.click();
  }
  </script>
</body>
</html>`
}
