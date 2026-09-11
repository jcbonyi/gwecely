/**
 * Homepage sections — only render proof blocks when real data is filled.
 * Never show empty / "coming soon" placeholders to visitors.
 */

import { useEffect } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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
  hasReviewsContent,
} from '@/lib/proofContent';
import { BEFORE_AFTER_PAIRS, pairCaption } from '@/lib/beforeAfter';
import ResponsivePicture from '@/components/ResponsivePicture';
import ImageWithFallback from '@/components/ImageWithFallback';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ContactMap from '@/components/ContactMap';

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

const PROCESS_ICONS: LucideIcon[] = [Camera, Search, ClipboardList, Wrench, CheckCircle2];

function injectFaqJsonLd() {
  const id = 'gwecely-faq-jsonld';
  document.getElementById(id)?.remove();
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

  const showProofStats = PROOF_STATS.length > 0;
  const showBeforeAfter = BEFORE_AFTER_PAIRS.length > 0;
  const showInsurers = ACCEPTED_INSURERS.length > 0;
  const showReviews = hasReviewsContent();

  return (
    <>
      <section className="border-b border-[#E5E7E7] bg-white" aria-label="Workshop facts">
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

      {showProofStats ? (
        <section className="bg-white border-b border-[#E5E7E7]" aria-labelledby="proof-stats-heading">
          <div className="container py-8 md:py-10">
            <h2
              id="proof-stats-heading"
              className="font-[family-name:var(--font-display)] font-bold text-xl text-[#111111] section-heading mb-4"
            >
              Workshop at a glance
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PROOF_STATS.map((stat) => (
                <div key={stat.label} className="border border-[#E5E7E7] rounded-xl p-4">
                  <dt className="text-xs uppercase tracking-wider text-[#888] mb-1">{stat.label}</dt>
                  <dd className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#111111]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

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
              const blurb = SERVICE_PROBLEMS[service.title] ?? service.desc;
              return (
                <article
                  key={service.title}
                  className="bg-white border border-[#E5E7E7] rounded-xl p-5 flex flex-col hover:shadow-sm transition-shadow"
                >
                  <div className="h-36 mb-4 overflow-hidden rounded-lg bg-[#141414]">
                    {base ? (
                      <ResponsivePicture
                        baseName={base}
                        alt={SERVICE_ALTS[service.imageKey] ?? `${service.title} at Gwecely Limited, Mombasa`}
                        className="w-full h-full object-cover"
                        width={800}
                        height={400}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        includeWebp={service.imageKey !== 'panelBeating'}
                      />
                    ) : (
                      <ImageWithFallback
                        src="/images/workshop-bay-800.jpg"
                        alt={SERVICE_ALTS[service.imageKey] ?? service.title}
                        className="w-full h-full object-cover"
                        width={800}
                        height={400}
                      />
                    )}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg text-[#111111] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed line-clamp-2 flex-1 mb-4">
                    {blurb}
                  </p>
                  <Link
                    href={`/services/${slugForService(service.title)}`}
                    className="text-sm font-semibold text-[#F05030] hover:text-[#D9482A] min-h-[44px] inline-flex items-center"
                  >
                    Learn more
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {showBeforeAfter ? (
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
                Drag the slider to compare damage and the finished repair.
              </p>
            </div>
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
        </section>
      ) : null}

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
              Insurance claim? We support estimates and documentation. Approval stays with your insurer.
            </p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WHAT_HAPPENS_NEXT.map((item, i) => {
              const Icon = PROCESS_ICONS[i] ?? FileText;
              return (
                <li key={item.step} className="border border-[#E5E7E7] bg-white rounded-xl p-4">
                  <div className="w-9 h-9 rounded-lg bg-[#F05030]/10 text-[#F05030] flex items-center justify-center mb-3">
                    <Icon size={18} aria-hidden />
                  </div>
                  <p className="font-[family-name:var(--font-display)] font-bold text-[#F05030] text-xs mb-1">
                    Step {item.step}
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-[#111111] mb-1.5 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
                    {item.detail}
                  </p>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-sm">
            <Link href={ROUTES.insuranceClaims} className="text-[#F05030] font-semibold hover:underline">
              Insurance &amp; claims guidance
            </Link>
          </p>
        </div>
      </section>

      {showInsurers ? (
        <section className="bg-white" aria-labelledby="insurers-heading">
          <div className="container py-12 md:py-16">
            <div className="max-w-2xl">
              <p className="section-eyebrow">Insurance</p>
              <h2
                id="insurers-heading"
                className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading mb-3"
              >
                Working with insurers
              </h2>
              <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed mb-4">
                We prepare assessments and documentation for claim files. Claim approval remains with your insurer.
              </p>
              <ul className="flex flex-wrap gap-2 mb-4">
                {ACCEPTED_INSURERS.map((name) => (
                  <li
                    key={name}
                    className="text-sm border border-[#E5E7E7] rounded-xl px-3 py-1.5 font-[family-name:var(--font-body)] text-[#404040]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
              <Link href={ROUTES.insuranceClaims} className="text-sm font-semibold text-[#F05030]">
                Claims guidance <ArrowRight size={14} className="inline" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white" aria-labelledby="proof-heading">
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
              From the Mombasa workshop behind CMC Motors.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {WORKSHOP_PHOTOS.map((photo) => (
              <figure
                key={photo.base}
                className="aspect-[4/3] overflow-hidden bg-[#141414] border border-[#E5E7E7] rounded-xl"
              >
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
            View our work <ArrowRight size={14} className="inline" />
          </Link>
        </div>
      </section>

      {showReviews ? (
        <section className="bg-[#F6F6F6]" aria-labelledby="reviews-heading">
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
                  <li key={`${review.name}-${review.date}`} className="border border-[#E5E7E7] bg-white rounded-xl p-5">
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
            ) : null}
            {GOOGLE_BUSINESS_PROFILE_URL ? (
              <a
                href={GOOGLE_BUSINESS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#F05030] min-h-[44px] inline-flex items-center"
              >
                See all reviews on Google <ArrowRight size={14} className="inline" />
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="bg-[#F6F6F6]" aria-labelledby="why-heading">
        <div className="container py-12 md:py-16">
          <div className="max-w-2xl mb-8">
            <p className="section-eyebrow">Why Gwecely</p>
            <h2
              id="why-heading"
              className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading"
            >
              Why contact this workshop
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

      <section id="contact" className="bg-[#141414] text-white" aria-labelledby="location-heading">
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
            <p className="text-[#B0B0B0] text-sm font-[family-name:var(--font-body)] mb-6 select-all">
              {BRAND.legalName}
              <br />
              {BRAND.contact.address}
              <br />
              {BRAND.contact.poBox}
            </p>
            <ul className="space-y-3 text-sm font-[family-name:var(--font-body)] mb-8">
              {BRAND.contact.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-white hover:text-[#F07058] min-h-[44px]"
                  >
                    <Phone size={16} className="text-[#F05030]" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${BRAND.contact.emails[0]}`}
                  className="inline-flex items-center gap-2 text-white hover:underline min-h-[44px]"
                >
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
                className="btn-outline-gwecely text-xs inline-flex min-h-[44px]"
              >
                <MapPin size={15} />
                Get directions
              </a>
              <Link href={ROUTES.quote} className="btn-gwecely text-xs inline-flex min-h-[44px]">
                Request a quote
              </Link>
            </div>
          </div>
          <div className="border border-white/10 overflow-hidden rounded-xl min-h-[280px] bg-[#1F1F1F]">
            <ContactMap className="w-full h-full min-h-[280px] border-0" />
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-[#E5E7E7]" aria-labelledby="faq-heading">
        <div className="container py-12 md:py-14 max-w-3xl">
          <h2
            id="faq-heading"
            className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#111111] section-heading mb-6"
          >
            Common questions
          </h2>
          <div className="divide-y divide-[#E5E7E7] border border-[#E5E7E7] rounded-xl">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group p-4">
                <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] font-semibold text-sm text-[#111111] min-h-[44px] flex items-center">
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
    </>
  );
}
