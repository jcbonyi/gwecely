/**
 * Home page — automotive conversion hierarchy (Lovable P0–P2)
 */

import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PRIMARY_GARAGE_SERVICES } from '@/lib/services';
import { SERVICE_IMAGE_BASES } from '@/lib/categoryImages';
import { BRAND } from '@/lib/brand';
import { ROUTES, MAPS_DIRECTIONS_URL } from '@/lib/routes';
import { TRUST_STRIP, WHAT_HAPPENS_NEXT, WHY_POINTS, FAQ_ITEMS, SERVICE_PROBLEMS } from '@/lib/siteContent';
import { slugForService } from '@/lib/servicePages';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import {
  ACCEPTED_INSURERS,
  AREA_SERVED,
  GOOGLE_BUSINESS_PROFILE_URL,
  GOOGLE_REVIEWS,
  PROOF_STATS,
} from '@/lib/proofContent';
import { BEFORE_AFTER_PAIRS, pairCaption } from '@/lib/beforeAfter';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import ResponsivePicture from '@/components/ResponsivePicture';
import ImageWithFallback from '@/components/ImageWithFallback';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

const SERVICE_ALTS: Record<string, string> = {
  panelBeating: 'Panel beating and dent repair on a vehicle body at the Gwecely workshop, Mombasa',
  sprayPainting: 'Spray painting and refinishing work at the Gwecely workshop, Mombasa',
  accidentRepair: 'Accident collision repair in progress at Gwecely Limited, Mombasa',
  mechanical: 'Mechanical repair work in a Gwecely workshop bay, Mombasa',
  vehicleServicing: 'Vehicle servicing and maintenance at Gwecely Limited, Mombasa',
  fleetMaintenance: 'Commercial and fleet vehicle maintenance at the Gwecely workshop, Mombasa',
};

const WORKSHOP_PHOTOS = [
  {
    base: '/images/hero',
    widths: [400, 800, 1920],
    alt: 'Gwecely workshop exterior and yard behind CMC Motors, Mombasa',
  },
  {
    base: '/images/workshop-bay',
    widths: [400, 800],
    alt: 'Vehicles in the Gwecely workshop bay during repairs',
  },
  {
    base: '/images/panel',
    widths: [400, 800],
    alt: 'Panel beating close-up on bodywork at Gwecely, Mombasa',
  },
  {
    base: '/images/spray',
    widths: [400, 800],
    alt: 'Spray painting preparation at the Gwecely workshop, Mombasa',
  },
] as const;

function injectFaqJsonLd() {
  const id = 'gwecely-faq-jsonld';
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  });
  document.head.appendChild(script);
}

export default function HomeSections() {
  useEffect(() => {
    injectFaqJsonLd();
    return () => document.getElementById('gwecely-faq-jsonld')?.remove();
  }, []);

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

      {/* Proof numbers — only when owner supplies real figures */}
      <section className="bg-white border-b border-[#E6E6E6]" aria-labelledby="proof-stats-heading">
        <div className="container py-8 md:py-10">
          <h2
            id="proof-stats-heading"
            className="font-[family-name:var(--font-display)] font-bold text-xl text-[#111111] section-heading mb-4"
          >
            Workshop at a glance
          </h2>
          {PROOF_STATS.length > 0 ? (
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PROOF_STATS.map((stat) => (
                <div key={stat.label} className="border border-[#E6E6E6] p-4">
                  <dt className="text-xs uppercase tracking-wider text-[#888] mb-1">{stat.label}</dt>
                  <dd className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#111111]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] border border-dashed border-[#E6E6E6] p-4">
              {/* TODO: years operating · vehicles repaired · average turnaround — ask owner; do not invent */}
              Proof figures (years operating, vehicles repaired, average turnaround) will appear here once confirmed by
              the workshop. We do not publish estimated statistics.
            </p>
          )}
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
            {PRIMARY_GARAGE_SERVICES.map((service) => {
              const base = SERVICE_IMAGE_BASES[service.imageKey];
              return (
                <article key={service.title} className="bg-white border border-[#E6E6E6] p-5 flex flex-col">
                  <div className="h-32 mb-4 overflow-hidden bg-[#111111]">
                    {base ? (
                      <ResponsivePicture
                        baseName={base}
                        alt={SERVICE_ALTS[service.imageKey] ?? `${service.title} at Gwecely Limited, Mombasa`}
                        className="w-full h-full object-cover opacity-90"
                        width={800}
                        height={400}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        includeWebp={service.imageKey !== 'panelBeating'}
                      />
                    ) : (
                      <ImageWithFallback
                        src="/images/workshop-bay-800.jpg"
                        alt={SERVICE_ALTS[service.imageKey] ?? service.title}
                        className="w-full h-full object-cover opacity-90"
                        width={800}
                        height={400}
                      />
                    )}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="bg-white" aria-labelledby="ba-heading">
        <div className="container py-12 md:py-16">
          <div className="max-w-2xl mb-8">
            <p className="section-eyebrow">Proof of work</p>
            <h2
              id="ba-heading"
              className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading mb-3"
            >
              Before &amp; after repairs
            </h2>
            <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
              Drag the slider to compare damage and the finished repair. Each caption lists the vehicle, damage type, and
              days in the workshop when known.
            </p>
          </div>

          {BEFORE_AFTER_PAIRS.length > 0 ? (
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
          ) : (
            <div className="border border-dashed border-[#E6E6E6] p-6 md:p-8 bg-[#F6F6F6]">
              <p className="text-sm text-[#404040] font-[family-name:var(--font-body)] leading-relaxed mb-3">
                {/* TODO: minimum 8 genuine before/after pairs */}
                We are collecting genuine before-and-after photographs from completed jobs. Stock crash photos will not
                be used. Once the workshop supplies pairs (vehicle model, damage type, days in workshop), they will
                appear in this slider.
              </p>
              <Link href={ROUTES.ourWork} className="text-sm font-semibold text-[#F05030]">
                See workshop photographs <ArrowRight size={14} className="inline" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-[#F6F6F6]" aria-labelledby="process-heading">
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
              <li key={item.step} className="border border-[#E6E6E6] bg-white p-4">
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
        </div>
      </section>

      {/* Working with insurers */}
      <section className="bg-white" aria-labelledby="insurers-heading">
        <div className="container py-12 md:py-16">
          <div className="max-w-2xl mb-6">
            <p className="section-eyebrow">Insurance</p>
            <h2
              id="insurers-heading"
              className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading mb-3"
            >
              Working with insurers
            </h2>
            <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed mb-4">
              For claim-related repairs we help with assessor liaison, estimates and documentation, and can advise on
              towing to the workshop when needed. Claim approval and payment terms remain with your insurer.
            </p>
            {ACCEPTED_INSURERS.length > 0 ? (
              <ul className="flex flex-wrap gap-2 mb-4">
                {ACCEPTED_INSURERS.map((name) => (
                  <li
                    key={name}
                    className="text-sm border border-[#E6E6E6] px-3 py-1.5 font-[family-name:var(--font-body)] text-[#404040]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#6B6B6B] border border-dashed border-[#E6E6E6] p-4 mb-4 font-[family-name:var(--font-body)]">
                {/* TODO: list insurer names you accept assessments from */}
                Insurer names you accept assessments from will be listed here once confirmed. We do not invent partner
                lists.
              </p>
            )}
            <Link href={ROUTES.insuranceClaims} className="text-sm font-semibold text-[#F05030] hover:text-[#D9482A]">
              Insurance &amp; claims guidance <ArrowRight size={14} className="inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* Workshop photos */}
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
              Photographs from the Mombasa workshop — not stock imagery.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {WORKSHOP_PHOTOS.map((photo) => (
              <figure key={photo.base} className="aspect-[4/3] overflow-hidden bg-[#111111] border border-[#E6E6E6]">
                <ResponsivePicture
                  baseName={photo.base}
                  alt={photo.alt}
                  widths={[...photo.widths]}
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  includeWebp={photo.base !== '/images/panel'}
                />
              </figure>
            ))}
          </div>
          <Link href={ROUTES.ourWork} className="text-sm font-semibold text-[#F05030] hover:text-[#D9482A]">
            View our work page <ArrowRight size={14} className="inline" />
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white" aria-labelledby="reviews-heading">
        <div className="container py-12 md:py-16">
          <div className="max-w-2xl mb-8">
            <p className="section-eyebrow">Customers</p>
            <h2
              id="reviews-heading"
              className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading mb-3"
            >
              Google reviews
            </h2>
          </div>
          {GOOGLE_REVIEWS.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {GOOGLE_REVIEWS.map((review) => (
                <li key={`${review.name}-${review.date}`} className="border border-[#E6E6E6] p-5">
                  <p className="font-[family-name:var(--font-display)] font-semibold text-[#111111] mb-1">
                    {review.name}
                  </p>
                  <p className="text-xs text-[#888] mb-2">
                    {'★'.repeat(Math.round(review.rating))} · {review.date}
                  </p>
                  <p className="text-sm text-[#404040] font-[family-name:var(--font-body)] leading-relaxed">
                    “{review.quote}”
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#6B6B6B] border border-dashed border-[#E6E6E6] p-4 mb-6 font-[family-name:var(--font-body)]">
              {/* TODO: paste real Google reviews + GBP URL */}
              Named Google reviews will appear here once provided. We do not publish anonymous or invented praise.
            </p>
          )}
          {GOOGLE_BUSINESS_PROFILE_URL ? (
            <a
              href={GOOGLE_BUSINESS_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#F05030]"
            >
              See all reviews on Google <ArrowRight size={14} className="inline" />
            </a>
          ) : (
            <p className="text-xs text-[#888]">
              TODO: add Google Business Profile URL for the “See all reviews on Google” link.
            </p>
          )}
        </div>
      </section>

      {/* Why */}
      <section className="bg-[#F6F6F6]" aria-labelledby="why-heading">
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

      {/* Location / NAP */}
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
            <p className="text-[#B0B0B0] text-sm font-[family-name:var(--font-body)] mb-2">
              Serving {AREA_SERVED.join(', ')}.
            </p>
            <p className="text-[#B0B0B0] text-sm font-[family-name:var(--font-body)] mb-6 select-all" itemProp="address">
              {BRAND.legalName}
              <br />
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
            <div className="flex flex-wrap gap-3">
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gwecely text-xs inline-flex"
              >
                <MapPin size={15} />
                Get directions
              </a>
              {GOOGLE_BUSINESS_PROFILE_URL ? (
                <a
                  href={GOOGLE_BUSINESS_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gwecely text-xs inline-flex"
                >
                  Google Business Profile
                </a>
              ) : null}
            </div>
          </div>
          <div className="border border-white/10 overflow-hidden min-h-[240px] bg-[#222]">
            <ResponsivePicture
              baseName="/images/workshop-bay"
              alt="Gwecely Limited workshop bay in Mombasa"
              className="w-full h-full object-cover opacity-80 min-h-[240px]"
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
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
              WhatsApp Photos
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
