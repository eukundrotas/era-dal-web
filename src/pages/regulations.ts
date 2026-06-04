import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const regulationsPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const t = {
    title:       isRu ? 'Регламенты'          : 'Regulations',
    newReg:      isRu ? '+ Новый регламент'   : '+ New Regulation',
    search:      isRu ? 'Поиск регламентов...' : 'Search regulations...',
    allRoles:    isRu ? 'Все роли'            : 'All roles',
    allCats:     isRu ? 'Все категории'       : 'All categories',
    active:      isRu ? 'Активный'            : 'Active',
    draft:       isRu ? 'Черновик'            : 'Draft',
    version:     isRu ? 'Версия'              : 'Version',
    updated:     isRu ? 'Обновлён'            : 'Updated',
    testWithAI:  isRu ? 'Тест с AI'          : 'Test with AI',
    view:        isRu ? 'Просмотр'            : 'View',
    roles:       isRu ? 'Роли'               : 'Roles',
  }

  const CATS: Record<string,string> = {
    general:    isRu ? 'Общий'         : 'General',
    compliance: isRu ? 'Соответствие'  : 'Compliance',
    workflow:   isRu ? 'Процессы'      : 'Workflow',
    safety:     isRu ? 'Безопасность'  : 'Safety',
  }
  const CAT_COLOR: Record<string,string> = {
    general:'bg-blue-900 text-blue-300', compliance:'bg-purple-900 text-purple-300',
    workflow:'bg-green-900 text-green-300', safety:'bg-red-900 text-red-300',
  }

  const regs = [
    { id:'r1', title: isRu ? 'Стандарт исследования рынка' : 'Market Research Standard',
      desc: isRu ? 'Обязательные шаги при анализе любого рынка' : 'Mandatory steps for any market analysis',
      category:'workflow', roles:['lead_researcher','market_analyst'], version:3, active:true,
      updated:'2025-06-01',
      content: isRu
        ? `## Стандарт исследования рынка\n\n### Обязательные шаги\n1. Определить объём рынка (TAM/SAM/SOM)\n2. Проанализировать топ-10 конкурентов\n3. Провести SWOT-анализ\n4. Сформировать выводы с числовыми данными\n\n### Запрещено\n- Делать выводы без данных\n- Использовать данные старше 1 года\n\n### Формат вывода\nMarkdown-отчёт с таблицами и графиками`
        : `## Market Research Standard\n\n### Mandatory Steps\n1. Define market size (TAM/SAM/SOM)\n2. Analyze top-10 competitors\n3. Conduct SWOT analysis\n4. Formulate conclusions with numeric data\n\n### Prohibited\n- Drawing conclusions without data\n- Using data older than 1 year\n\n### Output Format\nMarkdown report with tables and charts`
    },
    { id:'r2', title: isRu ? 'Политика коммуникаций с клиентами' : 'Client Communication Policy',
      desc: isRu ? 'Тон, стиль и правила общения с клиентами' : 'Tone, style and rules for client communication',
      category:'compliance', roles:['copywriter','sales_director','support_agent'], version:2, active:true,
      updated:'2025-05-20',
      content: isRu ? '## Политика коммуникаций\n\n### Тон\n- Профессиональный, но дружелюбный\n- Никакого жаргона\n- Клиент всегда прав (в разумных пределах)'
                    : '## Communication Policy\n\n### Tone\n- Professional but friendly\n- No jargon\n- Customer is always right (within reason)'
    },
    { id:'r3', title: isRu ? 'Безопасность данных' : 'Data Security Guidelines',
      desc: isRu ? 'Правила обработки конфиденциальных данных' : 'Rules for handling confidential data',
      category:'safety', roles:['technical_agent','legal_assistant'], version:1, active:true,
      updated:'2025-06-03',
      content: isRu ? '## Безопасность данных\n\n1. Никогда не включать PII в промпты\n2. Маскировать номера карт и паспортов\n3. Логировать все операции с данными'
                    : '## Data Security\n\n1. Never include PII in prompts\n2. Mask card numbers and IDs\n3. Log all data operations'
    },
    { id:'r4', title: isRu ? 'Шаблон финансового анализа' : 'Financial Analysis Template',
      desc: isRu ? 'Структура отчёта для финансовых задач' : 'Report structure for financial tasks',
      category:'workflow', roles:['financial_analyst'], version:1, active:false,
      updated:'2025-05-10',
      content: isRu ? '## Финансовый анализ\n\n### Структура отчёта\n1. Executive Summary\n2. P&L анализ\n3. Cash Flow\n4. Прогноз\n5. Риски'
                    : '## Financial Analysis\n\n### Report Structure\n1. Executive Summary\n2. P&L Analysis\n3. Cash Flow\n4. Forecast\n5. Risks'
    },
    { id:'r5', title: isRu ? 'Правила найма цифровых сотрудников' : 'Digital Employee Hiring Rules',
      desc: isRu ? 'Процесс создания и настройки новых агентов' : 'Process for creating and configuring new agents',
      category:'general', roles:['hr_assistant','project_manager'], version:2, active:true,
      updated:'2025-06-02',
      content: isRu ? '## Правила найма\n\n1. Определить роль и зоны ответственности\n2. Написать инструкции (системный промпт)\n3. Выбрать модель и параметры\n4. Протестировать на 10 задачах\n5. Утвердить у руководителя'
                    : '## Hiring Rules\n\n1. Define role and responsibilities\n2. Write instructions (system prompt)\n3. Choose model and parameters\n4. Test on 10 tasks\n5. Get manager approval'
    },
  ]

  const ROLE_LABEL: Record<string,string> = {
    lead_researcher: isRu?'Исследователь':'Researcher',
    market_analyst:  isRu?'Маркетолог':'Market Analyst',
    copywriter:      isRu?'Копирайтер':'Copywriter',
    sales_director:  isRu?'Продажи':'Sales',
    financial_analyst:isRu?'Финансы':'Finance',
    technical_agent: isRu?'Техника':'Tech',
    legal_assistant: isRu?'Юрист':'Legal',
    support_agent:   isRu?'Поддержка':'Support',
    hr_assistant:    isRu?'HR':'HR',
    project_manager: isRu?'Менеджер':'Manager',
  }

  const cards = regs.map(r => `
  <div class="glass rounded-xl p-4 flex flex-col gap-3 card-hover">
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <i class="fas fa-file-alt text-gray-400" style="font-size:13px"></i>
          <h3 class="font-semibold text-white text-sm truncate">${r.title}</h3>
        </div>
        <p class="text-gray-400 text-xs line-clamp-1">${r.desc}</p>
      </div>
      <div class="flex-shrink-0 flex flex-col items-end gap-1.5">
        <span class="text-xs px-2 py-0.5 rounded-full ${r.active ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'}">
          ${r.active ? t.active : t.draft}
        </span>
        <span class="text-xs px-2 py-0.5 rounded-full ${CAT_COLOR[r.category] || 'bg-gray-700 text-gray-300'}">${CATS[r.category]}</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-1.5">
      ${r.roles.map(role => `<span class="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">${ROLE_LABEL[role]||role}</span>`).join('')}
    </div>

    <div class="flex items-center justify-between text-xs text-gray-500">
      <span><i class="fas fa-code-branch mr-1"></i>${t.version} ${r.version}</span>
      <span><i class="fas fa-clock mr-1"></i>${r.updated}</span>
    </div>

    <div class="flex gap-2 mt-1">
      <button onclick="viewReg('${r.id}')"
          class="flex-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white py-1.5 rounded-lg transition">
        <i class="fas fa-eye mr-1"></i>${t.view}
      </button>
      <button onclick="testReg('${r.id}')"
          class="flex-1 text-xs bg-violet-800 hover:bg-violet-700 text-violet-200 py-1.5 rounded-lg transition">
        <i class="fas fa-vial mr-1"></i>${t.testWithAI}
      </button>
    </div>
  </div>`).join('')

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t.title, '', lang)}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${sidebar('regulations', lang)}
  <main class="ml-56 pt-4 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 pb-10">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-white">${t.title}</h1>
          <p class="text-gray-400 text-sm mt-0.5">${isRu ? 'SOP и бизнес-правила для цифровых сотрудников' : 'SOPs and business rules for digital employees'}</p>
        </div>
        <button onclick="document.getElementById('new-reg-modal').classList.remove('hidden')"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
          <i class="fas fa-plus"></i> ${t.newReg}
        </button>
      </div>

      <!-- Summary stats -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        ${[
          { label: isRu ? 'Всего' : 'Total', v: regs.length, icon:'fa-book', c:'text-blue-400' },
          { label: isRu ? 'Активных' : 'Active', v: regs.filter(r=>r.active).length, icon:'fa-check-circle', c:'text-green-400' },
          { label: isRu ? 'Черновиков' : 'Drafts', v: regs.filter(r=>!r.active).length, icon:'fa-edit', c:'text-yellow-400' },
          { label: isRu ? 'Обновлено сегодня' : 'Updated today', v: 2, icon:'fa-sync', c:'text-purple-400' },
        ].map(s => `<div class="glass rounded-xl p-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-xs">${s.label}</span>
            <i class="fas ${s.icon} ${s.c}" style="font-size:13px"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-1">${s.v}</p>
        </div>`).join('')}
      </div>

      <!-- Search & filter -->
      <div class="flex gap-3 mb-5">
        <input id="reg-search" type="text" placeholder="${t.search}" oninput="filterRegs()"
            class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500">
        <select id="reg-cat" onchange="filterRegs()"
            class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none">
          <option value="">${t.allCats}</option>
          ${Object.entries(CATS).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}
        </select>
        <select id="reg-status" onchange="filterRegs()"
            class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none">
          <option value="">${isRu ? 'Все статусы' : 'All statuses'}</option>
          <option value="active">${t.active}</option>
          <option value="draft">${t.draft}</option>
        </select>
      </div>

      <!-- Cards grid -->
      <div id="regs-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${cards}
      </div>
    </div>
  </main>

  <!-- View Modal -->
  <div id="view-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col">
      <div class="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 id="modal-title" class="text-lg font-bold"></h2>
        <button onclick="document.getElementById('view-modal').classList.add('hidden')" class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div id="modal-content" class="flex-1 overflow-y-auto text-sm text-gray-300 leading-relaxed prose prose-invert max-w-none whitespace-pre-wrap font-mono bg-gray-800 rounded-lg p-4"></div>
      <div class="flex gap-3 mt-4 flex-shrink-0">
        <button onclick="testRegFromModal()"
            class="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg text-sm font-medium transition">
          <i class="fas fa-vial mr-1"></i>${t.testWithAI}
        </button>
        <button onclick="document.getElementById('view-modal').classList.add('hidden')"
            class="px-6 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition">
          ${isRu ? 'Закрыть' : 'Close'}
        </button>
      </div>
    </div>
  </div>

  <!-- New Regulation Modal -->
  <div id="new-reg-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-bold">${isRu ? 'Новый регламент' : 'New Regulation'}</h2>
        <button onclick="document.getElementById('new-reg-modal').classList.add('hidden')" class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="space-y-4">
        <input type="text" placeholder="${isRu ? 'Название...' : 'Title...'}"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
        <textarea rows="6" placeholder="${isRu ? 'Содержание регламента (Markdown)...' : 'Regulation content (Markdown)...'}"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none font-mono"></textarea>
        <select class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
          ${Object.entries(CATS).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}
        </select>
      </div>
      <div class="flex gap-3 mt-5">
        <button onclick="document.getElementById('new-reg-modal').classList.add('hidden')"
            class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition">
          ${isRu ? 'Отмена' : 'Cancel'}
        </button>
        <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
          ${isRu ? 'Сохранить' : 'Save'}
        </button>
      </div>
    </div>
  </div>

  <script>
  var REGS_DATA = ${JSON.stringify(regs.map(r => ({ id:r.id, title:r.title, content:r.content })))};
  var currentRegId = null;

  function viewReg(id) {
    var reg = REGS_DATA.find(function(r){ return r.id === id; });
    if (!reg) return;
    currentRegId = id;
    document.getElementById('modal-title').textContent = reg.title;
    document.getElementById('modal-content').textContent = reg.content;
    document.getElementById('view-modal').classList.remove('hidden');
  }

  function testReg(id) {
    var reg = REGS_DATA.find(function(r){ return r.id === id; });
    if (!reg) return;
    window.location.href = '/meta?lang=${lang}&task='+encodeURIComponent('${isRu ? 'Проверь применение регламента: ' : 'Test regulation: '}' + reg.title);
  }

  function testRegFromModal() {
    if (currentRegId) testReg(currentRegId);
  }

  function filterRegs() {}
  </script>
</body>
</html>`
}
