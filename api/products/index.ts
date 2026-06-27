import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPublicProducts } from '../_lib/handlers.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return getPublicProducts(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}
