import SiteLayout from '@/components/SiteLayout';
import HeroSection from '@/components/HeroSection';
import HomeSections from '@/components/HomeSections';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Home() {
  usePageMeta({
    title: 'Accident Repairs & Panel Beating Mombasa | Gwecely Limited',
    description:
      'Mombasa vehicle repair workshop behind CMC Motors. Accident repairs, panel beating, spray painting, servicing and mechanical work. Send damage photos on WhatsApp.',
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
