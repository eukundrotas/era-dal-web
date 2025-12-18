// Shared layout components with i18n support
import { Language, translations, i18nClientScript } from '../i18n/translations'

// Helper to get translation value
function t(lang: Language, path: string): string {
  const keys = path.split('.')
  let result: any = translations[lang]
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key]
    } else {
      return path
    }
  }
  
  return typeof result === 'string' ? result : path
}

export const head = (title: string, description: string = '', lang: Language = 'en') => `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <title>${title} | ERA DAL</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
  ${i18nClientScript}
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
      border-radius: 0.5rem;
      min-width: 120px;
      z-index: 100;
      margin-top: 0.5rem;
    }
    .lang-dropdown:hover .lang-dropdown-content {
      display: block;
    }
    .lang-dropdown-content a {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      color: #d1d5db;
      text-decoration: none;
      transition: all 0.2s;
    }
    .lang-dropdown-content a:hover {
      background: rgba(59, 130, 246, 0.2);
      color: white;
    }
    .lang-dropdown-content a.active {
      background: rgba(59, 130, 246, 0.3);
      color: white;
    }
  </style>
`

export const navbar = (lang: Language = 'en', activePage: string = '') => `
  <nav class="fixed top-0 left-0 right-0 z-50 glass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <a href="/${lang === 'ru' ? '?lang=ru' : ''}" class="flex items-center space-x-2">
            <i class="fas fa-brain text-2xl text-blue-500"></i>
            <span class="text-xl font-bold gradient-text">ERA DAL</span>
          </a>
          <div class="hidden md:flex ml-10 space-x-4">
            <a href="/${lang === 'ru' ? '?lang=ru' : ''}#features" class="text-gray-300 hover:text-white px-3 py-2 text-sm">${t(lang, 'nav.features')}</a>
            <a href="/${lang === 'ru' ? '?lang=ru' : ''}#how-it-works" class="text-gray-300 hover:text-white px-3 py-2 text-sm">${t(lang, 'nav.howItWorks')}</a>
            <a href="/pricing${lang === 'ru' ? '?lang=ru' : ''}" class="text-gray-300 hover:text-white px-3 py-2 text-sm">${t(lang, 'nav.pricing')}</a>
            <a href="/docs${lang === 'ru' ? '?lang=ru' : ''}" class="text-gray-300 hover:text-white px-3 py-2 text-sm">${t(lang, 'nav.docs')}</a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Language Switcher -->
          <div class="lang-dropdown">
            <button class="text-gray-300 hover:text-white px-3 py-2 text-sm flex items-center">
              <i class="fas fa-globe mr-2"></i>
              ${lang === 'ru' ? 'RU' : 'EN'}
              <i class="fas fa-chevron-down ml-1 text-xs"></i>
            </button>
            <div class="lang-dropdown-content">
              <a href="?lang=en" class="${lang === 'en' ? 'active' : ''}" onclick="setLang('en')">
                <span class="mr-2">🇬🇧</span> English
              </a>
              <a href="?lang=ru" class="${lang === 'ru' ? 'active' : ''}" onclick="setLang('ru')">
                <span class="mr-2">🇷🇺</span> Русский
              </a>
            </div>
          </div>
          
          <a href="/dashboard${lang === 'ru' ? '?lang=ru' : ''}" class="text-gray-300 hover:text-white px-3 py-2 text-sm">
            <i class="fas fa-chart-line mr-1"></i> ${t(lang, 'nav.dashboard')}
          </a>
          <a href="/playground${lang === 'ru' ? '?lang=ru' : ''}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <i class="fas fa-play mr-1"></i> ${t(lang, 'nav.tryNow')}
          </a>
        </div>
      </div>
    </div>
  </nav>
`

export const sidebar = (lang: Language = 'en', activePage: string = 'dashboard') => `
  <aside class="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 pt-16 z-40">
    <div class="p-4">
      <div class="flex items-center space-x-3 mb-8 p-3 glass rounded-lg">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <i class="fas fa-user text-white"></i>
        </div>
        <div>
          <p class="text-white font-medium">Eugene</p>
          <p class="text-gray-400 text-xs">Pro Plan</p>
        </div>
      </div>
      
      <!-- Language Switcher in Sidebar -->
      <div class="mb-6 p-3 bg-gray-800 rounded-lg">
        <div class="flex items-center justify-between">
          <span class="text-gray-400 text-sm"><i class="fas fa-globe mr-2"></i>${t(lang, 'settings.language')}</span>
          <div class="flex space-x-1">
            <a href="?lang=en" class="px-2 py-1 text-xs rounded ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}" onclick="setLang('en')">EN</a>
            <a href="?lang=ru" class="px-2 py-1 text-xs rounded ${lang === 'ru' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}" onclick="setLang('ru')">RU</a>
          </div>
        </div>
      </div>
      
      <nav class="space-y-1">
        <a href="/dashboard${lang === 'ru' ? '?lang=ru' : ''}" class="sidebar-link ${activePage === 'dashboard' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-chart-pie w-5"></i>
          <span>${t(lang, 'nav.dashboard')}</span>
        </a>
        <a href="/playground${lang === 'ru' ? '?lang=ru' : ''}" class="sidebar-link ${activePage === 'playground' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-flask w-5"></i>
          <span>${t(lang, 'nav.playground')}</span>
        </a>
        <a href="/history${lang === 'ru' ? '?lang=ru' : ''}" class="sidebar-link ${activePage === 'history' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-history w-5"></i>
          <span>${t(lang, 'nav.history')}</span>
        </a>
        
        <div class="pt-4 mt-4 border-t border-gray-800">
          <p class="px-3 text-xs text-gray-500 uppercase tracking-wider mb-2">${t(lang, 'nav.settings')}</p>
        </div>
        
        <a href="/settings${lang === 'ru' ? '?lang=ru' : ''}" class="sidebar-link ${activePage === 'settings' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-cog w-5"></i>
          <span>${t(lang, 'nav.settings')}</span>
        </a>
        <a href="/profile${lang === 'ru' ? '?lang=ru' : ''}" class="sidebar-link ${activePage === 'profile' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-user-circle w-5"></i>
          <span>${t(lang, 'nav.profile')}</span>
        </a>
      </nav>
      
      <div class="absolute bottom-4 left-4 right-4">
        <div class="glass rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">${t(lang, 'profile.apiCalls')}</span>
            <span class="text-white text-sm font-medium">847 / 1000</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style="width: 84.7%"></div>
          </div>
          <a href="/pricing${lang === 'ru' ? '?lang=ru' : ''}" class="text-blue-400 text-xs mt-2 inline-block hover:text-blue-300">${t(lang, 'profile.upgradePlan')} →</a>
        </div>
      </div>
    </div>
  </aside>
`

export const footer = (lang: Language = 'en') => `
  <footer class="bg-gray-900 border-t border-gray-800 py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <i class="fas fa-brain text-2xl text-blue-500"></i>
            <span class="text-xl font-bold gradient-text">ERA DAL</span>
          </div>
          <p class="text-gray-400 text-sm">
            ${t(lang, 'footer.description')}
          </p>
          <!-- Language Switcher in Footer -->
          <div class="mt-4 flex items-center space-x-2">
            <span class="text-gray-500 text-sm"><i class="fas fa-globe mr-1"></i></span>
            <a href="?lang=en" class="text-sm ${lang === 'en' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}">EN</a>
            <span class="text-gray-600">|</span>
            <a href="?lang=ru" class="text-sm ${lang === 'ru' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}">RU</a>
          </div>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">${t(lang, 'footer.product')}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="/${lang === 'ru' ? '?lang=ru' : ''}#features" class="hover:text-white">${t(lang, 'nav.features')}</a></li>
            <li><a href="/pricing${lang === 'ru' ? '?lang=ru' : ''}" class="hover:text-white">${t(lang, 'nav.pricing')}</a></li>
            <li><a href="/docs${lang === 'ru' ? '?lang=ru' : ''}" class="hover:text-white">${t(lang, 'nav.docs')}</a></li>
            <li><a href="/playground${lang === 'ru' ? '?lang=ru' : ''}" class="hover:text-white">${t(lang, 'nav.playground')}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">${t(lang, 'footer.resources')}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer" class="hover:text-white">GitHub</a></li>
            <li><a href="/docs${lang === 'ru' ? '?lang=ru' : ''}" class="hover:text-white">${t(lang, 'footer.apiReference')}</a></li>
            <li><a href="/docs${lang === 'ru' ? '?lang=ru' : ''}" class="hover:text-white">${t(lang, 'docs.examples')}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">${t(lang, 'footer.contact')}</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer/issues" class="hover:text-white">${t(lang, 'footer.support')}</a></li>
            <li><a href="mailto:contact@era-dal.com" class="hover:text-white">Email</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
        ${t(lang, 'footer.copyright')}
      </div>
    </div>
  </footer>
`
