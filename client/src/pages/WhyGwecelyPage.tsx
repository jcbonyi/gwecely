import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import { WhyGwecelySection, LeadCtaBand, TrustBar } from '@/components/conversion/ConversionSections';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BRAND } from '@/lib/brand';

export default function WhyGwecelyPage() {
  usePageMeta({
    title: 'Why Gwecely Limited | Professional Garage Mombasa',
    description:
      'Why vehicle owners, fleets and brokers choose Gwecely Limited in Mombasa — workshop capability, clear process, and insurance-aware documentation.',
  });

  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <section className="bg-[#111111] text-white">
            <div className="container py-16 md:py-20 max-w-3xl">
              <p className="section-eyebrow !text-[#B0B0B0]">Why Gwecely</p>
              <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-5xl mb-5">
                A professional automotive workshop you can brief with confidence
              </h1>
              <p className="text-[#C8C8C8] font-[family-name:var(--font-body)] leading-relaxed">
                {BRAND.legalName} is a registered motor vehicle garage in Mombasa specialising in panel beating, spray
                painting, accident repairs, servicing, mechanical work, and fleet maintenance. We earn trust through
                process and workmanship — not empty slogans.
              </p>
            </div>
          </section>
          <TrustBar />
          <WhyGwecelySection showCta={false} />
          <LeadCtaBand />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
