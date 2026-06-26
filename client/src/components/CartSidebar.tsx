/**
 * CartSidebar — Gwecely Limited
 * Design: Slides in from right, navy header, product list, totals, M-Pesa checkout CTA
 */

import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/products';
import { scrollToSection } from '@/lib/scroll';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function CartSidebar() {
  const { state, closeCart, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [state.isOpen]);

  const handleCheckout = () => {
    toast.success('Proceeding to checkout', {
      description: 'You will be redirected to M-Pesa payment.',
      duration: 3000,
    });
    // M-Pesa checkout placeholder
    setTimeout(() => {
      document.querySelector('#checkout')?.scrollIntoView({ behavior: 'smooth' });
      closeCart();
    }, 1000);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          state.isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        {/* Header */}
        <div className="bg-[#463C3C] text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} />
            <div>
              <h2 className="font-['Barlow_Condensed'] font-700 text-lg leading-tight">YOUR CART</h2>
              <p className="text-orange-100 text-xs font-['Inter']">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F5F3F2] flex items-center justify-center">
                <ShoppingCart size={28} className="text-[#F05A32]" />
              </div>
              <div>
                <p className="font-['Barlow_Condensed'] font-700 text-lg text-[#2D2626]">Your cart is empty</p>
                <p className="text-gray-500 text-sm font-['Inter'] mt-1">Add products from our shop to get started.</p>
              </div>
              <button
                onClick={() => {
                  closeCart();
                  scrollToSection('#shop');
                }}
                className="btn-gwecely text-sm py-2.5 px-6"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {state.items.map((item) => (
                <div key={item.id} className="p-4 flex gap-3">
                  {/* Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-['Inter'] font-600 text-sm text-[#2D2626] line-clamp-2 leading-snug mb-1">
                      {item.name}
                    </h4>
                    <p className="font-['Barlow'] font-700 text-[#F05A32] text-sm">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:border-[#F05A32] hover:text-[#F05A32] transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-sm font-['Inter'] font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:border-[#F05A32] hover:text-[#F05A32] transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                      <span className="text-xs text-gray-400 font-['Inter'] ml-1">
                        = {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors self-start flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer totals */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-100 p-5 flex-shrink-0 bg-[#F5F3F2]">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 font-['Inter']">Subtotal ({totalItems} items)</span>
              <span className="font-['Barlow'] font-700 text-[#2D2626]">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500 font-['Inter']">Delivery</span>
              <span className="text-xs text-[#F05A32] font-['Inter'] font-medium">Calculated at checkout</span>
            </div>
            <div className="flex justify-between items-center mb-4 pt-2 border-t border-gray-200">
              <span className="font-['Barlow_Condensed'] font-700 text-[#2D2626]">TOTAL</span>
              <span className="font-['Barlow_Condensed'] font-800 text-xl text-[#F05A32]">{formatPrice(totalPrice)}</span>
            </div>

            {/* M-Pesa badge */}
            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 font-['Inter']">
              <span className="bg-[#F05A32] text-white text-[10px] font-bold px-2 py-0.5 rounded">M-PESA</span>
              <span>Pay securely via M-Pesa, Bank Transfer, or Cash</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-gwecely justify-center text-sm py-3"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 transition-colors font-['Inter'] py-1"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
