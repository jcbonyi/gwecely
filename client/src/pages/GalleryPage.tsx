import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import GallerySection from '@/components/GallerySection';
import { LeadCtaBand } from '@/components/conversion/ConversionSections';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function GalleryPage() {
  usePageMeta({
    title: 'Our Work | Vehicle Repairs Mombasa | Gwecely Limited',
    description:
      'Workshop projects from Gwecely Limited in Mombasa — panel beating, spray painting, mechanical repairs and more. Request a quote for your vehicle.',
  });

  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <GallerySection />
          <LeadCtaBand title="Want similar work on your vehicle?" />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
