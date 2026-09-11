/**
 * Home Page — brand hero + proof strip
 */

import SiteLayout from '@/components/SiteLayout';
import HeroSection from '@/components/HeroSection';
import HomeProof from '@/components/HomeProof';

export default function Home() {
  return (
    <SiteLayout>
      <main id="main">
        <HeroSection />
        <HomeProof />
      </main>
    </SiteLayout>
  );
}
