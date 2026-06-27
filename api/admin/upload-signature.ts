import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUploadSignature } from '../../_lib/handlers.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return getUploadSignature(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}
