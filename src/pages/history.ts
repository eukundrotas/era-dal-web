import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const historyPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'История запусков' : 'Run History'

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, isRu ? 'История выполнения задач мета-оркестратора' : 'Meta-orchestrator task execution history', lang)}
  <script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.9/dist/purify.min.js"></script>
  <style>
    .result-md { font-size:12px; line-height:1.65; color:#d1d5db; word-break:break-word; }
    .result-md > *:first-child { margin-top:0; }
    .result-md h1,.result-md h2,.result-md h3,.result-md h4 { color:#fff; font-weight:600; margin:.8em 0 .4em; line-height:1.3; }
    .result-md h1{font-size:1.2em} .result-md h2{font-size:1.1em} .result-md h3{font-size:1em} .result-md h4{font-size:.95em}
    .result-md p{margin:.4em 0}
    .result-md ul,.result-md ol{margin:.4em 0; padding-left:1.3em}
    .result-md li{margin:.18em 0}
    .result-md strong{color:#fff}
    .result-md a{color:#818cf8; text-decoration:underline}
    .result-md code{background:rgba(255,255,255,.08); padding:1px 4px; border-radius:3px; font-size:.88em}
    .result-md pre{background:rgba(0,0,0,.4); padding:8px 10px; border-radius:7px; overflow-x:auto; margin:.5em 0}
    .result-md pre code{background:none; padding:0}
    .result-md table{border-collapse:collapse; width:100%; margin:.6em 0; font-size:11px; display:block; overflow-x:auto}
    .result-md th,.result-md td{border:1px solid rgba(255,255,255,.12); padding:5px 8px; text-align:left; vertical-align:top}
    .result-md th{background:rgba(255,255,255,.06); color:#e5e7eb; font-weight:600}
    .result-md blockquote{border-left:3px solid rgba(139,92,246,.5); padding-left:8px; color:#9ca3af; margin:.5em 0}
    .result-md hr{border:none; border-top:1px solid rgba(255,255,255,.1); margin:.8em 0}
    .status-completed { background:rgba(16,185,129,.15); color:#34d399; border-color:rgba(16,185,129,.3); }
    .status-failed     { background:rgba(239,68,68,.15);   color:#f87171; border-color:rgba(239,68,68,.3); }
    .status-paused     { background:rgba(245,158,11,.15);  color:#fbbf24; border-color:rgba(245,158,11,.3); }
    .status-running    { background:rgba(59,130,246,.15);  color:#60a5fa; border-color:rgba(59,130,246,.3); }
    .status-draft      { background:rgba(107,114,128,.15); color:#9ca3af; border-color:rgba(107,114,128,.3); }
    .strategy-badge    { font-size:10px; font-weight:700; letter-spacing:.06em; padding:2px 7px; border-radius:5px; }
    .strategy-SINGLE   { background:rgba(59,130,246,.2);   color:#93c5fd; }
    .strategy-PARALLEL { background:rgba(139,92,246,.2);   color:#c4b5fd; }
    .strategy-RELAY    { background:rgba(6,182,212,.2);    color:#67e8f9; }
    .strategy-FALLBACK { background:rgba(249,115,22,.2);   color:#fdba74; }
    .strategy-VERIFIED { background:rgba(16,185,129,.2);   color:#6ee7b7; }
    .strategy-DEBATE   { background:rgba(236,72,153,.2);   color:#f9a8d4; }
    .strategy-PLANNER  { background:rgba(234,179,8,.2);    color:#fde68a; }
    .strategy-EXPERT_PANEL { background:rgba(99,102,241,.2); color:#a5b4fc; }
    .fade-in { animation:fadeIn .25s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
    .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('history', lang)}

  <main class="ml-56 pt-4 min-h-screen">
    <div class="p-6 max-w-6xl">

      <!-- Header -->
      <div class="flex items-start justify-between mb-6">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
              <i class="fas fa-history text-white text-sm"></i>
            </div>
            <h1 class="text-2xl font-bold">${title}</h1>
          </div>
          <p class="text-gray-400 ml-12">${isRu ? 'Все задачи, выполненные мета-оркестратором' : 'All tasks executed by the meta-orchestrator'}</p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="exportCSV()"
            class="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white text-sm flex items-center gap-2 transition">
            <i class="fas fa-download"></i> ${isRu ? 'CSV' : 'Export CSV'}
          </button>
          <a href="/meta?lang=${lang}"
            class="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm flex items-center gap-2 transition">
            <i class="fas fa-plus"></i> ${isRu ? 'Новая задача' : 'New task'}
          </a>
        </div>
      </div>

      <!-- Filters -->
      <div class="glass rounded-xl p-4 mb-5">
        <div class="flex flex-wrap items-center gap-3">
          <div class="flex-1 min-w-[180px]">
            <input type="text" id="search-input" placeholder="${isRu ? 'Поиск по тексту задачи…' : 'Search task text…'}"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500">
          </div>
          <select id="filter-status"
            class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500">
            <option value="">${isRu ? 'Все статусы' : 'All statuses'}</option>
            <option value="completed">${isRu ? 'Завершено' : 'Completed'}</option>
            <option value="paused">${isRu ? 'На паузе' : 'Paused'}</option>
            <option value="running">${isRu ? 'Выполняется' : 'Running'}</option>
            <option value="failed">${isRu ? 'Ошибка' : 'Failed'}</option>
            <option value="draft">${isRu ? 'Черновик' : 'Draft'}</option>
          </select>
          <select id="filter-strategy"
            class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500">
            <option value="">${isRu ? 'Все стратегии' : 'All strategies'}</option>
            <option value="SINGLE">SINGLE</option>
            <option value="PARALLEL">PARALLEL</option>
            <option value="RELAY">RELAY</option>
            <option value="FALLBACK">FALLBACK</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="DEBATE">DEBATE</option>
            <option value="PLANNER">PLANNER</option>
            <option value="EXPERT_PANEL">EXPERT PANEL</option>
          </select>
          <button onclick="applyFilters()"
            class="px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm transition">
            <i class="fas fa-search mr-1"></i>${isRu ? 'Найти' : 'Search'}
          </button>
        </div>
      </div>

      <!-- Stats bar -->
      <div id="stats-bar" class="flex items-center gap-6 mb-4 text-sm text-gray-400">
        <span id="stats-total" class="flex items-center gap-1"><i class="fas fa-list-ul"></i> —</span>
        <span id="stats-completed" class="text-green-400 flex items-center gap-1"><i class="fas fa-check-circle"></i> —</span>
        <span id="stats-failed" class="text-red-400 flex items-center gap-1"><i class="fas fa-times-circle"></i> —</span>
      </div>

      <!-- List -->
      <div id="history-list" class="space-y-3"></div>

      <!-- Load more -->
      <div id="load-more-wrap" class="mt-5 text-center hidden">
        <button onclick="loadMore()"
          class="px-5 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-sm transition">
          <i class="fas fa-chevron-down mr-2"></i>${isRu ? 'Загрузить ещё' : 'Load more'}
        </button>
      </div>

    </div>
  </main>

  <!-- Detail modal -->
  <div id="detail-modal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" style="display:none">
    <div class="glass rounded-2xl max-w-2xl w-full mx-4 max-h-[85vh] overflow-y-auto p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold">${isRu ? 'Детали запуска' : 'Run details'}</h2>
        <button onclick="closeModal()" class="text-gray-400 hover:text-white transition"><i class="fas fa-times"></i></button>
      </div>
      <div id="modal-body" class="space-y-4"></div>
    </div>
  </div>

  <script>
    const isRu = ${isRu};
    const LIMIT = 20;
    let offset = 0;
    let totalCount = 0;
    let allLoaded = [];

    // ─── Load ─────────────────────────────────────────────────────────────────

    async function loadHistory(reset) {
      if (reset) { offset = 0; allLoaded = []; document.getElementById('history-list').innerHTML = ''; }

      const status   = document.getElementById('filter-status').value;
      const strategy = document.getElementById('filter-strategy').value;
      const search   = document.getElementById('search-input').value.trim();

      const params = new URLSearchParams({ limit: LIMIT, offset });
      if (status)   params.set('status', status);
      if (strategy) params.set('strategy', strategy);
      if (search)   params.set('search', search);

      try {
        const res = await fetch('/api/history?' + params);
        const data = await res.json();
        totalCount = data.total ?? 0;
        allLoaded = allLoaded.concat(data.items ?? []);
        offset += (data.items ?? []).length;
        renderList(data.items ?? [], reset);
        updateStats();
        document.getElementById('load-more-wrap').classList.toggle('hidden', offset >= totalCount);
      } catch (err) {
        document.getElementById('history-list').innerHTML = \`
          <div class="glass rounded-xl p-8 text-center text-gray-500">
            <i class="fas fa-exclamation-triangle text-2xl mb-3 text-yellow-500"></i>
            <p>\${isRu ? 'Не удалось загрузить историю' : 'Could not load history'}</p>
            <p class="text-xs mt-1">\${err.message}</p>
          </div>
        \`;
      }
    }

    function loadMore() { loadHistory(false); }
    function applyFilters() { loadHistory(true); }

    // ─── Render ───────────────────────────────────────────────────────────────

    function renderList(items, reset) {
      const container = document.getElementById('history-list');
      if (reset && items.length === 0) {
        container.innerHTML = \`
          <div class="glass rounded-xl p-12 text-center">
            <i class="fas fa-inbox text-4xl text-gray-600 mb-4"></i>
            <p class="text-gray-400 text-lg font-medium">\${isRu ? 'История пуста' : 'No runs yet'}</p>
            <p class="text-gray-600 text-sm mb-6">\${isRu ? 'Запустите первую задачу в мета-оркестраторе' : 'Run your first task in the meta-orchestrator'}</p>
            <a href="/meta?lang=\${isRu ? 'ru' : 'en'}"
              class="px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm inline-flex items-center gap-2 transition">
              <i class="fas fa-sitemap"></i>\${isRu ? 'Открыть Мета-Оркестратор' : 'Open Meta-Orchestrator'}
            </a>
          </div>
        \`;
        return;
      }
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass rounded-xl p-4 card-hover cursor-pointer fade-in';
        card.onclick = () => showDetail(item);
        card.innerHTML = renderCard(item);
        container.appendChild(card);
      });
    }

    function statusBadge(s) {
      const labels = { completed: isRu ? 'Завершено' : 'Completed', failed: isRu ? 'Ошибка' : 'Failed',
        paused: isRu ? 'Пауза' : 'Paused', running: isRu ? 'Выполняется' : 'Running', draft: isRu ? 'Черновик' : 'Draft' };
      const icons  = { completed:'check', failed:'times', paused:'pause', running:'spinner fa-spin', draft:'pencil-alt' };
      return \`<span class="status-\${s} border rounded-full px-2.5 py-0.5 text-xs flex items-center gap-1">
        <i class="fas fa-\${icons[s] || 'circle'}"></i>\${labels[s] || s}
      </span>\`;
    }

    function relTime(iso) {
      if (!iso) return '—';
      const m = Math.floor((Date.now() - new Date(iso)) / 60000);
      if (m < 1) return isRu ? 'только что' : 'just now';
      if (m < 60) return isRu ? m + ' мин' : m + 'm ago';
      const h = Math.floor(m / 60);
      if (h < 24) return isRu ? h + ' ч' : h + 'h ago';
      return isRu ? Math.floor(h/24) + ' д' : Math.floor(h/24) + 'd ago';
    }

    function fmtCost(usd) {
      if (!usd && usd !== 0) return '—';
      return usd < 0.001 ? '<$0.001' : '$' + usd.toFixed(4);
    }

    function renderCard(item) {
      const prompt = escHtml(item.prompt.length > 120 ? item.prompt.slice(0, 117) + '…' : item.prompt);
      const doneOf = item.stepCount > 0 ? \`\${item.doneCount}/\${item.stepCount}\` : '—';
      const cost   = item.actualCostUsd != null ? fmtCost(item.actualCostUsd) : fmtCost(item.estimatedCostUsd) + '*';
      return \`
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center flex-wrap gap-2 mb-2">
              \${statusBadge(item.status)}
              <span class="strategy-badge strategy-\${item.strategy}">\${item.strategy}</span>
              <span class="text-gray-500 text-xs">\${relTime(item.createdAt)}</span>
            </div>
            <p class="text-white text-sm leading-snug line-clamp-2">\${prompt}</p>
          </div>
          <div class="text-right shrink-0 text-xs text-gray-400 space-y-1 ml-2">
            <div><i class="fas fa-tasks mr-1 text-violet-400"></i>\${doneOf} \${isRu ? 'шагов' : 'steps'}</div>
            <div><i class="fas fa-dollar-sign mr-1 text-green-400"></i>\${cost}</div>
          </div>
        </div>
      \`;
    }

    function updateStats() {
      const completed = allLoaded.filter(i => i.status === 'completed').length;
      const failed    = allLoaded.filter(i => i.status === 'failed').length;
      document.getElementById('stats-total').innerHTML =
        \`<i class="fas fa-list-ul"></i> \${totalCount} \${isRu ? 'всего' : 'total'}\`;
      document.getElementById('stats-completed').innerHTML =
        \`<i class="fas fa-check-circle"></i> \${completed} \${isRu ? 'завершено' : 'completed'}\`;
      document.getElementById('stats-failed').innerHTML =
        \`<i class="fas fa-times-circle"></i> \${failed} \${isRu ? 'ошибок' : 'failed'}\`;
    }

    // ─── Detail modal ──────────────────────────────────────────────────────────

    async function showDetail(item) {
      document.getElementById('detail-modal').style.display = 'flex';
      document.getElementById('modal-body').innerHTML =
        '<div class="text-center text-gray-500 py-8"><i class="fas fa-spinner fa-spin text-2xl"></i></div>';

      try {
        const res  = await fetch('/api/meta/plans/' + item.id);
        const plan = await res.json();
        const steps = plan.steps ?? [];
        document.getElementById('modal-body').innerHTML = \`
          <div>
            <p class="text-gray-400 text-xs mb-1">${isRu ? 'Задача' : 'Task'}</p>
            <p class="text-white text-sm">\${escHtml(item.prompt)}</p>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div class="bg-gray-800/60 rounded-lg p-3 text-center">
              <p class="text-gray-500 text-xs">${isRu ? 'Стратегия' : 'Strategy'}</p>
              <p class="text-white text-sm font-semibold mt-1">\${item.strategy}</p>
            </div>
            <div class="bg-gray-800/60 rounded-lg p-3 text-center">
              <p class="text-gray-500 text-xs">${isRu ? 'Шагов' : 'Steps'}</p>
              <p class="text-white text-sm font-semibold mt-1">\${item.doneCount}/\${item.stepCount}</p>
            </div>
            <div class="bg-gray-800/60 rounded-lg p-3 text-center">
              <p class="text-gray-500 text-xs">${isRu ? 'Стоимость' : 'Cost'}</p>
              <p class="text-green-400 text-sm font-semibold mt-1">\${item.actualCostUsd != null ? fmtCost(item.actualCostUsd) : fmtCost(item.estimatedCostUsd)}</p>
            </div>
          </div>
          \${steps.length > 0 ? \`
            <div>
              <p class="text-gray-400 text-xs mb-2">${isRu ? 'Шаги' : 'Steps'}</p>
              <div class="space-y-2">
              \${steps.map((s, i) => \`
                <div class="flex items-start gap-3 bg-gray-800/40 rounded-lg p-3">
                  <span class="text-violet-400 font-mono text-xs mt-0.5">\${i+1}</span>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs text-gray-300 font-medium">\${roleName(s.agentRole)}</span>
                      <span class="text-xs px-1.5 py-0.5 rounded
                        \${s.status==='done'?'bg-green-500/20 text-green-400':s.status==='failed'?'bg-red-500/20 text-red-400':'bg-gray-700 text-gray-400'}">\${s.status}</span>
                    </div>
                    <p class="text-gray-300 text-xs leading-snug">\${escHtml(s.action)}</p>
                    \${s.outputData ? \`
                      <p class="text-gray-500 text-xs mt-1 line-clamp-2 step-output-preview">\${escHtml(s.outputData.slice(0,200))}\${s.outputData.length > 200 ? '…' : ''}</p>
                      <div class="step-output-full" style="display:none"><div class="result-md mt-2 border-t border-gray-700/50 pt-2">\${renderMd(s.outputData)}</div></div>
                      <button onclick="toggleStepOutput(this)"
                        class="text-violet-400 hover:text-violet-300 text-xs mt-1 transition">${isRu ? 'Показать вывод ▸' : 'Show output ▸'}</button>
                    \` : ''}
                  </div>
                </div>
              \`).join('')}
              </div>
            </div>
          \` : ''}
          <div class="flex gap-3 pt-2">
            <a href="/meta?lang=${lang}&task=\${encodeURIComponent(item.prompt)}"
              class="flex-1 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm text-center transition">
              <i class="fas fa-redo mr-2"></i>${isRu ? 'Повторить' : 'Re-run'}
            </a>
            <button onclick="copyToClipboard(\`\${escHtml(item.prompt).replace(/\`/g, "'")}\`)"
              class="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm transition">
              <i class="fas fa-copy mr-2"></i>${isRu ? 'Скопировать' : 'Copy'}
            </button>
          </div>
        \`;
      } catch {
        document.getElementById('modal-body').innerHTML =
          '<p class="text-red-400 text-sm text-center py-6">Failed to load plan details</p>';
      }
    }

    function closeModal() {
      document.getElementById('detail-modal').style.display = 'none';
    }

    // ─── Export CSV ────────────────────────────────────────────────────────────

    function exportCSV() {
      if (!allLoaded.length) { alert(isRu ? 'Нет данных для экспорта' : 'No data to export'); return; }
      const cols = ['id','prompt','status','strategy','thinkingMode','stepCount','doneCount','estimatedCostUsd','actualCostUsd','createdAt','completedAt'];
      const header = cols.join(',');
      const rows = allLoaded.map(item =>
        cols.map(k => JSON.stringify(item[k] ?? '')).join(',')
      );
      const blob = new Blob([header + '\\n' + rows.join('\\n')], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'history-' + new Date().toISOString().slice(0,10) + '.csv';
      a.click();
    }

    // ─── Helpers ───────────────────────────────────────────────────────────────

    var ROLE_NAMES = {
      researcher:'${isRu?'Исследователь':'Researcher'}',analyst:'${isRu?'Аналитик':'Analyst'}',
      writer:'${isRu?'Автор':'Writer'}',critic:'${isRu?'Критик':'Critic'}',
      planner:'${isRu?'Планировщик':'Planner'}',executor:'${isRu?'Исполнитель':'Executor'}',
      reviewer:'${isRu?'Ревьюер':'Reviewer'}',supervisor:'${isRu?'Супервизор':'Supervisor'}',
      coordinator:'${isRu?'Координатор':'Coordinator'}',custom:'${isRu?'Свой агент':'Custom Agent'}',
      sales_manager:'${isRu?'Менеджер продаж':'Sales Manager'}',
      marketing_manager:'${isRu?'Маркетолог':'Marketing Manager'}',
      financial_analyst:'${isRu?'Финансовый аналитик':'Financial Analyst'}',
      legal_counsel:'${isRu?'Юрист':'Legal Counsel'}',
      hr_specialist:'${isRu?'HR-специалист':'HR Specialist'}',
      project_manager:'${isRu?'Менеджер проектов':'Project Manager'}',
      software_engineer:'${isRu?'Разработчик':'Software Engineer'}',
      data_engineer:'${isRu?'Data-инженер':'Data Engineer'}',
      devops_engineer:'${isRu?'DevOps-инженер':'DevOps Engineer'}',
      security_analyst:'${isRu?'Аналитик ИБ':'Security Analyst'}',
      research_scientist:'${isRu?'Учёный-исследователь':'Research Scientist'}',
      data_scientist:'${isRu?'Дата-сайентист':'Data Scientist'}',
      experiment_designer:'${isRu?'Дизайнер экспериментов':'Experiment Designer'}',
      peer_reviewer:'${isRu?'Рецензент':'Peer Reviewer'}',
      literature_researcher:'${isRu?'Обзор литературы':'Literature Researcher'}',
      ml_engineer:'${isRu?'ML-инженер':'ML Engineer'}',
      prompt_engineer:'${isRu?'Prompt-инженер':'Prompt Engineer'}',
      llm_engineer:'${isRu?'LLM-инженер':'LLM Engineer'}',
      ai_architect:'${isRu?'AI-архитектор':'AI Architect'}',
      mlops_engineer:'${isRu?'MLOps-инженер':'MLOps Engineer'}',
    };
    function roleName(r) {
      return ROLE_NAMES[r] || r.replace(/_/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});
    }

    function escHtml(s) {
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    function renderMd(s) {
      const text = String(s == null ? '' : s);
      try {
        if (window.marked) {
          const html = window.marked.parse(text, { breaks: true, gfm: true });
          return window.DOMPurify ? window.DOMPurify.sanitize(html) : html;
        }
      } catch (e) { /* fall through */ }
      return '<p style="white-space:pre-wrap">' + escHtml(text) + '</p>';
    }

    function toggleStepOutput(btn) {
      const box = btn.parentElement.querySelector('.step-output-full');
      const preview = btn.parentElement.querySelector('.step-output-preview');
      const expanded = box.style.display !== 'none';
      box.style.display = expanded ? 'none' : 'block';
      if (preview) preview.style.display = expanded ? 'block' : 'none';
      btn.textContent = expanded
        ? (isRu ? 'Показать вывод ▸' : 'Show output ▸')
        : (isRu ? 'Скрыть ▴' : 'Hide ▴');
    }

    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        const msg = isRu ? 'Скопировано!' : 'Copied!';
        alert(msg);
      });
    }

    // ─── Search on Enter ───────────────────────────────────────────────────────

    document.getElementById('search-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') applyFilters();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    document.getElementById('detail-modal').addEventListener('click', e => {
      if (e.target === document.getElementById('detail-modal')) closeModal();
    });

    // ─── Init ─────────────────────────────────────────────────────────────────

    loadHistory(true);
  </script>
</body>
</html>
`
}
