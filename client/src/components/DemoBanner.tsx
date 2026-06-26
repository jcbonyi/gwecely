/**
 * DemoBanner — indicates mock booking/checkout flows on the demo site
 */

import { Info } from 'lucide-react';

interface DemoBannerProps {
  className?: string;
  compact?: boolean;
}

export default function DemoBanner({ className = '', compact = false }: DemoBannerProps) {
  return (
    <div
      role="status"
      className={`flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 ${
        compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'
      } ${className}`}
    >
      <Info size={compact ? 14 : 16} className="flex-shrink-0 mt-0.5" aria-hidden />
      <p className="font-['Inter'] leading-relaxed">
        <strong>Demo mode:</strong> This is a preview site. Bookings and M-Pesa checkout are not connected to live systems yet — use phone or WhatsApp to confirm orders.
      </p>
    </div>
  );
}
