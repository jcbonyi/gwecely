import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPublicProduct } from '../_lib/handlers.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id as string | undefined;
  if (!id) return res.status(400).json({ error: 'Missing product id' });
  if (req.method === 'GET') return getPublicProduct(req, res, decodeURIComponent(id));
  return res.status(405).json({ error: 'Method not allowed' });
}
