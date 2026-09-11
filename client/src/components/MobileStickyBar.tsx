/**
 * MobileStickyBar — Call · WhatsApp · Get a Quote
 */

import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { FileText, Phone } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { BRAND } from '@/lib/brand';
import { ROUTES } from '@/lib/routes';
import { buildQuoteQuickMessage, whatsAppUrl } from '@/lib/whatsapp';

export default function MobileStickyBar() {
  const [location] = useLocation();
  const hide =
    location === ROUTES.quote ||
    location === ROUTES.book ||
    location.startsWith('/admin') ||
    location.startsWith('/sign-');

  useEffect(() => {
    if (hide) {
      document.body.classList.remove('has-mobile-sticky');
      return;
    }
    document.body.classList.add('has-mobile-sticky');
    return () => document.body.classList.remove('has-mobile-sticky');
  }, [hide]);

  if (hide) return null;

  return (
    <div className="mobile-sticky-bar md:hidden" role="navigation" aria-label="Quick contact">
      <a
        href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
        className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-1.5 border border-white/25 text-white text-xs font-[family-name:var(--font-display)] font-semibold uppercase tracking-wide"
      >
        <Phone size={15} />
        Call
      </a>
      <a
        href={whatsAppUrl(buildQuoteQuickMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-1.5 bg-[#25d366] text-white text-xs font-[family-name:var(--font-display)] font-semibold uppercase tracking-wide"
      >
        <WhatsAppIcon className="w-4 h-4" />
        WhatsApp
      </a>
      <Link
        href={ROUTES.quote}
        className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-1.5 bg-[#F05030] text-white text-xs font-[family-name:var(--font-display)] font-semibold uppercase tracking-wide"
      >
        <FileText size={15} />
        Quote
      </Link>
    </div>
  );
}
