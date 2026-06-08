// Shared UI components — HTML string helpers for the template-string page pattern.
// All functions return raw HTML strings ready for template literal interpolation.
// Import what you need: import { spinner, emptyState, statusBadge } from '../components/shared'

// ─── Loading / Async states ─────────────────────────────────────────────────

/** Inline spinner icon + optional label, e.g. inside a button or result div. */
export const spinner = (text = '', colorClass = 'text-blue-400') =>
  `<span class="flex items-center gap-2 ${colorClass}">
    <i class="fas fa-spinner fa-spin"></i>
    ${text ? `<span>${text}</span>` : ''}
  </span>`

/** Full-width loading row, suitable for table cells or card bodies. */
export const loadingRow = (message = 'Loading…', colorClass = 'text-blue-400') =>
  `<div class="flex items-center justify-center gap-2 py-8 ${colorClass}">
    <i class="fas fa-spinner fa-spin"></i>
    <span class="text-sm">${message}</span>
  </div>`

/** Full-width error row. */
export const errorRow = (message: string, colorClass = 'text-red-400') =>
  `<div class="flex items-center gap-2 py-6 ${colorClass}">
    <i class="fas fa-times-circle flex-shrink-0"></i>
    <span class="text-sm">${message}</span>
  </div>`

// ─── Empty states ────────────────────────────────────────────────────────────

/**
 * Centered empty-state placeholder.
 * @param icon  FontAwesome icon name without 'fa-', e.g. 'flask'
 * @param title Primary message
 * @param subtitle Optional secondary message
 * @param actionHtml Optional action button HTML
 */
export const emptyState = (
  icon: string,
  title: string,
  subtitle = '',
  actionHtml = '',
) =>
  `<div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
      <i class="fas fa-${icon} text-2xl text-gray-600"></i>
    </div>
    <p class="text-gray-400 font-medium mb-1">${title}</p>
    ${subtitle ? `<p class="text-gray-600 text-sm mb-4">${subtitle}</p>` : ''}
    ${actionHtml}
  </div>`

// ─── Badges ──────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, { bg: string; text: string; label_en: string; label_ru: string }> = {
  stable:       { bg: 'bg-green-900/50',  text: 'text-green-400',  label_en: 'Stable',       label_ru: 'Стабильно' },
  beta:         { bg: 'bg-yellow-900/50', text: 'text-yellow-400', label_en: 'Beta',         label_ru: 'Бета' },
  experimental: { bg: 'bg-red-900/50',    text: 'text-red-400',    label_en: 'Experimental', label_ru: 'Эксперимент' },
  active:       { bg: 'bg-green-900/50',  text: 'text-green-400',  label_en: 'Active',       label_ru: 'Активно' },
  inactive:     { bg: 'bg-gray-800',      text: 'text-gray-500',   label_en: 'Inactive',     label_ru: 'Неактивно' },
  success:      { bg: 'bg-green-900/50',  text: 'text-green-400',  label_en: 'Success',      label_ru: 'Успешно' },
  error:        { bg: 'bg-red-900/50',    text: 'text-red-400',    label_en: 'Error',        label_ru: 'Ошибка' },
  pending:      { bg: 'bg-yellow-900/50', text: 'text-yellow-400', label_en: 'Pending',      label_ru: 'Ожидание' },
  running:      { bg: 'bg-blue-900/50',   text: 'text-blue-400',   label_en: 'Running',      label_ru: 'Выполняется' },
  paused:       { bg: 'bg-orange-900/50', text: 'text-orange-400', label_en: 'Paused',       label_ru: 'Пауза' },
}

/** Pill badge for status values (stable/beta/experimental/active/success/error…). */
export const statusBadge = (status: string, isRu = false, customLabel = '') => {
  const cfg = STATUS_COLORS[status] ?? { bg: 'bg-gray-800', text: 'text-gray-400', label_en: status, label_ru: status }
  const label = customLabel || (isRu ? cfg.label_ru : cfg.label_en)
  return `<span class="text-xs px-2 py-0.5 rounded ${cfg.bg} ${cfg.text}">${label}</span>`
}

/** Confidence percentage pill — colour scales green→yellow→red. */
export const confidencePill = (pct: number) => {
  const color = pct >= 80 ? 'text-green-400 bg-green-900/30'
              : pct >= 60 ? 'text-yellow-400 bg-yellow-900/30'
              : 'text-red-400 bg-red-900/30'
  return `<span class="text-xs font-mono px-2 py-0.5 rounded ${color}">${pct}%</span>`
}

/** HTTP method badge (GET/POST/PUT/DELETE/PATCH). */
export const methodBadge = (method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH') => {
  const colors: Record<string, string> = {
    GET:    'bg-green-500',
    POST:   'bg-blue-500',
    PUT:    'bg-yellow-500',
    DELETE: 'bg-red-500',
    PATCH:  'bg-orange-500',
  }
  return `<span class="${colors[method] ?? 'bg-gray-500'} text-white px-2 py-0.5 rounded text-xs font-mono">${method}</span>`
}

// ─── Page structure ──────────────────────────────────────────────────────────

/**
 * Consistent page header used at the top of inner app pages.
 * @param icon FontAwesome icon class, e.g. 'fas fa-flask'
 * @param iconColor Tailwind color class, e.g. 'text-emerald-400'
 * @param actions Optional right-side action button HTML
 */
export const pageHeader = (
  title: string,
  subtitle: string,
  icon = '',
  iconColor = 'text-blue-400',
  actions = '',
) =>
  `<div class="flex items-center justify-between mb-8">
    <div class="flex items-center gap-3">
      ${icon ? `<div class="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
        <i class="${icon} ${iconColor}"></i>
      </div>` : ''}
      <div>
        <h1 class="text-3xl font-bold gradient-text">${title}</h1>
        <p class="text-gray-400 mt-1 text-sm">${subtitle}</p>
      </div>
    </div>
    ${actions ? `<div class="flex items-center gap-3">${actions}</div>` : ''}
  </div>`

/**
 * Section card wrapper — equivalent to `<div class="glass rounded-xl p-6 mb-6">`.
 * Use when you need a titled card section.
 */
export const sectionCard = (
  title: string,
  icon: string,
  iconColor: string,
  content: string,
  extra = '',
) =>
  `<div class="glass rounded-xl p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <i class="${icon} ${iconColor}"></i>
      ${title}
      ${extra}
    </h2>
    ${content}
  </div>`

// ─── Filter tabs ──────────────────────────────────────────────────────────────

/**
 * A single filter-tab button. Wire up `onclick` on the parent container or
 * pass the handler name directly.
 */
export const filterTab = (
  label: string,
  filterKey: string,
  icon = '',
  active = false,
  color = 'gray',
) =>
  `<button onclick="filterItems('${filterKey}')"
      class="provider-filter-btn ${active ? 'active bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} px-4 py-2 rounded-lg"
      data-filter="${filterKey}">
    ${icon ? `<i class="fas fa-${icon} text-${color}-400 mr-1"></i>` : ''}
    ${label}
  </button>`

/**
 * Render a full filter tab bar.
 * @param tabs Array of { label, key, icon?, color? }
 * @param activeKey Currently active filter key
 * @param onClickFn Name of JS function to call with the key, default 'filterItems'
 */
export const filterTabBar = (
  tabs: Array<{ label: string; key: string; icon?: string; color?: string }>,
  activeKey: string,
  onClickFn = 'filterItems',
) =>
  `<div class="flex gap-2 mb-6 flex-wrap">
    ${tabs.map(t =>
      `<button onclick="${onClickFn}('${t.key}')"
          class="provider-filter-btn ${activeKey === t.key ? 'active bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} px-4 py-2 rounded-lg transition-colors"
          data-filter="${t.key}">
        ${t.icon ? `<i class="fas fa-${t.icon} text-${t.color ?? 'gray'}-400 mr-1"></i>` : ''}
        ${t.label}
      </button>`
    ).join('')}
  </div>`

// ─── Code blocks ─────────────────────────────────────────────────────────────

/** Styled fenced code block. */
export const codeBlock = (code: string, lang = '') =>
  `<pre class="bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-green-400 text-sm">${
    code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }</code></pre>`

/** Inline mono snippet. */
export const inlineCode = (text: string) =>
  `<code class="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">${text}</code>`

// ─── Toast notification (JS function injected once per page) ─────────────────

/**
 * Returns a `<script>` block that defines `window.showToast(msg, type)`.
 * Call once in the page template, then use showToast() from any inline script.
 * type: 'success' | 'error' | 'info' | 'warning'
 */
export const toastScript = () => `
<script>
  window.showToast = function(msg, type) {
    type = type || 'success';
    var colors = {
      success: 'bg-green-600',
      error:   'bg-red-600',
      info:    'bg-blue-600',
      warning: 'bg-yellow-600',
    };
    var icons = {
      success: 'fa-check-circle',
      error:   'fa-times-circle',
      info:    'fa-info-circle',
      warning: 'fa-exclamation-triangle',
    };
    var toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 ' + (colors[type] || colors.success)
      + ' text-white px-5 py-3 rounded-lg shadow-lg z-50 text-sm flex items-center gap-2 transition-all';
    toast.innerHTML = '<i class="fas ' + (icons[type] || icons.success) + '"></i> ' + msg;
    document.body.appendChild(toast);
    setTimeout(function() { toast.style.opacity = '0'; setTimeout(function() { toast.remove(); }, 300); }, 2800);
  };
</script>`

// ─── Confirm / action buttons ─────────────────────────────────────────────────

/** Primary action button. */
export const btnPrimary = (label: string, onclick: string, icon = '', extraClass = '') =>
  `<button onclick="${onclick}" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${extraClass}">
    ${icon ? `<i class="fas fa-${icon}"></i>` : ''}
    ${label}
  </button>`

/** Danger/destructive button. */
export const btnDanger = (label: string, onclick: string, icon = 'trash', extraClass = '') =>
  `<button onclick="${onclick}" class="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${extraClass}">
    <i class="fas fa-${icon}"></i>
    ${label}
  </button>`

/** Ghost/secondary button. */
export const btnGhost = (label: string, onclick: string, icon = '', extraClass = '') =>
  `<button onclick="${onclick}" class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${extraClass}">
    ${icon ? `<i class="fas fa-${icon}"></i>` : ''}
    ${label}
  </button>`
