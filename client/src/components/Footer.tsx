/**
 * Footer — automotive-first, honest contact block
 */

import { Link } from 'wouter';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { FOOTER_LINKS, OTHER_BUSINESS_LINKS, ROUTES, MAPS_DIRECTIONS_URL } from '@/lib/routes';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import BrandLogo from '@/components/BrandLogo';
import OpeningHours from '@/components/OpeningHours';

const GARAGE_SERVICES = [
  { label: 'Accident Repairs', href: '/services/accident-repairs' },
  { label: 'Panel Beating', href: '/services/panel-beating' },
  { label: 'Spray Painting', href: '/services/spray-painting' },
  { label: 'Mechanical Repairs', href: '/services/mechanical-repairs' },
  { label: 'Vehicle Servicing', href: '/services/vehicle-servicing' },
  { label: 'Fleet Maintenance', href: '/services/fleet-maintenance' },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#111111]">
      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-5">
              <BrandLogo size="footer" />
            </div>
            <p className="text-[#D0D0D0] text-sm font-[family-name:var(--font-body)] mb-2">{BRAND.subtitle}</p>
            <p className="text-[#A8A8A8] text-sm font-[family-name:var(--font-body)] leading-relaxed mb-5">
              {BRAND.about}
            </p>
            <div className="space-y-2 text-sm font-[family-name:var(--font-body)]">
              {BRAND.contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-[#C8C8C8] hover:text-white"
                >
                  <Phone size={13} className="text-[#F05030]" />
                  {phone}
                </a>
              ))}
              <a
                href={whatsAppUrl(buildPhotoQuoteMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#C8C8C8] hover:text-white"
              >
                <MessageCircle size={13} className="text-[#25d366]" />
                WhatsApp
              </a>
              <a
                href={`mailto:${BRAND.contact.emails[0]}`}
                className="flex items-center gap-2 text-[#C8C8C8] hover:text-white"
              >
                <Mail size={13} className="text-[#F05030]" />
                {BRAND.contact.emails[0]}
              </a>
              <p className="flex items-start gap-2 text-[#C8C8C8]">
                <MapPin size={13} className="text-[#F05030] mt-0.5 flex-shrink-0" />
                <span className="select-all">
                  {BRAND.contact.address}
                  <br />
                  {BRAND.contact.poBox}
                </span>
              </p>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F05030] text-xs font-semibold hover:underline inline-block pt-1"
              >
                Get directions
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-sm mb-4 uppercase tracking-wide">
              Explore
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#C8C8C8] hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-sm mb-4 uppercase tracking-wide">
              Garage services
            </h3>
            <ul className="space-y-2">
              {GARAGE_SERVICES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#C8C8C8] hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-sm mb-4 uppercase tracking-wide">
              Hours
            </h3>
            <OpeningHours className="text-[#C8C8C8] text-sm font-[family-name:var(--font-body)] leading-relaxed mb-6" />
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-sm mb-3 uppercase tracking-wide">
              Other business
            </h3>
            <ul className="space-y-2">
              {OTHER_BUSINESS_LINKS.filter((l) => l.href !== ROUTES.insuranceClaims).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#888] hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
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
