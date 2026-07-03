/**
 * Home Page — compact landing with hero and links to dedicated pages
 */

import SiteLayout from '@/components/SiteLayout';
import HeroSection from '@/components/HeroSection';
import HomeHighlights from '@/components/HomeHighlights';

export default function Home() {
  return (
    <SiteLayout>
      <main id="main">
        <HeroSection />
        <HomeHighlights />
      </main>
    </SiteLayout>
  );
}
