/**
 * HeroSection — Gwecely Limited
 * Design: Full-bleed automotive workshop background, dark overlay gradient,
 * bold Barlow Condensed headline, dual CTA buttons
 */

import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, ChevronDown, ShoppingBag } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { scrollToSection as goToSection } from '@/lib/scroll';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => goToSection(id);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(45,38,38,0.92) 0%, rgba(70,60,60,0.85) 50%, rgba(45,38,38,0.90) 100%), url('${IMAGES.hero}') center/cover no-repeat`,
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-28 bg-[#F5F3F2]"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 0 100%)' }}
      />

      <div className="container relative z-10 pt-32 pb-32 md:pt-40 md:pb-40">
        <div className="max-w-3xl">
          <div
            className={`inline-flex items-center gap-2 glass-card px-4 py-2 mb-6 transition-all duration-500 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#F05A32] animate-pulse" />
            <span className="text-orange-50 text-sm font-['Inter'] font-medium tracking-wide">
              Registered in Kenya · Companies Act, 2015
            </span>
          </div>

          <h1
            className={`font-['Barlow_Condensed'] font-800 text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-6 transition-all duration-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            YOU DREAM IT.
            <br />
            <span className="text-[#F05A32]">WE PROVIDE IT.</span>
            <br />
            YOU LIVE IT.
          </h1>

          <p
            className={`text-orange-200/90 text-sm font-['Inter'] italic mb-3 transition-all duration-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '180ms' }}
          >
            {BRAND.taglineSw}
          </p>

          <p
            className={`text-orange-50 text-lg md:text-xl font-['Inter'] max-w-xl mb-10 leading-relaxed transition-all duration-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {BRAND.subtitle}. Based in Mombasa — automotive workshop and general supplies for businesses across Kenya.
          </p>

          <div
            className={`flex flex-wrap gap-4 transition-all duration-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <button
              onClick={() => scrollToSection('#booking')}
              className="btn-gwecely text-base"
            >
              <Calendar size={18} />
              Book Vehicle Service
            </button>
            <button
              onClick={() => scrollToSection('#shop')}
              className="btn-outline-gwecely text-base"
            >
              <ShoppingBag size={18} />
              Shop Products
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('#services')}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
