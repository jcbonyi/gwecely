/**
 * Services — quiet brochure cards (photo, title, 2-line problem, learn more)
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import ImageWithFallback from '@/components/ImageWithFallback';
import { BRAND } from '@/lib/brand';
import { PRIMARY_GARAGE_SERVICES } from '@/lib/services';
import { SERVICE_IMAGES } from '@/lib/categoryImages';
import { SERVICE_PROBLEMS } from '@/lib/siteContent';
import { slugForService } from '@/lib/servicePages';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import { ROUTES } from '@/lib/routes';
import { goTo, goToShopCategory } from '@/lib/navigation';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function ServicesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="py-14 md:py-20 bg-[#F6F6F6]">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="section-eyebrow">Workshop services</p>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading mb-3">
            Garage services
          </h1>
          <p className="text-[#6B6B6B] font-[family-name:var(--font-body)] text-base leading-relaxed">
            {BRAND.expertise} {BRAND.contact.address}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {PRIMARY_GARAGE_SERVICES.map((service, i) => {
            const image = SERVICE_IMAGES[service.imageKey];
            const blurb = SERVICE_PROBLEMS[service.title] ?? service.desc;
            return (
              <article
                key={service.title}
                className={`service-card group reveal ${visible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#141414]">
                  <ImageWithFallback
                    src={image}
                    alt={`${service.title} at the Gwecely workshop, Mombasa`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    width={800}
                    height={500}
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-[family-name:var(--font-display)] font-semibold text-lg text-[#111111] mb-2">
                    {service.title}
                  </h2>
                  <p className="text-[#6B6B6B] text-sm font-[family-name:var(--font-body)] leading-relaxed line-clamp-2 mb-4">
                    {blurb}
                  </p>
                  <Link
                    href={`/services/${slugForService(service.title)}`}
                    className="text-sm font-semibold text-[#F05030] hover:text-[#D9482A] min-h-[44px] inline-flex items-center"
                  >
                    Learn more
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div id="supplies" className="surface-card bg-white p-5 md:p-6 mb-12">
          <p className="text-xs uppercase tracking-widest text-[#6B6B6B] font-[family-name:var(--font-display)] font-semibold mb-2">
            Other business
          </p>
          <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] mb-4">
            Parts supply, corporate procurement and hospitality supplies are available separately.
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <button type="button" onClick={() => goToShopCategory('spare-parts')} className="text-[#404040] hover:text-[#F05030] min-h-[44px]">
              Parts shop
            </button>
            <button type="button" onClick={() => goTo(ROUTES.hospitality)} className="text-[#404040] hover:text-[#F05030] min-h-[44px]">
              Hospitality supplies
            </button>
            <button type="button" onClick={() => goTo(ROUTES.contact)} className="text-[#404040] hover:text-[#F05030] min-h-[44px]">
              Procurement enquiry
            </button>
          </div>
        </div>

        <div className="bg-[#141414] text-white p-8 md:p-10 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-lg">
            <h2 className="font-[family-name:var(--font-display)] font-bold text-xl md:text-2xl mb-2">
              Need a quote for repairs or respray?
            </h2>
            <p className="text-[#B0B0B0] font-[family-name:var(--font-body)] text-sm leading-relaxed">
              Send damage photos on WhatsApp, or request a short quote online.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a
              href={whatsAppUrl(buildPhotoQuoteMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Send photos on WhatsApp
            </a>
            <Link href={ROUTES.quote} className="btn-gwecely text-sm">
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
