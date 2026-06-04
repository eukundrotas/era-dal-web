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
    `<a href="${href}?lang=${lang}" class="sidebar-link ${activePage === page ? 'active' : ''} flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-gray-300 hover:text-white text-sm">
       <i class="${icon} w-4 text-center flex-shrink-0 ${iconColor}" style="font-size:13px"></i>
       <span class="truncate">${label}</span>
     </a>`

  return `
  <!-- ── Sidebar ── -->
  <aside class="fixed left-0 top-0 h-screen w-56 bg-gray-900 border-r border-gray-800 z-40 flex flex-col select-none">

    <!-- Top: brand + user -->
    <div class="flex-shrink-0 px-3 pt-3 pb-2 border-b border-gray-800">
      <!-- Brand -->
      <a href="/dashboard?lang=${lang}" class="flex items-center gap-2 px-1 mb-3 group">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center flex-shrink-0">
          <i class="fas fa-sitemap text-white" style="font-size:11px"></i>
        </div>
        <span class="font-bold text-white text-sm tracking-wide">ERA <span class="text-violet-400">DAL</span></span>
      </a>

      <!-- User row -->
      <div class="flex items-center gap-2 px-1">
        <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <i class="fas fa-user text-white" style="font-size:9px"></i>
        </div>
        <div class="min-w-0">
          <p class="text-white text-xs font-medium leading-tight truncate">Eugene</p>
          <p class="text-gray-500 text-xs leading-tight">${sb.proPlan}</p>
        </div>
        <!-- Language toggle -->
        <div class="lang-dropdown ml-auto">
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
    <nav class="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 sidebar-scroll">

      <!-- Meta-Orchestrator -->
      <p class="px-3 pt-2 pb-1 text-xs text-violet-400/60 uppercase tracking-wider font-semibold">Meta-Orchestrator</p>
      ${link('meta',      '/meta',      'fas fa-sitemap',    'text-violet-400', isRu ? 'Оркестратор' : 'Orchestrator')}
      ${link('agents',    '/agents',    'fas fa-users',      'text-blue-400',   isRu ? 'Агенты'      : 'Agents')}
      ${link('scenarios', '/scenarios', 'fas fa-layer-group','text-green-400',  isRu ? 'Сценарии'    : 'Scenarios')}
      ${link('journal',   '/journal',   'fas fa-scroll',     'text-gray-400',   isRu ? 'Журнал'      : 'Journal')}

      <!-- ERA DAL -->
      <p class="px-3 pt-3 pb-1 text-xs text-gray-500 uppercase tracking-wider font-semibold border-t border-gray-800 mt-2">ERA DAL</p>
      ${link('dashboard',  '/dashboard',  'fas fa-chart-pie', 'text-cyan-400',   sb.dashboard)}
      ${link('playground', '/playground', 'fas fa-flask',     'text-yellow-400', sb.playground)}
      ${link('history',    '/history',    'fas fa-history',   'text-gray-400',   sb.history)}

      <!-- Settings -->
      <p class="px-3 pt-3 pb-1 text-xs text-gray-500 uppercase tracking-wider font-semibold border-t border-gray-800 mt-2">${sb.settings}</p>
      ${link('ai-config',    '/ai-config',    'fas fa-robot',       'text-purple-400', isRu ? 'AI Провайдеры' : 'AI Providers')}
      ${link('integrations', '/integrations', 'fas fa-plug',        'text-blue-400',   isRu ? 'Интеграции'   : 'Integrations')}
      ${link('settings',     '/settings',     'fas fa-cog',         'text-gray-400',   sb.settings)}
      ${link('profile',      '/profile',      'fas fa-user-circle', 'text-gray-400',   sb.profile)}
    </nav>

    <!-- Bottom: API usage (never overlaps nav) -->
    <div class="flex-shrink-0 px-3 py-2 border-t border-gray-800">
      <div class="glass rounded-lg px-3 py-2">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-gray-400 text-xs">${sb.apiCalls}</span>
          <span class="text-white text-xs font-medium">847/1k</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-1.5">
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style="width:84.7%"></div>
        </div>
        <a href="/pricing?lang=${lang}" class="text-blue-400 text-xs mt-1 inline-block hover:text-blue-300">${sb.upgradePlan} →</a>
      </div>
    </div>
  </aside>
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
