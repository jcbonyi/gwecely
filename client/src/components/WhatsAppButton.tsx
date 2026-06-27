/**
 * WhatsAppButton — floating action with quick message options
 */

import { useEffect, useRef, useState } from 'react';
import { Calendar, MessageCircle, ShoppingBag, X } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import {
  buildGeneralEnquiryMessage,
  buildServiceBookingQuickMessage,
  whatsAppUrl,
} from '@/lib/whatsapp';

const QUICK_ACTIONS = [
  {
    id: 'general',
    label: 'General enquiry',
    icon: MessageCircle,
    message: () => buildGeneralEnquiryMessage(),
  },
  {
    id: 'booking',
    label: 'Book a service',
    icon: Calendar,
    message: () => buildServiceBookingQuickMessage(),
  },
  {
    id: 'order',
    label: 'Shop / spare parts',
    icon: ShoppingBag,
    message: () => buildGeneralEnquiryMessage('Spare Parts & Shop Order'),
  },
] as const;

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
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
      <div
        className={`wa-fab-menu ${open ? 'wa-fab-menu-open' : ''}`}
        role="menu"
        aria-hidden={!open}
      >
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
        aria-label={open ? 'Close WhatsApp menu' : 'Open WhatsApp chat options'}
        aria-expanded={open}
        aria-haspopup="menu"
        className="wa-fab-button"
      >
        {open ? <X size={26} className="text-white" /> : <WhatsAppIcon className="w-7 h-7 text-white" />}
      </button>
    </div>
  );
}
