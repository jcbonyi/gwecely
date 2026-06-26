import { useEffect, useState } from 'react';
import type { Product } from '@shared/product';
import { apiUrl } from '@/lib/apiBase';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl('/api/products'));
      if (!res.ok) throw new Error('Failed to load products');
      const contentType = res.headers.get('content-type') ?? '';
      if (!contentType.includes('application/json')) {
        throw new Error('Product API is unavailable');
      }
      const data = (await res.json()) as Product[];
      if (!Array.isArray(data)) throw new Error('Product API returned invalid data');
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  return { products, loading, error, reload };
}
