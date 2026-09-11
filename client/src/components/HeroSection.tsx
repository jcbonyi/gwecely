/**
 * Hero — WhatsApp-first conversion
 */

import { FileText, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { ROUTES } from '@/lib/routes';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[78vh] flex items-center overflow-hidden bg-[#111111]">
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Gwecely Limited workshop behind CMC Motors, Mombasa"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          fetchPriority="high"
          width={1600}
          height={900}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(17,17,17,0.96) 0%, rgba(17,17,17,0.85) 55%, rgba(17,17,17,0.55) 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="max-w-2xl">
          <p className="text-[#B0B0B0] text-xs uppercase tracking-[0.12em] font-[family-name:var(--font-display)] font-semibold mb-4">
            {BRAND.legalName} · Mombasa
          </p>

          <h1 className="font-[family-name:var(--font-display)] font-bold text-[1.75rem] sm:text-4xl md:text-[2.5rem] text-white leading-[1.18] tracking-tight mb-5">
            Accident repairs and vehicle bodywork in Mombasa
          </h1>

          <p className="text-[#D0D0D0] text-base md:text-lg font-[family-name:var(--font-body)] leading-relaxed max-w-xl mb-8">
            Panel beating, spray painting, mechanical repairs and servicing from a workshop behind CMC Motors. Send
            photos of the damage on WhatsApp or request an inspection.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={whatsAppUrl(buildPhotoQuoteMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
              data-conversion="whatsapp-photos"
            >
              <MessageCircle size={16} />
              Send photos on WhatsApp
            </a>
            <Link href={ROUTES.quote} className="btn-gwecely text-sm" data-conversion="request-quote">
              <FileText size={16} />
              Request a quote
            </Link>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/15 pt-6 text-sm font-[family-name:var(--font-body)]">
            <div>
              <dt className="text-[#888] text-xs uppercase tracking-wider mb-1">Workshop</dt>
              <dd className="text-white/90">Behind CMC Motors, Mombasa</dd>
            </div>
            <div>
              <dt className="text-[#888] text-xs uppercase tracking-wider mb-1">Hours</dt>
              <dd className="text-white/90">Mon–Fri 8am–6pm · Sat 8am–2pm</dd>
            </div>
            <div>
              <dt className="text-[#888] text-xs uppercase tracking-wider mb-1">Call</dt>
              <dd>
                <a
                  href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
                  className="text-white/90 hover:text-white"
                >
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
