import { head, sidebar } from '../components/layout'
import { Language, translations } from '../i18n/translations'

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

export const profilePage = (lang: Language = 'en') => `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t(lang, 'nav.profile'), lang === 'ru' ? 'Управление аккаунтом, API ключами и подпиской.' : 'Manage your ERA DAL account, API keys, and subscription.', lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar(lang, 'profile')}
  
  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6 max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold">${t(lang, 'profile.title')}</h1>
        <p class="text-gray-400">${t(lang, 'profile.subtitle')}</p>
      </div>

      <!-- Profile Card -->
      <div class="glass rounded-xl p-6 mb-8">
        <div class="flex items-center space-x-6">
          <div class="relative">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold">
              EK
            </div>
            <button class="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
              <i class="fas fa-camera text-sm"></i>
            </button>
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold">Eugene Kundrotas</h2>
            <p class="text-gray-400">eukundrotas@gmail.com</p>
            <div class="flex items-center space-x-4 mt-2">
              <span class="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                <i class="fas fa-crown mr-1"></i> Pro Plan
              </span>
              <span class="text-gray-500 text-sm">${t(lang, 'profile.memberSince')} Dec 2024</span>
            </div>
          </div>
          <button class="glass hover:bg-white/10 px-4 py-2 rounded-lg transition">
            <i class="fas fa-edit mr-2"></i> ${t(lang, 'profile.editProfile')}
          </button>
        </div>
      </div>

      <!-- Account Settings -->
      <div class="glass rounded-xl p-6 mb-8">
        <h3 class="text-lg font-semibold mb-6">
          <i class="fas fa-user-cog text-blue-500 mr-2"></i>
          ${t(lang, 'profile.accountInfo')}
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-400 text-sm mb-2">${t(lang, 'profile.fullName')}</label>
            <input type="text" value="Eugene Kundrotas" 
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-2">${t(lang, 'profile.email')}</label>
            <input type="email" value="eukundrotas@gmail.com" 
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-2">${t(lang, 'profile.company')}</label>
            <input type="text" value="UAB Propriezura" 
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-2">${t(lang, 'profile.location')}</label>
            <input type="text" value="Lithuania" 
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
          </div>
        </div>
        
        <button class="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition">
          <i class="fas fa-save mr-2"></i> ${t(lang, 'profile.saveChanges')}
        </button>
      </div>

      <!-- API Keys Section -->
      <div class="glass rounded-xl p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold">
            <i class="fas fa-key text-yellow-500 mr-2"></i>
            ${t(lang, 'profile.apiKeys')}
          </h3>
          <button onclick="generateNewKey()" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition text-sm">
            <i class="fas fa-plus mr-2"></i> ${t(lang, 'profile.generateNew')}
          </button>
        </div>

        <div class="space-y-4">
          <div class="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <i class="fas fa-key text-blue-500"></i>
              </div>
              <div>
                <p class="text-white font-medium">${t(lang, 'profile.productionKey')}</p>
                <p class="text-gray-400 text-sm font-mono">era_sk_prod_****...****7a3f</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">${t(lang, 'profile.active')}</span>
              <button class="text-gray-400 hover:text-white p-2 transition" title="${t(lang, 'profile.copy')}">
                <i class="fas fa-copy"></i>
              </button>
              <button class="text-gray-400 hover:text-red-400 p-2 transition" title="${t(lang, 'profile.revoke')}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <i class="fas fa-flask text-purple-500"></i>
              </div>
              <div>
                <p class="text-white font-medium">${t(lang, 'profile.developmentKey')}</p>
                <p class="text-gray-400 text-sm font-mono">era_sk_dev_****...****9b2e</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">${t(lang, 'profile.active')}</span>
              <button class="text-gray-400 hover:text-white p-2 transition" title="${t(lang, 'profile.copy')}">
                <i class="fas fa-copy"></i>
              </button>
              <button class="text-gray-400 hover:text-red-400 p-2 transition" title="${t(lang, 'profile.revoke')}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div class="flex items-start space-x-3">
            <i class="fas fa-exclamation-triangle text-yellow-500 mt-1"></i>
            <div>
              <p class="text-yellow-400 font-medium">${t(lang, 'profile.securityWarning')}</p>
              <p class="text-gray-400 text-sm">${t(lang, 'profile.securityWarningDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscription Section -->
      <div class="glass rounded-xl p-6 mb-8">
        <h3 class="text-lg font-semibold mb-6">
          <i class="fas fa-credit-card text-green-500 mr-2"></i>
          ${t(lang, 'profile.subscription')}
        </h3>

        <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-200 text-sm">${t(lang, 'profile.currentPlan')}</p>
              <p class="text-white text-2xl font-bold">Pro Plan</p>
              <p class="text-purple-200 text-sm mt-1">$49/${lang === 'ru' ? 'месяц' : 'month'} - ${lang === 'ru' ? 'Продление' : 'Renews'} Jan 18, 2025</p>
            </div>
            <div class="text-right">
              <p class="text-purple-200 text-sm">${t(lang, 'profile.apiCalls')}</p>
              <p class="text-white text-2xl font-bold">847 / 10,000</p>
              <p class="text-purple-200 text-sm mt-1">8.47% ${t(lang, 'profile.used')}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-800 rounded-lg p-4 text-center">
            <p class="text-gray-400 text-sm">${t(lang, 'profile.modelsAvailable')}</p>
            <p class="text-white text-xl font-bold">${lang === 'ru' ? 'Все 12+' : 'All 12+'}</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-4 text-center">
            <p class="text-gray-400 text-sm">${t(lang, 'profile.maxParallel')}</p>
            <p class="text-white text-xl font-bold">${t(lang, 'profile.unlimited')}</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-4 text-center">
            <p class="text-gray-400 text-sm">${t(lang, 'profile.prioritySupport')}</p>
            <p class="text-white text-xl font-bold"><i class="fas fa-check text-green-500"></i></p>
          </div>
        </div>

        <div class="mt-6 flex items-center space-x-4">
          <a href="/pricing${lang === 'ru' ? '?lang=ru' : ''}" class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition">
            <i class="fas fa-arrow-up mr-2"></i> ${t(lang, 'profile.upgradePlan')}
          </a>
          <button class="glass hover:bg-white/10 px-6 py-2 rounded-lg transition text-gray-300">
            <i class="fas fa-file-invoice mr-2"></i> ${t(lang, 'profile.billingHistory')}
          </button>
        </div>
      </div>

      <!-- Usage Statistics -->
      <div class="glass rounded-xl p-6 mb-8">
        <h3 class="text-lg font-semibold mb-6">
          <i class="fas fa-chart-bar text-cyan-500 mr-2"></i>
          ${t(lang, 'profile.usageStats')}
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-gray-800 rounded-lg p-4">
            <p class="text-gray-400 text-sm">${t(lang, 'profile.thisMonth')}</p>
            <p class="text-white text-xl font-bold">847</p>
            <p class="text-green-400 text-xs"><i class="fas fa-arrow-up"></i> +12% ${lang === 'ru' ? 'vs пред. месяц' : 'vs last month'}</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-4">
            <p class="text-gray-400 text-sm">${t(lang, 'profile.totalAllTime')}</p>
            <p class="text-white text-xl font-bold">3,421</p>
            <p class="text-gray-500 text-xs">${lang === 'ru' ? 'С Dec 2024' : 'Since Dec 2024'}</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-4">
            <p class="text-gray-400 text-sm">${t(lang, 'profile.avgResponseTime')}</p>
            <p class="text-white text-xl font-bold">1.85s</p>
            <p class="text-blue-400 text-xs"><i class="fas fa-arrow-down"></i> -0.3s ${t(lang, 'common.improved')}</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-4">
            <p class="text-gray-400 text-sm">${t(lang, 'dashboard.successRate')}</p>
            <p class="text-white text-xl font-bold">94.2%</p>
            <p class="text-green-400 text-xs">${t(lang, 'common.excellent')}</p>
          </div>
        </div>

        <div class="h-64">
          <canvas id="usageHistoryChart"></canvas>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="glass rounded-xl p-6 border border-red-500/30">
        <h3 class="text-lg font-semibold mb-4 text-red-400">
          <i class="fas fa-exclamation-triangle mr-2"></i>
          ${t(lang, 'profile.dangerZone')}
        </h3>
        <p class="text-gray-400 mb-4">${t(lang, 'profile.dangerZoneDesc')}</p>
        
        <div class="flex items-center space-x-4">
          <button class="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg transition border border-red-500/30">
            <i class="fas fa-download mr-2"></i> ${t(lang, 'profile.exportData')}
          </button>
          <button class="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg transition border border-red-500/30">
            <i class="fas fa-trash mr-2"></i> ${t(lang, 'profile.deleteAccount')}
          </button>
        </div>
      </div>
    </div>
  </main>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const ctx = document.getElementById('usageHistoryChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['${lang === 'ru' ? 'Неделя 1' : 'Week 1'}', '${lang === 'ru' ? 'Неделя 2' : 'Week 2'}', '${lang === 'ru' ? 'Неделя 3' : 'Week 3'}', '${lang === 'ru' ? 'Неделя 4' : 'Week 4'}'],
          datasets: [{ label: '${t(lang, 'profile.apiCalls')}', data: [156, 243, 198, 250], borderColor: '#06b6d4', backgroundColor: 'rgba(6, 182, 212, 0.1)', fill: true, tension: 0.4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#9ca3af' } }, x: { grid: { display: false }, ticks: { color: '#9ca3af' } } } }
      });
    });

    function generateNewKey() {
      alert('${lang === 'ru' ? 'Генерация нового API ключа будет реализована с интеграцией backend.' : 'New API key generation will be implemented with backend integration.'}');
    }
  </script>
</body>
</html>
`
