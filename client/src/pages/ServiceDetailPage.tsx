/**
 * Per-service SEO landing page
 */

import { Link, useParams } from 'wouter';
import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import NotFound from '@/pages/NotFound';
import { LeadCtaBand } from '@/components/conversion/ConversionSections';
import { usePageMeta } from '@/hooks/usePageMeta';
import { findServiceBySlug, SERVICE_SEO, slugForService } from '@/lib/servicePages';
import { SERVICE_IMAGES } from '@/lib/categoryImages';
import { PRIMARY_GARAGE_SERVICES } from '@/lib/services';
import { ROUTES } from '@/lib/routes';
import { requestQuote } from '@/lib/booking';
import { BRAND } from '@/lib/brand';

function ServiceDetailContent({ slug }: { slug: string }) {
  const service = findServiceBySlug(slug)!;
  const seo = SERVICE_SEO[slug];

  usePageMeta({
    title: seo?.title ?? `${service.title} Mombasa | Gwecely Limited`,
    description: seo?.description ?? service.desc,
    keywords: seo?.keywords,
  });

  const image = SERVICE_IMAGES[service.imageKey];

  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <section className="bg-[#111111] text-white">
            <div className="container py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="section-eyebrow !text-[#B0B0B0]">Workshop service</p>
                <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-5xl mb-4">
                  {service.title} in Mombasa
                </h1>
                <p className="text-[#C8C8C8] font-[family-name:var(--font-body)] leading-relaxed mb-6">
                  {service.desc}
                </p>
                <p className="text-sm text-[#999] mb-8 font-[family-name:var(--font-body)]">
                  {BRAND.contact.address}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => requestQuote(service.bookingService)}
                    className="btn-gwecely"
                  >
                    Get a quote
                  </button>
                  <Link href={ROUTES.services} className="btn-outline-gwecely">
                    All services
                  </Link>
                </div>
              </div>
              <div className="aspect-[4/3] overflow-hidden bg-[#222]">
                <img
                  src={image}
                  alt={`${service.title} at Gwecely Limited Mombasa`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          <section className="bg-white">
            <div className="container py-14 md:py-16">
              <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#111111] section-heading mb-6">
                What this service covers
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="border border-[#E6E6E6] px-4 py-3 text-sm font-[family-name:var(--font-body)] text-[#404040]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-[#6B6B6B] max-w-2xl font-[family-name:var(--font-body)]">
                Related:{' '}
                {PRIMARY_GARAGE_SERVICES.filter((s) => s.title !== service.title)
                  .slice(0, 3)
                  .map((s, i) => (
                    <span key={s.title}>
                      {i > 0 ? ' · ' : ''}
                      <Link
                        href={`/services/${slugForService(s.title)}`}
                        className="text-[#F05030] hover:underline"
                      >
                        {s.title}
                      </Link>
                    </span>
                  ))}
              </p>
            </div>
          </section>

          <LeadCtaBand title={`Request a quotation for ${service.title.toLowerCase()}`} />
        </PageContent>
      </main>
    </SiteLayout>
  );
}

export default function ServiceDetailPage() {
  const params = useParams<{ slug?: string }>();
  const slug = params.slug ?? '';
  const service = findServiceBySlug(slug);

  if (!service) {
    return <NotFound />;
  }

  return <ServiceDetailContent slug={slug} />;
}
