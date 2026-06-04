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

export const settingsPage = (lang: Language = 'en') => `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t(lang, 'nav.settings'), lang === 'ru' ? 'Настройте параметры ERA DAL.' : 'Configure your ERA DAL preferences, API settings, and notifications.', lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar(lang, 'settings')}
  
  <main class="ml-56 pt-4 min-h-screen">
    <div class="p-6 max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold">Settings</h1>
        <p class="text-gray-400">Configure your ERA DAL preferences</p>
      </div>

      <!-- API Configuration -->
      <div class="glass rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold mb-6">
          <i class="fas fa-plug text-blue-500 mr-2"></i>
          API Configuration
        </h3>
        
        <div class="space-y-6">
          <div>
            <label class="block text-gray-400 text-sm mb-2">OpenRouter API Key</label>
            <div class="flex items-center space-x-2">
              <input type="password" id="api-key" value="sk-or-v1-****************************" 
                class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
              <button onclick="toggleApiKey()" class="glass hover:bg-white/10 px-4 py-3 rounded-lg transition">
                <i class="fas fa-eye" id="eye-icon"></i>
              </button>
              <button onclick="testApiKey()" class="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg transition">
                <i class="fas fa-check mr-2"></i> Test
              </button>
            </div>
            <p class="text-gray-500 text-xs mt-2">Get your API key from <a href="https://openrouter.ai" target="_blank" class="text-blue-400 hover:underline">openrouter.ai</a></p>
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2">API Base URL</label>
            <input type="text" value="https://openrouter.ai/api/v1" 
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-400 text-sm mb-2">Solver Timeout (seconds)</label>
              <input type="number" value="30" min="5" max="120"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-2">Arbiter Timeout (seconds)</label>
              <input type="number" value="60" min="10" max="180"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
            </div>
          </div>
        </div>
      </div>

      <!-- Default Query Settings -->
      <div class="glass rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold mb-6">
          <i class="fas fa-sliders-h text-purple-500 mr-2"></i>
          Default Query Settings
        </h3>
        
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-400 text-sm mb-2">Default Domain</label>
              <select class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                <option value="science" selected>Science</option>
                <option value="math">Mathematics</option>
                <option value="med">Medical</option>
                <option value="econ">Economics</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-2">Default Mode</label>
              <select class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                <option value="consensus_top2" selected>Consensus Top-2</option>
                <option value="consensus_top3">Consensus Top-3</option>
                <option value="hard_select">Hard Select</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-gray-400 text-sm mb-2">Default Repeats</label>
              <input type="number" value="3" min="1" max="10"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-2">Consensus Top-K</label>
              <input type="number" value="2" min="1" max="5"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-2">Epsilon</label>
              <input type="number" value="0.05" min="0" max="0.2" step="0.01"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition">
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-white">Enable Rebuttal by Default</span>
                <p class="text-gray-500 text-sm">Models will critique each other's answers</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <span class="text-white">Hard Only Selection</span>
                <p class="text-gray-500 text-sm">Only use hard-select mode for answers</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Model Preferences -->
      <div class="glass rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold mb-6">
          <i class="fas fa-robot text-cyan-500 mr-2"></i>
          Model Preferences
        </h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center space-x-3">
              <input type="checkbox" checked class="w-5 h-5 accent-blue-500">
              <div>
                <span class="text-white">GPT-4o</span>
                <p class="text-gray-500 text-xs">OpenAI's latest model</p>
              </div>
            </div>
            <span class="text-gray-400 text-sm">$0.01/1K tokens</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center space-x-3">
              <input type="checkbox" checked class="w-5 h-5 accent-blue-500">
              <div>
                <span class="text-white">Claude 3.5 Sonnet</span>
                <p class="text-gray-500 text-xs">Anthropic's flagship model</p>
              </div>
            </div>
            <span class="text-gray-400 text-sm">$0.003/1K tokens</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center space-x-3">
              <input type="checkbox" checked class="w-5 h-5 accent-blue-500">
              <div>
                <span class="text-white">Llama 3.1 70B</span>
                <p class="text-gray-500 text-xs">Meta's open-source model</p>
              </div>
            </div>
            <span class="text-gray-400 text-sm">$0.0009/1K tokens</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center space-x-3">
              <input type="checkbox" checked class="w-5 h-5 accent-blue-500">
              <div>
                <span class="text-white">Mistral Large</span>
                <p class="text-gray-500 text-xs">Mistral AI's largest model</p>
              </div>
            </div>
            <span class="text-gray-400 text-sm">$0.008/1K tokens</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div class="flex items-center space-x-3">
              <input type="checkbox" checked class="w-5 h-5 accent-blue-500">
              <div>
                <span class="text-white">Gemini 1.5 Pro</span>
                <p class="text-gray-500 text-xs">Google's multimodal model</p>
              </div>
            </div>
            <span class="text-gray-400 text-sm">$0.0035/1K tokens</span>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="glass rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold mb-6">
          <i class="fas fa-bell text-yellow-500 mr-2"></i>
          Notifications
        </h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-white">Email Notifications</span>
              <p class="text-gray-500 text-sm">Receive updates about your queries</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <span class="text-white">Usage Alerts</span>
              <p class="text-gray-500 text-sm">Get notified when approaching limits</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <span class="text-white">Weekly Reports</span>
              <p class="text-gray-500 text-sm">Receive weekly usage summaries</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <span class="text-white">Marketing Emails</span>
              <p class="text-gray-500 text-sm">News about features and updates</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Appearance -->
      <div class="glass rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold mb-6">
          <i class="fas fa-palette text-pink-500 mr-2"></i>
          Appearance
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-gray-400 text-sm mb-2">Theme</label>
            <div class="flex items-center space-x-4">
              <button class="flex-1 bg-gray-800 border-2 border-blue-500 rounded-lg p-4 text-center">
                <i class="fas fa-moon text-blue-400 text-xl mb-2"></i>
                <p class="text-white">Dark</p>
              </button>
              <button class="flex-1 bg-gray-800 border-2 border-gray-700 rounded-lg p-4 text-center opacity-50 cursor-not-allowed">
                <i class="fas fa-sun text-yellow-400 text-xl mb-2"></i>
                <p class="text-white">Light</p>
                <p class="text-gray-500 text-xs">Coming soon</p>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2">Language</label>
            <select class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
              <option value="en" selected>English</option>
              <option value="ru">Russian</option>
              <option value="lt">Lithuanian</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex items-center justify-end space-x-4">
        <button class="glass hover:bg-white/10 px-6 py-3 rounded-lg transition">
          Reset to Defaults
        </button>
        <button onclick="saveSettings()" class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition">
          <i class="fas fa-save mr-2"></i> Save Settings
        </button>
      </div>
    </div>
  </main>

  <script>
    let apiKeyVisible = false;

    function toggleApiKey() {
      apiKeyVisible = !apiKeyVisible;
      const input = document.getElementById('api-key');
      const icon = document.getElementById('eye-icon');
      
      if (apiKeyVisible) {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
      } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
      }
    }

    function testApiKey() {
      alert('API key test will be implemented with backend integration.');
    }

    function saveSettings() {
      alert('Settings saved successfully!');
    }
  </script>
</body>
</html>
`
