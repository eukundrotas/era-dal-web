// Shared layout components

export const head = (title: string, description: string = '') => `
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
  </style>
`

export const navbar = (activePage: string = '') => `
  <nav class="fixed top-0 left-0 right-0 z-50 glass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-2">
            <i class="fas fa-brain text-2xl text-blue-500"></i>
            <span class="text-xl font-bold gradient-text">ERA DAL</span>
          </a>
          <div class="hidden md:flex ml-10 space-x-4">
            <a href="/#features" class="text-gray-300 hover:text-white px-3 py-2 text-sm">Features</a>
            <a href="/#how-it-works" class="text-gray-300 hover:text-white px-3 py-2 text-sm">How it Works</a>
            <a href="/pricing" class="text-gray-300 hover:text-white px-3 py-2 text-sm">Pricing</a>
            <a href="/docs" class="text-gray-300 hover:text-white px-3 py-2 text-sm">Docs</a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <a href="/dashboard" class="text-gray-300 hover:text-white px-3 py-2 text-sm">
            <i class="fas fa-chart-line mr-1"></i> Dashboard
          </a>
          <a href="/playground" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <i class="fas fa-play mr-1"></i> Try Now
          </a>
        </div>
      </div>
    </div>
  </nav>
`

export const sidebar = (activePage: string = 'dashboard') => `
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
      
      <nav class="space-y-1">
        <a href="/dashboard" class="sidebar-link ${activePage === 'dashboard' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-chart-pie w-5"></i>
          <span>Dashboard</span>
        </a>
        <a href="/playground" class="sidebar-link ${activePage === 'playground' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-flask w-5"></i>
          <span>Playground</span>
        </a>
        <a href="/history" class="sidebar-link ${activePage === 'history' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-history w-5"></i>
          <span>History</span>
        </a>
        
        <div class="pt-4 mt-4 border-t border-gray-800">
          <p class="px-3 text-xs text-gray-500 uppercase tracking-wider mb-2">Settings</p>
        </div>
        
        <a href="/settings" class="sidebar-link ${activePage === 'settings' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-cog w-5"></i>
          <span>Settings</span>
        </a>
        <a href="/profile" class="sidebar-link ${activePage === 'profile' ? 'active' : ''} flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
          <i class="fas fa-user-circle w-5"></i>
          <span>Profile</span>
        </a>
      </nav>
      
      <div class="absolute bottom-4 left-4 right-4">
        <div class="glass rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">API Calls</span>
            <span class="text-white text-sm font-medium">847 / 1000</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style="width: 84.7%"></div>
          </div>
          <a href="/pricing" class="text-blue-400 text-xs mt-2 inline-block hover:text-blue-300">Upgrade Plan →</a>
        </div>
      </div>
    </div>
  </aside>
`

export const footer = () => `
  <footer class="bg-gray-900 border-t border-gray-800 py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <i class="fas fa-brain text-2xl text-blue-500"></i>
            <span class="text-xl font-bold gradient-text">ERA DAL</span>
          </div>
          <p class="text-gray-400 text-sm">
            Enterprise-grade decision making through LLM ensemble, arbitration, and consensus.
          </p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Product</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="/#features" class="hover:text-white">Features</a></li>
            <li><a href="/pricing" class="hover:text-white">Pricing</a></li>
            <li><a href="/docs" class="hover:text-white">Documentation</a></li>
            <li><a href="/playground" class="hover:text-white">Playground</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Resources</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer" class="hover:text-white">GitHub</a></li>
            <li><a href="/docs" class="hover:text-white">API Reference</a></li>
            <li><a href="/docs" class="hover:text-white">Examples</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Contact</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="https://github.com/eukundrotas/ERA-Decision-Arbitration-Layer/issues" class="hover:text-white">Support</a></li>
            <li><a href="mailto:contact@era-dal.com" class="hover:text-white">Email</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
        © 2025 ERA DAL. All rights reserved. Built by Eugene Kundrotas.
      </div>
    </div>
  </footer>
`
