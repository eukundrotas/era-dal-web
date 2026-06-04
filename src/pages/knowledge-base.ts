import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const knowledgeBasePage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'
  const t = {
    title:      isRu ? 'Базы знаний'           : 'Knowledge Bases',
    subtitle:   isRu ? 'RAG-документы для агентов' : 'RAG documents for agents',
    newKB:      isRu ? '+ Новая база'          : '+ New Knowledge Base',
    search:     isRu ? 'Поиск...'              : 'Search...',
    docs:       isRu ? 'документов'            : 'docs',
    chunks:     isRu ? 'фрагментов'            : 'chunks',
    model:      isRu ? 'Модель эмбеддингов'    : 'Embedding model',
    created:    isRu ? 'Создана'               : 'Created',
    upload:     isRu ? 'Загрузить документ'    : 'Upload Document',
    linkAgent:  isRu ? 'Привязать к агенту'    : 'Link to Agent',
    deleteKB:   isRu ? 'Удалить'               : 'Delete',
    noKBs:      isRu ? 'Нет баз знаний'        : 'No knowledge bases yet',
    noKBsHint:  isRu ? 'Создайте первую базу для RAG-агентов' : 'Create your first base for RAG agents',
    uploadHint: isRu ? 'Поддерживаются: PDF, TXT, MD, DOCX' : 'Supported: PDF, TXT, MD, DOCX',
    processing: isRu ? 'Обработка...'          : 'Processing...',
    indexed:    isRu ? 'Проиндексировано'       : 'Indexed',
    empty:      isRu ? 'Пустая'                : 'Empty',
    nameLabel:  isRu ? 'Название базы'         : 'Knowledge base name',
    descLabel:  isRu ? 'Описание'              : 'Description',
    embModel:   isRu ? 'Модель эмбеддингов'    : 'Embedding model',
    cancel:     isRu ? 'Отмена'                : 'Cancel',
    create:     isRu ? 'Создать'               : 'Create',
  }

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t.title, '', lang)}
  <style>
    .kb-card:hover .kb-actions { opacity:1; }
    .kb-actions { opacity:0; transition:opacity 0.2s; }
    .drop-zone.dragover { border-color:#3b82f6; background:rgba(59,130,246,0.1); }
    .progress-ring { transition: stroke-dashoffset 0.5s ease; }
  </style>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${sidebar('knowledge-base', lang)}
  <main class="ml-56 pt-4 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 pb-10">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-white">${t.title}</h1>
          <p class="text-gray-400 text-sm mt-0.5">${t.subtitle}</p>
        </div>
        <button onclick="openNewKB()"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
          <i class="fas fa-plus"></i> ${t.newKB}
        </button>
      </div>

      <!-- Summary stats -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div class="glass rounded-xl p-4" id="stat-total">
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-xs">${isRu ? 'Баз знаний' : 'Knowledge Bases'}</span>
            <i class="fas fa-database text-blue-400" style="font-size:13px"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-1" id="stat-kb-count">—</p>
        </div>
        <div class="glass rounded-xl p-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-xs">${isRu ? 'Документов' : 'Documents'}</span>
            <i class="fas fa-file-alt text-green-400" style="font-size:13px"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-1" id="stat-doc-count">—</p>
        </div>
        <div class="glass rounded-xl p-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-xs">${isRu ? 'Фрагментов' : 'Chunks'}</span>
            <i class="fas fa-puzzle-piece text-yellow-400" style="font-size:13px"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-1" id="stat-chunk-count">—</p>
        </div>
        <div class="glass rounded-xl p-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-xs">${isRu ? 'Агентов с RAG' : 'Agents with RAG'}</span>
            <i class="fas fa-robot text-purple-400" style="font-size:13px"></i>
          </div>
          <p class="text-2xl font-bold text-white mt-1" id="stat-agent-count">—</p>
        </div>
      </div>

      <!-- Search -->
      <div class="mb-5">
        <input id="kb-search" type="text" placeholder="${t.search}" oninput="renderKBs()"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500">
      </div>

      <!-- KB grid -->
      <div id="kb-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>

      <!-- Empty state -->
      <div id="kb-empty" class="hidden text-center py-16">
        <div class="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-database text-gray-600 text-2xl"></i>
        </div>
        <p class="text-gray-300 font-medium mb-2">${t.noKBs}</p>
        <p class="text-gray-500 text-sm mb-6">${t.noKBsHint}</p>
        <button onclick="openNewKB()"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition">
          <i class="fas fa-plus mr-2"></i>${t.newKB}
        </button>
      </div>
    </div>
  </main>

  <!-- ── New KB Modal ── -->
  <div id="new-kb-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-bold">${isRu ? 'Новая база знаний' : 'New Knowledge Base'}</h2>
        <button onclick="closeNewKB()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button>
      </div>
      <div class="space-y-4">
        <div>
          <label class="text-xs text-gray-400 mb-1 block">${t.nameLabel} *</label>
          <input id="kb-name" type="text"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              placeholder="${isRu ? 'напр. Корпоративные документы' : 'e.g. Company Docs'}">
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">${t.descLabel}</label>
          <textarea id="kb-desc" rows="2"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
              placeholder="${isRu ? 'Что хранится в этой базе?' : 'What is stored in this base?'}"></textarea>
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">${t.embModel}</label>
          <select id="kb-model"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
            <option value="text-embedding-3-small">OpenAI text-embedding-3-small (1536d)</option>
            <option value="text-embedding-3-large">OpenAI text-embedding-3-large (3072d)</option>
            <option value="text-embedding-ada-002">OpenAI ada-002 (1536d)</option>
            <option value="nomic-embed-text">Nomic embed-text (768d, free)</option>
          </select>
        </div>
      </div>
      <div class="flex gap-3 mt-6">
        <button onclick="closeNewKB()"
            class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition">
          ${t.cancel}
        </button>
        <button onclick="createKB()"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
          <i class="fas fa-plus mr-1"></i> ${t.create}
        </button>
      </div>
    </div>
  </div>

  <!-- ── Upload Doc Modal ── -->
  <div id="upload-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-5">
        <div>
          <h2 class="text-lg font-bold">${t.upload}</h2>
          <p id="upload-kb-name" class="text-sm text-gray-400 mt-0.5"></p>
        </div>
        <button onclick="closeUpload()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button>
      </div>

      <!-- Drop zone -->
      <div id="drop-zone"
          class="drop-zone border-2 border-dashed border-gray-700 rounded-xl p-8 text-center mb-4 cursor-pointer hover:border-gray-500 transition"
          ondragover="event.preventDefault();this.classList.add('dragover')"
          ondragleave="this.classList.remove('dragover')"
          ondrop="handleDrop(event)"
          onclick="document.getElementById('file-input').click()">
        <i class="fas fa-cloud-upload-alt text-4xl text-gray-600 mb-3 block"></i>
        <p class="text-gray-300 text-sm font-medium mb-1">${isRu ? 'Перетащите файл или нажмите' : 'Drop file or click to browse'}</p>
        <p class="text-gray-500 text-xs">${t.uploadHint}</p>
        <input id="file-input" type="file" class="hidden" accept=".pdf,.txt,.md,.docx" onchange="handleFileSelect(this)">
      </div>

      <!-- File list -->
      <div id="file-list" class="space-y-2 mb-4"></div>

      <div class="flex gap-3">
        <button onclick="closeUpload()"
            class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition">
          ${t.cancel}
        </button>
        <button id="upload-btn" onclick="simulateUpload()"
            class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-50">
          <i class="fas fa-upload mr-1"></i> ${isRu ? 'Загрузить и индексировать' : 'Upload & Index'}
        </button>
      </div>
    </div>
  </div>

  <!-- ── Link Agent Modal ── -->
  <div id="link-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-bold">${t.linkAgent}</h2>
        <button onclick="document.getElementById('link-modal').classList.add('hidden')" class="text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <p class="text-gray-400 text-sm mb-4">${isRu ? 'Выберите агентов, которым дать доступ к этой базе:' : 'Select agents to grant access to this base:'}</p>
      <div class="space-y-2 max-h-64 overflow-y-auto">
        ${[
          { role:'lead_researcher',  label: isRu?'Ведущий исследователь':'Lead Researcher',   icon:'fa-search',   color:'text-blue-400' },
          { role:'market_analyst',   label: isRu?'Рыночный аналитик':'Market Analyst',         icon:'fa-chart-bar',color:'text-green-400'},
          { role:'copywriter',       label: isRu?'Копирайтер':'Copywriter',                     icon:'fa-pen',      color:'text-yellow-400'},
          { role:'sales_director',   label: isRu?'Директор продаж':'Sales Director',            icon:'fa-handshake',color:'text-orange-400'},
          { role:'financial_analyst',label: isRu?'Финансовый аналитик':'Financial Analyst',    icon:'fa-dollar-sign',color:'text-cyan-400'},
          { role:'legal_assistant',  label: isRu?'Юридический помощник':'Legal Assistant',     icon:'fa-balance-scale',color:'text-purple-400'},
          { role:'technical_agent',  label: isRu?'Технический агент':'Technical Agent',        icon:'fa-code',     color:'text-gray-400' },
          { role:'hr_assistant',     label: isRu?'HR-ассистент':'HR Assistant',                icon:'fa-users',    color:'text-pink-400' },
        ].map(a => `
        <label class="flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-750 cursor-pointer">
          <input type="checkbox" class="w-4 h-4 rounded accent-blue-500" value="${a.role}">
          <i class="fas ${a.icon} ${a.color} w-4 text-center" style="font-size:13px"></i>
          <span class="text-sm text-gray-300">${a.label}</span>
        </label>`).join('')}
      </div>
      <div class="flex gap-3 mt-5">
        <button onclick="document.getElementById('link-modal').classList.add('hidden')"
            class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition">
          ${t.cancel}
        </button>
        <button onclick="saveLinkAgents()"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
          ${isRu ? 'Сохранить' : 'Save'}
        </button>
      </div>
    </div>
  </div>

  <script>
  var KBS = [];
  var selectedKBId = null;
  var pendingFiles = [];

  // ── Seed data (shown when DB is empty) ──────────────────────────────────
  var SEED_KBS = [
    { id:'kb-demo1', name:${isRu ? "'Корпоративные документы'" : "'Corporate Documents'"}, description:${isRu ? "'Устав, регламенты, политики компании'" : "'Charter, regulations, company policies'"}, document_count:12, chunk_count:487, embedding_model:'text-embedding-3-small', created_at:'2025-05-15', linked_agents:['lead_researcher','legal_assistant'] },
    { id:'kb-demo2', name:${isRu ? "'Рыночные исследования'" : "'Market Research'"}, description:${isRu ? "'Отчёты, конкурентный анализ, тренды'" : "'Reports, competitive analysis, trends'"}, document_count:8,  chunk_count:312, embedding_model:'text-embedding-3-small', created_at:'2025-05-28', linked_agents:['lead_researcher','market_analyst'] },
    { id:'kb-demo3', name:${isRu ? "'Продуктовая документация'" : "'Product Documentation'"}, description:${isRu ? "'API-доки, руководства, FAQ'" : "'API docs, guides, FAQ'"}, document_count:5,  chunk_count:203, embedding_model:'nomic-embed-text',         created_at:'2025-06-01', linked_agents:['technical_agent','support_agent'] },
  ];

  function loadKBs() {
    fetch('/api/business/knowledge-bases')
      .then(function(r){ return r.json(); })
      .then(function(data) {
        KBS = data.knowledge_bases && data.knowledge_bases.length ? data.knowledge_bases : SEED_KBS;
        updateStats();
        renderKBs();
      })
      .catch(function() {
        KBS = SEED_KBS;
        updateStats();
        renderKBs();
      });
  }

  function updateStats() {
    document.getElementById('stat-kb-count').textContent  = KBS.length;
    document.getElementById('stat-doc-count').textContent = KBS.reduce(function(a,k){ return a+(k.document_count||0); }, 0);
    document.getElementById('stat-chunk-count').textContent = KBS.reduce(function(a,k){ return a+(k.chunk_count||0); }, 0);
    var agentSet = new Set();
    KBS.forEach(function(k){ (k.linked_agents||[]).forEach(function(a){ agentSet.add(a); }); });
    document.getElementById('stat-agent-count').textContent = agentSet.size;
  }

  function renderKBs() {
    var q = document.getElementById('kb-search').value.toLowerCase();
    var filtered = KBS.filter(function(k) {
      return !q || k.name.toLowerCase().includes(q) || (k.description||'').toLowerCase().includes(q);
    });

    if (!filtered.length) {
      document.getElementById('kb-grid').innerHTML = '';
      document.getElementById('kb-empty').classList.remove('hidden');
      return;
    }
    document.getElementById('kb-empty').classList.add('hidden');

    document.getElementById('kb-grid').innerHTML = filtered.map(function(kb) {
      var hasData = kb.document_count > 0;
      var pct = hasData ? Math.min(100, Math.round(kb.chunk_count / 500 * 100)) : 0;
      var status = kb.document_count === 0 ? '${t.empty}' : '${t.indexed}';
      var statusColor = kb.document_count === 0 ? 'bg-gray-700 text-gray-400' : 'bg-green-900 text-green-300';
      var agents = kb.linked_agents || [];

      return '<div class="kb-card glass rounded-xl p-5 flex flex-col gap-3 card-hover relative">'
        + '<div class="flex items-start justify-between gap-2">'
        +   '<div class="flex items-center gap-3 min-w-0">'
        +     '<div class="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-700/40 flex items-center justify-center flex-shrink-0">'
        +       '<i class="fas fa-database text-blue-400" style="font-size:16px"></i>'
        +     '</div>'
        +     '<div class="min-w-0">'
        +       '<h3 class="font-semibold text-white text-sm truncate">'+kb.name+'</h3>'
        +       '<p class="text-gray-400 text-xs mt-0.5 line-clamp-1">'+(kb.description||'')+'</p>'
        +     '</div>'
        +   '</div>'
        +   '<span class="text-xs px-2 py-0.5 rounded-full flex-shrink-0 '+statusColor+'">'+status+'</span>'
        + '</div>'
        // Stats
        + '<div class="grid grid-cols-3 gap-2 text-center">'
        +   '<div class="bg-gray-800 rounded-lg px-2 py-1.5"><p class="text-sm font-bold text-white">'+kb.document_count+'</p><p class="text-xs text-gray-400">${t.docs}</p></div>'
        +   '<div class="bg-gray-800 rounded-lg px-2 py-1.5"><p class="text-sm font-bold text-white">'+kb.chunk_count+'</p><p class="text-xs text-gray-400">${t.chunks}</p></div>'
        +   '<div class="bg-gray-800 rounded-lg px-2 py-1.5"><p class="text-sm font-bold text-white">'+agents.length+'</p><p class="text-xs text-gray-400">${isRu ? 'агентов' : 'agents'}</p></div>'
        + '</div>'
        // Embedding model
        + '<p class="text-xs text-gray-500"><i class="fas fa-microchip mr-1"></i>'+kb.embedding_model+'</p>'
        // Actions
        + '<div class="kb-actions flex gap-2">'
        +   '<button onclick="openUpload(\''+kb.id+'\',\''+kb.name+'\')" class="flex-1 text-xs bg-green-800 hover:bg-green-700 text-green-200 py-1.5 rounded-lg transition"><i class="fas fa-upload mr-1"></i>${t.upload}</button>'
        +   '<button onclick="openLinkAgent(\''+kb.id+'\')" class="flex-1 text-xs bg-blue-800 hover:bg-blue-700 text-blue-200 py-1.5 rounded-lg transition"><i class="fas fa-robot mr-1"></i>${t.linkAgent}</button>'
        +   '<button onclick="deleteKB(\''+kb.id+'\')" class="text-xs bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1.5 rounded-lg transition"><i class="fas fa-trash"></i></button>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  // ── New KB ──────────────────────────────────────────────────────────────
  function openNewKB()  { document.getElementById('new-kb-modal').classList.remove('hidden'); }
  function closeNewKB() { document.getElementById('new-kb-modal').classList.add('hidden'); }

  function createKB() {
    var name = document.getElementById('kb-name').value.trim();
    if (!name) return;

    fetch('/api/business/knowledge-bases', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        name: name,
        description: document.getElementById('kb-desc').value,
        embedding_model: document.getElementById('kb-model').value
      })
    })
    .then(function(r){ return r.json(); })
    .then(function(data) {
      KBS.unshift({ id: data.id, name: name,
        description: document.getElementById('kb-desc').value,
        document_count:0, chunk_count:0,
        embedding_model: document.getElementById('kb-model').value,
        created_at: new Date().toISOString(), linked_agents:[] });
      updateStats();
      renderKBs();
      closeNewKB();
      document.getElementById('kb-name').value = '';
      document.getElementById('kb-desc').value = '';
    })
    .catch(function() {
      // Offline mode: add locally
      KBS.unshift({ id:'local-'+Date.now(), name:name,
        description: document.getElementById('kb-desc').value,
        document_count:0, chunk_count:0,
        embedding_model: document.getElementById('kb-model').value,
        created_at: new Date().toISOString(), linked_agents:[] });
      updateStats();
      renderKBs();
      closeNewKB();
    });
  }

  // ── Upload ──────────────────────────────────────────────────────────────
  function openUpload(id, name) {
    selectedKBId = id;
    pendingFiles = [];
    document.getElementById('upload-kb-name').textContent = name;
    document.getElementById('file-list').innerHTML = '';
    document.getElementById('upload-modal').classList.remove('hidden');
  }
  function closeUpload() { document.getElementById('upload-modal').classList.add('hidden'); }

  function handleFileSelect(input) {
    Array.from(input.files).forEach(addFile);
    input.value = '';
  }
  function handleDrop(e) {
    e.preventDefault();
    document.getElementById('drop-zone').classList.remove('dragover');
    Array.from(e.dataTransfer.files).forEach(addFile);
  }
  function addFile(file) {
    pendingFiles.push(file);
    var ext = file.name.split('.').pop().toLowerCase();
    var icons = {pdf:'fa-file-pdf text-red-400', txt:'fa-file-alt text-gray-400', md:'fa-file-code text-blue-400', docx:'fa-file-word text-blue-400'};
    var icon = icons[ext] || 'fa-file text-gray-400';
    var size = file.size < 1024*1024 ? (file.size/1024).toFixed(1)+' KB' : (file.size/1024/1024).toFixed(1)+' MB';
    var html = '<div class="flex items-center gap-3 bg-gray-800 rounded-lg px-3 py-2" id="file-'+pendingFiles.length+'">'
      + '<i class="fas '+icon+' flex-shrink-0"></i>'
      + '<span class="flex-1 text-sm text-gray-300 truncate">'+file.name+'</span>'
      + '<span class="text-xs text-gray-500">'+size+'</span>'
      + '<span class="text-xs text-yellow-400" id="fstatus-'+pendingFiles.length+'"><i class="fas fa-clock"></i></span>'
      + '</div>';
    document.getElementById('file-list').insertAdjacentHTML('beforeend', html);
  }

  function simulateUpload() {
    if (!pendingFiles.length) return;
    var btn = document.getElementById('upload-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> ${t.processing}';

    pendingFiles.forEach(function(f, i) {
      setTimeout(function() {
        var el = document.getElementById('fstatus-'+(i+1));
        if (el) el.innerHTML = '<i class="fas fa-check text-green-400"></i>';
      }, (i+1)*800);
    });

    setTimeout(function() {
      // Update KB stats locally
      var kb = KBS.find(function(k){ return k.id === selectedKBId; });
      if (kb) {
        kb.document_count += pendingFiles.length;
        kb.chunk_count    += pendingFiles.length * 40;
      }
      updateStats();
      renderKBs();
      closeUpload();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-upload mr-1"></i> ${isRu ? 'Загрузить и индексировать' : 'Upload & Index'}';
    }, pendingFiles.length * 800 + 400);
  }

  // ── Link agent ──────────────────────────────────────────────────────────
  function openLinkAgent(id) {
    selectedKBId = id;
    var kb = KBS.find(function(k){ return k.id === id; });
    var linked = kb ? (kb.linked_agents || []) : [];
    document.querySelectorAll('#link-modal input[type=checkbox]').forEach(function(cb) {
      cb.checked = linked.includes(cb.value);
    });
    document.getElementById('link-modal').classList.remove('hidden');
  }

  function saveLinkAgents() {
    var selected = [];
    document.querySelectorAll('#link-modal input[type=checkbox]:checked').forEach(function(cb) {
      selected.push(cb.value);
    });
    var kb = KBS.find(function(k){ return k.id === selectedKBId; });
    if (kb) kb.linked_agents = selected;
    updateStats();
    renderKBs();
    document.getElementById('link-modal').classList.add('hidden');
  }

  // ── Delete ──────────────────────────────────────────────────────────────
  function deleteKB(id) {
    if (!confirm('${isRu ? 'Удалить базу знаний? Это действие необратимо.' : 'Delete knowledge base? This cannot be undone.'}')) return;
    fetch('/api/business/knowledge-bases/'+id, { method:'DELETE' })
      .catch(function(){})
      .finally(function() {
        KBS = KBS.filter(function(k){ return k.id !== id; });
        updateStats();
        renderKBs();
      });
  }

  loadKBs();
  </script>
</body>
</html>`
}
