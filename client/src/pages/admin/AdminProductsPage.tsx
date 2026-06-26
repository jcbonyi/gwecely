import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import { deleteAdminProduct, fetchAdminProducts } from '@/lib/adminApi';
import { formatPrice } from '@/lib/products';
import type { Product } from '@shared/product';
import { SHOP_CATEGORIES } from '@shared/product';

export default function AdminProductsPage() {
  const { getToken } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error('Not signed in');
      setProducts(await fetchAdminProducts(token));
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to load products';
      setError(message);
      setProducts([]);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      const token = await getToken();
      if (!token) throw new Error('Not signed in');
      await deleteAdminProduct(token, id);
      toast.success('Product deleted');
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  const filtered = products.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  const categoryLabel = (id: string) => SHOP_CATEGORIES.find((c) => c.id === id)?.label ?? id;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-['Barlow_Condensed'] font-800 text-3xl text-[#2D2626]">Product Catalog</h1>
          <p className="text-gray-500 text-sm font-['Inter'] mt-1">{products.length} products in database</p>
        </div>
        <Link href="/admin/products/new" className="btn-gwecely text-sm py-2.5 px-5 justify-center">
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="search"
          placeholder="Search by name or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] bg-white"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {error && !loading && (
          <div className="m-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-['Inter'] text-amber-900">
            <p className="font-medium mb-1">Catalog API unavailable</p>
            <p>{error}</p>
            <p className="mt-2 text-amber-800/80">
              Deploy the Express API (see <code className="text-xs bg-amber-100 px-1 rounded">render.yaml</code>), then set{' '}
              <code className="text-xs bg-amber-100 px-1 rounded">VITE_API_URL</code> on Vercel to your API URL and
              redeploy.
            </p>
          </div>
        )}
        {loading ? (
          <p className="p-8 text-gray-500 text-sm font-['Inter']">Loading products…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-['Inter']">
              <thead className="bg-[#F5F3F2] text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50/80">
                    <td className="p-3">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <img src={p.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                        <div>
                          <p className="font-medium text-[#2D2626] line-clamp-1">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{categoryLabel(p.category)}</td>
                    <td className="p-3 font-semibold text-[#F05A32]">{formatPrice(p.price)}</td>
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {p.inStock ? 'In stock' : 'Out'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="p-2 rounded-lg text-gray-500 hover:bg-[#F05A32]/10 hover:text-[#F05A32]"
                          aria-label={`Edit ${p.name}`}
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Delete ${p.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="p-8 text-center text-gray-500">No products match your search.</p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
