/**
 * Desktop WhatsApp FAB — direct photo deep-link (no menu clutter).
 * Hidden on mobile where the sticky bar is the single WhatsApp CTA.
 */

import WhatsAppIcon from '@/components/WhatsAppIcon';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  return (
    <a
      href={whatsAppUrl(buildPhotoQuoteMessage())}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab"
      aria-label="Send damage photos on WhatsApp"
      data-conversion="whatsapp-fab"
    >
      <span className="wa-fab-button">
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </span>
    </a>
  );
}
