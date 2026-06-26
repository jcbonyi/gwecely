import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Product, ProductInput } from "../shared/product.js";
import { SEED_PRODUCTS } from "./seed-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "..", "data");
const DB_PATH = process.env.DATABASE_PATH ?? path.join(DATA_DIR, "gwecely.db");

let db: Database.Database | null = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  description: string;
  in_stock: number;
  is_new: number;
  is_featured: number;
  updated_at: string;
  updated_by: string | null;
}

function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    rating: row.rating,
    reviews: row.reviews,
    image: row.image,
    badge: row.badge ?? undefined,
    description: row.description,
    inStock: row.in_stock === 1,
    isNew: row.is_new === 1,
    isFeatured: row.is_featured === 1,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by ?? undefined,
  };
}

export function getDb(): Database.Database {
  if (db) return db;
  ensureDataDir();
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  initSchema(db);
  seedIfEmpty(db);
  return db;
}

function initSchema(database: Database.Database) {
  database.exec(`
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
    );
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
  `);
}

function seedIfEmpty(database: Database.Database) {
  const count = database.prepare("SELECT COUNT(*) as c FROM products").get() as { c: number };
  if (count.c > 0) return;

  const now = new Date().toISOString();
  const insert = database.prepare(`
    INSERT INTO products (
      id, name, category, price, original_price, rating, reviews, image, badge,
      description, in_stock, is_new, is_featured, updated_at, updated_by
    ) VALUES (
      @id, @name, @category, @price, @originalPrice, @rating, @reviews, @image, @badge,
      @description, @inStock, @isNew, @isFeatured, @updatedAt, @updatedBy
    )
  `);

  const tx = database.transaction((items: ProductInput[]) => {
    for (const p of items) {
      insert.run({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        rating: p.rating ?? 4.5,
        reviews: p.reviews ?? 0,
        image: p.image,
        badge: p.badge ?? null,
        description: p.description,
        inStock: p.inStock === false ? 0 : 1,
        isNew: p.isNew ? 1 : 0,
        isFeatured: p.isFeatured ? 1 : 0,
        updatedAt: now,
        updatedBy: "seed",
      });
    }
  });

  tx(SEED_PRODUCTS);
  console.log(`[db] Seeded ${SEED_PRODUCTS.length} products into ${DB_PATH}`);
}

export function listProducts(): Product[] {
  const rows = getDb().prepare("SELECT * FROM products ORDER BY name ASC").all() as ProductRow[];
  return rows.map(rowToProduct);
}

export function getProductById(id: string): Product | null {
  const row = getDb().prepare("SELECT * FROM products WHERE id = ?").get(id) as ProductRow | undefined;
  return row ? rowToProduct(row) : null;
}

export function createProduct(input: ProductInput, updatedBy: string): Product {
  const id = input.id ?? `prd-${Date.now()}`;
  const now = new Date().toISOString();
  getDb()
    .prepare(
      `INSERT INTO products (
        id, name, category, price, original_price, rating, reviews, image, badge,
        description, in_stock, is_new, is_featured, updated_at, updated_by
      ) VALUES (
        @id, @name, @category, @price, @originalPrice, @rating, @reviews, @image, @badge,
        @description, @inStock, @isNew, @isFeatured, @updatedAt, @updatedBy
      )`
    )
    .run({
      id,
      name: input.name,
      category: input.category,
      price: input.price,
      originalPrice: input.originalPrice ?? null,
      rating: input.rating ?? 4.5,
      reviews: input.reviews ?? 0,
      image: input.image,
      badge: input.badge ?? null,
      description: input.description,
      inStock: input.inStock === false ? 0 : 1,
      isNew: input.isNew ? 1 : 0,
      isFeatured: input.isFeatured ? 1 : 0,
      updatedAt: now,
      updatedBy,
    });
  return getProductById(id)!;
}

export function updateProduct(id: string, input: Partial<ProductInput>, updatedBy: string): Product | null {
  const existing = getProductById(id);
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
  getDb()
    .prepare(
      `UPDATE products SET
        name = @name, category = @category, price = @price, original_price = @originalPrice,
        rating = @rating, reviews = @reviews, image = @image, badge = @badge,
        description = @description, in_stock = @inStock, is_new = @isNew,
        is_featured = @isFeatured, updated_at = @updatedAt, updated_by = @updatedBy
      WHERE id = @id`
    )
    .run({
      id,
      name: merged.name,
      category: merged.category,
      price: merged.price,
      originalPrice: merged.originalPrice ?? null,
      rating: merged.rating ?? 4.5,
      reviews: merged.reviews ?? 0,
      image: merged.image,
      badge: merged.badge ?? null,
      description: merged.description,
      inStock: merged.inStock === false ? 0 : 1,
      isNew: merged.isNew ? 1 : 0,
      isFeatured: merged.isFeatured ? 1 : 0,
      updatedAt: now,
      updatedBy,
    });

  return getProductById(id);
}

export function deleteProduct(id: string): boolean {
  const result = getDb().prepare("DELETE FROM products WHERE id = ?").run(id);
  return result.changes > 0;
}
