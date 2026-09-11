import {
  Building2,
  Coffee,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  School,
  TreePalm,
  Utensils,
  Users,
  Building,
  HandHeart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HOSPITALITY_INDUSTRIES } from '@/lib/hospitality';

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Hotels: Hotel,
  Restaurants: Utensils,
  'Cafés': Coffee,
  Resorts: TreePalm,
  Lodges: TreePalm,
  'Catering Companies': HandHeart,
  Schools: School,
  Universities: GraduationCap,
  Hospitals: HeartPulse,
  NGOs: Users,
  'Government Institutions': Landmark,
  'Corporate Offices': Building2,
};

export default function HospitalityIndustries() {
  return (
    <section className="py-20 md:py-24 bg-[#F6F6F6]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="section-eyebrow justify-center">
            <span className="section-eyebrow-dot" />
            Who We Serve
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-800 text-4xl md:text-5xl text-[#111111] section-heading mb-4">
            INDUSTRIES WE SERVE
          </h2>
          <p className="text-gray-600 font-[family-name:var(--font-body)] text-sm leading-relaxed">
            From boutique lodges on the coast to national institutions — we supply hospitality products tailored to your
            operational needs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {HOSPITALITY_INDUSTRIES.map((industry) => {
            const Icon = INDUSTRY_ICONS[industry] ?? Building;
            return (
              <div
                key={industry}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#F05030]/20 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#F05030]/10 flex items-center justify-center">
                  <Icon size={22} className="text-[#F05030]" />
                </div>
                <span className="font-[family-name:var(--font-body)] text-sm font-medium text-[#111111]">{industry}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
