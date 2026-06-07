import { head, navbar, footer } from '../components/layout'
import { Language } from '../i18n/translations'

export const pricingPage = (lang: Language = 'en') => {
  const isRu = lang === 'ru'

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  ${head(
    isRu ? 'Планы доступа | ERA DAL' : 'Research Access Plans | ERA DAL',
    isRu ? 'Выберите план ERA DAL для вашего исследовательского проекта.' : 'Choose the ERA DAL plan for your research project.',
    lang
  )}
</head>
<body class="bg-gray-950 text-white">
  ${navbar(lang)}

  <main class="pt-20 min-h-screen">
    <div class="max-w-6xl mx-auto px-4 py-16">

      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          ${isRu ? 'Планы для' : 'Plans for'} <span class="gradient-text">${isRu ? 'Исследователей' : 'Researchers'}</span>
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          ${isRu
            ? 'ERA DAL с открытым исходным кодом. Используйте свои API-ключи — мы не храним их на сервере.'
            : 'ERA DAL is open source. Bring your own API keys — we never store them server-side.'}
        </p>
        <div class="mt-4 inline-flex items-center gap-2 text-emerald-400 text-sm">
          <i class="fas fa-lock-open"></i>
          ${isRu ? 'Ваши ключи хранятся только в браузере (localStorage)' : 'Your keys stay in your browser only (localStorage)'}
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

        <!-- Individual -->
        <div class="glass rounded-2xl p-8 relative">
          <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-user text-blue-400 text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-1">${isRu ? 'Индивидуальный' : 'Individual'}</h3>
          <p class="text-gray-400 text-sm mb-6">${isRu ? 'Для независимых исследователей' : 'For independent researchers'}</p>

          <div class="mb-8">
            <span class="text-5xl font-bold">${isRu ? 'Бесплатно' : 'Free'}</span>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Неограниченные запросы (BYOK)' : 'Unlimited queries (BYOK)'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? '9 провайдеров моделей' : '9 model providers'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? '2 науч. базы данных' : '2 research databases'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Анализ стабильности (Wilson CI)' : 'Stability analysis (Wilson CI)'}</span>
            </li>
            <li class="flex items-center space-x-3 text-gray-500">
              <i class="fas fa-times"></i>
              <span>${isRu ? 'Раунды опровержения' : 'Rebuttal rounds'}</span>
            </li>
            <li class="flex items-center space-x-3 text-gray-500">
              <i class="fas fa-times"></i>
              <span>${isRu ? 'Командный доступ' : 'Team collaboration'}</span>
            </li>
          </ul>

          <a href="/playground?lang=${lang}" class="block w-full text-center glass hover:bg-white/10 py-3 rounded-xl transition">
            ${isRu ? 'Начать бесплатно' : 'Get Started Free'}
          </a>
        </div>

        <!-- Research Lab (highlighted) -->
        <div class="glass rounded-2xl p-8 relative border-2 border-blue-500 transform scale-105">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              ${isRu ? 'Наиболее популярный' : 'Most Popular'}
            </span>
          </div>

          <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-flask text-purple-400 text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-1">${isRu ? 'Лаборатория' : 'Research Lab'}</h3>
          <p class="text-gray-400 text-sm mb-6">${isRu ? 'Для исследовательских групп' : 'For research groups'}</p>

          <div class="mb-8">
            <span class="text-5xl font-bold" id="lab-price">$19</span>
            <span class="text-gray-400" id="lab-period">${isRu ? '/мес' : '/month'}</span>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Всё из плана Individual' : 'Everything in Individual'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Все 6 науч. баз данных' : 'All 6 research databases'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Раунды опровержения' : 'Rebuttal rounds'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'До 5 участников команды' : 'Up to 5 team members'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Экспорт BibTeX / RIS' : 'BibTeX / RIS export'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Приоритетная поддержка' : 'Priority support'}</span>
            </li>
          </ul>

          <a href="/playground?lang=${lang}" class="block w-full text-center bg-blue-600 hover:bg-blue-700 py-3 rounded-xl transition font-medium">
            ${isRu ? 'Начать пробный период' : 'Start Lab Trial'}
          </a>
        </div>

        <!-- Institution -->
        <div class="glass rounded-2xl p-8 relative">
          <div class="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
            <i class="fas fa-university text-emerald-400 text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-1">${isRu ? 'Институт' : 'Institution'}</h3>
          <p class="text-gray-400 text-sm mb-6">${isRu ? 'Для университетов и НИИ' : 'For universities & research institutes'}</p>

          <div class="mb-8">
            <span class="text-5xl font-bold">${isRu ? 'По запросу' : 'Custom'}</span>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Всё из плана Lab' : 'Everything in Lab'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Неограниченные участники' : 'Unlimited team members'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Self-hosted деплой' : 'Self-hosted deployment'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Кастомные пулы моделей' : 'Custom model pools'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>SLA ${isRu ? 'гарантия' : 'guarantee'}</span>
            </li>
            <li class="flex items-center space-x-3">
              <i class="fas fa-check text-green-500"></i>
              <span>${isRu ? 'Выделенная поддержка' : 'Dedicated support'}</span>
            </li>
          </ul>

          <a href="mailto:research@era-dal.com" class="block w-full text-center glass hover:bg-white/10 py-3 rounded-xl transition">
            ${isRu ? 'Связаться с командой' : 'Contact Research Team'}
          </a>
        </div>
      </div>

      <!-- Research Database Add-ons -->
      <div class="glass rounded-2xl p-8 mb-16">
        <h2 class="text-2xl font-bold mb-2">${isRu ? 'Включённые научные базы данных' : 'Included Research Databases'}</h2>
        <p class="text-gray-400 mb-6">${isRu ? 'Прямая интеграция с ведущими академическими базами.' : 'Direct integrations with leading academic databases.'}</p>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          ${[
            { icon: 'dna', name: 'PubMed', plan: isRu ? 'Individual+' : 'Individual+', color: 'blue' },
            { icon: 'file-alt', name: 'ArXiv', plan: isRu ? 'Individual+' : 'Individual+', color: 'blue' },
            { icon: 'link', name: 'CrossRef', plan: isRu ? 'Lab+' : 'Lab+', color: 'purple' },
            { icon: 'id-badge', name: 'ORCID', plan: isRu ? 'Lab+' : 'Lab+', color: 'purple' },
            { icon: 'book', name: 'Zotero', plan: isRu ? 'Lab+' : 'Lab+', color: 'purple' },
            { icon: 'graduation-cap', name: 'Semantic Scholar', plan: isRu ? 'Lab+' : 'Lab+', color: 'purple' },
          ].map(db => `
            <div class="bg-gray-800 rounded-xl p-4 text-center">
              <i class="fas fa-${db.icon} text-${db.color}-400 text-2xl mb-2"></i>
              <div class="font-semibold text-sm">${db.name}</div>
              <div class="text-xs text-${db.color}-400 mt-1">${db.plan}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Feature Comparison -->
      <div class="mb-20">
        <h2 class="text-2xl font-bold text-center mb-12">${isRu ? 'Сравнение планов' : 'Compare Plans'}</h2>

        <div class="glass rounded-2xl overflow-hidden">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-800">
                <th class="text-left p-6 text-gray-400">${isRu ? 'Возможность' : 'Feature'}</th>
                <th class="p-6 text-center">${isRu ? 'Индивидуальный' : 'Individual'}</th>
                <th class="p-6 text-center bg-blue-500/10">${isRu ? 'Лаборатория' : 'Lab'}</th>
                <th class="p-6 text-center">${isRu ? 'Институт' : 'Institution'}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-800">
                <td class="p-6">${isRu ? 'Запросы в месяц' : 'Queries / Month'}</td>
                <td class="p-6 text-center">${isRu ? 'Без лимита' : 'Unlimited'}</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">${isRu ? 'Без лимита' : 'Unlimited'}</td>
                <td class="p-6 text-center">${isRu ? 'Без лимита' : 'Unlimited'}</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">${isRu ? 'Провайдеры моделей' : 'Model Providers'}</td>
                <td class="p-6 text-center">9</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">9</td>
                <td class="p-6 text-center">${isRu ? 'Кастом' : 'Custom'}</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">${isRu ? 'Научные базы данных' : 'Research Databases'}</td>
                <td class="p-6 text-center">2</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">6</td>
                <td class="p-6 text-center">${isRu ? 'Кастом' : 'Custom'}</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">${isRu ? 'Раунды опровержения' : 'Rebuttal Rounds'}</td>
                <td class="p-6 text-center"><i class="fas fa-times text-red-500"></i></td>
                <td class="p-6 text-center bg-blue-500/10"><i class="fas fa-check text-green-500"></i></td>
                <td class="p-6 text-center"><i class="fas fa-check text-green-500"></i></td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">Wilson CI ${isRu ? 'анализ' : 'Analysis'}</td>
                <td class="p-6 text-center">${isRu ? 'Базовый' : 'Basic'}</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">${isRu ? 'Полный' : 'Full'}</td>
                <td class="p-6 text-center">${isRu ? 'Полный + кастом' : 'Full + Custom'}</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">${isRu ? 'Участники команды' : 'Team Members'}</td>
                <td class="p-6 text-center">1</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">5</td>
                <td class="p-6 text-center">${isRu ? 'Без лимита' : 'Unlimited'}</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">${isRu ? 'Экспорт цитат' : 'Citation Export'}</td>
                <td class="p-6 text-center">JSON</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">BibTeX, RIS, JSON</td>
                <td class="p-6 text-center">${isRu ? 'Все форматы' : 'All formats'}</td>
              </tr>
              <tr class="border-b border-gray-800">
                <td class="p-6">Self-Hosted</td>
                <td class="p-6 text-center"><i class="fas fa-check text-green-500"></i></td>
                <td class="p-6 text-center bg-blue-500/10"><i class="fas fa-check text-green-500"></i></td>
                <td class="p-6 text-center"><i class="fas fa-check text-green-500"></i></td>
              </tr>
              <tr>
                <td class="p-6">${isRu ? 'Поддержка' : 'Support'}</td>
                <td class="p-6 text-center">${isRu ? 'Сообщество' : 'Community'}</td>
                <td class="p-6 text-center bg-blue-500/10 font-semibold">${isRu ? 'Email (приоритет)' : 'Priority Email'}</td>
                <td class="p-6 text-center">${isRu ? 'Выделенная' : 'Dedicated'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FAQ -->
      <div class="mb-20">
        <h2 class="text-2xl font-bold text-center mb-12">${isRu ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}</h2>

        <div class="max-w-3xl mx-auto space-y-4">
          <div class="glass rounded-xl p-6">
            <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(this)">
              <span class="font-semibold">${isRu ? 'Нужно ли мне предоставлять API-ключи?' : 'Do I need to provide my own API keys?'}</span>
              <i class="fas fa-chevron-down transition-transform"></i>
            </button>
            <div class="hidden mt-4 text-gray-400">
              ${isRu
                ? 'Да. ERA DAL работает с вашими собственными API-ключами. Ключи хранятся исключительно в localStorage вашего браузера и никогда не покидают ваше устройство. Мы не имеем доступа к вашим ключам.'
                : 'Yes. ERA DAL works with your own API keys. Keys are stored exclusively in your browser\'s localStorage and never leave your device. We have no access to your keys.'}
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(this)">
              <span class="font-semibold">${isRu ? 'Какие научные базы данных включены?' : 'Which research databases are included?'}</span>
              <i class="fas fa-chevron-down transition-transform"></i>
            </button>
            <div class="hidden mt-4 text-gray-400">
              ${isRu
                ? 'Plan Individual включает PubMed и ArXiv. Plan Lab добавляет CrossRef, ORCID, Zotero и Semantic Scholar. Все базы данных используют официальные публичные API.'
                : 'Individual plan includes PubMed and ArXiv. Lab plan adds CrossRef, ORCID, Zotero, and Semantic Scholar. All databases use official public APIs.'}
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(this)">
              <span class="font-semibold">${isRu ? 'Могу ли я использовать ERA DAL в оффлайн-режиме?' : 'Can I use ERA DAL offline?'}</span>
              <i class="fas fa-chevron-down transition-transform"></i>
            </button>
            <div class="hidden mt-4 text-gray-400">
              ${isRu
                ? 'Да. ERA DAL поддерживает Ollama для запуска LLM локально без подключения к интернету. Это идеально для конфиденциальных исследовательских данных.'
                : 'Yes. ERA DAL supports Ollama for running LLMs locally without internet. This is ideal for sensitive research data that cannot leave your infrastructure.'}
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(this)">
              <span class="font-semibold">${isRu ? 'Как защищены мои исследовательские данные?' : 'How is my research data protected?'}</span>
              <i class="fas fa-chevron-down transition-transform"></i>
            </button>
            <div class="hidden mt-4 text-gray-400">
              ${isRu
                ? 'API-ключи хранятся только в браузере. История запросов сохраняется в вашей базе данных Cloudflare D1. Для максимальной конфиденциальности рекомендуем self-hosted деплой.'
                : 'API keys are stored in your browser only. Query history is saved in your own Cloudflare D1 database. For maximum privacy, we recommend the self-hosted deployment option.'}
            </div>
          </div>

          <div class="glass rounded-xl p-6">
            <button class="flex items-center justify-between w-full text-left" onclick="toggleFaq(this)">
              <span class="font-semibold">${isRu ? 'Как ERA DAL помогает с воспроизводимостью?' : 'How does ERA DAL help with reproducibility?'}</span>
              <i class="fas fa-chevron-down transition-transform"></i>
            </button>
            <div class="hidden mt-4 text-gray-400">
              ${isRu
                ? 'ERA DAL запускает каждый запрос через несколько повторений и вычисляет Wilson CI 95% для оценки стабильности ответа. Журнал истории фиксирует каждый прогон для полной аудируемости.'
                : 'ERA DAL runs each query through multiple repeats and computes Wilson CI 95% to measure answer stability. The history log records every run for full auditability.'}
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4">${isRu ? 'Готовы начать?' : 'Ready to start?'}</h2>
        <p class="text-gray-400 mb-8">${isRu ? 'Присоединяйтесь к исследователям, ускоряющим свои открытия с ERA DAL.' : 'Join researchers accelerating their discoveries with ERA DAL.'}</p>
        <div class="flex items-center justify-center space-x-4">
          <a href="/playground?lang=${lang}" class="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-medium transition">
            ${isRu ? 'Начать бесплатно' : 'Start Free'}
          </a>
          <a href="mailto:research@era-dal.com" class="glass hover:bg-white/10 px-8 py-3 rounded-xl transition">
            ${isRu ? 'Связаться с командой' : 'Contact Research Team'}
          </a>
        </div>
      </div>

    </div>
  </main>

  ${footer(lang)}

  <script>
    function toggleFaq(button) {
      const content = button.nextElementSibling;
      const icon = button.querySelector('i');
      content.classList.toggle('hidden');
      icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  </script>
</body>
</html>
`
}
