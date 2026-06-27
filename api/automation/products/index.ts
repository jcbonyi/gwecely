import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  apiBodyConfig,
  createAutomationProduct,
  listAutomationProducts,
} from '../../_lib/handlers.js';

export const config = apiBodyConfig;

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return listAutomationProducts(req, res);
  if (req.method === 'POST') return createAutomationProduct(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}
