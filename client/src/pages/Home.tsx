/**
 * Home Page — Gwecely Limited
 * Design: Kenyan Marketplace Energy
 * Assembles all sections: Hero → Services → Shop → Booking → Testimonials → Gallery → Contact → Footer
 */

import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import CartSidebar from "@/components/CartSidebar";
import CheckoutSection from "@/components/CheckoutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import ShopSection from "@/components/ShopSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import WishlistSidebar from "@/components/WishlistSidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F3F2]">
      <a href="#main" className="skip-link">Skip to main content</a>

      <Navbar />
      <CartSidebar />
      <WishlistSidebar />
      <WhatsAppButton />
      <BackToTop />

      <main id="main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ShopSection />
        <BookingSection />
        <TestimonialsSection />
        <GallerySection />
        <CheckoutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
