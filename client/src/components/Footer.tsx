/**
 * Footer — concise workshop footer
 */

import { Link } from 'wouter';
import { MessageCircle, Phone } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { FOOTER_LINKS, ROUTES } from '@/lib/routes';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import BrandLogo from '@/components/BrandLogo';
import OpeningHours from '@/components/OpeningHours';

export default function Footer() {
  return (
    <footer className="bg-[#141414]">
      <div className="container py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="mb-4">
              <BrandLogo size="footer" />
            </div>
            <p className="text-[#B0B0B0] text-sm font-[family-name:var(--font-body)] mb-4 leading-relaxed">
              {BRAND.subtitle}
            </p>
            <a
              href={whatsAppUrl(buildPhotoQuoteMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs"
            >
              <MessageCircle size={14} />
              Send photos on WhatsApp
            </a>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#C8C8C8] hover:text-white text-sm min-h-[44px] inline-flex items-center">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ROUTES.shop} className="text-[#888] hover:text-white text-sm min-h-[44px] inline-flex items-center">
                  Other business
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-2 text-sm font-[family-name:var(--font-body)] mb-4">
              <a
                href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-[#C8C8C8] hover:text-white min-h-[44px]"
              >
                <Phone size={13} className="text-[#F05030]" />
                {BRAND.contact.phones[0]}
              </a>
              <p className="text-[#B0B0B0] select-all leading-relaxed">{BRAND.contact.address}</p>
            </div>
            <OpeningHours className="text-[#B0B0B0] text-sm leading-relaxed" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-[#777] font-[family-name:var(--font-body)]">
          <p>
            © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
