import { clerkClient, getAuth, requireAuth } from '@clerk/express';
import type { NextFunction, Request, Response } from 'express';
import { tursoEnabled } from '../turso-config.js';
import { bootstrapOwnerEmails } from '../../shared/admin-emails.js';
import type { AdminRole } from '../../shared/admin.js';

declare global {
  namespace Express {
    interface Locals {
      adminEmail?: string;
      adminRole?: AdminRole;
    }
  }
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await clerkClient.users.getUser(auth.userId);
    const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;

    if (!email) {
      return res.status(403).json({ error: 'No email on account' });
    }

    const lower = email.toLowerCase();
    if (bootstrapOwnerEmails().includes(lower)) {
      res.locals.adminEmail = email;
      res.locals.adminRole = 'owner';
      return next();
    }

    if (!tursoEnabled()) {
      return res.status(403).json({ error: 'You are not authorized to manage the catalog' });
    }

    const { ensureAdminUsersReady, resolveAdminRole } = await import('../turso-admin-users.js');
    await ensureAdminUsersReady();
    const role = await resolveAdminRole(email);
    if (!role) {
      return res.status(403).json({ error: 'You are not authorized to manage the catalog' });
    }

    res.locals.adminEmail = email;
    res.locals.adminRole = role;
    next();
  } catch (e) {
    console.error('[auth]', e);
    res.status(500).json({ error: 'Authentication error' });
  }
}

export function requireOwner(req: Request, res: Response, next: NextFunction) {
  if (res.locals.adminRole !== 'owner') {
    return res.status(403).json({ error: 'Only site owners can manage team access' });
  }
  next();
}

export const adminAuth = [requireAuth(), requireAdmin] as const;
export const ownerAuth = [requireAuth(), requireAdmin, requireOwner] as const;
