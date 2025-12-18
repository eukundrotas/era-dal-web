import { head, navbar, footer } from '../components/layout'

export const docsPage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  ${head('Documentation', 'Learn how to use ERA DAL - API reference, examples, and guides.')}
</head>
<body class="bg-gray-950 text-white">
  ${navbar()}
  
  <main class="pt-20 min-h-screen">
    <div class="flex">
      <!-- Sidebar -->
      <aside class="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto hidden lg:block">
        <nav class="p-4 space-y-6">
          <div>
            <h4 class="text-xs text-gray-500 uppercase tracking-wider mb-2">Getting Started</h4>
            <ul class="space-y-1">
              <li><a href="#introduction" class="block px-3 py-2 rounded-lg text-blue-400 bg-blue-500/10">Introduction</a></li>
              <li><a href="#quick-start" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Quick Start</a></li>
              <li><a href="#installation" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Installation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-xs text-gray-500 uppercase tracking-wider mb-2">Core Concepts</h4>
            <ul class="space-y-1">
              <li><a href="#solver-pool" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Solver Pool</a></li>
              <li><a href="#arbiter" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Arbiter</a></li>
              <li><a href="#consensus" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Consensus</a></li>
              <li><a href="#stability" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Stability Analysis</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-xs text-gray-500 uppercase tracking-wider mb-2">API Reference</h4>
            <ul class="space-y-1">
              <li><a href="#api-overview" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Overview</a></li>
              <li><a href="#api-endpoints" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Endpoints</a></li>
              <li><a href="#api-errors" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Error Handling</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-xs text-gray-500 uppercase tracking-wider mb-2">Examples</h4>
            <ul class="space-y-1">
              <li><a href="#example-science" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Science Query</a></li>
              <li><a href="#example-math" class="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5">Math Query</a></li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="lg:ml-64 flex-1 p-8 max-w-4xl">
        <!-- Introduction -->
        <section id="introduction" class="mb-16">
          <h1 class="text-4xl font-bold mb-4">ERA DAL Documentation</h1>
          <p class="text-gray-400 text-lg mb-6">
            ERA Decision & Arbitration Layer is a multi-model AI system that provides reliable, reproducible, and quantified answers through ensemble LLMs, arbitration, consensus synthesis, and self-critique.
          </p>
          
          <div class="glass rounded-xl p-6">
            <h3 class="font-semibold mb-4">Key Features</h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-start space-x-2">
                <i class="fas fa-check text-green-500 mt-1"></i>
                <span><strong>Multi-Model Ensemble:</strong> 5-12 LLMs analyze each query in parallel</span>
              </li>
              <li class="flex items-start space-x-2">
                <i class="fas fa-check text-green-500 mt-1"></i>
                <span><strong>Automated Arbitration:</strong> Intelligent ranking and quality assessment</span>
              </li>
              <li class="flex items-start space-x-2">
                <i class="fas fa-check text-green-500 mt-1"></i>
                <span><strong>Consensus Synthesis:</strong> Combines top answers into unified response</span>
              </li>
              <li class="flex items-start space-x-2">
                <i class="fas fa-check text-green-500 mt-1"></i>
                <span><strong>Stability Metrics:</strong> Wilson CI 95% confidence intervals</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Quick Start -->
        <section id="quick-start" class="mb-16">
          <h2 class="text-2xl font-bold mb-4">Quick Start</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold mb-2">1. Clone the repository</h3>
              <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-green-400">git clone https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer.git
cd ERA-Decision-Arbitration-Layer</code></pre>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-2">2. Install dependencies</h3>
              <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-green-400">pip install -r requirements.txt</code></pre>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-2">3. Configure API key</h3>
              <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-green-400"># Create .env file
echo "OPENROUTER_API_KEY=your-api-key-here" > .env</code></pre>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-2">4. Run your first query</h3>
              <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-green-400">python app.py --pool science --problem "What causes gravity?"</code></pre>
            </div>
          </div>
        </section>

        <!-- Installation -->
        <section id="installation" class="mb-16">
          <h2 class="text-2xl font-bold mb-4">Installation</h2>
          
          <div class="glass rounded-xl p-6 mb-6">
            <h3 class="font-semibold mb-4">Requirements</h3>
            <ul class="space-y-2 text-gray-300">
              <li><i class="fas fa-python text-blue-400 mr-2"></i> Python 3.9+</li>
              <li><i class="fas fa-key text-yellow-400 mr-2"></i> OpenRouter API key</li>
              <li><i class="fas fa-hdd text-gray-400 mr-2"></i> ~100MB disk space</li>
            </ul>
          </div>

          <h3 class="text-lg font-semibold mb-2">Docker Installation</h3>
          <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6"><code class="text-green-400"># Using Docker
docker-compose up dashboard

# Access dashboard at http://localhost:8080</code></pre>

          <h3 class="text-lg font-semibold mb-2">Manual Installation</h3>
          <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-green-400"># Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Verify installation
python -m pytest tests/</code></pre>
        </section>

        <!-- Solver Pool -->
        <section id="solver-pool" class="mb-16">
          <h2 class="text-2xl font-bold mb-4">Solver Pool</h2>
          <p class="text-gray-400 mb-6">
            The Solver Pool is the core component that manages multiple LLM models and orchestrates their parallel execution.
          </p>

          <div class="glass rounded-xl p-6 mb-6">
            <h3 class="font-semibold mb-4">Available Models</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-800 rounded-lg p-3">
                <span class="text-blue-400">GPT-4o</span>
                <p class="text-gray-500 text-sm">OpenAI's flagship</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3">
                <span class="text-purple-400">Claude 3.5</span>
                <p class="text-gray-500 text-sm">Anthropic</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3">
                <span class="text-green-400">Llama 3.1 70B</span>
                <p class="text-gray-500 text-sm">Meta</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3">
                <span class="text-orange-400">Mistral Large</span>
                <p class="text-gray-500 text-sm">Mistral AI</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3">
                <span class="text-cyan-400">Gemini 1.5</span>
                <p class="text-gray-500 text-sm">Google</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3">
                <span class="text-pink-400">Qwen 2.5</span>
                <p class="text-gray-500 text-sm">Alibaba</p>
              </div>
            </div>
          </div>

          <h3 class="text-lg font-semibold mb-2">Domain Pools</h3>
          <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-gray-300"># Available pools
--pool science  # Physics, chemistry, biology
--pool math     # Mathematics, logic, proofs
--pool med      # Medical, clinical, diagnosis
--pool econ     # Economics, finance, markets</code></pre>
        </section>

        <!-- API Reference -->
        <section id="api-overview" class="mb-16">
          <h2 class="text-2xl font-bold mb-4">API Reference</h2>
          
          <div class="glass rounded-xl p-6 mb-6">
            <h3 class="font-semibold mb-4">Base URL</h3>
            <pre class="bg-gray-800 rounded-lg p-3"><code class="text-blue-400">http://localhost:8080/api</code></pre>
          </div>

          <div id="api-endpoints" class="space-y-6">
            <h3 class="text-lg font-semibold">Endpoints</h3>
            
            <!-- Health -->
            <div class="glass rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <span class="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono">GET</span>
                <code class="text-white">/api/health</code>
              </div>
              <p class="text-gray-400 mb-4">Check API health status</p>
              <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-gray-300">// Response
{
  "status": "healthy",
  "timestamp": "2025-12-18T10:30:00Z",
  "version": "1.2.0"
}</code></pre>
            </div>

            <!-- Dashboard -->
            <div class="glass rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <span class="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono">GET</span>
                <code class="text-white">/api/dashboard</code>
              </div>
              <p class="text-gray-400 mb-4">Get dashboard statistics</p>
              <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-gray-300">// Response
{
  "problems": 142,
  "runs": 847,
  "apiCalls": 1250,
  "models": 7,
  "avgConfidence": 87,
  "avgLatency": 1850,
  "successRate": 94
}</code></pre>
            </div>

            <!-- Events -->
            <div class="glass rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <span class="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono">GET</span>
                <code class="text-white">/api/events</code>
              </div>
              <p class="text-gray-400 mb-4">Get recent events</p>
              <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-gray-300">// Query params
?limit=50

// Response
{
  "events": [
    {
      "id": "evt_123",
      "type": "query_completed",
      "timestamp": "2025-12-18T10:30:00Z",
      "data": { ... }
    }
  ]
}</code></pre>
            </div>

            <!-- Models -->
            <div class="glass rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <span class="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono">GET</span>
                <code class="text-white">/api/models</code>
              </div>
              <p class="text-gray-400 mb-4">Get model performance statistics</p>
              <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-gray-300">// Response
{
  "models": [
    {
      "name": "gpt-4o",
      "calls": 234,
      "avgLatency": 1.2,
      "successRate": 0.95
    }
  ]
}</code></pre>
            </div>
          </div>
        </section>

        <!-- Examples -->
        <section id="example-science" class="mb-16">
          <h2 class="text-2xl font-bold mb-4">Examples</h2>
          
          <h3 class="text-lg font-semibold mb-2">Science Query</h3>
          <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6"><code class="text-green-400"># Command line
python app.py \\
  --pool science \\
  --problem "What is the evidence for dark matter?" \\
  --repeats 3 \\
  --consensus-topk 2 \\
  --rebuttal</code></pre>

          <h3 id="example-math" class="text-lg font-semibold mb-2">Math Query</h3>
          <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6"><code class="text-green-400"># Command line
python app.py \\
  --pool math \\
  --problem "Prove that sqrt(2) is irrational" \\
  --repeats 5 \\
  --hard-only</code></pre>

          <h3 class="text-lg font-semibold mb-2">Python Library Usage</h3>
          <pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-gray-300">from src.orchestrator import Orchestrator
from src.config import Config

# Initialize
config = Config()
orchestrator = Orchestrator(config)

# Run query
result = orchestrator.run(
    problem="What causes gravity?",
    pool="science",
    repeats=3,
    consensus_topk=2,
    rebuttal=True
)

# Access results
print(f"Answer: {result.final_answer}")
print(f"Confidence: {result.majority_rate}")
print(f"Wilson CI: {result.ci_low} - {result.ci_high}")</code></pre>
        </section>

        <!-- Footer -->
        <div class="border-t border-gray-800 pt-8 mt-16">
          <div class="flex items-center justify-between text-gray-500 text-sm">
            <span>ERA DAL v1.2.0</span>
            <div class="flex items-center space-x-4">
              <a href="https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer" class="hover:text-white">
                <i class="fab fa-github mr-1"></i> GitHub
              </a>
              <a href="https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer/issues" class="hover:text-white">
                <i class="fas fa-bug mr-1"></i> Report Issue
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</body>
</html>
`
