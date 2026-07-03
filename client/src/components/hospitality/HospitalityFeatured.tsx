import { FileText } from 'lucide-react';
import { HOSPITALITY_FEATURED } from '@/lib/hospitality';
import { IMAGES } from '@/lib/images';
import { requestHospitalityQuote } from '@/lib/hospitalityQuote';
import { goToShopCategory } from '@/lib/navigation';

export default function HospitalityFeatured() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="section-eyebrow">
              <span className="section-eyebrow-dot" />
              Best Sellers
            </div>
            <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading">
              FEATURED PRODUCTS
            </h2>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <p className="text-gray-600 font-['Inter'] text-sm max-w-md leading-relaxed sm:text-right">
              Popular hospitality lines — request a quote or browse the full range in our shop.
            </p>
            <button
              type="button"
              onClick={() => goToShopCategory('hospitality-supplies')}
              className="text-sm font-['Inter'] font-medium text-[#F05A32] hover:text-[#463C3C] transition-colors"
            >
              View all hospitality supplies in shop →
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOSPITALITY_FEATURED.map((product) => (
            <article
              key={product.id}
              className="group rounded-2xl border border-gray-100 overflow-hidden bg-[#F5F3F2] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={IMAGES.hospitality[product.imageKey]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] uppercase tracking-wide bg-[#463C3C]/90 text-orange-100 px-2.5 py-1 rounded-full font-['Inter'] font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-2 group-hover:text-[#F05A32] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm font-['Inter'] leading-relaxed mb-4">{product.description}</p>
                <button
                  type="button"
                  onClick={() =>
                    requestHospitalityQuote({
                      product: product.name,
                      category: product.category,
                    })
                  }
                  className="w-full btn-gwecely text-xs py-2.5 justify-center"
                >
                  <FileText size={14} />
                  Request Quote
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
