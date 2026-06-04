// Cloudflare D1 database helpers

export type D1DB = D1Database

// Generate a UUID-like ID without crypto.randomUUID (CF Workers compatible)
export function newId(prefix: string): string {
  const ts = Date.now().toString(36)
  const rand = Math.random().toString(36).slice(2, 10)
  return `${prefix}_${ts}${rand}`
}

export function now(): string {
  return new Date().toISOString()
}

// Parse JSON stored as TEXT, return fallback on failure
export function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback
  try { return JSON.parse(value) as T } catch { return fallback }
}

// D1 query helpers — thin wrappers that keep the call-site clean

export async function dbFirst<T>(
  db: D1DB,
  sql: string,
  ...bindings: unknown[]
): Promise<T | null> {
  return db.prepare(sql).bind(...bindings).first<T>() ?? null
}

export async function dbAll<T>(
  db: D1DB,
  sql: string,
  ...bindings: unknown[]
): Promise<T[]> {
  const res = await db.prepare(sql).bind(...bindings).all<T>()
  return res.results ?? []
}

export async function dbRun(
  db: D1DB,
  sql: string,
  ...bindings: unknown[]
): Promise<D1Result> {
  return db.prepare(sql).bind(...bindings).run()
}

// Error shape for API responses
export interface DbError {
  code: string
  message: string
}

export function dbErr(code: string, message: string): DbError {
  return { code, message }
}
