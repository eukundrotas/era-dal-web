-- ERA DAL: initial schema

CREATE TABLE IF NOT EXISTS contacts (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT '',
  company     TEXT NOT NULL DEFAULT '',
  phone       TEXT NOT NULL DEFAULT '',
  email       TEXT NOT NULL DEFAULT '',
  source      TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'new'
                   CHECK(status IN ('new','called','interested','meeting','client','declined','invalid')),
  tags        TEXT NOT NULL DEFAULT '',
  notes       TEXT NOT NULL DEFAULT '',
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contacts_status     ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_phone      ON contacts(phone);

-- Scraper jobs log
CREATE TABLE IF NOT EXISTS scraper_jobs (
  id          TEXT PRIMARY KEY,
  status      TEXT NOT NULL DEFAULT 'running',
  urls_total  INTEGER NOT NULL DEFAULT 0,
  urls_done   INTEGER NOT NULL DEFAULT 0,
  config_json TEXT NOT NULL DEFAULT '{}',
  log_json    TEXT NOT NULL DEFAULT '[]',
  results_json TEXT NOT NULL DEFAULT '[]',
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON scraper_jobs(created_at DESC);
