import type { SheetImportResult } from '../shared/admin.js';
import { parseCsv } from '../shared/sheet-csv.js';
import { parseSheetProductRows } from '../shared/sheet-csv.js';
import { resolveAutomationImageUrl } from './automation-image.js';
import { createProductTurso, getProductByIdTurso, updateProductTurso } from './turso-db.js';
import type { ProductInput } from '../shared/product.js';

function normalizeCreateInput(body: ProductInput): ProductInput {
  return {
    ...body,
    price: Number(body.price),
    originalPrice: body.originalPrice != null ? Number(body.originalPrice) : null,
    rating: body.rating != null ? Number(body.rating) : 4.5,
    reviews: body.reviews != null ? Number(body.reviews) : 0,
  };
}

async function resolveImage(input: ProductInput): Promise<{ input: ProductInput; warning?: string }> {
  const resolved = await resolveAutomationImageUrl(input.image);
  return {
    input: { ...input, image: resolved.url },
    warning: resolved.warning,
  };
}

export async function importProductsFromSheetCsv(
  csvText: string,
  actor: string
): Promise<SheetImportResult> {
  const { products, errors } = parseSheetProductRows(parseCsv(csvText));
  const result: SheetImportResult = { created: 0, updated: 0, skipped: 0, errors: [...errors] };

  for (const item of products) {
    try {
      const { input, warning } = await resolveImage(item.input);
      if (warning) {
        result.errors.push({ row: item.rowNumber, message: warning });
      }

      if (item.id) {
        const existing = await getProductByIdTurso(item.id);
        if (existing) {
          const updated = await updateProductTurso(item.id, normalizeCreateInput(input), actor);
          if (updated) {
            result.updated++;
            continue;
          }
        }
      }

      await createProductTurso(normalizeCreateInput(input), actor);
      result.created++;
    } catch (e) {
      result.errors.push({
        row: item.rowNumber,
        message: e instanceof Error ? e.message : 'Import failed',
      });
    }
  }

  return result;
}
