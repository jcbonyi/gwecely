import { Quote, Star } from 'lucide-react';
import { HOSPITALITY_TESTIMONIALS } from '@/lib/hospitality';
import { IMAGES } from '@/lib/images';

export default function HospitalityTestimonials() {
  return (
    <section className="py-20 md:py-28 bg-[#463C3C]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[#F0826E] text-xs uppercase tracking-[0.2em] font-['Inter'] font-medium mb-3">Testimonials</p>
          <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-white section-heading mb-4">
            TRUSTED BY HOSPITALITY PROFESSIONALS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {HOSPITALITY_TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 md:p-8 shadow-xl relative">
              <Quote size={32} className="text-[#F05A32]/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 font-['Inter'] text-sm leading-relaxed mb-6">&ldquo;{t.review}&rdquo;</p>
              <div className="flex items-center gap-4">
                <img
                  src={IMAGES.hospitality.avatars[t.avatarKey]}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#F05A32]/30"
                />
                <div>
                  <p className="font-['Barlow_Condensed'] font-700 text-[#2D2626]">{t.name}</p>
                  <p className="text-gray-500 text-xs font-['Inter']">
                    {t.role} · {t.organization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
