import { Router } from 'express';
import { unwrapAutomationPayload } from '../../shared/automation-body.js';
import { pickImageField } from '../../shared/automation-image.js';
import { resolveAutomationImageUrl } from '../automation-image.js';
import type { ProductInput } from '../../shared/product.js';
import { SHOP_CATEGORIES } from '../../shared/product.js';
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from '../db.js';

const VALID_CATEGORIES = new Set<string>(SHOP_CATEGORIES.map((c) => c.id));

function readAutomationKey(req: { headers: Record<string, string | string[] | undefined> }): string | undefined {
  const raw = req.headers['x-automation-key'];
  if (typeof raw === 'string' && raw.trim()) return raw.trim();
  const auth = req.headers.authorization;
  if (typeof auth === 'string') {
    const match = auth.match(/^Bearer\s+(.+)$/i);
    if (match?.[1]?.trim()) return match[1].trim();
  }
  return undefined;
}

function requireAutomationKey(
  req: { headers: Record<string, string | string[] | undefined> },
  res: { status: (n: number) => { json: (b: unknown) => void } }
): boolean {
  const expected = process.env.AUTOMATION_API_KEY?.trim();
  if (!expected) {
    res.status(503).json({ error: 'AUTOMATION_API_KEY is not configured' });
    return false;
  }
  const provided = readAutomationKey(req);
  if (!provided || provided !== expected) {
    res.status(401).json({ error: 'Invalid or missing automation API key' });
    return false;
  }
  return true;
}

function validateProductInput(body: ProductInput): string | null {
  if (!body.name?.trim()) return 'name is required';
  if (!body.category?.trim() || !VALID_CATEGORIES.has(body.category)) {
    return `category must be one of: ${Array.from(VALID_CATEGORIES).join(', ')}`;
  }
  if (body.price == null) return 'price is required';
  if (!body.image?.trim()) return 'image is required';
  if (!body.description?.trim()) return 'description is required';
  return null;
}

const actor = () => process.env.AUTOMATION_ACTOR_LABEL?.trim() || 'automation';

export const automationRouter = Router();

automationRouter.use((req, res, next) => {
  if (!requireAutomationKey(req, res)) return;
  next();
});

automationRouter.get('/products', (_req, res) => {
  res.json(listProducts());
});

automationRouter.post('/products', async (req, res) => {
  const raw = unwrapAutomationPayload(req.body) as Record<string, unknown>;
  const image = pickImageField(raw) || (typeof raw.image === 'string' ? raw.image : '');
  const resolved = image ? await resolveAutomationImageUrl(image) : { url: '', imported: false };
  const body = { ...raw, image: resolved.url } as ProductInput;
  const err = validateProductInput(body);
  if (err) return res.status(400).json({ error: err });

  const product = createProduct(
    {
      ...body,
      price: Number(body.price),
      originalPrice: body.originalPrice != null ? Number(body.originalPrice) : null,
      rating: body.rating != null ? Number(body.rating) : 4.5,
      reviews: body.reviews != null ? Number(body.reviews) : 0,
    },
    actor()
  );
  res.status(201).json({ ...product, ...(resolved.warning ? { imageWarning: resolved.warning } : {}) });
});

automationRouter.get('/products/:id', (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

automationRouter.put('/products/:id', async (req, res) => {
  const raw = unwrapAutomationPayload(req.body) as Record<string, unknown>;
  let body = raw as Partial<ProductInput>;
  let imageWarning: string | undefined;
  const image = pickImageField(raw);
  if (image) {
    const resolved = await resolveAutomationImageUrl(image);
    body = { ...body, image: resolved.url };
    imageWarning = resolved.warning;
  }
  const product = updateProduct(
    req.params.id,
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
    actor()
  );
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ ...product, ...(imageWarning ? { imageWarning } : {}) });
});

automationRouter.delete('/products/:id', (req, res) => {
  const ok = deleteProduct(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Product not found' });
  res.json({ ok: true });
});
