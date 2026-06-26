/**
 * CheckoutSection — Gwecely Limited
 * Demo checkout with WhatsApp order handoff and M-Pesa API scaffold
 */

import DemoBanner from '@/components/DemoBanner';
import { useCart } from '@/contexts/CartContext';
import { generateRef, requestMpesaStk } from '@/lib/api';
import { formatPrice } from '@/lib/products';
import { buildOrderMessage, whatsAppUrl } from '@/lib/whatsapp';
import { CheckCircle, CreditCard, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface SavedOrder {
  ref: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  phone?: string;
}

export default function CheckoutSection() {
  const { state, totalPrice, clearCart } = useCart();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedOrder, setSavedOrder] = useState<SavedOrder | null>(null);

  if (state.items.length === 0 && !savedOrder) return null;

  const finalizeOrder = (orderPhone?: string) => {
    const ref = generateRef();
    const snapshot = {
      ref,
      items: state.items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
      total: totalPrice,
      phone: orderPhone,
    };
    setSavedOrder(snapshot);
    clearCart();
    return snapshot;
  };

  const handleMpesa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !/^(\+254|0)[17]\d{8}$/.test(phone.replace(/\s/g, ''))) {
      toast.error('Enter a valid M-Pesa phone number');
      return;
    }
    setLoading(true);

    const mpesa = await requestMpesaStk(phone.replace(/\s/g, ''), totalPrice);

    if (mpesa.ok) {
      finalizeOrder(phone);
      toast.success('M-Pesa STK Push sent!', { description: `Check your phone ${phone}.`, duration: 5000 });
    } else {
      const order = finalizeOrder(phone);
      toast.info('M-Pesa not live yet', {
        description: 'Use WhatsApp below to confirm your order and payment.',
        duration: 5000,
      });
      if (mpesa.error && mpesa.error !== 'offline') {
        console.warn('[checkout]', mpesa.error);
      }
      void order;
    }

    setLoading(false);
  };

  const handleWhatsAppOrder = () => {
    const ref = generateRef();
    const items = state.items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price }));
    const msg = buildOrderMessage(items, totalPrice, ref);
    window.open(whatsAppUrl(msg), '_blank', 'noopener,noreferrer');
    finalizeOrder();
    toast.success('Opening WhatsApp', { description: 'Send the message to confirm your order.' });
  };

  if (savedOrder) {
    const waMsg = buildOrderMessage(savedOrder.items, savedOrder.total, savedOrder.ref, savedOrder.phone);
    return (
      <section id="checkout" className="py-20 bg-white">
        <div className="container max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[#F05A32]/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-[#F05A32]" />
          </div>
          <DemoBanner className="mb-6 text-left" />
          <h2 className="font-['Barlow_Condensed'] font-800 text-3xl text-[#2D2626] mb-3">ORDER RECEIVED</h2>
          <p className="text-gray-600 font-['Inter'] mb-6">
            Share your reference with our team on WhatsApp to confirm stock and payment.
          </p>
          <div className="bg-[#F5F3F2] rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-500 font-['Inter'] mb-1">Order Reference</p>
            <p className="font-['Barlow_Condensed'] font-700 text-[#F05A32] text-xl">{savedOrder.ref}</p>
          </div>
          <a
            href={whatsAppUrl(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-['Barlow_Condensed'] font-700 text-sm px-6 py-3 rounded-lg transition-colors mb-4"
          >
            <MessageCircle size={18} />
            Confirm on WhatsApp
          </a>
          <button
            onClick={() => setSavedOrder(null)}
            className="btn-gwecely text-sm py-2.5 px-6 block mx-auto"
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" className="py-20 bg-white">
      <div className="container max-w-4xl mx-auto">
        <DemoBanner className="mb-8 max-w-2xl mx-auto" />
        <div className="mb-10 text-center">
          <h2 className="font-['Barlow_Condensed'] font-800 text-3xl md:text-4xl text-[#2D2626]">CHECKOUT</h2>
          <p className="text-gray-600 font-['Inter'] mt-2">Review your order — pay via WhatsApp or M-Pesa (when live)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#F5F3F2] rounded-2xl p-6">
            <h3 className="font-['Barlow_Condensed'] font-700 text-lg text-[#2D2626] mb-4">ORDER SUMMARY</h3>
            <div className="space-y-3 mb-4">
              {state.items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-['Inter'] font-medium text-[#2D2626] line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500 font-['Inter']">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-['Barlow'] font-700 text-sm text-[#F05A32]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-['Barlow_Condensed'] font-700 text-[#2D2626]">TOTAL</span>
                <span className="font-['Barlow_Condensed'] font-800 text-xl text-[#F05A32]">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-['Barlow_Condensed'] font-700 text-sm py-3.5 rounded-xl transition-colors"
            >
              <MessageCircle size={18} />
              Order via WhatsApp — {formatPrice(totalPrice)}
            </button>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#F05A32]/10 flex items-center justify-center">
                  <Phone size={20} className="text-[#F05A32]" />
                </div>
                <div>
                  <h3 className="font-['Barlow_Condensed'] font-700 text-lg text-[#2D2626]">M-PESA (COMING SOON)</h3>
                  <p className="text-gray-500 text-xs font-['Inter']">STK Push when Daraja credentials are added</p>
                </div>
              </div>

              <form onSubmit={handleMpesa}>
                <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] focus:ring-2 focus:ring-[#F05A32]/20 mb-4"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gwecely justify-center text-sm py-3 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={16} />
                      Request M-Pesa Payment
                    </>
                  )}
                </button>
              </form>

              <p className="flex items-center gap-2 mt-4 text-xs text-gray-500 font-['Inter']">
                <ShieldCheck size={14} className="text-[#F05A32]" />
                Falls back to WhatsApp if M-Pesa is not configured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
