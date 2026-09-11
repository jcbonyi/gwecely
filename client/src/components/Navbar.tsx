/**
 * Navbar — slim primary nav, commerce icons on shop (or when active)
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
    const handleScroll = () => setScrolled(window.scrollY > 60);
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
  const navSolid = scrolled || !isHome;

  return (
    <>
      <div className="bg-[#463C3C] text-white text-sm py-2 hidden md:block">
        <div className="container flex justify-between items-center gap-4">
          <span className="text-orange-100/90 truncate font-[family-name:var(--font-body)]">
            Motor vehicle garage &amp; panel beating — Mombasa
          </span>
          <div className="flex items-center gap-5 flex-shrink-0">
            <a
              href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white text-orange-100 transition-colors"
            >
              <Phone size={13} />
              {BRAND.contact.phones[0]}
            </a>
            <a href={`mailto:${BRAND.contact.emails[0]}`} className="text-orange-100 hover:text-white transition-colors">
              {BRAND.contact.emails[0]}
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`fixed w-full z-50 transition-all duration-200 ${
          navSolid
            ? 'bg-[#463C3C]/97 backdrop-blur-xl shadow-lg top-0'
            : 'bg-[#463C3C]/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none top-0 md:top-[36px]'
        }`}
        aria-label="Main navigation"
      >
        <div className="container">
          <div className="flex items-center justify-between h-[4.5rem] sm:h-20">
            <Link href={ROUTES.home} className="flex items-center group min-w-0 flex-shrink-0" aria-label="Gwecely home">
              <BrandLogo size="nav" />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActiveRoute(location, link.href) ? 'page' : undefined}
                  className={`px-3.5 py-2 text-white/90 hover:text-white font-[family-name:var(--font-body)] text-sm font-medium transition-colors duration-150 hover:bg-white/10 rounded-md ${
                    isActiveRoute(location, link.href) ? 'nav-link-active' : ''
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
                    className="relative p-2.5 text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ''}`}
                    aria-expanded={wishlistOpen}
                  >
                    <Heart size={20} />
                    {wishlistCount > 0 && (
                      <span className="absolute top-1 right-1 bg-[#F05A32] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={toggleCart}
                    className="relative p-2.5 text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={`Cart${totalItems ? `, ${totalItems} items` : ''}`}
                  >
                    <ShoppingCart size={20} />
                    {totalItems > 0 && (
                      <span className="absolute top-1 right-1 bg-[#F0826E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </>
              )}

              <Link href={ROUTES.book} className="hidden md:flex btn-gwecely text-sm py-2 px-4">
                Book Repair
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 text-white hover:bg-white/10 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
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
            className="lg:hidden fixed inset-0 top-[4.5rem] sm:top-20 bg-black/40 z-[-1]"
            onClick={closeMobile}
            aria-hidden
          />
        )}

        <div
          className={`lg:hidden bg-[#463C3C] border-t border-white/10 overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="container py-4 flex flex-col gap-1 max-h-[calc(80vh-1rem)] overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                aria-current={isActiveRoute(location, link.href) ? 'page' : undefined}
                className={`px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-[family-name:var(--font-body)] text-base font-medium transition-colors min-h-[48px] flex items-center ${
                  isActiveRoute(location, link.href) ? 'nav-link-active' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-white/35 font-[family-name:var(--font-body)]">
              More
            </p>
            {NAV_SECONDARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                aria-current={isActiveRoute(location, link.href) ? 'page' : undefined}
                className={`px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg font-[family-name:var(--font-body)] text-sm transition-colors min-h-[44px] flex items-center ${
                  isActiveRoute(location, link.href) ? 'nav-link-active' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
              <Link href={ROUTES.book} onClick={closeMobile} className="btn-gwecely w-full justify-center text-sm py-3">
                Book Repair
              </Link>
              <MobileNavbarAuth onNavigate={closeMobile} />
              <a
                href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
                className="flex items-center gap-2 px-4 py-3 text-orange-100 text-sm min-h-[48px]"
              >
                <Phone size={16} />
                {BRAND.contact.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
