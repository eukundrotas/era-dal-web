import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const researchPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const title = isRu ? 'AI & LM Исследования' : 'AI & LM Research'
  const subtitle = isRu
    ? 'Инструменты для научных исследований с языковыми моделями: обзор литературы, анализ гипотез, рецензирование'
    : 'AI-powered research tools: literature review, hypothesis analysis, peer review, LM benchmarking'

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(title, subtitle, lang)}
  <script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.9/dist/purify.min.js"></script>
  <style>
    .result-md { font-size:13px; line-height:1.65; color:#d1d5db; word-break:break-word; }
    .result-md > *:first-child { margin-top:0; }
    .result-md h1,.result-md h2,.result-md h3,.result-md h4 { color:#fff; font-weight:600; margin:.9em 0 .45em; }
    .result-md h2{font-size:1.16em} .result-md h3{font-size:1.05em}
    .result-md p{margin:.5em 0} .result-md ul,.result-md ol{margin:.5em 0;padding-left:1.4em} .result-md li{margin:.22em 0}
    .result-md strong{color:#fff} .result-md a{color:#818cf8;text-decoration:underline}
    .result-md code{background:rgba(255,255,255,.08);padding:1px 5px;border-radius:4px;font-size:.9em}
    .result-md pre{background:rgba(0,0,0,.4);padding:10px 12px;border-radius:8px;overflow-x:auto;margin:.6em 0}
    .result-md pre code{background:none;padding:0}
    .result-md table{border-collapse:collapse;width:100%;margin:.7em 0;font-size:12px;display:block;overflow-x:auto}
    .result-md th,.result-md td{border:1px solid rgba(255,255,255,.12);padding:6px 9px;text-align:left}
    .result-md th{background:rgba(255,255,255,.06);color:#e5e7eb;font-weight:600}
    .result-md blockquote{border-left:3px solid rgba(139,92,246,.5);padding-left:10px;color:#9ca3af;margin:.6em 0}
    .workflow-card { transition: all 0.2s; cursor: pointer; }
    .workflow-card:hover { transform: translateY(-2px); border-color: rgba(139,92,246,0.5) !important; }
    .workflow-card.active { border-color: rgba(139,92,246,0.7) !important; background: rgba(139,92,246,0.1) !important; }
    .agent-tag { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:12px; font-size:11px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.05); }
    .model-badge { padding:2px 8px; border-radius:12px; font-size:10px; font-weight:600; }
    .benchmark-bar { height:6px; border-radius:3px; background:rgba(255,255,255,0.08); overflow:hidden; }
    .benchmark-fill { height:100%; border-radius:3px; transition: width 0.5s ease; }
    .pulse { animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
    .fade-in { animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('research', lang)}

  <main class="ml-56 pt-4 min-h-screen">
    <div class="p-6 max-w-7xl">

      <!-- Header -->
      <div class="mb-6 flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
              <i class="fas fa-microscope text-white text-sm"></i>
            </div>
            <h1 class="text-2xl font-bold">${title}</h1>
            <span class="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Beta</span>
          </div>
          <p class="text-gray-400 ml-12">${subtitle}</p>
        </div>
        <button onclick="openNewResearch()"
          class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
          <i class="fas fa-plus"></i>
          ${isRu ? 'Новое исследование' : 'New Research'}
        </button>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        ${[
          { icon:'fa-file-alt', color:'text-blue-400', bg:'from-blue-600/20 to-blue-800/10', value:'0', label: isRu ? 'Исследований' : 'Studies' },
          { icon:'fa-robot', color:'text-violet-400', bg:'from-violet-600/20 to-violet-800/10', value:'12', label: isRu ? 'LM агентов' : 'LM Agents' },
          { icon:'fa-book-open', color:'text-emerald-400', bg:'from-emerald-600/20 to-emerald-800/10', value:'0', label: isRu ? 'Источников' : 'Sources reviewed' },
          { icon:'fa-check-double', color:'text-yellow-400', bg:'from-yellow-600/20 to-yellow-800/10', value:'0', label: isRu ? 'Рецензий' : 'Reviews done' },
        ].map(s => `
          <div class="glass rounded-xl p-4 bg-gradient-to-br ${s.bg}">
            <i class="fas ${s.icon} ${s.color} text-lg mb-2 block"></i>
            <p class="text-2xl font-bold text-white">${s.value}</p>
            <p class="text-xs text-gray-500">${s.label}</p>
          </div>`).join('')}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- LEFT 2/3: Workflows + Active research -->
        <div class="lg:col-span-2 space-y-5">

          <!-- Research Workflow Templates -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <i class="fas fa-route text-emerald-400"></i>
              ${isRu ? 'Рабочие процессы' : 'Research Workflows'}
            </h3>
            <div class="grid grid-cols-2 gap-3" id="workflow-grid">
              ${[
                { id:'literature', icon:'fa-book', color:'text-blue-400', border:'border-blue-500/20',
                  title: isRu ? 'Обзор литературы' : 'Literature Review',
                  desc:  isRu ? 'Автоматический поиск, анализ и синтез научных источников' : 'Auto-search, analyse and synthesise research sources',
                  agents: isRu ? ['Литературный обзор','Рецензент','Аналитик'] : ['Literature Researcher','Peer Reviewer','Analyst'],
                  prompt: isRu ? 'Сделай обзор литературы по теме: ' : 'Conduct a literature review on: ',
                },
                { id:'hypothesis', icon:'fa-lightbulb', color:'text-yellow-400', border:'border-yellow-500/20',
                  title: isRu ? 'Генерация гипотез' : 'Hypothesis Generation',
                  desc:  isRu ? 'Формулировка и проверка научных гипотез методом первых принципов' : 'Formulate and test scientific hypotheses using first-principles reasoning',
                  agents: isRu ? ['Учёный-исследователь','Критик','Эксперт'] : ['Research Scientist','Critic','Expert Panel'],
                  prompt: isRu ? 'Сформулируй гипотезы для исследования: ' : 'Generate hypotheses for studying: ',
                },
                { id:'peer_review', icon:'fa-user-check', color:'text-purple-400', border:'border-purple-500/20',
                  title: isRu ? 'Рецензирование' : 'Peer Review',
                  desc:  isRu ? 'Критическая оценка методологии, статистики и валидности' : 'Critical evaluation of methodology, statistics and validity',
                  agents: isRu ? ['Рецензент','Статист','Критик'] : ['Peer Reviewer','Data Scientist','Critic'],
                  prompt: isRu ? 'Проведи рецензию научной работы: ' : 'Peer review this research paper: ',
                },
                { id:'lm_eval', icon:'fa-chart-bar', color:'text-orange-400', border:'border-orange-500/20',
                  title: isRu ? 'Оценка LM' : 'LM Benchmarking',
                  desc:  isRu ? 'Сравнительный анализ языковых моделей для исследовательских задач' : 'Benchmark LLMs for specific research tasks and domains',
                  agents: isRu ? ['ML-инженер','Аналитик','Учёный'] : ['ML Engineer','Analyst','Research Scientist'],
                  prompt: isRu ? 'Сравни языковые модели для задачи: ' : 'Benchmark language models for: ',
                },
                { id:'experiment', icon:'fa-vials', color:'text-pink-400', border:'border-pink-500/20',
                  title: isRu ? 'Дизайн эксперимента' : 'Experiment Design',
                  desc:  isRu ? 'Планирование A/B-тестов, выбор метрик, оценка статистической мощности' : 'Design A/B tests, choose metrics, assess statistical power',
                  agents: isRu ? ['Дизайнер экспериментов','Статист','Аналитик'] : ['Experiment Designer','Data Scientist','Analyst'],
                  prompt: isRu ? 'Спроектируй эксперимент для проверки: ' : 'Design an experiment to test: ',
                },
                { id:'synthesis', icon:'fa-project-diagram', color:'text-cyan-400', border:'border-cyan-500/20',
                  title: isRu ? 'Синтез знаний' : 'Knowledge Synthesis',
                  desc:  isRu ? 'Объединение результатов из нескольких источников в единый нарратив' : 'Merge findings from multiple sources into a coherent narrative',
                  agents: isRu ? ['Исследователь','Аналитик','Автор'] : ['Researcher','Analyst','Writer'],
                  prompt: isRu ? 'Синтезируй знания по теме: ' : 'Synthesise knowledge on: ',
                },
              ].map(w => `
                <div class="workflow-card glass rounded-xl p-4 border ${w.border}" onclick="selectWorkflow('${w.id}','${(w.prompt as string).replace(/'/g,"\\'")}')">
                  <div class="flex items-center gap-2 mb-2">
                    <i class="fas ${w.icon} ${w.color}"></i>
                    <span class="font-medium text-sm text-white">${w.title}</span>
                  </div>
                  <p class="text-xs text-gray-500 mb-3 leading-relaxed">${w.desc}</p>
                  <div class="flex flex-wrap gap-1">
                    ${(w.agents as string[]).map(a => `<span class="agent-tag">${a}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Research Prompt Area -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <i class="fas fa-flask text-emerald-400"></i>
              ${isRu ? 'Запустить исследование' : 'Run Research Task'}
              <span id="active-workflow-badge" class="hidden text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 ml-1"></span>
            </h3>
            <textarea id="research-prompt" rows="4"
              placeholder="${isRu ? 'Введите тему или вопрос исследования...' : 'Enter your research topic or question...'}"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition resize-none text-sm leading-relaxed mb-3"></textarea>

            <!-- Options row -->
            <div class="flex items-center gap-3 mb-3 flex-wrap">
              <select id="research-depth"
                class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-emerald-500">
                <option value="quick">${isRu ? '⚡ Быстрый (1 агент)' : '⚡ Quick (1 agent)'}</option>
                <option value="standard" selected>${isRu ? '🔬 Стандартный (3 агента)' : '🔬 Standard (3 agents)'}</option>
                <option value="deep">${isRu ? '🧬 Глубокий (5+ агентов)' : '🧬 Deep (5+ agents)'}</option>
              </select>
              <select id="research-domain"
                class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-emerald-500">
                <option value="general">${isRu ? '🌐 Общий' : '🌐 General'}</option>
                <option value="ai_ml">${isRu ? '🤖 AI / ML' : '🤖 AI / ML'}</option>
                <option value="nlp">${isRu ? '💬 NLP / LM' : '💬 NLP / LM'}</option>
                <option value="medicine">${isRu ? '🩺 Медицина' : '🩺 Medicine'}</option>
                <option value="physics">${isRu ? '⚛️ Физика' : '⚛️ Physics'}</option>
                <option value="biology">${isRu ? '🧬 Биология' : '🧬 Biology'}</option>
                <option value="economics">${isRu ? '📊 Экономика' : '📊 Economics'}</option>
                <option value="math">${isRu ? '📐 Математика' : '📐 Mathematics'}</option>
              </select>
              <label class="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer">
                <input type="checkbox" id="peer-review-toggle" class="rounded border-gray-600 bg-gray-800 text-emerald-500">
                ${isRu ? 'Авто-рецензирование' : 'Auto peer-review'}
              </label>
            </div>

            <div class="flex gap-2">
              <button onclick="runResearch()" id="research-btn"
                class="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-6 py-2.5 rounded-lg transition flex items-center justify-center gap-2 text-sm font-medium">
                <i id="research-icon" class="fas fa-play"></i>
                <span id="research-label">${isRu ? 'Запустить' : 'Run Research'}</span>
              </button>
              <button onclick="sendToOrchestrator()"
                class="border border-gray-600 hover:border-emerald-500/50 text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-sm transition flex items-center gap-2"
                title="${isRu ? 'Открыть в Meta-Orchestrator' : 'Open in Meta-Orchestrator'}">
                <i class="fas fa-sitemap text-violet-400"></i>
                Meta
              </button>
            </div>

            <!-- Error banner -->
            <div id="research-error" style="display:none"
              class="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-start gap-2">
              <i class="fas fa-exclamation-circle mt-0.5 flex-shrink-0"></i>
              <span id="research-error-text"></span>
            </div>
          </div>

          <!-- Results area -->
          <div id="research-result-area" style="display:none" class="glass rounded-xl p-5 fade-in">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold flex items-center gap-2">
                <i class="fas fa-check-circle text-emerald-400"></i>
                ${isRu ? 'Результат исследования' : 'Research Output'}
              </h3>
              <div id="research-meta" class="text-xs text-gray-500 flex items-center gap-3"></div>
            </div>
            <div id="research-result-content" class="result-md"></div>
            <div class="mt-4 pt-3 border-t border-gray-800 flex gap-2">
              <button onclick="copyResult()"
                class="text-xs px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 hover:text-white transition flex items-center gap-1.5">
                <i class="fas fa-copy"></i>${isRu ? 'Копировать' : 'Copy'}
              </button>
              <button onclick="saveToJournal()"
                class="text-xs px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 hover:text-white transition flex items-center gap-1.5">
                <i class="fas fa-scroll"></i>${isRu ? 'В журнал' : 'Save to Journal'}
              </button>
              <button onclick="sendToOrchestrator()"
                class="text-xs px-3 py-1.5 rounded-lg bg-violet-900/60 hover:bg-violet-800 border border-violet-700 text-violet-300 transition flex items-center gap-1.5">
                <i class="fas fa-sitemap"></i>${isRu ? 'Расширить в Orchestrator' : 'Expand in Orchestrator'}
              </button>
            </div>
          </div>
        </div>

        <!-- RIGHT: LM Leaderboard + Research Agents -->
        <div class="space-y-5">

          <!-- LM Leaderboard for Research -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              <i class="fas fa-trophy text-yellow-400"></i>
              ${isRu ? 'LM для исследований' : 'LM Leaderboard'}
              <span class="ml-auto text-xs text-gray-500">${isRu ? 'на задачах исследования' : 'research tasks'}</span>
            </h3>
            <div class="space-y-3">
              ${[
                { name:'Claude Opus 4.8',   provider:'Anthropic', score:96, color:'#f97316', badge:'S', badgeColor:'bg-orange-500' },
                { name:'GPT-4o',            provider:'OpenAI',    score:93, color:'#10b981', badge:'A+', badgeColor:'bg-green-600' },
                { name:'Gemini 1.5 Pro',    provider:'Google',    score:91, color:'#8b5cf6', badge:'A+', badgeColor:'bg-violet-600' },
                { name:'Claude Sonnet 4.6', provider:'Anthropic', score:89, color:'#f97316', badge:'A', badgeColor:'bg-orange-600' },
                { name:'DeepSeek R1',       provider:'DeepSeek',  score:87, color:'#3b82f6', badge:'A', badgeColor:'bg-blue-600' },
                { name:'Llama 3.3 70B',     provider:'Meta',      score:82, color:'#6366f1', badge:'B+', badgeColor:'bg-indigo-600' },
                { name:'Mistral Large',     provider:'Mistral',   score:80, color:'#ec4899', badge:'B+', badgeColor:'bg-pink-600' },
              ].map((m, i) => `
                <div class="flex items-center gap-2.5">
                  <span class="text-xs text-gray-600 w-4 flex-shrink-0">${i+1}</span>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-0.5">
                      <span class="text-xs text-white font-medium truncate">${m.name}</span>
                      <span class="model-badge ${m.badgeColor} text-white ml-1 flex-shrink-0">${m.badge}</span>
                    </div>
                    <div class="benchmark-bar">
                      <div class="benchmark-fill" style="width:${m.score}%;background:${m.color}"></div>
                    </div>
                  </div>
                  <span class="text-xs text-gray-400 w-7 text-right flex-shrink-0">${m.score}</span>
                </div>
              `).join('')}
            </div>
            <p class="text-[10px] text-gray-600 mt-3">${isRu ? '* Оценка по задачам: обзор литературы, анализ гипотез, рецензирование' : '* Score across: literature review, hypothesis analysis, peer review'}</p>
          </div>

          <!-- Research Agents -->
          <div class="glass rounded-xl p-5">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <i class="fas fa-users text-emerald-400"></i>
              ${isRu ? 'Исследовательские агенты' : 'Research Agents'}
            </h3>
            <div class="space-y-1.5">
              ${[
                { role:'research_scientist',    icon:'fa-atom',         color:'text-blue-400',    nameEn:'Research Scientist',     nameRu:'Учёный-исследователь',    descEn:'First-principles reasoning & hypothesis formation', descRu:'Рассуждения от первых принципов' },
                { role:'literature_researcher', icon:'fa-book-open',    color:'text-orange-400',  nameEn:'Literature Researcher',  nameRu:'Литературный обзор',       descEn:'Searches & synthesises academic sources', descRu:'Ищет и синтезирует академические источники' },
                { role:'data_scientist',        icon:'fa-chart-area',   color:'text-fuchsia-400', nameEn:'Data Scientist',         nameRu:'Дата-сайентист',           descEn:'Statistical analysis & modelling', descRu:'Статанализ и моделирование' },
                { role:'experiment_designer',   icon:'fa-vials',        color:'text-pink-400',    nameEn:'Experiment Designer',    nameRu:'Дизайнер экспериментов',   descEn:'A/B tests, statistical power', descRu:'A/B-тесты, статистическая мощность' },
                { role:'peer_reviewer',         icon:'fa-user-check',   color:'text-purple-400',  nameEn:'Peer Reviewer',          nameRu:'Рецензент',                descEn:'Evaluates methodology & bias', descRu:'Оценивает методологию и предвзятость' },
                { role:'ml_engineer',           icon:'fa-brain',        color:'text-indigo-400',  nameEn:'ML Engineer',            nameRu:'ML-инженер',               descEn:'Training pipelines & evaluation', descRu:'Пайплайны обучения и оценка' },
                { role:'llm_engineer',          icon:'fa-robot',        color:'text-violet-400',  nameEn:'LLM Engineer',           nameRu:'LLM-инженер',              descEn:'RAG, fine-tuning, prompting', descRu:'RAG, дообучение, промпты' },
                { role:'prompt_engineer',       icon:'fa-terminal',     color:'text-cyan-400',    nameEn:'Prompt Engineer',        nameRu:'Промпт-инженер',           descEn:'Crafts & optimises prompts', descRu:'Создаёт и оптимизирует промпты' },
              ].map(a => `
                <div class="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-800/50 group transition cursor-pointer"
                     onclick="quickTestAgent('${a.role}','${isRu ? a.nameRu : a.nameEn}')">
                  <i class="fas ${a.icon} ${a.color} flex-shrink-0" style="font-size:12px;width:14px;text-align:center"></i>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-medium text-white truncate">${isRu ? a.nameRu : a.nameEn}</p>
                    <p class="text-[10px] text-gray-600 truncate">${isRu ? a.descRu : a.descEn}</p>
                  </div>
                  <i class="fas fa-play text-gray-700 group-hover:text-emerald-400 transition flex-shrink-0" style="font-size:9px"></i>
                </div>
              `).join('')}
            </div>
            <a href="/agents?lang=${lang}" class="mt-3 w-full flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-emerald-400 transition py-1.5 border border-dashed border-gray-700 hover:border-emerald-600/40 rounded-lg">
              <i class="fas fa-external-link-alt"></i>
              ${isRu ? 'Все агенты →' : 'All agents →'}
            </a>
          </div>

          <!-- Quick LM Facts -->
          <div class="glass rounded-xl p-4">
            <h3 class="font-semibold mb-3 flex items-center gap-2 text-sm">
              <i class="fas fa-info-circle text-blue-400"></i>
              ${isRu ? 'LM в исследованиях' : 'LMs in Research'}
            </h3>
            <div class="space-y-2 text-xs text-gray-400">
              <p><i class="fas fa-check text-green-400 mr-1.5"></i>${isRu ? 'GPT-4o превосходит аспирантов в 52% медицинских задач (2025)' : 'GPT-4o outperforms PhD students in 52% of medical tasks (2025)'}</p>
              <p><i class="fas fa-check text-green-400 mr-1.5"></i>${isRu ? 'LLM ускоряют обзор литературы в 10–100× раз' : 'LLMs speed up literature review 10–100× vs manual'}</p>
              <p><i class="fas fa-check text-green-400 mr-1.5"></i>${isRu ? 'Claude & GPT-4o показывают >85% согласия с рецензентами' : 'Claude & GPT-4o show >85% agreement with human reviewers'}</p>
              <p><i class="fas fa-check text-green-400 mr-1.5"></i>${isRu ? 'DeepSeek R1 (free) — лучшее соотношение цена/качество для STEM' : 'DeepSeek R1 (free) — best cost/quality ratio for STEM'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Quick test panel (slide-in) -->
  <div id="quick-test-panel" style="display:none"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div class="glass rounded-2xl p-6 w-full max-w-lg mx-4">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-semibold">${isRu ? 'Тест агента' : 'Test Agent'}</h3>
          <p id="qt-agent-name" class="text-sm text-gray-400 mt-0.5"></p>
        </div>
        <button onclick="closeQuickTest()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button>
      </div>
      <textarea id="qt-prompt" rows="3"
        placeholder="${isRu ? 'Введите исследовательский вопрос...' : 'Enter your research question...'}"
        class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500 resize-none mb-3"></textarea>
      <button onclick="runQuickTest()"
        class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
        <i id="qt-icon" class="fas fa-play"></i>
        <span id="qt-label">${isRu ? 'Запустить' : 'Run'}</span>
      </button>
      <div id="qt-result" class="hidden mt-4 max-h-64 overflow-y-auto result-md bg-gray-800/50 rounded-xl p-4"></div>
    </div>
  </div>

  <script>
    const isRu = ${isRu};
    const lang = '${lang}';
    let activeWorkflow = null;
    let activeAgentRole = '';
    let lastResult = '';

    function renderMd(s) {
      if (!s) return '';
      try {
        const raw = window.marked ? window.marked.parse(s) : s.replace(/\\n/g,'<br>');
        return window.DOMPurify ? window.DOMPurify.sanitize(raw) : raw;
      } catch { return s; }
    }

    function selectWorkflow(id, prompt) {
      activeWorkflow = id;
      document.querySelectorAll('.workflow-card').forEach(c => c.classList.remove('active'));
      const cards = document.querySelectorAll('.workflow-card');
      cards.forEach(c => { if(c.getAttribute('onclick') && c.getAttribute('onclick').includes("'" + id + "'")) c.classList.add('active'); });
      const ta = document.getElementById('research-prompt');
      if (!ta.value || ta.value.startsWith(prompt.slice(0,10))) ta.value = prompt;
      ta.focus();
      const badge = document.getElementById('active-workflow-badge');
      const labels = {
        literature: isRu ? 'Обзор литературы' : 'Literature Review',
        hypothesis: isRu ? 'Гипотезы' : 'Hypotheses',
        peer_review: isRu ? 'Рецензирование' : 'Peer Review',
        lm_eval:    isRu ? 'Оценка LM' : 'LM Eval',
        experiment: isRu ? 'Эксперимент' : 'Experiment',
        synthesis:  isRu ? 'Синтез' : 'Synthesis',
      };
      badge.textContent = labels[id] || id;
      badge.classList.remove('hidden');
    }
    window.selectWorkflow = selectWorkflow;

    async function runResearch() {
      const prompt = document.getElementById('research-prompt').value.trim();
      if (!prompt) return;

      const domain  = document.getElementById('research-domain').value;
      const depth   = document.getElementById('research-depth').value;
      const peerRev = document.getElementById('peer-review-toggle').checked;

      const agentMap = {
        quick:    'researcher',
        standard: 'research_scientist',
        deep:     'research_scientist',
      };

      const btn  = document.getElementById('research-btn');
      const icon = document.getElementById('research-icon');
      const lbl  = document.getElementById('research-label');
      btn.disabled = true;
      icon.className = 'fas fa-spinner fa-spin';
      lbl.textContent = isRu ? 'Исследование...' : 'Researching...';
      document.getElementById('research-error').style.display = 'none';
      document.getElementById('research-result-area').style.display = 'none';

      const apiKey = localStorage.getItem('era_key_openrouter')
        || localStorage.getItem('openrouter_api_key')
        || localStorage.getItem('ora_api_key') || '';
      const headers = { 'Content-Type': 'application/json' };
      if (apiKey) headers['X-API-Key'] = apiKey;

      const t0 = Date.now();
      try {
        const res  = await fetch('/api/query', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: (peerRev ? '[PEER_REVIEW] ' : '') + '[DOMAIN:' + domain + '] ' + prompt,
            agentRole: agentMap[depth] || 'research_scientist',
            singleAgent: depth === 'quick',
          }),
        });
        const data = await res.json();
        const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
        const text = data.result || data.answer || data.content
          || (data.responses && data.responses[0]?.content)
          || JSON.stringify(data, null, 2);

        lastResult = text;
        document.getElementById('research-result-content').innerHTML = renderMd(text);
        document.getElementById('research-meta').innerHTML =
          '<i class="fas fa-clock mr-1"></i>' + elapsed + 's' +
          (data.model ? ' · <i class="fas fa-robot mr-1 ml-2"></i>' + data.model : '') +
          (peerRev ? ' · <i class="fas fa-user-check text-purple-400 mr-1 ml-2"></i>${isRu ? 'с рецензией' : 'peer-reviewed'}' : '');
        document.getElementById('research-result-area').style.display = '';
      } catch(e) {
        document.getElementById('research-error-text').textContent =
          (isRu ? 'Ошибка: ' : 'Error: ') + (e.message || 'network error')
          + (isRu ? ' · Настройте API ключ в AI Провайдеры' : ' · Configure API key in AI Providers');
        document.getElementById('research-error').style.display = 'flex';
      } finally {
        btn.disabled = false;
        icon.className = 'fas fa-play';
        lbl.textContent = isRu ? 'Запустить' : 'Run Research';
      }
    }
    window.runResearch = runResearch;

    function sendToOrchestrator() {
      const p = document.getElementById('research-prompt').value.trim() || '';
      if (p) window.location.href = '/meta?lang=' + lang + '&task=' + encodeURIComponent(p);
      else window.location.href = '/meta?lang=' + lang;
    }
    window.sendToOrchestrator = sendToOrchestrator;

    function openNewResearch() {
      document.getElementById('research-prompt').value = '';
      document.getElementById('research-prompt').focus();
      document.querySelectorAll('.workflow-card').forEach(c => c.classList.remove('active'));
      activeWorkflow = null;
      document.getElementById('active-workflow-badge').classList.add('hidden');
    }
    window.openNewResearch = openNewResearch;

    function copyResult() {
      navigator.clipboard.writeText(lastResult).catch(() => {});
      const btn = event.currentTarget;
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> ' + (isRu ? 'Скопировано' : 'Copied');
      setTimeout(() => btn.innerHTML = orig, 1500);
    }
    window.copyResult = copyResult;

    function saveToJournal() {
      window.location.href = '/journal?lang=' + lang;
    }
    window.saveToJournal = saveToJournal;

    // Quick agent test panel
    function quickTestAgent(role, name) {
      activeAgentRole = role;
      document.getElementById('qt-agent-name').textContent = name + ' (' + role + ')';
      document.getElementById('qt-prompt').value = '';
      document.getElementById('qt-result').classList.add('hidden');
      document.getElementById('quick-test-panel').style.display = 'flex';
      setTimeout(() => document.getElementById('qt-prompt').focus(), 50);
    }
    window.quickTestAgent = quickTestAgent;

    function closeQuickTest() {
      document.getElementById('quick-test-panel').style.display = 'none';
    }
    window.closeQuickTest = closeQuickTest;

    async function runQuickTest() {
      const prompt = document.getElementById('qt-prompt').value.trim();
      if (!prompt) return;
      const icon = document.getElementById('qt-icon');
      const lbl  = document.getElementById('qt-label');
      icon.className = 'fas fa-spinner fa-spin';
      lbl.textContent = isRu ? 'Запуск...' : 'Running...';
      const apiKey = localStorage.getItem('era_key_openrouter') || localStorage.getItem('openrouter_api_key') || localStorage.getItem('ora_api_key') || '';
      const headers = { 'Content-Type': 'application/json' };
      if (apiKey) headers['X-API-Key'] = apiKey;
      try {
        const res  = await fetch('/api/query', {
          method: 'POST', headers,
          body: JSON.stringify({ query: prompt, agentRole: activeAgentRole, singleAgent: true }),
        });
        const data = await res.json();
        const text = data.result || data.answer || data.content || JSON.stringify(data, null, 2);
        const el = document.getElementById('qt-result');
        el.innerHTML = renderMd(text);
        el.classList.remove('hidden');
      } catch(e) {
        const el = document.getElementById('qt-result');
        el.textContent = (isRu ? 'Ошибка: ' : 'Error: ') + e.message;
        el.classList.remove('hidden');
      } finally {
        icon.className = 'fas fa-play';
        lbl.textContent = isRu ? 'Запустить' : 'Run';
      }
    }
    window.runQuickTest = runQuickTest;

    document.getElementById('quick-test-panel').addEventListener('click', e => {
      if (e.target === document.getElementById('quick-test-panel')) closeQuickTest();
    });

    // URL param: pre-fill task
    const urlTask = new URLSearchParams(location.search).get('task');
    if (urlTask) document.getElementById('research-prompt').value = decodeURIComponent(urlTask);
  </script>
</body>
</html>`
}
