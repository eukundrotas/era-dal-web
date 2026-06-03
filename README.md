# ERA DAL — Digital AI Layer

**Meta-Orchestrator Platform** — Цифровой диспетчер задач с мульти-агентным ИИ

Поставьте задачу на естественном языке → система разобьёт её на шаги, выберет AI-агентов, применит режим мышления и выполнит через цифровую команду.

---

## Быстрый старт (Quick Start)

### Windows

1. Скачать и распаковать ZIP
2. Двойной клик на **`start.bat`**
3. Открыть браузер: **http://localhost:8788**

### Linux / macOS

```bash
# Первый запуск (один раз):
./setup.sh

# Каждый запуск:
./start.sh
```

Или через npm:

```bash
npm run setup   # первый раз
npm run local   # каждый запуск
```

---

## Требования

| Что нужно | Версия |
|-----------|--------|
| **Node.js** | v18 или новее |
| **npm** | v8 или новее |
| Wrangler | устанавливается автоматически |

Скачать Node.js: https://nodejs.org

---

## Страницы приложения

| URL | Описание |
|-----|----------|
| `/meta` | **Мета-Оркестратор** — запуск задач |
| `/agents` | Управление AI-агентами |
| `/scenarios` | Готовые сценарии |
| `/journal` | Журнал действий |
| `/dashboard` | Дашборд и статистика |
| `/history` | История запусков |
| `/playground` | Тест-площадка LLM |

---

## OpenRouter API Key

ERA DAL использует OpenRouter как шлюз к 65+ LLM моделям.

1. Зарегистрироваться на https://openrouter.ai
2. Получить API ключ (Settings → Keys)
3. В ERA DAL нажать иконку шестерёнки в мета-оркестраторе и вставить ключ

Ключ хранится **только в браузере** (localStorage). На сервер не передаётся.

---

## Архитектура

```
ERA DAL
├── src/
│   ├── api/            — Hono API роуты
│   │   ├── meta.ts     — Мета-Оркестратор API
│   │   └── routes.ts   — Dashboard / History API
│   ├── lib/db/         — D1 DAL (Data Access Layer)
│   ├── pages/          — HTML-страницы (Server-Side Rendered)
│   └── types/          — TypeScript типы и ThinkingModes
├── migrations/
│   └── 001_core.sql    — Схема базы данных (D1/SQLite)
├── public/
│   ├── favicon.svg     — Иконка приложения
│   └── manifest.json   — PWA манифест
├── start.sh            — Запуск (Linux/macOS)
├── start.bat           — Запуск (Windows)
└── wrangler.jsonc      — Cloudflare конфигурация
```

**Стек:** Hono 4.11 · Cloudflare Pages/Workers · D1 (SQLite) · OpenRouter API · Tailwind CSS · Font Awesome

---

## Деплой в Cloudflare (Production)

```bash
# 1. Создать D1 базу данных
npx wrangler d1 create era-dal

# 2. Вставить database_id в wrangler.jsonc

# 3. Применить миграции
npx wrangler d1 execute era-dal --file=migrations/001_core.sql

# 4. Деплой
npm run deploy
```

---

## Сборка ZIP для раздачи

```bash
npm run package
# Создаст: era-dal-v1.0.0.zip
```

---

## Лицензия

MIT © 2025 ERA DAL
