/**
 * Home page body — services, journey, work, why, FAQ, lead CTAs
 */

import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { PRIMARY_GARAGE_SERVICES } from '@/lib/services';
import { SERVICE_IMAGES } from '@/lib/categoryImages';
import { GALLERY_IMAGES } from '@/lib/galleryImages';
import { ROUTES } from '@/lib/routes';
import { requestQuote } from '@/lib/booking';
import { slugForService } from '@/lib/servicePages';
import {
  TrustBar,
  RepairJourney,
  WhyGwecelySection,
  FaqSection,
  LeadCtaBand,
} from '@/components/conversion/ConversionSections';

const FEATURED_WORK = [
  {
    title: 'Body repair',
    detail: 'Panel beating after collision damage',
    image: GALLERY_IMAGES.hiluxRepair,
    note: null as string | null,
  },
  {
    title: 'Spray finish',
    detail: 'Refinishing and paint work in the workshop',
    image: GALLERY_IMAGES.paintSpray,
    note: null as string | null,
  },
  {
    title: 'Mechanical work',
    detail: 'Workshop mechanical and component repairs',
    image: GALLERY_IMAGES.engineOverhaul,
    note: null as string | null,
  },
] as const;

export default function HomeSections() {
  return (
    <>
      <TrustBar />

      {/* Services */}
      <section className="bg-[#F6F6F6]" aria-labelledby="services-heading">
        <div className="container py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <p className="section-eyebrow">Our services</p>
              <h2
                id="services-heading"
                className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading"
              >
                What we do in the workshop
              </h2>
            </div>
            <Link
              href={ROUTES.services}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#404040] hover:text-[#F05030]"
            >
              All services
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
                <div className="flex flex-wrap gap-3 text-sm font-semibold">
                  <Link
                    href={`/services/${slugForService(service.title)}`}
                    className="text-[#404040] hover:text-[#F05030]"
                  >
                    Learn more
                  </Link>
                  <button
                    type="button"
                    onClick={() => requestQuote(service.bookingService)}
                    className="text-[#F05030] hover:text-[#D9482A]"
                  >
                    Get a quote
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RepairJourney />

      {/* Our work */}
      <section className="bg-white" aria-labelledby="work-heading">
        <div className="container py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="section-eyebrow">Our work</p>
              <h2
                id="work-heading"
                className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading"
              >
                Workshop projects
              </h2>
              <p className="mt-4 text-sm text-[#6B6B6B] max-w-xl font-[family-name:var(--font-body)]">
                Selected photographs from the Mombasa workshop. Before-and-after pairs can be added as you document
                completed jobs — see placeholders on the Our Work page.
              </p>
            </div>
            <Link
              href={ROUTES.ourWork}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#404040] hover:text-[#F05030]"
            >
              View our work
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

      <WhyGwecelySection />
      <FaqSection />
      <LeadCtaBand />
    </>
  );
}
