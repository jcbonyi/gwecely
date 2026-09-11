import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import ServicesSection from '@/components/ServicesSection';
import { LeadCtaBand } from '@/components/conversion/ConversionSections';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function ServicesPage() {
  usePageMeta({
    title: 'Garage Services Mombasa | Panel Beating & Repairs | Gwecely Limited',
    description:
      'Panel beating, spray painting, accident repairs, servicing, mechanical repairs and fleet maintenance at Gwecely Limited, Mombasa.',
  });

  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <ServicesSection />
          <LeadCtaBand />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
