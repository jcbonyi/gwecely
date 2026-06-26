import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false,
  },
};

function readBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer | string) => {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

/** Proxy /api/* on Vercel to the Express API (Render/Railway). Set API_URL in Vercel env. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiBase = process.env.API_URL?.replace(/\/+$/, '');
  if (!apiBase) {
    res.status(503).json({
      error: 'API_URL is not set on Vercel. Deploy the Express API and add API_URL=https://your-api-host',
    });
    return;
  }

  const segments = req.query.path;
  const path = Array.isArray(segments) ? segments.join('/') : (segments ?? '');
  const queryIndex = req.url?.indexOf('?') ?? -1;
  const query = queryIndex >= 0 ? req.url!.slice(queryIndex) : '';
  const target = `${apiBase}/api/${path}${query}`;

  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (!value || key === 'host' || key === 'connection') continue;
    headers[key] = Array.isArray(value) ? value.join(', ') : value;
  }

  const method = req.method ?? 'GET';
  const body =
    method !== 'GET' && method !== 'HEAD' ? await readBody(req) : undefined;

  const upstream = await fetch(target, { method, headers, body });

  res.status(upstream.status);
  upstream.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'transfer-encoding') return;
    res.setHeader(key, value);
  });

  const buffer = Buffer.from(await upstream.arrayBuffer());
  res.send(buffer);
}
