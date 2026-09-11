/**
 * ServicesSection — garage-primary hierarchy (6 core services + 3 supporting)
 */

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Car,
  Cog,
  Gauge,
  Hammer,
  Paintbrush,
  Package,
  Truck,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { PRIMARY_GARAGE_SERVICES, SECONDARY_SUPPORT_SERVICES } from '@/lib/services';
import { SERVICE_IMAGES } from '@/lib/categoryImages';
import { buildGeneralEnquiryMessage, whatsAppUrl } from '@/lib/whatsapp';
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

const SECONDARY_ICONS: Record<string, LucideIcon> = {
  'Automotive Parts Supply': Cog,
  'Corporate Procurement': Briefcase,
  'Hospitality Supplies': UtensilsCrossed,
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
        <img
          src={image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2626]/80 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#F05A32] flex items-center justify-center flex-shrink-0">
            <Icon size={20} className="text-white" />
          </div>
          <button
            type="button"
            onClick={() => goTo(ROUTES.gallery)}
            className="text-[10px] uppercase tracking-wide text-orange-100/90 font-['Inter'] hover:text-white transition-colors text-right"
          >
            {service.galleryHint} →
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-2">{service.title}</h3>
        <p className="text-gray-600 text-sm font-['Inter'] leading-relaxed mb-4">{service.desc}</p>

        <ul className="grid grid-cols-2 gap-1.5 mb-5">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-xs text-gray-500 font-['Inter']">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32] flex-shrink-0" />
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
            Book This Service
          </button>
          <button
            type="button"
            onClick={() => goTo(ROUTES.contact)}
            className="flex items-center gap-1 text-[#F05A32] text-xs font-['Inter'] font-medium hover:text-[#463C3C] transition-colors px-2"
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
    <section id="services" ref={ref} className="py-20 md:py-28 bg-[#F5F3F2]">
      <div className="container">
        {/* Primary — garage (~80% visual weight) */}
        <div className="mb-12">
          <div className="section-eyebrow">
            Primary Services
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading">
              OUR GARAGE
              <br />
              <span className="text-[#F05A32]">SERVICES</span>
            </h2>
            <p className="text-gray-600 font-[family-name:var(--font-body)] text-sm max-w-md md:text-right leading-relaxed">
              {BRAND.expertise}
            </p>
          </div>
          <p className="text-gray-500 text-sm font-[family-name:var(--font-body)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32]" />
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
              <p className="font-['Barlow_Condensed'] font-800 text-3xl text-[#F05A32]/35 leading-none mb-2">
                {item.step}
              </p>
              <h3 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-1">{item.title}</h3>
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

        {/* Secondary — supporting (~20% visual weight) */}
        <div id="supplies" className="rounded-xl bg-white/60 border border-gray-200/80 p-6 md:p-8">
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-['Inter'] font-medium mb-1.5">
              Secondary Services
            </p>
            <h3 className="font-['Barlow_Condensed'] font-700 text-xl md:text-2xl text-[#463C3C]/90">
              Supporting Your Business
            </h3>
            <p className="text-gray-500 text-xs md:text-sm font-['Inter'] mt-1.5 max-w-2xl">
              Parts supply and procurement for clients who already trust our workshop — not a substitute for our garage
              services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SECONDARY_SUPPORT_SERVICES.map((item, i) => {
              const Icon = SECONDARY_ICONS[item.title] ?? Package;
              const image = SERVICE_IMAGES[item.imageKey];
              return (
                <div
                  key={item.title}
                  className={`supplies-card reveal ${visible ? 'visible' : ''} opacity-90`}
                  style={{ transitionDelay: `${360 + i * 40}ms` }}
                >
                  <div className="relative h-24 overflow-hidden rounded-t-lg">
                    <img src={image} alt={item.title} className="w-full h-full object-cover opacity-90" loading="lazy" />
                    <div className="absolute inset-0 bg-[#463C3C]/40" />
                    <div className="absolute bottom-2 left-2 w-7 h-7 rounded-md bg-white/85 flex items-center justify-center">
                      <Icon size={14} className="text-[#463C3C]" />
                    </div>
                  </div>
                  <div className="p-3.5">
                    <h4 className="font-['Barlow_Condensed'] font-700 text-sm text-[#2D2626] mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-xs font-['Inter'] leading-snug mb-3">{item.desc}</p>
                    {item.link === 'shop' && 'shopCategory' in item ? (
                      <button
                        type="button"
                        onClick={() => goToShopCategory(item.shopCategory)}
                        className="text-xs font-['Inter'] font-medium text-gray-500 hover:text-[#F05A32] transition-colors"
                      >
                        Browse in shop →
                      </button>
                    ) : item.link === 'hospitality-shop' && 'shopCategory' in item ? (
                      <div className="flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => goToShopCategory(item.shopCategory)}
                          className="text-xs font-['Inter'] font-medium text-gray-500 hover:text-[#F05A32] transition-colors text-left"
                        >
                          Shop hospitality supplies →
                        </button>
                        <button
                          type="button"
                          onClick={() => goTo(ROUTES.hospitality)}
                          className="text-xs font-['Inter'] font-medium text-gray-400 hover:text-[#F05A32] transition-colors text-left"
                        >
                          Full catalogue &amp; quotes
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => goTo(ROUTES.contact)}
                        className="text-xs font-['Inter'] font-medium text-gray-500 hover:text-[#F05A32] transition-colors"
                      >
                        Enquire →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
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
              <h3 className="font-['Barlow_Condensed'] font-800 text-2xl md:text-3xl text-white mb-2">
                NEED A QUOTE FOR REPAIRS OR RESPRAY?
              </h3>
              <p className="text-orange-100 font-['Inter'] text-sm max-w-lg">
                Bring your vehicle to our workshop behind CMC Motors, Mombasa — or book online and we&apos;ll confirm
                within 2 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => bookService('Vehicle Servicing')}
                className="btn-outline-gwecely text-sm py-2.5 px-6"
              >
                Book Repair
              </button>
              <a
                href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
                className="btn-gwecely text-sm py-2.5 px-6 bg-white text-[#F05A32] border-white hover:bg-orange-50"
              >
                {BRAND.contact.phones[0]}
              </a>
              <a
                href={whatsAppUrl(buildGeneralEnquiryMessage('Vehicle Repair & Panel Beating'))}
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
