import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const metaOrchestratorPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'

  const title = isRu ? 'Мета-Оркестратор' : 'Meta-Orchestrator'
  const subtitle = isRu
    ? 'Поставьте задачу — система соберёт план, назначит агентов и запустит цифровую команду'
    : 'Set a task — the system builds a plan, assigns agents, and runs your digital team'

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, subtitle, lang)}
  <script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.9/dist/purify.min.js"></script>
  <style>
    /* ─── Markdown output ──────────────────────────────────── */
    .result-md { font-size:13px; line-height:1.65; color:#d1d5db; word-break:break-word; }
    .result-md>*:first-child { margin-top:0; }
    .result-md h1,.result-md h2,.result-md h3 { color:#fff; font-weight:600; margin:.9em 0 .45em; }
    .result-md h1{font-size:1.3em}.result-md h2{font-size:1.16em}.result-md h3{font-size:1.05em}
    .result-md p{margin:.5em 0}
    .result-md ul,.result-md ol{margin:.5em 0;padding-left:1.4em}.result-md li{margin:.22em 0}
    .result-md strong{color:#fff}.result-md a{color:#818cf8;text-decoration:underline}
    .result-md code{background:rgba(255,255,255,.08);padding:1px 5px;border-radius:4px;font-size:.9em}
    .result-md pre{background:rgba(0,0,0,.4);padding:10px 12px;border-radius:8px;overflow-x:auto;margin:.6em 0}
    .result-md pre code{background:none;padding:0}
    .result-md table{border-collapse:collapse;width:100%;margin:.7em 0;font-size:12px;display:block;overflow-x:auto}
    .result-md th,.result-md td{border:1px solid rgba(255,255,255,.12);padding:6px 9px;text-align:left;vertical-align:top}
    .result-md th{background:rgba(255,255,255,.06);color:#e5e7eb;font-weight:600}
    .result-md blockquote{border-left:3px solid rgba(139,92,246,.5);padding-left:10px;color:#9ca3af;margin:.6em 0}
    .result-md hr{border:none;border-top:1px solid rgba(255,255,255,.1);margin:1em 0}
    /* ─── Plan / execution ─────────────────────────────────── */
    .agent-chip { display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:20px;font-size:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06); }
    .step-line { border-left:2px solid rgba(99,102,241,.3); }
    .step-dot { width:10px;height:10px;border-radius:50%;flex-shrink:0; }
    .strategy-badge { padding:3px 8px;border-radius:6px;font-size:11px;font-weight:600;letter-spacing:.04em; }
    .pulse-dot { width:8px;height:8px;border-radius:50%;background:#3b82f6;animation:pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
    .fade-in { animation:fadeIn .3s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
    /* ─── Model chips ──────────────────────────────────────── */
    .model-chip { display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:11px;cursor:pointer;border:1px solid;transition:all .15s; }
    .model-chip.selected { background:rgba(139,92,246,.25);border-color:rgba(139,92,246,.6);color:#c4b5fd; }
    .model-chip.unselected { background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.1);color:#9ca3af; }
    .model-chip.unselected:hover { border-color:rgba(139,92,246,.4);color:#e2e8f0; }
    .provider-dot { width:6px;height:6px;border-radius:50%;flex-shrink:0; }
    /* ─── Team builder ─────────────────────────────────────── */
    .team-slot { border:1.5px dashed rgba(255,255,255,.12);border-radius:10px;padding:8px;min-height:50px;transition:border-color .15s; }
    .team-slot.has-members { border-style:solid;border-color:rgba(139,92,246,.35); }
    .step-card { cursor:pointer;transition:all .15s; }
    .step-card:hover { background:rgba(255,255,255,.04)!important; }
    .step-card.assigned { opacity:.45; }
    .team-tag { display:inline-flex;align-items:center;gap:4px;padding:2px 7px;border-radius:10px;font-size:10px;font-weight:600; }
    .autonomy-safe { background:rgba(16,185,129,.15);border-color:rgba(16,185,129,.3);color:#34d399; }
    .autonomy-confirm { background:rgba(245,158,11,.15);border-color:rgba(245,158,11,.3);color:#fbbf24; }
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('meta', lang)}

  <main class="ml-56 pt-4 min-h-screen">
    <div class="p-6 max-w-7xl">

      <!-- ── Header ──────────────────────────────────────────── -->
      <div class="mb-6 flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <i class="fas fa-sitemap text-white text-sm"></i>
            </div>
            <h1 class="text-2xl font-bold">${title}</h1>
            <span class="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">v2.0</span>
          </div>
          <p class="text-gray-400 ml-12">${subtitle}</p>
        </div>
        <a href="/ai-config?lang=${lang}"
          class="text-sm px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white transition flex items-center gap-2">
          <i id="cfg-key-icon" class="fas fa-key text-gray-500"></i>
          <span id="cfg-key-label">${isRu ? 'AI Провайдеры' : 'AI Providers'}</span>
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- ── LEFT (2/3): Task input + Plan + Execution ──── -->
        <div class="lg:col-span-2 space-y-5">

          <!-- Task Input Card -->
          <div class="glass rounded-xl p-6">
            <label class="block text-gray-300 text-sm font-medium mb-3">
              <i class="fas fa-keyboard text-violet-400 mr-2"></i>
              ${isRu ? 'Поставьте задачу' : 'Describe your task'}
            </label>
            <textarea id="task-input" rows="4"
              placeholder="${isRu
                ? 'Например: «Проведи обзор литературы по теме LLM-агентов, сформулируй гипотезы, подготовь краткое научное резюме»'
                : 'E.g. "Review literature on LLM agents, formulate hypotheses, prepare a brief research summary"'}"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition resize-none text-sm leading-relaxed"></textarea>

            <!-- Model Selector Panel -->
            <div class="mt-3 mb-3 border border-gray-700/60 rounded-lg bg-gray-800/40" id="model-selector-wrap">
              <button onclick="toggleModelPanel()" class="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-700/30 rounded-lg transition">
                <div class="flex items-center gap-2">
                  <i class="fas fa-robot text-violet-400 text-xs"></i>
                  <span class="text-gray-300 font-medium">${isRu ? 'Модели оркестрации' : 'Orchestration Models'}</span>
                  <span id="model-count-badge" class="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">0/5</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">${isRu ? '1–5 моделей' : '1–5 models'}</span>
                  <i id="model-panel-chevron" class="fas fa-chevron-down text-xs text-gray-500 transition-transform"></i>
                </div>
              </button>
              <div id="selected-model-chips" class="px-4 pb-2 flex flex-wrap gap-1.5 hidden"></div>
              <div id="model-panel-body" class="hidden px-4 pb-4 pt-1">
                <div id="model-panel-no-providers" class="text-xs text-gray-500 py-2 hidden">
                  <i class="fas fa-key mr-1"></i>
                  <a href="/ai-config?lang=${lang}" class="text-blue-400 hover:text-blue-300">${isRu ? 'Настройте API ключи' : 'Configure API keys'}</a>
                </div>
                <div id="model-panel-providers" class="space-y-3"></div>
              </div>
            </div>

            <!-- Quick task templates: business + research -->
            <div class="flex flex-wrap gap-2 mt-3 mb-4">
              ${[
                isRu
                  ? ['🔬 Обзор литературы', 'Проведи обзор литературы по теме LLM-агентов: найди ключевые работы, выдели тренды и пробелы в исследованиях']
                  : ['🔬 Literature Review', 'Conduct a literature review on LLM agents: find key papers, highlight trends and research gaps'],
                isRu
                  ? ['💡 Гипотезы', 'Сформулируй научные гипотезы для исследования влияния prompt-инжиниринга на качество LLM-агентов']
                  : ['💡 Hypotheses', 'Formulate scientific hypotheses on how prompt engineering affects LLM agent quality'],
                isRu
                  ? ['📊 Анализ рынка', 'Сделай конкурентный анализ рынка AI-автоматизации: игроки, цены, позиционирование, тренды']
                  : ['📊 Market Analysis', 'Competitive analysis of AI automation market: players, pricing, positioning, trends'],
                isRu
                  ? ['🚀 Запуск продукта', 'Помоги запустить AI-услугу: описание, оффер, КП, база клиентов, рассылка']
                  : ['🚀 Product Launch', 'Help launch an AI service: description, offer, proposal, client base, outreach'],
                isRu
                  ? ['🧬 Эксперимент', 'Спроектируй A/B-эксперимент для проверки гипотезы о влиянии температуры модели на точность ответов']
                  : ['🧬 Experiment Design', 'Design an A/B experiment to test the hypothesis that model temperature affects answer accuracy'],
                isRu
                  ? ['🤝 Команда агентов', 'Сформируй команду из 5 агентов для проведения полного цикла исследования: обзор → гипотезы → эксперимент → отчёт']
                  : ['🤝 Agent Team', 'Form a team of 5 agents for a full research cycle: review → hypotheses → experiment → report'],
              ].map(([label, prompt]) => `
                <button onclick="document.getElementById('task-input').value='${(prompt as string).replace(/'/g, "\\'")}'"
                  class="text-xs px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 hover:text-white transition">
                  ${label}
                </button>
              `).join('')}
            </div>

            <!-- Strategy + Mode + Generate -->
            <div class="flex items-center justify-between flex-wrap gap-3">
              <div class="flex items-center gap-2 flex-wrap">
                <select id="strategy-select"
                  class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
                  <option value="PLANNER">${isRu ? '🗺️ Планировщик' : '🗺️ Planner'}</option>
                  <option value="RELAY">${isRu ? '🔄 Эстафета' : '🔄 Relay'}</option>
                  <option value="PARALLEL">${isRu ? '⚡ Параллельно' : '⚡ Parallel'}</option>
                  <option value="VERIFIED">${isRu ? '✅ Верификация' : '✅ Verified'}</option>
                  <option value="EXPERT_PANEL">${isRu ? '👥 Экспертная комиссия' : '👥 Expert Panel'}</option>
                  <option value="DEBATE">${isRu ? '🗣️ Дебаты' : '🗣️ Debate'}</option>
                  <option value="FALLBACK">${isRu ? '🔁 Резервный' : '🔁 Fallback'}</option>
                  <option value="SINGLE">${isRu ? '⚡ Одиночный' : '⚡ Single'}</option>
                </select>
                <select id="mode-select"
                  class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
                  <option value="standard">${isRu ? '🧠 Стандартное' : '🧠 Standard'}</option>
                  <option value="systems">${isRu ? '🌐 Системное' : '🌐 Systems'}</option>
                  <option value="critical">${isRu ? '⚖️ Критическое' : '⚖️ Critical'}</option>
                  <option value="first_principles">${isRu ? '🔬 Первые принципы' : '🔬 First Principles'}</option>
                  <option value="triz">${isRu ? '⚙️ ТРИЗ' : '⚙️ TRIZ'}</option>
                </select>
              </div>
              <button onclick="generatePlan()" id="gen-btn"
                class="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-6 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium">
                <i class="fas fa-magic"></i>
                ${isRu ? 'Сгенерировать план' : 'Generate Plan'}
              </button>
            </div>

            <!-- Error banner -->
            <div id="error-banner" style="display:none"
              class="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-start gap-2">
              <i class="fas fa-exclamation-circle mt-0.5 flex-shrink-0"></i>
              <span id="error-text"></span>
            </div>
          </div>

          <!-- Generated Plan -->
          <div id="plan-container" style="display:none" class="glass rounded-xl p-6 fade-in">
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-2">
                <i class="fas fa-project-diagram text-violet-400"></i>
                <h3 class="font-semibold">${isRu ? 'Сгенерированный план' : 'Generated Plan'}</h3>
                <span id="plan-strategy-badge" class="strategy-badge bg-violet-500/20 text-violet-300 border border-violet-500/30"></span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <span class="text-gray-500">${isRu ? 'Оценка:' : 'Est:'}</span>
                <span id="plan-cost" class="text-green-400 font-medium"></span>
                <span id="plan-time" class="text-gray-400"></span>
              </div>
            </div>
            <div id="plan-reasoning" class="text-xs text-gray-400 italic bg-gray-800/40 rounded-lg px-4 py-3 mb-4 border-l-2 border-violet-500/40"></div>
            <div id="plan-steps" class="space-y-1"></div>
            <div class="mt-5 pt-4 border-t border-gray-800 flex items-center justify-between flex-wrap gap-3">
              <div class="flex items-center gap-4 text-sm text-gray-400">
                <span><i class="fas fa-robot mr-1"></i> <span id="plan-agents-count"></span></span>
                <span><i class="fas fa-shield-alt text-yellow-400 mr-1"></i><span id="confirm-count" class="text-yellow-400"></span></span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="openTeamBuilder()"
                  class="border border-violet-500/40 text-violet-300 hover:bg-violet-500/10 px-4 py-2 rounded-lg text-sm transition flex items-center gap-2">
                  <i class="fas fa-people-group"></i>
                  ${isRu ? 'Создать команду' : 'Build Team'}
                </button>
                <button onclick="executePlan()" id="exec-btn"
                  class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-2 rounded-lg transition flex items-center gap-2 text-sm font-medium">
                  <i class="fas fa-play"></i>
                  ${isRu ? 'Запустить' : 'Execute'}
                </button>
              </div>
            </div>
          </div>

          <!-- ── Meta-Agent Team Builder ──────────────────── -->
          <div id="team-builder" style="display:none" class="glass rounded-xl p-6 fade-in border border-violet-500/25">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold flex items-center gap-2">
                <i class="fas fa-people-group text-violet-400"></i>
                ${isRu ? 'Сборщик команды мета-агентов' : 'Meta-Agent Team Builder'}
              </h3>
              <button onclick="closeTeamBuilder()" class="text-gray-500 hover:text-white text-xs px-2 py-1 rounded hover:bg-gray-800 transition">
                <i class="fas fa-times mr-1"></i>${isRu ? 'Закрыть' : 'Close'}
              </button>
            </div>
            <p class="text-xs text-gray-500 mb-4">
              ${isRu
                ? 'Распределите агентов из плана по командам. Каждая команда сохраняется как мета-агент и может быть повторно использована.'
                : 'Assign plan agents to teams. Each team is saved as a meta-agent and can be reused.'}
            </p>

            <!-- Team creation row -->
            <div class="flex gap-2 mb-4">
              <input id="new-team-name" type="text" placeholder="${isRu ? 'Название команды...' : 'Team name...'}"
                class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
              <select id="new-team-color"
                class="bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:border-violet-500">
                <option value="#8b5cf6">🟣 Violet</option>
                <option value="#3b82f6">🔵 Blue</option>
                <option value="#10b981">🟢 Green</option>
                <option value="#f59e0b">🟡 Amber</option>
                <option value="#ec4899">🩷 Pink</option>
                <option value="#06b6d4">🩵 Cyan</option>
              </select>
              <button onclick="addTeam()"
                class="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                <i class="fas fa-plus"></i>${isRu ? 'Команда' : 'Team'}
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Unassigned agents -->
              <div>
                <p class="text-xs text-gray-500 uppercase tracking-wider mb-2">${isRu ? 'Агенты плана' : 'Plan Agents'}</p>
                <div id="tb-unassigned" class="space-y-1.5"></div>
              </div>
              <!-- Teams -->
              <div>
                <p class="text-xs text-gray-500 uppercase tracking-wider mb-2">${isRu ? 'Команды' : 'Teams'}</p>
                <div id="tb-teams" class="space-y-3"></div>
                <p id="tb-no-teams" class="text-xs text-gray-600 italic">${isRu ? 'Создайте команду выше ↑' : 'Create a team above ↑'}</p>
              </div>
            </div>

            <!-- Save actions -->
            <div id="tb-save-row" class="hidden mt-4 pt-4 border-t border-gray-800 flex items-center justify-between flex-wrap gap-3">
              <p class="text-xs text-gray-500">
                <i class="fas fa-info-circle mr-1"></i>
                ${isRu ? 'Каждая команда сохранится как мета-агент в разделе Мета-Агенты' : 'Each team will be saved as a meta-agent in Meta-Agents'}
              </p>
              <div class="flex gap-2">
                <button onclick="saveAllTeams()"
                  class="bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                  <i class="fas fa-save"></i>${isRu ? 'Сохранить команды' : 'Save Teams'}
                </button>
                <button onclick="executeWithTeams()"
                  class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                  <i class="fas fa-play"></i>${isRu ? 'Запустить с командами' : 'Execute with Teams'}
                </button>
              </div>
            </div>
          </div>

          <!-- Execution progress -->
          <div id="exec-container" style="display:none" class="glass rounded-xl p-6 fade-in">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold flex items-center gap-2">
                <div class="pulse-dot"></div>
                <span id="exec-title">${isRu ? 'Выполнение...' : 'Executing...'}</span>
              </h3>
              <span id="exec-progress-label" class="text-sm text-gray-400"></span>
            </div>
            <div id="exec-steps" class="space-y-2"></div>
          </div>

          <!-- Autonomy Gate -->
          <div id="confirm-gate" style="display:none"
            class="glass rounded-xl p-5 border border-yellow-500/40 bg-yellow-500/5 fade-in">
            <div class="flex items-start gap-3">
              <i class="fas fa-shield-alt text-yellow-400 text-lg mt-0.5"></i>
              <div class="flex-1">
                <p class="font-semibold text-yellow-300 mb-1">Autonomy Gate — ${isRu ? 'требуется подтверждение' : 'confirmation required'}</p>
                <p id="gate-action-text" class="text-sm text-gray-400 mb-4"></p>
                <div class="flex gap-2">
                  <button onclick="approveGate()"
                    class="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                    <i class="fas fa-check"></i>${isRu ? 'Одобрить и продолжить' : 'Approve & continue'}
                  </button>
                  <button onclick="rejectGate()"
                    class="border border-red-500/40 text-red-400 hover:bg-red-500/10 px-5 py-2 rounded-lg text-sm transition flex items-center gap-2">
                    <i class="fas fa-times"></i>${isRu ? 'Отменить' : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Result -->
          <div id="result-container" style="display:none" class="glass rounded-xl p-6 fade-in">
            <div class="flex items-center gap-2 mb-4">
              <i class="fas fa-check-circle text-green-400 text-xl"></i>
              <h3 class="font-semibold text-green-400">${isRu ? 'Задача выполнена' : 'Task completed'}</h3>
              <span id="result-cost" class="ml-auto text-sm text-gray-400"></span>
            </div>
            <div id="result-content" class="space-y-3"></div>
            <a href="/journal?lang=${lang}" class="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
              <i class="fas fa-scroll"></i>
              ${isRu ? 'Просмотреть полный журнал' : 'View full journal'}
            </a>
          </div>
        </div>

        <!-- ── RIGHT (1/3): Saved Teams + Autonomy legend + History ── -->
        <div class="space-y-5">

          <!-- Saved Meta-Agent Teams -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <i class="fas fa-people-group text-violet-400"></i>
              ${isRu ? 'Сохранённые команды' : 'Saved Teams'}
            </h3>
            <div id="saved-teams-list" class="space-y-2">
              <p class="text-xs text-gray-600 italic">${isRu ? 'Нет сохранённых команд' : 'No saved teams yet'}</p>
            </div>
            <a href="/meta-agents?lang=${lang}"
              class="mt-3 w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition py-2 border border-dashed border-gray-700 rounded-lg">
              <i class="fas fa-sitemap"></i>
              ${isRu ? 'Все мета-агенты →' : 'All meta-agents →'}
            </a>
          </div>

          <!-- Autonomy Gate legend (collapsed by default) -->
          <details class="glass rounded-xl">
            <summary class="flex items-center gap-2 px-5 py-3 cursor-pointer select-none font-semibold text-sm">
              <i class="fas fa-shield-alt text-yellow-400"></i>
              Autonomy Gate
              <i class="fas fa-chevron-down text-xs text-gray-500 ml-auto transition"></i>
            </summary>
            <div class="px-5 pb-4 space-y-2 text-xs">
              <div class="autonomy-safe rounded-lg px-3 py-2 border flex items-center gap-2">
                <i class="fas fa-check-circle"></i>
                <span>${isRu ? 'Сбор / анализ — авто' : 'Gather / analyse — auto'}</span>
              </div>
              <div class="autonomy-confirm rounded-lg px-3 py-2 border flex items-center gap-2">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${isRu ? 'Email / CRM / публикация — подтверждение' : 'Email / CRM / publish — confirmation'}</span>
              </div>
            </div>
          </details>

          <!-- Recent runs (compact) -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-3 flex items-center gap-2 text-sm">
              <i class="fas fa-history text-gray-400"></i>
              ${isRu ? 'Последние запуски' : 'Recent runs'}
            </h3>
            <div id="recent-runs" class="space-y-1.5">
              <p class="text-xs text-gray-600">${isRu ? 'Загрузка...' : 'Loading...'}</p>
            </div>
            <a href="/journal?lang=${lang}" class="mt-2 text-xs text-blue-400 hover:text-blue-300 block">
              ${isRu ? 'Журнал →' : 'Journal →'}
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    const isRu = ${isRu};
    const lang = '${lang}';

    let currentPlanId = null;
    let pausedStepId  = null;
    let currentSteps  = [];   // raw plan steps for team builder
    let teams         = [];   // [{ id, name, color, members: [stepIdx,...] }]

    // ─── Shared role metadata (name + icon + color) ─────────────────────────
    const ROLE_META = {
      researcher:           { n: isRu?'Исследователь':'Researcher',           i:'fa-search',     c:'text-blue-400' },
      analyst:              { n: isRu?'Аналитик':'Analyst',                    i:'fa-chart-bar',  c:'text-cyan-400' },
      writer:               { n: isRu?'Автор':'Writer',                        i:'fa-pen-nib',    c:'text-purple-400' },
      critic:               { n: isRu?'Критик':'Critic',                       i:'fa-balance-scale',c:'text-yellow-400'},
      planner:              { n: isRu?'Планировщик':'Planner',                 i:'fa-tasks',      c:'text-indigo-400' },
      executor:             { n: isRu?'Исполнитель':'Executor',                i:'fa-play',       c:'text-green-400' },
      reviewer:             { n: isRu?'Ревьюер':'Reviewer',                    i:'fa-eye',        c:'text-orange-400' },
      supervisor:           { n: isRu?'Супервизор':'Supervisor',               i:'fa-user-shield',c:'text-red-400' },
      coordinator:          { n: isRu?'Координатор':'Coordinator',             i:'fa-people-arrows',c:'text-teal-400'},
      custom:               { n: isRu?'Свой агент':'Custom Agent',             i:'fa-star',       c:'text-gray-400' },
      sales_manager:        { n: isRu?'Менеджер продаж':'Sales Manager',       i:'fa-handshake',  c:'text-orange-400' },
      marketing_manager:    { n: isRu?'Маркетолог':'Marketing Manager',        i:'fa-bullseye',   c:'text-pink-400' },
      financial_analyst:    { n: isRu?'Финансовый аналитик':'Financial Analyst',i:'fa-dollar-sign',c:'text-green-400'},
      legal_counsel:        { n: isRu?'Юрист':'Legal Counsel',                 i:'fa-gavel',      c:'text-yellow-400' },
      hr_specialist:        { n: isRu?'HR-специалист':'HR Specialist',         i:'fa-user-tie',   c:'text-blue-400' },
      project_manager:      { n: isRu?'Менеджер проектов':'Project Manager',   i:'fa-project-diagram',c:'text-indigo-400'},
      software_engineer:    { n: isRu?'Разработчик':'Software Engineer',       i:'fa-code',       c:'text-lime-400' },
      data_engineer:        { n: isRu?'Data-инженер':'Data Engineer',          i:'fa-database',   c:'text-cyan-400' },
      devops_engineer:      { n: isRu?'DevOps-инженер':'DevOps Engineer',      i:'fa-server',     c:'text-gray-400' },
      security_analyst:     { n: isRu?'Аналитик ИБ':'Security Analyst',       i:'fa-shield-alt', c:'text-red-400' },
      research_scientist:   { n: isRu?'Учёный-исследователь':'Research Scientist',i:'fa-atom',   c:'text-rose-400' },
      data_scientist:       { n: isRu?'Дата-сайентист':'Data Scientist',       i:'fa-chart-area', c:'text-fuchsia-400'},
      experiment_designer:  { n: isRu?'Дизайнер экспериментов':'Experiment Designer',i:'fa-vials',c:'text-pink-400'},
      peer_reviewer:        { n: isRu?'Рецензент':'Peer Reviewer',             i:'fa-microscope', c:'text-red-400' },
      literature_researcher:{ n: isRu?'Обзор литературы':'Literature Researcher',i:'fa-book-open',c:'text-orange-400'},
      ml_engineer:          { n: isRu?'ML-инженер':'ML Engineer',              i:'fa-brain',      c:'text-indigo-400' },
      prompt_engineer:      { n: isRu?'Prompt-инженер':'Prompt Engineer',      i:'fa-terminal',   c:'text-violet-400' },
      llm_engineer:         { n: isRu?'LLM-инженер':'LLM Engineer',            i:'fa-robot',      c:'text-purple-400' },
      ai_architect:         { n: isRu?'AI-архитектор':'AI Architect',          i:'fa-sitemap',    c:'text-blue-400' },
      mlops_engineer:       { n: isRu?'MLOps-инженер':'MLOps Engineer',        i:'fa-server',     c:'text-cyan-400' },
    };
    function roleName(r)  { return (ROLE_META[r] || {}).n || r.replace(/_/g,' ').replace(/\\b\\w/g, c => c.toUpperCase()); }
    function roleIcon(r)  { return (ROLE_META[r] || {}).i || 'fa-robot'; }
    function roleColor(r) { return (ROLE_META[r] || {}).c || 'text-gray-400'; }

    // ─── Markdown helpers ────────────────────────────────────────────────────
    function escHtml(s) {
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    function renderMd(s) {
      const text = String(s ?? '');
      try {
        if (window.marked) {
          const html = window.marked.parse(text, { breaks:true, gfm:true });
          return window.DOMPurify ? window.DOMPurify.sanitize(html) : html;
        }
      } catch {}
      return '<p style="white-space:pre-wrap">' + escHtml(text) + '</p>';
    }

    // ─── API key helpers (multi-provider) ───────────────────────────────────
    function getProviderKey(pid) {
      if (pid === 'openrouter') {
        return localStorage.getItem('era_key_openrouter')
          || localStorage.getItem('openrouter_api_key')
          || localStorage.getItem('ora_api_key') || '';
      }
      return localStorage.getItem('era_key_' + pid) || '';
    }
    function getAnyKey() {
      const providers = ['openrouter','anthropic','openai','gemini','groq','mistral','cohere'];
      for (const p of providers) { const k = getProviderKey(p); if (k) return k; }
      return '';
    }
    function getFreeOnly() { return localStorage.getItem('ora_free_only') === 'true'; }

    function updateKeyStatus() {
      const providers = ['openrouter','anthropic','openai','gemini','groq','mistral','cohere'];
      const count = providers.filter(p => getProviderKey(p)).length;
      const icon  = document.getElementById('cfg-key-icon');
      const label = document.getElementById('cfg-key-label');
      if (count > 0) {
        if (icon)  icon.className = 'fas fa-key text-green-400';
        if (label) label.textContent = count + ' ' + (isRu ? 'провайдер' + (count>1?'а':'') : 'provider' + (count>1?'s':''));
      } else {
        if (icon)  icon.className = 'fas fa-key text-gray-500';
        if (label) label.textContent = isRu ? 'AI Провайдеры' : 'AI Providers';
      }
    }

    // ─── Error display ───────────────────────────────────────────────────────
    function showError(msg) {
      document.getElementById('error-text').textContent = msg;
      document.getElementById('error-banner').style.display = 'flex';
    }
    function hideError() { document.getElementById('error-banner').style.display = 'none'; }

    // ─── Multi-provider model registry ──────────────────────────────────────
    const PROVIDERS_META = [
      { id:'openrouter', name:'OpenRouter', color:'#3b82f6', models:[
        { id:'meta-llama/llama-3.3-70b-instruct:free', name:'Llama 3.3 70B', free:true },
        { id:'google/gemini-2.0-flash-exp:free', name:'Gemini 2.0 Flash', free:true },
        { id:'deepseek/deepseek-r1:free', name:'DeepSeek R1', free:true },
        { id:'mistralai/mistral-7b-instruct:free', name:'Mistral 7B', free:true },
        { id:'anthropic/claude-3.5-sonnet', name:'Claude 3.5 Sonnet', free:false },
        { id:'openai/gpt-4o', name:'GPT-4o', free:false },
        { id:'openai/gpt-4o-mini', name:'GPT-4o mini', free:false },
        { id:'google/gemini-pro-1.5', name:'Gemini 1.5 Pro', free:false },
      ]},
      { id:'anthropic', name:'Anthropic', color:'#f97316', models:[
        { id:'claude-opus-4-8', name:'Claude Opus 4.8', free:false },
        { id:'claude-sonnet-4-6', name:'Claude Sonnet 4.6', free:false },
        { id:'claude-haiku-4-5-20251001', name:'Claude Haiku 4.5', free:false },
      ]},
      { id:'openai', name:'OpenAI', color:'#10b981', models:[
        { id:'gpt-4o', name:'GPT-4o', free:false },
        { id:'gpt-4o-mini', name:'GPT-4o mini', free:false },
        { id:'o3-mini', name:'o3-mini', free:false },
      ]},
      { id:'gemini', name:'Google Gemini', color:'#8b5cf6', models:[
        { id:'gemini-2.0-flash-exp', name:'Gemini 2.0 Flash', free:true },
        { id:'gemini-1.5-pro-latest', name:'Gemini 1.5 Pro', free:false },
        { id:'gemini-1.5-flash-latest', name:'Gemini 1.5 Flash', free:true },
      ]},
      { id:'groq', name:'Groq', color:'#f59e0b', models:[
        { id:'llama-3.3-70b-versatile', name:'Llama 3.3 70B', free:true },
        { id:'llama-3.1-8b-instant', name:'Llama 3.1 8B', free:true },
        { id:'mixtral-8x7b-32768', name:'Mixtral 8x7B', free:true },
      ]},
      { id:'mistral', name:'Mistral', color:'#ec4899', models:[
        { id:'mistral-large-latest', name:'Mistral Large', free:false },
        { id:'mistral-small-latest', name:'Mistral Small', free:false },
      ]},
      { id:'groq', name:'Groq (free)', color:'#f59e0b', models:[] }, // kept for key lookup
    ];

    let selectedModels = new Set(JSON.parse(localStorage.getItem('era_orchestrator_models') || '[]'));
    let modelPanelOpen = false;

    function toggleModelPanel() {
      modelPanelOpen = !modelPanelOpen;
      const body    = document.getElementById('model-panel-body');
      const chips   = document.getElementById('selected-model-chips');
      const chevron = document.getElementById('model-panel-chevron');
      if (modelPanelOpen) { body.classList.remove('hidden'); chevron.style.transform = 'rotate(180deg)'; renderModelPanel(); }
      else                { body.classList.add('hidden');    chevron.style.transform = ''; }
      if (selectedModels.size > 0) chips.classList.remove('hidden');
    }

    function renderModelPanel() {
      const customModels = JSON.parse(localStorage.getItem('era_custom_models') || '[]');
      document.getElementById('model-panel-no-providers').classList.add('hidden');
      const customByProvider = {};
      customModels.forEach(m => { (customByProvider[m.provider] = customByProvider[m.provider]||[]).push(m); });

      // deduplicate providers by id
      const seen = new Set();
      const providers = PROVIDERS_META.filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return p.models.length > 0; });

      document.getElementById('model-panel-providers').innerHTML = providers.map(p => {
        const hasKey = !!getProviderKey(p.id);
        const allModels = [...p.models, ...(customByProvider[p.id]||[]).map(m=>({...m,custom:true}))];
        const chips = allModels.map(m => {
          const sel = selectedModels.has(p.id+'|'+m.id);
          const click = hasKey
            ? \`toggleOrcModel('\${p.id}','\${m.id.replace(/'/g,"\\\\'")}','\${(m.name||m.id).replace(/'/g,"\\\\'")}','\${p.name}','\${p.color}')\`
            : \`window.location.href='/ai-config?lang=\${lang}'\`;
          return \`<span class="model-chip \${sel?'selected':'unselected'} \${!hasKey?'opacity-50':''}" onclick="\${click}" title="\${m.id}">
            <span class="provider-dot" style="background:\${p.color}"></span>
            \${m.name||m.id}
            \${m.free?'<span style="color:#4ade80;font-size:9px">free</span>':''}
            \${m.custom?'<span style="color:#c084fc;font-size:9px">✦</span>':''}
          </span>\`;
        }).join('');
        return \`<div class="\${!hasKey?'opacity-70':''}">
          <div class="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style="color:\${p.color}">
            <span class="provider-dot" style="background:\${p.color}"></span>\${p.name}
            \${!hasKey?'<a href="/ai-config?lang=\${lang}" class="ml-auto text-[10px] text-gray-600 hover:text-orange-400 flex items-center gap-1"><i class="fas fa-lock"></i>key</a>':''}
          </div>
          <div class="flex flex-wrap gap-1.5">\${chips}</div>
        </div>\`;
      }).join('');
    }

    function toggleOrcModel(pid, mid, mName, pName, color) {
      const key = pid+'|'+mid;
      if (selectedModels.has(key)) { selectedModels.delete(key); }
      else {
        if (selectedModels.size >= 5) {
          const t = document.createElement('div');
          t.className = 'fixed bottom-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg z-50 text-sm';
          t.textContent = isRu?'Максимум 5 моделей':'Max 5 models';
          document.body.appendChild(t); setTimeout(()=>t.remove(),2000); return;
        }
        selectedModels.add(key);
        localStorage.setItem('era_orc_model_meta_'+key, JSON.stringify({modelName:mName,providerName:pName,color}));
      }
      localStorage.setItem('era_orchestrator_models', JSON.stringify([...selectedModels]));
      updateModelBadge(); updateSelectedChips();
      if (modelPanelOpen) renderModelPanel();
    }
    function updateModelBadge() { document.getElementById('model-count-badge').textContent = selectedModels.size+'/5'; }
    function updateSelectedChips() {
      const c = document.getElementById('selected-model-chips');
      if (!selectedModels.size) { c.classList.add('hidden'); c.innerHTML=''; return; }
      c.classList.remove('hidden');
      c.innerHTML = [...selectedModels].map(key => {
        const meta = JSON.parse(localStorage.getItem('era_orc_model_meta_'+key)||'{}');
        const [,mid] = key.split('|');
        const name = meta.modelName||mid.split('/').pop()||mid;
        const color = meta.color||'#888';
        return \`<span class="model-chip selected" style="background:\${color}22;border-color:\${color}66;color:#e2e8f0">
          <span class="provider-dot" style="background:\${color}"></span>\${name}
          <button onclick="event.stopPropagation();removeOrcModel('\${key.replace(/'/g,"\\\\'")}')">
            <i class="fas fa-times" style="font-size:9px;opacity:.7"></i>
          </button></span>\`;
      }).join('');
    }
    function removeOrcModel(key) {
      selectedModels.delete(key);
      localStorage.setItem('era_orchestrator_models', JSON.stringify([...selectedModels]));
      updateModelBadge(); updateSelectedChips(); if (modelPanelOpen) renderModelPanel();
    }
    function getSelectedModelsForApi() {
      return [...selectedModels].map(key => {
        const [pid, mid] = key.split('|');
        return { providerId:pid, modelId:mid, apiKey:getProviderKey(pid) };
      });
    }

    // ─── Generate Plan ───────────────────────────────────────────────────────
    async function generatePlan() {
      hideError();
      const task = document.getElementById('task-input').value.trim();
      if (!task) { showError(isRu?'Введите задачу':'Enter a task'); return; }

      const apiKey = getAnyKey();
      if (!apiKey) {
        showError(isRu
          ? 'Настройте API ключ хотя бы одного провайдера — нажмите AI Провайдеры в правом верхнем углу'
          : 'Configure at least one provider API key — click AI Providers in the top right');
        return;
      }

      const btn = document.getElementById('gen-btn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (isRu?'Генерация...':'Generating...');
      btn.disabled = true;
      document.getElementById('plan-container').style.display = 'none';
      document.getElementById('team-builder').style.display = 'none';

      try {
        const res = await fetch('/api/meta/plan', {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify({
            userPrompt: task,
            apiKey,
            freeModelsOnly: getFreeOnly(),
            userId: 'user',
            selectedModels: getSelectedModelsForApi().length ? getSelectedModelsForApi() : undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) { showError((data.error||'Plan generation failed') + (data.raw?' — raw: '+data.raw.slice(0,120):'')); return; }
        renderPlan(data.plan, data.reasoning);
      } catch(e) { showError(e.message||'Network error'); }
      finally {
        btn.innerHTML = '<i class="fas fa-magic"></i> ' + (isRu?'Сгенерировать план':'Generate Plan');
        btn.disabled = false;
      }
    }

    function renderPlan(plan, reasoning) {
      currentPlanId = plan.id;
      currentSteps  = plan.steps;

      document.getElementById('plan-strategy-badge').textContent = plan.strategy;
      document.getElementById('plan-cost').textContent = '~$' + plan.estimatedCostUsd.toFixed(3);
      document.getElementById('plan-time').textContent = Math.round(plan.estimatedSeconds/60) + ' min';
      document.getElementById('plan-agents-count').textContent = plan.steps.length + ' ' + (isRu?'агентов':'agents');
      document.getElementById('plan-reasoning').textContent = reasoning || '';

      const confirms = plan.steps.filter(s=>s.autonomyLevel==='REQUIRES_CONFIRMATION').length;
      document.getElementById('confirm-count').textContent =
        confirms + ' ' + (isRu ? (confirms===1?'подтверждение':'подтверждения') : 'confirmation'+(confirms!==1?'s':''));

      document.getElementById('plan-steps').innerHTML = plan.steps.map((s, i) => {
        const isLast    = i === plan.steps.length - 1;
        const isConfirm = s.autonomyLevel === 'REQUIRES_CONFIRMATION';
        const isBlocked = s.autonomyLevel === 'BLOCKED';
        return \`<div class="flex gap-3 py-2 \${isLast?'':'border-b border-gray-800/60'}">
          <div class="flex flex-col items-center pt-1">
            <div class="step-dot \${isBlocked?'bg-gray-600':isConfirm?'bg-yellow-500':'bg-green-500'}"></div>
            \${!isLast?'<div class="step-line flex-1 mx-auto mt-1" style="width:2px"></div>':''}
          </div>
          <div class="flex-1 pb-1">
            <div class="flex items-center gap-2 flex-wrap mb-0.5">
              <span class="agent-chip">
                <i class="fas \${roleIcon(s.agentRole)} \${roleColor(s.agentRole)} text-xs"></i>
                <span class="text-gray-300">\${roleName(s.agentRole)}</span>
              </span>
              <span class="text-xs px-2 py-0.5 rounded \${isBlocked?'bg-gray-500/10 text-gray-500':isConfirm?'bg-yellow-500/10 text-yellow-400':'bg-green-500/10 text-green-400'}">
                \${isBlocked?(isRu?'заблок':'blocked'):isConfirm?(isRu?'подтверждение':'confirm'):(isRu?'авто':'auto')}
              </span>
              <span class="text-xs text-gray-600">\${s.estimatedSeconds}s · $\${s.estimatedCostUsd.toFixed(4)}</span>
            </div>
            <p class="text-sm text-gray-300">\${s.action}</p>
          </div>
        </div>\`;
      }).join('');

      document.getElementById('plan-container').style.display = 'block';
      document.getElementById('plan-container').scrollIntoView({ behavior:'smooth', block:'nearest' });
    }

    // ─── Execute Plan ────────────────────────────────────────────────────────
    async function executePlan() {
      if (!currentPlanId) return;
      const apiKey = getAnyKey();
      if (!apiKey) { showError(isRu?'Укажите API ключ':'Set API key'); return; }

      document.getElementById('plan-container').style.display = 'none';
      document.getElementById('team-builder').style.display = 'none';
      document.getElementById('confirm-gate').style.display = 'none';
      document.getElementById('result-container').style.display = 'none';
      document.getElementById('exec-container').style.display = 'block';
      document.getElementById('exec-title').textContent = isRu?'Выполнение...':'Executing...';
      document.getElementById('exec-steps').innerHTML =
        '<p class="text-sm text-gray-500"><i class="fas fa-spinner fa-spin mr-2"></i>' +
        (isRu?'Запуск шагов...':'Running steps...') + '</p>';

      try {
        const res = await fetch('/api/meta/plans/'+currentPlanId+'/execute', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ apiKey, userId:'user' }),
        });
        const data = await res.json();
        if (!res.ok && res.status !== 500) {
          showError(data.error||'Execution failed');
          document.getElementById('exec-container').style.display = 'none';
          document.getElementById('plan-container').style.display = 'block';
          return;
        }
        renderExecSteps(data.steps||[]);
        document.getElementById('exec-progress-label').textContent =
          (data.completedSteps||0) + ' / ' + (data.totalSteps||0);
        if (data.status === 'paused' && data.pausedAt) {
          pausedStepId = data.pausedAt.stepId;
          document.getElementById('gate-action-text').textContent = data.pausedAt.action;
          document.getElementById('confirm-gate').style.display = 'block';
          document.getElementById('exec-title').textContent = isRu?'⏸ Ожидание подтверждения':'⏸ Awaiting confirmation';
        } else if (data.status === 'completed') {
          renderResult(data);
        } else if (data.status === 'failed' && data.failedAt) {
          showError((isRu?'Ошибка на шаге ':'Error at step ') + data.failedAt.orderIndex + ': ' + data.failedAt.error);
        }
        loadRecentRuns();
      } catch(e) {
        showError(e.message||'Network error');
        document.getElementById('exec-container').style.display = 'none';
        document.getElementById('plan-container').style.display = 'block';
      }
    }

    function renderExecSteps(steps) {
      const iconFor = s => ({done:'<i class="fas fa-check text-green-400 text-xs"></i>',failed:'<i class="fas fa-times text-red-400 text-xs"></i>',skipped:'<i class="fas fa-ban text-gray-500 text-xs"></i>',pending_confirmation:'<i class="fas fa-shield-alt text-yellow-400 text-xs"></i>'}[s]||'<i class="fas fa-spinner fa-spin text-blue-400 text-xs"></i>');
      const lblFor  = s => ({done:isRu?'готово':'done',failed:isRu?'ошибка':'failed',skipped:isRu?'пропущено':'skipped',pending_confirmation:isRu?'ждёт':'pending'}[s]||'...');
      document.getElementById('exec-steps').innerHTML = steps.map(s => \`
        <div class="flex items-start gap-3 p-2 rounded-lg bg-gray-800/40">
          <div class="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">\${iconFor(s.status)}</div>
          <div class="flex-1 min-w-0">
            <p class="text-xs text-gray-500">\${roleName(s.agentRole)}</p>
            <p class="text-sm text-gray-300 truncate">\${s.action}</p>
            \${s.outputData?'<p class="text-xs text-gray-500 mt-1 line-clamp-2">'+escHtml(s.outputData.slice(0,200))+'</p>':''}
          </div>
          <span class="text-xs flex-shrink-0 \${s.status==='done'?'text-green-400':s.status==='failed'?'text-red-400':s.status==='pending_confirmation'?'text-yellow-400':'text-gray-500'}">\${lblFor(s.status)}</span>
        </div>\`).join('');
    }

    function renderResult(data) {
      document.getElementById('exec-container').style.display = 'none';
      document.getElementById('result-container').style.display = 'block';
      document.getElementById('result-cost').textContent =
        (isRu?'Стоимость: ':'Cost: ') + '$' + (data.accumulatedCostUsd||0).toFixed(4);
      const done = (data.steps||[]).filter(s=>s.status==='done'&&s.outputData);
      document.getElementById('result-content').innerHTML = done.length
        ? done.map(s=>\`<div class="bg-gray-800/40 rounded-lg p-3">
            <p class="text-xs text-gray-500 mb-1">\${roleName(s.agentRole)} · \${isRu?'шаг':'step'} \${s.orderIndex}</p>
            <div class="result-md">\${renderMd(s.outputData)}</div>
          </div>\`).join('')
        : '<p class="text-gray-400 text-sm">'+(isRu?'Выполнено.':'Completed.')+'</p>';
    }

    // ─── Autonomy Gate ───────────────────────────────────────────────────────
    async function approveGate() {
      if (!currentPlanId || !pausedStepId) return;
      document.getElementById('confirm-gate').style.display = 'none';
      try {
        await fetch('/api/meta/plans/'+currentPlanId+'/steps/'+pausedStepId+'/confirm', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ userId:'user', note:'Approved by user' }),
        });
        pausedStepId = null;
        await executePlan();
      } catch(e) { showError(e.message||'Confirm failed'); }
    }
    function rejectGate() {
      document.getElementById('confirm-gate').style.display = 'none';
      document.getElementById('exec-container').style.display = 'none';
      showError(isRu?'Выполнение остановлено.':'Execution stopped.');
    }

    // ─── Team Builder ────────────────────────────────────────────────────────
    function openTeamBuilder() {
      if (!currentSteps.length) return;
      teams = [];
      renderTeamBuilder();
      document.getElementById('team-builder').style.display = 'block';
      document.getElementById('team-builder').scrollIntoView({ behavior:'smooth', block:'start' });
    }
    function closeTeamBuilder() { document.getElementById('team-builder').style.display = 'none'; }
    window.openTeamBuilder = openTeamBuilder;
    window.closeTeamBuilder = closeTeamBuilder;

    function addTeam() {
      const nameEl  = document.getElementById('new-team-name');
      const colorEl = document.getElementById('new-team-color');
      const name    = nameEl.value.trim() || (isRu?'Команда':'Team') + ' ' + (teams.length+1);
      teams.push({ id: 'team_' + Date.now(), name, color: colorEl.value, members: [] });
      nameEl.value = '';
      renderTeamBuilder();
    }
    window.addTeam = addTeam;

    function assignToTeam(stepIdx, teamId) {
      // Remove from any existing team first
      teams.forEach(t => { t.members = t.members.filter(m => m !== stepIdx); });
      if (teamId !== '__unassign__') {
        const team = teams.find(t => t.id === teamId);
        if (team) team.members.push(stepIdx);
      }
      renderTeamBuilder();
    }
    window.assignToTeam = assignToTeam;

    function removeTeam(teamId) {
      teams = teams.filter(t => t.id !== teamId);
      renderTeamBuilder();
    }
    window.removeTeam = removeTeam;

    function renderTeamBuilder() {
      const assignedIndices = new Set(teams.flatMap(t => t.members));

      // Unassigned agents
      document.getElementById('tb-unassigned').innerHTML = currentSteps.map((s, i) => {
        const assigned = assignedIndices.has(i);
        const myTeam   = teams.find(t => t.members.includes(i));
        return \`<div class="step-card \${assigned?'assigned':''} flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/40 border border-gray-700/40">
          <i class="fas \${roleIcon(s.agentRole)} \${roleColor(s.agentRole)} flex-shrink-0" style="font-size:12px;width:14px;text-align:center"></i>
          <span class="text-xs text-gray-300 flex-1 truncate">\${roleName(s.agentRole)}</span>
          \${myTeam?'<span class="team-tag" style="background:'+myTeam.color+'33;color:'+myTeam.color+'">'+myTeam.name+'</span>':''}
          <select onchange="assignToTeam(\${i},this.value)" class="bg-gray-900 border border-gray-700 rounded px-1.5 py-0.5 text-xs text-gray-300 focus:outline-none" style="max-width:110px">
            <option value="__unassign__">${isRu?'— без команды':'— unassigned'}</option>
            \${teams.map(t=>\`<option value="\${t.id}" \${myTeam&&myTeam.id===t.id?'selected':''}>\${t.name}</option>\`).join('')}
          </select>
        </div>\`;
      }).join('') || '<p class="text-xs text-gray-600">' + (isRu?'Нет шагов':'No steps') + '</p>';

      // Teams
      const teamsDiv = document.getElementById('tb-teams');
      const noTeams  = document.getElementById('tb-no-teams');
      if (!teams.length) {
        teamsDiv.innerHTML = ''; noTeams.style.display = ''; return;
      }
      noTeams.style.display = 'none';
      teamsDiv.innerHTML = teams.map(t => {
        const members = t.members.map(i => currentSteps[i]).filter(Boolean);
        return \`<div class="team-slot \${members.length?'has-members':''}" style="border-color:\${members.length?t.color+'55':''}">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-semibold" style="color:\${t.color}">\${t.name}</span>
            <button onclick="removeTeam('\${t.id}')" class="text-gray-600 hover:text-red-400 transition" style="font-size:10px"><i class="fas fa-trash"></i></button>
          </div>
          \${members.length
            ? members.map(s=>\`<div class="flex items-center gap-1.5 text-xs text-gray-400 mb-0.5">
                <i class="fas \${roleIcon(s.agentRole)} \${roleColor(s.agentRole)}" style="font-size:10px;width:12px;text-align:center"></i>
                \${roleName(s.agentRole)}
              </div>\`).join('')
            : '<p class="text-[10px] text-gray-700">' + (isRu?'Назначьте агентов слева':'Assign agents from left') + '</p>'
          }
        </div>\`;
      }).join('');

      // Show save row only if at least one team has members
      const hasFilled = teams.some(t => t.members.length > 0);
      document.getElementById('tb-save-row').classList.toggle('hidden', !hasFilled);
    }

    async function saveAllTeams() {
      const filledTeams = teams.filter(t => t.members.length > 0);
      if (!filledTeams.length) return;
      const apiKey = getAnyKey();
      let saved = 0;
      for (const t of filledTeams) {
        const members = t.members.map(i => currentSteps[i]).filter(Boolean);
        const leadRole = members[0]?.agentRole || 'coordinator';
        try {
          await fetch('/api/meta/agents', {
            method:'POST', headers:{'Content-Type':'application/json','X-API-Key':apiKey},
            body: JSON.stringify({
              nameEn: t.name, nameRu: t.name,
              role: leadRole,
              instructions: 'Team goal: ' + document.getElementById('task-input').value.slice(0,200),
              agents: members.map(s => ({ role: s.agentRole, action: s.action })),
              color: t.color, teamSize: members.length,
            }),
          });
          saved++;
        } catch {}
      }
      if (saved > 0) {
        const msg = (isRu?'Сохранено команд: ':'Teams saved: ') + saved;
        const t = document.createElement('div');
        t.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50 text-sm';
        t.textContent = msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2500);
        loadSavedTeams();
      }
    }
    window.saveAllTeams = saveAllTeams;

    function executeWithTeams() { saveAllTeams().then(() => executePlan()); }
    window.executeWithTeams = executeWithTeams;

    // ─── Saved teams in right sidebar ────────────────────────────────────────
    async function loadSavedTeams() {
      try {
        const res = await fetch('/api/meta/agents');
        if (!res.ok) return;
        const data = await res.json();
        const agents = (data.agents || []).filter(a => a.teamSize > 1 || a.agents?.length > 0);
        const el = document.getElementById('saved-teams-list');
        if (!agents.length) {
          el.innerHTML = '<p class="text-xs text-gray-600 italic">' + (isRu?'Нет сохранённых команд':'No saved teams yet') + '</p>';
          return;
        }
        el.innerHTML = agents.slice(0,5).map(a => \`
          <div class="flex items-center gap-2.5 p-2 rounded-lg bg-gray-800/40 hover:bg-gray-800 transition cursor-pointer"
               onclick="window.location.href='/meta?lang=\${lang}&task='+encodeURIComponent(a.instructions||'')">
            <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                 style="background:\${(a.color||'#6366f1')}22;border:1px solid \${(a.color||'#6366f1')}44">
              <i class="fas fa-people-group" style="font-size:11px;color:\${a.color||'#818cf8'}"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-medium text-white truncate">\${a.nameRu||a.nameEn||a.role}</p>
              <p class="text-[10px] text-gray-500">\${(a.teamSize||1)} ${isRu?'агентов':'agents'} · \${roleName(a.role)}</p>
            </div>
            <i class="fas fa-play text-gray-600 hover:text-green-400 transition flex-shrink-0" style="font-size:10px"
               onclick="event.stopPropagation();launchTeam(\${a.id})"></i>
          </div>\`).join('');
      } catch {}
    }

    function launchTeam(teamId) {
      window.location.href = '/meta-agents?lang=' + lang + '&team=' + teamId;
    }
    window.launchTeam = launchTeam;

    // ─── Recent runs ─────────────────────────────────────────────────────────
    async function loadRecentRuns() {
      try {
        const res = await fetch('/api/meta/logs?limit=5');
        if (!res.ok) return;
        const data = await res.json();
        const logs = data.logs || [];
        const el = document.getElementById('recent-runs');
        if (!logs.length) { el.innerHTML = '<p class="text-xs text-gray-600">' + (isRu?'Нет запусков':'No runs yet') + '</p>'; return; }
        el.innerHTML = logs.map(l => \`
          <div class="flex items-center justify-between py-1">
            <div class="flex items-center gap-1.5 min-w-0 text-xs">
              <span>\${l.status==='success'?'✅':l.status==='error'?'❌':'⏳'}</span>
              <span class="text-gray-400 truncate max-w-[120px]">\${l.action.slice(0,40)}</span>
            </div>
            <span class="text-xs text-green-400 flex-shrink-0">$\${(l.costUsd||0).toFixed(3)}</span>
          </div>\`).join('');
      } catch {}
    }

    // ─── Init ─────────────────────────────────────────────────────────────────
    updateKeyStatus();
    updateModelBadge();
    updateSelectedChips();
    loadRecentRuns();
    loadSavedTeams();

    // Pre-fill from URL params (from Scenarios / Research / Meta-Agents)
    const _p = new URLSearchParams(location.search);
    if (_p.get('task')) {
      const el = document.getElementById('task-input');
      if (el) el.value = decodeURIComponent(_p.get('task'));
    }
    if (_p.get('strategy')) {
      const sel = document.getElementById('strategy-select');
      if (sel && [...sel.options].some(o=>o.value===_p.get('strategy'))) sel.value = _p.get('strategy');
    }
    if (_p.get('mode')) {
      const sel = document.getElementById('mode-select');
      if (sel && [...sel.options].some(o=>o.value===_p.get('mode'))) sel.value = _p.get('mode');
    }
  </script>
</body>
</html>`
}
