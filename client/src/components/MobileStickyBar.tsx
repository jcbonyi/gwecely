/**
 * MobileStickyBar — persistent Book + WhatsApp on small screens
 */

import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Calendar } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { ROUTES } from '@/lib/routes';
import { buildServiceBookingQuickMessage, whatsAppUrl } from '@/lib/whatsapp';

export default function MobileStickyBar() {
  const [location] = useLocation();
  const hide =
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
    <div className="mobile-sticky-bar md:hidden" role="navigation" aria-label="Quick actions">
      <Link href={ROUTES.book} className="btn-gwecely flex-1 justify-center text-sm py-3 min-h-[48px]">
        <Calendar size={17} />
        Book Repair
      </Link>
      <a
        href={whatsAppUrl(buildServiceBookingQuickMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp flex-1 justify-center text-sm py-3 min-h-[48px]"
      >
        <WhatsAppIcon className="w-[18px] h-[18px]" />
        WhatsApp
      </a>
    </div>
  );
}
