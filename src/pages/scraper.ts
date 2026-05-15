import { head, sidebar } from '../components/layout'
import { Language } from '../i18n/translations'

export const scraperPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'

  const t = {
    title: isRu ? 'Парсер контактов' : 'Contact Scraper',
    subtitle: isRu
      ? 'Сбор телефонов и email с сайтов (СНГ формат)'
      : 'Extract phones & emails from websites (CIS format)',
    urlsLabel: isRu ? 'Список сайтов (по одному на строку)' : 'Website list (one per line)',
    urlsPlaceholder: 'https://example.ru\nhttps://company.ru\nhttps://firma.ru',
    mobileOnly: isRu ? 'Только мобильные номера' : 'Mobile phones only',
    concurrency: isRu ? 'Параллельность' : 'Concurrency',
    proxyLabel: isRu ? 'Прокси (опционально)' : 'Proxy (optional)',
    proxyPlaceholder: 'http://user:pass@host:port',
    start: isRu ? 'Запустить парсинг' : 'Start Scraping',
    stop: isRu ? 'Остановить' : 'Stop',
    downloadCsv: isRu ? 'Скачать CSV' : 'Download CSV',
    clear: isRu ? 'Очистить' : 'Clear',
    status: isRu ? 'Статус' : 'Status',
    results: isRu ? 'Результаты' : 'Results',
    log: isRu ? 'Лог' : 'Log',
    totalSites: isRu ? 'Сайтов' : 'Sites',
    withContacts: isRu ? 'С контактами' : 'With contacts',
    phones: isRu ? 'Телефонов' : 'Phones',
    emails: isRu ? 'Email' : 'Emails',
    idle: isRu ? 'Ожидание' : 'Idle',
    running: isRu ? 'Выполняется...' : 'Running...',
    done: isRu ? 'Завершено' : 'Done',
    noResults: isRu ? 'Нет результатов' : 'No results yet',
    errorNoUrls: isRu ? 'Введите хотя бы один URL' : 'Enter at least one URL',
    setupNote: isRu
      ? 'Требуется: Python 3.11+, playwright. Установка:'
      : 'Requires: Python 3.11+, playwright. Setup:',
    deepSearch: isRu ? 'Глубокий поиск (страница контактов)' : 'Deep search (contact sub-page)',
  }

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(t.title, t.subtitle, lang)}
  <style>
    .log-box {
      font-family: 'Courier New', monospace;
      font-size: 12px;
      max-height: 220px;
      overflow-y: auto;
      background: rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      padding: 12px;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .tag-phone { color: #34d399; }
    .tag-email { color: #60a5fa; }
    .tag-err   { color: #f87171; }
    .tag-warn  { color: #fbbf24; }
    .tag-info  { color: #94a3b8; }
    .result-row:hover { background: rgba(255,255,255,0.05); }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
    }
    .badge-ok    { background: rgba(52,211,153,0.2); color: #34d399; }
    .badge-err   { background: rgba(248,113,113,0.2); color: #f87171; }
    .badge-empty { background: rgba(156,163,175,0.15); color: #9ca3af; }
  </style>
</head>
<body class="bg-gray-950 text-white">
  ${sidebar('scraper', lang)}

  <main class="ml-64 pt-4 min-h-screen">
    <div class="p-6 max-w-6xl">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold flex items-center gap-3">
            <i class="fas fa-spider text-green-400"></i> ${t.title}
          </h1>
          <p class="text-gray-400 mt-1">${t.subtitle}</p>
        </div>
        <div class="flex gap-3">
          <button id="btn-clear" onclick="clearAll()" class="glass hover:bg-white/10 px-4 py-2 rounded-lg transition text-sm">
            <i class="fas fa-trash mr-2"></i>${t.clear}
          </button>
          <button id="btn-csv" onclick="downloadCsv()" disabled
            class="bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition text-sm">
            <i class="fas fa-file-csv mr-2"></i>${t.downloadCsv}
          </button>
          <button id="btn-save-contacts" onclick="saveToContacts()" disabled
            class="bg-blue-700 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition text-sm flex items-center gap-2">
            <i class="fas fa-address-book"></i>${isRu ? 'В контакты' : 'Save to Contacts'}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Left: Config -->
        <div class="lg:col-span-1 space-y-4">
          <div class="glass rounded-xl p-5">
            <h2 class="font-semibold mb-4 text-sm text-gray-300 uppercase tracking-wider">
              <i class="fas fa-sliders-h mr-2 text-blue-400"></i>${isRu ? 'Настройки' : 'Settings'}
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm text-gray-400 mb-1">${t.urlsLabel}</label>
                <textarea id="urls-input" rows="10"
                  class="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="${t.urlsPlaceholder}"></textarea>
              </div>

              <div>
                <label class="block text-sm text-gray-400 mb-1">${t.proxyLabel}</label>
                <input id="proxy-input" type="text"
                  class="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  placeholder="${t.proxyPlaceholder}">
              </div>

              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-400">${t.concurrency}:</label>
                <select id="concurrency-select"
                  class="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-sm text-white">
                  <option value="3">3</option>
                  <option value="5" selected>5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>

              <label class="flex items-center gap-2 cursor-pointer">
                <input id="mobile-only" type="checkbox" checked class="accent-green-400 w-4 h-4">
                <span class="text-sm text-gray-300">${t.mobileOnly}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input id="deep-search" type="checkbox" checked class="accent-blue-400 w-4 h-4">
                <span class="text-sm text-gray-300">${t.deepSearch}</span>
              </label>
            </div>

            <div class="mt-5 flex gap-2">
              <button id="btn-start" onclick="startScraping()"
                class="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium transition text-sm">
                <i class="fas fa-play mr-2"></i>${t.start}
              </button>
              <button id="btn-stop" onclick="stopScraping()" disabled
                class="px-4 bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed py-2 rounded-lg font-medium transition text-sm">
                <i class="fas fa-stop"></i>
              </button>
            </div>
          </div>

          <!-- Setup note -->
          <div class="glass rounded-xl p-4 border border-yellow-500/20">
            <p class="text-xs text-yellow-300 font-semibold mb-2">
              <i class="fas fa-terminal mr-1"></i>${t.setupNote}
            </p>
            <pre class="text-xs text-gray-400 bg-black/30 rounded p-2 overflow-x-auto">pip install playwright
playwright install chromium
python scraper/scraper.py \\
  --file urls.txt \\
  --proxy http://u:p@host:port</pre>
          </div>
        </div>

        <!-- Right: Results -->
        <div class="lg:col-span-2 space-y-4">

          <!-- Stats -->
          <div class="grid grid-cols-4 gap-3">
            <div class="glass rounded-xl p-4 text-center">
              <p class="text-2xl font-bold" id="stat-sites">0</p>
              <p class="text-xs text-gray-400 mt-1">${t.totalSites}</p>
            </div>
            <div class="glass rounded-xl p-4 text-center">
              <p class="text-2xl font-bold text-green-400" id="stat-with">0</p>
              <p class="text-xs text-gray-400 mt-1">${t.withContacts}</p>
            </div>
            <div class="glass rounded-xl p-4 text-center">
              <p class="text-2xl font-bold text-emerald-300" id="stat-phones">0</p>
              <p class="text-xs text-gray-400 mt-1">${t.phones}</p>
            </div>
            <div class="glass rounded-xl p-4 text-center">
              <p class="text-2xl font-bold text-blue-300" id="stat-emails">0</p>
              <p class="text-xs text-gray-400 mt-1">${t.emails}</p>
            </div>
          </div>

          <!-- Status bar -->
          <div class="glass rounded-xl p-3 flex items-center gap-3">
            <span id="status-dot" class="w-2 h-2 rounded-full bg-gray-500 inline-block"></span>
            <span id="status-text" class="text-sm text-gray-400">${t.idle}</span>
            <div id="progress-bar-wrap" class="hidden flex-1 bg-gray-700 rounded-full h-1.5 ml-2">
              <div id="progress-bar" class="bg-blue-500 h-1.5 rounded-full transition-all" style="width:0%"></div>
            </div>
          </div>

          <!-- Log -->
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">${t.log}</p>
            <div id="log-box" class="log-box"></div>
          </div>

          <!-- Result table -->
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">${t.results}</p>
            <div class="glass rounded-xl overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-white/5 text-gray-400 text-xs uppercase">
                  <tr>
                    <th class="px-4 py-3 text-left">URL</th>
                    <th class="px-4 py-3 text-left">${t.phones}</th>
                    <th class="px-4 py-3 text-left">${t.emails}</th>
                    <th class="px-4 py-3 text-left">${t.status}</th>
                  </tr>
                </thead>
                <tbody id="result-tbody">
                  <tr>
                    <td colspan="4" class="px-4 py-8 text-center text-gray-500">${t.noResults}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

<script>
  let scraperAborted = false;
  let allResults = [];
  let jobId = null;

  function log(msg, cls = 'tag-info') {
    const box = document.getElementById('log-box');
    const line = document.createElement('span');
    line.className = cls;
    line.textContent = '[' + new Date().toLocaleTimeString() + '] ' + msg + '\\n';
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
  }

  function setStatus(state) {
    const dot = document.getElementById('status-dot');
    const txt = document.getElementById('status-text');
    const wrap = document.getElementById('progress-bar-wrap');
    if (state === 'running') {
      dot.className = 'w-2 h-2 rounded-full bg-blue-400 inline-block animate-pulse';
      txt.textContent = '${t.running}';
      wrap.classList.remove('hidden');
    } else if (state === 'done') {
      dot.className = 'w-2 h-2 rounded-full bg-green-400 inline-block';
      txt.textContent = '${t.done}';
    } else {
      dot.className = 'w-2 h-2 rounded-full bg-gray-500 inline-block';
      txt.textContent = '${t.idle}';
      wrap.classList.add('hidden');
    }
  }

  function updateStats() {
    document.getElementById('stat-sites').textContent = allResults.length;
    const withContacts = allResults.filter(r => r.phones.length || r.emails.length).length;
    document.getElementById('stat-with').textContent = withContacts;
    const totalPhones = allResults.reduce((s, r) => s + r.phones.length, 0);
    document.getElementById('stat-emails').textContent = allResults.reduce((s, r) => s + r.emails.length, 0);
    document.getElementById('stat-phones').textContent = totalPhones;
  }

  function renderRow(r) {
    const badge = r.status === 'ok'
      ? (r.phones.length || r.emails.length
          ? '<span class="badge badge-ok">OK</span>'
          : '<span class="badge badge-empty">—</span>')
      : '<span class="badge badge-err">ERR</span>';

    const domain = (() => { try { return new URL(r.url).hostname; } catch { return r.url; } })();
    const phones = r.phones.map(p => '<span class="tag-phone">+' + p + '</span>').join(', ') || '<span class="text-gray-600">—</span>';
    const emails = r.emails.slice(0, 2).map(e => '<span class="tag-email">' + e + '</span>').join(', ') || '<span class="text-gray-600">—</span>';

    return \`<tr class="result-row border-t border-gray-800">
      <td class="px-4 py-2 max-w-[180px] truncate">
        <a href="\${r.url}" target="_blank" class="text-blue-400 hover:underline text-xs">\${domain}</a>
        \${r.contact_page ? '<br><span class="text-xs text-gray-500">+contact</span>' : ''}
      </td>
      <td class="px-4 py-2 text-xs">\${phones}</td>
      <td class="px-4 py-2 text-xs">\${emails}</td>
      <td class="px-4 py-2">\${badge}</td>
    </tr>\`;
  }

  function rebuildTable() {
    const tbody = document.getElementById('result-tbody');
    if (!allResults.length) {
      tbody.innerHTML = '<tr><td colspan="4" class="px-4 py-8 text-center text-gray-500">${t.noResults}</td></tr>';
      return;
    }
    tbody.innerHTML = allResults.map(renderRow).join('');
  }

  async function startScraping() {
    const raw = document.getElementById('urls-input').value.trim();
    if (!raw) { log('${t.errorNoUrls}', 'tag-err'); return; }

    const urls = raw.split('\\n').map(u => u.trim()).filter(u => u && !u.startsWith('#'));
    if (!urls.length) { log('${t.errorNoUrls}', 'tag-err'); return; }

    allResults = [];
    scraperAborted = false;
    rebuildTable();
    updateStats();
    setStatus('running');
    document.getElementById('btn-start').disabled = true;
    document.getElementById('btn-stop').disabled = false;
    document.getElementById('btn-csv').disabled = true;
    document.getElementById('log-box').innerHTML = '';

    const proxy = document.getElementById('proxy-input').value.trim() || null;
    const concurrency = parseInt(document.getElementById('concurrency-select').value);
    const mobileOnly = document.getElementById('mobile-only').checked;
    const deepSearch = document.getElementById('deep-search').checked;

    log(\`Starting: \${urls.length} URLs, concurrency=\${concurrency}\`);

    try {
      const res = await fetch('/api/scraper/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls, proxy, concurrency, mobile_only: mobileOnly, deep_search: deepSearch }),
      });
      const data = await res.json();
      jobId = data.job_id;
      log(\`Job started: \${jobId}\`);
      pollJob(urls.length);
    } catch (e) {
      log('API error: ' + e.message, 'tag-err');
      finishScraping();
    }
  }

  async function pollJob(total) {
    if (scraperAborted) { finishScraping(); return; }
    try {
      const res = await fetch('/api/scraper/status/' + jobId);
      const data = await res.json();

      // Update log with new entries
      if (data.log && data.log.length) {
        const shown = document.querySelectorAll('#log-box span').length;
        data.log.slice(shown).forEach(line => {
          const cls = line.includes('Error') || line.includes('!') ? 'tag-err'
                    : line.includes('phones') || line.includes('+7') ? 'tag-phone'
                    : 'tag-info';
          log(line, cls);
        });
      }

      // Merge new results
      if (data.results && data.results.length > allResults.length) {
        allResults = data.results;
        rebuildTable();
        updateStats();
      }

      // Progress
      const done = data.results ? data.results.length : 0;
      document.getElementById('progress-bar').style.width = Math.round(done / total * 100) + '%';

      if (data.status === 'done' || data.status === 'error') {
        finishScraping();
      } else {
        setTimeout(() => pollJob(total), 1500);
      }
    } catch (e) {
      setTimeout(() => pollJob(total), 3000);
    }
  }

  function stopScraping() {
    scraperAborted = true;
    if (jobId) fetch('/api/scraper/stop/' + jobId, { method: 'POST' }).catch(() => {});
    log('${isRu ? 'Остановлено пользователем' : 'Stopped by user'}', 'tag-warn');
    finishScraping();
  }

  function finishScraping() {
    const withContacts = allResults.filter(r => r.phones.length || r.emails.length).length;
    setStatus(allResults.length ? 'done' : 'idle');
    document.getElementById('btn-start').disabled = false;
    document.getElementById('btn-stop').disabled = true;
    document.getElementById('btn-csv').disabled = !allResults.length;
    document.getElementById('btn-save-contacts').disabled = !withContacts;
    log(\`${isRu ? 'Готово. С контактами:' : 'Done. With contacts:'} \${withContacts}/\${allResults.length}\`);
  }

  async function saveToContacts() {
    const rows = [];
    allResults.forEach(r => {
      if (!r.phones.length && !r.emails.length) return;
      const phones = r.phones.length ? r.phones : [''];
      phones.forEach(ph => {
        rows.push({
          phone: ph ? '+' + ph : '',
          email: (r.emails[0] || ''),
          source: r.url,
          status: 'new',
          name: '', company: '', tags: '${isRu ? 'парсер' : 'scraper'}', notes: '',
        });
      });
    });
    if (!rows.length) return;
    const btn = document.getElementById('btn-save-contacts');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>${isRu ? 'Сохраняем...' : 'Saving...'}';
    try {
      const res = await fetch('/api/contacts/import', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ contacts: rows }),
      });
      const d = await res.json();
      log(\`${isRu ? 'Сохранено в контакты:' : 'Saved to contacts:'} \${d.imported}\`, 'tag-phone');
      btn.innerHTML = '<i class="fas fa-check mr-2"></i>${isRu ? 'Сохранено!' : 'Saved!'}';
      btn.className = btn.className.replace('bg-blue-700 hover:bg-blue-600', 'bg-green-700');
    } catch(e) {
      log('${isRu ? 'Ошибка сохранения' : 'Save error'}: ' + e.message, 'tag-err');
      btn.disabled = false;
    }
  }

  function downloadCsv() {
    if (!allResults.length) return;
    const rows = [['URL','Phone','Email','ContactPage','Status']];
    allResults.forEach(r => {
      const phones = r.phones.length ? r.phones : [''];
      const emails = r.emails.length ? r.emails : [''];
      phones.forEach(ph => emails.forEach(em => {
        rows.push([r.url, ph ? '+' + ph : '', em, r.contact_page || '', r.status]);
      }));
    });
    const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\\n');
    const blob = new Blob(['\\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'contacts_' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
  }

  function clearAll() {
    allResults = [];
    jobId = null;
    rebuildTable();
    updateStats();
    setStatus('idle');
    document.getElementById('log-box').innerHTML = '';
    document.getElementById('btn-csv').disabled = true;
    document.getElementById('btn-save-contacts').disabled = true;
    document.getElementById('progress-bar').style.width = '0%';
  }
</script>
</body>
</html>
`
}
