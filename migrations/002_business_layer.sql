-- ERA DAL Business Layer: tasks, projects, goals, regulations, company
-- Apply with: wrangler d1 execute era-dal --local --file=migrations/002_business_layer.sql

-- ─── Workspaces ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workspaces (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  color       TEXT NOT NULL DEFAULT '#4f46e5',
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Projects ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id             TEXT PRIMARY KEY,
  workspace_id   TEXT REFERENCES workspaces(id),
  name           TEXT NOT NULL,
  description    TEXT NOT NULL DEFAULT '',
  status         TEXT NOT NULL DEFAULT 'active',   -- active|on_hold|completed|archived
  color          TEXT NOT NULL DEFAULT '#3b82f6',
  budget_usd     REAL NOT NULL DEFAULT 0,
  spent_usd      REAL NOT NULL DEFAULT 0,
  due_date       TEXT,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Tasks ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id                  TEXT PRIMARY KEY,
  project_id          TEXT REFERENCES projects(id),
  title               TEXT NOT NULL,
  description         TEXT NOT NULL DEFAULT '',
  status              TEXT NOT NULL DEFAULT 'todo',   -- todo|in_progress|review|done|cancelled
  priority            TEXT NOT NULL DEFAULT 'medium', -- low|medium|high|critical
  assigned_agent_role TEXT,
  plan_id             TEXT REFERENCES meta_plans(id),
  due_date            TEXT,
  estimated_hours     REAL,
  actual_hours        REAL,
  tags                TEXT NOT NULL DEFAULT '[]',     -- JSON string[]
  created_at          TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Goals / OKR ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS goals (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  owner        TEXT NOT NULL DEFAULT 'Eugene',
  period       TEXT NOT NULL DEFAULT 'Q2-2025',    -- Q1-2025, Q2-2025, 2025, etc.
  status       TEXT NOT NULL DEFAULT 'on_track',  -- on_track|at_risk|achieved|missed
  progress     INTEGER NOT NULL DEFAULT 0,         -- 0-100
  project_id   TEXT REFERENCES projects(id),
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS goal_key_results (
  id          TEXT PRIMARY KEY,
  goal_id     TEXT NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  metric_type TEXT NOT NULL DEFAULT 'percent',     -- percent|number|boolean
  target      REAL NOT NULL DEFAULT 100,
  current     REAL NOT NULL DEFAULT 0,
  unit        TEXT NOT NULL DEFAULT '%',
  order_index INTEGER NOT NULL DEFAULT 0
);

-- ─── Regulations ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS regulations (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  content_md   TEXT NOT NULL DEFAULT '',           -- full regulation text in markdown
  target_roles TEXT NOT NULL DEFAULT '[]',         -- JSON: AgentRole[]
  category     TEXT NOT NULL DEFAULT 'general',   -- general|compliance|workflow|safety
  version      INTEGER NOT NULL DEFAULT 1,
  active       INTEGER NOT NULL DEFAULT 1,         -- 1=active, 0=draft
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Company Members ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS company_members (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL DEFAULT '',
  role_title    TEXT NOT NULL DEFAULT '',
  department_id TEXT,
  avatar_color  TEXT NOT NULL DEFAULT '#4f46e5',
  type          TEXT NOT NULL DEFAULT 'human',     -- human|digital
  agent_role    TEXT,                              -- if type='digital'
  skills        TEXT NOT NULL DEFAULT '[]',        -- JSON string[]
  active        INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Departments ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  head_id     TEXT REFERENCES company_members(id),
  parent_id   TEXT REFERENCES departments(id),
  color       TEXT NOT NULL DEFAULT '#4f46e5',
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Expenses ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS expenses (
  id          TEXT PRIMARY KEY,
  project_id  TEXT REFERENCES projects(id),
  category    TEXT NOT NULL DEFAULT 'ai_calls',  -- ai_calls|tools|infrastructure|manual
  description TEXT NOT NULL DEFAULT '',
  amount_usd  REAL NOT NULL DEFAULT 0,
  model_id    TEXT,
  plan_id     TEXT REFERENCES meta_plans(id),
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Indexes ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_tasks_project    ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status     ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority   ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_goals_period     ON goals(period);
CREATE INDEX IF NOT EXISTS idx_goals_status     ON goals(status);
CREATE INDEX IF NOT EXISTS idx_kr_goal          ON goal_key_results(goal_id);
CREATE INDEX IF NOT EXISTS idx_expenses_project ON expenses(project_id);
CREATE INDEX IF NOT EXISTS idx_expenses_created ON expenses(created_at);
CREATE INDEX IF NOT EXISTS idx_regs_active      ON regulations(active);
CREATE INDEX IF NOT EXISTS idx_members_dept     ON company_members(department_id);
CREATE INDEX IF NOT EXISTS idx_projects_status  ON projects(status);
