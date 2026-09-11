import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import AboutSection from '@/components/AboutSection';
import { LeadCtaBand } from '@/components/conversion/ConversionSections';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function AboutPage() {
  usePageMeta({
    title: 'About Gwecely Limited | Motor Vehicle Garage Mombasa',
    description:
      'Gwecely Limited is a registered motor vehicle garage in Mombasa behind CMC Motors — panel beating, spray painting, accident repairs and fleet maintenance.',
  });

  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <AboutSection />
          <LeadCtaBand />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
