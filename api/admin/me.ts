import type { VercelRequest, VercelResponse } from '@vercel/node';
import { apiBodyConfig } from '../../_lib/api-config.js';
import { getAdminMe } from '../../_lib/admin-me.js';

export const config = apiBodyConfig;

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return getAdminMe(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}
