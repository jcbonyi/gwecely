import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import ServicesSection from '@/components/ServicesSection';

export default function ServicesPage() {
  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <ServicesSection />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
