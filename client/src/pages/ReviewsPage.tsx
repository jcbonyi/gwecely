import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function ReviewsPage() {
  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <TestimonialsSection />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
