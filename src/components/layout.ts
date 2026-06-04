// Shared layout components with i18n support
import { Language, getSection } from '../i18n/translations'

export const head = (title: string, description: string = '', lang: Language = 'en') => `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#4f46e5">
  <title>${title} | ERA DAL</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="/manifest.json">
  <link rel="apple-touch-icon" href="/icon-192.svg">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
  <style>
    .gradient-text {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .glass {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .card-hover {
      transition: all 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    .sidebar-link {
      transition: all 0.2s;
    }
    .sidebar-link:hover {
      background: rgba(59, 130, 246, 0.1);
      border-left: 3px solid #3b82f6;
    }
    .sidebar-link.active {
      background: rgba(59, 130, 246, 0.2);
      border-left: 3px solid #3b82f6;
    }
    .lang-dropdown {
      position: relative;
      display: inline-block;
    }
    .lang-dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      top: 100%;
      background: rgba(17, 24, 39, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      min-width: 120px;
      z-index: 100;
      overflow: hidden;
    }
    .lang-dropdown:hover .lang-dropdown-content {
      display: block;
    }
    .lang-dropdown-item {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      color: #d1d5db;
      transition: all 0.2s;
      cursor: pointer;
    }
    .lang-dropdown-item:hover {
      background: rgba(59, 130, 246, 0.2);
      color: white;
    }
    .lang-dropdown-item.active {
      background: rgba(59, 130, 246, 0.3);
      color: white;
    }
  </style>
  <script>
    // Language management
    function getCurrentLang() {
      return localStorage.getItem('era-dal-lang') || 'en';
    }
    
    function setLang(lang) {
      localStorage.setItem('era-dal-lang', lang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.location.href = url.toString();
    }
    
    // Initialize language on page load
    document.addEventListener('DOMContentLoaded', function() {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      const storedLang = localStorage.getItem('era-dal-lang');
      
      if (urlLang && ['en', 'ru'].includes(urlLang)) {
        localStorage.setItem('era-dal-lang', urlLang);
      } else if (storedLang && !urlLang) {
        // Redirect to stored language if not in URL
        const url = new URL(window.location.href);
        url.searchParams.set('lang', storedLang);
        if (storedLang !== 'en') {
          window.location.replace(url.toString());
        }
      }
    });
  </script>
`

export const navbar = (lang: Language = 'en') => {
  const nav = getSection('nav', lang)
  const isRu = lang === 'ru'
  
  return `
  <nav class="fixed top-0 left-0 right-0 z-50 glass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <a href="/?lang=${lang}" class="flex items-center space-x-2">
            <i class="fas fa-brain text-2xl text-blue-500"></i>
            <span class="text-xl font-bold gradient-text">ERA DAL</span>
          </a>
          <div class="hidden md:flex ml-10 space-x-4">
            <a href="/?lang=${lang}#features" class="text-gray-300 hover:text-white px-3 py-2 text-sm">${nav.features}</a>
            <a href="/?lang=${lang}#how-it-works" class="text-gray-300 hover:text-white px-3 py-2 text-sm">${nav.howItWorks}</a>
            <a href="/pricing?lang=${lang}" class="text-gray-300 hover:text-white px-3 py-2 text-sm">${nav.pricing}</a>
            <a href="/docs?lang=${lang}" class="text-gray-300 hover:text-white px-3 py-2 text-sm">${nav.docs}</a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Language Switcher -->
          <div class="lang-dropdown">
            <button class="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 text-sm">
              <i class="fas fa-globe"></i>
              <span>${isRu ? 'RU' : 'EN'}</span>
              <i class="fas fa-chevron-down text-xs"></i>
            </button>
            <div class="lang-dropdown-content">
              <div class="lang-dropdown-item ${!isRu ? 'active' : ''}" onclick="setLang('en')">
                <span class="mr-2">🇬🇧</span> English
              </div>
              <div class="lang-dropdown-item ${isRu ? 'active' : ''}" onclick="setLang('ru')">
                <span class="mr-2">🇷🇺</span> Русский
              </div>
            </div>
          </div>
          
          <a href="/dashboard?lang=${lang}" class="text-gray-300 hover:text-white px-3 py-2 text-sm">
            <i class="fas fa-chart-line mr-1"></i> ${nav.dashboard}
          </a>
          <a href="/playground?lang=${lang}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <i class="fas fa-play mr-1"></i> ${nav.tryNow}
          </a>
        </div>
      </div>
    </div>
  </nav>
`
}

export const sidebar = (activePage: string = 'dashboard', lang: Language = 'en') => {
  const sb = getSection('sidebar', lang)
  const isRu = lang === 'ru'

  const link = (page: string, href: string, icon: string, iconColor: string, label: string) =>
    `<a href="${href}?lang=${lang}" data-sb-link
        class="sidebar-link ${activePage === page ? 'active' : ''} flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-gray-300 hover:text-white text-sm"
        title="${label}">
       <i class="${icon} w-4 text-center flex-shrink-0 ${iconColor}" style="font-size:13px"></i>
       <span class="sb-label truncate">${label}</span>
     </a>`

  const sectionHeader = (id: string, label: string, colorClass: string, topBorder = false) =>
    `<button onclick="sbSection('${id}')"
        class="w-full flex items-center justify-between px-3 ${topBorder ? 'mt-2 pt-3' : 'pt-2'} pb-1 group${topBorder ? ' border-t border-gray-800' : ''}">
       <span class="sb-label text-xs ${colorClass} uppercase tracking-wider font-semibold">${label}</span>
       <i id="sbch-${id}" class="fas fa-chevron-down text-xs text-gray-600 group-hover:text-gray-400 transition-transform duration-200"></i>
     </button>`

  return `
  <!-- ── Sidebar ── -->
  <aside id="app-sidebar" class="fixed left-0 top-0 h-screen w-56 bg-gray-900 border-r border-gray-800 z-40 flex flex-col select-none transition-all duration-200">

    <!-- Top: brand + collapse toggle -->
    <div class="flex-shrink-0 px-3 pt-3 pb-2 border-b border-gray-800">
      <div class="flex items-center justify-between mb-3">
        <a href="/dashboard?lang=${lang}" class="flex items-center gap-2 group min-w-0">
          <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-sitemap text-white" style="font-size:11px"></i>
          </div>
          <span class="sb-label font-bold text-white text-sm tracking-wide whitespace-nowrap">ERA <span class="text-violet-400">DAL</span></span>
        </a>
        <div class="flex items-center gap-1">
          <!-- Notification bell -->
          <button id="notif-btn" onclick="toggleNotifs()" title="${isRu ? 'Уведомления' : 'Notifications'}"
              class="relative flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition">
            <i class="fas fa-bell" style="font-size:11px"></i>
            <span id="notif-badge" class="hidden absolute -top-0.5 -right-0.5 min-w-[14px] h-3.5 bg-red-500 rounded-full text-white px-0.5 flex items-center justify-center leading-none" style="font-size:8px">0</span>
          </button>
          <!-- Collapse sidebar button -->
          <button onclick="sbCollapse()" title="${isRu ? 'Свернуть/развернуть' : 'Collapse/expand'}"
              class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition">
            <i id="sb-collapse-icon" class="fas fa-angles-left" style="font-size:11px"></i>
          </button>
        </div>
      </div>

      <!-- User row -->
      <div class="flex items-center gap-2 px-1">
        <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <i class="fas fa-user text-white" style="font-size:9px"></i>
        </div>
        <div class="sb-label min-w-0">
          <p class="text-white text-xs font-medium leading-tight truncate">Eugene</p>
          <p class="text-gray-500 text-xs leading-tight">${sb.proPlan}</p>
        </div>
        <div class="sb-label lang-dropdown ml-auto">
          <button class="text-gray-500 hover:text-gray-300 transition" title="${isRu ? 'Язык' : 'Language'}">
            <span style="font-size:14px">${lang === 'ru' ? '🇷🇺' : '🇬🇧'}</span>
          </button>
          <div class="lang-dropdown-content" style="right:0;top:100%;min-width:110px">
            <div class="lang-dropdown-item ${lang === 'en' ? 'active' : ''}" onclick="setLang('en')">🇬🇧 English</div>
            <div class="lang-dropdown-item ${lang === 'ru' ? 'active' : ''}" onclick="setLang('ru')">🇷🇺 Русский</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Middle: scrollable nav -->
    <nav class="flex-1 overflow-y-auto px-2 py-2 sidebar-scroll">

      <!-- Meta-Orchestrator -->
      ${sectionHeader('meta', 'Meta-Orchestrator', 'text-violet-400/70')}
      <div id="sbsec-meta" class="space-y-0.5">
        ${link('meta',           '/meta',           'fas fa-sitemap',    'text-violet-400', isRu ? 'Оркестратор'      : 'Orchestrator')}
        ${link('agents',         '/agents',         'fas fa-users',      'text-blue-400',   isRu ? 'Цифр. сотрудники' : 'Digital Staff')}
        ${link('scenarios',      '/scenarios',      'fas fa-layer-group','text-green-400',  isRu ? 'Сценарии'         : 'Scenarios')}
        ${link('knowledge-base', '/knowledge-base', 'fas fa-database',   'text-cyan-400',   isRu ? 'Базы знаний'      : 'Knowledge Bases')}
        ${link('journal',        '/journal',        'fas fa-scroll',     'text-gray-400',   isRu ? 'Журнал'           : 'Journal')}
      </div>

      <!-- ERA DAL -->
      ${sectionHeader('dal', 'ERA DAL', 'text-gray-500', true)}
      <div id="sbsec-dal" class="space-y-0.5">
        ${link('dashboard',  '/dashboard',  'fas fa-chart-pie', 'text-cyan-400',   sb.dashboard)}
        ${link('playground', '/playground', 'fas fa-flask',     'text-yellow-400', sb.playground)}
        ${link('history',    '/history',    'fas fa-history',   'text-gray-400',   sb.history)}
      </div>

      <!-- Tasks & Projects -->
      ${sectionHeader('tasks', isRu ? 'Задачи и проекты' : 'Tasks & Projects', 'text-gray-500', true)}
      <div id="sbsec-tasks" class="space-y-0.5">
        ${link('tasks',    '/tasks',    'fas fa-list-check',  'text-blue-400',   isRu ? 'Задачи'   : 'Tasks')}
        ${link('projects', '/projects', 'fas fa-folder-open', 'text-green-400',  isRu ? 'Проекты'  : 'Projects')}
        ${link('goals',    '/goals',    'fas fa-bullseye',    'text-yellow-400', isRu ? 'Цели OKR' : 'Goals OKR')}
      </div>

      <!-- Company -->
      ${sectionHeader('company', isRu ? 'Компания' : 'Company', 'text-gray-500', true)}
      <div id="sbsec-company" class="space-y-0.5">
        ${link('company',     '/company',     'fas fa-building',      'text-cyan-400',    isRu ? 'Оргструктура'   : 'Company')}
        ${link('regulations', '/regulations', 'fas fa-book-open',     'text-orange-400',  isRu ? 'Регламенты'     : 'Regulations')}
        ${link('expenses',    '/expenses',    'fas fa-receipt',       'text-red-400',     isRu ? 'Расходы'        : 'Expenses')}
      </div>

      <!-- Settings -->
      ${sectionHeader('cfg', isRu ? 'Настройки' : 'Settings', 'text-gray-500', true)}
      <div id="sbsec-cfg" class="space-y-0.5">
        ${link('ai-config',    '/ai-config',    'fas fa-robot',       'text-purple-400', isRu ? 'AI Провайдеры' : 'AI Providers')}
        ${link('integrations', '/integrations', 'fas fa-plug',        'text-blue-400',   isRu ? 'Интеграции'   : 'Integrations')}
        ${link('settings',     '/settings',     'fas fa-cog',         'text-gray-400',   sb.settings)}
        ${link('profile',      '/profile',      'fas fa-user-circle', 'text-gray-400',   sb.profile)}
      </div>
    </nav>

    <!-- Bottom: API usage (never overlaps nav) -->
    <div class="flex-shrink-0 px-3 py-2 border-t border-gray-800">
      <div id="sb-usage" class="sb-label glass rounded-lg px-3 py-2">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-gray-400 text-xs">${sb.apiCalls}</span>
          <span class="text-white text-xs font-medium">847/1k</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-1.5">
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style="width:84.7%"></div>
        </div>
        <a href="/pricing?lang=${lang}" class="text-blue-400 text-xs mt-1 inline-block hover:text-blue-300">${sb.upgradePlan} →</a>
      </div>
      <!-- Collapsed: show tiny dot indicator -->
      <div id="sb-usage-mini" class="hidden justify-center py-1">
        <div class="w-2 h-2 rounded-full bg-blue-500" title="847/1000 API calls"></div>
      </div>
    </div>
  </aside>

  <!-- ── Notifications Panel ── -->
  <div id="notif-panel" class="hidden fixed left-56 top-0 bottom-0 w-72 bg-gray-900 border-r border-gray-700 z-30 flex flex-col shadow-2xl transition-all" style="transition:left 0.2s">
    <div class="flex-shrink-0 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
      <span class="text-sm font-semibold text-white">${isRu ? 'Уведомления' : 'Notifications'}</span>
      <div class="flex items-center gap-3">
        <button onclick="clearAllNotifs()" class="text-xs text-gray-500 hover:text-gray-300">${isRu ? 'Прочитать всё' : 'Mark all read'}</button>
        <button onclick="toggleNotifs()" class="text-gray-400 hover:text-white w-5 h-5 flex items-center justify-center">
          <i class="fas fa-times text-xs"></i>
        </button>
      </div>
    </div>
    <div id="notif-list" class="flex-1 overflow-y-auto divide-y divide-gray-800/60">
      <div class="py-8 text-center text-gray-500 text-sm" id="notif-empty">
        <i class="fas fa-bell-slash text-2xl mb-2 block text-gray-700"></i>
        ${isRu ? 'Нет уведомлений' : 'No notifications'}
      </div>
    </div>
  </div>
  <!-- Click outside to close notif panel -->
  <div id="notif-overlay" class="hidden fixed inset-0 z-20" onclick="toggleNotifs()"></div>

  <script>
  (function() {
    var SB_W  = '14rem';   // expanded  (w-56)
    var SB_WC = '3rem';    // collapsed (w-12)

    /* ── Section accordion ─────────────────────────────── */
    function sbSection(id) {
      var sec = document.getElementById('sbsec-' + id);
      var ch  = document.getElementById('sbch-'  + id);
      if (!sec) return;
      var isHidden = sec.style.display === 'none';
      sec.style.display = isHidden ? '' : 'none';
      if (ch) ch.style.transform = isHidden ? '' : 'rotate(-90deg)';
      localStorage.setItem('era-sb-sec-' + id, isHidden ? '0' : '1');
    }
    window.sbSection = sbSection;

    /* ── Full sidebar collapse ──────────────────────────── */
    function sbCollapse() {
      var sb   = document.getElementById('app-sidebar');
      var icon = document.getElementById('sb-collapse-icon');
      var main = document.querySelector('main') || document.querySelector('[data-main]');
      var collapsed = sb.dataset.sbCollapsed === '1';

      if (collapsed) {
        // expand
        sb.style.width = SB_W;
        sb.dataset.sbCollapsed = '0';
        if (main) main.style.marginLeft = SB_W;
        if (icon) { icon.classList.remove('fa-angles-right'); icon.classList.add('fa-angles-left'); }
        sb.querySelectorAll('.sb-label').forEach(function(el) { el.style.display = ''; });
        sb.querySelectorAll('[data-sb-link]').forEach(function(el) { el.style.justifyContent = ''; el.style.padding = ''; });
        var usageFull = document.getElementById('sb-usage');
        var usageMini = document.getElementById('sb-usage-mini');
        if (usageFull) usageFull.style.display = '';
        if (usageMini) usageMini.style.display = 'none';
        localStorage.setItem('era-sb-collapsed', '0');
      } else {
        // collapse
        sb.style.width = SB_WC;
        sb.dataset.sbCollapsed = '1';
        if (main) main.style.marginLeft = SB_WC;
        if (icon) { icon.classList.remove('fa-angles-left'); icon.classList.add('fa-angles-right'); }
        sb.querySelectorAll('.sb-label').forEach(function(el) { el.style.display = 'none'; });
        sb.querySelectorAll('[data-sb-link]').forEach(function(el) { el.style.justifyContent = 'center'; el.style.padding = '0.375rem 0'; });
        var usageFull = document.getElementById('sb-usage');
        var usageMini = document.getElementById('sb-usage-mini');
        if (usageFull) usageFull.style.display = 'none';
        if (usageMini) usageMini.style.display = 'flex';
        localStorage.setItem('era-sb-collapsed', '1');
      }
    }
    window.sbCollapse = sbCollapse;

    /* ── Restore state on load ──────────────────────────── */
    document.addEventListener('DOMContentLoaded', function() {
      // Restore section states
      ['meta', 'dal', 'cfg'].forEach(function(id) {
        if (localStorage.getItem('era-sb-sec-' + id) === '1') {
          var sec = document.getElementById('sbsec-' + id);
          var ch  = document.getElementById('sbch-'  + id);
          if (sec) sec.style.display = 'none';
          if (ch)  ch.style.transform = 'rotate(-90deg)';
        }
      });
      // Restore collapsed state
      if (localStorage.getItem('era-sb-collapsed') === '1') {
        sbCollapse();
      }
    });

    /* ── Notifications ──────────────────────────────────────────────── */
    var notifUnread = 0;
    var notifData   = [];

    var NOTIF_ICONS = {
      success: { icon:'fa-check-circle', color:'text-green-400', bg:'bg-green-900/20' },
      error:   { icon:'fa-times-circle', color:'text-red-400',   bg:'bg-red-900/20'   },
      pending: { icon:'fa-clock',        color:'text-yellow-400',bg:'bg-yellow-900/20'},
      info:    { icon:'fa-info-circle',  color:'text-blue-400',  bg:'bg-blue-900/20'  },
    };

    function toggleNotifs() {
      var panel   = document.getElementById('notif-panel');
      var overlay = document.getElementById('notif-overlay');
      var isOpen  = !panel.classList.contains('hidden');
      if (isOpen) {
        panel.classList.add('hidden');
        overlay.classList.add('hidden');
      } else {
        // Adjust panel position for collapsed sidebar
        var sb = document.getElementById('app-sidebar');
        panel.style.left = sb && sb.dataset.sbCollapsed === '1' ? '3rem' : '14rem';
        panel.classList.remove('hidden');
        overlay.classList.remove('hidden');
        notifUnread = 0;
        var badge = document.getElementById('notif-badge');
        if (badge) badge.classList.add('hidden');
        localStorage.setItem('era-notif-read', Date.now().toString());
      }
    }
    window.toggleNotifs = toggleNotifs;

    function renderNotifs() {
      var list  = document.getElementById('notif-list');
      var empty = document.getElementById('notif-empty');
      if (!list) return;
      if (!notifData.length) {
        if (empty) empty.style.display = '';
        return;
      }
      if (empty) empty.style.display = 'none';
      list.innerHTML = notifData.map(function(ev) {
        var s = NOTIF_ICONS[ev.type] || NOTIF_ICONS.info;
        return '<div class="flex items-start gap-3 px-4 py-3 hover:bg-gray-800/40 transition '+s.bg+'">'
          + '<i class="fas '+s.icon+' '+s.color+' mt-0.5 flex-shrink-0" style="font-size:13px"></i>'
          + '<div class="flex-1 min-w-0">'
          + '<p class="text-xs font-medium text-white leading-tight">'+(ev.title||ev.type)+'</p>'
          + '<p class="text-xs text-gray-400 mt-0.5 line-clamp-2">'+(ev.description||'')+'</p>'
          + '<p class="text-xs text-gray-600 mt-1">'+(ev.time||'')+'</p>'
          + '</div></div>';
      }).join('');
    }

    function clearAllNotifs() {
      notifUnread = 0;
      var badge = document.getElementById('notif-badge');
      if (badge) badge.classList.add('hidden');
      localStorage.setItem('era-notif-read', Date.now().toString());
    }
    window.clearAllNotifs = clearAllNotifs;

    function loadNotifs() {
      fetch('/api/events?limit=15')
        .then(function(r){ return r.json(); })
        .then(function(data) {
          notifData = data.events || [];
          var lastRead = parseInt(localStorage.getItem('era-notif-read') || '0');
          var newCount = notifData.filter(function(ev) {
            var t = ev.timestamp ? new Date(ev.timestamp).getTime() : 0;
            return t > lastRead;
          }).length;
          notifUnread = newCount || (notifData.length > 0 ? 0 : 0);
          var badge = document.getElementById('notif-badge');
          if (badge) {
            if (notifUnread > 0) {
              badge.textContent = notifUnread > 9 ? '9+' : notifUnread;
              badge.classList.remove('hidden');
            } else {
              badge.classList.add('hidden');
            }
          }
          renderNotifs();
        })
        .catch(function() {
          // Show mock events when no DB
          notifData = [
            { type:'success', title:'${isRu ? 'Задача завершена' : 'Task completed'}',    description:'${isRu ? 'Анализ конкурентов выполнен' : 'Competitor analysis done'}', time:'2m ago' },
            { type:'success', title:'${isRu ? 'Консенсус достигнут' : 'Consensus reached'}', description:'5/7 ${isRu ? 'моделей согласны' : 'models agreed'}', time:'5m ago' },
            { type:'pending', title:'${isRu ? 'Обработка' : 'Processing'}',              description:'${isRu ? 'Прогноз продаж...' : 'Sales forecast running...'}', time:'8m ago' },
            { type:'error',   title:'${isRu ? 'Ошибка агента' : 'Agent timeout'}',        description:'Llama-3.1 ${isRu ? 'превысил лимит' : 'exceeded timeout'}', time:'22m ago' },
          ];
          renderNotifs();
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
      loadNotifs();
      setInterval(loadNotifs, 60000); // refresh every 60s
    });

  })();
  </script>
`
}

export const footer = (lang: Language = 'en') => {
  const ft = getSection('footer', lang)
  const nav = getSection('nav', lang)
  
  return `
  <footer class="bg-gray-900 border-t border-gray-800 py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <i class="fas fa-brain text-2xl text-blue-500"></i>
            <span class="text-xl font-bold gradient-text">ERA DAL</span>
          </div>
          <p class="text-gray-400 text-sm">
            ${ft.description}
          </p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">${ft.product}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="/?lang=${lang}#features" class="hover:text-white">${nav.features}</a></li>
            <li><a href="/pricing?lang=${lang}" class="hover:text-white">${nav.pricing}</a></li>
            <li><a href="/docs?lang=${lang}" class="hover:text-white">${ft.documentation}</a></li>
            <li><a href="/playground?lang=${lang}" class="hover:text-white">${nav.tryNow}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">${ft.resources}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer" class="hover:text-white">GitHub</a></li>
            <li><a href="/docs?lang=${lang}" class="hover:text-white">${ft.apiReference}</a></li>
            <li><a href="/docs?lang=${lang}#examples" class="hover:text-white">${lang === 'ru' ? 'Примеры' : 'Examples'}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">${ft.contact}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer/issues" class="hover:text-white">${ft.support}</a></li>
            <li><a href="mailto:contact@era-dal.com" class="hover:text-white">Email</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
        © 2025 ERA DAL. ${ft.allRightsReserved} ${ft.builtBy}
      </div>
    </div>
  </footer>
`
}
