import type { AdminRole, AdminUserRecord } from '../shared/admin.js';
import { tursoEnabled } from './turso-config.js';
import { getTursoClient } from './turso-db.js';

let adminUsersReady: Promise<void> | null = null;

export function bootstrapOwnerEmails(): string[] {
  return (process.env.CLERK_ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function ensureAdminUsersReady(): Promise<void> {
  if (!tursoEnabled()) return;
  if (!adminUsersReady) {
    adminUsersReady = (async () => {
      await getTursoClient().execute(`
        CREATE TABLE IF NOT EXISTS admin_users (
          email TEXT PRIMARY KEY,
          role TEXT NOT NULL CHECK (role IN ('owner', 'editor')),
          invited_by TEXT,
          created_at TEXT NOT NULL
        )
      `);
    })();
  }
  await adminUsersReady;
}

export async function resolveAdminRole(email: string): Promise<AdminRole | null> {
  const lower = email.toLowerCase();
  if (bootstrapOwnerEmails().includes(lower)) return 'owner';
  if (!tursoEnabled()) return null;

  await ensureAdminUsersReady();
  const rs = await getTursoClient().execute({
    sql: 'SELECT role FROM admin_users WHERE email = ?',
    args: [lower],
  });
  const role = rs.rows[0]?.role;
  if (role === 'owner' || role === 'editor') return role;
  return null;
}

export async function listAdminUsers(): Promise<AdminUserRecord[]> {
  const owners = bootstrapOwnerEmails().map((email) => ({
    email,
    role: 'owner' as const,
    createdAt: '',
    source: 'env' as const,
  }));

  if (!tursoEnabled()) return owners;

  await ensureAdminUsersReady();
  const rs = await getTursoClient().execute(
    'SELECT email, role, invited_by, created_at FROM admin_users ORDER BY created_at ASC'
  );

  const envSet = new Set(owners.map((o) => o.email));
  const fromDb: AdminUserRecord[] = [];
  for (const row of rs.rows) {
    const email = String(row.email).toLowerCase();
    if (envSet.has(email)) continue;
    fromDb.push({
      email,
      role: String(row.role) as AdminRole,
      invitedBy: row.invited_by != null ? String(row.invited_by) : undefined,
      createdAt: String(row.created_at),
      source: 'database',
    });
  }

  return [...owners, ...fromDb];
}

export async function addAdminUser(
  email: string,
  role: AdminRole,
  invitedBy: string
): Promise<AdminUserRecord> {
  const lower = email.toLowerCase();
  if (bootstrapOwnerEmails().includes(lower)) {
    throw new Error('This email is already a site owner');
  }

  await ensureAdminUsersReady();
  const now = new Date().toISOString();
  await getTursoClient().execute({
    sql: `INSERT INTO admin_users (email, role, invited_by, created_at)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(email) DO UPDATE SET role = excluded.role`,
    args: [lower, role, invitedBy, now],
  });

  return { email: lower, role, invitedBy, createdAt: now, source: 'database' };
}

export async function removeAdminUser(email: string): Promise<boolean> {
  const lower = email.toLowerCase();
  if (bootstrapOwnerEmails().includes(lower)) {
    throw new Error('Cannot remove a site owner configured in CLERK_ADMIN_EMAILS');
  }

  if (!tursoEnabled()) return false;
  await ensureAdminUsersReady();
  const rs = await getTursoClient().execute({
    sql: 'DELETE FROM admin_users WHERE email = ?',
    args: [lower],
  });
  return rs.rowsAffected > 0;
}
