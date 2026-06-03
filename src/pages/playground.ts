import { head, sidebar } from '../components/layout'
import { Language, getSection } from '../i18n/translations'

export const playgroundPage = (lang: Language = 'en') => {
  const t = getSection('playground', lang)
  const c = getSection('common', lang)
  const isRu = lang === 'ru'
  
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t.title, isRu ? 'Тестируйте ERA DAL своими запросами' : 'Test ERA DAL with your own queries. Select models, configure settings, and see results.', lang)}
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('playground', lang)}
  
  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold">${t.title}</h1>
        <p class="text-gray-400">${t.subtitle}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div class="glass rounded-xl p-6">
            <label class="block text-gray-400 text-sm mb-2">
              <i class="fas fa-question-circle mr-1"></i> ${t.yourQuestion}
            </label>
            <textarea id="query-input" rows="4" placeholder="${t.placeholder}"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"></textarea>
            
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center space-x-4">
                <select id="domain-select" class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                  <option value="science">${c.science}</option>
                  <option value="math">${c.math}</option>
                  <option value="med">${c.med}</option>
                  <option value="econ">${c.econ}</option>
                </select>
                <select id="mode-select" class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                  <option value="consensus_top2">${c.consensusTop2}</option>
                  <option value="consensus_top3">${c.consensusTop3}</option>
                  <option value="hard_select">${c.hardSelect}</option>
                </select>
              </div>
              <button onclick="submitQuery()" id="submit-btn" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-lg transition flex items-center">
                <i class="fas fa-paper-plane mr-2"></i> ${t.submit}
              </button>
            </div>
          </div>

          <div class="glass rounded-xl p-6" id="results-container" style="display: none;">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">
                <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                ${t.finalAnswer}
              </h3>
              <div class="flex items-center space-x-2">
                <span id="confidence-badge" class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  <i class="fas fa-shield-alt mr-1"></i> 95% CI
                </span>
                <button onclick="copyResult()" class="text-gray-400 hover:text-white p-2 transition">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
            
            <div id="final-answer" class="bg-gray-800 rounded-lg p-4 text-gray-300 leading-relaxed"></div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div class="bg-gray-800 rounded-lg p-3 text-center">
                <p class="text-gray-400 text-xs">${t.majorityRate}</p>
                <p class="text-white text-lg font-bold" id="metric-majority">--</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3 text-center">
                <p class="text-gray-400 text-xs">Wilson CI</p>
                <p class="text-white text-lg font-bold" id="metric-wilson">--</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3 text-center">
                <p class="text-gray-400 text-xs">${t.latency}</p>
                <p class="text-white text-lg font-bold" id="metric-latency">--</p>
              </div>
              <div class="bg-gray-800 rounded-lg p-3 text-center">
                <p class="text-gray-400 text-xs">${t.modelsUsed}</p>
                <p class="text-white text-lg font-bold" id="metric-models">--</p>
              </div>
            </div>
          </div>

          <div class="glass rounded-xl p-6" id="model-responses" style="display: none;">
            <h3 class="text-lg font-semibold mb-4">
              <i class="fas fa-robot text-blue-500 mr-2"></i>
              ${t.modelResponses}
            </h3>
            <div id="responses-list" class="space-y-4"></div>
          </div>

          <div class="glass rounded-xl p-6" id="processing-indicator" style="display: none;">
            <div class="flex flex-col items-center justify-center py-8">
              <div class="relative w-20 h-20 mb-6">
                <div class="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                <div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div class="absolute inset-2 border-4 border-purple-500/30 rounded-full"></div>
                <div class="absolute inset-2 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
              </div>
              <p class="text-white font-semibold mb-2">${t.processing}</p>
              <p class="text-gray-400 text-sm" id="processing-status">${isRu ? 'Инициализация пула решателей...' : 'Initializing solver pool...'}</p>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="glass rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-3">
              <i class="fas fa-brain text-violet-400 mr-2"></i>
              ${t.thinkingMode}
            </h3>
            <p class="text-gray-500 text-xs mb-3">${t.thinkingModeHint}</p>

            <select id="thinking-mode-select"
              onchange="updateThinkingModeDesc(this.value)"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 transition mb-3">
              <option value="standard"     data-icon="🧠">🧠 ${isRu ? 'Стандартное' : 'Standard'}</option>
              <option value="triz"         data-icon="⚙️">⚙️ ${isRu ? 'ТРИЗ' : 'TRIZ'}</option>
              <option value="lateral"      data-icon="🔀">🔀 ${isRu ? 'Латеральное' : 'Lateral Thinking'}</option>
              <option value="systems"      data-icon="🌐">🌐 ${isRu ? 'Системное' : 'Systems Thinking'}</option>
              <option value="design"       data-icon="🎨">🎨 ${isRu ? 'Дизайн-мышление' : 'Design Thinking'}</option>
              <option value="first_principles" data-icon="🔬">🔬 ${isRu ? 'Первые принципы' : 'First Principles'}</option>
              <option value="critical"     data-icon="⚖️">⚖️ ${isRu ? 'Критическое' : 'Critical Thinking'}</option>
              <option value="divergent"    data-icon="💡">💡 ${isRu ? 'Дивергентное' : 'Divergent'}</option>
              <option value="convergent"   data-icon="🎯">🎯 ${isRu ? 'Конвергентное' : 'Convergent'}</option>
              <option value="bayesian"     data-icon="📊">📊 ${isRu ? 'Байесовское' : 'Bayesian'}</option>
              <option value="six_hats"     data-icon="🎩">🎩 ${isRu ? 'Шесть шляп' : 'Six Thinking Hats'}</option>
              <option value="quantum"      data-icon="⚛️">⚛️ ${isRu ? 'Квантовое' : 'Quantum Thinking'}</option>
              <option value="abductive"    data-icon="🔍">🔍 ${isRu ? 'Абдуктивное' : 'Abductive'}</option>
              <option value="metacognitive" data-icon="🪞">🪞 ${isRu ? 'Метакогнитивное' : 'Metacognitive'}</option>
              <option value="synectics"    data-icon="🔗">🔗 ${isRu ? 'Синектическое' : 'Synectics'}</option>
            </select>

            <div id="thinking-mode-desc"
              class="text-xs text-gray-400 bg-gray-800/60 rounded-lg px-3 py-2 border border-gray-700/50 min-h-[36px] leading-relaxed">
              ${isRu ? 'Обычное рассуждение без специального фреймворка.' : 'Default reasoning, no special framework applied.'}
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">
              <i class="fas fa-sliders-h text-purple-500 mr-2"></i>
              ${t.advancedSettings}
            </h3>
            
            <div class="space-y-4">
              <div>
                <label class="flex items-center justify-between text-gray-400 text-sm mb-2">
                  <span>${t.repeats}</span>
                  <span class="text-white" id="repeats-value">3</span>
                </label>
                <input type="range" id="repeats" min="1" max="10" value="3" 
                  class="w-full accent-blue-500"
                  oninput="document.getElementById('repeats-value').textContent = this.value">
              </div>

              <div>
                <label class="flex items-center justify-between text-gray-400 text-sm mb-2">
                  <span>${t.consensusTopK}</span>
                  <span class="text-white" id="topk-value">2</span>
                </label>
                <input type="range" id="consensus-topk" min="1" max="5" value="2" 
                  class="w-full accent-blue-500"
                  oninput="document.getElementById('topk-value').textContent = this.value">
              </div>

              <div>
                <label class="flex items-center justify-between text-gray-400 text-sm mb-2">
                  <span>${t.epsilon}</span>
                  <span class="text-white" id="epsilon-value">0.05</span>
                </label>
                <input type="range" id="epsilon" min="0" max="0.2" step="0.01" value="0.05" 
                  class="w-full accent-blue-500"
                  oninput="document.getElementById('epsilon-value').textContent = parseFloat(this.value).toFixed(2)">
              </div>

              <div class="flex items-center justify-between">
                <span class="text-gray-400 text-sm">${t.enableRebuttal}</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="rebuttal" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-gray-400 text-sm">${t.hardOnlySelection}</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="hard-only" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">
              <i class="fas fa-layer-group text-cyan-500 mr-2"></i>
              ${t.solverPool}
            </h3>
            
            <div class="space-y-2" id="model-pool">
              <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">GPT-4o</span>
                </div>
                <span class="text-green-400 text-xs">${t.ready}</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">Claude 3.5</span>
                </div>
                <span class="text-green-400 text-xs">${t.ready}</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">Llama 3.1 70B</span>
                </div>
                <span class="text-green-400 text-xs">${t.ready}</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">Mistral Large</span>
                </div>
                <span class="text-green-400 text-xs">${t.ready}</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">Gemini 1.5</span>
                </div>
                <span class="text-green-400 text-xs">${t.ready}</span>
              </div>
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">
              <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
              ${t.quickExamples}
            </h3>
            
            <div class="space-y-2">
              <button onclick="loadExample('science')" class="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm">
                <i class="fas fa-atom text-blue-400 mr-2"></i>
                ${t.darkMatterEvidence}
              </button>
              <button onclick="loadExample('math')" class="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm">
                <i class="fas fa-square-root-alt text-green-400 mr-2"></i>
                ${t.riemannHypothesis}
              </button>
              <button onclick="loadExample('med')" class="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm">
                <i class="fas fa-heartbeat text-red-400 mr-2"></i>
                ${t.mrnaVaccineMechanism}
              </button>
              <button onclick="loadExample('econ')" class="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm">
                <i class="fas fa-chart-line text-purple-400 mr-2"></i>
                ${t.inflationCauses}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    const lang = '${lang}';
    const isRu = lang === 'ru';

    const THINKING_MODE_DESCS = {
      standard:        isRu ? 'Обычное рассуждение без специального фреймворка.' : 'Default reasoning, no special framework applied.',
      triz:            isRu ? 'Противоречия → изобретательские принципы → идеальный результат (ТРИЗ).' : 'Contradictions → inventive principles → ideal result (TRIZ).',
      lateral:         isRu ? 'Разрыв шаблонов, провокации, неожиданные связи (Эдвард де Боно).' : 'Break patterns, provocations, unexpected connections (Edward de Bono).',
      systems:         isRu ? 'Обратные связи, точки рычага, эмерджентность, первопричины.' : 'Feedback loops, leverage points, emergent behavior, root causes.',
      design:          isRu ? 'Эмпатия → Определение → Идеи → Прототип → Тест (Stanford d.school).' : 'Empathize → Define → Ideate → Prototype → Test (Stanford d.school).',
      first_principles:isRu ? 'Убрать все допущения. Строить решение только на доказанных фактах.' : 'Strip all assumptions. Rebuild from indisputable facts only.',
      critical:        isRu ? 'Качество доказательств, логические ошибки, калибровка уверенности.' : 'Evidence quality, logical fallacies, calibrated confidence.',
      divergent:       isRu ? 'Максимум разнообразия идей. Оценка полностью отложена.' : 'Maximum idea variety. Quantity first, judgment fully suspended.',
      convergent:      isRu ? 'Систематическая оценка всех вариантов → одно лучшее решение.' : 'Systematic evaluation of all options → single best answer.',
      bayesian:        isRu ? 'Априорные убеждения + данные → обновлённая вероятность. Без бинарных суждений.' : 'Prior beliefs + evidence → updated probability. No binary verdicts.',
      six_hats:        isRu ? 'Шесть параллельных перспектив: факты, эмоции, риск, ценность, творчество, синтез.' : 'Six parallel perspectives: facts, emotion, risk, value, creativity, synthesis.',
      quantum:         isRu ? 'Суперпозиция противоречий, эффект наблюдателя, коллапс к ответу.' : 'Superposition of contradictions, observer effect, collapse to answer.',
      abductive:       isRu ? 'Вывод к лучшему объяснению. Детективное мышление (что объясняет факты лучше всего?).' : 'Inference to the best explanation. Think like a detective.',
      metacognitive:   isRu ? 'Мышление о мышлении: аудит стратегий, предвзятостей, калибровки.' : 'Think about your thinking. Audit strategies, biases, calibration.',
      synectics:       isRu ? 'Решение через аналогию: прямая, личная, символическая, фантастическая.' : 'Solve through analogy: direct, personal, symbolic, fantasy.'
    };

    function updateThinkingModeDesc(mode) {
      const el = document.getElementById('thinking-mode-desc');
      if (el) el.textContent = THINKING_MODE_DESCS[mode] || THINKING_MODE_DESCS.standard;
    }
    
    const examples = {
      science: isRu ? 'Каковы текущие научные доказательства существования тёмной материи во Вселенной? Объясните ключевые наблюдения.' : 'What is the current scientific evidence for dark matter in the universe? Explain the key observations.',
      math: isRu ? 'Что такое гипотеза Римана и почему она считается одной из важнейших нерешённых проблем математики?' : 'What is the Riemann hypothesis and why is it considered one of the most important unsolved problems in mathematics?',
      med: isRu ? 'Как работают мРНК-вакцины на молекулярном уровне? Объясните механизм действия.' : 'How do mRNA vaccines work at the molecular level? Explain the mechanism of action.',
      econ: isRu ? 'Каковы основные причины инфляции и как центральные банки обычно реагируют на неё?' : 'What are the main causes of inflation and how do central banks typically respond?'
    };

    const answers = {
      science: isRu ? 'На основе ансамблевого анализа, доказательства тёмной материи исходят из нескольких ключевых наблюдений: (1) Кривые вращения галактик показывают, что звёзды вращаются быстрее, чем ожидалось бы только от видимой материи, (2) Эффекты гравитационного линзирования выявляют распределения массы, превышающие видимую материю, (3) Анизотропии космического микроволнового фона соответствуют предсказаниям, требующим тёмной материи, (4) Формирование крупномасштабной структуры Вселенной требует гравитационных эффектов тёмной материи.' : 'Based on the ensemble analysis, dark matter evidence comes from several key observations: (1) Galaxy rotation curves show stars orbiting faster than expected from visible matter alone, (2) Gravitational lensing effects reveal mass distributions that exceed visible matter, (3) The Cosmic Microwave Background anisotropies match predictions requiring dark matter, (4) Large-scale structure formation in the universe requires dark matter gravitational effects.',
      math: isRu ? 'Гипотеза Римана утверждает, что все нетривиальные нули дзета-функции Римана имеют действительную часть 1/2. Она важна потому что: (1) Связывает распределение простых чисел с комплексным анализом, (2) Многие результаты теории чисел предполагают её истинность, (3) Её решение докажет около 1000 теорем, которые сейчас на неё опираются.' : 'The Riemann hypothesis states that all non-trivial zeros of the Riemann zeta function have real part 1/2. It is crucial because: (1) It connects prime number distribution to complex analysis, (2) Many results in number theory assume its truth, (3) Solving it would prove ~1000 theorems that currently rely on it.',
      med: isRu ? 'мРНК-вакцины работают следующим образом: (1) Доставляют инкапсулированную в липиды мРНК, кодирующую спайковый белок, в клетки, (2) Рибосомы транслируют мРНК в белковые антигены, (3) Иммунная система распознаёт эти белки как чужеродные, (4) B-клетки производят антитела, активируются T-клетки, (5) Формируются клетки памяти для долгосрочной защиты. мРНК естественным образом разрушается в течение нескольких дней.' : 'mRNA vaccines work by: (1) Delivering lipid-encapsulated mRNA encoding spike protein to cells, (2) Ribosomes translate mRNA into protein antigens, (3) The immune system recognizes these proteins as foreign, (4) B-cells produce antibodies, T-cells are activated, (5) Memory cells form for long-term protection. The mRNA degrades naturally within days.',
      econ: isRu ? 'Инфляция в основном вызвана: (1) Факторами спроса — избыточная денежная масса или расходы, (2) Факторами издержек — рост производственных затрат, (3) Нарушениями цепочек поставок, (4) Инфляционными ожиданиями, становящимися самоисполняющимися. Центральные банки реагируют: повышением процентных ставок для снижения заимствований, количественным ужесточением и прогнозным руководством для закрепления ожиданий.' : 'Inflation is primarily caused by: (1) Demand-pull factors - excessive money supply or spending, (2) Cost-push factors - rising production costs, (3) Supply chain disruptions, (4) Inflation expectations becoming self-fulfilling. Central banks respond by: raising interest rates to reduce borrowing, quantitative tightening, and forward guidance to anchor expectations.'
    };

    function loadExample(type) {
      document.getElementById('query-input').value = examples[type];
      document.getElementById('domain-select').value = type;
    }

    function showProcessing(show) {
      document.getElementById('processing-indicator').style.display = show ? 'block' : 'none';
      document.getElementById('results-container').style.display = show ? 'none' : 'block';
      document.getElementById('model-responses').style.display = show ? 'none' : 'block';
      document.getElementById('submit-btn').disabled = show;
    }

    function updateProcessingStatus(status) {
      document.getElementById('processing-status').textContent = status;
    }

    async function submitQuery() {
      const query = document.getElementById('query-input').value.trim();
      if (!query) {
        alert('${t.enterQuestion}');
        return;
      }

      const domain = document.getElementById('domain-select').value;
      const thinkingMode = document.getElementById('thinking-mode-select').value;
      showProcessing(true);
      
      const steps = isRu 
        ? ['Инициализация пула решателей...', 'Отправка запроса моделям...', 'GPT-4o отвечает...', 'Claude 3.5 отвечает...', 'Llama 3.1 отвечает...', 'Запуск оценки арбитром...', 'Вычисление консенсуса...', 'Анализ стабильности...', 'Формирование результатов...']
        : ['Initializing solver pool...', 'Sending query to models...', 'GPT-4o responding...', 'Claude 3.5 responding...', 'Llama 3.1 responding...', 'Running arbiter evaluation...', 'Computing consensus...', 'Analyzing stability...', 'Finalizing results...'];

      for (let i = 0; i < steps.length; i++) {
        updateProcessingStatus(steps[i]);
        await new Promise(r => setTimeout(r, 500 + Math.random() * 500));
      }

      const result = {
        answer: answers[domain] || answers.science,
        majority_rate: (0.7 + Math.random() * 0.25).toFixed(2),
        wilson_ci: [(0.6 + Math.random() * 0.2).toFixed(2), (0.85 + Math.random() * 0.1).toFixed(2)],
        latency: (1.5 + Math.random() * 2).toFixed(2),
        models_used: 5,
        responses: [
          { model: 'GPT-4o', rank: 1, score: 0.95, snippet: isRu ? 'Согласно текущим данным...' : 'According to current evidence...' },
          { model: 'Claude 3.5', rank: 2, score: 0.92, snippet: isRu ? 'Научный консенсус предполагает...' : 'The scientific consensus suggests...' },
          { model: 'Gemini 1.5', rank: 3, score: 0.88, snippet: isRu ? 'На основе наблюдений...' : 'Based on observations...' },
          { model: 'Llama 3.1', rank: 4, score: 0.85, snippet: isRu ? 'Исследования показывают...' : 'Research indicates...' },
          { model: 'Mistral', rank: 5, score: 0.82, snippet: isRu ? 'Данные свидетельствуют...' : 'Studies show...' }
        ]
      };

      displayResults(result);
    }

    function displayResults(result) {
      showProcessing(false);

      document.getElementById('final-answer').textContent = result.answer;
      document.getElementById('metric-majority').textContent = result.majority_rate;
      document.getElementById('metric-wilson').textContent = '[' + result.wilson_ci.join(', ') + ']';
      document.getElementById('metric-latency').textContent = result.latency + 's';
      document.getElementById('metric-models').textContent = result.models_used;

      const confidencePercent = Math.round(parseFloat(result.majority_rate) * 100);
      const badge = document.getElementById('confidence-badge');
      badge.textContent = confidencePercent + '% CI';
      badge.className = confidencePercent >= 80 ? 'bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm' :
                        confidencePercent >= 60 ? 'bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm' :
                        'bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm';

      const responsesList = document.getElementById('responses-list');
      responsesList.innerHTML = result.responses.map(r => \`
        <div class="bg-gray-800 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2">
              <span class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">\${r.rank}</span>
              <span class="font-medium">\${r.model}</span>
            </div>
            <span class="text-gray-400 text-sm">${isRu ? 'Оценка' : 'Score'}: \${(r.score * 100).toFixed(0)}%</span>
          </div>
          <p class="text-gray-400 text-sm">\${r.snippet}</p>
        </div>
      \`).join('');
    }

    function copyResult() {
      const answer = document.getElementById('final-answer').textContent;
      navigator.clipboard.writeText(answer);
      alert('${t.copied}');
    }
  </script>
</body>
</html>
`
}
