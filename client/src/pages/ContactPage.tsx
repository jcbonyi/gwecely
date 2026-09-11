import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import ContactSection from '@/components/ContactSection';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function ContactPage() {
  usePageMeta({
    title: 'Contact Gwecely Limited | Garage Mombasa',
    description:
      'Contact Gwecely Limited in Mombasa — phone, WhatsApp, email and workshop location behind CMC Motors. Request a vehicle repair quotation.',
  });

  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <ContactSection />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
