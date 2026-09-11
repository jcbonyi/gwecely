import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import BookingSection from '@/components/BookingSection';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function BookPage() {
  usePageMeta({
    title: 'Get a Quote | Vehicle Repair Mombasa | Gwecely Limited',
    description:
      'Request a quotation for panel beating, spray painting, accident repairs or servicing at Gwecely Limited, Mombasa. Send vehicle details and damage photos.',
  });

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
