import { timingSafeEqual } from 'node:crypto';
import type { VercelRequest } from '@vercel/node';
import { HttpError } from './auth.js';

function readProvidedKey(req: VercelRequest): string | undefined {
  const fromHeader = req.headers['x-automation-key'];
  if (typeof fromHeader === 'string' && fromHeader.trim()) {
    return fromHeader.trim();
  }
  if (Array.isArray(fromHeader) && fromHeader[0]?.trim()) {
    return fromHeader[0].trim();
  }

  const auth = req.headers.authorization;
  const bearer = typeof auth === 'string' ? auth.match(/^Bearer\s+(.+)$/i)?.[1]?.trim() : undefined;
  return bearer || undefined;
}

function keysMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function requireAutomationKey(req: VercelRequest): void {
  const expected = process.env.AUTOMATION_API_KEY?.trim();
  if (!expected) {
    throw new HttpError('AUTOMATION_API_KEY is not configured on the server', 503);
  }

  const provided = readProvidedKey(req);
  if (!provided || !keysMatch(provided, expected)) {
    throw new HttpError('Invalid or missing automation API key', 401);
  }
}

export function automationActor(): string {
  return process.env.AUTOMATION_ACTOR_LABEL?.trim() || 'automation';
}
