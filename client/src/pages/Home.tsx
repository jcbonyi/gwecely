/**
 * Home Page
 */

import SiteLayout from '@/components/SiteLayout';
import HeroSection from '@/components/HeroSection';
import HomeSections from '@/components/HomeSections';

export default function Home() {
  return (
    <SiteLayout>
      <main id="main">
        <HeroSection />
        <HomeSections />
      </main>
    </SiteLayout>
  );
}
