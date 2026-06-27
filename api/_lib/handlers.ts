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
import { requireAutomationKey, automationActor } from './automation-auth.js';
import { cloudinarySignature } from './cloudinary.js';
import { readAutomationBody, readJsonBody } from './http.js';
import { SHOP_CATEGORIES } from '../../shared/product.js';

const VALID_CATEGORIES = new Set(SHOP_CATEGORIES.map((c) => c.id));

function validateProductInput(body: ProductInput): string | null {
  if (!body.name?.trim()) return 'name is required';
  if (!body.category?.trim()) return 'category is required';
  if (!VALID_CATEGORIES.has(body.category)) {
    return `category must be one of: ${[...VALID_CATEGORIES].join(', ')}`;
  }
  if (body.price == null || Number.isNaN(Number(body.price))) return 'price is required';
  if (!body.image?.trim()) return 'image is required';
  if (!body.description?.trim()) return 'description is required';
  return null;
}

function normalizeCreateInput(body: ProductInput): ProductInput {
  return {
    ...body,
    price: Number(body.price),
    originalPrice: body.originalPrice != null ? Number(body.originalPrice) : null,
    rating: body.rating != null ? Number(body.rating) : 4.5,
    reviews: body.reviews != null ? Number(body.reviews) : 0,
  };
}

function normalizeUpdateInput(body: Partial<ProductInput>): Partial<ProductInput> {
  if (body.category && !VALID_CATEGORIES.has(body.category)) {
    throw new HttpError(
      `category must be one of: ${[...VALID_CATEGORIES].join(', ')}`,
      400
    );
  }
  return {
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
  };
}

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
    const validationError = validateProductInput(body);
    if (validationError) {
      res.status(400).json({ error: validationError });
      return;
    }
    const product = await createProductTurso(normalizeCreateInput(body), admin.email);
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
    const product = await updateProductTurso(id, normalizeUpdateInput(body), admin.email);
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

// --- Automation API (Zapier / Make / n8n) — AUTOMATION_API_KEY ---

export async function listAutomationProducts(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    requireAutomationKey(req);
    res.status(200).json(await listProductsTurso());
  });
}

export async function createAutomationProduct(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    requireAutomationKey(req);
    const body = await readAutomationBody<ProductInput>(req);
    const validationError = validateProductInput(body);
    if (validationError) {
      const received = Object.keys(body as Record<string, unknown>);
      res.status(400).json({
        error: validationError,
        ...(received.length > 0 && !body.name
          ? {
              hint: `Received fields: ${received.join(', ')}. Add a top-level "name" field in Zapier Data (Payload Type: json).`,
            }
          : received.length === 0
            ? {
                hint:
                  'Empty request body. In Zapier Webhooks POST, set Payload Type to json and add name, category, price, image, description as separate Data rows.',
              }
            : {}),
      });
      return;
    }
    const product = await createProductTurso(normalizeCreateInput(body), automationActor());
    res.status(201).json(product);
  });
}

export async function getAutomationProduct(req: VercelRequest, res: VercelResponse, id: string) {
  await withTurso(req, res, async () => {
    requireAutomationKey(req);
    const product = await getProductByIdTurso(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  });
}

export async function updateAutomationProduct(req: VercelRequest, res: VercelResponse, id: string) {
  await withTurso(req, res, async () => {
    requireAutomationKey(req);
    const body = await readAutomationBody<Partial<ProductInput>>(req);
    const product = await updateProductTurso(id, normalizeUpdateInput(body), automationActor());
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  });
}

export async function deleteAutomationProduct(req: VercelRequest, res: VercelResponse, id: string) {
  await withTurso(req, res, async () => {
    requireAutomationKey(req);
    const ok = await deleteProductTurso(id);
    if (!ok) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({ ok: true });
  });
}
