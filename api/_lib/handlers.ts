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
import { requireAdmin, requireOwner, clerkClient, HttpError } from './auth.js';
import { requireAutomationKey, automationActor } from './automation-auth.js';
import { cloudinarySignature } from './cloudinary.js';
import { readAutomationBody, readJsonBody } from './http.js';
import { SHOP_CATEGORIES } from '../../shared/product.js';
import { pickImageField } from '../../shared/automation-image.js';
import { resolveAutomationImageUrl } from '../../server/automation-image.js';
import { importProductsFromSheetCsv } from '../../server/sheet-import.js';
import {
  addAdminUser,
  listAdminUsers,
  removeAdminUser,
} from '../../server/turso-admin-users.js';
import { parseGoogleSheetUrl, sheetCsvExportUrl } from '../../shared/sheet-csv.js';
import type { AdminRole } from '../../shared/admin.js';

const VALID_CATEGORIES = new Set<string>(SHOP_CATEGORIES.map((c) => c.id));

function validateProductInput(body: ProductInput): string | null {
  if (!body.name?.trim()) return 'name is required';
  if (!body.category?.trim()) return 'category is required';
  if (!VALID_CATEGORIES.has(body.category)) {
    return `category must be one of: ${Array.from(VALID_CATEGORIES).join(', ')}`;
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
      `category must be one of: ${Array.from(VALID_CATEGORIES).join(', ')}`,
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

export async function importAdminGoogleSheet(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    const admin = await requireAdmin(req);
    const body = await readJsonBody<{ sheetUrl?: string; gid?: string }>(req);
    const sheetUrl = body.sheetUrl?.trim();
    if (!sheetUrl) {
      res.status(400).json({ error: 'sheetUrl is required' });
      return;
    }

    const parsed = parseGoogleSheetUrl(sheetUrl);
    if (!parsed) {
      res.status(400).json({ error: 'Invalid Google Sheet URL' });
      return;
    }

    const gid = body.gid?.trim() || parsed.gid;
    const exportUrl = sheetCsvExportUrl(parsed.spreadsheetId, gid);
    const response = await fetch(exportUrl, { redirect: 'follow' });
    const csvText = await response.text();

    if (!response.ok || csvText.trim().startsWith('<!DOCTYPE') || csvText.includes('<html')) {
      res.status(400).json({
        error:
          'Could not read the sheet. In Google Sheets: Share → General access → Anyone with the link → Viewer.',
      });
      return;
    }

    const result = await importProductsFromSheetCsv(csvText, admin.email);
    res.status(200).json(result);
  });
}

export async function listAdminUsersHandler(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    await requireOwner(req);
    res.status(200).json(await listAdminUsers());
  });
}

export async function inviteAdminUser(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    const owner = await requireOwner(req);
    const body = await readJsonBody<{ email?: string; role?: AdminRole }>(req);
    const email = body.email?.trim().toLowerCase();
    const role = body.role ?? 'editor';

    if (!email || !email.includes('@')) {
      res.status(400).json({ error: 'A valid email is required' });
      return;
    }
    if (role !== 'editor' && role !== 'owner') {
      res.status(400).json({ error: 'role must be editor or owner' });
      return;
    }

    const user = await addAdminUser(email, role, owner.email);
    const clientUrl = (process.env.CLIENT_URL ?? 'https://gwecely.vercel.app').replace(/\/$/, '');

    try {
      await clerkClient().invitations.createInvitation({
        emailAddress: email,
        redirectUrl: `${clientUrl}/admin/products`,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Invitation failed';
      res.status(502).json({
        error: `User added but invitation email failed: ${message}`,
        user,
      });
      return;
    }

    res.status(201).json({ user, invited: true });
  });
}

export async function removeAdminUserHandler(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    await requireOwner(req);
    const body = await readJsonBody<{ email?: string }>(req);
    const email = body.email?.trim().toLowerCase();
    if (!email) {
      res.status(400).json({ error: 'email is required' });
      return;
    }

    try {
      const ok = await removeAdminUser(email);
      if (!ok) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json({ ok: true });
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).json({ error: e.message });
        return;
      }
      throw e;
    }
  });
}

// --- Automation API (Zapier / Make / n8n) — AUTOMATION_API_KEY ---

export async function listAutomationProducts(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    requireAutomationKey(req);
    res.status(200).json(await listProductsTurso());
  });
}

function normalizeAutomationBody<T extends Record<string, unknown>>(raw: T): T & { image?: string } {
  const image = pickImageField(raw);
  return image ? { ...raw, image } : raw;
}

async function prepareAutomationCreateBody(raw: Record<string, unknown>): Promise<{
  body: ProductInput;
  imageWarning?: string;
}> {
  const withImage = normalizeAutomationBody(raw) as ProductInput;
  const resolved = await resolveAutomationImageUrl(withImage.image ?? '');
  return {
    body: { ...withImage, image: resolved.url },
    imageWarning: resolved.warning,
  };
}

async function prepareAutomationUpdateBody(
  raw: Record<string, unknown>
): Promise<{ body: Partial<ProductInput>; imageWarning?: string }> {
  const withImage = normalizeAutomationBody(raw) as Partial<ProductInput>;
  if (!withImage.image?.trim()) {
    return { body: withImage };
  }
  const resolved = await resolveAutomationImageUrl(withImage.image);
  return {
    body: { ...withImage, image: resolved.url },
    imageWarning: resolved.warning,
  };
}

export async function createAutomationProduct(req: VercelRequest, res: VercelResponse) {
  await withTurso(req, res, async () => {
    requireAutomationKey(req);
    const raw = await readAutomationBody<Record<string, unknown>>(req);
    const { body, imageWarning } = await prepareAutomationCreateBody(raw);
    const validationError = validateProductInput(body);
    if (validationError) {
      const received = Object.keys(raw);
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
    res.status(201).json({ ...product, ...(imageWarning ? { imageWarning } : {}) });
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
    const raw = await readAutomationBody<Record<string, unknown>>(req);
    const { body, imageWarning } = await prepareAutomationUpdateBody(raw);
    const product = await updateProductTurso(id, normalizeUpdateInput(body), automationActor());
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({ ...product, ...(imageWarning ? { imageWarning } : {}) });
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
