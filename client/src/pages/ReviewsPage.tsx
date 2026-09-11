import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import { LeadCtaBand } from '@/components/conversion/ConversionSections';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Link } from 'wouter';
import { ROUTES } from '@/lib/routes';

export default function ReviewsPage() {
  usePageMeta({
    title: 'Customer Reviews | Gwecely Limited Mombasa',
    description:
      'Verified customer reviews for Gwecely Limited will be published here once customers grant permission. Contact the Mombasa workshop for an inspection.',
  });

  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <section className="bg-white py-16 md:py-20">
            <div className="container max-w-2xl">
              <p className="section-eyebrow">Reviews</p>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl text-[#111111] section-heading mb-4">
                Customer reviews
              </h1>
              <p className="text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed mb-6">
                We only publish reviews that customers have verified and agreed to share. This page will be updated as
                those reviews are collected. It does not list sample or invented testimonials.
              </p>
              <p className="text-sm text-[#6B6B6B] mb-8">
                If you have had work done at Gwecely and are happy to share feedback, please{' '}
                <Link href={ROUTES.contact} className="text-[#F05030] font-semibold hover:underline">
                  contact us
                </Link>
                .
              </p>
            </div>
          </section>
          <LeadCtaBand />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
