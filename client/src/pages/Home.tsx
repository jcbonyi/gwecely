import SiteLayout from '@/components/SiteLayout';
import HeroSection from '@/components/HeroSection';
import HomeSections from '@/components/HomeSections';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Home() {
  usePageMeta({
    title: 'Vehicle Repair & Panel Beating Mombasa | Gwecely Limited',
    description:
      'Professional vehicle repair, panel beating, spray painting and accident repairs in Mombasa. Workshop behind CMC Motors. Get a quote or call Gwecely Limited.',
    keywords:
      'garage Mombasa, panel beating Mombasa, car repair Mombasa, accident repair Mombasa, spray painting Mombasa',
  });

  return (
    <SiteLayout>
      <main id="main">
        <HeroSection />
        <HomeSections />
      </main>
    </SiteLayout>
  );
}
