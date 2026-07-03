import SiteLayout from '@/components/SiteLayout';
import HospitalityHero from '@/components/hospitality/HospitalityHero';
import HospitalityCategories from '@/components/hospitality/HospitalityCategories';
import HospitalityBenefits from '@/components/hospitality/HospitalityBenefits';
import HospitalityIndustries from '@/components/hospitality/HospitalityIndustries';
import HospitalityFeatured from '@/components/hospitality/HospitalityFeatured';
import HospitalityBulk from '@/components/hospitality/HospitalityBulk';
import HospitalityTestimonials from '@/components/hospitality/HospitalityTestimonials';
import HospitalityQuoteForm from '@/components/hospitality/HospitalityQuoteForm';
import { HOSPITALITY_SEO } from '@/lib/hospitality';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function HospitalityPage() {
  usePageMeta({
    title: HOSPITALITY_SEO.title,
    description: HOSPITALITY_SEO.description,
    keywords: HOSPITALITY_SEO.keywords,
  });

  return (
    <SiteLayout>
      <main id="main">
        <HospitalityHero />
        <HospitalityCategories />
        <HospitalityBenefits />
        <HospitalityIndustries />
        <HospitalityFeatured />
        <HospitalityBulk />
        <HospitalityTestimonials />
        <HospitalityQuoteForm />
      </main>
    </SiteLayout>
  );
}
