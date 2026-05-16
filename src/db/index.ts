/**
 * Database abstraction layer.
 * Uses Cloudflare D1 when the DB binding is present (Cloudflare Pages / wrangler dev).
 * Falls back to an in-memory Map otherwise (plain local dev).
 */

export interface Contact {
  id: string
  name: string
  company: string
  phone: string
  email: string
  source: string
  status: 'new' | 'called' | 'interested' | 'meeting' | 'client' | 'declined' | 'invalid'
  tags: string
  notes: string
  createdAt: string
  updatedAt: string
}

// ── In-memory fallback store ───────────────────────────────────────────────
const mem = new Map<string, Contact>([
  ['c1', { id:'c1', name:'Алексей Морозов', company:'СтройМастер', phone:'+79161234567', email:'morozov@stroymaster.ru', source:'https://stroymaster.ru', status:'new', tags:'строительство,Москва', notes:'', createdAt:'2025-05-14T08:00:00Z', updatedAt:'2025-05-14T08:00:00Z' }],
  ['c2', { id:'c2', name:'Елена Соколова', company:'ДомРемонт', phone:'+79037654321', email:'info@domremont.ru', source:'https://domremont.ru', status:'called', tags:'ремонт,СПб', notes:'Перезвонить во вторник', createdAt:'2025-05-13T10:30:00Z', updatedAt:'2025-05-14T09:00:00Z' }],
  ['c3', { id:'c3', name:'Дмитрий Волков', company:'ПрофКровля', phone:'+79254445566', email:'d.volkov@profkrovlya.com', source:'https://profkrovlya.com', status:'interested', tags:'кровля,Екатеринбург', notes:'Интересует комплексное решение', createdAt:'2025-05-12T14:15:00Z', updatedAt:'2025-05-14T11:00:00Z' }],
  ['c4', { id:'c4', name:'Ирина Николаева', company:'', phone:'+79887776655', email:'', source:'https://windows-master.ru', status:'meeting', tags:'окна', notes:'Встреча 17 мая 14:00', createdAt:'2025-05-11T09:00:00Z', updatedAt:'2025-05-13T16:00:00Z' }],
  ['c5', { id:'c5', name:'Сергей Кузнецов', company:'АлюмТрейд', phone:'+79103332211', email:'s.kuznetsov@alumtrade.ru', source:'https://alumtrade.ru', status:'client', tags:'металл,Казань', notes:'Оплатил счёт 05-05', createdAt:'2025-05-10T11:00:00Z', updatedAt:'2025-05-12T10:00:00Z' }],
  ['c6', { id:'c6', name:'Татьяна Павлова', company:'МебельПлюс', phone:'+79652223344', email:'tpavlova@mebelplus.ru', source:'https://mebelplus.ru', status:'declined', tags:'мебель', notes:'Уже есть подрядчик', createdAt:'2025-05-09T15:00:00Z', updatedAt:'2025-05-10T09:00:00Z' }],
  ['c7', { id:'c7', name:'Андрей Громов', company:'ТехноСервис', phone:'+79311115566', email:'a.gromov@technoservice.ru', source:'https://technoservice.ru', status:'new', tags:'сервис,Новосибирск', notes:'', createdAt:'2025-05-14T07:00:00Z', updatedAt:'2025-05-14T07:00:00Z' }],
  ['c8', { id:'c8', name:'Ольга Федорова', company:'ЭкоДом', phone:'+79457778899', email:'', source:'https://ecodom-spb.ru', status:'called', tags:'эко,СПб', notes:'Занята, просила написать email', createdAt:'2025-05-13T13:00:00Z', updatedAt:'2025-05-14T08:30:00Z' }],
])

export function newId(): string {
  return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5)
}

// ── Row ↔ Contact conversion (D1 uses snake_case) ─────────────────────────
function rowToContact(row: Record<string, unknown>): Contact {
  return {
    id:        String(row.id ?? ''),
    name:      String(row.name ?? ''),
    company:   String(row.company ?? ''),
    phone:     String(row.phone ?? ''),
    email:     String(row.email ?? ''),
    source:    String(row.source ?? ''),
    status:    (row.status ?? 'new') as Contact['status'],
    tags:      String(row.tags ?? ''),
    notes:     String(row.notes ?? ''),
    createdAt: String(row.created_at ?? row.createdAt ?? ''),
    updatedAt: String(row.updated_at ?? row.updatedAt ?? ''),
  }
}

// ── Public API ─────────────────────────────────────────────────────────────

type DB = { prepare(q: string): { bind(...a: unknown[]): { all(): Promise<{results: unknown[]}>; first(): Promise<unknown>; run(): Promise<unknown> } } } | null | undefined

export async function listContacts(DB: DB, opts?: { status?: string; q?: string }): Promise<Contact[]> {
  if (DB) {
    const where: string[] = []
    const params: unknown[] = []
    if (opts?.status) { where.push('status = ?'); params.push(opts.status) }
    if (opts?.q) {
      where.push('(name LIKE ? OR phone LIKE ? OR email LIKE ? OR company LIKE ?)')
      const p = '%' + opts.q + '%'
      params.push(p, p, p, p)
    }
    const sql = 'SELECT * FROM contacts' + (where.length ? ' WHERE ' + where.join(' AND ') : '') + ' ORDER BY created_at DESC'
    const { results } = await DB.prepare(sql).bind(...params).all()
    return (results as Record<string, unknown>[]).map(rowToContact)
  }
  let list = Array.from(mem.values())
  if (opts?.status) list = list.filter(c => c.status === opts.status)
  if (opts?.q) {
    const q = opts.q.toLowerCase()
    list = list.filter(c => JSON.stringify([c.name, c.phone, c.email, c.company, c.tags]).toLowerCase().includes(q))
  }
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getContact(DB: DB, id: string): Promise<Contact | null> {
  if (DB) {
    const row = await DB.prepare('SELECT * FROM contacts WHERE id = ?').bind(id).first()
    return row ? rowToContact(row as Record<string, unknown>) : null
  }
  return mem.get(id) ?? null
}

export async function createContact(DB: DB, data: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
  const now = new Date().toISOString()
  const contact: Contact = { id: newId(), ...data, createdAt: now, updatedAt: now }
  if (DB) {
    await DB.prepare(
      'INSERT INTO contacts (id,name,company,phone,email,source,status,tags,notes,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    ).bind(contact.id, contact.name, contact.company, contact.phone, contact.email, contact.source, contact.status, contact.tags, contact.notes, now, now).run()
  } else {
    mem.set(contact.id, contact)
  }
  return contact
}

export async function updateContact(DB: DB, id: string, data: Partial<Omit<Contact, 'id' | 'createdAt'>>): Promise<Contact | null> {
  const existing = await getContact(DB, id)
  if (!existing) return null
  const now = new Date().toISOString()
  const updated: Contact = { ...existing, ...data, id, updatedAt: now }
  if (DB) {
    await DB.prepare(
      'UPDATE contacts SET name=?,company=?,phone=?,email=?,source=?,status=?,tags=?,notes=?,updated_at=? WHERE id=?'
    ).bind(updated.name, updated.company, updated.phone, updated.email, updated.source, updated.status, updated.tags, updated.notes, now, id).run()
  } else {
    mem.set(id, updated)
  }
  return updated
}

export async function deleteContact(DB: DB, id: string): Promise<boolean> {
  if (!(await getContact(DB, id))) return false
  if (DB) {
    await DB.prepare('DELETE FROM contacts WHERE id = ?').bind(id).run()
  } else {
    mem.delete(id)
  }
  return true
}

export async function importContacts(DB: DB, rows: Partial<Contact>[]): Promise<Contact[]> {
  const now = new Date().toISOString()
  const created: Contact[] = []
  for (const row of rows) {
    if (!row.phone && !row.email && !row.name) continue
    const c: Contact = {
      id: newId(), name: row.name ?? '', company: row.company ?? '',
      phone: row.phone ?? '', email: row.email ?? '', source: row.source ?? '',
      status: (row.status as Contact['status']) ?? 'new',
      tags: row.tags ?? '', notes: row.notes ?? '',
      createdAt: now, updatedAt: now,
    }
    if (DB) {
      await DB.prepare(
        'INSERT OR IGNORE INTO contacts (id,name,company,phone,email,source,status,tags,notes,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
      ).bind(c.id, c.name, c.company, c.phone, c.email, c.source, c.status, c.tags, c.notes, now, now).run()
    } else {
      mem.set(c.id, c)
    }
    created.push(c)
  }
  return created
}
