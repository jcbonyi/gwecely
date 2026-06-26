/**
 * WishlistSidebar — saved products panel (mirrors CartSidebar)
 */

import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { CATEGORIES, formatPrice } from '@/lib/products';
import { scrollToSection } from '@/lib/scroll';
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function WishlistSidebar() {
  const { items, isOpen, closeWishlist, removeItem } = useWishlist();
  const { addItem } = useCart();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWishlist();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeWishlist]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    toast.success(`${item.name} added to cart`);
  };

  const handleBrowse = () => {
    closeWishlist();
    scrollToSection('#shop');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeWishlist}
        aria-hidden={!isOpen}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
      >
        <div className="bg-[#463C3C] text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Heart size={20} />
            <div>
              <h2 className="font-['Barlow_Condensed'] font-700 text-lg leading-tight">YOUR WISHLIST</h2>
              <p className="text-orange-100 text-xs font-['Inter']">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={closeWishlist}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <Heart size={40} className="text-gray-200 mb-4" />
            <p className="font-['Barlow_Condensed'] font-700 text-lg text-[#2D2626] mb-2">No saved items yet</p>
            <p className="text-gray-500 text-sm font-['Inter'] mb-6">Tap the heart on any product to save it for later.</p>
            <button onClick={handleBrowse} className="btn-gwecely text-sm py-2.5 px-6">
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-[#F5F3F2] rounded-xl">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#F05A32] font-['Inter'] font-medium uppercase tracking-wide">
                      {CATEGORIES.find(c => c.id === item.category)?.label ?? item.category}
                    </p>
                    <p className="font-['Inter'] font-medium text-sm text-[#2D2626] line-clamp-2 leading-snug">{item.name}</p>
                    <p className="font-['Barlow'] font-700 text-[#F05A32] text-sm mt-1">{formatPrice(item.price)}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-1 text-xs font-['Inter'] font-medium text-white bg-[#F05A32] hover:bg-[#D94E28] px-2.5 py-1.5 rounded-md transition-colors"
                      >
                        <ShoppingCart size={12} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 p-4 flex-shrink-0">
              <button onClick={handleBrowse} className="w-full btn-secondary-gwecely text-sm py-2.5 justify-center">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
