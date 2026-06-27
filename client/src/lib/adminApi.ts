import type { Product, ProductInput } from '@shared/product';
import type { AdminSession, AdminUserRecord, SheetImportResult } from '@shared/admin';
import { adminFetch } from '@/lib/adminFetch';

export { warmAdminApi } from '@/lib/adminFetch';

export async function fetchAdminSession(token: string): Promise<AdminSession> {
  return adminFetch('/api/admin/me', token) as Promise<AdminSession>;
}

export async function importAdminGoogleSheet(token: string, sheetUrl: string): Promise<SheetImportResult> {
  return adminFetch('/api/admin/import-sheet', token, {
    method: 'POST',
    body: JSON.stringify({ sheetUrl }),
  }) as Promise<SheetImportResult>;
}

export async function fetchAdminUsers(token: string): Promise<AdminUserRecord[]> {
  const data = await adminFetch('/api/admin/users', token);
  return Array.isArray(data) ? data : [];
}

export async function inviteAdminUser(token: string, email: string): Promise<void> {
  await adminFetch('/api/admin/users', token, {
    method: 'POST',
    body: JSON.stringify({ email, role: 'editor' }),
  });
}

export async function removeAdminUser(token: string, email: string): Promise<void> {
  await adminFetch('/api/admin/users', token, {
    method: 'DELETE',
    body: JSON.stringify({ email }),
  });
}

export async function fetchAdminProducts(
  token: string,
  options?: { onRetry?: () => void }
): Promise<Product[]> {
  const data = await adminFetch('/api/admin/products', token, undefined, options);
  if (!Array.isArray(data)) {
    throw new Error('Product API is unavailable. Deploy the Express backend to use the admin catalog.');
  }
  return data;
}

export async function createAdminProduct(
  token: string,
  input: ProductInput,
  options?: { onRetry?: () => void }
): Promise<Product> {
  return adminFetch('/api/admin/products', token, {
    method: 'POST',
    body: JSON.stringify(input),
  }, options) as Promise<Product>;
}

export async function updateAdminProduct(
  token: string,
  id: string,
  input: Partial<ProductInput>,
  options?: { onRetry?: () => void }
): Promise<Product> {
  return adminFetch(`/api/admin/products/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(input),
  }, options) as Promise<Product>;
}

export async function deleteAdminProduct(token: string, id: string): Promise<void> {
  await adminFetch(`/api/admin/products/${id}`, token, { method: 'DELETE' });
}

export { uploadProductImage } from '@/lib/cloudinaryUpload';
