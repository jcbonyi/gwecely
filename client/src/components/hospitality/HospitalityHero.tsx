import { FileText } from 'lucide-react';
import { Link } from 'wouter';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { ROUTES } from '@/lib/routes';
import { buildGeneralEnquiryMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { requestHospitalityQuote, scrollToHospitalityCatalogue } from '@/lib/hospitalityQuote';

export default function HospitalityHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#111111]">
      <div className="absolute inset-0">
        <img
          src={IMAGES.hospitality.hero}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/88 to-[#111111]/55" />
      </div>

      <div className="container relative z-10 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-xl">
          <p className="section-eyebrow !text-[#B0B0B0]">Gwecely Limited · Institutional supply</p>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] tracking-tight mb-4">
            Hospitality and institutional supplies
          </h1>
          <p className="text-[#C8C8C8] text-base md:text-lg font-[family-name:var(--font-body)] leading-relaxed mb-8">
            Tableware, kitchen equipment, and bulk procurement for hotels, restaurants, and institutions — managed by
            the same Mombasa team behind our vehicle workshop.
          </p>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => requestHospitalityQuote()} className="btn-gwecely">
              <FileText size={16} />
              Request a quotation
            </button>
            <button type="button" onClick={scrollToHospitalityCatalogue} className="btn-outline-gwecely">
              Browse catalogue
            </button>
            <a
              href={whatsAppUrl(buildGeneralEnquiryMessage('Hospitality Supplies Quotation'))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <p className="mt-8 text-[#777] text-sm font-[family-name:var(--font-body)]">
            Need vehicle repairs instead?{' '}
            <Link href={ROUTES.services} className="text-[#F05030] hover:underline">
              Garage services
            </Link>
            {' · '}
            <span className="text-[#999]">{BRAND.contact.phones[0]}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
