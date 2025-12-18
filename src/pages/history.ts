import { head, sidebar } from '../components/layout'
import { Language, translations } from '../i18n/translations'

function t(lang: Language, path: string): string {
  const keys = path.split('.')
  let result: any = translations[lang]
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) { result = result[key] } else { return path }
  }
  return typeof result === 'string' ? result : path
}

export const historyPage = (lang: Language = 'en') => `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t(lang, 'nav.history'), lang === 'ru' ? 'Просмотр истории запросов и аналитики.' : 'View your query history, results, and analytics.', lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar(lang, 'history')}
  
  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold">Query History</h1>
          <p class="text-gray-400">View and analyze your past queries</p>
        </div>
        <div class="flex items-center space-x-3">
          <button onclick="exportHistory()" class="glass hover:bg-white/10 px-4 py-2 rounded-lg transition">
            <i class="fas fa-download mr-2"></i> Export
          </button>
          <button onclick="clearHistory()" class="glass hover:bg-white/10 text-red-400 px-4 py-2 rounded-lg transition">
            <i class="fas fa-trash mr-2"></i> Clear
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="glass rounded-xl p-4 mb-6">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex-1 min-w-[200px]">
            <input type="text" placeholder="Search queries..." id="search-input"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500">
          </div>
          <select id="filter-domain" class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
            <option value="">All Domains</option>
            <option value="science">Science</option>
            <option value="math">Mathematics</option>
            <option value="med">Medical</option>
            <option value="econ">Economics</option>
          </select>
          <select id="filter-status" class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="partial">Partial</option>
            <option value="failed">Failed</option>
          </select>
          <select id="filter-date" class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      <!-- History List -->
      <div class="space-y-4" id="history-list">
        <!-- Item 1 -->
        <div class="glass rounded-xl p-6 card-hover cursor-pointer" onclick="showDetails('1')">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">Science</span>
                <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                  <i class="fas fa-check mr-1"></i> Success
                </span>
                <span class="text-gray-500 text-sm">2 hours ago</span>
              </div>
              <h3 class="text-white font-medium mb-2">What is the current scientific evidence for dark matter in the universe?</h3>
              <p class="text-gray-400 text-sm line-clamp-2">Based on the ensemble analysis, dark matter evidence comes from several key observations including galaxy rotation curves...</p>
            </div>
            <div class="ml-4 text-right">
              <div class="text-2xl font-bold text-green-400">92%</div>
              <div class="text-gray-500 text-xs">Confidence</div>
            </div>
          </div>
          <div class="flex items-center space-x-6 mt-4 text-sm text-gray-500">
            <span><i class="fas fa-robot mr-1"></i> 5 models</span>
            <span><i class="fas fa-clock mr-1"></i> 2.3s</span>
            <span><i class="fas fa-sync mr-1"></i> 3 runs</span>
            <span><i class="fas fa-chart-line mr-1"></i> Wilson CI: [0.78, 0.96]</span>
          </div>
        </div>

        <!-- Item 2 -->
        <div class="glass rounded-xl p-6 card-hover cursor-pointer" onclick="showDetails('2')">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Mathematics</span>
                <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                  <i class="fas fa-check mr-1"></i> Success
                </span>
                <span class="text-gray-500 text-sm">5 hours ago</span>
              </div>
              <h3 class="text-white font-medium mb-2">Explain the proof of Fermat's Last Theorem by Andrew Wiles</h3>
              <p class="text-gray-400 text-sm line-clamp-2">Wiles' proof connects Fermat's Last Theorem to the modularity theorem, showing that semistable elliptic curves...</p>
            </div>
            <div class="ml-4 text-right">
              <div class="text-2xl font-bold text-green-400">88%</div>
              <div class="text-gray-500 text-xs">Confidence</div>
            </div>
          </div>
          <div class="flex items-center space-x-6 mt-4 text-sm text-gray-500">
            <span><i class="fas fa-robot mr-1"></i> 5 models</span>
            <span><i class="fas fa-clock mr-1"></i> 1.8s</span>
            <span><i class="fas fa-sync mr-1"></i> 3 runs</span>
            <span><i class="fas fa-chart-line mr-1"></i> Wilson CI: [0.72, 0.94]</span>
          </div>
        </div>

        <!-- Item 3 -->
        <div class="glass rounded-xl p-6 card-hover cursor-pointer" onclick="showDetails('3')">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <span class="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">Medical</span>
                <span class="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">
                  <i class="fas fa-exclamation mr-1"></i> Partial
                </span>
                <span class="text-gray-500 text-sm">Yesterday</span>
              </div>
              <h3 class="text-white font-medium mb-2">What are the latest treatments for treatment-resistant depression?</h3>
              <p class="text-gray-400 text-sm line-clamp-2">Current treatments for TRD include ketamine/esketamine, TMS, ECT, and various combination therapies...</p>
            </div>
            <div class="ml-4 text-right">
              <div class="text-2xl font-bold text-yellow-400">65%</div>
              <div class="text-gray-500 text-xs">Confidence</div>
            </div>
          </div>
          <div class="flex items-center space-x-6 mt-4 text-sm text-gray-500">
            <span><i class="fas fa-robot mr-1"></i> 7 models</span>
            <span><i class="fas fa-clock mr-1"></i> 3.1s</span>
            <span><i class="fas fa-sync mr-1"></i> 5 runs</span>
            <span><i class="fas fa-chart-line mr-1"></i> Wilson CI: [0.48, 0.79]</span>
          </div>
        </div>

        <!-- Item 4 -->
        <div class="glass rounded-xl p-6 card-hover cursor-pointer" onclick="showDetails('4')">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <span class="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">Economics</span>
                <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                  <i class="fas fa-check mr-1"></i> Success
                </span>
                <span class="text-gray-500 text-sm">2 days ago</span>
              </div>
              <h3 class="text-white font-medium mb-2">Analyze the impact of quantitative easing on asset prices</h3>
              <p class="text-gray-400 text-sm line-clamp-2">QE impacts asset prices through portfolio rebalancing, signaling effects, and wealth effects...</p>
            </div>
            <div class="ml-4 text-right">
              <div class="text-2xl font-bold text-green-400">85%</div>
              <div class="text-gray-500 text-xs">Confidence</div>
            </div>
          </div>
          <div class="flex items-center space-x-6 mt-4 text-sm text-gray-500">
            <span><i class="fas fa-robot mr-1"></i> 5 models</span>
            <span><i class="fas fa-clock mr-1"></i> 2.0s</span>
            <span><i class="fas fa-sync mr-1"></i> 3 runs</span>
            <span><i class="fas fa-chart-line mr-1"></i> Wilson CI: [0.70, 0.92]</span>
          </div>
        </div>

        <!-- Item 5 -->
        <div class="glass rounded-xl p-6 card-hover cursor-pointer" onclick="showDetails('5')">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">Science</span>
                <span class="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                  <i class="fas fa-times mr-1"></i> Failed
                </span>
                <span class="text-gray-500 text-sm">3 days ago</span>
              </div>
              <h3 class="text-white font-medium mb-2">Predict the next solar maximum intensity</h3>
              <p class="text-gray-400 text-sm line-clamp-2">Query failed due to high model disagreement. Models produced inconsistent predictions...</p>
            </div>
            <div class="ml-4 text-right">
              <div class="text-2xl font-bold text-red-400">32%</div>
              <div class="text-gray-500 text-xs">Confidence</div>
            </div>
          </div>
          <div class="flex items-center space-x-6 mt-4 text-sm text-gray-500">
            <span><i class="fas fa-robot mr-1"></i> 5 models</span>
            <span><i class="fas fa-clock mr-1"></i> 4.2s</span>
            <span><i class="fas fa-sync mr-1"></i> 5 runs</span>
            <span><i class="fas fa-chart-line mr-1"></i> Wilson CI: [0.15, 0.52]</span>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-8">
        <p class="text-gray-500 text-sm">Showing 1-5 of 142 queries</p>
        <div class="flex items-center space-x-2">
          <button class="glass px-4 py-2 rounded-lg text-gray-400 cursor-not-allowed">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="bg-blue-600 px-4 py-2 rounded-lg">1</button>
          <button class="glass hover:bg-white/10 px-4 py-2 rounded-lg">2</button>
          <button class="glass hover:bg-white/10 px-4 py-2 rounded-lg">3</button>
          <span class="text-gray-500">...</span>
          <button class="glass hover:bg-white/10 px-4 py-2 rounded-lg">29</button>
          <button class="glass hover:bg-white/10 px-4 py-2 rounded-lg">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </main>

  <!-- Detail Modal -->
  <div id="detail-modal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" style="display: none;">
    <div class="glass rounded-2xl p-8 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold">Query Details</h2>
        <button onclick="closeModal()" class="text-gray-400 hover:text-white">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <div id="modal-content">
        <!-- Content will be inserted here -->
      </div>
    </div>
  </div>

  <script>
    function showDetails(id) {
      document.getElementById('detail-modal').style.display = 'flex';
      
      // Mock data for demonstration
      const content = \`
        <div class="space-y-6">
          <div>
            <label class="text-gray-400 text-sm">Query</label>
            <p class="text-white mt-1">What is the current scientific evidence for dark matter in the universe?</p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-800 rounded-lg p-3 text-center">
              <p class="text-gray-400 text-xs">Confidence</p>
              <p class="text-green-400 text-xl font-bold">92%</p>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center">
              <p class="text-gray-400 text-xs">Latency</p>
              <p class="text-white text-xl font-bold">2.3s</p>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center">
              <p class="text-gray-400 text-xs">Models</p>
              <p class="text-white text-xl font-bold">5</p>
            </div>
            <div class="bg-gray-800 rounded-lg p-3 text-center">
              <p class="text-gray-400 text-xs">Runs</p>
              <p class="text-white text-xl font-bold">3</p>
            </div>
          </div>
          
          <div>
            <label class="text-gray-400 text-sm">Final Answer</label>
            <div class="bg-gray-800 rounded-lg p-4 mt-2 text-gray-300">
              Based on the ensemble analysis, dark matter evidence comes from several key observations: (1) Galaxy rotation curves show stars orbiting faster than expected from visible matter alone, (2) Gravitational lensing effects reveal mass distributions that exceed visible matter, (3) The Cosmic Microwave Background anisotropies match predictions requiring dark matter, (4) Large-scale structure formation in the universe requires dark matter's gravitational effects.
            </div>
          </div>
          
          <div>
            <label class="text-gray-400 text-sm">Model Rankings</label>
            <div class="space-y-2 mt-2">
              <div class="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                <span class="text-white"><span class="text-blue-400 font-bold mr-2">1.</span> GPT-4o</span>
                <span class="text-green-400">95%</span>
              </div>
              <div class="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                <span class="text-white"><span class="text-blue-400 font-bold mr-2">2.</span> Claude 3.5</span>
                <span class="text-green-400">92%</span>
              </div>
              <div class="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                <span class="text-white"><span class="text-blue-400 font-bold mr-2">3.</span> Gemini 1.5</span>
                <span class="text-yellow-400">88%</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <button onclick="rerunQuery('1')" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
              <i class="fas fa-redo mr-2"></i> Re-run Query
            </button>
            <button onclick="copyQuery('1')" class="glass hover:bg-white/10 px-4 py-2 rounded-lg transition">
              <i class="fas fa-copy mr-2"></i> Copy
            </button>
          </div>
        </div>
      \`;
      
      document.getElementById('modal-content').innerHTML = content;
    }

    function closeModal() {
      document.getElementById('detail-modal').style.display = 'none';
    }

    function exportHistory() {
      alert('Export functionality will be implemented with backend integration.');
    }

    function clearHistory() {
      if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
        alert('History cleared.');
      }
    }

    function rerunQuery(id) {
      closeModal();
      window.location.href = '/playground';
    }

    function copyQuery(id) {
      navigator.clipboard.writeText('What is the current scientific evidence for dark matter in the universe?');
      alert('Query copied to clipboard!');
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  </script>
</body>
</html>
`
