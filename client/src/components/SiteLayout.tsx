/**
 * SiteLayout — automotive shell (cart only on shop)
 */

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import WishlistSidebar from '@/components/WishlistSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import MobileStickyBar from '@/components/MobileStickyBar';
import BackToTop from '@/components/BackToTop';
import { applyPendingScroll, registerNavigate } from '@/lib/navigation';
import { ROUTES } from '@/lib/routes';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [location, setLocation] = useLocation();
  const onShop = location === ROUTES.shop || location.startsWith(`${ROUTES.shop}/`);

  useEffect(() => {
    registerNavigate(setLocation);
  }, [setLocation]);

  useEffect(() => {
    applyPendingScroll(location);
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Navbar />
      {onShop && (
        <>
          <CartSidebar />
          <WishlistSidebar />
        </>
      )}
      <WhatsAppButton />
      <MobileStickyBar />
      <BackToTop />

      {children}

      <Footer />
    </div>
  );
}
