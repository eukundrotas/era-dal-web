-- ERA DAL Meta-Orchestrator: core schema migration
-- Apply with: wrangler d1 execute era-dal --file=migrations/001_core.sql
-- Local dev:  wrangler d1 execute era-dal --local --file=migrations/001_core.sql

-- ─── Knowledge Bases ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS knowledge_bases (
  id                TEXT PRIMARY KEY,
  name              TEXT NOT NULL,
  description       TEXT NOT NULL DEFAULT '',
  document_count    INTEGER NOT NULL DEFAULT 0,
  chunk_count       INTEGER NOT NULL DEFAULT 0,
  embedding_model   TEXT NOT NULL DEFAULT 'text-embedding-3-small',
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Agents ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS agents (
  id                   TEXT PRIMARY KEY,
  role                 TEXT NOT NULL,
  name_en              TEXT NOT NULL,
  name_ru              TEXT NOT NULL,
  instructions         TEXT NOT NULL DEFAULT '',
  tools                TEXT NOT NULL DEFAULT '[]',   -- JSON: AgentTool[]
  thinking_mode        TEXT NOT NULL DEFAULT 'standard',
  knowledge_base_ids   TEXT NOT NULL DEFAULT '[]',   -- JSON: string[]
  output_format        TEXT NOT NULL DEFAULT 'text', -- text|json|markdown|table
  max_tokens           INTEGER NOT NULL DEFAULT 2048,
  temperature          REAL NOT NULL DEFAULT 0.7,
  created_at           TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at           TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Scenarios ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS scenarios (
  id                        TEXT PRIMARY KEY,
  name                      TEXT NOT NULL,
  description               TEXT NOT NULL DEFAULT '',
  category                  TEXT NOT NULL DEFAULT 'custom',
  strategy                  TEXT NOT NULL DEFAULT 'PLANNER',
  estimated_total_seconds   INTEGER NOT NULL DEFAULT 0,
  estimated_total_cost_usd  REAL NOT NULL DEFAULT 0,
  run_count                 INTEGER NOT NULL DEFAULT 0,
  created_at                TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at                TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS scenario_steps (
  id                     TEXT PRIMARY KEY,
  scenario_id            TEXT NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  order_index            INTEGER NOT NULL,
  agent_id               TEXT REFERENCES agents(id),
  agent_role             TEXT NOT NULL,
  action                 TEXT NOT NULL,
  input_from_step_id     TEXT,
  autonomy_level         TEXT NOT NULL DEFAULT 'SAFE',
  thinking_mode_override TEXT,
  estimated_seconds      INTEGER NOT NULL DEFAULT 30,
  estimated_cost_usd     REAL NOT NULL DEFAULT 0
);

-- ─── Meta Plans ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS meta_plans (
  id                   TEXT PRIMARY KEY,
  user_id              TEXT NOT NULL DEFAULT 'default',
  user_prompt          TEXT NOT NULL,
  status               TEXT NOT NULL DEFAULT 'draft',
  strategy             TEXT NOT NULL,
  global_thinking_mode TEXT NOT NULL DEFAULT 'standard',
  estimated_cost_usd   REAL NOT NULL DEFAULT 0,
  actual_cost_usd      REAL,
  estimated_seconds    INTEGER NOT NULL DEFAULT 0,
  actual_seconds       INTEGER,
  schema_version       INTEGER NOT NULL DEFAULT 1,
  result_summary       TEXT,
  created_at           TEXT NOT NULL DEFAULT (datetime('now')),
  started_at           TEXT,
  completed_at         TEXT
);

CREATE TABLE IF NOT EXISTS meta_plan_steps (
  id              TEXT PRIMARY KEY,
  plan_id         TEXT NOT NULL REFERENCES meta_plans(id) ON DELETE CASCADE,
  order_index     INTEGER NOT NULL,
  agent_id        TEXT,
  agent_role      TEXT NOT NULL,
  action          TEXT NOT NULL,
  autonomy_level  TEXT NOT NULL DEFAULT 'SAFE',
  thinking_mode   TEXT NOT NULL DEFAULT 'standard',
  status          TEXT NOT NULL DEFAULT 'pending',
  input_data      TEXT,
  output_data     TEXT,
  started_at      TEXT,
  completed_at    TEXT,
  cost_usd        REAL,
  error_message   TEXT
);

-- ─── Action Logs ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS action_logs (
  id             TEXT PRIMARY KEY,
  plan_id        TEXT REFERENCES meta_plans(id),
  scenario_id    TEXT REFERENCES scenarios(id),
  agent_id       TEXT NOT NULL,
  agent_role     TEXT NOT NULL,
  action         TEXT NOT NULL,
  autonomy_level TEXT NOT NULL DEFAULT 'SAFE',
  status         TEXT NOT NULL DEFAULT 'success',
  input_data     TEXT,
  output_data    TEXT,
  error_message  TEXT,
  cost_usd       REAL NOT NULL DEFAULT 0,
  duration_ms    INTEGER NOT NULL DEFAULT 0,
  model_id       TEXT,
  thinking_mode  TEXT NOT NULL DEFAULT 'standard',
  confirmed_by   TEXT,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at   TEXT
);

-- ─── Indexes ───────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_agents_role            ON agents(role);
CREATE INDEX IF NOT EXISTS idx_meta_plans_user        ON meta_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_meta_plans_status      ON meta_plans(status);
CREATE INDEX IF NOT EXISTS idx_meta_plans_created     ON meta_plans(created_at);
CREATE INDEX IF NOT EXISTS idx_meta_plan_steps_plan   ON meta_plan_steps(plan_id);
CREATE INDEX IF NOT EXISTS idx_meta_plan_steps_status ON meta_plan_steps(status);
CREATE INDEX IF NOT EXISTS idx_action_logs_plan       ON action_logs(plan_id);
CREATE INDEX IF NOT EXISTS idx_action_logs_agent      ON action_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_action_logs_created    ON action_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_action_logs_status     ON action_logs(status);
CREATE INDEX IF NOT EXISTS idx_scenario_steps_scen    ON scenario_steps(scenario_id);
