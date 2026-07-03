/**
 * ServicesSection — automotive-first: garage repair, panel beating, spray painting;
 * secondary supplies grid below.
 */

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Wrench,
  Hammer,
  Paintbrush,
  FileText,
  Armchair,
  Monitor,
  ShieldCheck,
  UtensilsCrossed,
  ShoppingBag,
} from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { buildGeneralEnquiryMessage, whatsAppUrl } from '@/lib/whatsapp';
import { bookService } from '@/lib/booking';
import { ROUTES } from '@/lib/routes';
import { goTo } from '@/lib/navigation';

const AUTOMOTIVE_SERVICES = [
  {
    icon: Wrench,
    title: 'Motor Vehicle Mechanical Repairs',
    bookingService: 'Mechanical Repairs',
    desc: 'Full garage services for passenger and commercial vehicles — engine, gearbox, brakes, diagnostics, electrical faults, and routine maintenance by experienced technicians.',
    features: ['Engine & Gearbox', 'ECU Diagnostics', 'Brake & Suspension', 'Preventive Servicing'],
    image: IMAGES.services.mechanical,
    galleryHint: 'Engine & gearbox work in our gallery',
  },
  {
    icon: Hammer,
    title: 'Panel Beating',
    bookingService: 'Panel Beating',
    desc: 'Expert panel beating after accidents and collisions — dent removal, chassis straightening, and structural bodywork to restore your vehicle’s shape and safety.',
    features: ['Accident Repairs', 'Dent Removal', 'Chassis Straightening', 'Body Panel Replacement'],
    image: IMAGES.services.panelBeating,
    galleryHint: 'Before & after body repairs',
  },
  {
    icon: Paintbrush,
    title: 'Spray Painting & Auto Body Refinishing',
    bookingService: 'Spray Painting',
    desc: 'Professional spray painting and auto body refinishing — full resprays, colour matching, touch-ups, and flawless finishes for cars, vans, and commercial fleets.',
    features: ['Full Respray', 'Colour Matching', 'Spot Repairs', 'Clear-Coat Finishing'],
    image: IMAGES.services.sprayPainting,
    galleryHint: 'Respray & refinishing projects',
  },
] as const;

const SUPPLY_SERVICES = [
  {
    icon: FileText,
    title: 'Office Stationery',
    desc: 'Paper, pens, filing, archival storage, and catering supplies.',
    image: IMAGES.services.stationery,
  },
  {
    icon: Armchair,
    title: 'Furniture & Fittings',
    desc: 'Office furniture, fittings, and repair on demand.',
    image: IMAGES.services.furniture,
  },
  {
    icon: Monitor,
    title: 'IT Equipment',
    desc: 'Laptops, printers, UPS, CCTV, and computer accessories.',
    image: IMAGES.services.itEquipment,
  },
  {
    icon: ShieldCheck,
    title: 'Health & Safety',
    desc: 'Safety gear, first aid, fire safety, and compliance products.',
    image: IMAGES.services.healthSafety,
  },
  {
    icon: UtensilsCrossed,
    title: 'Dry Foods & Beverages',
    desc: 'Legumes, fresh produce, bottled water, and beverages.',
    image: IMAGES.services.dryFoods,
  },
] as const;

function AutomotiveCard({
  service,
  visible,
  delay,
}: {
  service: (typeof AUTOMOTIVE_SERVICES)[number];
  visible: boolean;
  delay: number;
}) {
  const Icon = service.icon;
  return (
    <div
      className={`service-card group reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={service.image}
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
        {/* Primary — automotive */}
        <div className="mb-10">
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot" />
            Motor Vehicle Garage
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading">
              OUR GARAGE
              <br />
              <span className="text-[#F05A32]">SERVICES</span>
            </h2>
            <p className="text-gray-600 font-['Inter'] text-sm max-w-md md:text-right leading-relaxed">
              {BRAND.expertise}
            </p>
          </div>
          <p className="text-gray-500 text-sm font-['Inter'] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32]" />
            {BRAND.contact.address}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {AUTOMOTIVE_SERVICES.map((service, i) => (
            <AutomotiveCard key={service.title} service={service} visible={visible} delay={i * 80} />
          ))}
        </div>

        {/* Secondary — supplies */}
        <div id="supplies" className="pt-8 border-t border-gray-200">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-['Inter'] font-medium mb-2">
              Also available
            </p>
            <h3 className="font-['Barlow_Condensed'] font-700 text-2xl md:text-3xl text-[#2D2626]">
              Other Services &amp; Supplies
            </h3>
            <p className="text-gray-500 text-sm font-['Inter'] mt-2 max-w-2xl">
              Business procurement for offices and institutions — browse our shop or enquire for bulk orders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {SUPPLY_SERVICES.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`supplies-card reveal ${visible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${240 + i * 50}ms` }}
                >
                  <div className="relative h-28 overflow-hidden rounded-t-lg">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#463C3C]/30" />
                    <div className="absolute bottom-2 left-2 w-8 h-8 rounded-md bg-white/90 flex items-center justify-center">
                      <Icon size={16} className="text-[#F05A32]" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-['Barlow_Condensed'] font-700 text-sm text-[#2D2626] mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-xs font-['Inter'] leading-snug line-clamp-2">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => goTo(ROUTES.shop)}
              className="btn-gwecely text-xs py-2.5 px-5"
            >
              <ShoppingBag size={14} />
              Browse Shop
            </button>
            <button
              type="button"
              onClick={() => goTo(ROUTES.contact)}
              className="btn-secondary-gwecely text-xs py-2.5 px-5"
            >
              Enquire About Supplies
            </button>
          </div>
        </div>

        {/* CTA banner — automotive focus */}
        <div
          className="mt-14 rounded-xl overflow-hidden relative"
          style={{
            background: `linear-gradient(135deg, rgba(240,90,50,0.92) 0%, rgba(70,60,60,0.95) 100%), url('${IMAGES.services.emergencyBanner}') center/cover no-repeat`,
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
              <button type="button" onClick={() => bookService('Full Vehicle Service')} className="btn-outline-gwecely text-sm py-2.5 px-6">
                Book Repair
              </button>
              <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="btn-gwecely text-sm py-2.5 px-6 bg-white text-[#F05A32] border-white hover:bg-orange-50">
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
