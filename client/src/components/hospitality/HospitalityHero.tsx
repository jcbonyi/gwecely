import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'wouter';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { ROUTES } from '@/lib/routes';
import { buildGeneralEnquiryMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { requestHospitalityQuote, scrollToHospitalityCatalogue } from '@/lib/hospitalityQuote';

export default function HospitalityHero() {
  return (
    <section className="hospitality-hero relative min-h-[78vh] flex items-end overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(29,24,24,0.55) 0%, rgba(45,38,38,0.75) 45%, rgba(29,24,24,0.94) 100%), url('${IMAGES.hospitality.hero}') center/cover no-repeat`,
        }}
      />

      <div className="container relative z-10 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="max-w-2xl">
          <p className="section-eyebrow !text-[#F0826E] mb-4 [&::before]:bg-[#F05A32]">
            From {BRAND.name} · B2B supply lane
          </p>
          <h1 className="font-['Barlow_Condensed'] font-800 text-4xl sm:text-5xl md:text-6xl text-white leading-[1.02] mb-4">
            Hospitality supplies
            <br />
            <span className="text-[#F05A32]">for Kenya&apos;s venues</span>
          </h1>
          <p className="text-white/75 text-base md:text-lg font-[family-name:var(--font-body)] leading-relaxed max-w-xl mb-8">
            Tableware, kitchen equipment, and institutional procurement — backed by the same Gwecely team behind CMC
            Motors, Mombasa.
          </p>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => requestHospitalityQuote()} className="btn-gwecely text-sm md:text-base">
              <FileText size={18} />
              Request a Quotation
            </button>
            <button
              type="button"
              onClick={scrollToHospitalityCatalogue}
              className="btn-outline-gwecely text-sm md:text-base"
            >
              View catalogue
              <ArrowRight size={16} />
            </button>
            <a
              href={whatsAppUrl(buildGeneralEnquiryMessage('Hospitality Supplies Quotation'))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm md:text-base"
            >
              <WhatsAppIcon className="w-[18px] h-[18px]" />
              WhatsApp
            </a>
          </div>

          <p className="mt-8 text-white/40 text-xs font-[family-name:var(--font-body)]">
            Looking for vehicle repairs?{' '}
            <Link href={ROUTES.services} className="text-white/60 hover:text-[#F0826E] underline-offset-2 hover:underline">
              Go to garage services
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
