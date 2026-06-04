import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const journalPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'Журнал действий' : 'Action Journal'
  const subtitle = isRu
    ? 'Полная история работы агентов: действия, результаты, стоимость, подтверждения'
    : 'Complete agent activity log: actions, results, cost, and approval gates'

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, subtitle, lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('journal', lang)}

  <main class="ml-56 pt-4 min-h-screen">
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
        <button onclick="exportLogs()" class="text-sm text-gray-400 hover:text-white glass px-3 py-2 rounded-lg flex items-center gap-2">
          <i class="fas fa-download"></i>
          ${isRu ? 'Экспорт' : 'Export'}
        </button>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="glass rounded-xl p-4">
          <div class="flex items-center gap-2 mb-1">
            <i class="fas fa-play-circle text-green-400 text-sm"></i>
            <span class="text-xs text-gray-400">${isRu ? 'Действий сегодня' : 'Actions today'}</span>
          </div>
          <p id="stat-total" class="text-2xl font-bold">—</p>
        </div>
        <div class="glass rounded-xl p-4">
          <div class="flex items-center gap-2 mb-1">
            <i class="fas fa-check-circle text-green-400 text-sm"></i>
            <span class="text-xs text-gray-400">${isRu ? 'Успешно' : 'Successful'}</span>
          </div>
          <p id="stat-success" class="text-2xl font-bold text-green-400">—</p>
        </div>
        <div class="glass rounded-xl p-4">
          <div class="flex items-center gap-2 mb-1">
            <i class="fas fa-times-circle text-red-400 text-sm"></i>
            <span class="text-xs text-gray-400">${isRu ? 'Ошибок' : 'Errors'}</span>
          </div>
          <p id="stat-errors" class="text-2xl font-bold text-red-400">—</p>
        </div>
        <div class="glass rounded-xl p-4">
          <div class="flex items-center gap-2 mb-1">
            <i class="fas fa-dollar-sign text-blue-400 text-sm"></i>
            <span class="text-xs text-gray-400">${isRu ? 'Стоимость сегодня' : 'Cost today'}</span>
          </div>
          <p id="stat-cost" class="text-2xl font-bold text-blue-400">—</p>
        </div>
      </div>

      <!-- Pending approvals banner (hidden until there are pending items) -->
      <div id="pending-banner" style="display:none;"
        class="glass rounded-xl p-4 mb-5 border border-yellow-500/30 bg-yellow-500/5">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            <i class="fas fa-shield-alt text-yellow-400 mt-0.5"></i>
            <div>
              <p id="pending-count-text" class="font-medium text-yellow-300 text-sm"></p>
              <div id="pending-list" class="mt-2 space-y-2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-3 mb-5">
        <select id="filter-status" onchange="filterJournal()"
          class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
          <option value="">${isRu ? 'Все статусы' : 'All statuses'}</option>
          <option value="success">${isRu ? 'Успешно' : 'Success'}</option>
          <option value="error">${isRu ? 'Ошибка' : 'Error'}</option>
          <option value="pending_confirmation">${isRu ? 'Ожидает' : 'Pending'}</option>
          <option value="cancelled">${isRu ? 'Отменено' : 'Cancelled'}</option>
        </select>
        <select id="filter-agent" onchange="filterJournal()"
          class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
          <option value="">${isRu ? 'Все роли' : 'All roles'}</option>
        </select>
        <input id="filter-search" type="text" placeholder="${isRu ? 'Поиск по тексту...' : 'Search...'}"
          oninput="filterJournal()"
          class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 flex-1">
      </div>

      <!-- Journal list -->
      <div id="journal-list" class="space-y-2">
        <div class="text-center py-12 text-gray-600">
          <i class="fas fa-spinner fa-spin text-3xl mb-3"></i>
          <p>${isRu ? 'Загрузка журнала...' : 'Loading journal...'}</p>
        </div>
      </div>

      <div class="flex items-center justify-between mt-6">
        <p id="log-count" class="text-sm text-gray-500"></p>
        <button id="load-more-btn" onclick="loadMore()" style="display:none;"
          class="text-sm text-gray-400 hover:text-white glass px-4 py-2 rounded-lg">
          ${isRu ? 'Загрузить ещё' : 'Load more'}
        </button>
      </div>
    </div>
  </main>

  <script>
    const isRu = ${isRu};
    const lang = '${lang}';

    let allLogs = [];
    let offset = 0;
    const PAGE_SIZE = 20;

    const ROLE_ICONS = {
      lead_researcher:      'fa-search text-blue-400',
      market_analyst:       'fa-chart-bar text-cyan-400',
      copywriter:           'fa-pen-nib text-purple-400',
      quality_controller:   'fa-check-double text-yellow-400',
      crm_agent:            'fa-database text-green-400',
      sales_director:       'fa-bullhorn text-orange-400',
      marketing_strategist: 'fa-bullseye text-pink-400',
      business_radar:       'fa-satellite-dish text-teal-400',
      support_agent:        'fa-headset text-indigo-400',
      project_manager:      'fa-tasks text-indigo-400',
      legal_assistant:      'fa-gavel text-amber-400',
      technical_agent:      'fa-code text-sky-400',
      hr_assistant:         'fa-user-friends text-rose-400',
      financial_analyst:    'fa-coins text-lime-400',
      innovation_strategist:'fa-lightbulb text-yellow-300',
      custom:               'fa-robot text-gray-400',
    };

    function escHtml(s) {
      return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function fmtTime(iso) {
      if (!iso) return '—';
      try { return new Date(iso).toLocaleTimeString(isRu?'ru-RU':'en-US', { hour:'2-digit', minute:'2-digit' }); }
      catch { return '—'; }
    }

    function statusIcon(s) {
      if (s === 'success') return '<i class="fas fa-check-circle text-green-400"></i>';
      if (s === 'error') return '<i class="fas fa-times-circle text-red-400"></i>';
      if (s === 'pending_confirmation') return '<i class="fas fa-clock text-yellow-400"></i>';
      if (s === 'cancelled') return '<i class="fas fa-ban text-gray-500"></i>';
      return '<i class="fas fa-circle text-gray-600"></i>';
    }

    function autonomyBadge(a) {
      if (a === 'SAFE') return '<span class="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">' + (isRu?'авто':'auto') + '</span>';
      if (a === 'REQUIRES_CONFIRMATION') return '<span class="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">' + (isRu?'ждёт':'pending') + '</span>';
      return '<span class="text-xs px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-500 border border-gray-500/20">' + (isRu?'блок':'blocked') + '</span>';
    }

    function renderEntry(e) {
      const iconCls = ROLE_ICONS[e.agentRole] || ROLE_ICONS.custom;
      const costStr = e.costUsd ? '$' + Number(e.costUsd).toFixed(4) : '$0';
      const durStr = e.durationMs ? (e.durationMs / 1000).toFixed(1) + 's' : '—';

      return \`
        <div class="journal-entry glass rounded-xl px-5 py-3.5 hover:border-gray-700 transition"
          data-status="\${e.status}" data-agent="\${e.agentRole}" data-text="\${escHtml(e.action.toLowerCase())}">
          <div class="flex items-start gap-4">
            <div class="flex flex-col items-center pt-1 flex-shrink-0 w-14">
              <span class="text-xs text-gray-500 font-mono">\${fmtTime(e.createdAt)}</span>
              <div class="mt-1">\${statusIcon(e.status)}</div>
            </div>

            <div class="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
              <i class="fas \${iconCls} text-sm"></i>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-0.5">
                <span class="text-sm font-medium text-gray-200">\${e.agentRole.replace(/_/g,' ')}</span>
                \${e.planId ? '<span class="text-xs text-gray-600">·</span><span class="text-xs text-gray-500 font-mono">\${e.planId.slice(0,12)}…</span>' : ''}
                \${autonomyBadge(e.autonomyLevel)}
              </div>
              <p class="text-sm text-gray-400 leading-relaxed">\${escHtml(e.action)}</p>
              \${e.outputData ? '<p class="text-xs text-gray-600 mt-1 line-clamp-1 italic">' + escHtml(e.outputData.slice(0,120)) + '</p>' : ''}
              \${e.errorMessage ? '<p class="text-xs text-red-400 mt-1"><i class="fas fa-exclamation-triangle mr-1"></i>' + escHtml(e.errorMessage) + '</p>' : ''}
            </div>

            <div class="flex flex-col items-end gap-1 flex-shrink-0 text-xs text-gray-500">
              <span class="text-green-400">\${costStr}</span>
              <span>\${durStr}</span>
              \${e.modelId ? '<span class="text-gray-600 max-w-[80px] truncate">\${e.modelId.split('/').at(-1)}</span>' : ''}
            </div>
          </div>

          \${e.status === 'pending_confirmation' ? \`
            <div class="mt-3 pt-3 border-t border-gray-800 flex gap-2">
              <button onclick="approveAction('\${e.id}')"
                class="text-sm px-4 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-1">
                <i class="fas fa-check text-xs"></i>\${isRu?'Одобрить':'Approve'}
              </button>
              <button onclick="rejectAction('\${e.id}')"
                class="text-sm px-4 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 flex items-center gap-1">
                <i class="fas fa-times text-xs"></i>\${isRu?'Отклонить':'Reject'}
              </button>
            </div>
          \` : ''}
        </div>
      \`;
    }

    function renderAll() {
      const container = document.getElementById('journal-list');
      const statusF = document.getElementById('filter-status').value;
      const agentF  = document.getElementById('filter-agent').value;
      const searchF = document.getElementById('filter-search').value.toLowerCase();

      const filtered = allLogs.filter(e => {
        if (statusF && e.status !== statusF) return false;
        if (agentF && e.agentRole !== agentF) return false;
        if (searchF && !e.action.toLowerCase().includes(searchF)) return false;
        return true;
      });

      if (!filtered.length) {
        container.innerHTML = '<div class="text-center py-12 text-gray-600"><i class="fas fa-inbox text-3xl mb-3"></i><p>' +
          (isRu?'Записей нет':'No entries found') + '</p></div>';
        document.getElementById('log-count').textContent = '';
        return;
      }

      container.innerHTML = filtered.map(renderEntry).join('');
      document.getElementById('log-count').textContent =
        (isRu?'Показано записей: ':'Showing: ') + filtered.length;
    }

    function filterJournal() { renderAll(); }

    async function loadLogs(reset = false) {
      if (reset) { allLogs = []; offset = 0; }
      try {
        const res = await fetch('/api/meta/logs?limit=' + PAGE_SIZE + '&offset=' + offset);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        const logs = data.logs || [];
        allLogs = [...allLogs, ...logs];
        offset += logs.length;

        // Build agent filter options from actual data
        const roles = [...new Set(allLogs.map(e => e.agentRole))].sort();
        const agentSel = document.getElementById('filter-agent');
        agentSel.innerHTML = '<option value="">' + (isRu?'Все роли':'All roles') + '</option>' +
          roles.map(r => '<option value="' + r + '">' + r.replace(/_/g,' ') + '</option>').join('');

        document.getElementById('load-more-btn').style.display = logs.length === PAGE_SIZE ? '' : 'none';

        renderPendingBanner();
        renderAll();
      } catch(err) {
        document.getElementById('journal-list').innerHTML =
          '<div class="text-center py-12 text-gray-600"><i class="fas fa-exclamation-circle text-3xl mb-3 text-red-500/50"></i><p>' +
          (isRu?'Не удалось загрузить журнал. Убедитесь, что база данных D1 настроена.':'Failed to load journal. Make sure D1 database is configured.') +
          '</p></div>';
      }
    }

    async function loadStats() {
      try {
        const res = await fetch('/api/meta/logs/today');
        if (!res.ok) return;
        const s = await res.json();
        document.getElementById('stat-total').textContent = s.total ?? '0';
        document.getElementById('stat-success').textContent = s.success ?? '0';
        document.getElementById('stat-errors').textContent = s.errors ?? '0';
        document.getElementById('stat-cost').textContent = '$' + (s.costUsd || 0).toFixed(4);
      } catch { /* silent */ }
    }

    function renderPendingBanner() {
      const pending = allLogs.filter(e => e.status === 'pending_confirmation');
      const banner = document.getElementById('pending-banner');
      if (!pending.length) { banner.style.display = 'none'; return; }

      document.getElementById('pending-count-text').textContent =
        pending.length + ' ' + (isRu
          ? (pending.length===1?'действие ожидает подтверждения':'действий ожидают подтверждения')
          : (pending.length===1?'action awaiting confirmation':'actions awaiting confirmation'));

      document.getElementById('pending-list').innerHTML = pending.map(e => \`
        <div class="flex items-center gap-3">
          <p class="text-xs text-gray-400 flex-1 truncate">\${e.agentRole.replace(/_/g,' ')}: \${escHtml(e.action.slice(0,60))}</p>
          <div class="flex gap-1.5">
            <button onclick="approveAction('\${e.id}')"
              class="text-xs px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium">
              <i class="fas fa-check mr-1"></i>\${isRu?'Одобрить':'Approve'}
            </button>
            <button onclick="rejectAction('\${e.id}')"
              class="text-xs px-3 py-1 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10">
              <i class="fas fa-times mr-1"></i>\${isRu?'Отклонить':'Reject'}
            </button>
          </div>
        </div>
      \`).join('');

      banner.style.display = '';
    }

    async function approveAction(logId) {
      try {
        const res = await fetch('/api/meta/logs/' + logId + '/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'user' }),
        });
        if (res.ok) {
          allLogs = allLogs.map(e => e.id === logId ? { ...e, status: 'success' } : e);
          renderPendingBanner();
          renderAll();
          loadStats();
        }
      } catch(e) { alert(e.message); }
    }

    async function rejectAction(logId) {
      allLogs = allLogs.map(e => e.id === logId ? { ...e, status: 'cancelled' } : e);
      renderPendingBanner();
      renderAll();
    }

    function loadMore() { loadLogs(false); }

    function exportLogs() {
      const rows = allLogs.map(e => [
        e.createdAt, e.agentRole, e.status, e.action, e.costUsd || 0, e.durationMs || 0
      ]);
      const csv = ['time,role,status,action,costUsd,durationMs', ...rows.map(r => r.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(','))].join('\\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'era-dal-journal.csv';
      a.click();
    }

    // Init
    loadLogs(true);
    loadStats();
  </script>
</body>
</html>
`
}
