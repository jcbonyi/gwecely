/**
 * HeroSection — professional workshop introduction
 */

import { Calendar, Phone } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { bookService } from '@/lib/booking';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#111111]">
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Gwecely workshop in Mombasa"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(17,17,17,0.94) 0%, rgba(17,17,17,0.78) 48%, rgba(17,17,17,0.45) 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-2xl">
          <p className="brand-tagline text-base md:text-lg mb-5">{BRAND.tagline}</p>

          <h1 className="font-[family-name:var(--font-display)] font-bold text-[2rem] sm:text-4xl md:text-5xl text-white leading-[1.15] tracking-tight mb-5">
            Motor vehicle garage &amp; panel beating in Mombasa
          </h1>

          <p className="text-[#D0D0D0] text-base md:text-lg font-[family-name:var(--font-body)] leading-relaxed max-w-xl mb-8">
            Accident repairs, spray painting, servicing, and fleet maintenance at our workshop behind CMC Motors on
            Bishop Macarios Road.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button type="button" onClick={() => bookService('Vehicle Servicing')} className="btn-gwecely">
              <Calendar size={16} />
              Book a service
            </button>
            <a
              href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
              className="btn-outline-gwecely"
            >
              <Phone size={16} />
              {BRAND.contact.phones[0]}
            </a>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-white/15 pt-6 text-sm font-[family-name:var(--font-body)]">
            <div>
              <dt className="text-[#888] text-xs uppercase tracking-wider mb-1">Location</dt>
              <dd className="text-white/90">Behind CMC Motors, Mombasa</dd>
            </div>
            <div>
              <dt className="text-[#888] text-xs uppercase tracking-wider mb-1">Weekdays</dt>
              <dd className="text-white/90">8:00 AM – 6:00 PM</dd>
            </div>
            <div>
              <dt className="text-[#888] text-xs uppercase tracking-wider mb-1">Saturday</dt>
              <dd className="text-white/90">8:00 AM – 2:00 PM</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
