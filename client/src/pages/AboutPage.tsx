import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import AboutSection from '@/components/AboutSection';

export default function AboutPage() {
  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <AboutSection />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
