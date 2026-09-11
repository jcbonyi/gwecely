/**
 * WhatsApp FAB — photo quote primary
 */

import { useEffect, useRef, useState } from 'react';
import { FileText, MessageCircle, X } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { buildGeneralEnquiryMessage, buildPhotoQuoteMessage, buildQuoteQuickMessage, whatsAppUrl } from '@/lib/whatsapp';

const QUICK_ACTIONS = [
  {
    id: 'photos',
    label: 'Send damage photos',
    icon: MessageCircle,
    message: () => buildPhotoQuoteMessage(),
  },
  {
    id: 'quote',
    label: 'Request a quotation',
    icon: FileText,
    message: () => buildQuoteQuickMessage(),
  },
  {
    id: 'general',
    label: 'General enquiry',
    icon: MessageCircle,
    message: () => buildGeneralEnquiryMessage(),
  },
] as const;

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="wa-fab">
      <div className={`wa-fab-menu ${open ? 'wa-fab-menu-open' : ''}`} role="menu" aria-hidden={!open}>
        <p className="wa-fab-menu-title">Chat with Gwecely</p>
        {QUICK_ACTIONS.map(({ id, label, icon: Icon, message }) => (
          <a
            key={id}
            href={whatsAppUrl(message())}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            className="wa-fab-menu-item"
            onClick={() => setOpen(false)}
            data-conversion={`whatsapp-fab-${id}`}
          >
            <span className="wa-fab-menu-icon">
              <Icon size={18} />
            </span>
            {label}
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close WhatsApp menu' : 'Open WhatsApp options'}
        aria-expanded={open}
        aria-haspopup="menu"
        className="wa-fab-button"
      >
        {open ? <X size={26} className="text-white" /> : <WhatsAppIcon className="w-7 h-7 text-white" />}
      </button>
    </div>
  );
}
