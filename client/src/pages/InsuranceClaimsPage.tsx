/**
 * Insurance & Claims — careful wording, no invented partnerships
 */

import { Link } from 'wouter';
import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import { RepairJourney, LeadCtaBand, FaqSection } from '@/components/conversion/ConversionSections';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/lib/routes';
import { requestQuote } from '@/lib/booking';
import { BRAND } from '@/lib/brand';

const AUDIENCES = [
  {
    title: 'Vehicle owners',
    text: 'Had an accident? Contact us for inspection and an estimate you can share with your insurer where a claim applies.',
  },
  {
    title: 'Insurance brokers & companies',
    text: 'We prepare assessments and repair estimates from our Mombasa workshop. We do not claim exclusive panel appointments unless separately confirmed in writing.',
  },
  {
    title: 'Fleet managers',
    text: 'Coordinate accident repairs and maintenance for company vehicles with clear documentation and workshop updates.',
  },
] as const;

export default function InsuranceClaimsPage() {
  usePageMeta({
    title: 'Insurance & Accident Claim Repairs Mombasa | Gwecely Limited',
    description:
      'Accident repair support in Mombasa — vehicle assessment, damage estimates, and insurance documentation assistance where required. Gwecely Limited behind CMC Motors.',
  });

  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <section className="bg-[#111111] text-white">
            <div className="container py-16 md:py-24 max-w-3xl">
              <p className="section-eyebrow !text-[#B0B0B0]">Insurance &amp; claims</p>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-5xl leading-tight mb-5">
                Had an accident? We can help you navigate the repair process
              </h1>
              <p className="text-[#C8C8C8] text-base md:text-lg font-[family-name:var(--font-body)] leading-relaxed mb-8">
                Gwecely inspects accident damage, prepares estimates, and carries out panel beating, spray painting, and
                related repairs at our workshop behind CMC Motors, Mombasa. Where your insurer must approve the work, we
                support that process with clear documentation — approval remains with the insurer.
              </p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => requestQuote('Accident Repairs')} className="btn-gwecely">
                  Get a quote
                </button>
                <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="btn-outline-gwecely">
                  Call the workshop
                </a>
              </div>
            </div>
          </section>

          <section className="bg-white border-b border-[#E6E6E6]">
            <div className="container py-14 md:py-16">
              <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl text-[#111111] section-heading mb-8">
                Who this page is for
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {AUDIENCES.map((a) => (
                  <article key={a.title} className="border border-[#E6E6E6] p-6">
                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-[#111111] mb-2">
                      {a.title}
                    </h3>
                    <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed">
                      {a.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <RepairJourney />

          <section className="bg-white">
            <div className="container py-14 max-w-3xl">
              <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#111111] section-heading mb-4">
                What we need from you
              </h2>
              <ul className="space-y-3 text-sm text-[#404040] font-[family-name:var(--font-body)] list-disc pl-5">
                <li>Vehicle make, model, and registration number</li>
                <li>Description of the damage or fault</li>
                <li>Photos of the damage (WhatsApp or at inspection)</li>
                <li>Insurer claim reference, if you already have one</li>
                <li>Preferred contact method and times</li>
              </ul>
              <p className="mt-6 text-sm text-[#6B6B6B]">
                Prefer a structured form?{' '}
                <Link href={ROUTES.quote} className="text-[#F05030] font-semibold hover:underline">
                  Request a quotation
                </Link>
                .
              </p>
            </div>
          </section>

          <FaqSection />
          <LeadCtaBand
            title="Start an accident repair assessment"
            text="Send vehicle details and damage photos — we will advise on inspection and estimate next steps."
          />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
