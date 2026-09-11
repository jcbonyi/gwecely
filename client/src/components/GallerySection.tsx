/**
 * Our Work — editorial gallery with lightbox
 */

import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { MessageCircle, X } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { ROUTES } from '@/lib/routes';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import { BEFORE_AFTER_PAIRS, pairCaption } from '@/lib/beforeAfter';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

const WORKSHOP_GALLERY = [
  {
    src: '/images/hero-800.jpg',
    alt: 'Gwecely Limited workshop area behind CMC Motors, Mombasa',
    caption: 'Workshop — behind CMC Motors, Mombasa',
  },
  {
    src: '/images/workshop-bay-800.jpg',
    alt: 'Vehicles in the Gwecely workshop bay',
    caption: 'Workshop bay',
  },
  {
    src: '/images/panel-800.jpg',
    alt: 'Close-up of panel work at Gwecely workshop',
    caption: 'Panel work',
  },
  {
    src: '/images/spray-800.jpg',
    alt: 'Spray painting work at Gwecely workshop',
    caption: 'Spray painting',
  },
  {
    src: IMAGES.services.mechanical,
    alt: 'Mechanical work in the Gwecely workshop',
    caption: 'Mechanical work',
  },
  {
    src: '/gallery/wheel-brake-service.jpg',
    alt: 'Wheel and brake service at Gwecely workshop',
    caption: 'Brake and wheel service',
  },
] as const;

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const showBa = BEFORE_AFTER_PAIRS.length > 0;

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % WORKSHOP_GALLERY.length));
      if (e.key === 'ArrowLeft')
        setLightbox((i) => (i === null ? i : (i - 1 + WORKSHOP_GALLERY.length) % WORKSHOP_GALLERY.length));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  return (
    <section id="gallery" className="py-14 md:py-20 bg-white">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <p className="section-eyebrow">Our work</p>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading mb-4">
            Workshop photographs
          </h1>
          <p className="text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed text-base">
            Photographs from the Gwecely workshop in Mombasa. Open an image for a closer look.
          </p>
        </div>

        {showBa ? (
          <div className="mb-14">
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-xl text-[#111111] mb-6">
              Before &amp; after
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BEFORE_AFTER_PAIRS.map((pair) => (
                <BeforeAfterSlider
                  key={pair.id}
                  beforeSrc={pair.beforeSrc}
                  afterSrc={pair.afterSrc}
                  alt={`${pair.vehicle} ${pair.damage}`}
                  caption={pairCaption(pair)}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {WORKSHOP_GALLERY.map((item, index) => (
            <figure key={item.src} className="group border border-[#E6E6E6] rounded-lg overflow-hidden bg-[#F6F6F6]">
              <button
                type="button"
                className="block w-full text-left aspect-[4/3] overflow-hidden bg-[#141414] focus-visible:ring-2 focus-visible:ring-[#F05030]"
                onClick={() => setLightbox(index)}
                aria-label={`Open ${item.caption}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  width={640}
                  height={480}
                />
              </button>
              <figcaption className="p-3 text-sm font-[family-name:var(--font-body)] text-[#404040]">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="border border-[#E6E6E6] bg-[#F6F6F6] rounded-lg p-6 md:p-8 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-xl text-[#111111] mb-2">
            Discuss your vehicle
          </h2>
          <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed mb-5">
            Send damage photos on WhatsApp to start an assessment conversation, or request a quote online.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsAppUrl(buildPhotoQuoteMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs"
            >
              <MessageCircle size={15} />
              Send photos on WhatsApp
            </a>
            <Link href={ROUTES.quote} className="btn-secondary-gwecely text-xs">
              Get a quote
            </Link>
          </div>
        </div>
      </div>

      {lightbox !== null ? (
        <div
          className="lightbox-overlay active"
          role="dialog"
          aria-modal="true"
          aria-label="Workshop photo"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <X size={22} />
          </button>
          <img
            src={WORKSHOP_GALLERY[lightbox].src}
            alt={WORKSHOP_GALLERY[lightbox].alt}
            className="max-h-[85vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-0 right-0 text-center text-white/85 text-sm px-4">
            {WORKSHOP_GALLERY[lightbox].caption}
          </p>
        </div>
      ) : null}
    </section>
  );
}
