import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const metaAgentsPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'

  const title = isRu ? 'Метаагенты' : 'Meta-Agents'
  const subtitle = isRu
    ? 'Собирайте команды от 1 до 100 агентов под управлением метаагента и запускайте их на задачу'
    : 'Assemble teams of 1 to 100 agents led by a meta-agent and run them on a task'

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, subtitle, lang)}
  <style>
    .squad-card { transition: all .15s; }
    .squad-card:hover { border-color: rgba(139,92,246,.4); transform: translateY(-2px); }
    .cat-chip { display:flex; align-items:center; gap:8px; padding:8px 10px; border-radius:10px;
      background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); cursor:pointer; transition:all .12s; }
    .cat-chip:hover { border-color:rgba(139,92,246,.5); background:rgba(139,92,246,.1); }
    .member-row { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:10px;
      background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07); }
    .stepper-btn { width:24px; height:24px; border-radius:6px; display:flex; align-items:center;
      justify-content:center; background:rgba(255,255,255,.06); cursor:pointer; transition:all .1s; font-size:11px; }
    .stepper-btn:hover { background:rgba(139,92,246,.3); }
    .fade-in { animation: fadeIn .25s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
    .count-ring { background: conic-gradient(#8b5cf6 var(--p,0%), rgba(255,255,255,.08) 0); }
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('meta-agents', lang)}

  <main class="ml-56 pt-4 min-h-screen">
    <div class="p-6 max-w-7xl">

      <!-- Header -->
      <div class="mb-6 flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <i class="fas fa-people-group text-white text-sm"></i>
            </div>
            <h1 class="text-2xl font-bold">${title}</h1>
            <span class="text-xs px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">1–100</span>
          </div>
          <p class="text-gray-400 ml-12">${subtitle}</p>
        </div>
        <button onclick="openBuilder()"
          class="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <i class="fas fa-plus"></i>
          ${isRu ? 'Создать метаагента' : 'Create Meta-Agent'}
        </button>
      </div>

      <!-- Squad list -->
      <div id="squad-empty" class="hidden glass rounded-2xl p-12 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 flex items-center justify-center">
          <i class="fas fa-people-group text-2xl text-fuchsia-400"></i>
        </div>
        <h3 class="text-lg font-semibold mb-1">${isRu ? 'Нет метаагентов' : 'No meta-agents yet'}</h3>
        <p class="text-gray-400 text-sm mb-5 max-w-md mx-auto">
          ${isRu
            ? 'Метаагент управляет командой обычных агентов (от 1 до 100) и координирует их для выполнения задачи.'
            : 'A meta-agent supervises a team of regular agents (1 to 100) and coordinates them to complete a task.'}
        </p>
        <button onclick="openBuilder()"
          class="bg-violet-600 hover:bg-violet-700 px-5 py-2.5 rounded-lg text-sm font-medium inline-flex items-center gap-2">
          <i class="fas fa-plus"></i>${isRu ? 'Создать первого' : 'Create your first'}
        </button>
      </div>

      <div id="squad-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>
    </div>
  </main>

  <!-- ─── Builder Modal ─────────────────────────────────────────────────── -->
  <div id="builder-modal" style="display:none;"
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col">

      <!-- Modal header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-800 flex-shrink-0">
        <h3 id="builder-title" class="text-lg font-semibold">${isRu ? 'Создать метаагента' : 'Create Meta-Agent'}</h3>
        <button onclick="closeBuilder()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- LEFT: settings + catalog -->
        <div class="space-y-4">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Название метаагента' : 'Meta-agent name'} *</label>
            <input id="b-name" type="text" placeholder="${isRu ? 'Напр. Отдел исследований рынка' : 'E.g. Market Research Division'}"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
          </div>

          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Миссия / задача команды' : 'Mission / team task'}</label>
            <textarea id="b-mission" rows="3" placeholder="${isRu ? 'Что должна выполнить эта команда?' : 'What should this team accomplish?'}"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-violet-500"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Метаагент-супервайзер' : 'Supervisor (meta-agent)'}</label>
              <select id="b-supervisor" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"></select>
            </div>
            <div>
              <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Стратегия координации' : 'Coordination strategy'}</label>
              <select id="b-strategy" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
                <option value="PLANNER">${isRu ? '🗺️ Планировщик' : '🗺️ Planner'}</option>
                <option value="RELAY">${isRu ? '🔄 Эстафета' : '🔄 Relay'}</option>
                <option value="PARALLEL">${isRu ? '⚡ Параллельно' : '⚡ Parallel'}</option>
                <option value="VERIFIED">${isRu ? '✅ Верификация' : '✅ Verified'}</option>
                <option value="EXPERT_PANEL">${isRu ? '👥 Экспертная комиссия' : '👥 Expert Panel'}</option>
                <option value="DEBATE">${isRu ? '🗣️ Дебаты' : '🗣️ Debate'}</option>
                <option value="FALLBACK">${isRu ? '🔁 Резервный' : '🔁 Fallback'}</option>
                <option value="SINGLE">${isRu ? '⚡ Одиночный' : '⚡ Single'}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Режим мышления' : 'Thinking mode'}</label>
            <select id="b-thinking" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
              <option value="standard">${isRu ? '🧠 Стандартное' : '🧠 Standard'}</option>
              <option value="systems">${isRu ? '🌐 Системное' : '🌐 Systems'}</option>
              <option value="critical">${isRu ? '⚖️ Критическое' : '⚖️ Critical'}</option>
              <option value="first_principles">${isRu ? '🔬 Первые принципы' : '🔬 First Principles'}</option>
              <option value="triz">${isRu ? '⚙️ ТРИЗ' : '⚙️ TRIZ'}</option>
              <option value="six_hats">${isRu ? '🎩 6 шляп' : '🎩 Six Hats'}</option>
            </select>
          </div>

          <!-- Catalog -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs text-gray-400">${isRu ? 'Каталог агентов — нажмите, чтобы добавить' : 'Agent catalog — click to add'}</label>
              <input id="cat-search" oninput="renderCatalog()" type="text" placeholder="${isRu ? 'поиск' : 'search'}"
                class="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs w-28 focus:outline-none focus:border-violet-500">
            </div>
            <div id="catalog-grid" class="grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto pr-1"></div>
          </div>
        </div>

        <!-- RIGHT: composition + summary -->
        <div class="space-y-4">
          <!-- Summary -->
          <div class="glass rounded-xl p-4 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/10 border border-violet-500/20">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-gray-400">${isRu ? 'Всего агентов в команде' : 'Total agents in team'}</p>
                <p class="text-3xl font-bold"><span id="total-count">0</span><span class="text-gray-500 text-lg"> / 100</span></p>
              </div>
              <div class="w-16 h-16 rounded-full count-ring flex items-center justify-center" id="count-ring">
                <div class="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-sm font-semibold" id="count-pct">0%</div>
              </div>
            </div>
            <div class="flex gap-2 mt-3">
              <button onclick="bulkAdd(5)" class="text-xs px-2 py-1 rounded bg-gray-800 hover:bg-gray-700">+5</button>
              <button onclick="bulkAdd(10)" class="text-xs px-2 py-1 rounded bg-gray-800 hover:bg-gray-700">+10</button>
              <button onclick="fillTo100()" class="text-xs px-2 py-1 rounded bg-violet-700/50 hover:bg-violet-700">${isRu ? 'Заполнить до 100' : 'Fill to 100'}</button>
              <button onclick="clearMembers()" class="text-xs px-2 py-1 rounded bg-red-900/40 hover:bg-red-900/60 text-red-300 ml-auto">${isRu ? 'Очистить' : 'Clear'}</button>
            </div>
          </div>

          <!-- Members -->
          <div>
            <label class="block text-xs text-gray-400 mb-2">${isRu ? 'Состав команды' : 'Team composition'}</label>
            <div id="members-list" class="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
              <p id="members-empty" class="text-xs text-gray-600 italic py-4 text-center">
                ${isRu ? 'Добавьте агентов из каталога слева' : 'Add agents from the catalog on the left'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal footer -->
      <div id="builder-error" class="hidden mx-6 mb-2 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2"></div>
      <div class="flex gap-3 px-6 py-4 border-t border-gray-800 flex-shrink-0">
        <button onclick="closeBuilder()" class="flex-1 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white text-sm transition">
          ${isRu ? 'Отмена' : 'Cancel'}
        </button>
        <button onclick="saveSquad()" id="save-squad-btn" class="flex-1 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium">
          ${isRu ? 'Сохранить метаагента' : 'Save Meta-Agent'}
        </button>
      </div>
    </div>
  </div>

  <script>
    const isRu = ${isRu};
    const lang = '${lang}';

    // ─── Role catalog (built-in) ──────────────────────────────────────────
    const CATALOG = [
      // Science
      { role:'research_scientist',   nameEn:'Research Scientist',   nameRu:'Учёный-исследователь',  icon:'fa-flask',         group:'science' },
      { role:'data_scientist',       nameEn:'Data Scientist',       nameRu:'Дата-сайентист',        icon:'fa-chart-area',    group:'science' },
      { role:'experiment_designer',  nameEn:'Experiment Designer',  nameRu:'Методолог эксперимент.', icon:'fa-vials',        group:'science' },
      { role:'peer_reviewer',        nameEn:'Peer Reviewer',        nameRu:'Научный рецензент',     icon:'fa-microscope',    group:'science' },
      { role:'literature_researcher',nameEn:'Literature Researcher',nameRu:'Литературный обзор',     icon:'fa-book-open',     group:'science' },
      // AI engineering
      { role:'ml_engineer',          nameEn:'ML Engineer',          nameRu:'ML-инженер',            icon:'fa-brain',         group:'ai_eng' },
      { role:'prompt_engineer',      nameEn:'Prompt Engineer',      nameRu:'Промпт-инженер',        icon:'fa-terminal',      group:'ai_eng' },
      { role:'llm_engineer',         nameEn:'LLM Engineer',         nameRu:'LLM-инженер',           icon:'fa-robot',         group:'ai_eng' },
      { role:'ai_architect',         nameEn:'AI Architect',         nameRu:'AI-архитектор',         icon:'fa-sitemap',       group:'ai_eng' },
      { role:'mlops_engineer',       nameEn:'MLOps Engineer',       nameRu:'MLOps-инженер',         icon:'fa-server',        group:'ai_eng' },
    ];

    const GROUP_LABELS = {
      science:  isRu ? 'Наука' : 'Science',
      ai_eng:   isRu ? 'AI-инженерия' : 'AI engineering',
      custom:   isRu ? 'Кастомные' : 'Custom',
    };

    const MAX_AGENTS = 100;

    // ─── State ────────────────────────────────────────────────────────────
    let squads = [];
    let editingId = null;
    let members = []; // [{ role, nameEn, nameRu, icon, count }]
    let customAgents = [];

    function nameOf(c) { return isRu ? (c.nameRu || c.nameEn) : c.nameEn; }
    function catalogAll() {
      return [...CATALOG, ...customAgents.map(a => ({
        role: a.role, nameEn: a.nameEn, nameRu: a.nameRu || a.nameEn,
        icon: 'fa-user-cog', group: 'custom', custom: true, agentId: a.id,
      }))];
    }
    function findCat(role) { return catalogAll().find(c => c.role === role); }

    // ─── Persistence ──────────────────────────────────────────────────────
    function loadSquads() {
      try { squads = JSON.parse(localStorage.getItem('era_meta_agents') || '[]'); }
      catch { squads = []; }
    }
    function persistSquads() {
      localStorage.setItem('era_meta_agents', JSON.stringify(squads));
    }

    async function loadCustomAgents() {
      try {
        const res = await fetch('/api/meta/agents');
        if (res.ok) { const d = await res.json(); customAgents = d.agents || []; }
      } catch { /* offline / no DB — fine */ }
    }

    // ─── Squad list rendering ─────────────────────────────────────────────
    function renderSquads() {
      const grid = document.getElementById('squad-grid');
      const empty = document.getElementById('squad-empty');
      if (!squads.length) { empty.classList.remove('hidden'); grid.innerHTML = ''; return; }
      empty.classList.add('hidden');

      grid.innerHTML = squads.map(s => {
        const total = s.members.reduce((n, m) => n + m.count, 0);
        const sup = findCat(s.supervisorRole);
        const breakdown = s.members.slice(0, 6).map(m => {
          const c = findCat(m.role);
          return \`<span class="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300 flex items-center gap-1">
            <i class="fas \${c?c.icon:'fa-robot'} text-gray-500" style="font-size:10px"></i>\${m.count}× \${c?nameOf(c):m.role}
          </span>\`;
        }).join('');
        const more = s.members.length > 6 ? \`<span class="text-xs text-gray-600">+\${s.members.length-6}</span>\` : '';
        const strat = STRAT_LABEL(s.strategy);
        return \`
          <div class="squad-card glass rounded-xl p-5 border border-gray-700/60 fade-in">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-people-group text-white"></i>
                </div>
                <div class="min-w-0">
                  <p class="font-semibold text-sm truncate">\${esc(s.name)}</p>
                  <p class="text-xs text-gray-500 flex items-center gap-1">
                    <i class="fas \${sup?sup.icon:'fa-user-tie'}" style="font-size:10px"></i>
                    \${isRu?'супервайзер':'supervisor'}: \${sup?nameOf(sup):s.supervisorRole}
                  </p>
                </div>
              </div>
              <span class="text-xs px-2 py-0.5 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 flex-shrink-0">\${total} 🤖</span>
            </div>
            \${s.mission ? \`<p class="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">\${esc(s.mission)}</p>\` : ''}
            <div class="flex items-center gap-2 mb-3 text-xs">
              <span class="px-2 py-0.5 rounded bg-violet-500/15 text-violet-300 border border-violet-500/25">\${strat}</span>
              <span class="text-gray-600">·</span>
              <span class="text-gray-500">\${s.thinkingMode}</span>
            </div>
            <div class="flex flex-wrap gap-1 mb-3">\${breakdown}\${more}</div>
            <div class="flex gap-1.5 pt-3 border-t border-gray-800">
              <button onclick="runSquad('\${s.id}')" class="flex-1 text-xs bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-1.5 rounded-lg transition flex items-center justify-center gap-1">
                <i class="fas fa-play"></i>${isRu ? 'Собрать и запустить' : 'Assemble & Run'}
              </button>
              <button onclick="editSquad('\${s.id}')" class="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition" title="${isRu ? 'Редактировать' : 'Edit'}">
                <i class="fas fa-pen"></i>
              </button>
              <button onclick="duplicateSquad('\${s.id}')" class="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition" title="${isRu ? 'Дублировать' : 'Duplicate'}">
                <i class="fas fa-copy"></i>
              </button>
              <button onclick="deleteSquad('\${s.id}')" class="text-xs bg-red-900/40 hover:bg-red-900/60 text-red-400 px-3 py-1.5 rounded-lg transition" title="${isRu ? 'Удалить' : 'Delete'}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        \`;
      }).join('');
    }

    const STRAT_META = {
      PLANNER:      isRu ? '🗺️ Планировщик' : '🗺️ Planner',
      RELAY:        isRu ? '🔄 Эстафета' : '🔄 Relay',
      PARALLEL:     isRu ? '⚡ Параллельно' : '⚡ Parallel',
      VERIFIED:     isRu ? '✅ Верификация' : '✅ Verified',
      EXPERT_PANEL: isRu ? '👥 Эксперты' : '👥 Expert Panel',
      DEBATE:       isRu ? '🗣️ Дебаты' : '🗣️ Debate',
      FALLBACK:     isRu ? '🔁 Резервный' : '🔁 Fallback',
      SINGLE:       isRu ? '⚡ Одиночный' : '⚡ Single',
    };
    function STRAT_LABEL(s) { return STRAT_META[s] || s; }

    // ─── Builder ──────────────────────────────────────────────────────────
    function populateSupervisor() {
      const sel = document.getElementById('b-supervisor');
      const groups = ['science','ai_eng','custom'];
      sel.innerHTML = groups.map(g => {
        const items = catalogAll().filter(c => c.group === g);
        if (!items.length) return '';
        return \`<optgroup label="\${GROUP_LABELS[g]}">\` +
          items.map(c => \`<option value="\${c.role}">\${nameOf(c)}</option>\`).join('') +
          '</optgroup>';
      }).join('');
      sel.value = 'research_scientist';
    }

    function openBuilder() {
      editingId = null;
      members = [];
      document.getElementById('builder-title').textContent = isRu ? 'Создать метаагента' : 'Create Meta-Agent';
      document.getElementById('b-name').value = '';
      document.getElementById('b-mission').value = '';
      populateSupervisor();
      document.getElementById('b-strategy').value = 'PLANNER';
      document.getElementById('b-thinking').value = 'standard';
      document.getElementById('cat-search').value = '';
      document.getElementById('builder-error').classList.add('hidden');
      renderCatalog();
      renderMembers();
      document.getElementById('builder-modal').style.display = 'flex';
    }

    function editSquad(id) {
      const s = squads.find(x => x.id === id);
      if (!s) return;
      editingId = id;
      members = s.members.map(m => ({ ...m }));
      document.getElementById('builder-title').textContent = isRu ? 'Редактировать метаагента' : 'Edit Meta-Agent';
      document.getElementById('b-name').value = s.name;
      document.getElementById('b-mission').value = s.mission || '';
      populateSupervisor();
      document.getElementById('b-supervisor').value = s.supervisorRole;
      document.getElementById('b-strategy').value = s.strategy;
      document.getElementById('b-thinking').value = s.thinkingMode;
      document.getElementById('cat-search').value = '';
      document.getElementById('builder-error').classList.add('hidden');
      renderCatalog();
      renderMembers();
      document.getElementById('builder-modal').style.display = 'flex';
    }

    function closeBuilder() { document.getElementById('builder-modal').style.display = 'none'; }

    function renderCatalog() {
      const q = (document.getElementById('cat-search').value || '').toLowerCase();
      const grid = document.getElementById('catalog-grid');
      const items = catalogAll().filter(c =>
        !q || nameOf(c).toLowerCase().includes(q) || c.role.includes(q));
      grid.innerHTML = items.map(c => \`
        <div class="cat-chip" onclick="addMember('\${c.role}')">
          <i class="fas \${c.icon} text-violet-400 w-4 text-center" style="font-size:12px"></i>
          <span class="text-xs text-gray-200 truncate flex-1">\${nameOf(c)}</span>
          \${c.custom ? '<span class="text-[9px] text-fuchsia-400">custom</span>' : ''}
          <i class="fas fa-plus text-gray-600 text-xs"></i>
        </div>
      \`).join('') || \`<p class="text-xs text-gray-600 col-span-2 py-3 text-center">\${isRu?'Ничего не найдено':'Nothing found'}</p>\`;
    }

    function totalCount() { return members.reduce((n, m) => n + m.count, 0); }

    function addMember(role, qty = 1) {
      const existing = members.find(m => m.role === role);
      const room = MAX_AGENTS - totalCount();
      if (room <= 0) { flashLimit(); return; }
      const add = Math.min(qty, room);
      if (existing) { existing.count += add; }
      else {
        const c = findCat(role);
        if (!c) return;
        members.push({ role, nameEn: c.nameEn, nameRu: c.nameRu, icon: c.icon, count: add });
      }
      renderMembers();
    }

    function changeCount(idx, delta) {
      const m = members[idx];
      if (!m) return;
      if (delta > 0 && totalCount() >= MAX_AGENTS) { flashLimit(); return; }
      m.count = Math.max(1, Math.min(m.count + delta, m.count + (MAX_AGENTS - totalCount())));
      renderMembers();
    }

    function setCount(idx, val) {
      const m = members[idx];
      if (!m) return;
      let v = parseInt(val) || 1;
      v = Math.max(1, v);
      const others = totalCount() - m.count;
      if (others + v > MAX_AGENTS) { v = MAX_AGENTS - others; flashLimit(); }
      m.count = v;
      renderMembers();
    }

    function removeMember(idx) { members.splice(idx, 1); renderMembers(); }
    function moveMember(idx, dir) {
      const j = idx + dir;
      if (j < 0 || j >= members.length) return;
      [members[idx], members[j]] = [members[j], members[idx]];
      renderMembers();
    }
    function clearMembers() { members = []; renderMembers(); }

    function bulkAdd(qty) {
      // add qty to each existing member (or prompt to add one if none)
      if (!members.length) { flash(isRu?'Сначала добавьте агента из каталога':'Add an agent from the catalog first'); return; }
      members.forEach((m, i) => {
        const room = MAX_AGENTS - totalCount();
        if (room <= 0) return;
        m.count += Math.min(qty, room + qty > MAX_AGENTS ? (MAX_AGENTS - totalCount()) : qty);
      });
      // re-clamp
      let over = totalCount() - MAX_AGENTS;
      while (over > 0) { for (const m of members) { if (over<=0) break; if (m.count>1){m.count--;over--;} } }
      renderMembers();
    }

    function fillTo100() {
      if (!members.length) { flash(isRu?'Сначала добавьте хотя бы одного агента':'Add at least one agent first'); return; }
      let room = MAX_AGENTS - totalCount();
      let i = 0;
      while (room > 0) { members[i % members.length].count++; room--; i++; }
      renderMembers();
    }

    function renderMembers() {
      const list = document.getElementById('members-list');
      const empty = document.getElementById('members-empty');
      const total = totalCount();
      document.getElementById('total-count').textContent = total;
      const pct = Math.round(total / MAX_AGENTS * 100);
      document.getElementById('count-ring').style.setProperty('--p', pct + '%');
      document.getElementById('count-pct').textContent = pct + '%';

      if (!members.length) { list.innerHTML = ''; list.appendChild(empty); empty.style.display=''; return; }

      list.innerHTML = members.map((m, i) => \`
        <div class="member-row">
          <span class="text-xs text-gray-600 w-5 text-center">\${i+1}</span>
          <i class="fas \${m.icon} text-violet-400 w-4 text-center" style="font-size:12px"></i>
          <span class="text-sm text-gray-200 flex-1 truncate">\${isRu ? (m.nameRu||m.nameEn) : m.nameEn}</span>
          <div class="flex items-center gap-1">
            <div class="stepper-btn" onclick="changeCount(\${i}, -1)"><i class="fas fa-minus"></i></div>
            <input type="number" value="\${m.count}" min="1" max="100" onchange="setCount(\${i}, this.value)"
              class="w-12 bg-gray-900 border border-gray-700 rounded text-center text-xs py-1 focus:outline-none focus:border-violet-500">
            <div class="stepper-btn" onclick="changeCount(\${i}, 1)"><i class="fas fa-plus"></i></div>
          </div>
          <div class="flex items-center gap-0.5 ml-1">
            <div class="stepper-btn" onclick="moveMember(\${i}, -1)" title="up"><i class="fas fa-chevron-up"></i></div>
            <div class="stepper-btn" onclick="moveMember(\${i}, 1)" title="down"><i class="fas fa-chevron-down"></i></div>
            <div class="stepper-btn" onclick="removeMember(\${i})" title="remove" style="background:rgba(239,68,68,.15)"><i class="fas fa-times text-red-400"></i></div>
          </div>
        </div>
      \`).join('');
    }

    function flashLimit() { flash(isRu ? 'Максимум 100 агентов в команде' : 'Maximum 100 agents per team', 'warn'); }
    function flash(msg, type='info') {
      const colors = { info:'bg-blue-600', warn:'bg-yellow-600', err:'bg-red-600', ok:'bg-green-600' };
      const t = document.createElement('div');
      t.className = 'fixed bottom-4 right-4 ' + colors[type] + ' text-white px-4 py-2.5 rounded-lg z-[60] text-sm shadow-lg';
      t.textContent = msg;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 2600);
    }

    function saveSquad() {
      const name = document.getElementById('b-name').value.trim();
      const err = document.getElementById('builder-error');
      err.classList.add('hidden');
      if (!name) { err.textContent = isRu?'Введите название метаагента':'Enter a meta-agent name'; err.classList.remove('hidden'); return; }
      if (!members.length) { err.textContent = isRu?'Добавьте хотя бы одного агента':'Add at least one agent'; err.classList.remove('hidden'); return; }

      const payload = {
        name,
        mission: document.getElementById('b-mission').value.trim(),
        supervisorRole: document.getElementById('b-supervisor').value,
        strategy: document.getElementById('b-strategy').value,
        thinkingMode: document.getElementById('b-thinking').value,
        members: members.map(m => ({ role: m.role, count: m.count })),
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        const idx = squads.findIndex(s => s.id === editingId);
        if (idx >= 0) squads[idx] = { ...squads[idx], ...payload };
      } else {
        payload.id = 'ma_' + Date.now().toString(36) + Math.random().toString(36).slice(2,7);
        payload.createdAt = payload.updatedAt;
        squads.unshift(payload);
      }
      persistSquads();
      renderSquads();
      closeBuilder();
      flash(isRu ? 'Метаагент сохранён' : 'Meta-agent saved', 'ok');
    }

    function deleteSquad(id) {
      const s = squads.find(x => x.id === id);
      if (!s) return;
      if (!confirm((isRu?'Удалить метаагента «':'Delete meta-agent "') + s.name + '"?')) return;
      squads = squads.filter(x => x.id !== id);
      persistSquads();
      renderSquads();
    }

    function duplicateSquad(id) {
      const s = squads.find(x => x.id === id);
      if (!s) return;
      const copy = JSON.parse(JSON.stringify(s));
      copy.id = 'ma_' + Date.now().toString(36) + Math.random().toString(36).slice(2,7);
      copy.name = s.name + (isRu ? ' (копия)' : ' (copy)');
      copy.createdAt = copy.updatedAt = new Date().toISOString();
      squads.unshift(copy);
      persistSquads();
      renderSquads();
    }

    // ─── Run: compose task → delegate to Meta-Orchestrator ────────────────
    // The squad only COMPOSES intent. Planning & execution happen in the
    // Meta-Orchestrator (which plans) and the execution layer. This page
    // never calls an LLM directly.
    function runSquad(id) {
      const s = squads.find(x => x.id === id);
      if (!s) return;
      const sup = findCat(s.supervisorRole);
      const total = s.members.reduce((n, m) => n + m.count, 0);
      const teamLines = s.members.map(m => {
        const c = findCat(m.role);
        return '- ' + m.count + '× ' + (c ? c.nameEn : m.role) + ' (' + m.role + ')';
      }).join('\\n');

      const prompt =
        '[Meta-Agent Squad: ' + s.name + ']\\n' +
        (s.mission ? 'Mission: ' + s.mission + '\\n' : '') +
        'Supervisor (meta-agent): ' + (sup ? sup.nameEn : s.supervisorRole) + ' (' + s.supervisorRole + ')\\n' +
        'Coordination strategy: ' + s.strategy + '\\n' +
        'Thinking mode: ' + s.thinkingMode + '\\n' +
        'Team — ' + total + ' agents total:\\n' + teamLines + '\\n\\n' +
        'Coordinate the team above under the supervisor to accomplish the mission. ' +
        'Decompose the work, delegate to the listed agent roles, and aggregate their outputs into a single result.';

      const url = '/meta?lang=' + lang +
        '&task=' + encodeURIComponent(prompt) +
        '&strategy=' + encodeURIComponent(s.strategy) +
        '&mode=' + encodeURIComponent(s.thinkingMode);
      window.location.href = url;
    }

    function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    // ─── Init ─────────────────────────────────────────────────────────────
    (async function init() {
      loadSquads();
      renderSquads();
      await loadCustomAgents();
      renderSquads(); // re-render to resolve custom-role names
    })();

    document.getElementById('builder-modal').addEventListener('click', e => {
      if (e.target === document.getElementById('builder-modal')) closeBuilder();
    });
  </script>
</body>
</html>
`
}
