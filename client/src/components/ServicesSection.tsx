/**
 * ServicesSection — Gwecely Limited
 * Services aligned with company profile (2022)
 */

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Wrench, Paintbrush, FileText, Armchair, Monitor, ShieldCheck, UtensilsCrossed } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';

const SERVICES = [
  {
    icon: Wrench,
    title: 'Mechanical & Electrical Engineering',
    desc: 'Our fully equipped garage performs all minor and major repairs — mechanical, electrical, diagnostics, and preventive maintenance for passenger and commercial vehicles.',
    features: ['Engine & Gearbox Repair', 'ECU Diagnostics', 'Routine Maintenance', 'Preventive Servicing'],
    image: IMAGES.services.mechanical,
  },
  {
    icon: Paintbrush,
    title: 'Panel Beating & Spray Painting',
    desc: 'Years of experience in panel beating and spray painting for all vehicle types. Complete recoats, touch-ups, and chassis straightening to restore your vehicle after accidents.',
    features: ['Accident Repairs', 'Full Respray', 'Dent Removal', 'Chassis Straightening'],
    image: IMAGES.services.panelBeating,
  },
  {
    icon: FileText,
    title: 'Office Stationery',
    desc: 'All your stationery needs covered — from paper and pens to filing, archival storage, tapes, adhesives, and catering supplies for offices, schools, and hospitals.',
    features: ['Paper & Writing Supplies', 'Filing & Archival', 'Desktop Accessories', 'Catering Supplies'],
    image: IMAGES.services.stationery,
  },
  {
    icon: Armchair,
    title: 'Furniture & Fittings',
    desc: 'Wide range of furniture and fittings supplied on demand. We understand your needs and also provide repair services for office furniture.',
    features: ['Office Furniture', 'Filing Cabinets', 'Fittings Supply', 'Furniture Repair'],
    image: IMAGES.services.furniture,
  },
  {
    icon: Monitor,
    title: 'Computer & Accessories',
    desc: 'Servers, workstations, laptops, printers, UPS, stabilizers, CCTV systems, air conditioners, cameras, and specialized IT equipment.',
    features: ['Laptops & Servers', 'Printers & UPS', 'CCTV Systems', 'Large Format Scanners'],
    image: IMAGES.services.itEquipment,
  },
  {
    icon: ShieldCheck,
    title: 'Health & Safety Equipment',
    desc: 'Quality health and safety products for commercial, residential, and individual use — committed to both accident prevention and loss mitigation.',
    features: ['Safety Gear', 'First Aid Kits', 'Fire Safety', 'Workplace Compliance'],
    image: IMAGES.services.healthSafety,
  },
  {
    icon: UtensilsCrossed,
    title: 'Dry Foods & Beverages',
    desc: 'Supply of legumes, fresh fruits and vegetables, and bottled drinking water and beverages for businesses and institutions across Kenya.',
    features: ['Beans & Legumes', 'Fresh Produce', 'Bottled Water', 'Beverages'],
    image: IMAGES.services.dryFoods,
  },
];

export default function ServicesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleBooking = () => {
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" ref={ref} className="py-20 md:py-28 bg-[#F5F3F2]">
      <div className="container">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-[#F05A32]/10 text-[#F05A32] text-sm px-4 py-1.5 rounded-full mb-4 font-['Inter'] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32]" />
            Our Services
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading">
                WHAT WE
                <br />
                PROVIDE
              </h2>
            </div>
            <p className="text-gray-600 font-['Inter'] max-w-sm md:text-right">
              {BRAND.expertise}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className={`service-card group reveal ${visible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2626]/70 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <div className="w-9 h-9 rounded-lg bg-[#F05A32] flex items-center justify-center">
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-['Inter'] leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  <ul className="grid grid-cols-2 gap-1 mb-5">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-1.5 text-xs text-gray-500 font-['Inter']">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2">
                    <button
                      onClick={handleBooking}
                      className="flex-1 btn-gwecely text-xs py-2 px-3 justify-center"
                    >
                      <Calendar size={13} />
                      Enquire Now
                    </button>
                    <button
                      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-1 text-[#F05A32] text-xs font-['Inter'] font-medium hover:text-[#463C3C] transition-colors px-2"
                    >
                      Contact <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-12 rounded-xl overflow-hidden relative"
          style={{
            background: `linear-gradient(135deg, rgba(240,90,50,0.92) 0%, rgba(70,60,60,0.95) 100%), url('${IMAGES.services.emergencyBanner}') center/cover no-repeat`,
          }}
        >
          <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-['Barlow_Condensed'] font-800 text-2xl md:text-3xl text-white mb-2">
                TAILOR-MADE SOLUTIONS FOR EVERY BUSINESS
              </h3>
              <p className="text-orange-100 font-['Inter']">
                {BRAND.market}
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="btn-outline-gwecely text-sm py-2.5 px-6">
                {BRAND.contact.phones[0]}
              </a>
              <a
                href={`https://wa.me/${BRAND.contact.whatsapp}?text=${encodeURIComponent('Hello Gwecely, I would like to enquire about your services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gwecely text-sm py-2.5 px-6 bg-[#25D366] border-[#25D366] hover:bg-[#128C7E] hover:border-[#128C7E]"
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
