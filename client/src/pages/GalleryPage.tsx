import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import GallerySection from '@/components/GallerySection';

export default function GalleryPage() {
  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <GallerySection />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
