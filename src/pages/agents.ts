import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const agentsPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'Исследовательские агенты' : 'Research Agents'
  const subtitle = isRu
    ? 'Управление AI-агентами для научных исследований: роли, инструменты, инструкции'
    : 'Manage AI agents for scientific research: roles, tools, and instructions'

  // Built-in role catalog — always shown as reference
  const SHOWCASE = [
    // ─── Scientific & experimental ───
    { icon: 'fa-flask',         gradFrom: 'from-rose-600',    gradTo: 'to-rose-800',    role: 'research_scientist', group: 'science',
      nameEn: 'Research Scientist',     nameRu: 'Учёный-исследователь',
      roleEn: 'Scientific Research',    roleRu: 'Научные исследования',
      descEn: 'Forms hypotheses, designs methodology, reasons via the scientific method.',
      descRu: 'Формирует гипотезы, проектирует методологию, рассуждает научным методом.',
      tools: ['Web Search', 'First Principles', 'Critic LLM'] },
    { icon: 'fa-chart-area',    gradFrom: 'from-fuchsia-600', gradTo: 'to-fuchsia-800', role: 'data_scientist', group: 'science',
      nameEn: 'Data Scientist',         nameRu: 'Дата-сайентист',
      roleEn: 'Statistics & Modeling',  roleRu: 'Статистика и моделирование',
      descEn: 'Runs statistical analysis, quantifies uncertainty, builds models.',
      descRu: 'Проводит статанализ, оценивает неопределённость, строит модели.',
      tools: ['Code Gen', 'Sheets', 'Calculator'] },
    { icon: 'fa-vials',         gradFrom: 'from-pink-600',    gradTo: 'to-rose-700',    role: 'experiment_designer', group: 'science',
      nameEn: 'Experiment Designer',    nameRu: 'Методолог экспериментов',
      roleEn: 'Experimental Design',    roleRu: 'Дизайн экспериментов',
      descEn: 'Designs A/B tests and controlled experiments: groups, power, metrics.',
      descRu: 'Проектирует A/B-тесты и контролируемые эксперименты: группы, мощность, метрики.',
      tools: ['Calculator', 'Critic LLM', 'Sheets'] },
    { icon: 'fa-microscope',    gradFrom: 'from-red-600',     gradTo: 'to-rose-800',    role: 'peer_reviewer', group: 'science',
      nameEn: 'Peer Reviewer',          nameRu: 'Научный рецензент',
      roleEn: 'Review & Validation',    roleRu: 'Рецензия и валидация',
      descEn: 'Critically evaluates methodology, statistics, validity, and bias.',
      descRu: 'Критически оценивает методологию, статистику, валидность и предвзятость.',
      tools: ['Critic LLM', 'RAG Docs', 'Web Check'] },
    { icon: 'fa-book-open',     gradFrom: 'from-orange-600',  gradTo: 'to-rose-700',    role: 'literature_researcher', group: 'science',
      nameEn: 'Literature Researcher',  nameRu: 'Литературный обзор',
      roleEn: 'Systematic Review',      roleRu: 'Систематический обзор',
      descEn: 'Searches, screens, and synthesises prior work; finds gaps and cites sources.',
      descRu: 'Ищет, отбирает и синтезирует работы; находит пробелы и цитирует источники.',
      tools: ['Web Search', 'RAG Docs', 'Summarizer'] },

    // ─── AI & LLM engineering ───
    { icon: 'fa-brain',         gradFrom: 'from-indigo-600',  gradTo: 'to-violet-800',  role: 'ml_engineer', group: 'ai_eng',
      nameEn: 'ML Engineer',            nameRu: 'ML-инженер',
      roleEn: 'Model Training',         roleRu: 'Обучение моделей',
      descEn: 'Designs training pipelines, tunes models, defines evaluation metrics.',
      descRu: 'Проектирует пайплайны обучения, тюнит модели, задаёт метрики оценки.',
      tools: ['Code Gen', 'MCP Tools', 'Calculator'] },
    { icon: 'fa-terminal',      gradFrom: 'from-violet-600',  gradTo: 'to-purple-800',  role: 'prompt_engineer', group: 'ai_eng',
      nameEn: 'Prompt Engineer',        nameRu: 'Промпт-инженер',
      roleEn: 'Prompt Design',          roleRu: 'Дизайн промптов',
      descEn: 'Crafts, tests, and optimises prompts; defines eval criteria and edge cases.',
      descRu: 'Создаёт, тестирует и оптимизирует промпты; задаёт критерии и крайние случаи.',
      tools: ['Text Gen', 'Critic LLM', 'RAG Docs'] },
    { icon: 'fa-robot',         gradFrom: 'from-purple-600',  gradTo: 'to-indigo-800',  role: 'llm_engineer', group: 'ai_eng',
      nameEn: 'LLM Engineer',           nameRu: 'LLM-инженер',
      roleEn: 'RAG & Fine-tuning',      roleRu: 'RAG и дообучение',
      descEn: 'Builds RAG pipelines, fine-tuning, and LLM evaluations; mitigates hallucination.',
      descRu: 'Строит RAG-пайплайны, дообучение и оценку LLM; снижает галлюцинации.',
      tools: ['Code Gen', 'RAG Docs', 'MCP Tools'] },
    { icon: 'fa-sitemap',       gradFrom: 'from-blue-600',    gradTo: 'to-indigo-800',  role: 'ai_architect', group: 'ai_eng',
      nameEn: 'AI Architect',           nameRu: 'AI-архитектор',
      roleEn: 'System Architecture',    roleRu: 'Архитектура систем',
      descEn: 'Designs end-to-end AI systems: data flow, serving, scalability, safety.',
      descRu: 'Проектирует AI-системы под ключ: потоки данных, инференс, масштаб, безопасность.',
      tools: ['Thinking Modes', 'Code Gen', 'Web Search'] },
    { icon: 'fa-server',        gradFrom: 'from-cyan-600',    gradTo: 'to-blue-800',    role: 'mlops_engineer', group: 'ai_eng',
      nameEn: 'MLOps Engineer',         nameRu: 'MLOps-инженер',
      roleEn: 'Deployment & Monitoring',roleRu: 'Деплой и мониторинг',
      descEn: 'Handles deployment, CI/CD, monitoring, drift, versioning, and reliability.',
      descRu: 'Отвечает за деплой, CI/CD, мониторинг, дрейф, версионирование и надёжность.',
      tools: ['Code Gen', 'MCP Tools', 'API'] },
  ]

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, subtitle, lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('agents', lang)}

  <main class="ml-56 pt-4 min-h-screen">
    <div class="p-6">

      <!-- Header -->
      <div class="mb-6 flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
              <i class="fas fa-users text-white text-sm"></i>
            </div>
            <h1 class="text-2xl font-bold">${title}</h1>
          </div>
          <p class="text-gray-400 ml-12">${subtitle}</p>
        </div>
        <div class="flex items-center gap-3">
          <div id="agent-stats" class="flex items-center gap-4 text-sm text-gray-400 glass rounded-lg px-4 py-2">
            <span><span class="text-green-400 font-bold" id="stat-ready">—</span> ${isRu ? 'готовы' : 'ready'}</span>
            <span class="text-gray-700">|</span>
            <span><span class="text-gray-300 font-bold">${SHOWCASE.length}</span> ${isRu ? 'ролей' : 'roles'}</span>
          </div>
          <button onclick="showCreateModal()"
            class="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <i class="fas fa-plus"></i>
            ${isRu ? 'Создать агента' : 'Create agent'}
          </button>
        </div>
      </div>

      <!-- Filter bar -->
      <div class="flex items-center gap-3 mb-5">
        <input id="agent-search" type="text" placeholder="${isRu ? 'Поиск агента...' : 'Search agent...'}"
          oninput="filterAgents()"
          class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 w-64">
        <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input type="checkbox" id="show-custom-only" onchange="filterAgents()" class="rounded accent-violet-500">
          ${isRu ? 'Только кастомные' : 'Custom only'}
        </label>
      </div>

      <!-- Custom agents section (populated from API) -->
      <div id="custom-section" style="display:none;" class="mb-8">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <i class="fas fa-user-cog text-violet-400"></i>
          ${isRu ? 'Ваши агенты' : 'Your agents'}
        </h2>
        <div id="custom-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"></div>
      </div>

      <!-- Built-in showcase -->
      ${(() => {
        const card = (a: any) => `
            <div class="agent-card glass rounded-xl p-5 hover:border-gray-600 transition-all group"
                 data-name="${(isRu ? a.nameRu : a.nameEn).toLowerCase()}"
                 data-role="${a.role}"
                 data-custom="false">
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-xl bg-gradient-to-br ${a.gradFrom} ${a.gradTo} flex items-center justify-center shadow-lg">
                    <i class="fas ${a.icon} text-white text-base"></i>
                  </div>
                  <div>
                    <p class="font-semibold text-sm">${isRu ? a.nameRu : a.nameEn}</p>
                    <p class="text-xs text-gray-500">${isRu ? a.roleRu : a.roleEn}</p>
                  </div>
                </div>
                <span class="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">${isRu ? 'встроен' : 'built-in'}</span>
              </div>
              <p class="text-xs text-gray-400 mb-3 leading-relaxed">${isRu ? a.descRu : a.descEn}</p>
              <div class="flex flex-wrap gap-1.5">
                ${a.tools.map((t: string) => `<span class="text-xs px-2 py-0.5 rounded border border-gray-700 text-gray-400">${t}</span>`).join('')}
              </div>
              <div class="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="customizeRole('${a.role}', '${(isRu ? a.nameRu : a.nameEn).replace(/'/g,"\\'")}', '${a.gradFrom}', '${a.gradTo}', '${a.icon}')"
                  class="text-xs text-violet-400 hover:text-violet-300">
                  <i class="fas fa-plus mr-1"></i>${isRu ? 'Кастомизировать' : 'Customize'}
                </button>
                <button onclick="openTestModal('${a.role}', '${(isRu ? a.nameRu : a.nameEn).replace(/'/g,"\\'")}', '')"
                  class="text-xs text-blue-400 hover:text-blue-300">
                  <i class="fas fa-vial mr-1"></i>${isRu ? 'Тест' : 'Test'}
                </button>
                <button onclick="runBuiltinAgent('${a.role}')"
                  class="text-xs text-green-400 hover:text-green-300">
                  <i class="fas fa-play mr-1"></i>${isRu ? 'Запустить' : 'Use'}
                </button>
              </div>
            </div>`

        const categories = [
          { key: 'science', icon: 'fa-flask', color: 'text-rose-400',
            label: isRu ? 'Наука и эксперименты' : 'Science & experiments',
            items: SHOWCASE.filter(a => (a as any).group === 'science') },
          { key: 'ai_eng', icon: 'fa-microchip', color: 'text-violet-400',
            label: isRu ? 'AI и LLM инженерия' : 'AI & LLM engineering',
            items: SHOWCASE.filter(a => (a as any).group === 'ai_eng') },
        ]

        return `<div id="showcase-section">
          ${categories.map(cat => `
            <div class="agent-category mb-8" data-category="${cat.key}">
              <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas ${cat.icon} ${cat.color}"></i>
                ${cat.label}
                <span class="text-xs text-gray-600 normal-case font-normal">· ${cat.items.length}</span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                ${cat.items.map(card).join('')}
              </div>
            </div>
          `).join('')}
        </div>`
      })()}
    </div>
  </main>

  <!-- Create / Customize Agent Modal -->
  <div id="create-modal" style="display:none;"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-5">
        <h3 id="modal-title" class="text-lg font-semibold">${isRu ? 'Создать агента' : 'Create agent'}</h3>
        <button onclick="closeModal()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Имя (EN)' : 'Name (EN)'} *</label>
            <input id="m-name-en" type="text" placeholder="Lead Researcher"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Имя (RU)' : 'Name (RU)'}</label>
            <input id="m-name-ru" type="text" placeholder="Лид-исследователь"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
          </div>
        </div>

        <div>
          <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Роль' : 'Role'} *</label>
          <select id="m-role"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
            <optgroup label="${isRu ? 'Наука и эксперименты' : 'Science & experiments'}">
              <option value="research_scientist">research_scientist</option>
              <option value="data_scientist">data_scientist</option>
              <option value="experiment_designer">experiment_designer</option>
              <option value="peer_reviewer">peer_reviewer</option>
              <option value="literature_researcher">literature_researcher</option>
            </optgroup>
            <optgroup label="${isRu ? 'AI и LLM инженерия' : 'AI & LLM engineering'}">
              <option value="ml_engineer">ml_engineer</option>
              <option value="prompt_engineer">prompt_engineer</option>
              <option value="llm_engineer">llm_engineer</option>
              <option value="ai_architect">ai_architect</option>
              <option value="mlops_engineer">mlops_engineer</option>
            </optgroup>
            <option value="custom">custom</option>
          </select>
        </div>

        <div>
          <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Инструкции' : 'Instructions'} *</label>
          <textarea id="m-instructions" rows="4"
            placeholder="${isRu ? 'Опишите роль, задачи и стиль работы агента...' : 'Describe the agent\'s role, tasks, and working style...'}"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Режим мышления' : 'Thinking mode'}</label>
            <select id="m-thinking"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
              <option value="standard">${isRu ? '🧠 Стандартное' : '🧠 Standard'}</option>
              <option value="systems">${isRu ? '🌐 Системное' : '🌐 Systems'}</option>
              <option value="critical">${isRu ? '⚖️ Критическое' : '⚖️ Critical'}</option>
              <option value="first_principles">${isRu ? '🔬 Первые принципы' : '🔬 First Principles'}</option>
              <option value="triz">${isRu ? '⚙️ ТРИЗ' : '⚙️ TRIZ'}</option>
              <option value="lateral">${isRu ? '🔀 Латеральное' : '🔀 Lateral'}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Формат вывода' : 'Output format'}</label>
            <select id="m-output"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
              <option value="text">${isRu ? 'Текст' : 'Text'}</option>
              <option value="markdown">Markdown</option>
              <option value="json">JSON</option>
              <option value="table">${isRu ? 'Таблица' : 'Table'}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">Max tokens</label>
            <input id="m-tokens" type="number" value="2048" min="256" max="8192"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">Temperature</label>
            <input id="m-temp" type="number" value="0.7" min="0" max="2" step="0.1"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
          </div>
        </div>

        <!-- Tools -->
        <div>
          <label class="block text-xs text-gray-400 mb-2">${isRu ? 'Инструменты' : 'Tools'}</label>
          <div class="grid grid-cols-2 gap-1.5" id="tools-grid">
            ${[
              ['web_search',  isRu?'Веб-поиск':'Web Search',     'fa-globe'],
              ['rag_docs',    isRu?'RAG документы':'RAG Docs',   'fa-database'],
              ['code_gen',    isRu?'Генерация кода':'Code Gen',  'fa-code'],
              ['sheets',      'Google Sheets',                    'fa-table'],
              ['crm_read',    isRu?'CRM чтение':'CRM Read',      'fa-address-book'],
              ['crm_write',   isRu?'CRM запись':'CRM Write',     'fa-pen'],
              ['critic_llm',  isRu?'Критик LLM':'Critic LLM',   'fa-check-double'],
              ['telegram',    'Telegram',                         'fa-paper-plane'],
              ['calculator',  isRu?'Калькулятор':'Calculator',   'fa-calculator'],
              ['summarizer',  isRu?'Суммаризатор':'Summarizer',  'fa-compress-alt'],
              ['email',       'Email',                            'fa-envelope'],
              ['mcp_tools',   'MCP Tools',                       'fa-plug'],
            ].map(([val, lbl, icon]) =>
              `<label class="flex items-center gap-2 px-2 py-1.5 rounded bg-gray-800 hover:bg-gray-750 cursor-pointer text-xs text-gray-300">
                <input type="checkbox" name="tool" value="${val}" class="accent-violet-500 w-3 h-3">
                <i class="fas ${icon} text-gray-500 w-3 text-center" style="font-size:11px"></i>${lbl}
              </label>`
            ).join('')}
          </div>
        </div>

        <!-- Knowledge Bases -->
        <div>
          <label class="block text-xs text-gray-400 mb-2">${isRu ? 'Базы знаний (RAG)' : 'Knowledge Bases (RAG)'}</label>
          <div id="kb-checkboxes" class="space-y-1 max-h-28 overflow-y-auto">
            <p class="text-xs text-gray-600 italic">${isRu ? 'Загрузка баз знаний...' : 'Loading knowledge bases...'}</p>
          </div>
        </div>
      </div>

      <div id="modal-error" style="display:none;"
        class="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2"></div>

      <div class="flex gap-3 mt-5">
        <button onclick="closeModal()"
          class="flex-1 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white text-sm transition">
          ${isRu ? 'Отмена' : 'Cancel'}
        </button>
        <button id="save-btn" onclick="saveAgent()"
          class="flex-1 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-medium">
          ${isRu ? 'Создать' : 'Create'}
        </button>
      </div>
    </div>
  </div>

  <!-- Test Agent Modal -->
  <div id="test-modal" style="display:none;"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl p-6 w-full max-w-xl max-h-[85vh] flex flex-col">
      <div class="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 class="text-lg font-semibold">${isRu ? 'Тест агента' : 'Test Agent'}</h3>
          <p id="test-agent-name" class="text-sm text-gray-400 mt-0.5"></p>
        </div>
        <button onclick="closeTestModal()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button>
      </div>
      <div class="flex-shrink-0 mb-3">
        <textarea id="test-prompt" rows="3"
            placeholder="${isRu ? 'Введите тестовый запрос для агента...' : 'Enter a test prompt for this agent...'}"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"></textarea>
        <!-- Model selector row -->
        <div class="flex items-center gap-2 mt-2">
          <i class="fas fa-robot text-xs text-violet-400 flex-shrink-0"></i>
          <select id="test-model-select"
              class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-violet-500 min-w-0">
            <option value="">${isRu ? '— выберите модель —' : '— select model —'}</option>
          </select>
          <a href="/ai-config?lang=${lang}" class="text-[10px] text-gray-600 hover:text-blue-400 flex-shrink-0 whitespace-nowrap">
            <i class="fas fa-key mr-0.5"></i>${isRu ? 'Ключи' : 'Keys'}
          </a>
        </div>
        <div class="flex gap-2 mt-2">
          <button onclick="runTest()"
              class="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
            <i id="test-icon" class="fas fa-play"></i>
            <span id="test-btn-label">${isRu ? 'Запустить тест' : 'Run Test'}</span>
          </button>
          <button onclick="runFullMeta()"
              class="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition" title="${isRu ? 'Запустить через Meta-Orchestrator' : 'Run via Meta-Orchestrator'}">
            <i class="fas fa-sitemap mr-1"></i>Meta
          </button>
        </div>
      </div>
      <div id="test-result-area" class="flex-1 overflow-y-auto min-h-0">
        <div id="test-placeholder" class="py-8 text-center text-gray-600 text-sm">
          <i class="fas fa-robot text-3xl mb-3 block text-gray-700"></i>
          ${isRu ? 'Результат появится здесь' : 'Result will appear here'}
        </div>
        <div id="test-result" class="hidden bg-gray-800 rounded-xl p-4 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-mono"></div>
        <div id="test-meta" class="hidden mt-2 flex items-center gap-3 text-xs text-gray-500"></div>
      </div>
    </div>
  </div>

  <!-- Agent detail modal -->
  <div id="detail-modal" style="display:none;"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-4">
        <h3 id="detail-name" class="text-lg font-semibold"></h3>
        <button onclick="document.getElementById('detail-modal').style.display='none'" class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div id="detail-body" class="space-y-3 text-sm text-gray-400"></div>
      <div class="flex gap-2 mt-5">
        <button id="detail-delete" onclick="deleteAgent()"
          class="flex-1 py-2 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 text-sm transition">
          <i class="fas fa-trash mr-1"></i>${isRu ? 'Удалить' : 'Delete'}
        </button>
        <button onclick="document.getElementById('detail-modal').style.display='none'"
          class="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm transition">
          ${isRu ? 'Закрыть' : 'Close'}
        </button>
      </div>
    </div>
  </div>

  <script>
    const isRu = ${isRu};
    let currentAgentId = null;
    let customAgents = [];

    // ─── Model selector for test modal ─────────────────────────────────────
    const AGENT_PROVIDERS = [
      { id:'openrouter', name:'OpenRouter', models:[
        { id:'meta-llama/llama-3.3-70b-instruct:free', name:'Llama 3.3 70B (free)' },
        { id:'google/gemini-2.0-flash-exp:free', name:'Gemini 2.0 Flash (free)' },
        { id:'deepseek/deepseek-r1:free', name:'DeepSeek R1 (free)' },
        { id:'mistralai/mistral-7b-instruct:free', name:'Mistral 7B (free)' },
        { id:'anthropic/claude-3.5-sonnet', name:'Claude 3.5 Sonnet' },
        { id:'openai/gpt-4o', name:'GPT-4o' },
        { id:'openai/gpt-4o-mini', name:'GPT-4o mini' },
      ]},
      { id:'anthropic', name:'Anthropic', models:[
        { id:'claude-opus-4-8', name:'Claude Opus 4.8' },
        { id:'claude-sonnet-4-6', name:'Claude Sonnet 4.6' },
        { id:'claude-haiku-4-5-20251001', name:'Claude Haiku 4.5' },
      ]},
      { id:'openai', name:'OpenAI', models:[
        { id:'gpt-4o', name:'GPT-4o' },
        { id:'gpt-4o-mini', name:'GPT-4o mini' },
        { id:'o3-mini', name:'o3-mini' },
      ]},
      { id:'gemini', name:'Google Gemini', models:[
        { id:'gemini-2.0-flash-exp', name:'Gemini 2.0 Flash (free)' },
        { id:'gemini-1.5-pro-latest', name:'Gemini 1.5 Pro' },
      ]},
      { id:'groq', name:'Groq', models:[
        { id:'llama-3.3-70b-versatile', name:'Llama 3.3 70B' },
        { id:'llama-3.1-8b-instant', name:'Llama 3.1 8B' },
      ]},
    ];

    function getAgentProviderKey(pid) {
      if (pid === 'openrouter') {
        return localStorage.getItem('era_key_openrouter')
          || localStorage.getItem('openrouter_api_key')
          || localStorage.getItem('ora_api_key') || '';
      }
      return localStorage.getItem('era_key_' + pid) || '';
    }

    function populateTestModelSelect() {
      const sel = document.getElementById('test-model-select');
      if (!sel) return;
      const savedVal = localStorage.getItem('era_agent_test_model') || '';
      // Build options: all providers, configured ones first
      const configured = AGENT_PROVIDERS.filter(p => getAgentProviderKey(p.id));
      const unconfigured = AGENT_PROVIDERS.filter(p => !getAgentProviderKey(p.id));
      const ordered = [...configured, ...unconfigured];
      let html = '<option value="">' + (isRu ? '— выберите модель —' : '— select model —') + '</option>';
      ordered.forEach(p => {
        const hasKey = !!getAgentProviderKey(p.id);
        html += '<optgroup label="' + p.name + (hasKey ? '' : ' 🔒') + '">';
        p.models.forEach(m => {
          const selected = m.id === savedVal ? ' selected' : '';
          html += '<option value="' + m.id + '"' + selected + (hasKey ? '' : ' disabled') + '>' + m.name + '</option>';
        });
        html += '</optgroup>';
      });
      sel.innerHTML = html;
    }

    // ─── Custom agents from API ─────────────────────────────────────────────

    async function loadCustomAgents() {
      try {
        const res = await fetch('/api/meta/agents');
        if (!res.ok) return;
        const data = await res.json();
        customAgents = data.agents || [];
        renderCustomAgents();
        document.getElementById('stat-ready').textContent = customAgents.length;
      } catch { /* silent */ }
    }

    function renderCustomAgents() {
      const section = document.getElementById('custom-section');
      const grid = document.getElementById('custom-grid');
      if (!customAgents.length) { section.style.display = 'none'; return; }
      section.style.display = '';

      grid.innerHTML = customAgents.map(a => \`
        <div class="agent-card glass rounded-xl p-5 hover:border-violet-500/40 transition-all group cursor-pointer"
             data-name="\${(a.nameEn || '').toLowerCase()}"
             data-role="\${a.role}"
             data-custom="true"
             onclick="openAgentDetail('\${a.id}')">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg">
                <i class="fas fa-robot text-white text-base"></i>
              </div>
              <div>
                <p class="font-semibold text-sm">\${a.nameEn}</p>
                <p class="text-xs text-gray-500">\${a.role.replace(/_/g,' ')}</p>
              </div>
            </div>
            <span class="text-xs px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/30">${isRu ? 'кастом' : 'custom'}</span>
          </div>
          <p class="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">\${a.instructions || '—'}</p>
          <div class="flex items-center justify-between text-xs text-gray-600 mt-2">
            <span>\${a.thinkingMode}</span>
            <span>\${a.outputFormat}</span>
          </div>
          <div class="flex gap-1.5 mt-3 pt-3 border-t border-gray-800">
            <button onclick="event.stopPropagation();openTestModal('\${a.role}','\${a.nameEn}','\${(a.instructions||'').replace(/'/g,\\"'\\").substring(0,200)}')"
                class="flex-1 text-xs bg-blue-900/60 hover:bg-blue-800 text-blue-300 py-1.5 rounded-lg transition">
              <i class="fas fa-vial mr-1"></i>${isRu ? 'Тест' : 'Test'}
            </button>
            <button onclick="event.stopPropagation();openAgentDetail('\${a.id}')"
                class="flex-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white py-1.5 rounded-lg transition">
              <i class="fas fa-cog mr-1"></i>${isRu ? 'Детали' : 'Details'}
            </button>
          </div>
        </div>
      \`).join('');
    }

    function openAgentDetail(id) {
      const a = customAgents.find(x => x.id === id);
      if (!a) return;
      currentAgentId = id;
      document.getElementById('detail-name').textContent = a.nameEn + (a.nameRu ? ' / ' + a.nameRu : '');
      document.getElementById('detail-body').innerHTML = \`
        <div><span class="text-gray-600">Role:</span> \${a.role}</div>
        <div><span class="text-gray-600">Thinking:</span> \${a.thinkingMode}</div>
        <div><span class="text-gray-600">Output:</span> \${a.outputFormat}</div>
        <div><span class="text-gray-600">Tokens:</span> \${a.maxTokens} · temp \${a.temperature}</div>
        <div class="mt-2"><span class="text-gray-600">${isRu ? 'Инструкции:' : 'Instructions:'}</span><p class="mt-1 text-gray-300 whitespace-pre-wrap">\${a.instructions}</p></div>
      \`;
      document.getElementById('detail-modal').style.display = 'flex';
    }

    async function deleteAgent() {
      if (!currentAgentId) return;
      if (!confirm(isRu?'Удалить агента?':'Delete this agent?')) return;
      try {
        const res = await fetch('/api/meta/agents/' + currentAgentId, { method: 'DELETE' });
        if (res.ok) {
          customAgents = customAgents.filter(a => a.id !== currentAgentId);
          renderCustomAgents();
          document.getElementById('detail-modal').style.display = 'none';
          document.getElementById('stat-ready').textContent = customAgents.length;
        }
      } catch(e) { alert(e.message); }
    }

    // ─── Create / Customize ─────────────────────────────────────────────────

    function showCreateModal() {
      document.getElementById('modal-title').textContent = isRu?'Создать агента':'Create agent';
      document.getElementById('m-name-en').value = '';
      document.getElementById('m-name-ru').value = '';
      document.getElementById('m-role').value = 'custom';
      document.getElementById('m-instructions').value = '';
      document.getElementById('m-thinking').value = 'standard';
      document.getElementById('m-output').value = 'text';
      document.getElementById('m-tokens').value = '2048';
      document.getElementById('m-temp').value = '0.7';
      document.getElementById('modal-error').style.display = 'none';
      document.getElementById('create-modal').style.display = 'flex';
    }

    function customizeRole(role, name, gradFrom, gradTo, icon) {
      document.getElementById('modal-title').textContent = (isRu?'Кастомизировать: ':'Customize: ') + name;
      document.getElementById('m-role').value = role;
      document.getElementById('m-name-en').value = name;
      document.getElementById('m-instructions').value = '';
      document.getElementById('modal-error').style.display = 'none';
      document.getElementById('create-modal').style.display = 'flex';
    }

    function closeModal() { document.getElementById('create-modal').style.display = 'none'; }

    async function saveAgent() {
      const nameEn = document.getElementById('m-name-en').value.trim();
      const instructions = document.getElementById('m-instructions').value.trim();
      const errEl = document.getElementById('modal-error');
      errEl.style.display = 'none';

      if (!nameEn) { errEl.textContent = isRu?'Введите имя агента':'Enter agent name'; errEl.style.display=''; return; }
      if (!instructions) { errEl.textContent = isRu?'Введите инструкции':'Enter instructions'; errEl.style.display=''; return; }

      const btn = document.getElementById('save-btn');
      btn.textContent = isRu?'Создание...':'Creating...';
      btn.disabled = true;

      try {
        const res = await fetch('/api/meta/agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nameEn,
            nameRu: document.getElementById('m-name-ru').value.trim() || nameEn,
            role: document.getElementById('m-role').value,
            instructions,
            thinkingMode: document.getElementById('m-thinking').value,
            outputFormat: document.getElementById('m-output').value,
            maxTokens: parseInt(document.getElementById('m-tokens').value) || 2048,
            temperature: parseFloat(document.getElementById('m-temp').value) || 0.7,
          }),
        });
        const data = await res.json();
        if (!res.ok) { errEl.textContent = data.error || 'Failed'; errEl.style.display=''; return; }
        customAgents = [data, ...customAgents];
        renderCustomAgents();
        document.getElementById('stat-ready').textContent = customAgents.length;
        closeModal();
      } catch(e) {
        errEl.textContent = e.message || 'Network error'; errEl.style.display='';
      } finally {
        btn.textContent = isRu?'Создать':'Create'; btn.disabled = false;
      }
    }

    // ─── Filtering ──────────────────────────────────────────────────────────

    function filterAgents() {
      const q = document.getElementById('agent-search').value.toLowerCase();
      const customOnly = document.getElementById('show-custom-only').checked;

      document.getElementById('showcase-section').style.display = customOnly ? 'none' : '';

      document.querySelectorAll('.agent-card').forEach(el => {
        const nameMatch = !q || el.dataset.name.includes(q) || el.dataset.role.includes(q);
        const customMatch = !customOnly || el.dataset.custom === 'true';
        el.style.display = nameMatch && customMatch ? '' : 'none';
      });

      // Hide category sections that have no visible cards
      document.querySelectorAll('.agent-category').forEach(cat => {
        const visible = cat.querySelectorAll('.agent-card:not([style*="display: none"])').length;
        cat.style.display = visible ? '' : 'none';
      });
    }

    function runBuiltinAgent(role) {
      window.location.href = '/meta?lang=${lang}';
    }

    // ─── Load KBs into modal ────────────────────────────────────────────────

    async function loadKBsForModal() {
      const el = document.getElementById('kb-checkboxes');
      if (!el) return;
      try {
        const res  = await fetch('/api/meta/knowledge-bases');
        const data = await res.json();
        const kbs  = data.knowledge_bases || [];
        if (!kbs.length) {
          el.innerHTML = '<p class="text-xs text-gray-600 italic">${isRu ? 'Нет баз знаний. Создайте в разделе Базы знаний.' : 'No knowledge bases. Create them in Knowledge Bases section.'}</p>';
          return;
        }
        el.innerHTML = kbs.map(k => \`
          <label class="flex items-center gap-2 px-2 py-1.5 rounded bg-gray-800 hover:bg-gray-750 cursor-pointer text-xs text-gray-300">
            <input type="checkbox" name="kb" value="\${k.id}" class="accent-violet-500 w-3 h-3">
            <i class="fas fa-database text-blue-400 w-3 text-center" style="font-size:11px"></i>
            \${k.name}
            <span class="ml-auto text-gray-600">\${k.document_count||0} docs</span>
          </label>
        \`).join('');
      } catch {
        el.innerHTML = '<p class="text-xs text-gray-600 italic">${isRu ? 'Не удалось загрузить базы знаний' : 'Could not load knowledge bases'}</p>';
      }
    }

    // ─── Test Agent ─────────────────────────────────────────────────────────

    let testAgentRole = '';
    let testAgentInstructions = '';

    function openTestModal(role, name, instructions) {
      testAgentRole = role;
      testAgentInstructions = instructions;
      document.getElementById('test-agent-name').textContent = name + ' (' + role + ')';
      populateTestModelSelect();
      document.getElementById('test-prompt').value = '';
      document.getElementById('test-result').classList.add('hidden');
      document.getElementById('test-meta').classList.add('hidden');
      document.getElementById('test-placeholder').style.display = '';
      document.getElementById('test-modal').style.display = 'flex';
    }
    window.openTestModal = openTestModal;

    function closeTestModal() { document.getElementById('test-modal').style.display = 'none'; }
    window.closeTestModal = closeTestModal;

    function runFullMeta() {
      const prompt = document.getElementById('test-prompt').value.trim();
      if (!prompt) return;
      window.location.href = '/meta?lang=${lang}&task=' + encodeURIComponent(prompt);
    }
    window.runFullMeta = runFullMeta;

    async function runTest() {
      const prompt = document.getElementById('test-prompt').value.trim();
      if (!prompt) return;

      const modelSel = document.getElementById('test-model-select');
      const chosenModel = modelSel ? modelSel.value : '';
      if (chosenModel) localStorage.setItem('era_agent_test_model', chosenModel);

      // Determine the provider and API key for the chosen model
      let apiKey = '';
      let provider = 'openrouter';
      if (chosenModel) {
        for (const p of AGENT_PROVIDERS) {
          if (p.models.find(m => m.id === chosenModel)) {
            provider = p.id;
            apiKey = getAgentProviderKey(p.id);
            break;
          }
        }
      }
      if (!apiKey) {
        apiKey = localStorage.getItem('era_key_openrouter')
          || localStorage.getItem('openrouter_api_key')
          || localStorage.getItem('ora_api_key') || '';
      }

      const icon  = document.getElementById('test-icon');
      const label = document.getElementById('test-btn-label');
      icon.className  = 'fas fa-spinner fa-spin';
      label.textContent = isRu ? 'Обработка...' : 'Running...';

      document.getElementById('test-placeholder').style.display = 'none';
      document.getElementById('test-result').classList.add('hidden');
      document.getElementById('test-meta').classList.add('hidden');

      const t0 = Date.now();
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (apiKey) headers['X-API-Key'] = apiKey;
        const res  = await fetch('/api/query', {
          method: 'POST',
          headers,
          body: JSON.stringify({ query: prompt, agentRole: testAgentRole, singleAgent: true, model: chosenModel || undefined }),
        });
        const data = await res.json();
        const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

        const resultEl = document.getElementById('test-result');
        resultEl.textContent = data.result || data.answer || data.content
          || (data.responses && data.responses[0]?.content)
          || JSON.stringify(data, null, 2);
        resultEl.classList.remove('hidden');

        const metaEl = document.getElementById('test-meta');
        metaEl.innerHTML = '<i class="fas fa-clock mr-1"></i>' + elapsed + 's'
          + (data.model ? ' · <i class="fas fa-robot mr-1 ml-2"></i>' + data.model : '')
          + (data.cost  ? ' · <i class="fas fa-dollar-sign mr-1 ml-2"></i>$' + (data.cost||0).toFixed(4) : '');
        metaEl.classList.remove('hidden');
      } catch(e) {
        const resultEl = document.getElementById('test-result');
        resultEl.textContent = '${isRu ? 'Ошибка:' : 'Error:'} ' + (e.message || 'network error')
          + '\\n\\n${isRu ? 'Убедитесь что настроен OpenRouter API ключ в AI Настройки.' : 'Make sure OpenRouter API key is configured in AI Config.'}';
        resultEl.classList.remove('hidden');
      } finally {
        icon.className  = 'fas fa-play';
        label.textContent = isRu ? 'Запустить тест' : 'Run Test';
      }
    }
    window.runTest = runTest;

    // ─── Init ───────────────────────────────────────────────────────────────

    loadCustomAgents();
    loadKBsForModal();

    document.getElementById('create-modal').addEventListener('click', e => {
      if (e.target === document.getElementById('create-modal')) closeModal();
    });
    document.getElementById('test-modal').addEventListener('click', e => {
      if (e.target === document.getElementById('test-modal')) closeTestModal();
    });
  </script>
</body>
</html>
`
}
