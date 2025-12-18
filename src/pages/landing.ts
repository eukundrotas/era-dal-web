import { head, navbar, footer } from '../components/layout'
import { Language, translations } from '../i18n/translations'

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

export const landingPage = (lang: Language = 'en') => `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(lang === 'ru' ? 'Корпоративное принятие решений с ИИ' : 'Enterprise Decision Making with AI', lang === 'ru' ? 'ERA DAL - Надёжное принятие решений через ансамбль LLM, арбитраж, консенсус и самокритику.' : 'ERA DAL - Reliable decision-making through LLM ensemble, arbitration, consensus, and self-critique. Get stable, reproducible, and quantified AI answers.', lang)}
</head>
<body class="bg-gray-950 text-white">
  ${navbar(lang)}
  
  <!-- Hero Section -->
  <section class="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
    <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 2s"></div>
    
    <div class="relative z-10 max-w-6xl mx-auto px-4 text-center">
      <div class="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span class="text-blue-400 text-sm">${t(lang, 'landing.badge')}</span>
      </div>
      
      <h1 class="text-5xl md:text-7xl font-bold mb-6">
        <span class="gradient-text">${t(lang, 'landing.heroTitle1')}</span><br>
        ${t(lang, 'landing.heroTitle2')}
      </h1>
      
      <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
        ${t(lang, 'landing.heroDesc')}
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <a href="/playground${lang === 'ru' ? '?lang=ru' : ''}" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105">
          <i class="fas fa-play mr-2"></i> ${t(lang, 'landing.tryPlayground')}
        </a>
        <a href="https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer" class="glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition">
          <i class="fab fa-github mr-2"></i> ${t(lang, 'landing.viewGitHub')}
        </a>
      </div>
      
      <div class="flex items-center justify-center gap-8 text-gray-400">
        <div class="flex items-center gap-2">
          <i class="fas fa-check-circle text-green-500"></i>
          <span>100 ${t(lang, 'landing.testsPassing')}</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="fas fa-star text-yellow-500"></i>
          <span>19 ${t(lang, 'landing.modules')}</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="fas fa-shield-alt text-blue-500"></i>
          <span>${t(lang, 'landing.wilsonCI')} 95%</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Problem Section -->
  <section class="py-20 bg-gray-900/50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">${t(lang, 'landing.problemTitle')}</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">${t(lang, 'landing.problemDesc')}</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-ghost text-red-500 text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.hallucinations')}</h3>
          <p class="text-gray-400">${t(lang, 'landing.hallucinationsDesc')}</p>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-random text-orange-500 text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.inconsistency')}</h3>
          <p class="text-gray-400">${t(lang, 'landing.inconsistencyDesc')}</p>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-question-circle text-yellow-500 text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.noConfidence')}</h3>
          <p class="text-gray-400">${t(lang, 'landing.noConfidenceDesc')}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Solution / Features Section -->
  <section id="features" class="py-20">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">${t(lang, 'landing.solutionTitle')}</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">${t(lang, 'landing.solutionDesc')}</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-layer-group text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.solverPool')}</h3>
          <p class="text-gray-400 mb-4">${t(lang, 'landing.solverPoolDesc')}</p>
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
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.arbiter')}</h3>
          <p class="text-gray-400 mb-4">${t(lang, 'landing.arbiterDesc')}</p>
          <div class="text-sm text-gray-500">
            <div class="flex justify-between"><span>Logic Score</span><span class="text-green-400">92%</span></div>
            <div class="flex justify-between"><span>Completeness</span><span class="text-blue-400">88%</span></div>
          </div>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-handshake text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.consensus')}</h3>
          <p class="text-gray-400 mb-4">${t(lang, 'landing.consensusDesc')}</p>
          <div class="text-sm">
            <span class="text-gray-500">${lang === 'ru' ? 'Режимы:' : 'Modes:'}</span>
            <span class="text-white ml-2">Top-2 | Top-3 | Hard Select</span>
          </div>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-comments text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.rebuttal')}</h3>
          <p class="text-gray-400 mb-4">${t(lang, 'landing.rebuttalDesc')}</p>
          <div class="text-xs text-gray-500">${lang === 'ru' ? 'Самокритика → Улучшение → Пере-арбитраж' : 'Self-criticism → Refinement → Re-arbitration'}</div>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-chart-line text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.stability')}</h3>
          <p class="text-gray-400 mb-4">${t(lang, 'landing.stabilityDesc')}</p>
          <div class="bg-gray-800 rounded-lg p-2 text-xs font-mono">
            <span class="text-green-400">majority_rate: 0.85</span><br>
            <span class="text-blue-400">ci: [0.72, 0.94]</span>
          </div>
        </div>
        
        <div class="glass rounded-2xl p-6 card-hover">
          <div class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-brain text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.modelMemory')}</h3>
          <p class="text-gray-400 mb-4">${t(lang, 'landing.modelMemoryDesc')}</p>
          <div class="text-xs text-gray-500">${lang === 'ru' ? 'Учится, какие модели лучше для каждого домена' : 'Learns which models perform best per domain'}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- How it Works -->
  <section id="how-it-works" class="py-20 bg-gray-900/50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">${t(lang, 'landing.howItWorksTitle')}</h2>
        <p class="text-gray-400">${t(lang, 'landing.howItWorksDesc')}</p>
      </div>
      
      <div class="relative">
        <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 hidden md:block"></div>
        
        <div class="space-y-12">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 text-right hidden md:block">
              <h3 class="text-xl font-semibold mb-2">1. ${t(lang, 'landing.step1')}</h3>
              <p class="text-gray-400">${t(lang, 'landing.step1Desc')}</p>
            </div>
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
              <i class="fas fa-paper-plane text-white"></i>
            </div>
            <div class="flex-1 md:hidden">
              <h3 class="text-xl font-semibold mb-2">1. ${t(lang, 'landing.step1')}</h3>
              <p class="text-gray-400">${t(lang, 'landing.step1Desc')}</p>
            </div>
            <div class="flex-1 hidden md:block"></div>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 hidden md:block"></div>
            <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
              <i class="fas fa-users text-white"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2">2. ${t(lang, 'landing.step2')}</h3>
              <p class="text-gray-400">${t(lang, 'landing.step2Desc')}</p>
            </div>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 text-right hidden md:block">
              <h3 class="text-xl font-semibold mb-2">3. ${t(lang, 'landing.step3')}</h3>
              <p class="text-gray-400">${t(lang, 'landing.step3Desc')}</p>
            </div>
            <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
              <i class="fas fa-balance-scale text-white"></i>
            </div>
            <div class="flex-1 md:hidden">
              <h3 class="text-xl font-semibold mb-2">3. ${t(lang, 'landing.step3')}</h3>
              <p class="text-gray-400">${t(lang, 'landing.step3Desc')}</p>
            </div>
            <div class="flex-1 hidden md:block"></div>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 hidden md:block"></div>
            <div class="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
              <i class="fas fa-sync text-white"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2">4. ${t(lang, 'landing.step4')}</h3>
              <p class="text-gray-400">${t(lang, 'landing.step4Desc')}</p>
            </div>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1 text-right hidden md:block">
              <h3 class="text-xl font-semibold mb-2">5. ${t(lang, 'landing.step5')}</h3>
              <p class="text-gray-400">${t(lang, 'landing.step5Desc')}</p>
            </div>
            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
              <i class="fas fa-check text-white"></i>
            </div>
            <div class="flex-1 md:hidden">
              <h3 class="text-xl font-semibold mb-2">5. ${t(lang, 'landing.step5')}</h3>
              <p class="text-gray-400">${t(lang, 'landing.step5Desc')}</p>
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
        <h2 class="text-3xl md:text-4xl font-bold mb-4">${t(lang, 'landing.useCasesTitle')}</h2>
        <p class="text-gray-400">${t(lang, 'landing.useCasesDesc')}</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-microscope text-3xl text-blue-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.scientific')}</h3>
          <p class="text-gray-400">${t(lang, 'landing.scientificDesc')}</p>
        </div>
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-heartbeat text-3xl text-red-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.medical')}</h3>
          <p class="text-gray-400">${t(lang, 'landing.medicalDesc')}</p>
        </div>
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-balance-scale-left text-3xl text-purple-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.legal')}</h3>
          <p class="text-gray-400">${t(lang, 'landing.legalDesc')}</p>
        </div>
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-chart-pie text-3xl text-green-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.financial')}</h3>
          <p class="text-gray-400">${t(lang, 'landing.financialDesc')}</p>
        </div>
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-graduation-cap text-3xl text-yellow-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.education')}</h3>
          <p class="text-gray-400">${t(lang, 'landing.educationDesc')}</p>
        </div>
        <div class="glass rounded-2xl p-6">
          <i class="fas fa-shield-virus text-3xl text-cyan-500 mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">${t(lang, 'landing.moderation')}</h3>
          <p class="text-gray-400">${t(lang, 'landing.moderationDesc')}</p>
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
          <div class="text-gray-400">${t(lang, 'landing.modules')}</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold gradient-text mb-2">100</div>
          <div class="text-gray-400">${t(lang, 'landing.testsPassing')}</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold gradient-text mb-2">4</div>
          <div class="text-gray-400">${t(lang, 'landing.domainPools')}</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold gradient-text mb-2">95%</div>
          <div class="text-gray-400">${t(lang, 'landing.wilsonCI')}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">${t(lang, 'landing.ctaTitle')}</h2>
      <p class="text-gray-400 mb-8 text-lg">${t(lang, 'landing.ctaDesc')}</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/playground${lang === 'ru' ? '?lang=ru' : ''}" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105">
          <i class="fas fa-rocket mr-2"></i> ${t(lang, 'landing.getStarted')}
        </a>
        <a href="/docs${lang === 'ru' ? '?lang=ru' : ''}" class="glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition">
          <i class="fas fa-book mr-2"></i> ${t(lang, 'landing.readDocs')}
        </a>
      </div>
    </div>
  </section>

  ${footer(lang)}
</body>
</html>
`
