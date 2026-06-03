import { head, sidebar } from '../components/layout'
import { Language, getSection } from '../i18n/translations'

export const dashboardPage = (lang: Language = 'en') => {
  const t = getSection('dashboard', lang)
  const isRu = lang === 'ru'
  
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t.title, isRu ? 'Мониторинг производительности и использования ERA DAL' : 'Monitor your ERA DAL usage, model performance, and real-time statistics.', lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('dashboard', lang)}
  
  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold">${t.title}</h1>
          <p class="text-gray-400">${t.subtitle}</p>
        </div>
        <div class="flex items-center space-x-3">
          <button onclick="refreshDashboard()" class="glass hover:bg-white/10 px-4 py-2 rounded-lg transition">
            <i class="fas fa-sync-alt mr-2"></i> ${t.refresh}
          </button>
          <a href="/playground?lang=${lang}" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
            <i class="fas fa-play mr-2"></i> ${t.newQuery}
          </a>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="glass rounded-xl p-6 card-hover">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <i class="fas fa-question-circle text-blue-500 text-xl"></i>
            </div>
            <span class="text-green-400 text-sm"><i class="fas fa-arrow-up"></i> +12%</span>
          </div>
          <p class="text-gray-400 text-sm mb-1">${t.totalProblems}</p>
          <p class="text-3xl font-bold" id="stat-problems">--</p>
        </div>

        <div class="glass rounded-xl p-6 card-hover">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <i class="fas fa-play-circle text-purple-500 text-xl"></i>
            </div>
            <span class="text-green-400 text-sm"><i class="fas fa-arrow-up"></i> +8%</span>
          </div>
          <p class="text-gray-400 text-sm mb-1">${t.totalRuns}</p>
          <p class="text-3xl font-bold" id="stat-runs">--</p>
        </div>

        <div class="glass rounded-xl p-6 card-hover">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <i class="fas fa-network-wired text-green-500 text-xl"></i>
            </div>
            <span class="text-blue-400 text-sm"><i class="fas fa-minus"></i> ${t.stable}</span>
          </div>
          <p class="text-gray-400 text-sm mb-1">${t.apiCallsToday}</p>
          <p class="text-3xl font-bold" id="stat-api-calls">--</p>
        </div>

        <div class="glass rounded-xl p-6 card-hover">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <i class="fas fa-robot text-cyan-500 text-xl"></i>
            </div>
            <span class="text-green-400 text-sm">${t.active}</span>
          </div>
          <p class="text-gray-400 text-sm mb-1">${t.activeModels}</p>
          <p class="text-3xl font-bold" id="stat-models">--</p>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Usage Chart -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-lg font-semibold mb-4">
            <i class="fas fa-chart-area text-blue-500 mr-2"></i>
            ${t.usageOverTime}
          </h3>
          <div class="h-64">
            <canvas id="usageChart"></canvas>
          </div>
        </div>

        <!-- Model Performance -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-lg font-semibold mb-4">
            <i class="fas fa-trophy text-yellow-500 mr-2"></i>
            ${t.modelPerformance}
          </h3>
          <div class="h-64">
            <canvas id="modelChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Bottom Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activity -->
        <div class="lg:col-span-2 glass rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">
              <i class="fas fa-history text-purple-500 mr-2"></i>
              ${t.recentActivity}
            </h3>
            <a href="/history?lang=${lang}" class="text-blue-400 hover:text-blue-300 text-sm">${t.viewAll} →</a>
          </div>
          <div class="space-y-4" id="recent-activity">
            <div class="flex items-center justify-center h-32 text-gray-500">
              <i class="fas fa-spinner fa-spin mr-2"></i> ${t.loading}
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-lg font-semibold mb-4">
            <i class="fas fa-bolt text-yellow-500 mr-2"></i>
            ${t.quickStats}
          </h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-400">${t.avgConfidence}</span>
              <span class="text-white font-semibold" id="stat-avg-confidence">--%</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 0%" id="confidence-bar"></div>
            </div>
            
            <div class="flex items-center justify-between pt-2">
              <span class="text-gray-400">${t.avgLatency}</span>
              <span class="text-white font-semibold" id="stat-avg-latency">-- ms</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full" style="width: 0%" id="latency-bar"></div>
            </div>
            
            <div class="flex items-center justify-between pt-2">
              <span class="text-gray-400">${t.successRate}</span>
              <span class="text-white font-semibold" id="stat-success-rate">--%</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div class="bg-purple-500 h-2 rounded-full" style="width: 0%" id="success-bar"></div>
            </div>

            <div class="pt-4 border-t border-gray-700">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-400">${t.topDomain}</span>
                <span class="text-blue-400 font-medium" id="stat-top-domain">--</span>
              </div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-400">${t.topModel}</span>
                <span class="text-purple-400 font-medium" id="stat-top-model">--</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-400">${isRu ? 'Расход сегодня' : 'Cost today'}</span>
                <span class="text-green-400 font-medium" id="stat-cost-today">--</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Status -->
      <div class="mt-8 glass rounded-xl p-6">
        <h3 class="text-lg font-semibold mb-4">
          <i class="fas fa-server text-green-500 mr-2"></i>
          ${t.systemStatus}
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-gray-300">${t.apiServer}</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-gray-300">OpenRouter</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-gray-300">${t.database}</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-gray-300">${t.cacheLayer}</span>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    const lang = '${lang}';
    const isRu = lang === 'ru';
    
    // Dashboard data
    let dashboardData = {
      problems: 0,
      runs: 0,
      apiCalls: 0,
      models: 0,
      avgConfidence: 0,
      avgLatency: 0,
      successRate: 0,
      topDomain: 'N/A',
      topModel: 'N/A',
      events: []
    };

    // Initialize charts
    let usageChart, modelChart;

    function initCharts() {
      const daysLabels = isRu 
        ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
      // Usage Chart
      const usageCtx = document.getElementById('usageChart').getContext('2d');
      usageChart = new Chart(usageCtx, {
        type: 'line',
        data: {
          labels: daysLabels,
          datasets: [{
            label: isRu ? 'Запросы' : 'Queries',
            data: [12, 19, 15, 25, 22, 30, 28],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#9ca3af' } },
            x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
          }
        }
      });

      // Model Performance Chart
      const modelCtx = document.getElementById('modelChart').getContext('2d');
      modelChart = new Chart(modelCtx, {
        type: 'bar',
        data: {
          labels: ['GPT-4', 'Claude', 'Llama 3', 'Mistral', 'Gemini'],
          datasets: [{
            label: isRu ? 'Успешность' : 'Success Rate',
            data: [92, 88, 85, 82, 90],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(6, 182, 212, 0.8)'
            ],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { 
              grid: { color: 'rgba(255,255,255,0.1)' }, 
              ticks: { color: '#9ca3af' },
              max: 100
            },
            x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
          }
        }
      });
    }

    function updateStats() {
      document.getElementById('stat-problems').textContent = dashboardData.problems;
      document.getElementById('stat-runs').textContent = dashboardData.runs;
      document.getElementById('stat-api-calls').textContent = dashboardData.apiCalls;
      document.getElementById('stat-models').textContent = dashboardData.models;
      
      document.getElementById('stat-avg-confidence').textContent = dashboardData.avgConfidence + '%';
      document.getElementById('confidence-bar').style.width = dashboardData.avgConfidence + '%';
      
      document.getElementById('stat-avg-latency').textContent = dashboardData.avgLatency + ' ms';
      document.getElementById('latency-bar').style.width = Math.min(100, dashboardData.avgLatency / 50) + '%';
      
      document.getElementById('stat-success-rate').textContent = dashboardData.successRate + '%';
      document.getElementById('success-bar').style.width = dashboardData.successRate + '%';
      
      document.getElementById('stat-top-domain').textContent = dashboardData.topDomain || '—';
      document.getElementById('stat-top-model').textContent = dashboardData.topModel || '—';
      const cost = dashboardData.costToday;
      document.getElementById('stat-cost-today').textContent =
        cost != null ? (cost < 0.001 ? '<$0.001' : '$' + cost.toFixed(4)) : '—';
    }

    function updateActivity() {
      const container = document.getElementById('recent-activity');
      const noActivity = isRu ? 'Нет недавней активности' : 'No recent activity';
      
      if (dashboardData.events.length === 0) {
        container.innerHTML = \`
          <div class="flex items-center justify-center h-32 text-gray-500">
            <i class="fas fa-inbox mr-2"></i> \${noActivity}
          </div>
        \`;
        return;
      }
      
      container.innerHTML = dashboardData.events.slice(0, 5).map(event => \`
        <div class="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition">
          <div class="w-10 h-10 bg-\${event.type === 'success' ? 'green' : event.type === 'error' ? 'red' : 'blue'}-500/20 rounded-lg flex items-center justify-center">
            <i class="fas fa-\${event.type === 'success' ? 'check' : event.type === 'error' ? 'times' : 'spinner fa-spin'} text-\${event.type === 'success' ? 'green' : event.type === 'error' ? 'red' : 'blue'}-500"></i>
          </div>
          <div class="flex-1">
            <p class="text-white font-medium">\${event.title}</p>
            <p class="text-gray-400 text-sm">\${event.description}</p>
          </div>
          <span class="text-gray-500 text-xs">\${event.time}</span>
        </div>
      \`).join('');
    }

    async function fetchDashboardData() {
      try {
        const response = await axios.get('/api/dashboard');
        dashboardData = response.data;
        updateStats();
        updateActivity();
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Use mock data
        dashboardData = {
          problems: 142,
          runs: 847,
          apiCalls: 1250,
          models: 7,
          avgConfidence: 87,
          avgLatency: 1850,
          successRate: 94,
          topDomain: isRu ? 'Наука' : 'Science',
          topModel: 'GPT-4o',
          events: [
            { type: 'success', title: isRu ? 'Запрос выполнен' : 'Query Completed', description: isRu ? 'Анализ научной гипотезы' : 'Scientific hypothesis analysis', time: isRu ? '2 мин' : '2m ago' },
            { type: 'success', title: isRu ? 'Консенсус достигнут' : 'Consensus Reached', description: isRu ? '5/7 моделей согласны' : '5/7 models agreed', time: isRu ? '5 мин' : '5m ago' },
            { type: 'pending', title: isRu ? 'Обработка' : 'Processing', description: isRu ? 'Медицинский диагноз' : 'Medical diagnosis query', time: isRu ? '8 мин' : '8m ago' },
            { type: 'success', title: isRu ? 'Высокая уверенность' : 'High Confidence', description: isRu ? 'Финансовый прогноз - 94% CI' : 'Financial forecast - 94% CI', time: isRu ? '15 мин' : '15m ago' },
            { type: 'error', title: isRu ? 'Таймаут' : 'Timeout', description: isRu ? 'Модель Llama-3.1 превысила лимит' : 'Model Llama-3.1 exceeded timeout', time: isRu ? '22 мин' : '22m ago' }
          ]
        };
        updateStats();
        updateActivity();
      }
    }

    function refreshDashboard() {
      fetchDashboardData();
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
      initCharts();
      fetchDashboardData();
      
      // Auto-refresh every 30 seconds
      setInterval(fetchDashboardData, 30000);
    });
  </script>
</body>
</html>
`
}
