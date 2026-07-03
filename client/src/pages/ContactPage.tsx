import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import ContactSection from '@/components/ContactSection';

export default function ContactPage() {
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
