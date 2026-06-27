import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { ProductInput } from '../../shared/product.js';
import {
  createProductTurso,
  deleteProductTurso,
  ensureTursoReady,
  getProductByIdTurso,
  listProductsTurso,
  tursoEnabled,
  updateProductTurso,
} from '../../server/turso-db.js';
import { requireAdmin, HttpError } from './auth.js';
import { cloudinarySignature } from './cloudinary.js';
import { readJsonBody } from './http.js';

export const apiBodyConfig = {
  api: {
    bodyParser: false as const,
  },
};

function notConfigured(res: VercelResponse) {
  res.status(503).json({
    error:
      'Database not configured. Add TURSO_DATABASE_URL + TURSO_AUTH_TOKEN on Vercel, then redeploy.',
  });
}

async function withTurso(
  req: VercelRequest,
  res: VercelResponse,
  fn: () => Promise<void>
) {
  if (!tursoEnabled()) {
    notConfigured(res);
    return;
  }
  try {
    await ensureTursoReady();
    await fn();
  } catch (e) {
    if (e instanceof HttpError) {
      res.status(e.status).json({ error: e.message });
      return;
    }
    console.error('[api]', e);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getPublicProducts(_req: VercelRequest, res: VercelResponse) {
  await withTurso(_req, res, async () => {
    res.status(200).json(await listProductsTurso());
  });
}

export async function getPublicProduct(req: VercelRequest, res: VercelResponse, id: string) {
  await withTurso(req, res, async () => {
    const product = await getProductByIdTurso(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  });
}

export async function listAdminProducts(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    await requireAdmin(req);
    res.status(200).json(await listProductsTurso());
  });
}

export async function createAdminProduct(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    const admin = await requireAdmin(req);
    const body = await readJsonBody<ProductInput>(req);
    if (!body.name?.trim() || !body.category || body.price == null || !body.image || !body.description?.trim()) {
      res.status(400).json({ error: 'name, category, price, image, and description are required' });
      return;
    }
    const product = await createProductTurso(
      {
        ...body,
        price: Number(body.price),
        originalPrice: body.originalPrice != null ? Number(body.originalPrice) : null,
        rating: body.rating != null ? Number(body.rating) : 4.5,
        reviews: body.reviews != null ? Number(body.reviews) : 0,
      },
      admin.email
    );
    res.status(201).json(product);
  });
}

export async function getAdminProduct(req: VercelRequest, res: VercelResponse, id: string) {
  await withTurso(req, res, async () => {
    await requireAdmin(req);
    const product = await getProductByIdTurso(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  });
}

export async function updateAdminProduct(req: VercelRequest, res: VercelResponse, id: string) {
  await withTurso(req, res, async () => {
    const admin = await requireAdmin(req);
    const body = await readJsonBody<Partial<ProductInput>>(req);
    const product = await updateProductTurso(
      id,
      {
        ...body,
        price: body.price != null ? Number(body.price) : undefined,
        originalPrice:
          body.originalPrice !== undefined
            ? body.originalPrice == null
              ? null
              : Number(body.originalPrice)
            : undefined,
        rating: body.rating != null ? Number(body.rating) : undefined,
        reviews: body.reviews != null ? Number(body.reviews) : undefined,
      },
      admin.email
    );
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  });
}

export async function deleteAdminProduct(req: VercelRequest, res: VercelResponse, id: string) {
  await withTurso(req, res, async () => {
    await requireAdmin(req);
    const ok = await deleteProductTurso(id);
    if (!ok) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({ ok: true });
  });
}

export async function getUploadSignature(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    await requireAdmin(req);
    const sig = cloudinarySignature();
    if (!sig) {
      res.status(503).json({
        error: 'Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.',
      });
      return;
    }
    res.status(200).json(sig);
  });
}
