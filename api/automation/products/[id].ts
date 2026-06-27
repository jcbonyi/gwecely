import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  apiBodyConfig,
  deleteAutomationProduct,
  getAutomationProduct,
  updateAutomationProduct,
} from '../../_lib/handlers.js';

export const config = apiBodyConfig;

export default function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id as string | undefined;
  if (!id) return res.status(400).json({ error: 'Missing product id' });
  const productId = decodeURIComponent(id);

  if (req.method === 'GET') return getAutomationProduct(req, res, productId);
  if (req.method === 'PUT') return updateAutomationProduct(req, res, productId);
  if (req.method === 'DELETE') return deleteAutomationProduct(req, res, productId);
  return res.status(405).json({ error: 'Method not allowed' });
}
