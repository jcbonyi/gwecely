import LegalPageLayout from '@/components/LegalPageLayout';
import { BRAND } from '@/lib/brand';

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" updated="26 June 2026">
      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">1. Agreement</h2>
        <p>
          By using the {BRAND.legalName} website and services, you agree to these Terms of Service.
          If you do not agree, please do not use our site.
        </p>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">2. Services</h2>
        <p>
          We provide automotive repair services, panel beating, spray painting, and general business supplies
          including stationery, furniture, IT equipment, health &amp; safety products, and dry foods.
          Service availability and pricing are subject to confirmation.
        </p>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">3. Orders &amp; payments</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Online prices are indicative until confirmed by our team.</li>
          <li>We accept M-Pesa, bank transfer, and cash unless otherwise stated.</li>
          <li>Delivery timelines depend on stock and location across Kenya.</li>
          <li>Demo checkout and booking features on this site may not process live payments until integrated.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">4. Vehicle services</h2>
        <p>
          Workshop bookings are subject to parts availability and technician scheduling.
          We will communicate any additional work or costs before proceeding beyond the agreed scope.
        </p>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">5. Warranties &amp; returns</h2>
        <p>
          Genuine parts and supplies carry manufacturer or supplier warranties where applicable.
          Returns must be requested within 7 days of delivery for unused, resalable goods.
          Custom or perishable items may not be returnable.
        </p>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">6. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by Kenyan law, {BRAND.legalName} is not liable for indirect or consequential
          losses arising from use of this website. Our liability for direct losses is limited to the value of the relevant order or service.
        </p>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">7. Governing law</h2>
        <p>These terms are governed by the laws of the Republic of Kenya. Disputes shall be subject to Kenyan courts.</p>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">8. Contact</h2>
        <p>
          {BRAND.contact.address} · {BRAND.contact.phones[0]} · {BRAND.contact.emails[0]}
        </p>
      </section>
    </LegalPageLayout>
  );
}
