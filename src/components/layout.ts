// Shared layout components with i18n support
import { Language, getSection } from '../i18n/translations'

export const head = (title: string, description: string = '', lang: Language = 'en') => `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <title>${title} | ERA DAL</title>
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
  
  return `
  <aside class="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 pt-16 z-40">
    <div class="p-4">
      <div class="flex items-center justify-between mb-4">
        <!-- Language Switcher in Sidebar -->
        <div class="lang-dropdown w-full">
          <button class="flex items-center justify-between w-full glass rounded-lg px-3 py-2 text-gray-300 hover:text-white text-sm">
            <span><i class="fas fa-globe mr-2"></i>${lang === 'ru' ? 'Русский' : 'English'}</span>
            <i class="fas fa-chevron-down text-xs"></i>
          </button>
          <div class="lang-dropdown-content w-full" style="position: relative; margin-top: 4px;">
            <div class="lang-dropdown-item ${lang === 'en' ? 'active' : ''}" onclick="setLang('en')">
              <span class="mr-2">🇬🇧</span> English
            </div>
            <div class="lang-dropdown-item ${lang === 'ru' ? 'active' : ''}" onclick="setLang('ru')">
              <span class="mr-2">🇷🇺</span> Русский
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex items-center space-x-3 mb-8 p-3 glass rounded-lg">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <i class="fas fa-user text-white"></i>
        </div>
        <div>
          <p class="text-white font-medium">Eugene</p>
          <p class="text-gray-400 text-xs">${sb.proPlan}</p>
        </div>
      </div>
      
      <nav class="space-y-1">
        <a href="/dashboard?lang=${lang}" class="sidebar-link ${activePage === 'dashboard' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-chart-pie w-5"></i>
          <span>${sb.dashboard}</span>
        </a>
        <a href="/playground?lang=${lang}" class="sidebar-link ${activePage === 'playground' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-flask w-5"></i>
          <span>${sb.playground}</span>
        </a>
        <a href="/history?lang=${lang}" class="sidebar-link ${activePage === 'history' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-history w-5"></i>
          <span>${sb.history}</span>
        </a>
        
        <div class="pt-4 mt-4 border-t border-gray-800">
          <p class="px-3 text-xs text-gray-500 uppercase tracking-wider mb-2">${sb.settings}</p>
        </div>
        
        <a href="/settings?lang=${lang}" class="sidebar-link ${activePage === 'settings' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-cog w-5"></i>
          <span>${sb.settings}</span>
        </a>
        <a href="/profile?lang=${lang}" class="sidebar-link ${activePage === 'profile' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-user-circle w-5"></i>
          <span>${sb.profile}</span>
        </a>
      </nav>
      
      <div class="absolute bottom-4 left-4 right-4">
        <div class="glass rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">${sb.apiCalls}</span>
            <span class="text-white text-sm font-medium">847 / 1000</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style="width: 84.7%"></div>
          </div>
          <a href="/pricing?lang=${lang}" class="text-blue-400 text-xs mt-2 inline-block hover:text-blue-300">${sb.upgradePlan} →</a>
        </div>
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
