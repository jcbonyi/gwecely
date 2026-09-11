/**
 * Hero — classier photo treatment, compact conversion fold
 */

import { FileText, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import { BRAND } from '@/lib/brand';
import { ROUTES } from '@/lib/routes';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import { formatOpeningHoursLines } from '@/lib/openingHours';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative max-h-[78vh] min-h-[520px] md:min-h-[560px] flex items-center overflow-hidden bg-[#141414]"
    >
      <div className="absolute inset-0" aria-hidden>
        <picture>
          <source
            type="image/webp"
            srcSet="/images/hero-400.webp 400w, /images/hero-800.webp 800w, /images/hero-1920.webp 1920w"
            sizes="100vw"
          />
          <source
            type="image/jpeg"
            srcSet="/images/hero-400.jpg 400w, /images/hero-800.jpg 800w, /images/hero-1920.jpg 1920w"
            sizes="100vw"
          />
          <img
            src="/images/hero-1920.jpg"
            alt="Vehicle bodywork and panel repairs at the Gwecely workshop behind CMC Motors, Mombasa"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.52]"
            width={1920}
            height={1067}
            fetchPriority="high"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </picture>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(20,20,20,0.88) 0%, rgba(20,20,20,0.55) 48%, rgba(20,20,20,0.35) 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 pt-24 pb-10 md:pt-28 md:pb-14">
        <div className="max-w-2xl">
          <p className="text-[#B0B0B0] text-xs uppercase tracking-[0.14em] font-[family-name:var(--font-display)] font-semibold mb-4">
            {BRAND.legalName} · Mombasa
          </p>

          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(1.75rem,5vw,3.25rem)] text-white leading-[1.1] tracking-[-0.02em] mb-4">
            Accident repairs &amp; vehicle bodywork in Mombasa
          </h1>

          <p className="text-[#D8D8D8] text-base font-[family-name:var(--font-body)] leading-relaxed max-w-xl mb-7">
            Panel beating, spray painting, mechanical repairs and servicing behind CMC Motors.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
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
              Get a quote
            </Link>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/12 pt-5 text-sm font-[family-name:var(--font-body)]">
            <div>
              <dt className="text-[#8A8A8A] text-xs uppercase tracking-wider mb-1">Workshop</dt>
              <dd className="text-white/90">Behind CMC Motors, Mombasa</dd>
            </div>
            <div>
              <dt className="text-[#8A8A8A] text-xs uppercase tracking-wider mb-1">Hours</dt>
              <dd className="text-white/90">{formatOpeningHoursLines().slice(0, 2).join(' · ')}</dd>
            </div>
            <div>
              <dt className="text-[#8A8A8A] text-xs uppercase tracking-wider mb-1">Call</dt>
              <dd>
                <a
                  href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
                  className="text-white/90 hover:text-white min-h-[44px] inline-flex items-center"
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
