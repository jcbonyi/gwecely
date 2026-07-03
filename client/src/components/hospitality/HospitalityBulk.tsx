import { CheckCircle } from 'lucide-react';
import { HOSPITALITY_PROCUREMENT_SERVICES } from '@/lib/hospitality';
import { IMAGES } from '@/lib/images';
import { requestHospitalityQuote } from '@/lib/hospitalityQuote';

export default function HospitalityBulk() {
  return (
    <section className="py-20 md:py-28 bg-[#F5F3F2]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[320px]">
            <img
              src={IMAGES.hospitality.procurement}
              alt="Hotel hospitality procurement"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2626]/80 via-transparent to-transparent" />
          </div>

          <div>
            <div className="section-eyebrow">
              <span className="section-eyebrow-dot" />
              Bulk &amp; Institutional
            </div>
            <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading mb-5">
              RELIABLE HOSPITALITY
              <br />
              <span className="text-[#F05A32]">PROCUREMENT SOLUTIONS</span>
            </h2>
            <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed mb-6">
              We provide end-to-end procurement and supply solutions for hotels, restaurants, institutions, and large
              organizations — ensuring timely delivery, quality products, and competitive pricing.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {HOSPITALITY_PROCUREMENT_SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-2 text-sm text-gray-700 font-['Inter']">
                  <CheckCircle size={16} className="text-[#F05A32] flex-shrink-0" />
                  {service}
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => requestHospitalityQuote()} className="btn-gwecely text-sm">
              Request Bulk Quotation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
