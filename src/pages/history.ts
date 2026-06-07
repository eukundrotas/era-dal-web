import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const historyPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'История и журнал' : 'History & Journal'

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, isRu ? 'История планов и журнал действий агентов' : 'Orchestrator run history and agent action journal', lang)}
  <script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.9/dist/purify.min.js"></script>
  <style>
    .result-md{font-size:12px;line-height:1.65;color:#d1d5db;word-break:break-word}
    .result-md>*:first-child{margin-top:0}
    .result-md h1,.result-md h2,.result-md h3{color:#fff;font-weight:600;margin:.8em 0 .4em}
    .result-md h1{font-size:1.2em}.result-md h2{font-size:1.1em}.result-md h3{font-size:1em}
    .result-md p{margin:.4em 0}.result-md ul,.result-md ol{margin:.4em 0;padding-left:1.3em}.result-md li{margin:.18em 0}
    .result-md strong{color:#fff}.result-md a{color:#818cf8;text-decoration:underline}
    .result-md code{background:rgba(255,255,255,.08);padding:1px 4px;border-radius:3px;font-size:.88em}
    .result-md pre{background:rgba(0,0,0,.4);padding:8px 10px;border-radius:7px;overflow-x:auto;margin:.5em 0}
    .result-md pre code{background:none;padding:0}
    .result-md table{border-collapse:collapse;width:100%;margin:.6em 0;font-size:11px;display:block;overflow-x:auto}
    .result-md th,.result-md td{border:1px solid rgba(255,255,255,.12);padding:5px 8px;text-align:left;vertical-align:top}
    .result-md th{background:rgba(255,255,255,.06);color:#e5e7eb;font-weight:600}
    .result-md blockquote{border-left:3px solid rgba(139,92,246,.5);padding-left:8px;color:#9ca3af;margin:.5em 0}
    .status-completed{background:rgba(16,185,129,.15);color:#34d399;border-color:rgba(16,185,129,.3)}
    .status-failed{background:rgba(239,68,68,.15);color:#f87171;border-color:rgba(239,68,68,.3)}
    .status-paused{background:rgba(245,158,11,.15);color:#fbbf24;border-color:rgba(245,158,11,.3)}
    .status-running{background:rgba(59,130,246,.15);color:#60a5fa;border-color:rgba(59,130,246,.3)}
    .status-draft{background:rgba(107,114,128,.15);color:#9ca3af;border-color:rgba(107,114,128,.3)}
    .str{font-size:10px;font-weight:700;letter-spacing:.06em;padding:2px 7px;border-radius:5px}
    .str-SINGLE{background:rgba(59,130,246,.2);color:#93c5fd}
    .str-PARALLEL{background:rgba(139,92,246,.2);color:#c4b5fd}
    .str-RELAY{background:rgba(6,182,212,.2);color:#67e8f9}
    .str-FALLBACK{background:rgba(249,115,22,.2);color:#fdba74}
    .str-VERIFIED{background:rgba(16,185,129,.2);color:#6ee7b7}
    .str-DEBATE{background:rgba(236,72,153,.2);color:#f9a8d4}
    .str-EXPERT_PANEL{background:rgba(99,102,241,.2);color:#a5b4fc}
    .tab-btn{transition:all .15s;border-bottom:2px solid transparent;padding:.6rem 1rem;font-size:.875rem;font-weight:500;color:#9ca3af}
    .tab-btn.active{border-bottom-color:#8b5cf6;color:#fff}
    .fade-in{animation:fadeIn .25s ease}
    @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
    .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('history', lang)}

  <main class="ml-56 pt-4 min-h-screen">
    <div class="p-6 max-w-6xl">

      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
            <i class="fas fa-history text-white text-sm"></i>
          </div>
          <div>
            <h1 class="text-2xl font-bold">${title}</h1>
            <p class="text-gray-400 text-sm">${isRu ? 'Планы мета-оркестратора и журнал действий агентов' : 'Orchestrator plans and agent action log'}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="exportCurrent()" class="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white text-sm flex items-center gap-2 transition">
            <i class="fas fa-download"></i> CSV
          </button>
          <a href="/meta?lang=${lang}" class="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm flex items-center gap-2 transition">
            <i class="fas fa-plus"></i> ${isRu ? 'Новая задача' : 'New task'}
          </a>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex items-center gap-1 mb-5 border-b border-gray-800">
        <button id="tab-history" onclick="switchTab('history')" class="tab-btn active">
          <i class="fas fa-layer-group mr-2 text-violet-400"></i>${isRu ? 'История планов' : 'Run History'}
        </button>
        <button id="tab-log" onclick="switchTab('log')" class="tab-btn">
          <i class="fas fa-scroll mr-2 text-gray-500"></i>${isRu ? 'Журнал действий' : 'Action Log'}
        </button>
      </div>

      <!-- ── TAB: Run History ── -->
      <div id="panel-history">
        <div class="glass rounded-xl p-4 mb-5">
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex-1 min-w-[180px]">
              <input type="text" id="h-search" placeholder="${isRu ? 'Поиск по тексту задачи…' : 'Search task text…'}"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500">
            </div>
            <select id="h-status" class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500">
              <option value="">${isRu ? 'Все статусы' : 'All statuses'}</option>
              <option value="completed">${isRu ? 'Завершено' : 'Completed'}</option>
              <option value="paused">${isRu ? 'На паузе' : 'Paused'}</option>
              <option value="running">${isRu ? 'Выполняется' : 'Running'}</option>
              <option value="failed">${isRu ? 'Ошибка' : 'Failed'}</option>
              <option value="draft">${isRu ? 'Черновик' : 'Draft'}</option>
            </select>
            <select id="h-strategy" class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500">
              <option value="">${isRu ? 'Все стратегии' : 'All strategies'}</option>
              <option>SINGLE</option><option>PARALLEL</option><option>RELAY</option>
              <option>VERIFIED</option><option>DEBATE</option><option>EXPERT_PANEL</option>
            </select>
            <button onclick="applyHistoryFilters()" class="px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm transition">
              <i class="fas fa-search mr-1"></i>${isRu ? 'Найти' : 'Search'}
            </button>
          </div>
        </div>
        <div id="h-stats" class="flex items-center gap-6 mb-4 text-sm text-gray-400">
          <span id="h-stat-total"><i class="fas fa-list-ul"></i> —</span>
          <span id="h-stat-ok" class="text-green-400"><i class="fas fa-check-circle"></i> —</span>
          <span id="h-stat-err" class="text-red-400"><i class="fas fa-times-circle"></i> —</span>
        </div>
        <div id="history-list" class="space-y-3"></div>
        <div id="h-load-more" class="mt-5 text-center hidden">
          <button onclick="loadMoreHistory()" class="px-5 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-sm transition">
            <i class="fas fa-chevron-down mr-2"></i>${isRu ? 'Загрузить ещё' : 'Load more'}
          </button>
        </div>
      </div>

      <!-- ── TAB: Action Log ── -->
      <div id="panel-log" class="hidden">
        <div class="grid grid-cols-4 gap-4 mb-5">
          <div class="glass rounded-xl p-4"><div class="flex items-center gap-2 mb-1"><i class="fas fa-play-circle text-green-400 text-sm"></i><span class="text-xs text-gray-400">${isRu ? 'Сегодня' : 'Today'}</span></div><p id="stat-total" class="text-2xl font-bold">—</p></div>
          <div class="glass rounded-xl p-4"><div class="flex items-center gap-2 mb-1"><i class="fas fa-check-circle text-green-400 text-sm"></i><span class="text-xs text-gray-400">${isRu ? 'Успешно' : 'Success'}</span></div><p id="stat-ok" class="text-2xl font-bold text-green-400">—</p></div>
          <div class="glass rounded-xl p-4"><div class="flex items-center gap-2 mb-1"><i class="fas fa-times-circle text-red-400 text-sm"></i><span class="text-xs text-gray-400">${isRu ? 'Ошибок' : 'Errors'}</span></div><p id="stat-err" class="text-2xl font-bold text-red-400">—</p></div>
          <div class="glass rounded-xl p-4"><div class="flex items-center gap-2 mb-1"><i class="fas fa-dollar-sign text-blue-400 text-sm"></i><span class="text-xs text-gray-400">${isRu ? 'Стоимость' : 'Cost'}</span></div><p id="stat-cost" class="text-2xl font-bold text-blue-400">—</p></div>
        </div>
        <div id="pending-banner" class="hidden glass rounded-xl p-4 mb-5 border border-yellow-500/30 bg-yellow-500/5">
          <div class="flex items-start gap-3">
            <i class="fas fa-shield-alt text-yellow-400 mt-0.5"></i>
            <div class="flex-1"><p id="pending-count-text" class="font-medium text-yellow-300 text-sm"></p><div id="pending-list" class="mt-2 space-y-2"></div></div>
          </div>
        </div>
        <div class="flex items-center gap-3 mb-5">
          <select id="j-status" onchange="filterJournal()" class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
            <option value="">${isRu ? 'Все статусы' : 'All statuses'}</option>
            <option value="success">${isRu ? 'Успешно' : 'Success'}</option>
            <option value="error">${isRu ? 'Ошибка' : 'Error'}</option>
            <option value="pending_confirmation">${isRu ? 'Ожидает' : 'Pending'}</option>
            <option value="cancelled">${isRu ? 'Отменено' : 'Cancelled'}</option>
          </select>
          <select id="j-agent" onchange="filterJournal()" class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
            <option value="">${isRu ? 'Все роли' : 'All roles'}</option>
          </select>
          <input id="j-search" type="text" placeholder="${isRu ? 'Поиск...' : 'Search...'}" oninput="filterJournal()"
            class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 flex-1">
        </div>
        <div id="journal-list" class="space-y-2">
          <div class="text-center py-12 text-gray-600"><i class="fas fa-spinner fa-spin text-3xl mb-3"></i><p>${isRu ? 'Загрузка...' : 'Loading...'}</p></div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <p id="log-count" class="text-sm text-gray-500"></p>
          <button id="j-load-more" onclick="loadMoreJournal()" class="hidden text-sm text-gray-400 hover:text-white glass px-4 py-2 rounded-lg">
            ${isRu ? 'Загрузить ещё' : 'Load more'}
          </button>
        </div>
      </div>

    </div>
  </main>

  <!-- Detail modal -->
  <div id="detail-modal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 hidden">
    <div class="glass rounded-2xl max-w-2xl w-full mx-4 max-h-[85vh] overflow-y-auto p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold">${isRu ? 'Детали запуска' : 'Run details'}</h2>
        <button onclick="closeModal()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button>
      </div>
      <div id="modal-body" class="space-y-4"></div>
    </div>
  </div>

  <script>
  const isRu = ${isRu};
  const lang = '${lang}';

  // ── Tab switching ──────────────────────────────────────────────────────────

  function switchTab(tab) {
    ['history','log'].forEach(t => {
      document.getElementById('panel-'+t).classList.toggle('hidden', t !== tab);
      document.getElementById('tab-'+t).classList.toggle('active', t === tab);
    });
    localStorage.setItem('era-history-tab', tab);
    if (tab === 'history' && !allHistoryLoaded.length) loadHistory(true);
    if (tab === 'log'     && !allLogs.length)          { loadLogs(true); loadJournalStats(); }
  }

  // ── Shared helpers ─────────────────────────────────────────────────────────

  function escHtml(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function relTime(iso) {
    if (!iso) return '—';
    const m = Math.floor((Date.now()-new Date(iso))/60000);
    if (m<1) return isRu?'только что':'just now';
    if (m<60) return isRu?m+' мин':m+'m ago';
    const h = Math.floor(m/60);
    return h<24?(isRu?h+' ч':h+'h ago'):(isRu?Math.floor(h/24)+' д':Math.floor(h/24)+'d ago');
  }
  function fmtCost(usd) { return (!usd&&usd!==0)?'—':usd<0.001?'<$0.001':'$'+usd.toFixed(4); }
  function fmtTime(iso) {
    if (!iso) return '—';
    try { return new Date(iso).toLocaleTimeString(isRu?'ru-RU':'en-US',{hour:'2-digit',minute:'2-digit'}); } catch { return '—'; }
  }
  function renderMd(s) {
    const text = String(s==null?'':s);
    try { if (window.marked) { const h=window.marked.parse(text,{breaks:true,gfm:true}); return window.DOMPurify?window.DOMPurify.sanitize(h):h; } } catch {}
    return '<p style="white-space:pre-wrap">'+escHtml(text)+'</p>';
  }
  var ROLE_NAMES = {
    researcher:isRu?'Исследователь':'Researcher', analyst:isRu?'Аналитик':'Analyst',
    research_scientist:isRu?'Учёный-исследователь':'Research Scientist',
    data_scientist:isRu?'Дата-сайентист':'Data Scientist',
    literature_researcher:isRu?'Обзор литературы':'Literature Researcher',
    experiment_designer:isRu?'Дизайнер экспериментов':'Experiment Designer',
    peer_reviewer:isRu?'Рецензент':'Peer Reviewer',
    ml_engineer:isRu?'ML-инженер':'ML Engineer',
    llm_engineer:isRu?'LLM-инженер':'LLM Engineer',
    prompt_engineer:isRu?'Prompt-инженер':'Prompt Engineer',
    ai_architect:isRu?'AI-архитектор':'AI Architect',
    writer:isRu?'Автор':'Writer', critic:isRu?'Критик':'Critic',
    planner:isRu?'Планировщик':'Planner', reviewer:isRu?'Ревьюер':'Reviewer',
    supervisor:isRu?'Супервизор':'Supervisor', coordinator:isRu?'Координатор':'Coordinator',
    custom:isRu?'Свой агент':'Custom Agent',
  };
  function roleName(r) { return ROLE_NAMES[r]||r.replace(/_/g,' ').replace(/\\b\\w/g,c=>c.toUpperCase()); }

  // ── Run History ────────────────────────────────────────────────────────────

  const H_LIMIT = 20;
  let hOffset = 0, hTotal = 0, allHistoryLoaded = [];

  async function loadHistory(reset) {
    if (reset) { hOffset=0; allHistoryLoaded=[]; document.getElementById('history-list').innerHTML=''; }
    const params = new URLSearchParams({limit:H_LIMIT, offset:hOffset});
    const status = document.getElementById('h-status').value;
    const strat  = document.getElementById('h-strategy').value;
    const search = document.getElementById('h-search').value.trim();
    if (status) params.set('status',status);
    if (strat)  params.set('strategy',strat);
    if (search) params.set('search',search);
    try {
      const res  = await fetch('/api/history?'+params);
      const data = await res.json();
      hTotal = data.total??0;
      allHistoryLoaded = allHistoryLoaded.concat(data.items??[]);
      hOffset += (data.items??[]).length;
      renderHistoryList(data.items??[], reset);
      updateHistoryStats();
      document.getElementById('h-load-more').classList.toggle('hidden', hOffset>=hTotal);
    } catch(err) {
      document.getElementById('history-list').innerHTML =
        '<div class="glass rounded-xl p-8 text-center text-gray-500"><i class="fas fa-exclamation-triangle text-2xl mb-3 text-yellow-500"></i><p>'+(isRu?'Не удалось загрузить историю':'Could not load history')+'</p><p class="text-xs mt-1">'+escHtml(err.message)+'</p></div>';
    }
  }
  function loadMoreHistory() { loadHistory(false); }
  function applyHistoryFilters() { loadHistory(true); }

  function statusBadge(s) {
    const L={completed:isRu?'Завершено':'Completed',failed:isRu?'Ошибка':'Failed',
      paused:isRu?'Пауза':'Paused',running:isRu?'Выполняется':'Running',draft:isRu?'Черновик':'Draft'};
    const I={completed:'check',failed:'times',paused:'pause',running:'spinner fa-spin',draft:'pencil-alt'};
    return '<span class="status-'+s+' border rounded-full px-2.5 py-0.5 text-xs flex items-center gap-1"><i class="fas fa-'+(I[s]||'circle')+'"></i>'+(L[s]||s)+'</span>';
  }

  function renderHistoryList(items, reset) {
    const c = document.getElementById('history-list');
    if (reset && !items.length) {
      c.innerHTML = '<div class="glass rounded-xl p-12 text-center"><i class="fas fa-inbox text-4xl text-gray-600 mb-4"></i><p class="text-gray-400 text-lg font-medium">'+(isRu?'История пуста':'No runs yet')+'</p><a href="/meta?lang='+lang+'" class="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-violet-600 text-white text-sm"><i class="fas fa-sitemap"></i>'+(isRu?'Открыть Оркестратор':'Open Orchestrator')+'</a></div>';
      return;
    }
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'glass rounded-xl p-4 card-hover cursor-pointer fade-in';
      card.onclick = () => showDetail(item);
      const prompt = escHtml(item.prompt.length>120?item.prompt.slice(0,117)+'…':item.prompt);
      const doneOf = item.stepCount>0?item.doneCount+'/'+item.stepCount:'—';
      const cost   = item.actualCostUsd!=null?fmtCost(item.actualCostUsd):fmtCost(item.estimatedCostUsd)+'*';
      card.innerHTML = '<div class="flex items-start justify-between gap-4"><div class="flex-1 min-w-0"><div class="flex items-center flex-wrap gap-2 mb-2">'+statusBadge(item.status)+'<span class="str str-'+item.strategy+'">'+item.strategy+'</span><span class="text-gray-500 text-xs">'+relTime(item.createdAt)+'</span></div><p class="text-white text-sm leading-snug line-clamp-2">'+prompt+'</p></div><div class="text-right shrink-0 text-xs text-gray-400 space-y-1 ml-2"><div><i class="fas fa-tasks mr-1 text-violet-400"></i>'+doneOf+' '+(isRu?'шагов':'steps')+'</div><div><i class="fas fa-dollar-sign mr-1 text-green-400"></i>'+cost+'</div></div></div>';
      c.appendChild(card);
    });
  }

  function updateHistoryStats() {
    const ok=allHistoryLoaded.filter(i=>i.status==='completed').length;
    const err=allHistoryLoaded.filter(i=>i.status==='failed').length;
    document.getElementById('h-stat-total').innerHTML='<i class="fas fa-list-ul"></i> '+hTotal+' '+(isRu?'всего':'total');
    document.getElementById('h-stat-ok').innerHTML='<i class="fas fa-check-circle"></i> '+ok+' '+(isRu?'завершено':'completed');
    document.getElementById('h-stat-err').innerHTML='<i class="fas fa-times-circle"></i> '+err+' '+(isRu?'ошибок':'failed');
  }

  async function showDetail(item) {
    document.getElementById('detail-modal').classList.remove('hidden');
    document.getElementById('modal-body').innerHTML='<div class="text-center py-8 text-gray-500"><i class="fas fa-spinner fa-spin text-2xl"></i></div>';
    try {
      const res  = await fetch('/api/meta/plans/'+item.id);
      const plan = await res.json();
      const steps = plan.steps??[];
      document.getElementById('modal-body').innerHTML =
        '<div><p class="text-gray-400 text-xs mb-1">${isRu?'Задача':'Task'}</p><p class="text-white text-sm">'+escHtml(item.prompt)+'</p></div>'
        +'<div class="grid grid-cols-3 gap-3">'
        +'<div class="bg-gray-800/60 rounded-lg p-3 text-center"><p class="text-gray-500 text-xs">${isRu?'Стратегия':'Strategy'}</p><p class="text-white text-sm font-semibold mt-1">'+item.strategy+'</p></div>'
        +'<div class="bg-gray-800/60 rounded-lg p-3 text-center"><p class="text-gray-500 text-xs">${isRu?'Шагов':'Steps'}</p><p class="text-white text-sm font-semibold mt-1">'+item.doneCount+'/'+item.stepCount+'</p></div>'
        +'<div class="bg-gray-800/60 rounded-lg p-3 text-center"><p class="text-gray-500 text-xs">${isRu?'Стоимость':'Cost'}</p><p class="text-green-400 text-sm font-semibold mt-1">'+fmtCost(item.actualCostUsd??item.estimatedCostUsd)+'</p></div>'
        +'</div>'
        +(steps.length?'<div><p class="text-gray-400 text-xs mb-2">${isRu?'Шаги':'Steps'}</p><div class="space-y-2">'+steps.map((s,i)=>'<div class="flex items-start gap-3 bg-gray-800/40 rounded-lg p-3"><span class="text-violet-400 font-mono text-xs mt-0.5">'+(i+1)+'</span><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1"><span class="text-xs text-gray-300 font-medium">'+roleName(s.agentRole)+'</span><span class="text-xs px-1.5 py-0.5 rounded '+(s.status==='done'?'bg-green-500/20 text-green-400':s.status==='failed'?'bg-red-500/20 text-red-400':'bg-gray-700 text-gray-400')+'">'+s.status+'</span></div><p class="text-gray-300 text-xs leading-snug">'+escHtml(s.action)+'</p>'+(s.outputData?'<p class="text-gray-500 text-xs mt-1 line-clamp-2">'+escHtml(s.outputData.slice(0,200))+'</p><div class="step-out hidden"><div class="result-md mt-2 border-t border-gray-700/50 pt-2">'+renderMd(s.outputData)+'</div></div><button onclick="var p=this.previousElementSibling.previousElementSibling,o=this.previousElementSibling;p.classList.toggle(\'hidden\');o.classList.toggle(\'hidden\');this.textContent=this.textContent.includes(\'▸\')?\'${isRu?'Скрыть ▴':'Hide ▴'}\':\'${isRu?'Показать ▸':'Show ▸'}\'" class="text-violet-400 hover:text-violet-300 text-xs mt-1">${isRu?'Показать вывод ▸':'Show output ▸'}</button>':'')+'</div></div>').join('')+'</div></div>':'')
        +'<div class="flex gap-3 pt-2"><a href="/meta?lang='+lang+'&task='+encodeURIComponent(item.prompt)+'" class="flex-1 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm text-center transition"><i class="fas fa-redo mr-2"></i>${isRu?'Повторить':'Re-run'}</a>'
        +'<button onclick="navigator.clipboard.writeText(this.dataset.text)" data-text="'+escHtml(item.prompt).replace(/"/g,'&quot;')+'" class="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm transition"><i class="fas fa-copy mr-2"></i>${isRu?'Скопировать':'Copy'}</button></div>';
    } catch {
      document.getElementById('modal-body').innerHTML = '<p class="text-red-400 text-sm text-center py-6">Failed to load</p>';
    }
  }
  function closeModal() { document.getElementById('detail-modal').classList.add('hidden'); }

  // ── Action Log ─────────────────────────────────────────────────────────────

  let allLogs = [], jOffset = 0;
  const J_PAGE = 20;

  async function loadLogs(reset=false) {
    if (reset) { allLogs=[]; jOffset=0; }
    try {
      const res  = await fetch('/api/meta/logs?limit='+J_PAGE+'&offset='+jOffset);
      if (!res.ok) throw new Error('HTTP '+res.status);
      const data = await res.json();
      const logs = data.logs||[];
      allLogs = [...allLogs, ...logs];
      jOffset += logs.length;
      const roles = [...new Set(allLogs.map(e=>e.agentRole))].sort();
      const sel = document.getElementById('j-agent');
      sel.innerHTML = '<option value="">'+(isRu?'Все роли':'All roles')+'</option>'+roles.map(r=>'<option value="'+r+'">'+r.replace(/_/g,' ')+'</option>').join('');
      document.getElementById('j-load-more').classList.toggle('hidden', logs.length<J_PAGE);
      renderPendingBanner(); renderJournal();
    } catch(err) {
      document.getElementById('journal-list').innerHTML =
        '<div class="text-center py-12 text-gray-600"><i class="fas fa-exclamation-circle text-3xl mb-3 text-red-500/50"></i><p>'+(isRu?'Не удалось загрузить. D1 настроен?':'Failed to load. Is D1 configured?')+'</p></div>';
    }
  }
  function loadMoreJournal() { loadLogs(false); }

  async function loadJournalStats() {
    try {
      const res = await fetch('/api/meta/logs/today');
      if (!res.ok) return;
      const s = await res.json();
      document.getElementById('stat-total').textContent = s.total??'0';
      document.getElementById('stat-ok').textContent    = s.success??'0';
      document.getElementById('stat-err').textContent   = s.errors??'0';
      document.getElementById('stat-cost').textContent  = '$'+(s.costUsd||0).toFixed(4);
    } catch {}
  }

  function renderPendingBanner() {
    const pending = allLogs.filter(e=>e.status==='pending_confirmation');
    const banner  = document.getElementById('pending-banner');
    if (!pending.length) { banner.classList.add('hidden'); return; }
    document.getElementById('pending-count-text').textContent =
      pending.length+' '+(isRu?(pending.length===1?'действие ожидает':'действий ожидают'):(pending.length===1?'action pending':'actions pending'));
    document.getElementById('pending-list').innerHTML = pending.map(e=>
      '<div class="flex items-center gap-3"><p class="text-xs text-gray-400 flex-1 truncate">'+e.agentRole.replace(/_/g,' ')+': '+escHtml(e.action.slice(0,60))+'</p>'
      +'<div class="flex gap-1.5"><button onclick="approveAction(\''+e.id+'\')" class="text-xs px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white"><i class="fas fa-check mr-1"></i>'+(isRu?'Одобрить':'Approve')+'</button>'
      +'<button onclick="rejectAction(\''+e.id+'\')" class="text-xs px-3 py-1 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10"><i class="fas fa-times mr-1"></i>'+(isRu?'Отклонить':'Reject')+'</button></div></div>'
    ).join('');
    banner.classList.remove('hidden');
  }

  function renderJournal() {
    const c = document.getElementById('journal-list');
    const sf = document.getElementById('j-status').value;
    const af = document.getElementById('j-agent').value;
    const tf = document.getElementById('j-search').value.toLowerCase();
    const filtered = allLogs.filter(e=>
      (!sf||e.status===sf)&&(!af||e.agentRole===af)&&(!tf||e.action.toLowerCase().includes(tf))
    );
    if (!filtered.length) {
      c.innerHTML = '<div class="text-center py-12 text-gray-600"><i class="fas fa-inbox text-3xl mb-3"></i><p>'+(isRu?'Записей нет':'No entries')+'</p></div>';
      document.getElementById('log-count').textContent=''; return;
    }
    c.innerHTML = filtered.map(e=>{
      const sIcon = e.status==='success'?'<i class="fas fa-check-circle text-green-400"></i>'
        :e.status==='error'?'<i class="fas fa-times-circle text-red-400"></i>'
        :e.status==='pending_confirmation'?'<i class="fas fa-clock text-yellow-400"></i>'
        :'<i class="fas fa-ban text-gray-500"></i>';
      const autoBadge = e.autonomyLevel==='SAFE'
        ?'<span class="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">'+(isRu?'авто':'auto')+'</span>'
        :e.autonomyLevel==='REQUIRES_CONFIRMATION'
        ?'<span class="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">'+(isRu?'ждёт':'pending')+'</span>':'';
      const costStr = e.costUsd?'$'+Number(e.costUsd).toFixed(4):'$0';
      const durStr  = e.durationMs?(e.durationMs/1000).toFixed(1)+'s':'—';
      return '<div class="glass rounded-xl px-5 py-3.5 hover:border-gray-700 transition">'
        +'<div class="flex items-start gap-4">'
        +'<div class="flex flex-col items-center pt-1 w-14 flex-shrink-0"><span class="text-xs text-gray-500 font-mono">'+fmtTime(e.createdAt)+'</span><div class="mt-1">'+sIcon+'</div></div>'
        +'<div class="flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap mb-0.5">'
        +'<span class="text-sm font-medium text-gray-200">'+roleName(e.agentRole)+'</span>'
        +(e.planId?'<span class="text-xs text-gray-600">·</span><span class="text-xs text-gray-500 font-mono">'+e.planId.slice(0,12)+'…</span>':'')
        +autoBadge+'</div>'
        +'<p class="text-sm text-gray-400 leading-relaxed">'+escHtml(e.action)+'</p>'
        +(e.outputData?'<p class="text-xs text-gray-600 mt-1 line-clamp-1 italic">'+escHtml(e.outputData.slice(0,120))+'</p>':'')
        +(e.errorMessage?'<p class="text-xs text-red-400 mt-1"><i class="fas fa-exclamation-triangle mr-1"></i>'+escHtml(e.errorMessage)+'</p>':'')
        +'</div><div class="flex flex-col items-end gap-1 text-xs text-gray-500 flex-shrink-0">'
        +'<span class="text-green-400">'+costStr+'</span><span>'+durStr+'</span>'
        +(e.modelId?'<span class="text-gray-600 max-w-[80px] truncate">'+e.modelId.split('/').at(-1)+'</span>':'')
        +'</div></div>'
        +(e.status==='pending_confirmation'?'<div class="mt-3 pt-3 border-t border-gray-800 flex gap-2"><button onclick="approveAction(\''+e.id+'\')" class="text-sm px-4 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-1"><i class="fas fa-check text-xs"></i>'+(isRu?'Одобрить':'Approve')+'</button><button onclick="rejectAction(\''+e.id+'\')" class="text-sm px-4 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 flex items-center gap-1"><i class="fas fa-times text-xs"></i>'+(isRu?'Отклонить':'Reject')+'</button></div>':'')
        +'</div>';
    }).join('');
    document.getElementById('log-count').textContent=(isRu?'Показано: ':'Showing: ')+filtered.length;
  }
  function filterJournal() { renderJournal(); }

  async function approveAction(logId) {
    try {
      const res = await fetch('/api/meta/logs/'+logId+'/confirm',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:'user'})});
      if (res.ok) { allLogs=allLogs.map(e=>e.id===logId?{...e,status:'success'}:e); renderPendingBanner();renderJournal();loadJournalStats(); }
    } catch(e) { alert(e.message); }
  }
  function rejectAction(logId) {
    allLogs=allLogs.map(e=>e.id===logId?{...e,status:'cancelled'}:e);
    renderPendingBanner(); renderJournal();
  }

  // ── Export ─────────────────────────────────────────────────────────────────

  function exportCurrent() {
    const isLog = document.getElementById('panel-log').classList.contains('hidden')===false;
    if (isLog) {
      const rows = allLogs.map(e=>[e.createdAt,e.agentRole,e.status,e.action,e.costUsd||0,e.durationMs||0]);
      download(['time,role,status,action,costUsd,durationMs',...rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(','))].join('\\n'),'journal.csv');
    } else {
      if (!allHistoryLoaded.length) { alert(isRu?'Нет данных':'No data'); return; }
      const cols=['id','prompt','status','strategy','stepCount','doneCount','estimatedCostUsd','actualCostUsd','createdAt'];
      download([cols.join(','),...allHistoryLoaded.map(i=>cols.map(k=>JSON.stringify(i[k]??'')).join(','))].join('\\n'),'history-'+new Date().toISOString().slice(0,10)+'.csv');
    }
  }
  function download(csv, name) {
    const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
    a.download=name; a.click();
  }

  // ── Init ───────────────────────────────────────────────────────────────────

  document.getElementById('h-search').addEventListener('keydown',e=>{if(e.key==='Enter')applyHistoryFilters();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
  document.getElementById('detail-modal').addEventListener('click',e=>{if(e.target===document.getElementById('detail-modal'))closeModal();});

  const initTab = new URLSearchParams(location.search).get('tab') || localStorage.getItem('era-history-tab') || 'history';
  if (initTab === 'log') { switchTab('log'); }
  else { loadHistory(true); }
  </script>
</body>
</html>`
}
