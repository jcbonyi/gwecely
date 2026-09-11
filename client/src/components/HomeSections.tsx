/**
 * Home page — automotive conversion hierarchy
 */

import { Link } from 'wouter';
import { ArrowRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PRIMARY_GARAGE_SERVICES } from '@/lib/services';
import { SERVICE_IMAGES } from '@/lib/categoryImages';
import { BRAND } from '@/lib/brand';
import { ROUTES, MAPS_DIRECTIONS_URL } from '@/lib/routes';
import { TRUST_STRIP, WHAT_HAPPENS_NEXT, WHY_POINTS, FAQ_ITEMS, SERVICE_PROBLEMS } from '@/lib/siteContent';
import { slugForService } from '@/lib/servicePages';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { IMAGES } from '@/lib/images';

const WORKSHOP_PHOTOS = [
  { src: IMAGES.hero, alt: 'Gwecely workshop exterior area, Mombasa' },
  { src: IMAGES.booking.workshop, alt: 'Vehicles in the Gwecely workshop bay' },
  { src: '/gallery/panel-closeup.jpg', alt: 'Panel work in progress at the workshop' },
  { src: '/gallery/paint-spray.jpg', alt: 'Spray painting work at the workshop' },
] as const;

export default function HomeSections() {
  return (
    <>
      {/* Trust strip */}
      <section className="border-b border-[#E6E6E6] bg-white" aria-label="Workshop facts">
        <div className="container py-6 md:py-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST_STRIP.map((item) => (
              <li
                key={item}
                className="text-sm font-[family-name:var(--font-body)] text-[#404040] border-l-2 border-[#F05030] pl-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Core services */}
      <section className="bg-[#F6F6F6]" aria-labelledby="services-heading">
        <div className="container py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div className="max-w-xl">
              <p className="section-eyebrow">Workshop services</p>
              <h2
                id="services-heading"
                className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading"
              >
                What we fix
              </h2>
            </div>
            <Link href={ROUTES.services} className="text-sm font-semibold text-[#F05030] hover:text-[#D9482A]">
              All services <ArrowRight size={14} className="inline" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRIMARY_GARAGE_SERVICES.map((service) => (
              <article key={service.title} className="bg-white border border-[#E6E6E6] p-5 flex flex-col">
                <div className="h-32 mb-4 overflow-hidden bg-[#111111]">
                  <img
                    src={SERVICE_IMAGES[service.imageKey]}
                    alt=""
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                    width={400}
                    height={200}
                  />
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg text-[#111111] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed flex-1 mb-4">
                  {SERVICE_PROBLEMS[service.title] ?? service.desc}
                </p>
                <Link
                  href={`/services/${slugForService(service.title)}`}
                  className="text-sm font-semibold text-[#F05030] hover:text-[#D9482A]"
                >
                  Learn more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-white" aria-labelledby="process-heading">
        <div className="container py-12 md:py-16">
          <div className="max-w-2xl mb-8">
            <p className="section-eyebrow">What happens next</p>
            <h2
              id="process-heading"
              className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading mb-3"
            >
              From first contact to handover
            </h2>
            <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)]">
              If your repair is part of an insurance claim, we support documentation and estimates. Approval of the
              claim remains with your insurer.
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WHAT_HAPPENS_NEXT.map((item) => (
              <li key={item.step} className="border border-[#E6E6E6] p-4">
                <p className="font-[family-name:var(--font-display)] font-bold text-[#F05030] text-sm mb-2">
                  {item.step}
                </p>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-[#111111] mb-1.5 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm">
            <Link href={ROUTES.insuranceClaims} className="text-[#F05030] font-semibold hover:underline">
              Insurance &amp; claims guidance
            </Link>
          </p>
        </div>
      </section>

      {/* Proof — honest */}
      <section className="bg-[#F6F6F6]" aria-labelledby="proof-heading">
        <div className="container py-12 md:py-16">
          <div className="max-w-2xl mb-8">
            <p className="section-eyebrow">Our work</p>
            <h2
              id="proof-heading"
              className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading mb-3"
            >
              Workshop photographs
            </h2>
            <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
              These are photographs from the Mombasa workshop. We are documenting completed before-and-after repairs for
              this gallery. Contact us to discuss your vehicle and arrange an inspection.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {WORKSHOP_PHOTOS.map((photo) => (
              <figure key={photo.src} className="aspect-[4/3] overflow-hidden bg-[#111111] border border-[#E6E6E6]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={400}
                  height={300}
                />
              </figure>
            ))}
          </div>
          <Link href={ROUTES.ourWork} className="text-sm font-semibold text-[#F05030] hover:text-[#D9482A]">
            View our work page <ArrowRight size={14} className="inline" />
          </Link>
        </div>
      </section>

      {/* Why */}
      <section className="bg-white" aria-labelledby="why-heading">
        <div className="container py-12 md:py-16">
          <div className="max-w-2xl mb-8">
            <p className="section-eyebrow">Why Gwecely</p>
            <h2
              id="why-heading"
              className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading"
            >
              Concrete reasons to contact the workshop
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHY_POINTS.map((item) => (
              <li key={item.title} className="border-l-2 border-[#F05030] pl-4">
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-[#111111] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Location */}
      <section className="bg-[#111111] text-white" aria-labelledby="location-heading">
        <div className="container py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="section-eyebrow !text-[#B0B0B0]">Visit / contact</p>
            <h2
              id="location-heading"
              className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl section-heading mb-4"
            >
              Find the workshop
            </h2>
            <p className="text-[#B0B0B0] text-sm font-[family-name:var(--font-body)] mb-6 select-all">
              {BRAND.contact.address}
              <br />
              {BRAND.contact.poBox}
            </p>
            <ul className="space-y-3 text-sm font-[family-name:var(--font-body)] mb-8">
              <li>
                <a
                  href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-white hover:text-[#F07058]"
                >
                  <Phone size={16} className="text-[#F05030]" />
                  {BRAND.contact.phones[0]}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.contact.phones[1].replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-white hover:text-[#F07058]"
                >
                  <Phone size={16} className="text-[#F05030]" />
                  {BRAND.contact.phones[1]}
                </a>
              </li>
              <li>
                <a
                  href={whatsAppUrl(buildPhotoQuoteMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-[#F07058]"
                >
                  <MessageCircle size={16} className="text-[#25d366]" />
                  WhatsApp the workshop
                </a>
              </li>
              <li className="text-[#B0B0B0]">
                Email:{' '}
                <a href={`mailto:${BRAND.contact.emails[0]}`} className="text-white hover:underline">
                  {BRAND.contact.emails[0]}
                </a>
              </li>
              <li className="text-[#B0B0B0]">
                {BRAND.hours.weekdays}
                <br />
                {BRAND.hours.saturday}
                <br />
                {BRAND.hours.sunday}
              </li>
            </ul>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gwecely text-xs inline-flex"
            >
              <MapPin size={15} />
              Get directions
            </a>
          </div>
          <div className="border border-white/10 overflow-hidden min-h-[240px] bg-[#222]">
            <img
              src={IMAGES.booking.workshop}
              alt="Gwecely Limited workshop in Mombasa"
              className="w-full h-full object-cover opacity-80 min-h-[240px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FAQ compact */}
      <section className="bg-white border-t border-[#E6E6E6]" aria-labelledby="faq-heading">
        <div className="container py-12 md:py-14 max-w-3xl">
          <h2
            id="faq-heading"
            className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#111111] section-heading mb-6"
          >
            Common questions
          </h2>
          <div className="divide-y divide-[#E6E6E6] border border-[#E6E6E6]">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group p-4">
                <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] font-semibold text-sm text-[#111111]">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F05030] text-white">
        <div className="container py-12 md:py-14 text-center max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl mb-3">
            Send us photos of the damage and we&apos;ll guide you on the next step
          </h2>
          <p className="text-white/85 text-sm font-[family-name:var(--font-body)] mb-8">
            WhatsApp is usually fastest. You can also call or fill a short quote form.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={whatsAppUrl(buildPhotoQuoteMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#111111] px-5 py-3 text-xs font-[family-name:var(--font-display)] font-semibold uppercase tracking-wide min-h-[44px]"
              data-conversion="whatsapp-photos-final"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp the workshop
            </a>
            <a
              href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 border border-white px-5 py-3 text-xs font-[family-name:var(--font-display)] font-semibold uppercase tracking-wide min-h-[44px]"
            >
              <Phone size={15} />
              Call {BRAND.contact.phones[0]}
            </a>
            <Link
              href={ROUTES.quote}
              className="inline-flex items-center gap-2 border border-white/70 px-5 py-3 text-xs font-[family-name:var(--font-display)] font-semibold uppercase tracking-wide min-h-[44px]"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
