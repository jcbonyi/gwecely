/**
 * Our Work — honest workshop photography only (no fabricated case studies)
 */

import { Link } from 'wouter';
import { MessageCircle } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { ROUTES } from '@/lib/routes';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';

const WORKSHOP_GALLERY = [
  {
    src: IMAGES.hero,
    alt: 'Gwecely Limited workshop area behind CMC Motors, Mombasa',
    caption: 'Workshop location — behind CMC Motors, Mombasa',
  },
  {
    src: IMAGES.booking.workshop,
    alt: 'Vehicles in the Gwecely workshop bay',
    caption: 'Workshop bay',
  },
  {
    src: '/gallery/panel-closeup.jpg',
    alt: 'Close-up of panel work at Gwecely workshop',
    caption: 'Panel work',
  },
  {
    src: '/gallery/paint-spray.jpg',
    alt: 'Spray painting work at Gwecely workshop',
    caption: 'Spray painting',
  },
  {
    src: '/gallery/engine-overhaul.jpg',
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
  return (
    <section id="gallery" className="py-14 md:py-20 bg-white">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <p className="section-eyebrow">Our work</p>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading mb-4">
            Workshop photographs
          </h1>
          <p className="text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
            These images show the Gwecely workshop and the type of work carried out on site. We are documenting
            verified before-and-after repair pairs for this page. Until those are published, contact us to discuss your
            vehicle and arrange an inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {WORKSHOP_GALLERY.map((item) => (
            <figure key={item.src} className="border border-[#E6E6E6] bg-[#F6F6F6]">
              <div className="aspect-[4/3] overflow-hidden bg-[#111111]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={640}
                  height={480}
                />
              </div>
              <figcaption className="p-3 text-sm font-[family-name:var(--font-body)] text-[#404040]">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="border border-[#E6E6E6] bg-[#F6F6F6] p-6 md:p-8 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-xl text-[#111111] mb-2">
            Before-and-after projects
          </h2>
          <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed mb-5">
            We are documenting completed repairs. Contact us to discuss your vehicle and arrange an inspection — or
            send damage photos on WhatsApp to start the conversation.
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
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
