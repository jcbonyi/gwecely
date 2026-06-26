/**
 * ShopSection — Gwecely Limited
 * Design: White background, product grid with sidebar category filters
 * Product cards with cart, wishlist, quick-view actions
 */

import { useEffect, useRef, useState } from 'react';
import { Heart, Eye, Search, ShoppingCart, Star, SlidersHorizontal, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { CATEGORIES, formatPrice, getProductsByCategory, getShopCategories, searchProducts, sortProducts, type Product } from '@/lib/products';
import { useProducts } from '@/hooks/useProducts';
import { IMAGES } from '@/lib/images';
import ProductQuickView from '@/components/ProductQuickView';
import { toast } from 'sonner';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating) ? 'star-filled fill-amber-400' : 'star-empty'}
          fill={s <= Math.round(rating) ? '#F59E0B' : 'none'}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, onQuickView }: { product: Product; onQuickView: (product: Product) => void }) {
  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [imgError, setImgError] = useState(false);

  const categoryLabel = CATEGORIES.find(c => c.id === product.category)?.label ?? product.category;
  const fallbackSrc = `https://placehold.co/600x400/F5F3F2/463C3C?text=${encodeURIComponent(categoryLabel)}`;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`, {
      description: formatPrice(product.price),
      duration: 2500,
    });
  };

  const handleWishlist = () => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      duration: 1800,
    });
  };

  return (
    <div className="product-card group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="block w-full h-full text-left"
          aria-label={`Quick view ${product.name}`}
        >
          <img
            src={imgError ? fallbackSrc : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </button>
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
              product.badge === 'Sale' ? 'bg-red-500' :
              product.badge === 'Best Seller' ? 'bg-[#F05A32]' :
              product.badge === 'Genuine' ? 'bg-[#F05A32]' :
              product.badge === 'Certified' ? 'bg-[#F05A32]' :
              'bg-[#F05A32]'
            }`}
          >
            {product.badge}
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-[#F0826E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            New
          </span>
        )}

        {/* Hover actions */}
        <div className="product-actions absolute bottom-2 right-2 flex flex-col gap-1.5">
          <button
            onClick={() => onQuickView(product)}
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-white text-gray-600 hover:bg-[#F05A32] hover:text-white transition-colors"
            aria-label="Quick view"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={handleWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
              wishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
            aria-label="Add to wishlist"
          >
            <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-[10px] text-[#F05A32] font-['Inter'] font-medium uppercase tracking-wide mb-1">
          {CATEGORIES.find(c => c.id === product.category)?.label}
        </div>
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="font-['Inter'] font-600 text-sm text-[#2D2626] mb-2 line-clamp-2 leading-snug text-left hover:text-[#F05A32] transition-colors w-full"
        >
          {product.name}
        </button>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-gray-400 font-['Inter']">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-['Barlow'] font-700 text-lg text-[#2D2626]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through font-['Inter']">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="w-full btn-gwecely text-xs py-2 justify-center"
        >
          <ShoppingCart size={13} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ShopSection() {
  const { products, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [visible, setVisible] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const shopCategories = getShopCategories(products);

  const filteredProducts = (() => {
    let list = searchQuery
      ? searchProducts(products, searchQuery)
      : getProductsByCategory(products, activeCategory);
    return sortProducts(list, sortBy);
  })();

  return (
    <section id="shop" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F05A32]/10 text-[#F05A32] text-sm px-4 py-1.5 rounded-full mb-4 font-['Inter'] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32]" />
            Genuine Parts &amp; Supplies — Mombasa &amp; Nairobi Delivery
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading">
              BUILT FOR KENYA'S
              <br />
              ROADS &amp; OFFICES
            </h2>
            <p className="text-gray-600 font-['Inter'] max-w-sm">
              Genuine OEM parts, quality business supplies, and fast delivery across Kenya. Every product backed by our warranty.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-['Inter']">
            Could not load products from server. Start the API with <code className="text-xs">npm run dev</code> (runs web + API together).
          </div>
        )}

        <div className="relative h-40 md:h-52 rounded-2xl overflow-hidden mb-10">
          <img
            src={IMAGES.contact.port}
            alt="Kenya logistics and delivery — Mombasa port"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D2626]/80 via-[#463C3C]/50 to-transparent flex items-center">
            <p className="text-white font-['Barlow_Condensed'] font-700 text-xl md:text-2xl px-8 max-w-lg">
              Delivering across Kenya — from Mombasa to Nairobi and beyond
            </p>
          </div>
        </div>

        {/* Mobile category pills */}
        <div className="sm:hidden flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1 scrollbar-none">
          {shopCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); setShowFilters(false); }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-['Inter'] font-medium transition-all ${
                activeCategory === cat.id && !searchQuery
                  ? 'bg-[#F05A32] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] focus:ring-2 focus:ring-[#F05A32]/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] bg-white cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Most Popular</option>
            <option value="newest">Newest First</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-['Inter'] text-gray-600"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Featured products strip */}
        <div className="mb-8 p-4 bg-[#F5F3F2] rounded-xl border-l-4 border-[#F05A32] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="badge-genuine">FEATURED</span>
            <span className="font-['Barlow_Condensed'] font-700 text-[#2D2626] text-sm">
              Genuine OEM parts — same-day dispatch from Mombasa
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] bg-[#F05A32] text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">M-Pesa Accepted</span>
            <span className="text-[10px] bg-[#F05A32] text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Free Delivery KSh 5000+</span>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar categories */}
          <aside className={`w-56 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} sm:block`}>
            <div className="sticky top-28">
              <h3 className="font-['Barlow_Condensed'] font-700 text-lg text-[#2D2626] mb-3">
                CATEGORIES
              </h3>
              <div className="flex flex-col gap-1">
                {shopCategories.map((cat) => {
                  const count = cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-['Inter'] transition-all text-left ${
                        activeCategory === cat.id && !searchQuery
                          ? 'bg-[#F05A32] text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-[#F05A32]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeCategory === cat.id && !searchQuery
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* M-Pesa badge */}
              <div className="mt-6 p-4 bg-[#F5F3F2] rounded-xl border border-[#F05A32]/10">
                <div className="text-xs font-['Barlow_Condensed'] font-700 text-[#2D2626] mb-1">
                  PAYMENT OPTIONS
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['M-Pesa', 'Bank Transfer', 'Cash'].map(p => (
                    <span key={p} className="text-[10px] bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded font-['Inter']">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 font-['Inter']">
                {searchQuery
                  ? `${filteredProducts.length} results for "${searchQuery}"`
                  : `Showing ${filteredProducts.length} products`}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16 text-gray-500 font-['Inter']">Loading products…</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#F5F3F2] rounded-2xl border border-dashed border-gray-200">
                <Search size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 font-['Inter'] font-medium mb-1">No products found</p>
                <p className="text-gray-400 text-sm font-['Inter'] mb-4">
                  {searchQuery ? `No results for "${searchQuery}"` : 'Try a different category'}
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="btn-secondary-gwecely text-xs py-2 px-5"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product, i) => (
                  <div
                    key={product.id}
                    className={`reveal ${visible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${(i % 6) * 60}ms` }}
                  >
                    <ProductCard product={product} onQuickView={setQuickViewProduct} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductQuickView
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => { if (!open) setQuickViewProduct(null); }}
      />
    </section>
  );
}
