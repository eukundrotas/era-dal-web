import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const contactsPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(
    isRu ? 'Контакты' : 'Contacts',
    isRu ? 'Управление контактами и лидами' : 'Contacts and leads management',
    lang
  )}
  <style>
    .status-badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 2px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600;
    }
    .s-new      { background: rgba(96,165,250,.18); color: #60a5fa; }
    .s-called   { background: rgba(251,191,36,.18);  color: #fbbf24; }
    .s-interested { background: rgba(167,139,250,.18); color: #a78bfa; }
    .s-meeting  { background: rgba(52,211,153,.18);  color: #34d399; }
    .s-client   { background: rgba(16,185,129,.25);  color: #10b981; }
    .s-declined { background: rgba(248,113,113,.18); color: #f87171; }
    .s-invalid  { background: rgba(107,114,128,.2);  color: #9ca3af; }
    .row-cb:checked ~ td { background: rgba(59,130,246,.05); }
    .sort-btn { cursor:pointer; user-select:none; }
    .sort-btn:hover { color:#60a5fa; }
    tr.selected td { background: rgba(59,130,246,.07) !important; }
    .action-bar {
      position: sticky; bottom: 0; left: 0; right: 0;
      background: rgba(17,24,39,.95); backdrop-filter: blur(12px);
      border-top: 1px solid rgba(255,255,255,.1);
      padding: 12px 24px;
      transform: translateY(100%);
      transition: transform .2s ease;
    }
    .action-bar.visible { transform: translateY(0); }
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.65);
      backdrop-filter: blur(4px); z-index: 200;
      display: none; align-items: center; justify-content: center;
    }
    .modal-overlay.open { display: flex; }
    .modal-box {
      background: #111827; border: 1px solid rgba(255,255,255,.12);
      border-radius: 16px; padding: 28px; width: 100%; max-width: 520px;
      max-height: 90vh; overflow-y: auto;
    }
    input[type=text],input[type=tel],input[type=email],select,textarea {
      background: #0f172a; border: 1px solid rgba(255,255,255,.12);
      border-radius: 8px; color: #fff; width: 100%;
      padding: 8px 12px; font-size: 14px; outline: none;
      transition: border-color .2s;
    }
    input:focus,select:focus,textarea:focus { border-color: #3b82f6; }
    .tab-btn { padding: 6px 16px; border-radius: 8px; font-size: 13px; font-weight:500; cursor:pointer; }
    .tab-btn.active { background: rgba(59,130,246,.25); color:#60a5fa; }
    .tab-btn:not(.active) { color: #6b7280; }
    .tab-btn:not(.active):hover { color: #9ca3af; }
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('contacts', lang)}

  <!-- Edit / Add Modal -->
  <div id="modal-edit" class="modal-overlay" onclick="if(event.target===this)closeModal('edit')">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-bold" id="modal-edit-title">${isRu ? 'Добавить контакт' : 'Add Contact'}</h2>
        <button onclick="closeModal('edit')" class="text-gray-400 hover:text-white text-xl leading-none">&times;</button>
      </div>
      <form id="form-contact" onsubmit="saveContact(event)" class="space-y-4">
        <input type="hidden" id="edit-id">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Имя' : 'Name'}</label>
            <input type="text" id="edit-name" placeholder="${isRu ? 'Иван Иванов' : 'John Doe'}">
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Компания' : 'Company'}</label>
            <input type="text" id="edit-company" placeholder="${isRu ? 'ООО Ромашка' : 'Acme Ltd'}">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Телефон' : 'Phone'}</label>
            <input type="tel" id="edit-phone" placeholder="+79001234567">
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">Email</label>
            <input type="email" id="edit-email" placeholder="info@example.ru">
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Источник (URL)' : 'Source URL'}</label>
          <input type="text" id="edit-source" placeholder="https://example.ru">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Статус' : 'Status'}</label>
            <select id="edit-status">
              <option value="new">${isRu ? 'Новый' : 'New'}</option>
              <option value="called">${isRu ? 'Звонили' : 'Called'}</option>
              <option value="interested">${isRu ? 'Интерес' : 'Interested'}</option>
              <option value="meeting">${isRu ? 'Встреча' : 'Meeting'}</option>
              <option value="client">${isRu ? 'Клиент' : 'Client'}</option>
              <option value="declined">${isRu ? 'Отказ' : 'Declined'}</option>
              <option value="invalid">${isRu ? 'Невалидный' : 'Invalid'}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Теги (через запятую)' : 'Tags (comma-separated)'}</label>
            <input type="text" id="edit-tags" placeholder="${isRu ? 'ремонт, Москва' : 'roofing, Moscow'}">
          </div>
        </div>
        <div>
          <label class="block text-xs text-gray-400 mb-1">${isRu ? 'Заметки' : 'Notes'}</label>
          <textarea id="edit-notes" rows="3" placeholder="${isRu ? 'Комментарий...' : 'Comment...'}"></textarea>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" onclick="closeModal('edit')"
            class="px-4 py-2 text-sm text-gray-400 hover:text-white glass rounded-lg transition">
            ${isRu ? 'Отмена' : 'Cancel'}
          </button>
          <button type="submit"
            class="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
            ${isRu ? 'Сохранить' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Import CSV Modal -->
  <div id="modal-import" class="modal-overlay" onclick="if(event.target===this)closeModal('import')">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-bold">${isRu ? 'Импорт CSV' : 'Import CSV'}</h2>
        <button onclick="closeModal('import')" class="text-gray-400 hover:text-white text-xl leading-none">&times;</button>
      </div>
      <div class="space-y-4">
        <p class="text-sm text-gray-400">
          ${isRu
            ? 'Поддерживаемые колонки: <code class="text-blue-300">Phone, Email, Name, Company, Source, Status, Tags, Notes</code>'
            : 'Supported columns: <code class="text-blue-300">Phone, Email, Name, Company, Source, Status, Tags, Notes</code>'}
        </p>
        <div id="drop-zone"
          ondragover="event.preventDefault()" ondrop="handleFileDrop(event)"
          class="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition"
          onclick="document.getElementById('csv-file-input').click()">
          <i class="fas fa-cloud-upload-alt text-3xl text-gray-500 mb-3"></i>
          <p class="text-gray-400 text-sm">${isRu ? 'Перетащите CSV или нажмите для выбора' : 'Drag CSV here or click to select'}</p>
          <input type="file" id="csv-file-input" accept=".csv" class="hidden" onchange="handleFileSelect(event)">
        </div>
        <div id="import-preview" class="hidden">
          <p class="text-sm text-gray-400 mb-2" id="import-preview-text"></p>
          <div class="flex justify-end gap-3">
            <button onclick="closeModal('import')"
              class="px-4 py-2 text-sm text-gray-400 glass rounded-lg hover:text-white transition">${isRu ? 'Отмена' : 'Cancel'}</button>
            <button onclick="confirmImport()"
              class="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 rounded-lg font-medium transition">
              ${isRu ? 'Импортировать' : 'Import'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <main class="ml-64 min-h-screen flex flex-col">
    <div class="p-6 flex-1">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold flex items-center gap-3">
            <i class="fas fa-address-book text-blue-400"></i>
            ${isRu ? 'Контакты' : 'Contacts'}
          </h1>
          <p class="text-gray-400 mt-1 text-sm">${isRu ? 'Управление лидами и клиентами' : 'Lead and client management'}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="openImport()"
            class="glass hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition flex items-center gap-2">
            <i class="fas fa-file-import text-green-400"></i>${isRu ? 'Импорт CSV' : 'Import CSV'}
          </button>
          <button onclick="exportCsv()"
            class="glass hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition flex items-center gap-2">
            <i class="fas fa-file-export text-yellow-400"></i>${isRu ? 'Экспорт' : 'Export'}
          </button>
          <button onclick="openAdd()"
            class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
            <i class="fas fa-plus"></i>${isRu ? 'Добавить' : 'Add Contact'}
          </button>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="grid grid-cols-7 gap-3 mb-5">
        <div class="glass rounded-xl p-3 text-center col-span-1 cursor-pointer hover:bg-white/5 stat-card" data-filter="">
          <p class="text-xl font-bold" id="cnt-total">0</p>
          <p class="text-xs text-gray-400 mt-0.5">${isRu ? 'Всего' : 'Total'}</p>
        </div>
        <div class="glass rounded-xl p-3 text-center cursor-pointer hover:bg-white/5 stat-card" data-filter="new">
          <p class="text-xl font-bold text-blue-400" id="cnt-new">0</p>
          <p class="text-xs text-gray-400 mt-0.5">${isRu ? 'Новые' : 'New'}</p>
        </div>
        <div class="glass rounded-xl p-3 text-center cursor-pointer hover:bg-white/5 stat-card" data-filter="called">
          <p class="text-xl font-bold text-yellow-400" id="cnt-called">0</p>
          <p class="text-xs text-gray-400 mt-0.5">${isRu ? 'Звонили' : 'Called'}</p>
        </div>
        <div class="glass rounded-xl p-3 text-center cursor-pointer hover:bg-white/5 stat-card" data-filter="interested">
          <p class="text-xl font-bold text-purple-400" id="cnt-interested">0</p>
          <p class="text-xs text-gray-400 mt-0.5">${isRu ? 'Интерес' : 'Interested'}</p>
        </div>
        <div class="glass rounded-xl p-3 text-center cursor-pointer hover:bg-white/5 stat-card" data-filter="meeting">
          <p class="text-xl font-bold text-emerald-400" id="cnt-meeting">0</p>
          <p class="text-xs text-gray-400 mt-0.5">${isRu ? 'Встреча' : 'Meeting'}</p>
        </div>
        <div class="glass rounded-xl p-3 text-center cursor-pointer hover:bg-white/5 stat-card" data-filter="client">
          <p class="text-xl font-bold text-green-400" id="cnt-client">0</p>
          <p class="text-xs text-gray-400 mt-0.5">${isRu ? 'Клиент' : 'Client'}</p>
        </div>
        <div class="glass rounded-xl p-3 text-center cursor-pointer hover:bg-white/5 stat-card" data-filter="declined">
          <p class="text-xl font-bold text-red-400" id="cnt-declined">0</p>
          <p class="text-xs text-gray-400 mt-0.5">${isRu ? 'Отказ' : 'Declined'}</p>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="flex items-center gap-3 mb-4 flex-wrap">
        <div class="relative flex-1 min-w-[220px]">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
          <input type="text" id="search-input" oninput="applyFilters()"
            placeholder="${isRu ? 'Поиск по имени, телефону, email...' : 'Search by name, phone, email...'}"
            class="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <select id="filter-status" onchange="applyFilters()"
          class="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
          <option value="">${isRu ? 'Все статусы' : 'All statuses'}</option>
          <option value="new">${isRu ? 'Новый' : 'New'}</option>
          <option value="called">${isRu ? 'Звонили' : 'Called'}</option>
          <option value="interested">${isRu ? 'Интерес' : 'Interested'}</option>
          <option value="meeting">${isRu ? 'Встреча' : 'Meeting'}</option>
          <option value="client">${isRu ? 'Клиент' : 'Client'}</option>
          <option value="declined">${isRu ? 'Отказ' : 'Declined'}</option>
          <option value="invalid">${isRu ? 'Невалидный' : 'Invalid'}</option>
        </select>
        <select id="filter-sort" onchange="applyFilters()"
          class="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
          <option value="date_desc">${isRu ? 'Дата ↓' : 'Date ↓'}</option>
          <option value="date_asc">${isRu ? 'Дата ↑' : 'Date ↑'}</option>
          <option value="name_asc">${isRu ? 'Имя А–Я' : 'Name A–Z'}</option>
          <option value="status">${isRu ? 'По статусу' : 'By status'}</option>
        </select>
        <span id="result-count" class="text-xs text-gray-500 ml-auto"></span>
      </div>

      <!-- Table -->
      <div class="glass rounded-xl overflow-hidden">
        <table class="w-full text-sm" id="contacts-table">
          <thead class="bg-white/5 text-gray-400 text-xs uppercase select-none">
            <tr>
              <th class="px-4 py-3 w-8">
                <input type="checkbox" id="select-all" onchange="toggleAll(this)" class="accent-blue-500">
              </th>
              <th class="px-4 py-3 text-left sort-btn" onclick="sortBy('name')">${isRu ? 'Имя / Компания' : 'Name / Company'}</th>
              <th class="px-4 py-3 text-left">${isRu ? 'Телефон' : 'Phone'}</th>
              <th class="px-4 py-3 text-left">Email</th>
              <th class="px-4 py-3 text-left sort-btn" onclick="sortBy('status')">${isRu ? 'Статус' : 'Status'}</th>
              <th class="px-4 py-3 text-left">${isRu ? 'Теги' : 'Tags'}</th>
              <th class="px-4 py-3 text-left sort-btn" onclick="sortBy('date')">${isRu ? 'Дата' : 'Date'}</th>
              <th class="px-4 py-3 text-right">${isRu ? 'Действия' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody id="contacts-tbody">
            <tr><td colspan="8" class="px-4 py-12 text-center text-gray-500">${isRu ? 'Загрузка...' : 'Loading...'}</td></tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-4 py-3 border-t border-gray-800">
          <span class="text-xs text-gray-500" id="page-info"></span>
          <div class="flex gap-1" id="pagination"></div>
        </div>
      </div>
    </div>

    <!-- Bulk Action Bar -->
    <div class="action-bar" id="action-bar">
      <div class="flex items-center gap-4">
        <span id="selected-count" class="text-sm text-gray-300"></span>
        <div class="flex gap-2">
          <select id="bulk-status" class="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white">
            <option value="">${isRu ? 'Сменить статус...' : 'Change status...'}</option>
            <option value="called">${isRu ? 'Звонили' : 'Called'}</option>
            <option value="interested">${isRu ? 'Интерес' : 'Interested'}</option>
            <option value="meeting">${isRu ? 'Встреча' : 'Meeting'}</option>
            <option value="client">${isRu ? 'Клиент' : 'Client'}</option>
            <option value="declined">${isRu ? 'Отказ' : 'Declined'}</option>
            <option value="invalid">${isRu ? 'Невалидный' : 'Invalid'}</option>
          </select>
          <button onclick="bulkStatus()"
            class="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 rounded-lg text-sm transition">
            ${isRu ? 'Применить' : 'Apply'}
          </button>
          <button onclick="bulkDelete()"
            class="px-3 py-1.5 bg-red-800 hover:bg-red-700 rounded-lg text-sm transition">
            <i class="fas fa-trash mr-1"></i>${isRu ? 'Удалить' : 'Delete'}
          </button>
          <button onclick="bulkExport()"
            class="px-3 py-1.5 glass hover:bg-white/10 rounded-lg text-sm transition">
            <i class="fas fa-download mr-1"></i>${isRu ? 'Экспорт' : 'Export'}
          </button>
        </div>
        <button onclick="clearSelection()"
          class="ml-auto text-gray-500 hover:text-white text-sm transition">${isRu ? 'Снять выделение' : 'Deselect'}</button>
      </div>
    </div>
  </main>

<script>
// ── State ──────────────────────────────────────────────────────────────────
let contacts = [];
let filtered = [];
let selectedIds = new Set();
let currentPage = 1;
const PAGE_SIZE = 25;
let sortField = 'date';
let sortDir = 'desc';
let importRows = [];
const isRu = ${isRu ? 'true' : 'false'};

const STATUS_LABELS = {
  new: isRu ? 'Новый' : 'New',
  called: isRu ? 'Звонили' : 'Called',
  interested: isRu ? 'Интерес' : 'Interested',
  meeting: isRu ? 'Встреча' : 'Meeting',
  client: isRu ? 'Клиент' : 'Client',
  declined: isRu ? 'Отказ' : 'Declined',
  invalid: isRu ? 'Невалидный' : 'Invalid',
};
const STATUS_NEXT = {
  new: 'called', called: 'interested', interested: 'meeting',
  meeting: 'client', client: 'client', declined: 'declined', invalid: 'invalid',
};

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadContacts();
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', () => {
      const f = card.dataset.filter;
      document.getElementById('filter-status').value = f;
      applyFilters();
    });
  });
});

async function loadContacts() {
  try {
    const res = await fetch('/api/contacts');
    const data = await res.json();
    contacts = data.contacts || [];
    applyFilters();
    updateStats();
  } catch(e) {
    contacts = [];
    renderTable([]);
  }
}

// ── Filters & Sort ────────────────────────────────────────────────────────
function applyFilters() {
  const q = document.getElementById('search-input').value.toLowerCase().trim();
  const status = document.getElementById('filter-status').value;
  const sortVal = document.getElementById('filter-sort').value;
  [sortField, sortDir] = sortVal === 'date_desc' ? ['date','desc']
    : sortVal === 'date_asc' ? ['date','asc']
    : sortVal === 'name_asc' ? ['name','asc']
    : ['status','asc'];

  filtered = contacts.filter(c => {
    if (status && c.status !== status) return false;
    if (q && !JSON.stringify([c.name,c.company,c.phone,c.email,c.tags]).toLowerCase().includes(q)) return false;
    return true;
  });

  filtered.sort((a, b) => {
    let va, vb;
    if (sortField === 'date') { va = a.createdAt; vb = b.createdAt; }
    else if (sortField === 'name') { va = (a.name||a.company||'').toLowerCase(); vb = (b.name||b.company||'').toLowerCase(); }
    else { va = a.status; vb = b.status; }
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  currentPage = 1;
  document.getElementById('result-count').textContent = isRu
    ? \`Показано: \${filtered.length} из \${contacts.length}\`
    : \`Showing \${filtered.length} of \${contacts.length}\`;
  renderPage();
}

function sortBy(field) {
  if (sortField === field) { sortDir = sortDir === 'asc' ? 'desc' : 'asc'; }
  else { sortField = field; sortDir = 'asc'; }
  applyFilters();
}

// ── Render ────────────────────────────────────────────────────────────────
function renderPage() {
  const start = (currentPage - 1) * PAGE_SIZE;
  const slice = filtered.slice(start, start + PAGE_SIZE);
  renderTable(slice);
  renderPagination();
}

function renderTable(rows) {
  const tbody = document.getElementById('contacts-tbody');
  if (!rows.length) {
    tbody.innerHTML = \`<tr><td colspan="8" class="px-4 py-12 text-center text-gray-500">\${isRu ? 'Контакты не найдены' : 'No contacts found'}</td></tr>\`;
    return;
  }
  tbody.innerHTML = rows.map(c => {
    const sel = selectedIds.has(c.id);
    const tags = (c.tags||'').split(',').filter(Boolean).map(t =>
      \`<span class="text-xs bg-gray-700 text-gray-300 rounded-full px-2 py-0.5">\${t.trim()}</span>\`
    ).join(' ');
    const date = new Date(c.createdAt).toLocaleDateString(isRu ? 'ru-RU' : 'en-US', {day:'2-digit',month:'short',year:'2-digit'});
    const phoneHtml = c.phone
      ? \`<a href="tel:\${c.phone}" class="text-green-400 hover:underline flex items-center gap-1">
           <i class="fas fa-phone text-xs"></i>\${c.phone}
         </a>\`
      : '<span class="text-gray-600">—</span>';
    const emailHtml = c.email
      ? \`<a href="mailto:\${c.email}" class="text-blue-400 hover:underline text-xs truncate max-w-[140px] block">\${c.email}</a>\`
      : '<span class="text-gray-600">—</span>';
    return \`<tr class="border-t border-gray-800 hover:bg-white/[0.02] \${sel ? 'selected' : ''}" id="row-\${c.id}">
      <td class="px-4 py-3">
        <input type="checkbox" class="accent-blue-500 row-cb" \${sel ? 'checked' : ''}
          onchange="toggleRow('\${c.id}', this.checked)">
      </td>
      <td class="px-4 py-3">
        <p class="font-medium text-white text-sm">\${c.name || '<span class="text-gray-500">—</span>'}</p>
        \${c.company ? \`<p class="text-xs text-gray-400">\${c.company}</p>\` : ''}
        \${c.source ? \`<a href="\${c.source}" target="_blank" class="text-xs text-gray-600 hover:text-gray-400 truncate block max-w-[160px]">\${new URL(c.source.startsWith('http')?c.source:'https://'+c.source).hostname}</a>\` : ''}
      </td>
      <td class="px-4 py-3">\${phoneHtml}</td>
      <td class="px-4 py-3">\${emailHtml}</td>
      <td class="px-4 py-3">
        <span class="status-badge s-\${c.status}" onclick="cycleStatus('\${c.id}')" title="\${isRu ? 'Клик — следующий статус' : 'Click to advance status'}" style="cursor:pointer">
          \${STATUS_LABELS[c.status]||c.status}
        </span>
      </td>
      <td class="px-4 py-3 max-w-[120px]"><div class="flex flex-wrap gap-1">\${tags}</div></td>
      <td class="px-4 py-3 text-xs text-gray-400">\${date}</td>
      <td class="px-4 py-3 text-right">
        <div class="flex justify-end gap-1">
          <button onclick="openEdit('\${c.id}')" title="${isRu ? 'Редактировать' : 'Edit'}"
            class="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition">
            <i class="fas fa-pen text-xs"></i>
          </button>
          <button onclick="deleteContact('\${c.id}')" title="${isRu ? 'Удалить' : 'Delete'}"
            class="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition">
            <i class="fas fa-trash text-xs"></i>
          </button>
        </div>
      </td>
    </tr>\`;
  }).join('');
}

function renderPagination() {
  const total = filtered.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const info = document.getElementById('page-info');
  const pg = document.getElementById('pagination');
  const start = (currentPage-1)*PAGE_SIZE+1;
  const end = Math.min(currentPage*PAGE_SIZE, total);
  info.textContent = total ? \`\${start}–\${end} \${isRu ? 'из' : 'of'} \${total}\` : '';
  if (pages <= 1) { pg.innerHTML = ''; return; }
  let html = '';
  for (let i = 1; i <= Math.min(pages, 10); i++) {
    html += \`<button onclick="goPage(\${i})"
      class="w-8 h-8 rounded text-sm \${i===currentPage ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}">\${i}</button>\`;
  }
  pg.innerHTML = html;
}

function goPage(n) { currentPage = n; renderPage(); window.scrollTo(0,0); }

// ── Stats ─────────────────────────────────────────────────────────────────
function updateStats() {
  const counts = { new:0, called:0, interested:0, meeting:0, client:0, declined:0, invalid:0 };
  contacts.forEach(c => { if (counts[c.status] !== undefined) counts[c.status]++; });
  document.getElementById('cnt-total').textContent = contacts.length;
  Object.entries(counts).forEach(([k,v]) => {
    const el = document.getElementById('cnt-'+k);
    if (el) el.textContent = v;
  });
}

// ── Selection ─────────────────────────────────────────────────────────────
function toggleRow(id, checked) {
  checked ? selectedIds.add(id) : selectedIds.delete(id);
  document.getElementById('row-'+id).classList.toggle('selected', checked);
  updateActionBar();
}

function toggleAll(cb) {
  const rows = document.querySelectorAll('#contacts-tbody .row-cb');
  rows.forEach(r => {
    r.checked = cb.checked;
    const id = r.closest('tr').id.replace('row-','');
    cb.checked ? selectedIds.add(id) : selectedIds.delete(id);
    r.closest('tr').classList.toggle('selected', cb.checked);
  });
  updateActionBar();
}

function clearSelection() {
  selectedIds.clear();
  document.querySelectorAll('.row-cb, #select-all').forEach(r => r.checked = false);
  document.querySelectorAll('tr.selected').forEach(r => r.classList.remove('selected'));
  updateActionBar();
}

function updateActionBar() {
  const bar = document.getElementById('action-bar');
  const cnt = document.getElementById('selected-count');
  const n = selectedIds.size;
  bar.classList.toggle('visible', n > 0);
  cnt.textContent = isRu ? \`Выбрано: \${n}\` : \`Selected: \${n}\`;
}

// ── CRUD ──────────────────────────────────────────────────────────────────
function openAdd() {
  document.getElementById('modal-edit-title').textContent = isRu ? 'Добавить контакт' : 'Add Contact';
  document.getElementById('form-contact').reset();
  document.getElementById('edit-id').value = '';
  openModal('edit');
}

function openEdit(id) {
  const c = contacts.find(x => x.id === id);
  if (!c) return;
  document.getElementById('modal-edit-title').textContent = isRu ? 'Редактировать' : 'Edit Contact';
  document.getElementById('edit-id').value = c.id;
  document.getElementById('edit-name').value = c.name || '';
  document.getElementById('edit-company').value = c.company || '';
  document.getElementById('edit-phone').value = c.phone || '';
  document.getElementById('edit-email').value = c.email || '';
  document.getElementById('edit-source').value = c.source || '';
  document.getElementById('edit-status').value = c.status || 'new';
  document.getElementById('edit-tags').value = c.tags || '';
  document.getElementById('edit-notes').value = c.notes || '';
  openModal('edit');
}

async function saveContact(e) {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;
  const payload = {
    name: document.getElementById('edit-name').value.trim(),
    company: document.getElementById('edit-company').value.trim(),
    phone: document.getElementById('edit-phone').value.trim(),
    email: document.getElementById('edit-email').value.trim(),
    source: document.getElementById('edit-source').value.trim(),
    status: document.getElementById('edit-status').value,
    tags: document.getElementById('edit-tags').value.trim(),
    notes: document.getElementById('edit-notes').value.trim(),
  };
  const url = id ? \`/api/contacts/\${id}\` : '/api/contacts';
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, { method, headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  const data = await res.json();
  if (id) {
    contacts = contacts.map(c => c.id === id ? data.contact : c);
  } else {
    contacts.unshift(data.contact);
  }
  closeModal('edit');
  applyFilters();
  updateStats();
}

async function deleteContact(id) {
  if (!confirm(isRu ? 'Удалить контакт?' : 'Delete contact?')) return;
  await fetch(\`/api/contacts/\${id}\`, { method: 'DELETE' });
  contacts = contacts.filter(c => c.id !== id);
  selectedIds.delete(id);
  applyFilters();
  updateStats();
}

async function cycleStatus(id) {
  const c = contacts.find(x => x.id === id);
  if (!c) return;
  const next = STATUS_NEXT[c.status] || 'new';
  const res = await fetch(\`/api/contacts/\${id}\`, {
    method: 'PUT', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ ...c, status: next }),
  });
  const data = await res.json();
  contacts = contacts.map(x => x.id === id ? data.contact : x);
  applyFilters(); updateStats();
}

// ── Bulk ──────────────────────────────────────────────────────────────────
async function bulkStatus() {
  const status = document.getElementById('bulk-status').value;
  if (!status || !selectedIds.size) return;
  for (const id of selectedIds) {
    const c = contacts.find(x => x.id === id);
    if (!c) continue;
    const res = await fetch(\`/api/contacts/\${id}\`, {
      method: 'PUT', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ ...c, status }),
    });
    const data = await res.json();
    contacts = contacts.map(x => x.id === id ? data.contact : x);
  }
  clearSelection();
  applyFilters(); updateStats();
}

async function bulkDelete() {
  if (!selectedIds.size) return;
  if (!confirm(isRu ? \`Удалить \${selectedIds.size} контактов?\` : \`Delete \${selectedIds.size} contacts?\`)) return;
  for (const id of selectedIds) {
    await fetch(\`/api/contacts/\${id}\`, { method: 'DELETE' });
    contacts = contacts.filter(c => c.id !== id);
  }
  clearSelection();
  applyFilters(); updateStats();
}

function bulkExport() {
  const rows = contacts.filter(c => selectedIds.has(c.id));
  exportRows(rows);
}

// ── Export CSV ────────────────────────────────────────────────────────────
function exportCsv() { exportRows(filtered); }

function exportRows(rows) {
  if (!rows.length) return;
  const headers = ['Name','Company','Phone','Email','Source','Status','Tags','Notes','Date'];
  const lines = [headers, ...rows.map(c => [
    c.name||'', c.company||'', c.phone||'', c.email||'', c.source||'',
    c.status||'', c.tags||'', (c.notes||'').replace(/\n/g,' '),
    new Date(c.createdAt).toLocaleDateString('ru-RU'),
  ].map(v => '"'+String(v).replace(/"/g,'""')+'"'))].map(r => r.join(','));
  const blob = new Blob(['\\uFEFF'+lines.join('\\n'), ''], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'contacts_'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
}

// ── Import CSV ────────────────────────────────────────────────────────────
function openImport() {
  importRows = [];
  document.getElementById('csv-file-input').value = '';
  document.getElementById('import-preview').classList.add('hidden');
  openModal('import');
}

function handleFileSelect(e) { parseFile(e.target.files[0]); }
function handleFileDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) parseFile(file);
}

function parseFile(file) {
  const reader = new FileReader();
  reader.onload = ev => {
    const text = ev.target.result;
    importRows = parseCsv(text);
    document.getElementById('import-preview-text').textContent =
      (isRu ? \`Найдено строк: \${importRows.length}. Импортировать?\` : \`Found \${importRows.length} rows. Proceed?\`);
    document.getElementById('import-preview').classList.remove('hidden');
  };
  reader.readAsText(file, 'utf-8');
}

function parseCsv(text) {
  const lines = text.replace(/\\r/g,'').split('\\n').filter(Boolean);
  if (!lines.length) return [];
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g,'').toLowerCase().trim());
  const col = k => headers.findIndex(h => h.includes(k));
  return lines.slice(1).map(line => {
    const vals = line.match(/("(?:[^"]|"")*"|[^,]*)/g).map(v => v.replace(/^"|"$/g,'').replace(/""/g,'"').trim());
    const get = k => { const i = col(k); return i>=0 ? vals[i]||'' : ''; };
    return { name: get('name'), company: get('company'), phone: get('phone'),
             email: get('email'), source: get('source')||get('url'), status: get('status')||'new',
             tags: get('tag'), notes: get('note') };
  }).filter(r => r.phone || r.email || r.name);
}

async function confirmImport() {
  if (!importRows.length) return;
  const res = await fetch('/api/contacts/import', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ contacts: importRows }),
  });
  const data = await res.json();
  contacts = [...(data.contacts||[]), ...contacts];
  closeModal('import');
  applyFilters(); updateStats();
}

// ── Modal helpers ─────────────────────────────────────────────────────────
function openModal(name) { document.getElementById('modal-'+name).classList.add('open'); }
function closeModal(name) { document.getElementById('modal-'+name).classList.remove('open'); }
</script>
</body>
</html>`
}
