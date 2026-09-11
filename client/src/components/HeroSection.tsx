/**
 * Hero — conversion-first garage positioning
 */

import { FileText, Phone } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { requestQuote } from '@/lib/booking';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#111111]">
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Gwecely Limited motor vehicle workshop in Mombasa"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.82) 50%, rgba(17,17,17,0.5) 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-2xl">
          <p className="text-[#B0B0B0] text-xs uppercase tracking-[0.14em] font-[family-name:var(--font-display)] font-semibold mb-4">
            Gwecely Limited · Mombasa
          </p>

          <h1 className="font-[family-name:var(--font-display)] font-bold text-[1.85rem] sm:text-4xl md:text-[2.75rem] text-white leading-[1.15] tracking-tight mb-5">
            Professional vehicle repair, panel beating &amp; restoration
          </h1>

          <p className="text-[#D0D0D0] text-base md:text-lg font-[family-name:var(--font-body)] leading-relaxed max-w-xl mb-8">
            Quality automotive repairs and bodywork backed by professional workmanship, transparent service, and
            dependable customer care — at our workshop behind CMC Motors.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button type="button" onClick={() => requestQuote()} className="btn-gwecely">
              <FileText size={16} />
              Get a quote
            </button>
            <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="btn-outline-gwecely">
              <Phone size={16} />
              Call us
            </a>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/15 pt-6 text-sm font-[family-name:var(--font-body)]">
            <div>
              <dt className="text-[#888] text-xs uppercase tracking-wider mb-1">Location</dt>
              <dd className="text-white/90">Behind CMC Motors, Mombasa</dd>
            </div>
            <div>
              <dt className="text-[#888] text-xs uppercase tracking-wider mb-1">Hours</dt>
              <dd className="text-white/90">Mon–Fri 8am–6pm · Sat 8am–2pm</dd>
            </div>
            <div>
              <dt className="text-[#888] text-xs uppercase tracking-wider mb-1">Phone</dt>
              <dd>
                <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="text-white/90 hover:text-white">
                  {BRAND.contact.phones[0]}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
