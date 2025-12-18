import { head, navbar, footer } from '../components/layout'

export const landingPage = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  ${head('Enterprise Decision Making with AI', 'ERA DAL - Reliable decision-making through LLM ensemble, arbitration, consensus, and self-critique. Get stable, reproducible, and quantified AI answers.')}
</head>
<body class="bg-gray-950 text-white">
  ${navbar()}
  
  <!-- Hero Section -->
  <section class="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
    <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 2s"></div>
    
    <div class="relative z-10 max-w-6xl mx-auto px-4 text-center">
      <div class="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span class="text-blue-400 text-sm">v1.2.0 Released — Level 2 Upgrades Available</span>
      </div>
      
      <h1 class="text-5xl md:text-7xl font-bold mb-6">
        <span class="gradient-text">Enterprise AI</span><br>
        Decision Making
      </h1>
      
      <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
        Get <span class="text-white font-semibold">stable, reproducible, and quantified</span> answers 
        through LLM ensemble, arbitration, consensus synthesis, and self-critique. 
        Built for scientific, medical, legal, and financial applications.
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <a href="/playground" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105">
          <i class="fas fa-play mr-2"></i> Try Playground
        </a>
        <a href="https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer" class="glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition">
          <i class="fab fa-github mr-2"></i> View on GitHub
        </a>
      </div>
      
      <div class="flex items-center justify-center gap-8 text-gray-400">
        <div class="flex items-center gap-2">
          <i class="fas fa-check-circle text-green-500"></i>
          <span>100 Tests Passing</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="fas fa-star text-yellow-500"></i>
          <span>19 Modules</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="fas fa-shield-alt text-blue-500"></i>
          <span>Wilson CI 95%</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Problem Section -->
  <section class="py-20 bg-gray-900/50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">The Problem with Single LLM Answers</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">Current AI solutions suffer from critical issues that make them unreliable for enterprise use.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-ghost text-red-500 text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Hallucinations</h3>
          <p class="text-gray-400">Single models confidently produce incorrect information with no way to verify.</p>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-random text-orange-500 text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Inconsistency</h3>
          <p class="text-gray-400">Same question, different answers each time. No reproducibility guarantees.</p>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-question-circle text-yellow-500 text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">No Confidence Metrics</h3>
          <p class="text-gray-400">No way to know how reliable the answer is. Zero quantitative trust.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Solution / Features Section -->
  <section id="features" class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">How ERA DAL Solves This</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">A multi-layer architecture that ensures reliable, reproducible, and quantified answers.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-layer-group text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Solver Pool</h3>
          <p class="text-gray-400 mb-4">5-12 LLM models work in parallel, each providing independent analysis.</p>
          <div class="flex flex-wrap gap-2">
            <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">GPT-4</span>
            <span class="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Claude</span>
            <span class="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Llama</span>
            <span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Mistral</span>
          </div>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-gavel text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Arbiter Ranker</h3>
          <p class="text-gray-400 mb-4">Evaluates each answer on logic, completeness, risks, and quality.</p>
          <div class="text-sm text-gray-500">
            <div class="flex justify-between"><span>Logic Score</span><span class="text-green-400">92%</span></div>
            <div class="flex justify-between"><span>Completeness</span><span class="text-blue-400">88%</span></div>
          </div>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-handshake text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Consensus Synthesis</h3>
          <p class="text-gray-400 mb-4">Combines top-K answers into a unified, high-quality response.</p>
          <div class="text-sm">
            <span class="text-gray-500">Modes:</span>
            <span class="text-white ml-2">Top-2 | Top-3 | Hard Select</span>
          </div>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-comments text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Rebuttal Round</h3>
          <p class="text-gray-400 mb-4">Models critique each other's answers, catching errors and improving quality.</p>
          <div class="text-xs text-gray-500">Self-criticism → Refinement → Re-arbitration</div>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-chart-line text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Stability Analysis</h3>
          <p class="text-gray-400 mb-4">Multi-run testing with Wilson CI 95% confidence intervals.</p>
          <div class="bg-gray-800 rounded-lg p-2 text-xs font-mono">
            <span class="text-green-400">majority_rate: 0.85</span><br>
            <span class="text-blue-400">ci: [0.72, 0.94]</span>
          </div>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-brain text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Model Memory</h3>
          <p class="text-gray-400 mb-4">Tracks model reliability over time for weighted consensus.</p>
          <div class="text-xs text-gray-500">Learns which models perform best per domain</div>
        </div>
      </div>
    </div>
  </section>

  <!-- How it Works -->
  <section id="how-it-works" class="py-20 bg-gray-900/50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p class="text-gray-400">From question to confident answer in 5 steps</p>
      </div>
      
      <div class="relative">
        <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 hidden md:block"></div>
        
        <div class="space-y-12">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 text-right hidden md:block">
              <h3 class="text-xl font-semibold mb-2">1. Submit Problem</h3>
              <p class="text-gray-400">Enter your question and select the domain (science, math, med, econ)</p>
            </div>
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
              <i class="fas fa-paper-plane text-white"></i>
            </div>
            <div class="flex-1 md:hidden">
              <h3 class="text-xl font-semibold mb-2">1. Submit Problem</h3>
              <p class="text-gray-400">Enter your question and select the domain</p>
            </div>
            <div class="flex-1 hidden md:block"></div>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 hidden md:block"></div>
            <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
              <i class="fas fa-users text-white"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2">2. Solver Pool Processes</h3>
              <p class="text-gray-400">5-12 LLM models analyze your question in parallel</p>
            </div>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 text-right hidden md:block">
              <h3 class="text-xl font-semibold mb-2">3. Arbiter Evaluates</h3>
              <p class="text-gray-400">Quality assessment, ranking, and disagreement detection</p>
            </div>
            <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
              <i class="fas fa-balance-scale text-white"></i>
            </div>
            <div class="flex-1 md:hidden">
              <h3 class="text-xl font-semibold mb-2">3. Arbiter Evaluates</h3>
              <p class="text-gray-400">Quality assessment and ranking</p>
            </div>
            <div class="flex-1 hidden md:block"></div>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 hidden md:block"></div>
            <div class="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
              <i class="fas fa-sync text-white"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2">4. Consensus & Rebuttal</h3>
              <p class="text-gray-400">Synthesis from top answers, optional self-critique round</p>
            </div>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 text-right hidden md:block">
              <h3 class="text-xl font-semibold mb-2">5. Stability Check</h3>
              <p class="text-gray-400">Multi-run analysis with Wilson CI confidence intervals</p>
            </div>
            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
              <i class="fas fa-check text-white"></i>
            </div>
            <div class="flex-1 md:hidden">
              <h3 class="text-xl font-semibold mb-2">5. Stability Check</h3>
              <p class="text-gray-400">Multi-run analysis with confidence intervals</p>
            </div>
            <div class="flex-1 hidden md:block"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Use Cases -->
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
        <p class="text-gray-400">Trusted by enterprises for critical decisions</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-microscope text-3xl text-blue-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">Scientific Research</h3>
          <p class="text-gray-400">Hypothesis testing with quantitative reliability metrics</p>
        </div>
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-heartbeat text-3xl text-red-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">Medical Diagnosis</h3>
          <p class="text-gray-400">Second opinion from ensemble of medical AI models</p>
        </div>
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-balance-scale-left text-3xl text-purple-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">Legal Analysis</h3>
          <p class="text-gray-400">Contract analysis with consensus validation</p>
        </div>
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-chart-pie text-3xl text-green-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">Financial Forecasting</h3>
          <p class="text-gray-400">Risk assessment with confidence intervals</p>
        </div>
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-graduation-cap text-3xl text-yellow-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">Education</h3>
          <p class="text-gray-400">Automated grading with explanation</p>
        </div>
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-shield-virus text-3xl text-cyan-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">Content Moderation</h3>
          <p class="text-gray-400">Reliable classification with audit trail</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-4xl md:text-5xl font-bold gradient-text mb-2">19</div>
          <div class="text-gray-400">Modules</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold gradient-text mb-2">100</div>
          <div class="text-gray-400">Tests Passing</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold gradient-text mb-2">4</div>
          <div class="text-gray-400">Domain Pools</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold gradient-text mb-2">95%</div>
          <div class="text-gray-400">Wilson CI</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Make Better Decisions?</h2>
      <p class="text-gray-400 mb-8 text-lg">Start using ERA DAL today. Free tier available.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/playground" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105">
          <i class="fas fa-rocket mr-2"></i> Get Started Free
        </a>
        <a href="/docs" class="glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition">
          <i class="fas fa-book mr-2"></i> Read Documentation
        </a>
      </div>
    </div>
  </section>

  ${footer()}
</body>
</html>
`
