import SiteLayout from '@/components/SiteLayout';
import PageContent from '@/components/PageContent';
import ShopSection from '@/components/ShopSection';
import CheckoutSection from '@/components/CheckoutSection';

export default function ShopPage() {
  return (
    <SiteLayout>
      <main id="main">
        <PageContent>
          <ShopSection />
          <CheckoutSection />
        </PageContent>
      </main>
    </SiteLayout>
  );
}
