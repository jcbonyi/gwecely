import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin, HttpError } from './auth.js';

export async function getAdminMe(req: VercelRequest, res: VercelResponse) {
  try {
    const admin = await requireAdmin(req);
    res.status(200).json({ email: admin.email, role: admin.role });
  } catch (e) {
    if (e instanceof HttpError) {
      res.status(e.status).json({ error: e.message });
      return;
    }
    console.error('[api] getAdminMe', e);
    res.status(500).json({ error: 'Server error' });
  }
}
