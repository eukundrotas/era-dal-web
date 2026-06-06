// Internationalization translations for ERA DAL Web

export type Language = 'en' | 'ru'

export const translations = {
  // Navigation
  nav: {
    features: { en: 'Features', ru: 'Возможности' },
    howItWorks: { en: 'How it Works', ru: 'Как это работает' },
    pricing: { en: 'Pricing', ru: 'Цены' },
    docs: { en: 'Docs', ru: 'Документация' },
    dashboard: { en: 'Dashboard', ru: 'Панель' },
    tryNow: { en: 'Try Now', ru: 'Попробовать' },
  },

  // Sidebar
  sidebar: {
    dashboard: { en: 'Dashboard', ru: 'Панель управления' },
    playground: { en: 'Playground', ru: 'Песочница' },
    history: { en: 'History', ru: 'История' },
    settings: { en: 'Settings', ru: 'Настройки' },
    profile: { en: 'Profile', ru: 'Профиль' },
    apiCalls: { en: 'API Calls', ru: 'API вызовы' },
    upgradePlan: { en: 'Upgrade Plan', ru: 'Улучшить план' },
    proPlan: { en: 'Pro Plan', ru: 'Pro план' },
  },

  // Landing Page
  landing: {
    badge: { en: 'v1.2.0 Released — Level 2 Upgrades Available', ru: 'Версия 1.2.0 — Доступны улучшения Level 2' },
    heroTitle1: { en: 'Enterprise AI', ru: 'Корпоративный ИИ' },
    heroTitle2: { en: 'Decision Making', ru: 'Принятие решений' },
    heroSubtitle: { 
      en: 'Get stable, reproducible, and quantified answers through LLM ensemble, arbitration, consensus synthesis, and self-critique. Built for scientific, medical, legal, and financial applications.',
      ru: 'Получайте стабильные, воспроизводимые и количественные ответы через ансамбль LLM, арбитраж, синтез консенсуса и самокритику. Создано для научных, медицинских, юридических и финансовых приложений.'
    },
    tryPlayground: { en: 'Try Playground', ru: 'Попробовать' },
    viewOnGithub: { en: 'View on GitHub', ru: 'GitHub' },
    testsPassing: { en: 'Tests Passing', ru: 'Тестов пройдено' },
    modules: { en: 'Modules', ru: 'Модулей' },

    // Problem section
    problemTitle: { en: 'The Problem with Single LLM Answers', ru: 'Проблема ответов от одной LLM' },
    problemSubtitle: { 
      en: 'Current AI solutions suffer from critical issues that make them unreliable for enterprise use.',
      ru: 'Современные ИИ-решения страдают от критических проблем, делающих их ненадёжными для корпоративного использования.'
    },
    hallucinations: { en: 'Hallucinations', ru: 'Галлюцинации' },
    hallucinationsDesc: { 
      en: 'Single models confidently produce incorrect information with no way to verify.',
      ru: 'Одиночные модели уверенно выдают неверную информацию без возможности проверки.'
    },
    inconsistency: { en: 'Inconsistency', ru: 'Нестабильность' },
    inconsistencyDesc: { 
      en: 'Same question, different answers each time. No reproducibility guarantees.',
      ru: 'Один вопрос — разные ответы каждый раз. Никаких гарантий воспроизводимости.'
    },
    noConfidence: { en: 'No Confidence Metrics', ru: 'Нет метрик уверенности' },
    noConfidenceDesc: { 
      en: 'No way to know how reliable the answer is. Zero quantitative trust.',
      ru: 'Невозможно узнать, насколько надёжен ответ. Нулевое количественное доверие.'
    },

    // Solution section
    solutionTitle: { en: 'How ERA DAL Solves This', ru: 'Как ERA DAL решает это' },
    solutionSubtitle: { 
      en: 'A multi-layer architecture that ensures reliable, reproducible, and quantified answers.',
      ru: 'Многоуровневая архитектура, обеспечивающая надёжные, воспроизводимые и количественные ответы.'
    },
    solverPool: { en: 'Solver Pool', ru: 'Пул решателей' },
    solverPoolDesc: { 
      en: '5-12 LLM models work in parallel, each providing independent analysis.',
      ru: '5-12 LLM-моделей работают параллельно, каждая предоставляет независимый анализ.'
    },
    arbiterRanker: { en: 'Arbiter Ranker', ru: 'Арбитр-ранжировщик' },
    arbiterRankerDesc: { 
      en: 'Evaluates each answer on logic, completeness, risks, and quality.',
      ru: 'Оценивает каждый ответ по логике, полноте, рискам и качеству.'
    },
    consensusSynthesis: { en: 'Consensus Synthesis', ru: 'Синтез консенсуса' },
    consensusSynthesisDesc: { 
      en: 'Combines top-K answers into a unified, high-quality response.',
      ru: 'Объединяет top-K ответов в единый высококачественный ответ.'
    },
    rebuttalRound: { en: 'Rebuttal Round', ru: 'Раунд опровержений' },
    rebuttalRoundDesc: { 
      en: "Models critique each other's answers, catching errors and improving quality.",
      ru: 'Модели критикуют ответы друг друга, выявляя ошибки и улучшая качество.'
    },
    stabilityAnalysis: { en: 'Stability Analysis', ru: 'Анализ стабильности' },
    stabilityAnalysisDesc: { 
      en: 'Multi-run testing with Wilson CI 95% confidence intervals.',
      ru: 'Многократное тестирование с доверительными интервалами Wilson CI 95%.'
    },
    modelMemory: { en: 'Model Memory', ru: 'Память моделей' },
    modelMemoryDesc: { 
      en: 'Tracks model reliability over time for weighted consensus.',
      ru: 'Отслеживает надёжность моделей для взвешенного консенсуса.'
    },

    // How it works
    howItWorksTitle: { en: 'How It Works', ru: 'Как это работает' },
    howItWorksSubtitle: { en: 'From question to confident answer in 5 steps', ru: 'От вопроса до уверенного ответа за 5 шагов' },
    step1Title: { en: 'Submit Problem', ru: 'Отправьте задачу' },
    step1Desc: { en: 'Enter your question and select the domain (science, math, med, econ)', ru: 'Введите вопрос и выберите домен (наука, математика, медицина, экономика)' },
    step2Title: { en: 'Solver Pool Processes', ru: 'Обработка пулом решателей' },
    step2Desc: { en: '5-12 LLM models analyze your question in parallel', ru: '5-12 LLM-моделей анализируют ваш вопрос параллельно' },
    step3Title: { en: 'Arbiter Evaluates', ru: 'Оценка арбитром' },
    step3Desc: { en: 'Quality assessment, ranking, and disagreement detection', ru: 'Оценка качества, ранжирование и выявление разногласий' },
    step4Title: { en: 'Consensus & Rebuttal', ru: 'Консенсус и опровержение' },
    step4Desc: { en: 'Synthesis from top answers, optional self-critique round', ru: 'Синтез из лучших ответов, опциональный раунд самокритики' },
    step5Title: { en: 'Stability Check', ru: 'Проверка стабильности' },
    step5Desc: { en: 'Multi-run analysis with Wilson CI confidence intervals', ru: 'Многократный анализ с доверительными интервалами Wilson CI' },

    // Use cases
    useCasesTitle: { en: 'Use Cases', ru: 'Примеры использования' },
    useCasesSubtitle: { en: 'Trusted by enterprises for critical decisions', ru: 'Доверяют компании для критически важных решений' },
    scientificResearch: { en: 'Scientific Research', ru: 'Научные исследования' },
    scientificResearchDesc: { en: 'Hypothesis testing with quantitative reliability metrics', ru: 'Проверка гипотез с количественными метриками надёжности' },
    medicalDiagnosis: { en: 'Medical Diagnosis', ru: 'Медицинская диагностика' },
    medicalDiagnosisDesc: { en: 'Second opinion from ensemble of medical AI models', ru: 'Второе мнение от ансамбля медицинских ИИ-моделей' },
    legalAnalysis: { en: 'Legal Analysis', ru: 'Юридический анализ' },
    legalAnalysisDesc: { en: 'Contract analysis with consensus validation', ru: 'Анализ договоров с валидацией консенсусом' },
    financialForecasting: { en: 'Financial Forecasting', ru: 'Финансовое прогнозирование' },
    financialForecastingDesc: { en: 'Risk assessment with confidence intervals', ru: 'Оценка рисков с доверительными интервалами' },
    education: { en: 'Education', ru: 'Образование' },
    educationDesc: { en: 'Automated grading with explanation', ru: 'Автоматическая оценка с объяснением' },
    contentModeration: { en: 'Content Moderation', ru: 'Модерация контента' },
    contentModerationDesc: { en: 'Reliable classification with audit trail', ru: 'Надёжная классификация с журналом аудита' },

    // Stats
    domainPools: { en: 'Domain Pools', ru: 'Доменных пулов' },

    // CTA
    ctaTitle: { en: 'Ready to Make Better Decisions?', ru: 'Готовы принимать лучшие решения?' },
    ctaSubtitle: { en: 'Start using ERA DAL today. Free tier available.', ru: 'Начните использовать ERA DAL сегодня. Есть бесплатный план.' },
    getStartedFree: { en: 'Get Started Free', ru: 'Начать бесплатно' },
    readDocumentation: { en: 'Read Documentation', ru: 'Читать документацию' },
  },

  // Dashboard
  dashboard: {
    title: { en: 'Dashboard', ru: 'Панель управления' },
    subtitle: { en: 'Monitor your ERA DAL performance and usage', ru: 'Мониторинг производительности и использования ERA DAL' },
    refresh: { en: 'Refresh', ru: 'Обновить' },
    newQuery: { en: 'New Query', ru: 'Новый запрос' },
    totalProblems: { en: 'Total Problems', ru: 'Всего задач' },
    totalRuns: { en: 'Total Runs', ru: 'Всего запусков' },
    apiCallsToday: { en: 'API Calls Today', ru: 'API вызовов сегодня' },
    activeModels: { en: 'Active Models', ru: 'Активных моделей' },
    usageOverTime: { en: 'Usage Over Time', ru: 'Использование по времени' },
    modelPerformance: { en: 'Model Performance', ru: 'Производительность моделей' },
    recentActivity: { en: 'Recent Activity', ru: 'Недавняя активность' },
    viewAll: { en: 'View All', ru: 'Смотреть все' },
    quickStats: { en: 'Quick Stats', ru: 'Быстрая статистика' },
    avgConfidence: { en: 'Avg. Confidence', ru: 'Сред. уверенность' },
    avgLatency: { en: 'Avg. Latency', ru: 'Сред. задержка' },
    successRate: { en: 'Success Rate', ru: 'Успешность' },
    topDomain: { en: 'Top Domain', ru: 'Топ домен' },
    topModel: { en: 'Top Model', ru: 'Топ модель' },
    systemStatus: { en: 'System Status', ru: 'Статус системы' },
    apiServer: { en: 'API Server', ru: 'API сервер' },
    database: { en: 'Database', ru: 'База данных' },
    cacheLayer: { en: 'Cache Layer', ru: 'Слой кэша' },
    loading: { en: 'Loading...', ru: 'Загрузка...' },
    noActivity: { en: 'No recent activity', ru: 'Нет недавней активности' },
    stable: { en: 'stable', ru: 'стабильно' },
    active: { en: 'Active', ru: 'Активно' },
  },

  // Profile
  profile: {
    title: { en: 'Profile', ru: 'Профиль' },
    subtitle: { en: 'Manage your account and personal settings', ru: 'Управляйте аккаунтом и личными настройками' },
    editProfile: { en: 'Edit Profile', ru: 'Редактировать' },
    memberSince: { en: 'Member since', ru: 'Участник с' },
    accountInfo: { en: 'Account Information', ru: 'Информация об аккаунте' },
    fullName: { en: 'Full Name', ru: 'Полное имя' },
    email: { en: 'Email', ru: 'Email' },
    company: { en: 'Company', ru: 'Компания' },
    location: { en: 'Location', ru: 'Местоположение' },
    saveChanges: { en: 'Save Changes', ru: 'Сохранить' },
    apiKeys: { en: 'API Keys', ru: 'API ключи' },
    generateNewKey: { en: 'Generate New Key', ru: 'Создать новый ключ' },
    productionKey: { en: 'Production Key', ru: 'Продакшен ключ' },
    developmentKey: { en: 'Development Key', ru: 'Ключ разработки' },
    keepSecure: { en: 'Keep your API keys secure', ru: 'Храните API ключи в безопасности' },
    neverShare: { en: 'Never share your API keys publicly or commit them to version control.', ru: 'Никогда не публикуйте API ключи и не коммитьте их в системы контроля версий.' },
    subscription: { en: 'Subscription', ru: 'Подписка' },
    currentPlan: { en: 'Current Plan', ru: 'Текущий план' },
    renews: { en: 'Renews', ru: 'Продление' },
    modelsAvailable: { en: 'Models Available', ru: 'Доступно моделей' },
    maxParallel: { en: 'Max Parallel', ru: 'Макс. параллельно' },
    unlimited: { en: 'Unlimited', ru: 'Без ограничений' },
    prioritySupport: { en: 'Priority Support', ru: 'Приоритетная поддержка' },
    upgradePlan: { en: 'Upgrade Plan', ru: 'Улучшить план' },
    billingHistory: { en: 'Billing History', ru: 'История платежей' },
    usageStatistics: { en: 'Usage Statistics', ru: 'Статистика использования' },
    thisMonth: { en: 'This Month', ru: 'В этом месяце' },
    totalAllTime: { en: 'Total All Time', ru: 'Всего за всё время' },
    avgResponseTime: { en: 'Avg. Response Time', ru: 'Сред. время ответа' },
    dangerZone: { en: 'Danger Zone', ru: 'Опасная зона' },
    dangerWarning: { en: 'These actions are irreversible. Please be careful.', ru: 'Эти действия необратимы. Будьте осторожны.' },
    exportData: { en: 'Export Data', ru: 'Экспорт данных' },
    deleteAccount: { en: 'Delete Account', ru: 'Удалить аккаунт' },
    used: { en: 'used', ru: 'использовано' },
    improved: { en: 'improved', ru: 'улучшено' },
    excellent: { en: 'Excellent', ru: 'Отлично' },
  },

  // Playground
  playground: {
    title: { en: 'Playground', ru: 'Песочница' },
    subtitle: { en: 'Test ERA DAL with your own queries', ru: 'Тестируйте ERA DAL своими запросами' },
    yourQuestion: { en: 'Your Question', ru: 'Ваш вопрос' },
    placeholder: { en: 'Enter your question here...', ru: 'Введите ваш вопрос здесь...' },
    submit: { en: 'Submit', ru: 'Отправить' },
    advancedSettings: { en: 'Advanced Settings', ru: 'Расширенные настройки' },
    repeats: { en: 'Repeats', ru: 'Повторов' },
    consensusTopK: { en: 'Consensus Top-K', ru: 'Консенсус Top-K' },
    epsilon: { en: 'Epsilon', ru: 'Эпсилон' },
    enableRebuttal: { en: 'Enable Rebuttal', ru: 'Включить опровержение' },
    hardOnlySelection: { en: 'Hard Only Selection', ru: 'Только жёсткий выбор' },
    solverPool: { en: 'Solver Pool', ru: 'Пул решателей' },
    ready: { en: 'Ready', ru: 'Готово' },
    quickExamples: { en: 'Quick Examples', ru: 'Быстрые примеры' },
    darkMatterEvidence: { en: 'Dark matter evidence', ru: 'Доказательства тёмной материи' },
    riemannHypothesis: { en: 'Riemann hypothesis', ru: 'Гипотеза Римана' },
    mrnaVaccineMechanism: { en: 'mRNA vaccine mechanism', ru: 'Механизм мРНК вакцин' },
    inflationCauses: { en: 'Inflation causes', ru: 'Причины инфляции' },
    finalAnswer: { en: 'Final Answer', ru: 'Финальный ответ' },
    confidence: { en: 'Confidence', ru: 'Уверенность' },
    majorityRate: { en: 'Majority Rate', ru: 'Доля большинства' },
    latency: { en: 'Latency', ru: 'Задержка' },
    modelsUsed: { en: 'Models Used', ru: 'Использовано моделей' },
    modelResponses: { en: 'Individual Model Responses', ru: 'Ответы отдельных моделей' },
    processing: { en: 'Processing Query...', ru: 'Обработка запроса...' },
    copied: { en: 'Copied to clipboard!', ru: 'Скопировано!' },
    enterQuestion: { en: 'Please enter a question', ru: 'Пожалуйста, введите вопрос' },
    thinkingMode: { en: 'Thinking Mode', ru: 'Режим мышления' },
    thinkingModeHint: { en: 'Cognitive framework applied to all models in this query.', ru: 'Когнитивный фреймворк, применяемый ко всем моделям запроса.' },
  },

  // History
  history: {
    title: { en: 'Query History', ru: 'История запросов' },
    subtitle: { en: 'View and analyze your past queries', ru: 'Просматривайте и анализируйте прошлые запросы' },
    export: { en: 'Export', ru: 'Экспорт' },
    clear: { en: 'Clear', ru: 'Очистить' },
    searchQueries: { en: 'Search queries...', ru: 'Поиск запросов...' },
    allDomains: { en: 'All Domains', ru: 'Все домены' },
    allStatus: { en: 'All Status', ru: 'Все статусы' },
    success: { en: 'Success', ru: 'Успешно' },
    partial: { en: 'Partial', ru: 'Частично' },
    failed: { en: 'Failed', ru: 'Ошибка' },
    last7Days: { en: 'Last 7 Days', ru: 'Последние 7 дней' },
    last30Days: { en: 'Last 30 Days', ru: 'Последние 30 дней' },
    last90Days: { en: 'Last 90 Days', ru: 'Последние 90 дней' },
    allTime: { en: 'All Time', ru: 'За всё время' },
    showing: { en: 'Showing', ru: 'Показано' },
    of: { en: 'of', ru: 'из' },
    queries: { en: 'queries', ru: 'запросов' },
    queryDetails: { en: 'Query Details', ru: 'Детали запроса' },
    query: { en: 'Query', ru: 'Запрос' },
    rerunQuery: { en: 'Re-run Query', ru: 'Повторить запрос' },
    copy: { en: 'Copy', ru: 'Копировать' },
    models: { en: 'models', ru: 'моделей' },
    runs: { en: 'runs', ru: 'запусков' },
    hoursAgo: { en: 'hours ago', ru: 'часов назад' },
    daysAgo: { en: 'days ago', ru: 'дней назад' },
    yesterday: { en: 'Yesterday', ru: 'Вчера' },
    modelRankings: { en: 'Model Rankings', ru: 'Рейтинг моделей' },
  },

  // Settings
  settings: {
    title: { en: 'Settings', ru: 'Настройки' },
    subtitle: { en: 'Configure your ERA DAL preferences', ru: 'Настройте параметры ERA DAL' },
    apiConfiguration: { en: 'API Configuration', ru: 'Конфигурация API' },
    openRouterApiKey: { en: 'OpenRouter API Key', ru: 'API ключ OpenRouter' },
    getApiKey: { en: 'Get your API key from', ru: 'Получите API ключ на' },
    apiBaseUrl: { en: 'API Base URL', ru: 'Базовый URL API' },
    solverTimeout: { en: 'Solver Timeout (seconds)', ru: 'Таймаут решателя (секунды)' },
    arbiterTimeout: { en: 'Arbiter Timeout (seconds)', ru: 'Таймаут арбитра (секунды)' },
    test: { en: 'Test', ru: 'Тест' },
    defaultQuerySettings: { en: 'Default Query Settings', ru: 'Настройки запросов по умолчанию' },
    defaultDomain: { en: 'Default Domain', ru: 'Домен по умолчанию' },
    defaultMode: { en: 'Default Mode', ru: 'Режим по умолчанию' },
    defaultRepeats: { en: 'Default Repeats', ru: 'Повторов по умолчанию' },
    enableRebuttalByDefault: { en: 'Enable Rebuttal by Default', ru: 'Включить опровержение по умолчанию' },
    modelsWillCritique: { en: "Models will critique each other's answers", ru: 'Модели будут критиковать ответы друг друга' },
    modelPreferences: { en: 'Model Preferences', ru: 'Настройки моделей' },
    notifications: { en: 'Notifications', ru: 'Уведомления' },
    emailNotifications: { en: 'Email Notifications', ru: 'Email уведомления' },
    receiveUpdates: { en: 'Receive updates about your queries', ru: 'Получать обновления о запросах' },
    usageAlerts: { en: 'Usage Alerts', ru: 'Уведомления об использовании' },
    getNotifiedLimits: { en: 'Get notified when approaching limits', ru: 'Уведомление при приближении к лимитам' },
    weeklyReports: { en: 'Weekly Reports', ru: 'Еженедельные отчёты' },
    receiveWeekly: { en: 'Receive weekly usage summaries', ru: 'Получать еженедельные сводки' },
    marketingEmails: { en: 'Marketing Emails', ru: 'Маркетинговые письма' },
    newsAboutFeatures: { en: 'News about features and updates', ru: 'Новости о функциях и обновлениях' },
    appearance: { en: 'Appearance', ru: 'Внешний вид' },
    theme: { en: 'Theme', ru: 'Тема' },
    dark: { en: 'Dark', ru: 'Тёмная' },
    light: { en: 'Light', ru: 'Светлая' },
    comingSoon: { en: 'Coming soon', ru: 'Скоро' },
    language: { en: 'Language', ru: 'Язык' },
    resetToDefaults: { en: 'Reset to Defaults', ru: 'Сбросить по умолчанию' },
    saveSettings: { en: 'Save Settings', ru: 'Сохранить настройки' },
    settingsSaved: { en: 'Settings saved successfully!', ru: 'Настройки сохранены!' },
  },

  // Pricing
  pricing: {
    title: { en: 'Simple, Transparent Pricing', ru: 'Простые и прозрачные цены' },
    subtitle: { en: 'Start free, scale as you grow. No hidden fees, no surprises.', ru: 'Начните бесплатно, масштабируйтесь по мере роста. Без скрытых платежей.' },
    monthly: { en: 'Monthly', ru: 'Ежемесячно' },
    yearly: { en: 'Yearly', ru: 'Ежегодно' },
    save20: { en: 'Save 20%', ru: 'Скидка 20%' },
    free: { en: 'Free', ru: 'Бесплатно' },
    freeDesc: { en: 'Perfect for trying out ERA DAL', ru: 'Идеально для знакомства с ERA DAL' },
    pro: { en: 'Pro', ru: 'Pro' },
    proDesc: { en: 'For professionals and small teams', ru: 'Для профессионалов и небольших команд' },
    enterprise: { en: 'Enterprise', ru: 'Enterprise' },
    enterpriseDesc: { en: 'For large organizations', ru: 'Для крупных организаций' },
    mostPopular: { en: 'Most Popular', ru: 'Самый популярный' },
    custom: { en: 'Custom', ru: 'По запросу' },
    month: { en: 'month', ru: 'месяц' },
    billedYearly: { en: 'billed yearly', ru: 'при годовой оплате' },
    apiCallsMonth: { en: 'API calls/month', ru: 'API вызовов/месяц' },
    modelsPerQuery: { en: 'models per query', ru: 'моделей на запрос' },
    domainOnly: { en: 'domain only', ru: 'только домен' },
    allDomains: { en: 'All 4 domains', ru: 'Все 4 домена' },
    basicStability: { en: 'Basic stability metrics', ru: 'Базовые метрики стабильности' },
    fullStability: { en: 'Full stability analysis', ru: 'Полный анализ стабильности' },
    noRebuttal: { en: 'No rebuttal rounds', ru: 'Без раундов опровержения' },
    rebuttalRounds: { en: 'Rebuttal rounds', ru: 'Раунды опровержения' },
    noPrioritySupport: { en: 'No priority support', ru: 'Без приоритетной поддержки' },
    prioritySupport: { en: 'Priority support', ru: 'Приоритетная поддержка' },
    customModelPools: { en: 'Custom model pools', ru: 'Пользовательские пулы моделей' },
    customDomains: { en: 'Custom domains', ru: 'Пользовательские домены' },
    selfHosted: { en: 'Self-hosted option', ru: 'Возможность self-hosted' },
    slaGuarantee: { en: 'SLA guarantee', ru: 'Гарантия SLA' },
    dedicatedSupport: { en: 'Dedicated support', ru: 'Выделенная поддержка' },
    getStartedFree: { en: 'Get Started Free', ru: 'Начать бесплатно' },
    startProTrial: { en: 'Start Pro Trial', ru: 'Начать Pro пробный период' },
    contactSales: { en: 'Contact Sales', ru: 'Связаться с продажами' },
    comparePlans: { en: 'Compare Plans', ru: 'Сравнение планов' },
    feature: { en: 'Feature', ru: 'Функция' },
    faq: { en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' },
    readyToStart: { en: 'Ready to get started?', ru: 'Готовы начать?' },
    joinThousands: { en: 'Join thousands of professionals making better decisions with ERA DAL.', ru: 'Присоединяйтесь к тысячам профессионалов, принимающих лучшие решения с ERA DAL.' },
    startFreeTrial: { en: 'Start Free Trial', ru: 'Начать бесплатный период' },
    talkToSales: { en: 'Talk to Sales', ru: 'Связаться с продажами' },
  },

  // Docs
  docs: {
    title: { en: 'ERA DAL Documentation', ru: 'Документация ERA DAL' },
    gettingStarted: { en: 'Getting Started', ru: 'Начало работы' },
    introduction: { en: 'Introduction', ru: 'Введение' },
    quickStart: { en: 'Quick Start', ru: 'Быстрый старт' },
    installation: { en: 'Installation', ru: 'Установка' },
    coreConcepts: { en: 'Core Concepts', ru: 'Ключевые концепции' },
    apiReference: { en: 'API Reference', ru: 'API справочник' },
    overview: { en: 'Overview', ru: 'Обзор' },
    endpoints: { en: 'Endpoints', ru: 'Эндпоинты' },
    errorHandling: { en: 'Error Handling', ru: 'Обработка ошибок' },
    examples: { en: 'Examples', ru: 'Примеры' },
    scienceQuery: { en: 'Science Query', ru: 'Научный запрос' },
    mathQuery: { en: 'Math Query', ru: 'Математический запрос' },
    keyFeatures: { en: 'Key Features', ru: 'Ключевые функции' },
    requirements: { en: 'Requirements', ru: 'Требования' },
    dockerInstallation: { en: 'Docker Installation', ru: 'Установка через Docker' },
    manualInstallation: { en: 'Manual Installation', ru: 'Ручная установка' },
    availableModels: { en: 'Available Models', ru: 'Доступные модели' },
    domainPools: { en: 'Domain Pools', ru: 'Доменные пулы' },
    baseUrl: { en: 'Base URL', ru: 'Базовый URL' },
    checkApiHealth: { en: 'Check API health status', ru: 'Проверка статуса API' },
    getDashboardStats: { en: 'Get dashboard statistics', ru: 'Получение статистики панели' },
    getRecentEvents: { en: 'Get recent events', ru: 'Получение недавних событий' },
    getModelStats: { en: 'Get model performance statistics', ru: 'Получение статистики моделей' },
    pythonLibraryUsage: { en: 'Python Library Usage', ru: 'Использование Python библиотеки' },
    reportIssue: { en: 'Report Issue', ru: 'Сообщить об ошибке' },
  },

  // Footer
  footer: {
    description: { en: 'Enterprise-grade decision making through LLM ensemble, arbitration, and consensus.', ru: 'Корпоративное принятие решений через ансамбль LLM, арбитраж и консенсус.' },
    product: { en: 'Product', ru: 'Продукт' },
    resources: { en: 'Resources', ru: 'Ресурсы' },
    contact: { en: 'Contact', ru: 'Контакты' },
    documentation: { en: 'Documentation', ru: 'Документация' },
    apiReference: { en: 'API Reference', ru: 'API справочник' },
    support: { en: 'Support', ru: 'Поддержка' },
    allRightsReserved: { en: 'All rights reserved.', ru: 'Все права защищены.' },
    builtBy: { en: 'Built by Eugene Kundrotas.', ru: 'Создано Eugene Kundrotas.' },
  },

  // Thinking Modes
  thinkingModes: {
    label: { en: 'Thinking Mode', ru: 'Режим мышления' },
    selectHint: { en: 'Cognitive framework applied to all models', ru: 'Когнитивный фреймворк для всех моделей' },
    standard: { en: 'Standard', ru: 'Стандартное' },
    triz: { en: 'TRIZ', ru: 'ТРИЗ' },
    lateral: { en: 'Lateral Thinking', ru: 'Латеральное' },
    systems: { en: 'Systems Thinking', ru: 'Системное' },
    design: { en: 'Design Thinking', ru: 'Дизайн-мышление' },
    first_principles: { en: 'First Principles', ru: 'Первые принципы' },
    critical: { en: 'Critical Thinking', ru: 'Критическое' },
    divergent: { en: 'Divergent', ru: 'Дивергентное' },
    convergent: { en: 'Convergent', ru: 'Конвергентное' },
    bayesian: { en: 'Bayesian', ru: 'Байесовское' },
    six_hats: { en: 'Six Thinking Hats', ru: 'Шесть шляп' },
    quantum: { en: 'Quantum Thinking', ru: 'Квантовое' },
    abductive: { en: 'Abductive', ru: 'Абдуктивное' },
    metacognitive: { en: 'Metacognitive', ru: 'Метакогнитивное' },
    synectics: { en: 'Synectics', ru: 'Синектическое' },
    descStandard: { en: 'Default reasoning, no special framework.', ru: 'Обычное рассуждение без фреймворка.' },
    descTriz: { en: 'Contradictions → inventive principles → ideal result.', ru: 'Противоречия → принципы → идеальный результат.' },
    descLateral: { en: 'Break patterns, provoke unexpected connections (de Bono).', ru: 'Разрыв шаблонов, неожиданные связи (де Боно).' },
    descSystems: { en: 'Feedback loops, leverage points, emergent behavior.', ru: 'Обратные связи, точки рычага, эмерджентность.' },
    descDesign: { en: 'Empathize → Define → Ideate → Prototype → Test.', ru: 'Эмпатия → Определение → Идеи → Прототип → Тест.' },
    descFirstPrinciples: { en: 'Strip all assumptions. Build from indisputable facts.', ru: 'Убрать допущения. Строить на фактах.' },
    descCritical: { en: 'Evidence quality, logical validity, calibrated confidence.', ru: 'Качество доказательств, логика, калибровка.' },
    descDivergent: { en: 'Maximum idea variety. Judgment suspended.', ru: 'Максимум идей. Оценка отложена.' },
    descConvergent: { en: 'Evaluate all options → single best answer.', ru: 'Оценить варианты → одно лучшее решение.' },
    descBayesian: { en: 'Prior + evidence → updated probability. No binary verdicts.', ru: 'Априор + данные → обновлённая вероятность.' },
    descSixHats: { en: 'Six parallel perspectives: facts, emotion, risk, value, creativity, synthesis.', ru: 'Шесть перспектив: факты, эмоции, риск, ценность, творчество, синтез.' },
    descQuantum: { en: 'Superposition of contradictions. Collapse only after full probability mapping.', ru: 'Суперпозиция противоречий. Коллапс после полного отображения вероятностей.' },
    descAbductive: { en: 'Inference to the best explanation. Think like a detective.', ru: 'Вывод к лучшему объяснению. Детективное мышление.' },
    descMetacognitive: { en: 'Think about your thinking. Audit biases and strategy.', ru: 'Мышление о мышлении. Аудит стратегий и предвзятостей.' },
    descSynectics: { en: 'Solve through analogy. Make the strange familiar.', ru: 'Решение через аналогию. Чужое сделать знакомым.' },
  },

  // Agent role display names (used in result views, history, logs)
  agentRoles: {
    // Core
    researcher:         { en: 'Researcher',          ru: 'Исследователь' },
    analyst:            { en: 'Analyst',              ru: 'Аналитик' },
    writer:             { en: 'Writer',               ru: 'Автор' },
    critic:             { en: 'Critic',               ru: 'Критик' },
    planner:            { en: 'Planner',              ru: 'Планировщик' },
    executor:           { en: 'Executor',             ru: 'Исполнитель' },
    reviewer:           { en: 'Reviewer',             ru: 'Ревьюер' },
    supervisor:         { en: 'Supervisor',           ru: 'Супервизор' },
    coordinator:        { en: 'Coordinator',          ru: 'Координатор' },
    custom:             { en: 'Custom Agent',         ru: 'Свой агент' },
    // Business
    sales_manager:      { en: 'Sales Manager',        ru: 'Менеджер по продажам' },
    marketing_manager:  { en: 'Marketing Manager',    ru: 'Маркетолог' },
    financial_analyst:  { en: 'Financial Analyst',    ru: 'Финансовый аналитик' },
    legal_counsel:      { en: 'Legal Counsel',        ru: 'Юрист' },
    hr_specialist:      { en: 'HR Specialist',        ru: 'HR-специалист' },
    project_manager:    { en: 'Project Manager',      ru: 'Менеджер проектов' },
    // Tech
    software_engineer:  { en: 'Software Engineer',    ru: 'Разработчик' },
    data_engineer:      { en: 'Data Engineer',        ru: 'Data-инженер' },
    devops_engineer:    { en: 'DevOps Engineer',      ru: 'DevOps-инженер' },
    security_analyst:   { en: 'Security Analyst',     ru: 'Аналитик ИБ' },
    // Science
    research_scientist: { en: 'Research Scientist',   ru: 'Учёный-исследователь' },
    data_scientist:     { en: 'Data Scientist',       ru: 'Дата-сайентист' },
    experiment_designer:{ en: 'Experiment Designer',  ru: 'Дизайнер экспериментов' },
    peer_reviewer:      { en: 'Peer Reviewer',        ru: 'Рецензент' },
    literature_researcher:{ en: 'Literature Researcher',ru: 'Обзор литературы' },
    // AI/LLM Engineering
    ml_engineer:        { en: 'ML Engineer',          ru: 'ML-инженер' },
    prompt_engineer:    { en: 'Prompt Engineer',      ru: 'Prompt-инженер' },
    llm_engineer:       { en: 'LLM Engineer',         ru: 'LLM-инженер' },
    ai_architect:       { en: 'AI Architect',         ru: 'AI-архитектор' },
    mlops_engineer:     { en: 'MLOps Engineer',       ru: 'MLOps-инженер' },
  },

  // Common
  common: {
    science: { en: 'Science', ru: 'Наука' },
    math: { en: 'Mathematics', ru: 'Математика' },
    med: { en: 'Medical', ru: 'Медицина' },
    econ: { en: 'Economics', ru: 'Экономика' },
    consensusTop2: { en: 'Consensus Top-2', ru: 'Консенсус Top-2' },
    consensusTop3: { en: 'Consensus Top-3', ru: 'Консенсус Top-3' },
    hardSelect: { en: 'Hard Select', ru: 'Жёсткий выбор' },
    english: { en: 'English', ru: 'Английский' },
    russian: { en: 'Russian', ru: 'Русский' },
    close: { en: 'Close', ru: 'Закрыть' },
    cancel: { en: 'Cancel', ru: 'Отмена' },
    confirm: { en: 'Confirm', ru: 'Подтвердить' },
    save: { en: 'Save', ru: 'Сохранить' },
    delete: { en: 'Delete', ru: 'Удалить' },
    edit: { en: 'Edit', ru: 'Редактировать' },
    view: { en: 'View', ru: 'Просмотр' },
    back: { en: 'Back', ru: 'Назад' },
    next: { en: 'Next', ru: 'Далее' },
    previous: { en: 'Previous', ru: 'Предыдущий' },
  }
}

// Helper function to get translation
export const t = (key: string, lang: Language): string => {
  const keys = key.split('.')
  let value: any = translations
  for (const k of keys) {
    value = value?.[k]
    if (!value) return key
  }
  return value[lang] || value['en'] || key
}

// Get all translations for a section
export const getSection = (section: keyof typeof translations, lang: Language): Record<string, string> => {
  const sectionData = translations[section]
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(sectionData)) {
    result[key] = (value as any)[lang] || (value as any)['en'] || key
  }
  return result
}
