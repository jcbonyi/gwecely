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

function matchAdminProduct(path: string): { id?: string } | null {
  if (path === 'admin/products') return {};
  const m = path.match(/^admin\/products\/([^/]+)$/);
  return m ? { id: decodeURIComponent(m[1]) } : null;
}

export async function handleTursoApi(
  req: VercelRequest,
  res: VercelResponse,
  path: string,
  method: string
): Promise<boolean> {
  if (!tursoEnabled()) return false;

  await ensureTursoReady();

  try {
    if (path === 'products' && method === 'GET') {
      res.status(200).json(await listProductsTurso());
      return true;
    }

    const productIdMatch = path.match(/^products\/([^/]+)$/);
    if (productIdMatch && method === 'GET') {
      const product = await getProductByIdTurso(decodeURIComponent(productIdMatch[1]));
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return true;
      }
      res.status(200).json(product);
      return true;
    }

    const adminProduct = matchAdminProduct(path);
    if (adminProduct && method === 'GET' && !adminProduct.id) {
      await requireAdmin(req);
      res.status(200).json(await listProductsTurso());
      return true;
    }

    if (adminProduct && method === 'POST' && !adminProduct.id) {
      const admin = await requireAdmin(req);
      const body = await readJsonBody<ProductInput>(req);
      if (!body.name?.trim() || !body.category || body.price == null || !body.image || !body.description?.trim()) {
        res.status(400).json({ error: 'name, category, price, image, and description are required' });
        return true;
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
      return true;
    }

    if (adminProduct?.id && method === 'GET') {
      await requireAdmin(req);
      const product = await getProductByIdTurso(adminProduct.id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return true;
      }
      res.status(200).json(product);
      return true;
    }

    if (adminProduct?.id && method === 'PUT') {
      const admin = await requireAdmin(req);
      const body = await readJsonBody<Partial<ProductInput>>(req);
      const product = await updateProductTurso(
        adminProduct.id,
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
        return true;
      }
      res.status(200).json(product);
      return true;
    }

    if (adminProduct?.id && method === 'DELETE') {
      await requireAdmin(req);
      const ok = await deleteProductTurso(adminProduct.id);
      if (!ok) {
        res.status(404).json({ error: 'Product not found' });
        return true;
      }
      res.status(200).json({ ok: true });
      return true;
    }

    if (path === 'admin/upload-signature' && method === 'GET') {
      await requireAdmin(req);
      const sig = cloudinarySignature();
      if (!sig) {
        res.status(503).json({
          error: 'Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.',
        });
        return true;
      }
      res.status(200).json(sig);
      return true;
    }

  } catch (e) {
    if (e instanceof HttpError) {
      res.status(e.status).json({ error: e.message });
      return true;
    }
    console.error('[turso-api]', e);
    res.status(500).json({ error: 'Server error' });
    return true;
  }

  return false;
}
