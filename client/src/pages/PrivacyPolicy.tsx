import LegalPageLayout from '@/components/LegalPageLayout';
import { BRAND } from '@/lib/brand';

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="26 June 2026">
      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">1. Who we are</h2>
        <p>
          {BRAND.legalName} ({BRAND.name}) is a company registered in Kenya under the Companies Act, 2015.
          Our registered office is at {BRAND.contact.address}, {BRAND.contact.poBox}.
        </p>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">2. Information we collect</h2>
        <p>When you use our website, contact forms, booking forms, or shop checkout, we may collect:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Name, phone number, and email address</li>
          <li>Vehicle details submitted for service bookings</li>
          <li>Order and enquiry messages</li>
          <li>Technical data such as browser type and pages visited (if analytics are enabled)</li>
        </ul>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">3. How we use your information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Respond to enquiries and service bookings</li>
          <li>Process product orders and deliveries</li>
          <li>Send order confirmations and service updates</li>
          <li>Improve our website and customer experience</li>
          <li>Comply with applicable Kenyan law</li>
        </ul>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">4. Sharing your data</h2>
        <p>
          We do not sell your personal data. We may share information with payment providers (e.g. Safaricom M-Pesa),
          delivery partners, or authorities when required by law.
        </p>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">5. Data retention</h2>
        <p>
          We retain contact and transaction records for as long as needed to fulfil orders, provide services,
          and meet legal and accounting requirements.
        </p>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">6. Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data by contacting us at{' '}
          <a href={`mailto:${BRAND.contact.emails[0]}`} className="text-[#F05A32] hover:underline">{BRAND.contact.emails[0]}</a>.
        </p>
      </section>

      <section>
        <h2 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-3">7. Contact</h2>
        <p>
          For privacy questions, email {BRAND.contact.emails[0]} or call {BRAND.contact.phones[0]}.
        </p>
      </section>
    </LegalPageLayout>
  );
}
