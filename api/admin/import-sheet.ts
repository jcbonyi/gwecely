import type { VercelRequest, VercelResponse } from '@vercel/node';
import { apiBodyConfig, importAdminGoogleSheet } from '../../_lib/handlers.js';

export const config = apiBodyConfig;

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') return importAdminGoogleSheet(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}
