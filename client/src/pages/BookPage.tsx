import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import BookingSection from '@/components/BookingSection';

export default function BookPage() {
  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <BookingSection />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
