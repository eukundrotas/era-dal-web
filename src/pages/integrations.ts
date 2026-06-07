import { head, sidebar, footer } from '../components/layout'
import { Language } from '../i18n/translations'

export const integrationsPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  
  return `
<!DOCTYPE html>
<html lang="${lang}">
${head(isRu ? 'Интеграции | ERA DAL' : 'Integrations | ERA DAL',
       isRu ? 'Подключите научные базы данных, MCP, LangChain и другие платформы' : 'Connect scientific databases, MCP, LangChain and other platforms',
       lang)}
<body class="bg-gray-900 text-white min-h-screen">
  <div class="flex">
    ${sidebar('integrations', lang)}
    
    <main class="flex-1 ml-56 p-8">
      <div class="max-w-6xl mx-auto">
        
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold gradient-text">${isRu ? 'Интеграции' : 'Integrations'}</h1>
            <p class="text-gray-400 mt-2">${isRu ? 'Подключите ERA DAL к внешним сервисам и протоколам' : 'Connect ERA DAL to external services and protocols'}</p>
          </div>
        </div>

        <!-- Integration Categories -->
        <div class="flex gap-2 mb-6 flex-wrap">
          <button onclick="filterProviders('all')" class="provider-filter-btn active px-4 py-2 rounded-lg bg-gray-700" data-filter="all">
            ${isRu ? 'Все' : 'All'}
          </button>
          <button onclick="filterProviders('protocol')" class="provider-filter-btn px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700" data-filter="protocol">
            <i class="fas fa-plug text-blue-400 mr-1"></i>
            ${isRu ? 'Протоколы' : 'Protocols'}
          </button>
          <button onclick="filterProviders('framework')" class="provider-filter-btn px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700" data-filter="framework">
            <i class="fas fa-cubes text-purple-400 mr-1"></i>
            ${isRu ? 'Фреймворки' : 'Frameworks'}
          </button>
          <button onclick="filterProviders('runtime')" class="provider-filter-btn px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700" data-filter="runtime">
            <i class="fas fa-server text-green-400 mr-1"></i>
            ${isRu ? 'Рантаймы' : 'Runtimes'}
          </button>
          <button onclick="filterProviders('api')" class="provider-filter-btn px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700" data-filter="api">
            <i class="fas fa-cloud text-yellow-400 mr-1"></i>
            ${isRu ? 'API' : 'APIs'}
          </button>
          <button onclick="filterProviders('research')" class="provider-filter-btn px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700" data-filter="research">
            <i class="fas fa-microscope text-emerald-400 mr-1"></i>
            ${isRu ? 'Науч. базы' : 'Research DBs'}
          </button>
        </div>

        <!-- Active Integrations Summary -->
        <div class="glass-card rounded-xl p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-check-circle text-green-400"></i>
            ${isRu ? 'Активные интеграции' : 'Active Integrations'}
          </h2>
          <div id="activeIntegrations" class="flex flex-wrap gap-3">
            <span class="text-gray-500">${isRu ? 'Нет настроенных интеграций' : 'No integrations configured'}</span>
          </div>
        </div>

        <!-- Provider Cards -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" id="providersGrid">
          <!-- Providers will be loaded here -->
        </div>

        <!-- Integration Configuration Modal -->
        <div id="configModal" class="fixed inset-0 bg-black/70 z-50 hidden flex items-center justify-center p-4">
          <div class="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-700 flex items-center justify-between">
              <div>
                <h3 id="modalTitle" class="text-xl font-bold"></h3>
                <p id="modalDescription" class="text-gray-400 text-sm mt-1"></p>
              </div>
              <button onclick="closeModal()" class="text-gray-400 hover:text-white">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div class="p-6">
              <!-- Features -->
              <div class="mb-6">
                <h4 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  ${isRu ? 'Возможности' : 'Features'}
                </h4>
                <div id="modalFeatures" class="flex flex-wrap gap-2"></div>
              </div>
              
              <!-- Configuration Form -->
              <div class="mb-6">
                <h4 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  ${isRu ? 'Конфигурация' : 'Configuration'}
                </h4>
                <form id="configForm" class="space-y-4"></form>
              </div>
              
              <!-- Test Result -->
              <div id="testResult" class="hidden mb-6"></div>
              
              <!-- Actions -->
              <div class="flex gap-3">
                <button onclick="testIntegration()" class="flex-1 bg-blue-600 hover:bg-blue-500 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-plug"></i>
                  ${isRu ? 'Проверить подключение' : 'Test Connection'}
                </button>
                <button onclick="saveIntegration()" class="flex-1 bg-green-600 hover:bg-green-500 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-save"></i>
                  ${isRu ? 'Сохранить' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- MCP Tools Explorer -->
        <div class="glass-card rounded-xl p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-tools text-blue-400"></i>
            ${isRu ? 'MCP Обозреватель' : 'MCP Explorer'}
          </h2>
          
          <div class="grid md:grid-cols-3 gap-4 mb-4">
            <button onclick="exploreMCP('tools')" class="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors text-left">
              <i class="fas fa-wrench text-blue-400 text-2xl mb-2"></i>
              <h3 class="font-semibold">${isRu ? 'Инструменты' : 'Tools'}</h3>
              <p class="text-sm text-gray-400">${isRu ? 'Доступные MCP инструменты' : 'Available MCP tools'}</p>
            </button>
            <button onclick="exploreMCP('resources')" class="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors text-left">
              <i class="fas fa-database text-green-400 text-2xl mb-2"></i>
              <h3 class="font-semibold">${isRu ? 'Ресурсы' : 'Resources'}</h3>
              <p class="text-sm text-gray-400">${isRu ? 'Файлы и данные' : 'Files and data'}</p>
            </button>
            <button onclick="exploreMCP('prompts')" class="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors text-left">
              <i class="fas fa-comment-alt text-purple-400 text-2xl mb-2"></i>
              <h3 class="font-semibold">${isRu ? 'Промпты' : 'Prompts'}</h3>
              <p class="text-sm text-gray-400">${isRu ? 'Шаблоны запросов' : 'Prompt templates'}</p>
            </button>
          </div>
          
          <div id="mcpExplorerResult" class="hidden bg-gray-800 rounded-lg p-4">
            <!-- MCP exploration results -->
          </div>
        </div>

        <!-- Quick Test Panel -->
        <div class="glass-card rounded-xl p-6">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-flask text-yellow-400"></i>
            ${isRu ? 'Быстрый тест интеграции' : 'Quick Integration Test'}
          </h2>
          
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">${isRu ? 'Выберите интеграцию' : 'Select Integration'}</label>
              <select id="quickTestProvider" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                <option value="">${isRu ? '-- Выберите --' : '-- Select --'}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">${isRu ? 'Тестовое сообщение' : 'Test Message'}</label>
              <input type="text" id="quickTestMessage" value="Hello, how are you?" 
                     class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
            </div>
          </div>
          
          <button onclick="runQuickTest()" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6 py-3 rounded-lg transition-all font-semibold">
            <i class="fas fa-play mr-2"></i>
            ${isRu ? 'Запустить тест' : 'Run Test'}
          </button>
          
          <div id="quickTestResult" class="hidden mt-4 bg-gray-800 rounded-lg p-4">
            <!-- Test result -->
          </div>
        </div>

      </div>
    </main>
  </div>

  ${footer(lang)}

  <script>
    const LANG = '${lang}';
    const isRu = LANG === 'ru';
    
    let allProviders = [];
    let currentFilter = 'all';
    let currentProvider = null;
    
    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
      loadProviders();
      loadActiveIntegrations();
    });
    
    // Load providers from API
    async function loadProviders() {
      try {
        const response = await fetch('/api/integrations/providers');
        const data = await response.json();
        allProviders = data.providers;
        renderProviders(allProviders);
        populateQuickTestSelect();
      } catch (error) {
        console.error('Failed to load providers:', error);
      }
    }
    
    // Filter providers
    function filterProviders(type) {
      currentFilter = type;
      
      document.querySelectorAll('.provider-filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-gray-700');
        btn.classList.add('bg-gray-800');
      });
      document.querySelector(\`[data-filter="\${type}"]\`).classList.add('active', 'bg-gray-700');
      document.querySelector(\`[data-filter="\${type}"]\`).classList.remove('bg-gray-800');
      
      const filtered = type === 'all' 
        ? allProviders 
        : allProviders.filter(p => p.type === type);
      
      renderProviders(filtered);
    }
    
    // Render provider cards
    function renderProviders(providers) {
      const grid = document.getElementById('providersGrid');
      
      const typeColors = {
        protocol: 'blue',
        framework: 'purple',
        runtime: 'green',
        api: 'yellow',
        research: 'emerald'
      };
      
      const statusBadges = {
        stable: { color: 'green', label: isRu ? 'Стабильно' : 'Stable' },
        beta: { color: 'yellow', label: 'Beta' },
        experimental: { color: 'red', label: isRu ? 'Эксперимент' : 'Experimental' }
      };
      
      grid.innerHTML = providers.map(provider => {
        const color = typeColors[provider.type] || 'gray';
        const status = statusBadges[provider.status] || statusBadges.stable;
        const savedConfig = localStorage.getItem(\`era_integration_\${provider.id}\`);
        const isConfigured = !!savedConfig;
        
        return \`
          <div class="bg-gray-800 hover:bg-gray-750 rounded-xl p-5 cursor-pointer transition-all border-2 \${isConfigured ? 'border-green-500/50' : 'border-transparent hover:border-\${color}-500/50'}"
               onclick="openConfig('\${provider.id}')">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-\${color}-900/50 rounded-lg flex items-center justify-center">
                  <i class="fas fa-\${getProviderIcon(provider.id)} text-\${color}-400"></i>
                </div>
                <div>
                  <h3 class="font-semibold">\${provider.name}</h3>
                  <span class="text-xs px-2 py-0.5 rounded bg-\${status.color}-900/50 text-\${status.color}-400">\${status.label}</span>
                </div>
              </div>
              \${isConfigured ? '<i class="fas fa-check-circle text-green-400"></i>' : ''}
            </div>
            <p class="text-sm text-gray-400 mb-3 line-clamp-2">\${provider.description}</p>
            <div class="flex flex-wrap gap-1">
              \${provider.features.slice(0, 3).map(f => \`
                <span class="text-xs bg-gray-700 px-2 py-0.5 rounded">\${f}</span>
              \`).join('')}
              \${provider.features.length > 3 ? \`<span class="text-xs text-gray-500">+\${provider.features.length - 3}</span>\` : ''}
            </div>
          </div>
        \`;
      }).join('');
    }
    
    // Get provider icon
    function getProviderIcon(id) {
      const icons = {
        'mcp': 'plug',
        'openai-compatible': 'robot',
        'ollama': 'server',
        'langchain': 'link',
        'llamaindex': 'search',
        'langgraph': 'project-diagram',
        'crewai': 'users',
        'autogen': 'comments',
        'groq': 'bolt',
        'together': 'layer-group',
        'fireworks': 'fire',
        'anthropic': 'brain',
        'google': 'google',
        'huggingface': 'face-smile',
        'replicate': 'copy',
        'webhook': 'globe',
        'pubmed': 'dna',
        'arxiv': 'file-alt',
        'crossref': 'link',
        'orcid': 'id-badge',
        'zotero': 'book',
        'semantic_scholar': 'graduation-cap'
      };
      return icons[id] || 'plug';
    }
    
    // Open configuration modal
    function openConfig(providerId) {
      currentProvider = allProviders.find(p => p.id === providerId);
      if (!currentProvider) return;
      
      document.getElementById('modalTitle').textContent = currentProvider.name;
      document.getElementById('modalDescription').textContent = currentProvider.description;
      
      // Render features
      document.getElementById('modalFeatures').innerHTML = currentProvider.features.map(f => \`
        <span class="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">\${f}</span>
      \`).join('');
      
      // Render config form
      const savedConfig = JSON.parse(localStorage.getItem(\`era_integration_\${providerId}\`) || '{}');
      const form = document.getElementById('configForm');
      
      form.innerHTML = currentProvider.configFields.map(field => {
        const value = savedConfig[field.key] || field.default || '';
        
        if (field.type === 'select') {
          return \`
            <div>
              <label class="block text-sm text-gray-400 mb-1">\${field.label} \${field.required ? '<span class="text-red-400">*</span>' : ''}</label>
              <select name="\${field.key}" \${field.required ? 'required' : ''} class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
                \${field.options.map(opt => \`
                  <option value="\${opt.value}" \${value === opt.value ? 'selected' : ''}>\${opt.label}</option>
                \`).join('')}
              </select>
            </div>
          \`;
        }
        
        if (field.type === 'boolean') {
          return \`
            <div class="flex items-center gap-3">
              <input type="checkbox" name="\${field.key}" id="\${field.key}" \${value ? 'checked' : ''} class="w-5 h-5 rounded bg-gray-700 border-gray-600">
              <label for="\${field.key}" class="text-gray-300">\${field.label}</label>
            </div>
          \`;
        }
        
        return \`
          <div>
            <label class="block text-sm text-gray-400 mb-1">\${field.label} \${field.required ? '<span class="text-red-400">*</span>' : ''}</label>
            <input type="\${field.type === 'password' ? 'password' : field.type === 'number' ? 'number' : 'text'}"
                   name="\${field.key}"
                   value="\${value}"
                   placeholder="\${field.placeholder || ''}"
                   \${field.required ? 'required' : ''}
                   class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
          </div>
        \`;
      }).join('');
      
      document.getElementById('testResult').classList.add('hidden');
      document.getElementById('configModal').classList.remove('hidden');
    }
    
    // Close modal
    function closeModal() {
      document.getElementById('configModal').classList.add('hidden');
      currentProvider = null;
    }
    
    // Get form data
    function getFormData() {
      const form = document.getElementById('configForm');
      const formData = new FormData(form);
      const config = {};
      
      currentProvider.configFields.forEach(field => {
        if (field.type === 'boolean') {
          config[field.key] = form.querySelector(\`[name="\${field.key}"]\`).checked;
        } else if (field.type === 'number') {
          config[field.key] = parseFloat(formData.get(field.key)) || field.default;
        } else {
          config[field.key] = formData.get(field.key) || '';
        }
      });
      
      return config;
    }
    
    // Test integration
    async function testIntegration() {
      if (!currentProvider) return;
      
      const config = getFormData();
      const resultDiv = document.getElementById('testResult');
      
      resultDiv.classList.remove('hidden');
      resultDiv.innerHTML = \`
        <div class="flex items-center gap-2 text-blue-400">
          <i class="fas fa-spinner fa-spin"></i>
          <span>\${isRu ? 'Проверка подключения...' : 'Testing connection...'}</span>
        </div>
      \`;
      
      try {
        const response = await fetch('/api/integrations/test-connection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ providerId: currentProvider.id, config })
        });
        
        const data = await response.json();
        
        if (data.success) {
          resultDiv.innerHTML = \`
            <div class="flex items-center gap-2 text-green-400">
              <i class="fas fa-check-circle"></i>
              <span>\${data.message}</span>
            </div>
            \${data.details ? \`<pre class="mt-2 text-xs text-gray-400">\${JSON.stringify(data.details, null, 2)}</pre>\` : ''}
          \`;
        } else {
          resultDiv.innerHTML = \`
            <div class="flex items-center gap-2 text-red-400">
              <i class="fas fa-times-circle"></i>
              <span>\${data.message || data.error}</span>
            </div>
          \`;
        }
      } catch (error) {
        resultDiv.innerHTML = \`
          <div class="flex items-center gap-2 text-red-400">
            <i class="fas fa-times-circle"></i>
            <span>\${error.message}</span>
          </div>
        \`;
      }
    }
    
    // Save integration
    function saveIntegration() {
      if (!currentProvider) return;
      
      const config = getFormData();
      localStorage.setItem(\`era_integration_\${currentProvider.id}\`, JSON.stringify(config));
      
      // Show toast
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50';
      toast.innerHTML = \`<i class="fas fa-check-circle"></i> \${isRu ? 'Интеграция сохранена!' : 'Integration saved!'}\`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
      
      closeModal();
      loadProviders();
      loadActiveIntegrations();
    }
    
    // Load active integrations
    function loadActiveIntegrations() {
      const container = document.getElementById('activeIntegrations');
      const active = [];
      
      allProviders.forEach(provider => {
        const saved = localStorage.getItem(\`era_integration_\${provider.id}\`);
        if (saved) {
          active.push(provider);
        }
      });
      
      if (active.length === 0) {
        container.innerHTML = \`<span class="text-gray-500">\${isRu ? 'Нет настроенных интеграций' : 'No integrations configured'}</span>\`;
        return;
      }
      
      container.innerHTML = active.map(provider => \`
        <div class="bg-green-900/30 border border-green-500/30 px-4 py-2 rounded-lg flex items-center gap-2">
          <i class="fas fa-\${getProviderIcon(provider.id)} text-green-400"></i>
          <span>\${provider.name}</span>
          <button onclick="event.stopPropagation(); removeIntegration('\${provider.id}')" class="ml-2 text-gray-400 hover:text-red-400">
            <i class="fas fa-times"></i>
          </button>
        </div>
      \`).join('');
    }
    
    // Remove integration
    function removeIntegration(providerId) {
      if (confirm(isRu ? 'Удалить эту интеграцию?' : 'Remove this integration?')) {
        localStorage.removeItem(\`era_integration_\${providerId}\`);
        loadProviders();
        loadActiveIntegrations();
      }
    }
    
    // Populate quick test select
    function populateQuickTestSelect() {
      const select = document.getElementById('quickTestProvider');
      
      // Add configured integrations
      allProviders.forEach(provider => {
        const saved = localStorage.getItem(\`era_integration_\${provider.id}\`);
        if (saved) {
          const option = document.createElement('option');
          option.value = provider.id;
          option.textContent = provider.name;
          select.appendChild(option);
        }
      });
    }
    
    // Explore MCP
    async function exploreMCP(type) {
      const mcpConfig = JSON.parse(localStorage.getItem('era_integration_mcp') || '{}');
      const resultDiv = document.getElementById('mcpExplorerResult');
      
      if (!mcpConfig.serverUrl) {
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = \`
          <div class="text-yellow-400">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            \${isRu ? 'Сначала настройте MCP сервер' : 'Configure MCP server first'}
          </div>
        \`;
        return;
      }
      
      resultDiv.classList.remove('hidden');
      resultDiv.innerHTML = \`
        <div class="flex items-center gap-2 text-blue-400">
          <i class="fas fa-spinner fa-spin"></i>
          <span>\${isRu ? 'Загрузка...' : 'Loading...'}</span>
        </div>
      \`;
      
      try {
        const response = await fetch(\`/api/integrations/mcp/\${type}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mcpConfig)
        });
        
        const data = await response.json();
        
        if (data.error) {
          resultDiv.innerHTML = \`
            <div class="text-red-400">
              <i class="fas fa-times-circle mr-2"></i>
              \${data.error}
            </div>
          \`;
          return;
        }
        
        const items = data[type] || data.tools || data.resources || data.prompts || [];
        
        if (items.length === 0) {
          resultDiv.innerHTML = \`
            <div class="text-gray-400">
              \${isRu ? 'Ничего не найдено' : 'Nothing found'}
            </div>
          \`;
          return;
        }
        
        resultDiv.innerHTML = \`
          <div class="text-sm text-gray-400 mb-3">\${isRu ? 'Найдено' : 'Found'}: \${items.length}</div>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            \${items.map(item => \`
              <div class="bg-gray-700 rounded p-3">
                <div class="font-semibold">\${item.name || item.uri || 'Unknown'}</div>
                \${item.description ? \`<div class="text-sm text-gray-400">\${item.description}</div>\` : ''}
              </div>
            \`).join('')}
          </div>
        \`;
      } catch (error) {
        resultDiv.innerHTML = \`
          <div class="text-red-400">
            <i class="fas fa-times-circle mr-2"></i>
            \${error.message}
          </div>
        \`;
      }
    }
    
    // Run quick test
    async function runQuickTest() {
      const providerId = document.getElementById('quickTestProvider').value;
      const message = document.getElementById('quickTestMessage').value;
      const resultDiv = document.getElementById('quickTestResult');
      
      if (!providerId) {
        alert(isRu ? 'Выберите интеграцию' : 'Select an integration');
        return;
      }
      
      const config = JSON.parse(localStorage.getItem(\`era_integration_\${providerId}\`) || '{}');
      
      resultDiv.classList.remove('hidden');
      resultDiv.innerHTML = \`
        <div class="flex items-center gap-2 text-blue-400">
          <i class="fas fa-spinner fa-spin"></i>
          <span>\${isRu ? 'Выполнение запроса...' : 'Running request...'}</span>
        </div>
      \`;
      
      try {
        let endpoint = '';
        let body = {};
        
        switch (providerId) {
          case 'ollama':
            endpoint = '/api/integrations/ollama/chat';
            body = { ...config, messages: [{ role: 'user', content: message }] };
            break;
          case 'groq':
            endpoint = '/api/integrations/groq/chat';
            body = { ...config, messages: [{ role: 'user', content: message }] };
            break;
          case 'anthropic':
            endpoint = '/api/integrations/anthropic/chat';
            body = { ...config, messages: [{ role: 'user', content: message }] };
            break;
          case 'google':
            endpoint = '/api/integrations/google/chat';
            body = { ...config, messages: [{ role: 'user', content: message }] };
            break;
          case 'openai-compatible':
            endpoint = '/api/integrations/openai-compatible/chat';
            body = { ...config, messages: [{ role: 'user', content: message }] };
            break;
          default:
            resultDiv.innerHTML = \`
              <div class="text-yellow-400">
                \${isRu ? 'Быстрый тест недоступен для этой интеграции' : 'Quick test not available for this integration'}
              </div>
            \`;
            return;
        }
        
        const startTime = Date.now();
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        
        const latency = Date.now() - startTime;
        const data = await response.json();
        
        if (data.error) {
          resultDiv.innerHTML = \`
            <div class="text-red-400">
              <i class="fas fa-times-circle mr-2"></i>
              \${data.error}
            </div>
          \`;
          return;
        }
        
        // Extract response content based on provider
        let content = '';
        if (data.message?.content) content = data.message.content;
        else if (data.choices?.[0]?.message?.content) content = data.choices[0].message.content;
        else if (data.content?.[0]?.text) content = data.content[0].text;
        else if (data.candidates?.[0]?.content?.parts?.[0]?.text) content = data.candidates[0].content.parts[0].text;
        else content = JSON.stringify(data, null, 2);
        
        resultDiv.innerHTML = \`
          <div class="mb-2 flex items-center gap-4 text-sm text-gray-400">
            <span><i class="fas fa-clock mr-1"></i>\${latency}ms</span>
            <span class="text-green-400"><i class="fas fa-check-circle mr-1"></i>\${isRu ? 'Успешно' : 'Success'}</span>
          </div>
          <div class="bg-gray-900 rounded p-4 text-sm whitespace-pre-wrap">\${content}</div>
        \`;
      } catch (error) {
        resultDiv.innerHTML = \`
          <div class="text-red-400">
            <i class="fas fa-times-circle mr-2"></i>
            \${error.message}
          </div>
        \`;
      }
    }
  </script>
</body>
</html>
`
}
