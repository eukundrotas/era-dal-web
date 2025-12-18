// i18n Translations for ERA DAL Web

export type Language = 'en' | 'ru'

export const translations = {
  en: {
    // Navigation
    nav: {
      features: 'Features',
      howItWorks: 'How it Works',
      pricing: 'Pricing',
      docs: 'Docs',
      dashboard: 'Dashboard',
      tryNow: 'Try Now',
      profile: 'Profile',
      settings: 'Settings',
      history: 'History',
      playground: 'Playground',
      logout: 'Logout'
    },

    // Landing Page
    landing: {
      badge: 'v1.2.0 Released — Level 2 Upgrades Available',
      heroTitle1: 'Enterprise AI',
      heroTitle2: 'Decision Making',
      heroDesc: 'Get <span class="text-white font-semibold">stable, reproducible, and quantified</span> answers through LLM ensemble, arbitration, consensus synthesis, and self-critique. Built for scientific, medical, legal, and financial applications.',
      tryPlayground: 'Try Playground',
      viewGitHub: 'View on GitHub',
      testsPassing: 'Tests Passing',
      modules: 'Modules',
      wilsonCI: 'Wilson CI',
      
      // Problem Section
      problemTitle: 'The Problem with Single LLM Answers',
      problemDesc: 'Current AI solutions suffer from critical issues that make them unreliable for enterprise use.',
      hallucinations: 'Hallucinations',
      hallucinationsDesc: 'Single models confidently produce incorrect information with no way to verify.',
      inconsistency: 'Inconsistency',
      inconsistencyDesc: 'Same question, different answers each time. No reproducibility guarantees.',
      noConfidence: 'No Confidence Metrics',
      noConfidenceDesc: 'No way to know how reliable the answer is. Zero quantitative trust.',
      
      // Solution Section
      solutionTitle: 'How ERA DAL Solves This',
      solutionDesc: 'A multi-layer architecture that ensures reliable, reproducible, and quantified answers.',
      solverPool: 'Solver Pool',
      solverPoolDesc: '5-12 LLM models work in parallel, each providing independent analysis.',
      arbiter: 'Arbiter Ranker',
      arbiterDesc: 'Evaluates each answer on logic, completeness, risks, and quality.',
      consensus: 'Consensus Synthesis',
      consensusDesc: 'Combines top-K answers into a unified, high-quality response.',
      rebuttal: 'Rebuttal Round',
      rebuttalDesc: 'Models critique each other\'s answers, catching errors and improving quality.',
      stability: 'Stability Analysis',
      stabilityDesc: 'Multi-run testing with Wilson CI 95% confidence intervals.',
      modelMemory: 'Model Memory',
      modelMemoryDesc: 'Tracks model reliability over time for weighted consensus.',
      
      // How it Works
      howItWorksTitle: 'How It Works',
      howItWorksDesc: 'From question to confident answer in 5 steps',
      step1: 'Submit Problem',
      step1Desc: 'Enter your question and select the domain (science, math, med, econ)',
      step2: 'Solver Pool Processes',
      step2Desc: '5-12 LLM models analyze your question in parallel',
      step3: 'Arbiter Evaluates',
      step3Desc: 'Quality assessment, ranking, and disagreement detection',
      step4: 'Consensus & Rebuttal',
      step4Desc: 'Synthesis from top answers, optional self-critique round',
      step5: 'Stability Check',
      step5Desc: 'Multi-run analysis with Wilson CI confidence intervals',
      
      // Use Cases
      useCasesTitle: 'Use Cases',
      useCasesDesc: 'Trusted by enterprises for critical decisions',
      scientific: 'Scientific Research',
      scientificDesc: 'Hypothesis testing with quantitative reliability metrics',
      medical: 'Medical Diagnosis',
      medicalDesc: 'Second opinion from ensemble of medical AI models',
      legal: 'Legal Analysis',
      legalDesc: 'Contract analysis with consensus validation',
      financial: 'Financial Forecasting',
      financialDesc: 'Risk assessment with confidence intervals',
      education: 'Education',
      educationDesc: 'Automated grading with explanation',
      moderation: 'Content Moderation',
      moderationDesc: 'Reliable classification with audit trail',
      
      // Stats
      domainPools: 'Domain Pools',
      
      // CTA
      ctaTitle: 'Ready to Make Better Decisions?',
      ctaDesc: 'Start using ERA DAL today. Free tier available.',
      getStarted: 'Get Started Free',
      readDocs: 'Read Documentation'
    },

    // Dashboard
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Monitor your ERA DAL performance and usage',
      refresh: 'Refresh',
      newQuery: 'New Query',
      totalProblems: 'Total Problems',
      totalRuns: 'Total Runs',
      apiCallsToday: 'API Calls Today',
      activeModels: 'Active Models',
      usageOverTime: 'Usage Over Time',
      modelPerformance: 'Model Performance',
      recentActivity: 'Recent Activity',
      viewAll: 'View All',
      quickStats: 'Quick Stats',
      avgConfidence: 'Avg. Confidence',
      avgLatency: 'Avg. Latency',
      successRate: 'Success Rate',
      topDomain: 'Top Domain',
      topModel: 'Top Model',
      systemStatus: 'System Status',
      apiServer: 'API Server',
      database: 'Database',
      cacheLayer: 'Cache Layer',
      loading: 'Loading...',
      noActivity: 'No recent activity'
    },

    // Profile
    profile: {
      title: 'Profile',
      subtitle: 'Manage your account and personal settings',
      editProfile: 'Edit Profile',
      accountInfo: 'Account Information',
      fullName: 'Full Name',
      email: 'Email',
      company: 'Company',
      location: 'Location',
      saveChanges: 'Save Changes',
      apiKeys: 'API Keys',
      generateNew: 'Generate New Key',
      productionKey: 'Production Key',
      developmentKey: 'Development Key',
      active: 'Active',
      revoke: 'Revoke',
      copy: 'Copy',
      securityWarning: 'Keep your API keys secure',
      securityWarningDesc: 'Never share your API keys publicly or commit them to version control.',
      subscription: 'Subscription',
      currentPlan: 'Current Plan',
      apiCalls: 'API Calls',
      used: 'used',
      modelsAvailable: 'Models Available',
      maxParallel: 'Max Parallel',
      unlimited: 'Unlimited',
      prioritySupport: 'Priority Support',
      upgradePlan: 'Upgrade Plan',
      billingHistory: 'Billing History',
      usageStats: 'Usage Statistics',
      thisMonth: 'This Month',
      totalAllTime: 'Total All Time',
      avgResponseTime: 'Avg. Response Time',
      dangerZone: 'Danger Zone',
      dangerZoneDesc: 'These actions are irreversible. Please be careful.',
      exportData: 'Export Data',
      deleteAccount: 'Delete Account',
      memberSince: 'Member since'
    },

    // Playground
    playground: {
      title: 'Playground',
      subtitle: 'Test ERA DAL with your own queries',
      yourQuestion: 'Your Question',
      placeholder: 'Enter your question here... e.g., "What is the evidence for dark matter in the universe?"',
      submit: 'Submit',
      advancedSettings: 'Advanced Settings',
      repeats: 'Repeats',
      consensusTopK: 'Consensus Top-K',
      epsilon: 'Epsilon',
      enableRebuttal: 'Enable Rebuttal',
      hardOnly: 'Hard Only Selection',
      solverPool: 'Solver Pool',
      ready: 'Ready',
      quickExamples: 'Quick Examples',
      darkMatter: 'Dark matter evidence',
      riemann: 'Riemann hypothesis',
      mrna: 'mRNA vaccine mechanism',
      inflation: 'Inflation causes',
      finalAnswer: 'Final Answer',
      confidence: 'Confidence',
      majorityRate: 'Majority Rate',
      latency: 'Latency',
      modelsUsed: 'Models Used',
      modelResponses: 'Individual Model Responses',
      processing: 'Processing Query...',
      initializingPool: 'Initializing solver pool...',
      copyResult: 'Copied to clipboard!'
    },

    // History
    history: {
      title: 'Query History',
      subtitle: 'View and analyze your past queries',
      export: 'Export',
      clear: 'Clear',
      searchPlaceholder: 'Search queries...',
      allDomains: 'All Domains',
      allStatus: 'All Status',
      success: 'Success',
      partial: 'Partial',
      failed: 'Failed',
      last7Days: 'Last 7 Days',
      last30Days: 'Last 30 Days',
      last90Days: 'Last 90 Days',
      allTime: 'All Time',
      showing: 'Showing',
      of: 'of',
      queries: 'queries',
      hoursAgo: 'hours ago',
      yesterday: 'Yesterday',
      daysAgo: 'days ago',
      queryDetails: 'Query Details',
      query: 'Query',
      rerunQuery: 'Re-run Query',
      modelRankings: 'Model Rankings',
      runs: 'runs',
      models: 'models'
    },

    // Settings
    settings: {
      title: 'Settings',
      subtitle: 'Configure your ERA DAL preferences',
      apiConfig: 'API Configuration',
      apiKey: 'OpenRouter API Key',
      getApiKey: 'Get your API key from',
      baseUrl: 'API Base URL',
      solverTimeout: 'Solver Timeout (seconds)',
      arbiterTimeout: 'Arbiter Timeout (seconds)',
      test: 'Test',
      defaultSettings: 'Default Query Settings',
      defaultDomain: 'Default Domain',
      defaultMode: 'Default Mode',
      defaultRepeats: 'Default Repeats',
      rebuttalByDefault: 'Enable Rebuttal by Default',
      rebuttalDesc: 'Models will critique each other\'s answers',
      hardOnlyDefault: 'Hard Only Selection',
      hardOnlyDesc: 'Only use hard-select mode for answers',
      modelPreferences: 'Model Preferences',
      notifications: 'Notifications',
      emailNotifications: 'Email Notifications',
      emailDesc: 'Receive updates about your queries',
      usageAlerts: 'Usage Alerts',
      usageAlertsDesc: 'Get notified when approaching limits',
      weeklyReports: 'Weekly Reports',
      weeklyReportsDesc: 'Receive weekly usage summaries',
      marketingEmails: 'Marketing Emails',
      marketingDesc: 'News about features and updates',
      appearance: 'Appearance',
      theme: 'Theme',
      dark: 'Dark',
      light: 'Light',
      comingSoon: 'Coming soon',
      language: 'Language',
      resetDefaults: 'Reset to Defaults',
      saveSettings: 'Save Settings'
    },

    // Pricing
    pricing: {
      title: 'Simple, <span class="gradient-text">Transparent</span> Pricing',
      subtitle: 'Start free, scale as you grow. No hidden fees, no surprises.',
      monthly: 'Monthly',
      yearly: 'Yearly',
      save20: 'Save 20%',
      free: 'Free',
      freeDesc: 'Perfect for trying out ERA DAL',
      pro: 'Pro',
      proDesc: 'For professionals and small teams',
      enterprise: 'Enterprise',
      enterpriseDesc: 'For large organizations',
      custom: 'Custom',
      month: '/month',
      billedYearly: '/month (billed yearly)',
      apiCallsMonth: 'API calls/month',
      modelsPerQuery: 'models per query',
      domainOnly: 'domain only',
      allDomains: 'All 4 domains',
      customDomains: 'Custom domains',
      basicStability: 'Basic stability metrics',
      fullStability: 'Full stability analysis',
      noRebuttal: 'No rebuttal rounds',
      rebuttalRounds: 'Rebuttal rounds',
      noPriority: 'No priority support',
      prioritySupport: 'Priority support',
      customModels: 'Custom model pools',
      selfHosted: 'Self-hosted option',
      slaGuarantee: 'SLA guarantee',
      dedicatedSupport: 'Dedicated support',
      getStartedFree: 'Get Started Free',
      startProTrial: 'Start Pro Trial',
      contactSales: 'Contact Sales',
      comparePlans: 'Compare Plans',
      feature: 'Feature',
      faq: 'Frequently Asked Questions',
      faqApiCall: 'What counts as an API call?',
      faqApiCallAnswer: 'Each query submission counts as one API call, regardless of how many models are used in the ensemble. Running multiple repeats for stability analysis does not increase your API call count.',
      faqUpgrade: 'Can I upgrade or downgrade anytime?',
      faqUpgradeAnswer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference. When downgrading, the change takes effect at the next billing cycle.',
      faqRefund: 'Do you offer refunds?',
      faqRefundAnswer: 'We offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us within 14 days of your purchase for a full refund.',
      faqExceed: 'What happens if I exceed my API limit?',
      faqExceedAnswer: 'You\'ll receive a notification at 80% usage. If you exceed your limit, you can either upgrade your plan or purchase additional API calls as needed. We won\'t cut off your access without warning.',
      faqSecurity: 'Is my data secure?',
      faqSecurityAnswer: 'Yes. We use industry-standard encryption for all data in transit and at rest. Your queries are processed through secure APIs and are not stored longer than necessary. Enterprise customers can also opt for self-hosted deployments.',
      readyToStart: 'Ready to get started?',
      joinThousands: 'Join thousands of professionals making better decisions with ERA DAL.',
      talkToSales: 'Talk to Sales'
    },

    // Docs
    docs: {
      title: 'ERA DAL Documentation',
      subtitle: 'Learn how to use ERA DAL - API reference, examples, and guides.',
      gettingStarted: 'Getting Started',
      introduction: 'Introduction',
      quickStart: 'Quick Start',
      installation: 'Installation',
      coreConcepts: 'Core Concepts',
      apiReference: 'API Reference',
      overview: 'Overview',
      endpoints: 'Endpoints',
      errorHandling: 'Error Handling',
      examples: 'Examples',
      scienceQuery: 'Science Query',
      mathQuery: 'Math Query',
      keyFeatures: 'Key Features',
      multiModelEnsemble: 'Multi-Model Ensemble: 5-12 LLMs analyze each query in parallel',
      automatedArbitration: 'Automated Arbitration: Intelligent ranking and quality assessment',
      consensusSynthesis: 'Consensus Synthesis: Combines top answers into unified response',
      stabilityMetrics: 'Stability Metrics: Wilson CI 95% confidence intervals',
      requirements: 'Requirements',
      dockerInstallation: 'Docker Installation',
      manualInstallation: 'Manual Installation',
      availableModels: 'Available Models',
      domainPools: 'Domain Pools',
      baseUrl: 'Base URL',
      checkApiHealth: 'Check API health status',
      getDashboardStats: 'Get dashboard statistics',
      getRecentEvents: 'Get recent events',
      getModelStats: 'Get model performance statistics',
      response: 'Response',
      queryParams: 'Query params',
      pythonLibrary: 'Python Library Usage',
      reportIssue: 'Report Issue'
    },

    // Footer
    footer: {
      description: 'Enterprise-grade decision making through LLM ensemble, arbitration, and consensus.',
      product: 'Product',
      resources: 'Resources',
      apiReference: 'API Reference',
      contact: 'Contact',
      support: 'Support',
      copyright: '© 2025 ERA DAL. All rights reserved. Built by Eugene Kundrotas.'
    },

    // Common
    common: {
      science: 'Science',
      mathematics: 'Mathematics',
      medical: 'Medical',
      economics: 'Economics',
      consensusTop2: 'Consensus Top-2',
      consensusTop3: 'Consensus Top-3',
      hardSelect: 'Hard Select',
      english: 'English',
      russian: 'Russian',
      stable: 'stable',
      excellent: 'Excellent',
      improved: 'improved'
    }
  },

  ru: {
    // Navigation
    nav: {
      features: 'Функции',
      howItWorks: 'Как это работает',
      pricing: 'Цены',
      docs: 'Документация',
      dashboard: 'Панель управления',
      tryNow: 'Попробовать',
      profile: 'Профиль',
      settings: 'Настройки',
      history: 'История',
      playground: 'Песочница',
      logout: 'Выход'
    },

    // Landing Page
    landing: {
      badge: 'v1.2.0 Выпущен — Доступны обновления Level 2',
      heroTitle1: 'Корпоративный ИИ',
      heroTitle2: 'Принятие Решений',
      heroDesc: 'Получайте <span class="text-white font-semibold">стабильные, воспроизводимые и количественные</span> ответы через ансамбль LLM, арбитраж, синтез консенсуса и самокритику. Создан для научных, медицинских, юридических и финансовых приложений.',
      tryPlayground: 'Попробовать',
      viewGitHub: 'Смотреть на GitHub',
      testsPassing: 'Тестов пройдено',
      modules: 'Модулей',
      wilsonCI: 'Wilson CI',
      
      // Problem Section
      problemTitle: 'Проблема с ответами одной LLM',
      problemDesc: 'Текущие AI-решения страдают от критических проблем, делающих их ненадёжными для корпоративного использования.',
      hallucinations: 'Галлюцинации',
      hallucinationsDesc: 'Одиночные модели уверенно выдают неверную информацию без возможности проверки.',
      inconsistency: 'Непоследовательность',
      inconsistencyDesc: 'Один вопрос — разные ответы каждый раз. Никаких гарантий воспроизводимости.',
      noConfidence: 'Нет метрик достоверности',
      noConfidenceDesc: 'Невозможно узнать, насколько надёжен ответ. Нулевое количественное доверие.',
      
      // Solution Section
      solutionTitle: 'Как ERA DAL решает это',
      solutionDesc: 'Многоуровневая архитектура, обеспечивающая надёжные, воспроизводимые и количественные ответы.',
      solverPool: 'Пул решателей',
      solverPoolDesc: '5-12 LLM моделей работают параллельно, каждая предоставляет независимый анализ.',
      arbiter: 'Арбитр-ранжировщик',
      arbiterDesc: 'Оценивает каждый ответ по логике, полноте, рискам и качеству.',
      consensus: 'Синтез консенсуса',
      consensusDesc: 'Объединяет Top-K ответов в единый высококачественный ответ.',
      rebuttal: 'Раунд опровержения',
      rebuttalDesc: 'Модели критикуют ответы друг друга, выявляя ошибки и улучшая качество.',
      stability: 'Анализ стабильности',
      stabilityDesc: 'Многократное тестирование с доверительными интервалами Wilson CI 95%.',
      modelMemory: 'Память моделей',
      modelMemoryDesc: 'Отслеживает надёжность моделей во времени для взвешенного консенсуса.',
      
      // How it Works
      howItWorksTitle: 'Как это работает',
      howItWorksDesc: 'От вопроса до уверенного ответа за 5 шагов',
      step1: 'Отправьте задачу',
      step1Desc: 'Введите вопрос и выберите домен (наука, математика, медицина, экономика)',
      step2: 'Пул решателей обрабатывает',
      step2Desc: '5-12 LLM моделей анализируют ваш вопрос параллельно',
      step3: 'Арбитр оценивает',
      step3Desc: 'Оценка качества, ранжирование и обнаружение разногласий',
      step4: 'Консенсус и опровержение',
      step4Desc: 'Синтез лучших ответов, опциональный раунд самокритики',
      step5: 'Проверка стабильности',
      step5Desc: 'Многократный анализ с доверительными интервалами Wilson CI',
      
      // Use Cases
      useCasesTitle: 'Сценарии использования',
      useCasesDesc: 'Доверие предприятий для критических решений',
      scientific: 'Научные исследования',
      scientificDesc: 'Проверка гипотез с количественными метриками надёжности',
      medical: 'Медицинская диагностика',
      medicalDesc: 'Второе мнение от ансамбля медицинских AI-моделей',
      legal: 'Юридический анализ',
      legalDesc: 'Анализ договоров с валидацией консенсуса',
      financial: 'Финансовое прогнозирование',
      financialDesc: 'Оценка рисков с доверительными интервалами',
      education: 'Образование',
      educationDesc: 'Автоматическая оценка с объяснением',
      moderation: 'Модерация контента',
      moderationDesc: 'Надёжная классификация с аудиторским следом',
      
      // Stats
      domainPools: 'Доменных пулов',
      
      // CTA
      ctaTitle: 'Готовы принимать лучшие решения?',
      ctaDesc: 'Начните использовать ERA DAL сегодня. Бесплатный тариф доступен.',
      getStarted: 'Начать бесплатно',
      readDocs: 'Читать документацию'
    },

    // Dashboard
    dashboard: {
      title: 'Панель управления',
      subtitle: 'Мониторинг производительности и использования ERA DAL',
      refresh: 'Обновить',
      newQuery: 'Новый запрос',
      totalProblems: 'Всего задач',
      totalRuns: 'Всего запусков',
      apiCallsToday: 'API вызовов сегодня',
      activeModels: 'Активных моделей',
      usageOverTime: 'Использование по времени',
      modelPerformance: 'Производительность моделей',
      recentActivity: 'Последняя активность',
      viewAll: 'Смотреть все',
      quickStats: 'Быстрая статистика',
      avgConfidence: 'Ср. достоверность',
      avgLatency: 'Ср. задержка',
      successRate: 'Успешность',
      topDomain: 'Топ домен',
      topModel: 'Топ модель',
      systemStatus: 'Статус системы',
      apiServer: 'API сервер',
      database: 'База данных',
      cacheLayer: 'Слой кэша',
      loading: 'Загрузка...',
      noActivity: 'Нет недавней активности'
    },

    // Profile
    profile: {
      title: 'Профиль',
      subtitle: 'Управление аккаунтом и личными настройками',
      editProfile: 'Редактировать',
      accountInfo: 'Информация об аккаунте',
      fullName: 'Полное имя',
      email: 'Email',
      company: 'Компания',
      location: 'Местоположение',
      saveChanges: 'Сохранить',
      apiKeys: 'API ключи',
      generateNew: 'Создать новый ключ',
      productionKey: 'Продакшн ключ',
      developmentKey: 'Dev ключ',
      active: 'Активен',
      revoke: 'Отозвать',
      copy: 'Копировать',
      securityWarning: 'Храните API ключи в безопасности',
      securityWarningDesc: 'Никогда не публикуйте API ключи и не коммитьте их в систему контроля версий.',
      subscription: 'Подписка',
      currentPlan: 'Текущий план',
      apiCalls: 'API вызовы',
      used: 'использовано',
      modelsAvailable: 'Доступно моделей',
      maxParallel: 'Макс. параллельно',
      unlimited: 'Без ограничений',
      prioritySupport: 'Приоритетная поддержка',
      upgradePlan: 'Улучшить план',
      billingHistory: 'История платежей',
      usageStats: 'Статистика использования',
      thisMonth: 'Этот месяц',
      totalAllTime: 'Всего за всё время',
      avgResponseTime: 'Ср. время ответа',
      dangerZone: 'Опасная зона',
      dangerZoneDesc: 'Эти действия необратимы. Будьте осторожны.',
      exportData: 'Экспорт данных',
      deleteAccount: 'Удалить аккаунт',
      memberSince: 'Участник с'
    },

    // Playground
    playground: {
      title: 'Песочница',
      subtitle: 'Тестируйте ERA DAL со своими запросами',
      yourQuestion: 'Ваш вопрос',
      placeholder: 'Введите ваш вопрос... например, "Какие доказательства существования тёмной материи?"',
      submit: 'Отправить',
      advancedSettings: 'Расширенные настройки',
      repeats: 'Повторов',
      consensusTopK: 'Консенсус Top-K',
      epsilon: 'Эпсилон',
      enableRebuttal: 'Включить опровержение',
      hardOnly: 'Только жёсткий выбор',
      solverPool: 'Пул решателей',
      ready: 'Готов',
      quickExamples: 'Быстрые примеры',
      darkMatter: 'Доказательства тёмной материи',
      riemann: 'Гипотеза Римана',
      mrna: 'Механизм мРНК вакцин',
      inflation: 'Причины инфляции',
      finalAnswer: 'Финальный ответ',
      confidence: 'Достоверность',
      majorityRate: 'Показатель большинства',
      latency: 'Задержка',
      modelsUsed: 'Использовано моделей',
      modelResponses: 'Ответы отдельных моделей',
      processing: 'Обработка запроса...',
      initializingPool: 'Инициализация пула решателей...',
      copyResult: 'Скопировано!'
    },

    // History
    history: {
      title: 'История запросов',
      subtitle: 'Просмотр и анализ прошлых запросов',
      export: 'Экспорт',
      clear: 'Очистить',
      searchPlaceholder: 'Поиск запросов...',
      allDomains: 'Все домены',
      allStatus: 'Все статусы',
      success: 'Успех',
      partial: 'Частично',
      failed: 'Ошибка',
      last7Days: 'Последние 7 дней',
      last30Days: 'Последние 30 дней',
      last90Days: 'Последние 90 дней',
      allTime: 'За всё время',
      showing: 'Показано',
      of: 'из',
      queries: 'запросов',
      hoursAgo: 'часов назад',
      yesterday: 'Вчера',
      daysAgo: 'дней назад',
      queryDetails: 'Детали запроса',
      query: 'Запрос',
      rerunQuery: 'Повторить запрос',
      modelRankings: 'Рейтинг моделей',
      runs: 'запусков',
      models: 'моделей'
    },

    // Settings
    settings: {
      title: 'Настройки',
      subtitle: 'Настройте параметры ERA DAL',
      apiConfig: 'Конфигурация API',
      apiKey: 'API ключ OpenRouter',
      getApiKey: 'Получите API ключ на',
      baseUrl: 'Базовый URL API',
      solverTimeout: 'Таймаут решателя (сек)',
      arbiterTimeout: 'Таймаут арбитра (сек)',
      test: 'Тест',
      defaultSettings: 'Настройки по умолчанию',
      defaultDomain: 'Домен по умолчанию',
      defaultMode: 'Режим по умолчанию',
      defaultRepeats: 'Повторов по умолчанию',
      rebuttalByDefault: 'Опровержение по умолчанию',
      rebuttalDesc: 'Модели будут критиковать ответы друг друга',
      hardOnlyDefault: 'Только жёсткий выбор',
      hardOnlyDesc: 'Использовать только режим жёсткого выбора',
      modelPreferences: 'Настройки моделей',
      notifications: 'Уведомления',
      emailNotifications: 'Email уведомления',
      emailDesc: 'Получать обновления о запросах',
      usageAlerts: 'Оповещения об использовании',
      usageAlertsDesc: 'Уведомления при приближении к лимитам',
      weeklyReports: 'Еженедельные отчёты',
      weeklyReportsDesc: 'Получать еженедельные сводки использования',
      marketingEmails: 'Маркетинговые рассылки',
      marketingDesc: 'Новости о функциях и обновлениях',
      appearance: 'Внешний вид',
      theme: 'Тема',
      dark: 'Тёмная',
      light: 'Светлая',
      comingSoon: 'Скоро',
      language: 'Язык',
      resetDefaults: 'Сбросить настройки',
      saveSettings: 'Сохранить настройки'
    },

    // Pricing
    pricing: {
      title: 'Простые и <span class="gradient-text">прозрачные</span> цены',
      subtitle: 'Начните бесплатно, масштабируйтесь по мере роста. Никаких скрытых платежей.',
      monthly: 'Месяц',
      yearly: 'Год',
      save20: 'Скидка 20%',
      free: 'Бесплатный',
      freeDesc: 'Идеально для знакомства с ERA DAL',
      pro: 'Pro',
      proDesc: 'Для профессионалов и небольших команд',
      enterprise: 'Enterprise',
      enterpriseDesc: 'Для крупных организаций',
      custom: 'Индивидуально',
      month: '/месяц',
      billedYearly: '/мес (оплата за год)',
      apiCallsMonth: 'API вызовов/месяц',
      modelsPerQuery: 'моделей на запрос',
      domainOnly: 'только домен',
      allDomains: 'Все 4 домена',
      customDomains: 'Кастомные домены',
      basicStability: 'Базовые метрики стабильности',
      fullStability: 'Полный анализ стабильности',
      noRebuttal: 'Без раундов опровержения',
      rebuttalRounds: 'Раунды опровержения',
      noPriority: 'Без приоритетной поддержки',
      prioritySupport: 'Приоритетная поддержка',
      customModels: 'Кастомные пулы моделей',
      selfHosted: 'Возможность self-hosted',
      slaGuarantee: 'Гарантия SLA',
      dedicatedSupport: 'Выделенная поддержка',
      getStartedFree: 'Начать бесплатно',
      startProTrial: 'Попробовать Pro',
      contactSales: 'Связаться с отделом продаж',
      comparePlans: 'Сравнение планов',
      feature: 'Функция',
      faq: 'Часто задаваемые вопросы',
      faqApiCall: 'Что считается API вызовом?',
      faqApiCallAnswer: 'Каждая отправка запроса считается одним API вызовом, независимо от количества используемых моделей. Многократные запуски для анализа стабильности не увеличивают счётчик API вызовов.',
      faqUpgrade: 'Можно ли изменить тариф в любое время?',
      faqUpgradeAnswer: 'Да! Вы можете повысить или понизить тариф в любое время. При повышении взимается пропорциональная разница. При понижении изменение вступает в силу в следующем платёжном цикле.',
      faqRefund: 'Есть ли возврат средств?',
      faqRefundAnswer: 'Мы предлагаем 14-дневную гарантию возврата денег для всех платных планов. Если вы не удовлетворены, свяжитесь с нами в течение 14 дней для полного возврата.',
      faqExceed: 'Что происходит при превышении лимита API?',
      faqExceedAnswer: 'Вы получите уведомление при 80% использования. При превышении лимита вы можете повысить тариф или приобрести дополнительные вызовы. Мы не отключим доступ без предупреждения.',
      faqSecurity: 'Безопасны ли мои данные?',
      faqSecurityAnswer: 'Да. Мы используем отраслевое стандартное шифрование для всех данных при передаче и хранении. Ваши запросы обрабатываются через защищённые API и не хранятся дольше необходимого.',
      readyToStart: 'Готовы начать?',
      joinThousands: 'Присоединяйтесь к тысячам профессионалов, принимающих лучшие решения с ERA DAL.',
      talkToSales: 'Связаться с отделом продаж'
    },

    // Docs
    docs: {
      title: 'Документация ERA DAL',
      subtitle: 'Узнайте, как использовать ERA DAL - справочник API, примеры и руководства.',
      gettingStarted: 'Начало работы',
      introduction: 'Введение',
      quickStart: 'Быстрый старт',
      installation: 'Установка',
      coreConcepts: 'Основные концепции',
      apiReference: 'Справочник API',
      overview: 'Обзор',
      endpoints: 'Эндпоинты',
      errorHandling: 'Обработка ошибок',
      examples: 'Примеры',
      scienceQuery: 'Научный запрос',
      mathQuery: 'Математический запрос',
      keyFeatures: 'Ключевые особенности',
      multiModelEnsemble: 'Мульти-модельный ансамбль: 5-12 LLM анализируют каждый запрос параллельно',
      automatedArbitration: 'Автоматический арбитраж: интеллектуальное ранжирование и оценка качества',
      consensusSynthesis: 'Синтез консенсуса: объединяет лучшие ответы в единый ответ',
      stabilityMetrics: 'Метрики стабильности: доверительные интервалы Wilson CI 95%',
      requirements: 'Требования',
      dockerInstallation: 'Установка Docker',
      manualInstallation: 'Ручная установка',
      availableModels: 'Доступные модели',
      domainPools: 'Доменные пулы',
      baseUrl: 'Базовый URL',
      checkApiHealth: 'Проверка здоровья API',
      getDashboardStats: 'Получение статистики дашборда',
      getRecentEvents: 'Получение последних событий',
      getModelStats: 'Получение статистики моделей',
      response: 'Ответ',
      queryParams: 'Параметры запроса',
      pythonLibrary: 'Использование Python библиотеки',
      reportIssue: 'Сообщить о проблеме'
    },

    // Footer
    footer: {
      description: 'Корпоративное принятие решений через ансамбль LLM, арбитраж и консенсус.',
      product: 'Продукт',
      resources: 'Ресурсы',
      apiReference: 'Справочник API',
      contact: 'Контакты',
      support: 'Поддержка',
      copyright: '© 2025 ERA DAL. Все права защищены. Создано Eugene Kundrotas.'
    },

    // Common
    common: {
      science: 'Наука',
      mathematics: 'Математика',
      medical: 'Медицина',
      economics: 'Экономика',
      consensusTop2: 'Консенсус Top-2',
      consensusTop3: 'Консенсус Top-3',
      hardSelect: 'Жёсткий выбор',
      english: 'Английский',
      russian: 'Русский',
      stable: 'стабильно',
      excellent: 'Отлично',
      improved: 'улучшено'
    }
  }
}

// Helper function to get translation
export function t(lang: Language, path: string): string {
  const keys = path.split('.')
  let result: any = translations[lang]
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key]
    } else {
      // Fallback to English
      result = translations.en
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k]
        } else {
          return path // Return path if not found
        }
      }
      return result
    }
  }
  
  return result
}

// Generate i18n script for client-side
export const i18nClientScript = `
<script>
  // i18n Client-side language management
  const translations = ${JSON.stringify(translations)};
  
  function getLang() {
    return localStorage.getItem('era-dal-lang') || 'en';
  }
  
  function setLang(lang) {
    localStorage.setItem('era-dal-lang', lang);
    location.reload();
  }
  
  function t(path) {
    const lang = getLang();
    const keys = path.split('.');
    let result = translations[lang];
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        result = translations.en;
        for (const k of keys) {
          if (result && typeof result === 'object' && k in result) {
            result = result[k];
          } else {
            return path;
          }
        }
        return result;
      }
    }
    return result;
  }
  
  // Update page title
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize language selector if exists
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
      langSelector.value = getLang();
    }
  });
</script>
`
