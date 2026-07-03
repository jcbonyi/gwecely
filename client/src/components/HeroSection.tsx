/**
 * HeroSection — Gwecely Limited
 * Automotive-first: garage repair, panel beating, spray painting
 */

import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, ChevronDown, MapPin } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { ROUTES } from '@/lib/routes';
import { goTo } from '@/lib/navigation';
import { bookService } from '@/lib/booking';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
        <div className="max-w-4xl">
          <p
            className={`inline-flex items-center gap-2 text-orange-200/90 text-sm font-['Inter'] mb-4 transition-all duration-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '80ms' }}
          >
            <MapPin size={15} className="text-[#F05A32] flex-shrink-0" />
            Conveniently located behind CMC Motors, Mombasa
          </p>

          <h1
            className={`font-['Barlow_Condensed'] font-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.02] mb-5 transition-all duration-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Mombasa&apos;s Trusted
            <br />
            <span className="text-[#F05A32]">Motor Vehicle Garage</span>
            <br />
            &amp; Panel Beating Experts
          </h1>

          <p
            className={`text-orange-50/95 text-lg md:text-xl font-['Inter'] max-w-2xl mb-3 leading-relaxed transition-all duration-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '180ms' }}
          >
            Panel beating, spray painting, accident repairs, servicing, and fleet maintenance — behind CMC Motors,
            Mombasa.
          </p>

          <p
            className={`text-orange-200/70 text-xs font-['Inter'] italic mb-8 transition-all duration-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '220ms' }}
          >
            {BRAND.tagline}
          </p>

          <div
            className={`flex flex-wrap gap-4 transition-all duration-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <button type="button" onClick={() => bookService('Vehicle Servicing')} className="btn-gwecely text-base">
              <Calendar size={18} />
              Book Garage Service
            </button>
            <button type="button" onClick={() => goTo(ROUTES.services)} className="btn-outline-gwecely text-base">
              Our Garage Services
              <ArrowRight size={16} />
            </button>
            <button type="button" onClick={() => goTo(ROUTES.hospitality)} className="btn-outline-gwecely text-base opacity-70 text-sm">
              Hospitality Supplies
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Explore Gwecely"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
