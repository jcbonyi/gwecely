import type { VercelRequest } from '@vercel/node';
import { parseAutomationBodyText } from '../../shared/automation-body.js';

function requestContentType(req: VercelRequest): string {
  const raw = req.headers['content-type'];
  return typeof raw === 'string' ? raw : 'application/json';
}

export function readBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer | string) => {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export async function readJsonBody<T>(req: VercelRequest): Promise<T> {
  const buf = await readBody(req);
  if (buf.length === 0) return {} as T;
  return JSON.parse(buf.toString('utf8')) as T;
}

export async function readAutomationBody<T extends Record<string, unknown>>(
  req: VercelRequest
): Promise<T> {
  const buf = await readBody(req);
  if (buf.length === 0) return {} as T;
  return parseAutomationBodyText(buf.toString('utf8'), requestContentType(req)) as T;
}
