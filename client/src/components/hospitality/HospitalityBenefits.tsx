import { CheckCircle2, Shield, Truck, Users, Package, Headphones, BadgeCheck, Sparkles } from 'lucide-react';
import { HOSPITALITY_BENEFITS } from '@/lib/hospitality';

const BENEFIT_ICONS = [BadgeCheck, Package, Users, Truck, Shield, Sparkles, CheckCircle2, Headphones];

export default function HospitalityBenefits() {
  return (
    <section className="py-20 md:py-24 bg-[#2D2626] text-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[#F0826E] text-xs uppercase tracking-[0.2em] font-['Inter'] font-medium mb-3">Why Gwecely</p>
          <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl section-heading mb-4">
            WHY CHOOSE GWECELY LTD
          </h2>
          <p className="text-orange-100/80 font-['Inter'] text-sm leading-relaxed">
            A dependable procurement partner for Kenya&apos;s hospitality and institutional sector — quality products,
            wholesale pricing, and responsive support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOSPITALITY_BENEFITS.map((benefit, i) => {
            const Icon = BENEFIT_ICONS[i] ?? CheckCircle2;
            return (
              <div
                key={benefit}
                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F05A32]/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#F0826E]" />
                </div>
                <p className="font-['Inter'] text-sm text-orange-50 leading-relaxed flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#F05A32] flex-shrink-0 mt-0.5" />
                  {benefit}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
