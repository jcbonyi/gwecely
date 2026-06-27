import type { ProductInput } from './product.js';
import { SHOP_CATEGORIES } from './product.js';

const VALID_CATEGORIES = new Set<string>(SHOP_CATEGORIES.map((c) => c.id));

export function parseGoogleSheetUrl(url: string): { spreadsheetId: string; gid: string } | null {
  const trimmed = url.trim();
  const idMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!idMatch) return null;
  const gidMatch = trimmed.match(/[#&?]gid=(\d+)/);
  return { spreadsheetId: idMatch[1], gid: gidMatch?.[1] ?? '0' };
}

export function sheetCsvExportUrl(spreadsheetId: string, gid = '0'): string {
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(cell.trim());
      cell = '';
    } else if (ch === '\r' && next === '\n') {
      row.push(cell.trim());
      rows.push(row);
      row = [];
      cell = '';
      i++;
    } else if (ch === '\n' || ch === '\r') {
      row.push(cell.trim());
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += ch;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    rows.push(row);
  }

  return rows.filter((r) => r.some((c) => c.length > 0));
}

function parseBool(value: string | undefined): boolean | undefined {
  if (value == null || value === '') return undefined;
  const s = value.trim().toLowerCase();
  if (['true', '1', 'yes', 'y'].includes(s)) return true;
  if (['false', '0', 'no', 'n'].includes(s)) return false;
  return undefined;
}

function colIndex(headers: string[], ...names: string[]): number {
  for (const name of names) {
    const idx = headers.indexOf(name);
    if (idx >= 0) return idx;
  }
  return -1;
}

export interface ParsedSheetProduct {
  rowNumber: number;
  id?: string;
  input: ProductInput;
}

export function parseSheetProductRows(rows: string[][]): {
  products: ParsedSheetProduct[];
  errors: { row: number; message: string }[];
} {
  if (rows.length < 2) {
    return { products: [], errors: [{ row: 1, message: 'Sheet has no product rows' }] };
  }

  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const nameCol = colIndex(headers, 'name');
  const categoryCol = colIndex(headers, 'category');
  const priceCol = colIndex(headers, 'price');
  const imageCol = colIndex(headers, 'image', 'image_url', 'imageurl', 'photo');
  const descCol = colIndex(headers, 'description', 'desc');
  const stockCol = colIndex(headers, 'instock', 'in_stock', 'stock');
  const idCol = colIndex(headers, 'id');
  const statusCol = colIndex(headers, 'status');

  if (nameCol < 0 || categoryCol < 0 || priceCol < 0 || imageCol < 0 || descCol < 0) {
    return {
      products: [],
      errors: [
        {
          row: 1,
          message: 'Header row must include: name, category, price, image, description',
        },
      ],
    };
  }

  const products: ParsedSheetProduct[] = [];
  const errors: { row: number; message: string }[] = [];

  for (let i = 1; i < rows.length; i++) {
    const rowNumber = i + 1;
    const row = rows[i];
    const status = statusCol >= 0 ? row[statusCol]?.trim().toLowerCase() : '';
    if (status === 'skip') continue;

    const name = row[nameCol]?.trim() ?? '';
    if (!name) continue;

    const category = row[categoryCol]?.trim() ?? '';
    const priceRaw = row[priceCol]?.trim() ?? '';
    const image = row[imageCol]?.trim() ?? '';
    const description = row[descCol]?.trim() ?? '';
    const price = Number(priceRaw.replace(/,/g, ''));
    const id = idCol >= 0 ? row[idCol]?.trim() : undefined;

    if (!category || !VALID_CATEGORIES.has(category)) {
      errors.push({ row: rowNumber, message: `Invalid category "${category}"` });
      continue;
    }
    if (!priceRaw || Number.isNaN(price)) {
      errors.push({ row: rowNumber, message: 'Invalid price' });
      continue;
    }
    if (!image) {
      errors.push({ row: rowNumber, message: 'Image URL is required' });
      continue;
    }
    if (!description) {
      errors.push({ row: rowNumber, message: 'Description is required' });
      continue;
    }

    const inStock = stockCol >= 0 ? parseBool(row[stockCol]) : undefined;
    products.push({
      rowNumber,
      id: id || undefined,
      input: {
        id: id || undefined,
        name,
        category,
        price,
        image,
        description,
        inStock: inStock ?? true,
      },
    });
  }

  return { products, errors };
}
