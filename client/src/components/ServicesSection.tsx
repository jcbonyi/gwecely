/**
 * ServicesSection — garage-primary hierarchy (6 core services + 3 supporting)
 */

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Car,
  Gauge,
  Hammer,
  Paintbrush,
  Truck,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ImageWithFallback from '@/components/ImageWithFallback';
import { BRAND } from '@/lib/brand';
import { PRIMARY_GARAGE_SERVICES } from '@/lib/services';
import { SERVICE_IMAGES } from '@/lib/categoryImages';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import { bookService } from '@/lib/booking';
import { ROUTES } from '@/lib/routes';
import { goTo, goToShopCategory } from '@/lib/navigation';

const PRIMARY_ICONS: Record<string, LucideIcon> = {
  'Panel Beating': Hammer,
  'Spray Painting': Paintbrush,
  'Accident Repairs': Car,
  'Vehicle Servicing': Gauge,
  'Mechanical Repairs': Wrench,
  'Fleet Maintenance': Truck,
};

type PrimaryService = (typeof PRIMARY_GARAGE_SERVICES)[number];

function PrimaryServiceCard({
  service,
  visible,
  delay,
}: {
  service: PrimaryService;
  visible: boolean;
  delay: number;
}) {
  const Icon = PRIMARY_ICONS[service.title] ?? Wrench;
  const image = SERVICE_IMAGES[service.imageKey];

  return (
    <div
      className={`service-card group reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-52 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={`${service.title} at the Gwecely workshop, Mombasa`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={800}
          height={416}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#F05030] flex items-center justify-center flex-shrink-0">
            <Icon size={20} className="text-white" />
          </div>
          <button
            type="button"
            onClick={() => goTo(ROUTES.gallery)}
            className="text-[10px] uppercase tracking-wide text-orange-100/90 font-[family-name:var(--font-body)] hover:text-white transition-colors text-right"
          >
            {service.galleryHint} →
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-[family-name:var(--font-display)] font-700 text-xl text-[#111111] mb-2">{service.title}</h3>
        <p className="text-gray-600 text-sm font-[family-name:var(--font-body)] leading-relaxed mb-4">{service.desc}</p>

        <ul className="grid grid-cols-2 gap-1.5 mb-5">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-xs text-gray-500 font-[family-name:var(--font-body)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F05030] flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => bookService(service.bookingService)}
            className="flex-1 btn-gwecely text-xs py-2.5 px-3 justify-center"
          >
            <Calendar size={14} />
            Get a Quote
          </button>
          <button
            type="button"
            onClick={() => goTo(ROUTES.contact)}
            className="flex items-center gap-1 text-[#F05030] text-xs font-[family-name:var(--font-body)] font-medium hover:text-[#404040] transition-colors px-2"
          >
            Enquire <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

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
    <section id="services" ref={ref} className="py-20 md:py-28 bg-[#F6F6F6]">
      <div className="container">
        {/* Primary — garage (~80% visual weight) */}
        <div className="mb-12">
          <div className="section-eyebrow">
            Primary Services
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading">
              Garage services
            </h2>
            <p className="text-gray-600 font-[family-name:var(--font-body)] text-sm max-w-md md:text-right leading-relaxed">
              {BRAND.expertise}
            </p>
          </div>
          <p className="text-gray-500 text-sm font-[family-name:var(--font-body)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05030]" />
            {BRAND.contact.address}
          </p>
        </div>

        {/* Process strip */}
        <ol className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
          {[
            { step: '01', title: 'Assess', desc: 'Inspect damage and diagnose at the bay' },
            { step: '02', title: 'Quote', desc: 'Clear scope and fair pricing, same day when possible' },
            { step: '03', title: 'Repair', desc: 'Panel, paint, mechanical — done in-house' },
            { step: '04', title: 'Handover', desc: 'Quality check and keys back to you' },
          ].map((item) => (
            <li key={item.step} className="relative pl-0">
              <p className="font-[family-name:var(--font-display)] font-800 text-3xl text-[#F05030]/35 leading-none mb-2">
                {item.step}
              </p>
              <h3 className="font-[family-name:var(--font-display)] font-700 text-xl text-[#111111] mb-1">{item.title}</h3>
              <p className="text-[#6E6E6E] text-xs md:text-sm font-[family-name:var(--font-body)] leading-snug">
                {item.desc}
              </p>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PRIMARY_GARAGE_SERVICES.map((service, i) => (
            <PrimaryServiceCard key={service.title} service={service} visible={visible} delay={i * 60} />
          ))}
        </div>

        {/* Other business — demoted */}
        <div id="supplies" className="border border-[#E6E6E6] bg-white p-5 md:p-6">
          <p className="text-[10px] uppercase tracking-widest text-[#999] font-[family-name:var(--font-body)] mb-1">
            Other business services
          </p>
          <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] mb-3">
            Parts supply, corporate procurement and hospitality supplies are available separately and are not the
            primary workshop offer.
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <button type="button" onClick={() => goToShopCategory('spare-parts')} className="text-[#404040] hover:text-[#F05030]">
              Parts shop
            </button>
            <button type="button" onClick={() => goTo(ROUTES.hospitality)} className="text-[#404040] hover:text-[#F05030]">
              Hospitality supplies
            </button>
            <button type="button" onClick={() => goTo(ROUTES.contact)} className="text-[#404040] hover:text-[#F05030]">
              Procurement enquiry
            </button>
          </div>
        </div>

        {/* CTA banner — garage focus */}
        <div
          className="mt-14 rounded-xl overflow-hidden relative"
          style={{
            background: `linear-gradient(135deg, rgba(240,90,50,0.92) 0%, rgba(70,60,60,0.95) 100%), url('${SERVICE_IMAGES.emergencyBanner}') center/cover no-repeat`,
          }}
        >
          <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl md:text-2xl text-white mb-2">
                Need a quote for repairs or respray?
              </h3>
              <p className="text-[#C8C8C8] font-[family-name:var(--font-body)] text-sm max-w-lg">
                Bring your vehicle to the workshop behind CMC Motors, or book online — we confirm during working hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => bookService('Vehicle Servicing')}
                className="btn-outline-gwecely text-sm py-2.5 px-6"
              >
                Get a Quote
              </button>
              <a
                href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
                className="btn-gwecely text-sm py-2.5 px-6 bg-white text-[#F05030] border-white hover:bg-orange-50"
              >
                {BRAND.contact.phones[0]}
              </a>
              <a
                href={whatsAppUrl(buildPhotoQuoteMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm py-2.5 px-6"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
