import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useRoute } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploadZone from '@/components/admin/ImageUploadZone';
import {
  createAdminProduct,
  fetchAdminProducts,
  updateAdminProduct,
  uploadProductImage,
} from '@/lib/adminApi';
import type { ProductInput } from '@shared/product';
import { SHOP_CATEGORIES } from '@shared/product';

const EMPTY: ProductInput = {
  name: '',
  category: 'spare-parts',
  price: 0,
  image: '',
  description: '',
  inStock: true,
  rating: 4.5,
  reviews: 0,
};

export default function AdminProductEditPage() {
  const [, params] = useRoute('/admin/products/:id');
  const routeId = params?.id;
  const isNew = !routeId || routeId === 'new';
  const productId = isNew ? undefined : routeId;
  const { getToken } = useAuth();
  const [, setLocation] = useLocation();
  const [form, setForm] = useState<ProductInput>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (file: File, onProgress: (percent: number) => void) => {
    const token = await getToken();
    if (!token) throw new Error('Not signed in');
    const url = await uploadProductImage(token, file, onProgress);
    toast.success('Image uploaded to Cloudinary');
    return url;
  };

  useEffect(() => {
    if (isNew || !productId) return;
    (async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const list = await fetchAdminProducts(token);
        const p = list.find((x) => x.id === productId);
        if (!p) {
          toast.error('Product not found');
          setLocation('/admin/products');
          return;
        }
        setForm({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          originalPrice: p.originalPrice ?? null,
          rating: p.rating,
          reviews: p.reviews,
          image: p.image,
          badge: p.badge ?? null,
          description: p.description,
          inStock: p.inStock,
          isNew: p.isNew,
          isFeatured: p.isFeatured,
        });
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Load failed');
      } finally {
        setLoading(false);
      }
    })();
  }, [productId, isNew, getToken, setLocation]);

  const set = (key: keyof ProductInput, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.image || !form.description.trim() || !form.price) {
      toast.error('Name, price, image, and description are required');
      return;
    }
    setSaving(true);
    try {
      const token = await getToken();
      if (!token) throw new Error('Not signed in');
      if (isNew) {
        await createAdminProduct(token, form);
        toast.success('Product created');
      } else if (productId) {
        await updateAdminProduct(token, productId, form);
        toast.success('Product updated');
      }
      setLocation('/admin/products');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-gray-500 text-sm">Loading…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-[#F05A32] text-sm font-['Inter'] mb-6 hover:underline"
      >
        <ArrowLeft size={16} />
        Back to catalog
      </Link>

      <h1 className="font-['Barlow_Condensed'] font-800 text-3xl text-[#2D2626] mb-6">
        {isNew ? 'Add Product' : 'Edit Product'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm max-w-2xl space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#F05A32]"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
            <select
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {SHOP_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Price (KSh) *</label>
            <input
              type="number"
              min={0}
              value={form.price || ''}
              onChange={(e) => set('price', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Original price (sale)</label>
            <input
              type="number"
              min={0}
              value={form.originalPrice ?? ''}
              onChange={(e) => set('originalPrice', e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Badge</label>
            <input
              value={form.badge ?? ''}
              onChange={(e) => set('badge', e.target.value || null)}
              placeholder="e.g. Sale, Genuine"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
            required
          />
        </div>

        <ImageUploadZone
          value={form.image}
          onChange={(url) => set('image', url)}
          onUpload={async (file, onProgress) => {
            try {
              return await handleImageUpload(file, onProgress);
            } catch (err) {
              toast.error(err instanceof Error ? err.message : 'Upload failed');
              throw err;
            }
          }}
        />

        <div className="flex flex-wrap gap-4 pt-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.inStock !== false} onChange={(e) => set('inStock', e.target.checked)} />
            In stock
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!form.isNew} onChange={(e) => set('isNew', e.target.checked)} />
            New
          </label>
        </div>

        <button type="submit" disabled={saving} className="btn-gwecely text-sm py-2.5 px-6 disabled:opacity-60">
          {saving ? 'Saving…' : isNew ? 'Create Product' : 'Save Changes'}
        </button>
      </form>
    </AdminLayout>
  );
}
