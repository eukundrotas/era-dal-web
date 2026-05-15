import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

const COLUMNS = [
  { key: 'new',        color: '#60a5fa', bg: 'rgba(96,165,250,.12)',  icon: 'fa-star' },
  { key: 'called',     color: '#fbbf24', bg: 'rgba(251,191,36,.12)',  icon: 'fa-phone' },
  { key: 'interested', color: '#a78bfa', bg: 'rgba(167,139,250,.12)', icon: 'fa-fire' },
  { key: 'meeting',    color: '#34d399', bg: 'rgba(52,211,153,.12)',  icon: 'fa-calendar-check' },
  { key: 'client',     color: '#10b981', bg: 'rgba(16,185,129,.18)',  icon: 'fa-handshake' },
  { key: 'declined',   color: '#f87171', bg: 'rgba(248,113,113,.12)', icon: 'fa-times-circle' },
]

export const pipelinePage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'

  const LABELS: Record<string, string> = {
    new:        isRu ? 'Новые'    : 'New',
    called:     isRu ? 'Звонили'  : 'Called',
    interested: isRu ? 'Интерес'  : 'Interested',
    meeting:    isRu ? 'Встреча'  : 'Meeting',
    client:     isRu ? 'Клиенты'  : 'Clients',
    declined:   isRu ? 'Отказ'    : 'Declined',
  }

  const columnsJson = JSON.stringify(COLUMNS)
  const labelsJson  = JSON.stringify(LABELS)

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(isRu ? 'Пайплайн' : 'Pipeline', isRu ? 'Воронка продаж и управление лидами' : 'Sales funnel and lead management', lang)}
  <style>
    .board-wrap { display:flex; gap:16px; overflow-x:auto; padding-bottom:16px; align-items:flex-start; }
    .board-wrap::-webkit-scrollbar { height:6px; }
    .board-wrap::-webkit-scrollbar-track { background:transparent; }
    .board-wrap::-webkit-scrollbar-thumb { background:rgba(255,255,255,.12); border-radius:3px; }
    .kanban-col {
      flex-shrink:0; width:260px; border-radius:14px;
      background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);
      display:flex; flex-direction:column; max-height:calc(100vh - 260px);
    }
    .kanban-col.drag-over {
      border-color:rgba(99,102,241,.6) !important;
      background:rgba(99,102,241,.07) !important;
    }
    .col-header { padding:12px 14px 10px; border-radius:14px 14px 0 0; }
    .col-body { flex:1; overflow-y:auto; padding:0 8px 8px; min-height:60px; }
    .col-body::-webkit-scrollbar { width:4px; }
    .col-body::-webkit-scrollbar-thumb { background:rgba(255,255,255,.1); border-radius:2px; }
    .kanban-card {
      background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.09);
      border-radius:10px; padding:10px 12px; margin-top:8px; cursor:grab;
      transition:box-shadow .15s, transform .15s, opacity .15s;
      position:relative; user-select:none;
    }
    .kanban-card:hover { box-shadow:0 4px 20px rgba(0,0,0,.35); transform:translateY(-2px); }
    .kanban-card.dragging { opacity:.45; transform:rotate(2deg); cursor:grabbing; }
    .card-actions {
      display:none; position:absolute; top:8px; right:8px;
      gap:4px; background:rgba(17,24,39,.9); border-radius:6px; padding:3px;
    }
    .kanban-card:hover .card-actions { display:flex; }
    .card-act-btn {
      width:22px; height:22px; border-radius:4px; display:flex;
      align-items:center; justify-content:center; font-size:10px;
      transition:background .15s; cursor:pointer; color:#9ca3af;
    }
    .card-act-btn:hover { background:rgba(255,255,255,.15); color:#fff; }
    .funnel-step { flex:1; min-width:0; }
    .funnel-arrow { color:#4b5563; font-size:18px; flex-shrink:0; }
    .status-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
    .add-card-btn {
      margin:8px 8px 0; padding:7px; border:1px dashed rgba(255,255,255,.15);
      border-radius:8px; text-align:center; font-size:12px; color:#6b7280;
      cursor:pointer; transition:all .15s;
    }
    .add-card-btn:hover { border-color:rgba(255,255,255,.35); color:#d1d5db; background:rgba(255,255,255,.04); }
    .modal-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,.65);
      backdrop-filter:blur(4px); z-index:200;
      display:none; align-items:center; justify-content:center;
    }
    .modal-overlay.open { display:flex; }
    .modal-box {
      background:#111827; border:1px solid rgba(255,255,255,.12);
      border-radius:16px; padding:28px; width:100%; max-width:500px; max-height:90vh; overflow-y:auto;
    }
    input[type=text],input[type=tel],input[type=email],select,textarea {
      background:#0f172a; border:1px solid rgba(255,255,255,.12); border-radius:8px;
      color:#fff; width:100%; padding:8px 12px; font-size:14px; outline:none; transition:border-color .2s;
    }
    input:focus,select:focus,textarea:focus { border-color:#3b82f6; }
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('pipeline', lang)}

  <!-- Edit Modal -->
  <div id="modal-edit" class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-bold" id="modal-title">${isRu ? 'Контакт' : 'Contact'}</h2>
        <button onclick="closeModal()" class="text-gray-400 hover:text-white text-xl">&times;</button>
      </div>
      <form onsubmit="saveContact(event)" class="space-y-3">
        <input type="hidden" id="edit-id">
        <input type="hidden" id="edit-status-hidden">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Имя' : 'Name'}</label>
            <input type="text" id="edit-name" placeholder="${isRu ? 'Иван Иванов' : 'John Doe'}">
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Компания' : 'Company'}</label>
            <input type="text" id="edit-company">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Телефон' : 'Phone'}</label>
            <input type="tel" id="edit-phone" placeholder="+79001234567">
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">Email</label>
            <input type="email" id="edit-email">
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Источник' : 'Source'}</label>
          <input type="text" id="edit-source" placeholder="https://...">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Статус' : 'Status'}</label>
            <select id="edit-status-select">
              <option value="new">${isRu ? 'Новый' : 'New'}</option>
              <option value="called">${isRu ? 'Звонили' : 'Called'}</option>
              <option value="interested">${isRu ? 'Интерес' : 'Interested'}</option>
              <option value="meeting">${isRu ? 'Встреча' : 'Meeting'}</option>
              <option value="client">${isRu ? 'Клиент' : 'Client'}</option>
              <option value="declined">${isRu ? 'Отказ' : 'Declined'}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Теги' : 'Tags'}</label>
            <input type="text" id="edit-tags">
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Заметки' : 'Notes'}</label>
          <textarea id="edit-notes" rows="2"></textarea>
        </div>
        <div class="flex justify-end gap-3 pt-1">
          <button type="button" onclick="closeModal()"
            class="px-4 py-2 text-sm text-gray-400 hover:text-white glass rounded-lg">${isRu ? 'Отмена' : 'Cancel'}</button>
          <button type="submit"
            class="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">${isRu ? 'Сохранить' : 'Save'}</button>
        </div>
      </form>
    </div>
  </div>

  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6">

      <!-- Header -->
      <div class="flex items-center justify-between mb-5">
        <div>
          <h1 class="text-2xl font-bold flex items-center gap-3">
            <i class="fas fa-columns text-purple-400"></i>
            ${isRu ? 'Пайплайн продаж' : 'Sales Pipeline'}
          </h1>
          <p class="text-gray-400 mt-1 text-sm">${isRu ? 'Визуальная воронка — перетаскивайте карточки для смены статуса' : 'Visual funnel — drag cards to change status'}</p>
        </div>
        <div class="flex gap-2">
          <a href="/contacts?lang=${lang}" class="glass hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition flex items-center gap-2">
            <i class="fas fa-list text-blue-400"></i>${isRu ? 'Таблица' : 'Table view'}
          </a>
          <button onclick="openAdd()"
            class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
            <i class="fas fa-plus"></i>${isRu ? 'Добавить' : 'Add Contact'}
          </button>
        </div>
      </div>

      <!-- Funnel stats -->
      <div class="flex items-center gap-1 mb-5 glass rounded-xl p-3 overflow-x-auto" id="funnel-bar">
        <div class="text-xs text-gray-500 pr-2 flex-shrink-0">${isRu ? 'Воронка:' : 'Funnel:'}</div>
      </div>

      <!-- Board -->
      <div class="board-wrap" id="board"></div>
    </div>
  </main>

<script>
const COLUMNS = ${columnsJson};
const LABELS  = ${labelsJson};
const isRu = ${isRu};

let contacts = [];
let dragId = null;

// ── Init ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', loadContacts);

async function loadContacts() {
  try {
    const res = await fetch('/api/contacts');
    const d = await res.json();
    contacts = d.contacts || [];
  } catch(e) { contacts = []; }
  renderBoard();
  renderFunnel();
}

// ── Funnel bar ────────────────────────────────────────────────────────────
function renderFunnel() {
  const bar = document.getElementById('funnel-bar');
  const activeCols = COLUMNS.filter(c => c.key !== 'declined');
  let html = '<div class="text-xs text-gray-500 pr-2 flex-shrink-0">' + (isRu ? 'Воронка:' : 'Funnel:') + '</div>';
  activeCols.forEach((col, i) => {
    const cnt = contacts.filter(c => c.status === col.key).length;
    const prevCnt = i === 0 ? null : contacts.filter(c => c.status === activeCols[i-1].key).length;
    const pct = (prevCnt && prevCnt > 0) ? Math.round(cnt / prevCnt * 100) : null;
    html += \`<div class="funnel-step text-center flex-shrink-0 min-w-[80px]">
      <div class="text-lg font-bold" style="color:\${col.color}">\${cnt}</div>
      <div class="text-xs text-gray-400">\${LABELS[col.key]}</div>
      \${pct !== null ? \`<div class="text-xs text-gray-600">\${pct}%</div>\` : ''}
    </div>\`;
    if (i < activeCols.length - 1) html += '<div class="funnel-arrow flex-shrink-0 self-center"><i class="fas fa-chevron-right"></i></div>';
  });
  bar.innerHTML = html;
}

// ── Board ─────────────────────────────────────────────────────────────────
function renderBoard() {
  const board = document.getElementById('board');
  board.innerHTML = COLUMNS.map(col => {
    const cards = contacts.filter(c => c.status === col.key);
    return \`
    <div class="kanban-col" id="col-\${col.key}"
      ondragover="onDragOver(event,'\${col.key}')"
      ondragleave="onDragLeave(event)"
      ondrop="onDrop(event,'\${col.key}')">
      <div class="col-header" style="background:\${col.bg}; border-bottom:2px solid \${col.color}40">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="status-dot" style="background:\${col.color}"></div>
            <span class="font-semibold text-sm" style="color:\${col.color}">\${LABELS[col.key]}</span>
          </div>
          <span class="text-xs font-bold px-2 py-0.5 rounded-full" style="background:\${col.color}22;color:\${col.color}" id="cnt-\${col.key}">\${cards.length}</span>
        </div>
      </div>
      <div class="add-card-btn" onclick="openAdd('\${col.key}')">
        <i class="fas fa-plus mr-1"></i>\${isRu ? 'Добавить' : 'Add'}
      </div>
      <div class="col-body" id="body-\${col.key}">
        \${cards.map(c => cardHtml(c, col.color)).join('')}
        \${!cards.length ? \`<div class="text-center text-xs text-gray-600 py-4">\${isRu ? 'Нет контактов' : 'Empty'}</div>\` : ''}
      </div>
    </div>\`;
  }).join('');
}

function cardHtml(c, color) {
  const initials = ((c.name||c.company||'?')[0]).toUpperCase();
  const phone = c.phone ? \`<a href="tel:\${c.phone}" onclick="event.stopPropagation()" class="text-xs block mt-1" style="color:\${color};opacity:.9">\${c.phone}</a>\` : '';
  const tags = (c.tags||'').split(',').filter(Boolean).slice(0,2).map(t =>
    \`<span class="text-xs px-1.5 py-0.5 rounded bg-white/10 text-gray-400">\${t.trim()}</span>\`
  ).join('');
  const date = new Date(c.createdAt).toLocaleDateString(isRu ? 'ru-RU' : 'en-US', {day:'2-digit',month:'short'});
  return \`<div class="kanban-card" id="card-\${c.id}" draggable="true"
    ondragstart="onDragStart(event,'\${c.id}')"
    ondragend="onDragEnd(event)"
    onclick="openEdit('\${c.id}')">
    <div class="card-actions">
      \${c.phone ? \`<a href="tel:\${c.phone}" onclick="event.stopPropagation()" class="card-act-btn text-green-400" title="\${isRu ? 'Позвонить' : 'Call'}"><i class="fas fa-phone"></i></a>\` : ''}
      <div class="card-act-btn text-blue-400" onclick="event.stopPropagation();openEdit('\${c.id}')" title="\${isRu ? 'Редактировать' : 'Edit'}"><i class="fas fa-pen"></i></div>
      <div class="card-act-btn text-red-400" onclick="event.stopPropagation();deleteCard('\${c.id}')" title="\${isRu ? 'Удалить' : 'Delete'}"><i class="fas fa-trash"></i></div>
    </div>
    <div class="flex items-start gap-2">
      <div class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style="background:\${color}33;color:\${color}">\${initials}</div>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-white truncate">\${c.name || '<span class="text-gray-500">—</span>'}</p>
        \${c.company ? \`<p class="text-xs text-gray-400 truncate">\${c.company}</p>\` : ''}
      </div>
    </div>
    \${phone}
    \${tags ? \`<div class="flex flex-wrap gap-1 mt-2">\${tags}</div>\` : ''}
    \${c.notes ? \`<p class="text-xs text-gray-500 mt-1 truncate">\${c.notes}</p>\` : ''}
    <div class="text-xs text-gray-600 mt-2 text-right">\${date}</div>
  </div>\`;
}

// ── Drag & Drop ───────────────────────────────────────────────────────────
function onDragStart(e, id) {
  dragId = id;
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(() => { const el = document.getElementById('card-'+id); if(el) el.classList.add('dragging'); }, 0);
}
function onDragEnd(e) {
  if (dragId) { const el = document.getElementById('card-'+dragId); if(el) el.classList.remove('dragging'); }
  document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));
}
function onDragOver(e, status) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));
  document.getElementById('col-'+status).classList.add('drag-over');
}
function onDragLeave(e) {
  if (!e.currentTarget.contains(e.relatedTarget)) e.currentTarget.classList.remove('drag-over');
}
async function onDrop(e, status) {
  e.preventDefault();
  document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));
  if (!dragId) return;
  const c = contacts.find(x => x.id === dragId);
  if (!c || c.status === status) { dragId = null; return; }
  await updateStatus(dragId, status);
  dragId = null;
}

async function updateStatus(id, status) {
  const c = contacts.find(x => x.id === id);
  if (!c) return;
  const res = await fetch('/api/contacts/'+id, {
    method:'PUT', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({...c, status}),
  });
  const d = await res.json();
  contacts = contacts.map(x => x.id === id ? d.contact : x);
  renderBoard();
  renderFunnel();
}

// ── CRUD ──────────────────────────────────────────────────────────────────
function openAdd(status) {
  document.getElementById('modal-title').textContent = isRu ? 'Новый контакт' : 'New Contact';
  document.getElementById('edit-id').value = '';
  document.getElementById('edit-name').value = '';
  document.getElementById('edit-company').value = '';
  document.getElementById('edit-phone').value = '';
  document.getElementById('edit-email').value = '';
  document.getElementById('edit-source').value = '';
  document.getElementById('edit-status-select').value = status || 'new';
  document.getElementById('edit-tags').value = '';
  document.getElementById('edit-notes').value = '';
  openModal();
}

function openEdit(id) {
  const c = contacts.find(x => x.id === id);
  if (!c) return;
  document.getElementById('modal-title').textContent = c.name || (isRu ? 'Редактировать' : 'Edit Contact');
  document.getElementById('edit-id').value = c.id;
  document.getElementById('edit-name').value = c.name || '';
  document.getElementById('edit-company').value = c.company || '';
  document.getElementById('edit-phone').value = c.phone || '';
  document.getElementById('edit-email').value = c.email || '';
  document.getElementById('edit-source').value = c.source || '';
  document.getElementById('edit-status-select').value = c.status || 'new';
  document.getElementById('edit-tags').value = c.tags || '';
  document.getElementById('edit-notes').value = c.notes || '';
  openModal();
}

async function saveContact(e) {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;
  const payload = {
    name:    document.getElementById('edit-name').value.trim(),
    company: document.getElementById('edit-company').value.trim(),
    phone:   document.getElementById('edit-phone').value.trim(),
    email:   document.getElementById('edit-email').value.trim(),
    source:  document.getElementById('edit-source').value.trim(),
    status:  document.getElementById('edit-status-select').value,
    tags:    document.getElementById('edit-tags').value.trim(),
    notes:   document.getElementById('edit-notes').value.trim(),
  };
  const url = id ? '/api/contacts/'+id : '/api/contacts';
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
  const d = await res.json();
  if (id) contacts = contacts.map(x => x.id === id ? d.contact : x);
  else contacts.unshift(d.contact);
  closeModal();
  renderBoard();
  renderFunnel();
}

async function deleteCard(id) {
  if (!confirm(isRu ? 'Удалить контакт?' : 'Delete contact?')) return;
  await fetch('/api/contacts/'+id, { method:'DELETE' });
  contacts = contacts.filter(c => c.id !== id);
  renderBoard();
  renderFunnel();
}

function openModal()  { document.getElementById('modal-edit').classList.add('open'); }
function closeModal() { document.getElementById('modal-edit').classList.remove('open'); }
</script>
</body>
</html>`
}
