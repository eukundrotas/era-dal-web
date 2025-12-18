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

export const playgroundPage = (lang: Language = 'en') => `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t(lang, 'nav.playground'), lang === 'ru' ? 'Тестируйте ERA DAL со своими запросами.' : 'Test ERA DAL with your own queries.', lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar(lang, 'playground')}
  
  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold">${t(lang, 'playground.title')}</h1>
        <p class="text-gray-400">${t(lang, 'playground.subtitle')}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Panel - Input -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Query Input -->
          <div class="glass rounded-xl p-6">
            <label class="block text-gray-400 text-sm mb-2">
              <i class="fas fa-question-circle mr-1"></i> Your Question
            </label>
            <textarea id="query-input" rows="4" placeholder="Enter your question here... e.g., 'What is the evidence for dark matter in the universe?'"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"></textarea>
            
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center space-x-4">
                <select id="domain-select" class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                  <option value="science">Science</option>
                  <option value="math">Mathematics</option>
                  <option value="med">Medical</option>
                  <option value="econ">Economics</option>
                </select>
                <select id="mode-select" class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                  <option value="consensus_top2">Consensus Top-2</option>
                  <option value="consensus_top3">Consensus Top-3</option>
                  <option value="hard_select">Hard Select</option>
                </select>
              </div>
              <button onclick="submitQuery()" id="submit-btn" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-lg transition flex items-center">
                <i class="fas fa-paper-plane mr-2"></i> Submit
              </button>
            </div>
          </div>

          <!-- Results -->
          <div class="glass rounded-xl p-6" id="results-container" style="display: none;">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">
                <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                Final Answer
              </h3>
              <div class="flex items-center space-x-2">
                <span id="confidence-badge" class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  <i class="fas fa-shield-alt mr-1"></i> 95% CI
                </span>
                <button onclick="copyResult()" class="text-gray-400 hover:text-white p-2 transition">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
            
            <div id="final-answer" class="bg-gray-800 rounded-lg p-4 text-gray-300 leading-relaxed">
              <!-- Answer will be inserted here -->
            </div>

            <!-- Stability Metrics -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div class="bg-gray-800 rounded-lg p-3 text-center">
                <p class="text-gray-400 text-xs">Majority Rate</p>
                <p class="text-white text-lg font-bold" id="metric-majority">--</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3 text-center">
                <p class="text-gray-400 text-xs">Wilson CI</p>
                <p class="text-white text-lg font-bold" id="metric-wilson">--</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3 text-center">
                <p class="text-gray-400 text-xs">Latency</p>
                <p class="text-white text-lg font-bold" id="metric-latency">--</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3 text-center">
                <p class="text-gray-400 text-xs">Models Used</p>
                <p class="text-white text-lg font-bold" id="metric-models">--</p>
              </div>
            </div>
          </div>

          <!-- Model Responses -->
          <div class="glass rounded-xl p-6" id="model-responses" style="display: none;">
            <h3 class="text-lg font-semibold mb-4">
              <i class="fas fa-robot text-blue-500 mr-2"></i>
              Individual Model Responses
            </h3>
            <div id="responses-list" class="space-y-4">
              <!-- Responses will be inserted here -->
            </div>
          </div>

          <!-- Processing Indicator -->
          <div class="glass rounded-xl p-6" id="processing-indicator" style="display: none;">
            <div class="flex flex-col items-center justify-center py-8">
              <div class="relative w-20 h-20 mb-6">
                <div class="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                <div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div class="absolute inset-2 border-4 border-purple-500/30 rounded-full"></div>
                <div class="absolute inset-2 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
              </div>
              <p class="text-white font-semibold mb-2">Processing Query...</p>
              <p class="text-gray-400 text-sm" id="processing-status">Initializing solver pool...</p>
            </div>
          </div>
        </div>

        <!-- Right Panel - Settings -->
        <div class="space-y-6">
          <!-- Advanced Settings -->
          <div class="glass rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">
              <i class="fas fa-sliders-h text-purple-500 mr-2"></i>
              Advanced Settings
            </h3>
            
            <div class="space-y-4">
              <div>
                <label class="flex items-center justify-between text-gray-400 text-sm mb-2">
                  <span>Repeats</span>
                  <span class="text-white" id="repeats-value">3</span>
                </label>
                <input type="range" id="repeats" min="1" max="10" value="3" 
                  class="w-full accent-blue-500"
                  oninput="document.getElementById('repeats-value').textContent = this.value">
              </div>

              <div>
                <label class="flex items-center justify-between text-gray-400 text-sm mb-2">
                  <span>Consensus Top-K</span>
                  <span class="text-white" id="topk-value">2</span>
                </label>
                <input type="range" id="consensus-topk" min="1" max="5" value="2" 
                  class="w-full accent-blue-500"
                  oninput="document.getElementById('topk-value').textContent = this.value">
              </div>

              <div>
                <label class="flex items-center justify-between text-gray-400 text-sm mb-2">
                  <span>Epsilon</span>
                  <span class="text-white" id="epsilon-value">0.05</span>
                </label>
                <input type="range" id="epsilon" min="0" max="0.2" step="0.01" value="0.05" 
                  class="w-full accent-blue-500"
                  oninput="document.getElementById('epsilon-value').textContent = parseFloat(this.value).toFixed(2)">
              </div>

              <div class="flex items-center justify-between">
                <span class="text-gray-400 text-sm">Enable Rebuttal</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="rebuttal" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-gray-400 text-sm">Hard Only Selection</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="hard-only" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Model Pool -->
          <div class="glass rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">
              <i class="fas fa-layer-group text-cyan-500 mr-2"></i>
              Solver Pool
            </h3>
            
            <div class="space-y-2" id="model-pool">
              <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">GPT-4o</span>
                </div>
                <span class="text-green-400 text-xs">Ready</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">Claude 3.5</span>
                </div>
                <span class="text-green-400 text-xs">Ready</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">Llama 3.1 70B</span>
                </div>
                <span class="text-green-400 text-xs">Ready</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">Mistral Large</span>
                </div>
                <span class="text-green-400 text-xs">Ready</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">Gemini 1.5</span>
                </div>
                <span class="text-green-400 text-xs">Ready</span>
              </div>
            </div>
          </div>

          <!-- Quick Examples -->
          <div class="glass rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">
              <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
              Quick Examples
            </h3>
            
            <div class="space-y-2">
              <button onclick="loadExample('science')" class="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm">
                <i class="fas fa-atom text-blue-400 mr-2"></i>
                Dark matter evidence
              </button>
              <button onclick="loadExample('math')" class="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm">
                <i class="fas fa-square-root-alt text-green-400 mr-2"></i>
                Riemann hypothesis
              </button>
              <button onclick="loadExample('med')" class="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm">
                <i class="fas fa-heartbeat text-red-400 mr-2"></i>
                mRNA vaccine mechanism
              </button>
              <button onclick="loadExample('econ')" class="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm">
                <i class="fas fa-chart-line text-purple-400 mr-2"></i>
                Inflation causes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    const examples = {
      science: 'What is the current scientific evidence for dark matter in the universe? Explain the key observations.',
      math: 'What is the Riemann hypothesis and why is it considered one of the most important unsolved problems in mathematics?',
      med: 'How do mRNA vaccines work at the molecular level? Explain the mechanism of action.',
      econ: 'What are the main causes of inflation and how do central banks typically respond?'
    };

    function loadExample(type) {
      document.getElementById('query-input').value = examples[type];
      document.getElementById('domain-select').value = type;
    }

    function showProcessing(show) {
      document.getElementById('processing-indicator').style.display = show ? 'block' : 'none';
      document.getElementById('results-container').style.display = show ? 'none' : 'block';
      document.getElementById('model-responses').style.display = show ? 'none' : 'block';
      document.getElementById('submit-btn').disabled = show;
    }

    function updateProcessingStatus(status) {
      document.getElementById('processing-status').textContent = status;
    }

    async function submitQuery() {
      const query = document.getElementById('query-input').value.trim();
      if (!query) {
        alert('Please enter a question');
        return;
      }

      const config = {
        query: query,
        domain: document.getElementById('domain-select').value,
        mode: document.getElementById('mode-select').value,
        repeats: parseInt(document.getElementById('repeats').value),
        consensus_topk: parseInt(document.getElementById('consensus-topk').value),
        epsilon: parseFloat(document.getElementById('epsilon').value),
        rebuttal: document.getElementById('rebuttal').checked,
        hard_only: document.getElementById('hard-only').checked
      };

      showProcessing(true);
      
      // Simulate processing steps
      const steps = [
        'Initializing solver pool...',
        'Sending query to models...',
        'GPT-4o responding...',
        'Claude 3.5 responding...',
        'Llama 3.1 responding...',
        'Running arbiter evaluation...',
        'Computing consensus...',
        'Analyzing stability...',
        'Finalizing results...'
      ];

      for (let i = 0; i < steps.length; i++) {
        updateProcessingStatus(steps[i]);
        await new Promise(r => setTimeout(r, 500 + Math.random() * 500));
      }

      // Mock result
      const result = {
        answer: generateMockAnswer(config.query, config.domain),
        majority_rate: (0.7 + Math.random() * 0.25).toFixed(2),
        wilson_ci: [(0.6 + Math.random() * 0.2).toFixed(2), (0.85 + Math.random() * 0.1).toFixed(2)],
        latency: (1.5 + Math.random() * 2).toFixed(2),
        models_used: 5,
        responses: [
          { model: 'GPT-4o', rank: 1, score: 0.95, snippet: 'According to current evidence...' },
          { model: 'Claude 3.5', rank: 2, score: 0.92, snippet: 'The scientific consensus suggests...' },
          { model: 'Gemini 1.5', rank: 3, score: 0.88, snippet: 'Based on observations...' },
          { model: 'Llama 3.1', rank: 4, score: 0.85, snippet: 'Research indicates...' },
          { model: 'Mistral', rank: 5, score: 0.82, snippet: 'Studies show...' }
        ]
      };

      displayResults(result);
    }

    function generateMockAnswer(query, domain) {
      const answers = {
        science: "Based on the ensemble analysis, dark matter evidence comes from several key observations: (1) Galaxy rotation curves show stars orbiting faster than expected from visible matter alone, (2) Gravitational lensing effects reveal mass distributions that exceed visible matter, (3) The Cosmic Microwave Background anisotropies match predictions requiring dark matter, (4) Large-scale structure formation in the universe requires dark matter's gravitational effects. The consensus across models indicates strong confidence in dark matter's existence, though its exact nature (WIMPs, axions, etc.) remains unknown.",
        math: "The Riemann hypothesis states that all non-trivial zeros of the Riemann zeta function have real part 1/2. It's crucial because: (1) It connects prime number distribution to complex analysis, (2) Many results in number theory assume its truth, (3) Solving it would prove ~1000 theorems that currently rely on it. The hypothesis remains unproven after 160+ years despite extensive numerical verification.",
        med: "mRNA vaccines work by: (1) Delivering lipid-encapsulated mRNA encoding spike protein to cells, (2) Ribosomes translate mRNA into protein antigens, (3) The immune system recognizes these proteins as foreign, (4) B-cells produce antibodies, T-cells are activated, (5) Memory cells form for long-term protection. The mRNA degrades naturally within days.",
        econ: "Inflation is primarily caused by: (1) Demand-pull factors - excessive money supply or spending, (2) Cost-push factors - rising production costs, (3) Supply chain disruptions, (4) Inflation expectations becoming self-fulfilling. Central banks respond by: raising interest rates to reduce borrowing, quantitative tightening, and forward guidance to anchor expectations."
      };
      return answers[domain] || answers.science;
    }

    function displayResults(result) {
      showProcessing(false);

      document.getElementById('final-answer').textContent = result.answer;
      document.getElementById('metric-majority').textContent = result.majority_rate;
      document.getElementById('metric-wilson').textContent = '[' + result.wilson_ci.join(', ') + ']';
      document.getElementById('metric-latency').textContent = result.latency + 's';
      document.getElementById('metric-models').textContent = result.models_used;

      const confidencePercent = Math.round(parseFloat(result.majority_rate) * 100);
      const badge = document.getElementById('confidence-badge');
      badge.textContent = confidencePercent + '% CI';
      badge.className = confidencePercent >= 80 ? 'bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm' :
                        confidencePercent >= 60 ? 'bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm' :
                        'bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm';

      const responsesList = document.getElementById('responses-list');
      responsesList.innerHTML = result.responses.map(r => \`
        <div class="bg-gray-800 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2">
              <span class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">\${r.rank}</span>
              <span class="font-medium">\${r.model}</span>
            </div>
            <span class="text-gray-400 text-sm">Score: \${(r.score * 100).toFixed(0)}%</span>
          </div>
          <p class="text-gray-400 text-sm">\${r.snippet}</p>
        </div>
      \`).join('');
    }

    function copyResult() {
      const answer = document.getElementById('final-answer').textContent;
      navigator.clipboard.writeText(answer);
      alert('Copied to clipboard!');
    }
  </script>
</body>
</html>
`
