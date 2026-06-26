/**
 * Navbar — Gwecely Limited
 */

import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import { BRAND } from '@/lib/brand';
import { scrollToSection } from '@/lib/scroll';
import BrandLogo from '@/components/BrandLogo';
import { Heart, Menu, Phone, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Shop', href: '#shop' },
  { label: 'Book', href: '#booking' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const { count: wishlistCount, toggleWishlist, isOpen: wishlistOpen } = useWishlist();
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  const sectionId = (href: string) => href.replace('#', '');

  return (
    <>
      <div className="bg-[#463C3C] text-white text-sm py-2 hidden md:block">
        <div className="container flex justify-between items-center gap-4">
          <span className="text-orange-100 italic truncate">&ldquo;{BRAND.tagline}&rdquo;</span>
          <div className="flex items-center gap-5 flex-shrink-0">
            <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-white text-orange-100 transition-colors">
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
          scrolled
            ? 'bg-[#463C3C]/97 backdrop-blur-xl shadow-lg top-0'
            : 'bg-[#463C3C]/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none top-0 md:top-[36px]'
        }`}
        aria-label="Main navigation"
      >
        <div className="container">
          <div className="flex items-center justify-between h-[4.5rem] sm:h-20">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex items-center group min-w-0 flex-shrink-0"
              aria-label="Gwecely home"
            >
              <BrandLogo size="nav" />
            </a>

            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  aria-current={activeSection === sectionId(link.href) ? 'page' : undefined}
                  className={`px-3 py-2 text-white/90 hover:text-white font-['Inter'] text-sm font-medium transition-colors duration-150 hover:bg-white/10 rounded-md ${
                    activeSection === sectionId(link.href) ? 'nav-link-active' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
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

              <a
                href="#booking"
                onClick={(e) => { e.preventDefault(); handleNavClick('#booking'); }}
                className="hidden md:flex btn-gwecely text-sm py-2 px-4"
              >
                Book Service
              </a>

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
          <div className="lg:hidden fixed inset-0 top-[4.5rem] sm:top-20 bg-black/40 z-[-1]" onClick={() => setMobileOpen(false)} aria-hidden />
        )}

        <div
          className={`lg:hidden bg-[#463C3C] border-t border-white/10 overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="container py-4 flex flex-col gap-1 max-h-[calc(80vh-1rem)] overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                aria-current={activeSection === sectionId(link.href) ? 'page' : undefined}
                className={`px-4 py-3.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-['Inter'] text-base font-medium transition-colors min-h-[48px] flex items-center ${
                  activeSection === sectionId(link.href) ? 'nav-link-active' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
              <a
                href="#booking"
                onClick={(e) => { e.preventDefault(); handleNavClick('#booking'); }}
                className="btn-gwecely w-full justify-center text-sm py-3"
              >
                Book Service
              </a>
              <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-2 px-4 py-3 text-orange-100 text-sm min-h-[48px]">
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
