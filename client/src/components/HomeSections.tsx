/**
 * HomeSections — structured landing content (services, work, visit, CTA)
 */

import { Link } from 'wouter';
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { PRIMARY_GARAGE_SERVICES } from '@/lib/services';
import { SERVICE_IMAGES } from '@/lib/categoryImages';
import { GALLERY_IMAGES } from '@/lib/galleryImages';
import { ROUTES } from '@/lib/routes';
import { bookService } from '@/lib/booking';

const FEATURED_WORK = [
  {
    title: 'Hilux body repair',
    detail: 'Full panel beating after accident damage',
    image: GALLERY_IMAGES.hiluxRepair,
  },
  {
    title: 'Respray finish',
    detail: 'Colour-matched spray painting and clear coat',
    image: GALLERY_IMAGES.paintSpray,
  },
  {
    title: 'Mechanical service',
    detail: 'Workshop diagnostics and component work',
    image: GALLERY_IMAGES.engineOverhaul,
  },
] as const;

export default function HomeSections() {
  return (
    <>
      {/* Intro */}
      <section id="overview" className="bg-white border-b border-[#E6E6E6]">
        <div className="container py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="section-eyebrow">About the workshop</p>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading mb-5">
              A registered garage for bodywork and repairs
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-4 text-[#404040] font-[family-name:var(--font-body)] text-base leading-relaxed">
            <p>{BRAND.about}</p>
            <p>
              Bring the vehicle for assessment, get a clear quote, and leave the repair with the same team from panel
              work through to final handover.
            </p>
            <Link
              href={ROUTES.about}
              className="inline-flex items-center gap-2 text-[#F05030] font-semibold text-sm hover:text-[#D9482A] transition-colors pt-2"
            >
              More about Gwecely Limited
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#F6F6F6]">
        <div className="container py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="section-eyebrow">Workshop services</p>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading">
                What we handle in the bay
              </h2>
            </div>
            <Link
              href={ROUTES.services}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#404040] hover:text-[#F05030] transition-colors"
            >
              Full service list
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E6E6E6] border border-[#E6E6E6]">
            {PRIMARY_GARAGE_SERVICES.map((service) => (
              <article key={service.title} className="bg-white p-6 flex flex-col">
                <div className="h-36 mb-5 overflow-hidden bg-[#111111]">
                  <img
                    src={SERVICE_IMAGES[service.imageKey]}
                    alt=""
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg text-[#111111] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed flex-1 mb-4">
                  {service.desc}
                </p>
                <button
                  type="button"
                  onClick={() => bookService(service.bookingService)}
                  className="self-start text-sm font-semibold text-[#F05030] hover:text-[#D9482A] transition-colors"
                >
                  Book this service
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="bg-white">
        <div className="container py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="section-eyebrow">Selected work</p>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading">
                Recent workshop projects
              </h2>
            </div>
            <Link
              href={ROUTES.gallery}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#404040] hover:text-[#F05030] transition-colors"
            >
              View project gallery
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_WORK.map((item) => (
              <figure key={item.title} className="border border-[#E6E6E6]">
                <div className="aspect-[4/3] overflow-hidden bg-[#111111]">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <figcaption className="p-4 border-t border-[#E6E6E6]">
                  <p className="font-[family-name:var(--font-display)] font-semibold text-[#111111]">{item.title}</p>
                  <p className="text-sm text-[#6B6B6B] mt-1 font-[family-name:var(--font-body)]">{item.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Visit / contact band */}
      <section className="bg-[#111111] text-white">
        <div className="container py-14 md:py-18 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p className="section-eyebrow !text-[#B0B0B0]">Visit the workshop</p>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl section-heading mb-5">
              Behind CMC Motors, Mombasa
            </h2>
            <p className="text-[#B0B0B0] font-[family-name:var(--font-body)] leading-relaxed max-w-md mb-8">
              Off Bishop Macarios Road. Call ahead for large jobs or fleet bookings — we confirm appointments within
              two hours during working time.
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => bookService('Vehicle Servicing')} className="btn-gwecely">
                Book online
              </button>
              <Link href={ROUTES.contact} className="btn-outline-gwecely">
                Contact details
              </Link>
            </div>
          </div>

          <ul className="space-y-5 font-[family-name:var(--font-body)] self-center">
            <li className="flex gap-3 items-start border-b border-white/10 pb-5">
              <MapPin size={18} className="text-[#F05030] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-0.5">Address</p>
                <p className="text-[#B0B0B0] text-sm">{BRAND.contact.address}</p>
                <p className="text-[#888] text-sm">{BRAND.contact.poBox}</p>
              </div>
            </li>
            <li className="flex gap-3 items-start border-b border-white/10 pb-5">
              <Clock size={18} className="text-[#F05030] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-0.5">Opening hours</p>
                <p className="text-[#B0B0B0] text-sm">{BRAND.hours.weekdays}</p>
                <p className="text-[#B0B0B0] text-sm">{BRAND.hours.saturday}</p>
                <p className="text-[#888] text-sm">{BRAND.hours.sunday}</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Phone size={18} className="text-[#F05030] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-0.5">Phone</p>
                {BRAND.contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="block text-[#B0B0B0] text-sm hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
