import { createClient, type Client, type InValue } from '@libsql/client';
import type { Product, ProductInput } from '../shared/product.js';
import { SEED_PRODUCTS } from './seed-data.js';
import { tursoEnabled } from './turso-config.js';

export { tursoEnabled };

let client: Client | null = null;
let ready: Promise<void> | null = null;

function getClient(): Client {
  if (!tursoEnabled()) {
    throw new Error('Turso is not configured');
  }
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
  }
  return client;
}

export function getTursoClient(): Client {
  return getClient();
}

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    category: String(row.category),
    price: Number(row.price),
    originalPrice: row.original_price != null ? Number(row.original_price) : undefined,
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    image: String(row.image),
    badge: row.badge != null ? String(row.badge) : undefined,
    description: String(row.description),
    inStock: Number(row.in_stock) === 1,
    isNew: Number(row.is_new) === 1,
    isFeatured: Number(row.is_featured) === 1,
    updatedAt: String(row.updated_at),
    updatedBy: row.updated_by != null ? String(row.updated_by) : undefined,
  };
}

async function seedIfEmpty(c: Client) {
  const count = await c.execute('SELECT COUNT(*) AS c FROM products');
  const n = Number(count.rows[0]?.c ?? 0);
  if (n > 0) return;

  const now = new Date().toISOString();
  const statements = SEED_PRODUCTS.map((p) => ({
    sql: `INSERT INTO products (
      id, name, category, price, original_price, rating, reviews, image, badge,
      description, in_stock, is_new, is_featured, updated_at, updated_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      p.id,
      p.name,
      p.category,
      p.price,
      p.originalPrice ?? null,
      p.rating ?? 4.5,
      p.reviews ?? 0,
      p.image,
      p.badge ?? null,
      p.description,
      p.inStock === false ? 0 : 1,
      p.isNew ? 1 : 0,
      p.isFeatured ? 1 : 0,
      now,
      'seed',
    ] as InValue[],
  }));

  await c.batch(statements, 'write');
}

export async function ensureTursoReady(): Promise<void> {
  if (!tursoEnabled()) return;
  if (!ready) {
    ready = (async () => {
      const c = getClient();
      await c.execute(`
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          price INTEGER NOT NULL,
          original_price INTEGER,
          rating REAL NOT NULL DEFAULT 4.5,
          reviews INTEGER NOT NULL DEFAULT 0,
          image TEXT NOT NULL,
          badge TEXT,
          description TEXT NOT NULL,
          in_stock INTEGER NOT NULL DEFAULT 1,
          is_new INTEGER NOT NULL DEFAULT 0,
          is_featured INTEGER NOT NULL DEFAULT 0,
          updated_at TEXT NOT NULL,
          updated_by TEXT
        )
      `);
      await c.execute('CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)');
      await seedIfEmpty(c);
    })();
  }
  await ready;
}

export async function listProductsTurso(): Promise<Product[]> {
  const rs = await getClient().execute('SELECT * FROM products ORDER BY name ASC');
  return rs.rows.map((row) => rowToProduct(row as Record<string, unknown>));
}

export async function getProductByIdTurso(id: string): Promise<Product | null> {
  const rs = await getClient().execute({
    sql: 'SELECT * FROM products WHERE id = ?',
    args: [id],
  });
  const row = rs.rows[0];
  return row ? rowToProduct(row as Record<string, unknown>) : null;
}

export async function createProductTurso(input: ProductInput, updatedBy: string): Promise<Product> {
  const id = input.id ?? `prd-${Date.now()}`;
  const now = new Date().toISOString();
  await getClient().execute({
    sql: `INSERT INTO products (
      id, name, category, price, original_price, rating, reviews, image, badge,
      description, in_stock, is_new, is_featured, updated_at, updated_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.name,
      input.category,
      input.price,
      input.originalPrice ?? null,
      input.rating ?? 4.5,
      input.reviews ?? 0,
      input.image,
      input.badge ?? null,
      input.description,
      input.inStock === false ? 0 : 1,
      input.isNew ? 1 : 0,
      input.isFeatured ? 1 : 0,
      now,
      updatedBy,
    ],
  });
  return (await getProductByIdTurso(id))!;
}

export async function updateProductTurso(
  id: string,
  input: Partial<ProductInput>,
  updatedBy: string
): Promise<Product | null> {
  const existing = await getProductByIdTurso(id);
  if (!existing) return null;

  const merged: ProductInput = {
    id,
    name: input.name ?? existing.name,
    category: input.category ?? existing.category,
    price: input.price ?? existing.price,
    originalPrice: input.originalPrice !== undefined ? input.originalPrice : existing.originalPrice ?? null,
    rating: input.rating ?? existing.rating,
    reviews: input.reviews ?? existing.reviews,
    image: input.image ?? existing.image,
    badge: input.badge !== undefined ? input.badge : existing.badge ?? null,
    description: input.description ?? existing.description,
    inStock: input.inStock ?? existing.inStock,
    isNew: input.isNew ?? existing.isNew,
    isFeatured: input.isFeatured ?? existing.isFeatured,
  };

  const now = new Date().toISOString();
  await getClient().execute({
    sql: `UPDATE products SET
      name = ?, category = ?, price = ?, original_price = ?,
      rating = ?, reviews = ?, image = ?, badge = ?,
      description = ?, in_stock = ?, is_new = ?,
      is_featured = ?, updated_at = ?, updated_by = ?
    WHERE id = ?`,
    args: [
      merged.name,
      merged.category,
      merged.price,
      merged.originalPrice ?? null,
      merged.rating ?? 4.5,
      merged.reviews ?? 0,
      merged.image,
      merged.badge ?? null,
      merged.description,
      merged.inStock === false ? 0 : 1,
      merged.isNew ? 1 : 0,
      merged.isFeatured ? 1 : 0,
      now,
      updatedBy,
      id,
    ],
  });

  return getProductByIdTurso(id);
}

export async function deleteProductTurso(id: string): Promise<boolean> {
  const rs = await getClient().execute({
    sql: 'DELETE FROM products WHERE id = ?',
    args: [id],
  });
  return rs.rowsAffected > 0;
}
