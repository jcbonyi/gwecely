import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  apiBodyConfig,
  inviteAdminUser,
  listAdminUsersHandler,
  removeAdminUserHandler,
} from '../../_lib/handlers.js';

export const config = apiBodyConfig;

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return listAdminUsersHandler(req, res);
  if (req.method === 'POST') return inviteAdminUser(req, res);
  if (req.method === 'DELETE') return removeAdminUserHandler(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}
