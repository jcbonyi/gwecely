/**
 * ProductQuickView — modal for product details without leaving the shop
 */

import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CATEGORIES, formatPrice, type Product } from '@/lib/products';
import { buildProductEnquiryMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          fill={s <= Math.round(rating) ? '#F59E0B' : 'none'}
          className={s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

export default function ProductQuickView({ product, open, onOpenChange }: ProductQuickViewProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const categoryLabel = CATEGORIES.find(c => c.id === product.category)?.label ?? product.category;
  const wishlisted = isWishlisted(product.id);
  const fallbackSrc = `https://placehold.co/600x400/F5F3F2/463C3C?text=${encodeURIComponent(categoryLabel)}`;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`);
    onOpenChange(false);
  };

  const handleWishlist = () => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', { duration: 1800 });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden gap-0">
        <div className="relative h-52 sm:h-60 bg-gray-50">
          <img
            src={imgError ? fallbackSrc : product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#F05A32] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-6">
          <DialogHeader className="text-left space-y-1 mb-4">
            <p className="text-[10px] text-[#F05A32] font-['Inter'] font-medium uppercase tracking-wide">
              {categoryLabel}
            </p>
            <DialogTitle className="font-['Barlow_Condensed'] font-700 text-2xl text-[#2D2626] leading-tight">
              {product.name}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Product details for {product.name}, priced at {formatPrice(product.price)}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-400 font-['Inter']">({product.reviews} reviews)</span>
          </div>

          {product.description && (
            <p className="text-gray-600 text-sm font-['Inter'] leading-relaxed mb-4">{product.description}</p>
          )}

          <div className="flex items-center gap-3 mb-5">
            <span className="font-['Barlow'] font-700 text-2xl text-[#2D2626]">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through font-['Inter']">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleAddToCart} className="flex-1 btn-gwecely text-sm py-2.5 justify-center">
              <ShoppingCart size={16} />
              Add to Cart
            </button>
            <a
              href={whatsAppUrl(
                buildProductEnquiryMessage({
                  name: product.name,
                  id: product.id,
                  price: product.price,
                  category: categoryLabel,
                })
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-whatsapp text-sm py-2.5 justify-center"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Enquire
            </a>
            <button
              onClick={handleWishlist}
              className={`w-11 h-11 rounded-lg border flex items-center justify-center transition-colors ${
                wishlisted
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500'
              }`}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
