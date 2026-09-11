/**
 * Navbar — automotive journey only (no cart/wishlist distraction)
 */

import { BRAND } from '@/lib/brand';
import { NAV_LINKS, OTHER_BUSINESS_LINKS, ROUTES, isActiveRoute } from '@/lib/routes';
import BrandLogo from '@/components/BrandLogo';
import { Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const isHome = location === ROUTES.home;
  const navSolid = scrolled || !isHome || mobileOpen;

  return (
    <>
      <div className="bg-[#111111] text-[#B0B0B0] text-xs py-2 border-b border-white/5 hidden md:block">
        <div className="container flex flex-wrap justify-between items-center gap-2">
          <span className="font-[family-name:var(--font-body)]">
            Mombasa vehicle repair workshop · Behind CMC Motors
          </span>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone size={12} className="text-[#F05030]" />
              {BRAND.contact.phones[0]}
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`fixed w-full z-50 transition-colors duration-200 ${
          navSolid ? 'bg-[#111111] top-0 shadow-sm' : 'bg-[#111111]/90 md:bg-transparent top-0 md:top-[33px]'
        }`}
        aria-label="Main navigation"
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 gap-3">
            <Link href={ROUTES.home} className="flex items-center min-w-0 flex-shrink-0" aria-label="Gwecely home">
              <BrandLogo size="nav" />
            </Link>

            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActiveRoute(location, link.href) ? 'page' : undefined}
                  className={`px-3 py-2 text-white/75 hover:text-white font-[family-name:var(--font-body)] text-sm font-medium transition-colors ${
                    isActiveRoute(location, link.href) ? 'nav-link-active !text-white' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href={ROUTES.quote} className="hidden sm:flex btn-gwecely text-xs py-2 px-3.5">
                Get a Quote
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="lg:hidden fixed inset-0 top-16 bg-black/50 z-[-1]"
            onClick={closeMobile}
            aria-hidden
          />
        )}

        <div
          className={`lg:hidden bg-[#111111] border-t border-white/10 overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="container py-3 flex flex-col gap-0.5 max-h-[calc(80vh-1rem)] overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className={`px-3 py-3 text-white/85 hover:text-white font-[family-name:var(--font-body)] text-base min-h-[48px] flex items-center ${
                  isActiveRoute(location, link.href) ? 'text-white border-l-2 border-[#F05030] pl-2.5' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ROUTES.quote}
              onClick={closeMobile}
              className="btn-gwecely w-full justify-center text-sm py-3 mt-2"
            >
              Get a Quote
            </Link>
            <p className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-widest text-white/35">Other business</p>
            {OTHER_BUSINESS_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="px-3 py-2.5 text-white/55 hover:text-white font-[family-name:var(--font-body)] text-sm min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
