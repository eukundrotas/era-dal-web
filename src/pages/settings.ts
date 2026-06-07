import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const settingsPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'Профиль и настройки' : 'Profile & Settings'

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, isRu ? 'Управление профилем и настройками ERA DAL' : 'Manage your ERA DAL profile and preferences', lang)}
  <style>
    .tab-btn{transition:all .15s;border-bottom:2px solid transparent;padding:.6rem 1.25rem;font-size:.875rem;font-weight:500;color:#9ca3af}
    .tab-btn.active{border-bottom-color:#8b5cf6;color:#fff}
    .toggle-track{width:2.75rem;height:1.5rem;background:#374151;border-radius:9999px;position:relative;cursor:pointer;transition:.2s}
    .toggle-track.on{background:#2563eb}
    .toggle-thumb{position:absolute;top:2px;left:2px;width:1.25rem;height:1.25rem;background:#fff;border-radius:50%;transition:.2s}
    .toggle-track.on .toggle-thumb{transform:translateX(1.25rem)}
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('settings', lang)}

  <main class="ml-56 pt-4 min-h-screen">
    <div class="p-6 max-w-4xl">

      <!-- Header -->
      <div class="flex items-center gap-3 mb-4">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
          <i class="fas fa-user-cog text-white text-sm"></i>
        </div>
        <div>
          <h1 class="text-2xl font-bold">${title}</h1>
          <p class="text-gray-400 text-sm">${isRu ? 'Аккаунт, подписка и настройки платформы' : 'Account, subscription and platform preferences'}</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex items-center gap-1 mb-6 border-b border-gray-800">
        <button id="tab-profile" onclick="switchTab('profile')" class="tab-btn active">
          <i class="fas fa-user mr-2 text-blue-400"></i>${isRu ? 'Профиль' : 'Profile'}
        </button>
        <button id="tab-prefs" onclick="switchTab('prefs')" class="tab-btn">
          <i class="fas fa-sliders-h mr-2 text-gray-500"></i>${isRu ? 'Настройки' : 'Preferences'}
        </button>
      </div>

      <!-- ── TAB: Profile ── -->
      <div id="panel-profile" class="space-y-6">

        <!-- Profile card -->
        <div class="glass rounded-xl p-6">
          <div class="flex items-center gap-5 mb-6">
            <div class="relative">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">EK</div>
              <button class="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                <i class="fas fa-camera text-xs"></i>
              </button>
            </div>
            <div>
              <h2 class="text-xl font-bold">Eugene Kundrotas</h2>
              <p class="text-gray-400 text-sm">eu.kundrotas@gmail.com</p>
              <span class="mt-1 inline-block bg-purple-500/20 text-purple-400 px-3 py-0.5 rounded-full text-xs">
                <i class="fas fa-crown mr-1"></i>Pro Plan
              </span>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-400 text-sm mb-1.5">${isRu ? 'Полное имя' : 'Full name'}</label>
              <input type="text" value="Eugene Kundrotas"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition text-sm">
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-1.5">Email</label>
              <input type="email" value="eu.kundrotas@gmail.com"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition text-sm">
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-1.5">${isRu ? 'Организация' : 'Organization'}</label>
              <input type="text" value="UAB Propriezura"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition text-sm">
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-1.5">${isRu ? 'Должность / специальность' : 'Role / specialty'}</label>
              <input type="text" placeholder="${isRu ? 'Исследователь, инженер, аналитик...' : 'Researcher, engineer, analyst...'}"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition text-sm">
            </div>
          </div>
          <button class="mt-5 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-sm transition">
            <i class="fas fa-save mr-2"></i>${isRu ? 'Сохранить' : 'Save changes'}
          </button>
        </div>

        <!-- Subscription -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-base font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-credit-card text-green-400"></i>
            ${isRu ? 'Подписка' : 'Subscription'}
          </h3>
          <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-5 mb-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-purple-200 text-xs">${isRu ? 'Текущий план' : 'Current plan'}</p>
                <p class="text-white text-xl font-bold">Pro Plan</p>
                <p class="text-purple-200 text-xs mt-1">$49/${isRu ? 'месяц' : 'month'}</p>
              </div>
              <div class="text-right">
                <p class="text-purple-200 text-xs">API ${isRu ? 'Вызовы' : 'Calls'}</p>
                <p class="text-white text-xl font-bold">847 / 10k</p>
                <p class="text-purple-200 text-xs mt-1">8.47% ${isRu ? 'использовано' : 'used'}</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="bg-gray-800 rounded-lg p-3 text-center">
              <p class="text-gray-400 text-xs">${isRu ? 'Моделей' : 'Models'}</p>
              <p class="text-white font-bold">12+</p>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center">
              <p class="text-gray-400 text-xs">${isRu ? 'Параллельно' : 'Parallel'}</p>
              <p class="text-white font-bold">${isRu ? 'Без огр.' : 'Unlimited'}</p>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center">
              <p class="text-gray-400 text-xs">Support</p>
              <p class="text-green-400 font-bold"><i class="fas fa-check"></i></p>
            </div>
          </div>
          <div class="flex gap-3">
            <a href="/pricing?lang=${lang}" class="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-sm transition">
              <i class="fas fa-arrow-up mr-2"></i>${isRu ? 'Улучшить план' : 'Upgrade plan'}
            </a>
            <button class="glass hover:bg-white/10 px-5 py-2 rounded-lg text-sm text-gray-300 transition">
              <i class="fas fa-file-invoice mr-2"></i>${isRu ? 'История платежей' : 'Billing history'}
            </button>
          </div>
        </div>

        <!-- Usage stats -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-base font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-chart-bar text-cyan-400"></i>
            ${isRu ? 'Использование' : 'Usage statistics'}
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            ${[
              [isRu ? 'Этот месяц' : 'This month', '847', isRu ? '+12%' : '+12%', 'text-green-400'],
              [isRu ? 'Всего' : 'All time', '3,421', isRu ? 'с Dec 2024' : 'since Dec 2024', 'text-gray-500'],
              [isRu ? 'Ср. время' : 'Avg latency', '1.85s', isRu ? '−0.3s улучшение' : '−0.3s improved', 'text-blue-400'],
              [isRu ? 'Успешность' : 'Success rate', '94.2%', isRu ? 'Отлично' : 'Excellent', 'text-green-400'],
            ].map(([lbl, val, sub, subColor]) => `
            <div class="bg-gray-800 rounded-lg p-3">
              <p class="text-gray-400 text-xs">${lbl}</p>
              <p class="text-white text-xl font-bold">${val}</p>
              <p class="${subColor} text-xs">${sub}</p>
            </div>`).join('')}
          </div>
        </div>

        <!-- Danger zone -->
        <div class="glass rounded-xl p-5 border border-red-500/30">
          <h3 class="text-base font-semibold mb-3 text-red-400 flex items-center gap-2">
            <i class="fas fa-exclamation-triangle"></i>
            ${isRu ? 'Опасная зона' : 'Danger zone'}
          </h3>
          <div class="flex gap-3">
            <button class="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg text-sm transition border border-red-500/30">
              <i class="fas fa-download mr-2"></i>${isRu ? 'Экспорт данных' : 'Export data'}
            </button>
            <button class="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg text-sm transition border border-red-500/30">
              <i class="fas fa-trash mr-2"></i>${isRu ? 'Удалить аккаунт' : 'Delete account'}
            </button>
          </div>
        </div>
      </div>

      <!-- ── TAB: Preferences ── -->
      <div id="panel-prefs" class="hidden space-y-6">

        <!-- Research defaults -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-base font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-flask text-emerald-400"></i>
            ${isRu ? 'Параметры исследований по умолчанию' : 'Default research settings'}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-400 text-sm mb-1.5">${isRu ? 'Домен по умолчанию' : 'Default domain'}</label>
              <select class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm">
                <option value="general">${isRu ? 'Общий' : 'General'}</option>
                <option value="ai_ml">AI / ML</option>
                <option value="medicine">${isRu ? 'Медицина' : 'Medicine'}</option>
                <option value="biology">${isRu ? 'Биология' : 'Biology'}</option>
                <option value="physics">${isRu ? 'Физика' : 'Physics'}</option>
                <option value="economics">${isRu ? 'Экономика' : 'Economics'}</option>
                <option value="math">${isRu ? 'Математика' : 'Mathematics'}</option>
                <option value="engineering">${isRu ? 'Инженерия' : 'Engineering'}</option>
                <option value="psychology">${isRu ? 'Психология' : 'Psychology'}</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-1.5">${isRu ? 'Глубина по умолчанию' : 'Default depth'}</label>
              <select class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm">
                <option value="quick">${isRu ? 'Быстрый (1 агент)' : 'Quick (1 agent)'}</option>
                <option value="standard" selected>${isRu ? 'Стандартный (3 агента)' : 'Standard (3 agents)'}</option>
                <option value="deep">${isRu ? 'Глубокий (5+ агентов)' : 'Deep (5+ agents)'}</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-1.5">${isRu ? 'Режим мышления' : 'Default thinking mode'}</label>
              <select class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm">
                <option value="standard">${isRu ? 'Стандартное' : 'Standard'}</option>
                <option value="first_principles">${isRu ? 'Первые принципы' : 'First Principles'}</option>
                <option value="systems">${isRu ? 'Системное' : 'Systems Thinking'}</option>
                <option value="bayesian">${isRu ? 'Байесовское' : 'Bayesian'}</option>
                <option value="critical">${isRu ? 'Критическое' : 'Critical'}</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-1.5">${isRu ? 'Стратегия оркестратора' : 'Orchestrator strategy'}</label>
              <select class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm">
                <option value="SINGLE">SINGLE</option>
                <option value="PARALLEL" selected>PARALLEL</option>
                <option value="RELAY">RELAY</option>
                <option value="VERIFIED">VERIFIED</option>
                <option value="EXPERT_PANEL">EXPERT PANEL</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-base font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-bell text-yellow-400"></i>
            ${isRu ? 'Уведомления' : 'Notifications'}
          </h3>
          <div class="space-y-4">
            ${[
              [isRu ? 'Email-уведомления' : 'Email notifications', isRu ? 'Получать обновления о задачах' : 'Receive task updates by email', true],
              [isRu ? 'Предупреждения об использовании' : 'Usage alerts', isRu ? 'Уведомлять при достижении лимитов' : 'Notify when approaching limits', true],
              [isRu ? 'Еженедельный отчёт' : 'Weekly report', isRu ? 'Сводка использования платформы' : 'Platform usage summary', false],
              [isRu ? 'Новости платформы' : 'Platform updates', isRu ? 'Новые функции и улучшения' : 'New features and improvements', false],
            ].map(([title, desc, checked]) => `
            <div class="flex items-center justify-between">
              <div>
                <p class="text-white text-sm">${title}</p>
                <p class="text-gray-500 text-xs">${desc}</p>
              </div>
              <div class="toggle-track ${checked ? 'on' : ''}" onclick="this.classList.toggle('on')">
                <div class="toggle-thumb"></div>
              </div>
            </div>`).join('')}
          </div>
        </div>

        <!-- Appearance -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-base font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-palette text-pink-400"></i>
            ${isRu ? 'Оформление' : 'Appearance'}
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-400 text-sm mb-2">${isRu ? 'Тема' : 'Theme'}</label>
              <div class="flex gap-3">
                <button class="flex-1 bg-gray-800 border-2 border-blue-500 rounded-lg p-3 text-center">
                  <i class="fas fa-moon text-blue-400 text-lg mb-1 block"></i>
                  <p class="text-white text-sm">Dark</p>
                </button>
                <button class="flex-1 bg-gray-800 border-2 border-gray-700 rounded-lg p-3 text-center opacity-50 cursor-not-allowed">
                  <i class="fas fa-sun text-yellow-400 text-lg mb-1 block"></i>
                  <p class="text-white text-sm">Light</p>
                  <p class="text-gray-500 text-xs">${isRu ? 'Скоро' : 'Coming soon'}</p>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-2">${isRu ? 'Язык / Language' : 'Language'}</label>
              <div class="flex gap-2">
                <button onclick="setLang('en')" class="flex-1 px-4 py-2.5 rounded-lg text-sm border-2 transition ${lang === 'en' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}">
                  🇬🇧 English
                </button>
                <button onclick="setLang('ru')" class="flex-1 px-4 py-2.5 rounded-lg text-sm border-2 transition ${lang === 'ru' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}">
                  🇷🇺 Русский
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Save -->
        <div class="flex items-center justify-end gap-3">
          <button class="glass hover:bg-white/10 px-5 py-2.5 rounded-lg text-sm text-gray-300 transition">
            ${isRu ? 'Сбросить' : 'Reset defaults'}
          </button>
          <button onclick="alert('${isRu ? 'Настройки сохранены' : 'Settings saved'}')" class="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg text-sm transition">
            <i class="fas fa-save mr-2"></i>${isRu ? 'Сохранить' : 'Save settings'}
          </button>
        </div>
      </div>

    </div>
  </main>

  <script>
  function switchTab(tab) {
    ['profile','prefs'].forEach(t => {
      document.getElementById('panel-'+t).classList.toggle('hidden', t !== tab);
      document.getElementById('tab-'+t).classList.toggle('active', t === tab);
    });
    localStorage.setItem('era-settings-tab', tab);
  }
  const initTab = new URLSearchParams(location.search).get('tab') || localStorage.getItem('era-settings-tab') || 'profile';
  if (initTab !== 'profile') switchTab(initTab);
  </script>
</body>
</html>`
}
