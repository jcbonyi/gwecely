import type { Product, ProductInput } from '@shared/product';

async function adminFetch(path: string, token: string, init?: RequestInit) {
  const res = await fetch(path, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${token}`,
      ...(init?.body && !(init.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? `Request failed (${res.status})`);
  }
  return data;
}

export async function fetchAdminProducts(token: string): Promise<Product[]> {
  return adminFetch('/api/admin/products', token);
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
