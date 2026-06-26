import type { Product, ProductInput } from '@shared/product';
import { apiUrl } from '@/lib/apiBase';

async function adminFetch(path: string, token: string, init?: RequestInit) {
  const res = await fetch(apiUrl(path), {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${token}`,
      ...(init?.body && !(init.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
    },
  });

  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error(
      res.ok
        ? 'Product API returned an invalid response. The backend may not be deployed.'
        : `Request failed (${res.status})`
    );
  }

  const data = await res.json();
  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? `Request failed (${res.status})`);
  }
  return data;
}

export async function fetchAdminProducts(token: string): Promise<Product[]> {
  const data = await adminFetch('/api/admin/products', token);
  if (!Array.isArray(data)) {
    throw new Error('Product API is unavailable. Deploy the Express backend to use the admin catalog.');
  }
  return data;
}

export async function createAdminProduct(token: string, input: ProductInput): Promise<Product> {
  return adminFetch('/api/admin/products', token, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function updateAdminProduct(
  token: string,
  id: string,
  input: Partial<ProductInput>
): Promise<Product> {
  return adminFetch(`/api/admin/products/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export async function deleteAdminProduct(token: string, id: string): Promise<void> {
  await adminFetch(`/api/admin/products/${id}`, token, { method: 'DELETE' });
}

export async function uploadProductImage(token: string, file: File): Promise<string> {
  const form = new FormData();
  form.append('image', file);
  const data = await adminFetch('/api/admin/upload', token, {
    method: 'POST',
    body: form,
  });
  return (data as { url: string }).url;
}
