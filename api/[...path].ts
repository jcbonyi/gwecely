import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleTursoApi } from './_lib/turso-routes.js';
import { readBody } from './_lib/http.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function proxyToRender(req: VercelRequest, res: VercelResponse, path: string) {
  const apiBase = process.env.API_URL?.replace(/\/+$/, '');
  if (!apiBase) {
    res.status(503).json({
      error:
        'Database not configured. Add TURSO_DATABASE_URL + TURSO_AUTH_TOKEN on Vercel (recommended), or API_URL for Render.',
    });
    return;
  }

  const queryIndex = req.url?.indexOf('?') ?? -1;
  const query = queryIndex >= 0 ? req.url!.slice(queryIndex) : '';
  const target = `${apiBase}/api/${path}${query}`;

  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (!value || key === 'host' || key === 'connection') continue;
    headers[key] = Array.isArray(value) ? value.join(', ') : value;
  }

  const method = req.method ?? 'GET';
  const body = method !== 'GET' && method !== 'HEAD' ? await readBody(req) : undefined;

  const upstream = await fetch(target, { method, headers, body });

  res.status(upstream.status);
  upstream.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'transfer-encoding') return;
    res.setHeader(key, value);
  });

  const buffer = Buffer.from(await upstream.arrayBuffer());
  res.send(buffer);
}

/** Vercel API — Turso edge DB (fast) or fallback proxy to Render */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const segments = req.query.path;
  const path = Array.isArray(segments) ? segments.join('/') : (segments ?? '');
  const method = req.method ?? 'GET';

  const handled = await handleTursoApi(req, res, path, method);
  if (handled) return;

  await proxyToRender(req, res, path);
}
