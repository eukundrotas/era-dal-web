import { head, sidebar, footer } from '../components/layout'
import { Language, t, getSection } from '../i18n/translations'

export const aiConfigPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const sidebarT = getSection('sidebar', lang)
  const commonT = getSection('common', lang)
  
  return `
<!DOCTYPE html>
<html lang="${lang}">
${head(isRu ? 'Настройка AI провайдеров | ERA DAL' : 'AI Providers Configuration | ERA DAL', 
       isRu ? 'Настройте интеграцию с OpenRouter и выберите AI модели' : 'Configure OpenRouter integration and select AI models')}
<body class="bg-gray-900 text-white min-h-screen">
  <div class="flex">
    ${sidebar(lang)}
    
    <main class="flex-1 ml-56 p-8">
      <div class="max-w-6xl mx-auto">
        
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold gradient-text">${isRu ? 'Настройка AI провайдеров' : 'AI Providers Configuration'}</h1>
            <p class="text-gray-400 mt-2">${isRu ? 'Интеграция с OpenRouter для доступа к 400+ моделям' : 'OpenRouter integration for access to 400+ models'}</p>
          </div>
          <a href="https://openrouter.ai/keys" target="_blank" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <i class="fas fa-key"></i>
            ${isRu ? 'Получить API ключ' : 'Get API Key'}
          </a>
        </div>

        <!-- API Key Configuration -->
        <div class="glass-card rounded-xl p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-shield-alt text-green-400"></i>
            ${isRu ? 'API Ключ OpenRouter' : 'OpenRouter API Key'}
          </h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">${isRu ? 'Ваш API ключ' : 'Your API Key'}</label>
              <div class="flex gap-2">
                <input type="password" id="apiKey" placeholder="sk-or-v1-..." 
                       class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none">
                <button onclick="toggleKeyVisibility()" class="bg-gray-700 hover:bg-gray-600 px-4 rounded-lg transition-colors">
                  <i class="fas fa-eye" id="eyeIcon"></i>
                </button>
                <button onclick="testConnection()" class="bg-green-600 hover:bg-green-500 px-6 rounded-lg transition-colors flex items-center gap-2">
                  <i class="fas fa-plug"></i>
                  ${isRu ? 'Тест' : 'Test'}
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-2">
                ${isRu ? 'Ключ хранится только в браузере (localStorage)' : 'Key is stored only in browser (localStorage)'}
              </p>
            </div>
            
            <div id="connectionStatus" class="hidden">
              <!-- Status will be shown here -->
            </div>
            
            <!-- Credits Info -->
            <div id="creditsInfo" class="hidden bg-gray-800 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-400">${isRu ? 'Остаток кредитов' : 'Credits Balance'}</span>
                <span id="creditsBalance" class="text-xl font-bold text-green-400">-</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Model Presets -->
        <div class="glass-card rounded-xl p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-magic text-purple-400"></i>
            ${isRu ? 'Готовые наборы моделей' : 'Model Presets'}
          </h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" id="presetsGrid">
            <!-- Presets will be loaded here -->
          </div>
        </div>

        <!-- Model Selection -->
        <div class="glass-card rounded-xl p-6 mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold flex items-center gap-2">
              <i class="fas fa-robot text-blue-400"></i>
              ${isRu ? 'Выбор моделей' : 'Model Selection'}
            </h2>
            <div class="flex gap-2">
              <button onclick="filterModels('all')" class="model-filter-btn active px-4 py-2 rounded-lg bg-gray-700" data-filter="all">
                ${isRu ? 'Все' : 'All'}
              </button>
              <button onclick="filterModels('free')" class="model-filter-btn px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700" data-filter="free">
                <i class="fas fa-gift text-green-400 mr-1"></i>
                ${isRu ? 'Бесплатные' : 'Free'}
              </button>
              <button onclick="filterModels('paid')" class="model-filter-btn px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700" data-filter="paid">
                <i class="fas fa-coins text-yellow-400 mr-1"></i>
                ${isRu ? 'Платные' : 'Paid'}
              </button>
            </div>
          </div>
          
          <!-- Provider Filter -->
          <div class="flex flex-wrap gap-2 mb-4">
            <select id="providerFilter" onchange="applyFilters()" class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
              <option value="">${isRu ? 'Все провайдеры' : 'All Providers'}</option>
            </select>
            <select id="typeFilter" onchange="applyFilters()" class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
              <option value="">${isRu ? 'Все типы' : 'All Types'}</option>
            </select>
            <input type="text" id="modelSearch" placeholder="${isRu ? 'Поиск моделей...' : 'Search models...'}"
                   onkeyup="applyFilters()"
                   class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 flex-1 min-w-[200px]">
          </div>

          <!-- Selected Models -->
          <div class="bg-gray-800 rounded-lg p-4 mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-400">${isRu ? 'Выбрано моделей' : 'Selected Models'}: <span id="selectedCount" class="text-white font-bold">0</span></span>
              <button onclick="clearSelection()" class="text-red-400 hover:text-red-300 text-sm">
                <i class="fas fa-times mr-1"></i>${isRu ? 'Очистить' : 'Clear'}
              </button>
            </div>
            <div id="selectedModels" class="flex flex-wrap gap-2">
              <span class="text-gray-500 text-sm">${isRu ? 'Модели не выбраны' : 'No models selected'}</span>
            </div>
          </div>

          <!-- Models Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto" id="modelsGrid">
            <!-- Models will be loaded here -->
          </div>
        </div>

        <!-- Quick Test -->
        <div class="glass-card rounded-xl p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-flask text-yellow-400"></i>
            ${isRu ? 'Быстрый тест' : 'Quick Test'}
          </h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">${isRu ? 'Тестовый запрос' : 'Test Query'}</label>
              <textarea id="testQuery" rows="3" 
                        placeholder="${isRu ? 'Введите вопрос для теста...' : 'Enter a question to test...'}"
                        class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none resize-none">What is the capital of France?</textarea>
            </div>
            
            <div class="flex gap-2">
              <button onclick="runSingleTest()" class="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
                <i class="fas fa-play"></i>
                ${isRu ? 'Тест одной модели' : 'Single Model Test'}
              </button>
              <button onclick="runEnsembleTest()" class="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
                <i class="fas fa-layer-group"></i>
                ${isRu ? 'Тест ансамбля' : 'Ensemble Test'}
              </button>
            </div>
            
            <div id="testResults" class="hidden">
              <!-- Test results will appear here -->
            </div>
          </div>
        </div>

        <!-- Save Configuration -->
        <div class="flex justify-end gap-4">
          <button onclick="resetConfig()" class="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition-colors">
            <i class="fas fa-undo mr-2"></i>
            ${isRu ? 'Сбросить' : 'Reset'}
          </button>
          <button onclick="saveConfig()" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-3 rounded-lg transition-all font-semibold">
            <i class="fas fa-save mr-2"></i>
            ${isRu ? 'Сохранить конфигурацию' : 'Save Configuration'}
          </button>
        </div>

      </div>
    </main>
  </div>

  ${footer(lang)}

  <script>
    const LANG = '${lang}';
    const isRu = LANG === 'ru';
    
    let allModels = [];
    let selectedModels = new Set();
    let currentFilter = 'all';
    
    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
      loadSavedConfig();
      loadModels();
      loadPresets();
    });
    
    // Load saved configuration
    function loadSavedConfig() {
      const savedKey = localStorage.getItem('openrouter_api_key');
      const savedModels = localStorage.getItem('era_selected_models');
      
      if (savedKey) {
        document.getElementById('apiKey').value = savedKey;
      }
      
      if (savedModels) {
        try {
          selectedModels = new Set(JSON.parse(savedModels));
        } catch (e) {}
      }
    }
    
    // Toggle API key visibility
    function toggleKeyVisibility() {
      const input = document.getElementById('apiKey');
      const icon = document.getElementById('eyeIcon');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
      } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
      }
    }
    
    // Test OpenRouter connection
    async function testConnection() {
      const apiKey = document.getElementById('apiKey').value.trim();
      const statusDiv = document.getElementById('connectionStatus');
      
      if (!apiKey) {
        showStatus('error', isRu ? 'Введите API ключ' : 'Enter API key');
        return;
      }
      
      showStatus('loading', isRu ? 'Проверка соединения...' : 'Testing connection...');
      
      try {
        const response = await fetch('/api/openrouter/test-connection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey })
        });
        
        const data = await response.json();
        
        if (data.success) {
          showStatus('success', isRu 
            ? \`Подключено! Доступно \${data.modelsAvailable} моделей\`
            : \`Connected! \${data.modelsAvailable} models available\`);
          
          // Save key
          localStorage.setItem('openrouter_api_key', apiKey);
          
          // Get credits
          getCredits(apiKey);
        } else {
          showStatus('error', data.error || (isRu ? 'Ошибка подключения' : 'Connection failed'));
        }
      } catch (error) {
        showStatus('error', error.message);
      }
    }
    
    // Get credits balance
    async function getCredits(apiKey) {
      try {
        const response = await fetch('/api/openrouter/credits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey })
        });
        
        const data = await response.json();
        
        if (data.data) {
          document.getElementById('creditsInfo').classList.remove('hidden');
          document.getElementById('creditsBalance').textContent = '$' + (data.data.limit - data.data.usage).toFixed(2);
        }
      } catch (error) {
        console.error('Failed to get credits:', error);
      }
    }
    
    // Show connection status
    function showStatus(type, message) {
      const statusDiv = document.getElementById('connectionStatus');
      statusDiv.classList.remove('hidden');
      
      const icons = {
        success: 'check-circle text-green-400',
        error: 'times-circle text-red-400',
        loading: 'spinner fa-spin text-blue-400'
      };
      
      const bgColors = {
        success: 'bg-green-900/30 border-green-500/30',
        error: 'bg-red-900/30 border-red-500/30',
        loading: 'bg-blue-900/30 border-blue-500/30'
      };
      
      statusDiv.innerHTML = \`
        <div class="flex items-center gap-3 p-4 rounded-lg border \${bgColors[type]}">
          <i class="fas fa-\${icons[type]}"></i>
          <span>\${message}</span>
        </div>
      \`;
    }
    
    // Load models from API
    async function loadModels() {
      try {
        const response = await fetch('/api/openrouter/models');
        const data = await response.json();
        
        allModels = data.models;
        
        // Populate provider filter
        const providerSelect = document.getElementById('providerFilter');
        data.providers.forEach(provider => {
          providerSelect.innerHTML += \`<option value="\${provider}">\${provider}</option>\`;
        });
        
        // Populate type filter
        const typeSelect = document.getElementById('typeFilter');
        data.types.forEach(type => {
          typeSelect.innerHTML += \`<option value="\${type}">\${type}</option>\`;
        });
        
        renderModels(allModels);
      } catch (error) {
        console.error('Failed to load models:', error);
      }
    }
    
    // Load presets
    async function loadPresets() {
      try {
        const response = await fetch('/api/openrouter/presets');
        const data = await response.json();
        
        const presetsGrid = document.getElementById('presetsGrid');
        presetsGrid.innerHTML = data.presets.map(preset => \`
          <div class="bg-gray-800 hover:bg-gray-750 rounded-lg p-4 cursor-pointer transition-colors border border-transparent hover:border-blue-500"
               onclick="applyPreset('\${preset.id}', \${JSON.stringify(preset.models).replace(/"/g, '&quot;')})">
            <h3 class="font-semibold mb-1">\${preset.name}</h3>
            <p class="text-sm text-gray-400 mb-2">\${preset.description}</p>
            <div class="flex items-center gap-2 text-xs text-gray-500">
              <i class="fas fa-robot"></i>
              <span>\${preset.models.length} \${isRu ? 'моделей' : 'models'}</span>
            </div>
          </div>
        \`).join('');
      } catch (error) {
        console.error('Failed to load presets:', error);
      }
    }
    
    // Apply preset
    function applyPreset(presetId, models) {
      selectedModels = new Set(models);
      updateSelectedDisplay();
      renderModels(allModels);
    }
    
    // Filter models
    function filterModels(filter) {
      currentFilter = filter;
      
      // Update button styles
      document.querySelectorAll('.model-filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-gray-700');
        btn.classList.add('bg-gray-800');
      });
      document.querySelector(\`[data-filter="\${filter}"]\`).classList.add('active', 'bg-gray-700');
      document.querySelector(\`[data-filter="\${filter}"]\`).classList.remove('bg-gray-800');
      
      applyFilters();
    }
    
    // Apply all filters
    function applyFilters() {
      const provider = document.getElementById('providerFilter').value;
      const type = document.getElementById('typeFilter').value;
      const search = document.getElementById('modelSearch').value.toLowerCase();
      
      let filtered = allModels;
      
      // Filter by free/paid
      if (currentFilter === 'free') {
        filtered = filtered.filter(m => m.id.includes(':free'));
      } else if (currentFilter === 'paid') {
        filtered = filtered.filter(m => !m.id.includes(':free'));
      }
      
      // Filter by provider
      if (provider) {
        filtered = filtered.filter(m => m.provider === provider);
      }
      
      // Filter by type
      if (type) {
        filtered = filtered.filter(m => m.type === type);
      }
      
      // Filter by search
      if (search) {
        filtered = filtered.filter(m => 
          m.name.toLowerCase().includes(search) || 
          m.id.toLowerCase().includes(search) ||
          m.provider.toLowerCase().includes(search)
        );
      }
      
      renderModels(filtered);
    }
    
    // Render models grid
    function renderModels(models) {
      const grid = document.getElementById('modelsGrid');
      
      grid.innerHTML = models.map(model => {
        const isFree = model.id.includes(':free');
        const isSelected = selectedModels.has(model.id);
        
        return \`
          <div class="model-card p-4 rounded-lg cursor-pointer transition-all border-2 \${isSelected ? 'bg-blue-900/30 border-blue-500' : 'bg-gray-800 border-transparent hover:border-gray-600'}"
               onclick="toggleModel('\${model.id}')">
            <div class="flex items-start justify-between mb-2">
              <div>
                <span class="font-semibold">\${model.name}</span>
                <span class="ml-2 text-xs px-2 py-0.5 rounded \${isFree ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}">
                  \${isFree ? (isRu ? 'Бесплатно' : 'Free') : model.price || 'Paid'}
                </span>
              </div>
              <div class="w-5 h-5 rounded border-2 flex items-center justify-center \${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-600'}">
                \${isSelected ? '<i class="fas fa-check text-white text-xs"></i>' : ''}
              </div>
            </div>
            <div class="text-sm text-gray-400">\${model.provider}</div>
            <div class="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span><i class="fas fa-memory mr-1"></i>\${(model.context / 1000).toFixed(0)}K</span>
              <span class="px-2 py-0.5 bg-gray-700 rounded">\${model.type}</span>
            </div>
          </div>
        \`;
      }).join('');
    }
    
    // Toggle model selection
    function toggleModel(modelId) {
      if (selectedModels.has(modelId)) {
        selectedModels.delete(modelId);
      } else {
        selectedModels.add(modelId);
      }
      
      updateSelectedDisplay();
      renderModels(allModels.filter(m => {
        // Reapply current filters
        const provider = document.getElementById('providerFilter').value;
        const type = document.getElementById('typeFilter').value;
        const search = document.getElementById('modelSearch').value.toLowerCase();
        
        let match = true;
        if (currentFilter === 'free') match = match && m.id.includes(':free');
        if (currentFilter === 'paid') match = match && !m.id.includes(':free');
        if (provider) match = match && m.provider === provider;
        if (type) match = match && m.type === type;
        if (search) match = match && (m.name.toLowerCase().includes(search) || m.id.toLowerCase().includes(search));
        
        return match;
      }));
    }
    
    // Update selected models display
    function updateSelectedDisplay() {
      const container = document.getElementById('selectedModels');
      const count = document.getElementById('selectedCount');
      
      count.textContent = selectedModels.size;
      
      if (selectedModels.size === 0) {
        container.innerHTML = \`<span class="text-gray-500 text-sm">\${isRu ? 'Модели не выбраны' : 'No models selected'}</span>\`;
        return;
      }
      
      container.innerHTML = Array.from(selectedModels).map(modelId => {
        const model = allModels.find(m => m.id === modelId);
        const name = model?.name || modelId.split('/').pop();
        
        return \`
          <span class="bg-blue-900/50 border border-blue-500/50 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            \${name}
            <button onclick="event.stopPropagation(); toggleModel('\${modelId}')" class="hover:text-red-400">
              <i class="fas fa-times text-xs"></i>
            </button>
          </span>
        \`;
      }).join('');
    }
    
    // Clear selection
    function clearSelection() {
      selectedModels.clear();
      updateSelectedDisplay();
      applyFilters();
    }
    
    // Run single model test
    async function runSingleTest() {
      const apiKey = localStorage.getItem('openrouter_api_key');
      const query = document.getElementById('testQuery').value.trim();
      
      if (!apiKey) {
        alert(isRu ? 'Сначала настройте API ключ' : 'Configure API key first');
        return;
      }
      
      if (selectedModels.size === 0) {
        alert(isRu ? 'Выберите хотя бы одну модель' : 'Select at least one model');
        return;
      }
      
      const model = Array.from(selectedModels)[0];
      showTestResults('loading', isRu ? 'Выполнение запроса...' : 'Running query...');
      
      try {
        const response = await fetch('/api/openrouter/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiKey,
            model,
            messages: [{ role: 'user', content: query }]
          })
        });
        
        const data = await response.json();
        
        if (data.error) {
          showTestResults('error', data.error);
        } else {
          const content = data.choices?.[0]?.message?.content || 'No response';
          showTestResults('success', \`
            <div class="mb-2"><strong>\${model}</strong></div>
            <div class="bg-gray-900 rounded p-4 text-sm">\${content}</div>
            <div class="text-xs text-gray-500 mt-2">
              Tokens: \${data.usage?.total_tokens || 'N/A'}
            </div>
          \`);
        }
      } catch (error) {
        showTestResults('error', error.message);
      }
    }
    
    // Run ensemble test
    async function runEnsembleTest() {
      const apiKey = localStorage.getItem('openrouter_api_key');
      const query = document.getElementById('testQuery').value.trim();
      
      if (!apiKey) {
        alert(isRu ? 'Сначала настройте API ключ' : 'Configure API key first');
        return;
      }
      
      if (selectedModels.size < 2) {
        alert(isRu ? 'Выберите минимум 2 модели для ансамбля' : 'Select at least 2 models for ensemble');
        return;
      }
      
      showTestResults('loading', isRu ? 'Выполнение ансамблевого запроса...' : 'Running ensemble query...');
      
      try {
        const response = await fetch('/api/openrouter/ensemble', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiKey,
            models: Array.from(selectedModels),
            query
          })
        });
        
        const data = await response.json();
        
        if (data.error) {
          showTestResults('error', data.error);
        } else {
          let html = \`
            <div class="mb-4 flex items-center gap-4">
              <span class="text-green-400"><i class="fas fa-check-circle mr-1"></i>\${data.successful} \${isRu ? 'успешно' : 'successful'}</span>
              \${data.failed > 0 ? \`<span class="text-red-400"><i class="fas fa-times-circle mr-1"></i>\${data.failed} \${isRu ? 'ошибок' : 'failed'}</span>\` : ''}
              <span class="text-gray-500">\${data.totalLatency}ms</span>
            </div>
          \`;
          
          data.results.forEach(result => {
            html += \`
              <div class="mb-4 bg-gray-900 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <strong>\${result.model}</strong>
                  <span class="text-xs text-gray-500">\${result.latency}ms</span>
                </div>
                <div class="text-sm">\${result.response.substring(0, 500)}\${result.response.length > 500 ? '...' : ''}</div>
              </div>
            \`;
          });
          
          if (data.errors?.length > 0) {
            html += \`<div class="text-red-400 text-sm mt-4">\`;
            data.errors.forEach(err => {
              html += \`<div>\${err.model}: \${err.error}</div>\`;
            });
            html += \`</div>\`;
          }
          
          showTestResults('success', html);
        }
      } catch (error) {
        showTestResults('error', error.message);
      }
    }
    
    // Show test results
    function showTestResults(type, content) {
      const resultsDiv = document.getElementById('testResults');
      resultsDiv.classList.remove('hidden');
      
      if (type === 'loading') {
        resultsDiv.innerHTML = \`
          <div class="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
            <i class="fas fa-spinner fa-spin text-blue-400"></i>
            <span>\${content}</span>
          </div>
        \`;
      } else if (type === 'error') {
        resultsDiv.innerHTML = \`
          <div class="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
            <i class="fas fa-times-circle text-red-400 mr-2"></i>
            \${content}
          </div>
        \`;
      } else {
        resultsDiv.innerHTML = \`
          <div class="bg-gray-800 rounded-lg p-4">
            \${content}
          </div>
        \`;
      }
    }
    
    // Save configuration
    function saveConfig() {
      const apiKey = document.getElementById('apiKey').value.trim();
      
      if (apiKey) {
        localStorage.setItem('openrouter_api_key', apiKey);
      }
      
      localStorage.setItem('era_selected_models', JSON.stringify(Array.from(selectedModels)));
      
      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50';
      toast.innerHTML = \`<i class="fas fa-check-circle"></i> \${isRu ? 'Конфигурация сохранена!' : 'Configuration saved!'}\`;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.remove(), 3000);
    }
    
    // Reset configuration
    function resetConfig() {
      if (confirm(isRu ? 'Сбросить все настройки?' : 'Reset all settings?')) {
        localStorage.removeItem('openrouter_api_key');
        localStorage.removeItem('era_selected_models');
        document.getElementById('apiKey').value = '';
        selectedModels.clear();
        updateSelectedDisplay();
        applyFilters();
        
        document.getElementById('connectionStatus').classList.add('hidden');
        document.getElementById('creditsInfo').classList.add('hidden');
      }
    }
  </script>
</body>
</html>
`
}
