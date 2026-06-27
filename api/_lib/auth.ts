import { createClerkClient, verifyToken } from '@clerk/backend';
import type { VercelRequest } from '@vercel/node';
import type { AdminRole } from '../../shared/admin.js';
import { tursoEnabled } from '../../server/turso-config.js';
import { bootstrapOwnerEmails, ensureAdminUsersReady, resolveAdminRole } from '../../server/turso-admin-users.js';

export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

export interface AdminContext {
  email: string;
  userId: string;
  role: AdminRole;
}

async function verifyClerkUser(req: VercelRequest): Promise<{ email: string; userId: string }> {
  const secret = process.env.CLERK_SECRET_KEY;
  if (!secret) {
    throw new HttpError('CLERK_SECRET_KEY is not configured', 503);
  }

  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    throw new HttpError('Unauthorized', 401);
  }

  const token = header.slice(7);
  let payload: Awaited<ReturnType<typeof verifyToken>>;
  try {
    payload = await verifyToken(token, { secretKey: secret });
  } catch {
    throw new HttpError('Unauthorized', 401);
  }
  if (!payload.sub) {
    throw new HttpError('Unauthorized', 401);
  }

  const clerk = createClerkClient({ secretKey: secret });
  const user = await clerk.users.getUser(payload.sub);
  const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;

  if (!email) {
    throw new HttpError('No email on account', 403);
  }

  return { email, userId: payload.sub };
}

export async function requireAdmin(req: VercelRequest): Promise<AdminContext> {
  const { email, userId } = await verifyClerkUser(req);
  const lower = email.toLowerCase();
  const owners = bootstrapOwnerEmails();

  if (owners.length === 0) {
    throw new HttpError('Admin access not configured. Set CLERK_ADMIN_EMAILS on Vercel, then redeploy.', 503);
  }

  if (owners.includes(lower)) {
    return { email, userId, role: 'owner' };
  }

  if (!tursoEnabled()) {
    throw new HttpError(
      'You are not authorized to manage the catalog. Ask a site owner to add your email to CLERK_ADMIN_EMAILS on Vercel.',
      403
    );
  }

  await ensureAdminUsersReady();
  const role = await resolveAdminRole(email);
  if (!role) {
    throw new HttpError('You are not authorized to manage the catalog', 403);
  }
  return { email, userId, role };
}

export async function requireOwner(req: VercelRequest): Promise<AdminContext> {
  const admin = await requireAdmin(req);
  if (admin.role !== 'owner') {
    throw new HttpError('Only site owners can manage team access', 403);
  }
  return admin;
}

export function clerkClient() {
  const secret = process.env.CLERK_SECRET_KEY;
  if (!secret) throw new HttpError('CLERK_SECRET_KEY is not configured', 503);
  return createClerkClient({ secretKey: secret });
}
