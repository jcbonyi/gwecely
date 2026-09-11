/**
 * Reviews page — only shows content when GBP / named reviews exist.
 * Task: claim Google Business Profile, then set GOOGLE_BUSINESS_PROFILE_URL in proofContent.ts
 */

import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import { LeadCtaBand } from '@/components/conversion/ConversionSections';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Link, Redirect } from 'wouter';
import { ROUTES } from '@/lib/routes';
import {
  GOOGLE_BUSINESS_PROFILE_URL,
  GOOGLE_REVIEWS,
  hasReviewsContent,
} from '@/lib/proofContent';

export default function ReviewsPage() {
  usePageMeta({
    title: 'Customer Reviews | Gwecely Limited Mombasa',
    description: 'Customer feedback for Gwecely Limited, Mombasa vehicle repair workshop.',
  });

  if (!hasReviewsContent()) {
    return <Redirect to={ROUTES.contact} />;
  }

  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <section className="bg-white py-16 md:py-20">
            <div className="container max-w-2xl">
              <p className="section-eyebrow">Reviews</p>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl text-[#111111] section-heading mb-6">
                Customer reviews
              </h1>
              {GOOGLE_REVIEWS.length > 0 ? (
                <ul className="space-y-4 mb-8">
                  {GOOGLE_REVIEWS.map((review) => (
                    <li key={`${review.name}-${review.date}`} className="border border-[#E5E7E7] rounded-xl p-5">
                      <p className="font-semibold text-[#111111]">{review.name}</p>
                      <p className="text-xs text-[#888] mb-2">
                        {'★'.repeat(Math.round(review.rating))} · {review.date}
                      </p>
                      <p className="text-sm text-[#404040] leading-relaxed">“{review.quote}”</p>
                    </li>
                  ))}
                </ul>
              ) : null}
              {GOOGLE_BUSINESS_PROFILE_URL ? (
                <a
                  href={GOOGLE_BUSINESS_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#F05030]"
                >
                  See all reviews on Google
                </a>
              ) : (
                <Link href={ROUTES.contact} className="text-sm font-semibold text-[#F05030]">
                  Contact the workshop
                </Link>
              )}
            </div>
          </section>
          <LeadCtaBand />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
