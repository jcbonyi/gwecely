import { createClerkClient, verifyToken } from '@clerk/backend';
import type { VercelRequest } from '@vercel/node';

export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

function adminEmails(): string[] {
  return (process.env.CLERK_ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin(req: VercelRequest): Promise<{ email: string; userId: string }> {
  const secret = process.env.CLERK_SECRET_KEY;
  if (!secret) {
    throw new HttpError('CLERK_SECRET_KEY is not configured', 503);
  }

  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    throw new HttpError('Unauthorized', 401);
  }

  const token = header.slice(7);
  const payload = await verifyToken(token, { secretKey: secret });
  if (!payload.sub) {
    throw new HttpError('Unauthorized', 401);
  }

  const clerk = createClerkClient({ secretKey: secret });
  const user = await clerk.users.getUser(payload.sub);
  const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;

  if (!email) {
    throw new HttpError('No email on account', 403);
  }

  const allowed = adminEmails();
  if (allowed.length === 0) {
    throw new HttpError('Admin access not configured. Set CLERK_ADMIN_EMAILS.', 503);
  }

  if (!allowed.includes(email.toLowerCase())) {
    throw new HttpError('You are not authorized to manage the catalog', 403);
  }

  return { email, userId: payload.sub };
}
