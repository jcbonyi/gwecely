import { useState } from 'react';
import {
  ChefHat,
  PartyPopper,
  Sparkles,
  Utensils,
  UtensilsCrossed,
  Wine,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HOSPITALITY_CATEGORIES } from '@/lib/hospitality';
import { IMAGES } from '@/lib/images';

const ICONS: Record<string, LucideIcon> = {
  utensils: Utensils,
  wine: Wine,
  'fork-knife': UtensilsCrossed,
  'chef-hat': ChefHat,
  sparkles: Sparkles,
  party: PartyPopper,
};

export default function HospitalityCategories() {
  const [active, setActive] = useState<string>(HOSPITALITY_CATEGORIES[0].id);

  const current = HOSPITALITY_CATEGORIES.find((c) => c.id === active) ?? HOSPITALITY_CATEGORIES[0];
  const Icon = ICONS[current.icon] ?? Utensils;

  return (
    <section id="catalogue" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="section-eyebrow justify-center">
            <span className="section-eyebrow-dot" />
            Product Catalogue
          </div>
          <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading mb-4">
            HOSPITALITY PRODUCT
            <br />
            <span className="text-[#F05A32]">CATEGORIES</span>
          </h2>
          <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed">
            Tableware, glassware, kitchen equipment, housekeeping, and catering essentials — sourced for quality and
            supplied at wholesale-friendly prices across Kenya.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex flex-col gap-2">
            {HOSPITALITY_CATEGORIES.map((cat) => {
              const CatIcon = ICONS[cat.icon] ?? Utensils;
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all font-['Inter'] text-sm ${
                    isActive
                      ? 'bg-[#463C3C] text-white shadow-lg'
                      : 'bg-[#F5F3F2] text-[#2D2626] hover:bg-[#463C3C]/10'
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-[#F05A32]' : 'bg-white text-[#F05A32]'
                    }`}
                  >
                    <CatIcon size={18} />
                  </span>
                  <span className="font-medium leading-snug">{cat.title}</span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-lg bg-[#F5F3F2]">
              <div className="relative h-48 md:h-56">
                <img
                  src={IMAGES.hospitality[current.imageKey]}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2626]/90 via-[#2D2626]/40 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-end gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F05A32] flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-['Barlow_Condensed'] font-800 text-2xl md:text-3xl text-white">{current.title}</h3>
                    <p className="text-orange-100 text-sm font-['Inter']">{current.products.length} product lines available</p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-white">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-['Inter'] font-medium mb-4">Products</p>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {current.products.map((product) => (
                    <li
                      key={product}
                      className="flex items-center gap-2.5 text-sm text-gray-700 font-['Inter'] py-2 px-3 rounded-lg bg-[#F5F3F2]/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32] flex-shrink-0" />
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
