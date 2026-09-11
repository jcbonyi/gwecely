/**
 * Navbar — dark brand bar aligned to logo surfaces
 */

import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { BRAND } from '@/lib/brand';
import { NAV_LINKS, NAV_SECONDARY_LINKS, ROUTES, isActiveRoute } from '@/lib/routes';
import BrandLogo from '@/components/BrandLogo';
import NavbarAuth, { MobileNavbarAuth } from '@/components/NavbarAuth';
import { Heart, Menu, Phone, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { totalItems, toggleCart } = useCart();
  const { count: wishlistCount, toggleWishlist, isOpen: wishlistOpen } = useWishlist();

  const onShop = location === ROUTES.shop || location.startsWith(`${ROUTES.shop}/`);
  const showCommerce = onShop || totalItems > 0 || wishlistCount > 0;

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
      <div className="bg-[#111111] text-[#B0B0B0] text-xs py-2 hidden md:block border-b border-white/5">
        <div className="container flex justify-between items-center gap-4">
          <span className="truncate font-[family-name:var(--font-body)]">
            Workshop behind CMC Motors · Mombasa
          </span>
          <a
            href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors flex-shrink-0"
          >
            <Phone size={12} className="text-[#F05030]" />
            {BRAND.contact.phones[0]}
          </a>
        </div>
      </div>

      <nav
        className={`fixed w-full z-50 transition-colors duration-200 ${
          navSolid ? 'bg-[#111111] top-0 shadow-sm' : 'bg-[#111111]/90 md:bg-transparent top-0 md:top-[33px]'
        }`}
        aria-label="Main navigation"
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 sm:h-[4.25rem]">
            <Link href={ROUTES.home} className="flex items-center min-w-0 flex-shrink-0" aria-label="Gwecely home">
              <BrandLogo size="nav" />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
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

            <div className="flex items-center gap-1 sm:gap-2">
              <NavbarAuth />
              {showCommerce && (
                <>
                  <button
                    onClick={toggleWishlist}
                    className="relative p-2.5 text-white/70 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ''}`}
                    aria-expanded={wishlistOpen}
                  >
                    <Heart size={18} />
                    {wishlistCount > 0 && (
                      <span className="absolute top-1 right-1 bg-[#F05030] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={toggleCart}
                    className="relative p-2.5 text-white/70 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={`Cart${totalItems ? `, ${totalItems} items` : ''}`}
                  >
                    <ShoppingCart size={18} />
                    {totalItems > 0 && (
                      <span className="absolute top-1 right-1 bg-[#F05030] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </>
              )}

              <Link href={ROUTES.book} className="hidden md:flex btn-gwecely text-xs py-2 px-3.5">
                Book
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
            className="lg:hidden fixed inset-0 top-16 sm:top-[4.25rem] bg-black/50 z-[-1]"
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
                aria-current={isActiveRoute(location, link.href) ? 'page' : undefined}
                className={`px-3 py-3 text-white/85 hover:text-white font-[family-name:var(--font-body)] text-base min-h-[48px] flex items-center ${
                  isActiveRoute(location, link.href) ? 'text-white border-l-2 border-[#F05030] pl-2.5' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <p className="px-3 pt-3 pb-1 text-[10px] uppercase tracking-widest text-white/35">More</p>
            {NAV_SECONDARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="px-3 py-2.5 text-white/65 hover:text-white font-[family-name:var(--font-body)] text-sm min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-white/10 space-y-2 px-1 pb-2">
              <Link href={ROUTES.book} onClick={closeMobile} className="btn-gwecely w-full justify-center text-sm py-3">
                Book a service
              </Link>
              <MobileNavbarAuth onNavigate={closeMobile} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
