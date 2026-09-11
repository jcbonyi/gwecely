/**
 * Per-service SEO landing page — process content + breadcrumbs
 */

import { useEffect } from 'react';
import { Link, useParams } from 'wouter';
import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import NotFound from '@/pages/NotFound';
import ImageWithFallback from '@/components/ImageWithFallback';
import { LeadCtaBand } from '@/components/conversion/ConversionSections';
import { usePageMeta } from '@/hooks/usePageMeta';
import { findServiceBySlug, SERVICE_SEO, slugForService } from '@/lib/servicePages';
import { SERVICE_IMAGES } from '@/lib/categoryImages';
import { SERVICE_LONG_COPY } from '@/lib/serviceLongCopy';
import { PRIMARY_GARAGE_SERVICES } from '@/lib/services';
import { ROUTES } from '@/lib/routes';
import { requestQuote } from '@/lib/booking';
import { BRAND } from '@/lib/brand';
import { buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';

function injectBreadcrumbJsonLd(slug: string, title: string) {
  const id = 'gwecely-breadcrumb-jsonld';
  document.getElementById(id)?.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gwecely.co.ke/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.gwecely.co.ke/services' },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `https://www.gwecely.co.ke/services/${slug}`,
      },
    ],
  });
  document.head.appendChild(script);
}

function ServiceDetailContent({ slug }: { slug: string }) {
  const service = findServiceBySlug(slug)!;
  const seo = SERVICE_SEO[slug];
  const longCopy = SERVICE_LONG_COPY[slug];

  usePageMeta({
    title: seo?.title ?? `${service.title} Mombasa | Gwecely Limited`,
    description: seo?.description ?? service.desc,
  });

  useEffect(() => {
    injectBreadcrumbJsonLd(slug, service.title);
    return () => document.getElementById('gwecely-breadcrumb-jsonld')?.remove();
  }, [slug, service.title]);

  const image = SERVICE_IMAGES[service.imageKey];

  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <nav className="container py-3 text-xs text-[#6B6B6B] font-[family-name:var(--font-body)]" aria-label="Breadcrumb">
            <Link href={ROUTES.home} className="hover:text-[#F05030]">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <Link href={ROUTES.services} className="hover:text-[#F05030]">
              Services
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-[#404040]">{service.title}</span>
          </nav>

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
                  <a
                    href={whatsAppUrl(buildPhotoQuoteMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    Send photos on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => requestQuote(service.bookingService)}
                    className="btn-gwecely"
                  >
                    Get a quote
                  </button>
                </div>
              </div>
              <div className="aspect-[4/3] overflow-hidden bg-[#222]">
                <ImageWithFallback
                  src={image}
                  alt={`${service.title} at the Gwecely workshop behind CMC Motors, Mombasa`}
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                  loading="eager"
                />
              </div>
            </div>
          </section>

          <section className="bg-white">
            <div className="container py-14 md:py-16 max-w-3xl">
              <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#111111] section-heading mb-6">
                What this service covers
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="border border-[#E6E6E6] px-4 py-3 text-sm font-[family-name:var(--font-body)] text-[#404040]"
                  >
                    {f}
                  </li>
                ))}
              </ul>

              {longCopy && (
                <>
                  <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#111111] section-heading mb-4">
                    How the process works
                  </h2>
                  <div className="space-y-4 mb-10">
                    {longCopy.process.map((para) => (
                      <p
                        key={para.slice(0, 40)}
                        className="text-sm text-[#404040] font-[family-name:var(--font-body)] leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-[#111111] section-heading mb-3">
                    What to consider on cost
                  </h2>
                  <p className="text-sm text-[#404040] font-[family-name:var(--font-body)] leading-relaxed mb-8">
                    {longCopy.consideringCost}
                  </p>

                  <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-[#111111] section-heading mb-3">
                    How long it takes
                  </h2>
                  <p className="text-sm text-[#404040] font-[family-name:var(--font-body)] leading-relaxed mb-8">
                    {longCopy.timing}
                  </p>

                  <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-[#111111] section-heading mb-3">
                    Parts and materials
                  </h2>
                  <p className="text-sm text-[#404040] font-[family-name:var(--font-body)] leading-relaxed mb-10">
                    {longCopy.parts}
                  </p>
                </>
              )}

              <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)]">
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
