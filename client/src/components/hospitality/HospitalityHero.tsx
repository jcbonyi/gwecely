import { ArrowRight, FileText, Phone } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { buildGeneralEnquiryMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { requestHospitalityQuote, scrollToHospitalityCatalogue } from '@/lib/hospitalityQuote';

const HERO_STRIP = [
  { src: IMAGES.hospitality.heroDining, alt: 'Hotel dining setup' },
  { src: IMAGES.hospitality.heroTableware, alt: 'Restaurant table setting' },
  { src: IMAGES.hospitality.heroKitchen, alt: 'Commercial kitchen' },
];

export default function HospitalityHero() {
  return (
    <section className="hospitality-hero relative min-h-[85vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(29,24,24,0.94) 0%, rgba(45,38,38,0.88) 45%, rgba(70,60,60,0.82) 100%), url('${IMAGES.hospitality.hero}') center/cover no-repeat`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1d1818]/60 via-transparent to-transparent" />

      <div className="container relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-amber-200/90 text-xs md:text-sm font-['Inter'] uppercase tracking-[0.2em] mb-5">
            <span className="w-8 h-px bg-[#F05A32]" />
            Hospitality &amp; Institutional Supply
          </p>
          <h1 className="font-['Barlow_Condensed'] font-800 text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] text-white leading-[1.05] mb-6">
            Your Trusted Hospitality
            <br />
            <span className="text-[#F05A32]">Supplies Partner</span> in Kenya
          </h1>
          <p className="text-orange-50/90 text-lg md:text-xl font-['Inter'] leading-relaxed max-w-2xl mb-8">
            Supplying hotels, restaurants, resorts, caterers, institutions, and businesses with quality hospitality
            products, kitchen equipment, dining ware, and housekeeping essentials at competitive prices.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <button type="button" onClick={() => requestHospitalityQuote()} className="btn-gwecely text-sm md:text-base">
              <FileText size={18} />
              Request a Quotation
            </button>
            <button type="button" onClick={scrollToHospitalityCatalogue} className="btn-outline-gwecely text-sm md:text-base">
              View Product Catalogue
              <ArrowRight size={16} />
            </button>
            <a
              href={whatsAppUrl(buildGeneralEnquiryMessage('Hospitality Supplies Quotation'))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm md:text-base"
            >
              <WhatsAppIcon className="w-[18px] h-[18px]" />
              WhatsApp Us
            </a>
            <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="btn-outline-gwecely text-sm md:text-base opacity-90">
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
          {HERO_STRIP.map(({ src, alt }) => (
            <div key={alt} className="relative h-36 md:h-44 rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2626]/70 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
