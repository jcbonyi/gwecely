/**
 * Sticky WhatsApp — mobile only
 */

import { useEffect } from 'react';
import { useLocation } from 'wouter';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { ROUTES } from '@/lib/routes';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';

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
    <div className="mobile-sticky-bar md:hidden" role="navigation" aria-label="WhatsApp">
      <a
        href={whatsAppUrl(buildPhotoQuoteMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-[family-name:var(--font-display)] font-semibold tracking-wide px-3"
        data-conversion="whatsapp-sticky"
      >
        <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
        WhatsApp photos
      </a>
    </div>
  );
}
