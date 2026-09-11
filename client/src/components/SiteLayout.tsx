/**
 * SiteLayout — shared shell for all public pages (nav, cart, footer, etc.)
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

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    registerNavigate(setLocation);
  }, [setLocation]);

  useEffect(() => {
    applyPendingScroll(location);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F5F3F2]">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Navbar />
      <CartSidebar />
      <WishlistSidebar />
      <WhatsAppButton />
      <MobileStickyBar />
      <BackToTop />

      {children}

      <Footer />
    </div>
  );
}
