/**
 * HomeHighlights — compact cards linking to dedicated site pages
 */

import { Link } from 'wouter';
import {
  ArrowRight,
  Calendar,
  Images,
  MessageCircle,
  Package,
  Star,
  User,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { BRAND } from '@/lib/brand';
import { HIGHLIGHT_IMAGES } from '@/lib/categoryImages';

const HIGHLIGHTS = [
  {
    href: ROUTES.services,
    icon: Wrench,
    title: 'Garage Services',
    desc: 'Panel beating, spray painting, accident repairs, servicing, mechanical work, and fleet maintenance.',
    image: HIGHLIGHT_IMAGES.services,
    featured: true,
  },
  {
    href: ROUTES.book,
    icon: Calendar,
    title: 'Book a Repair',
    desc: 'Schedule bodywork, respray, servicing, or fleet maintenance online.',
    image: HIGHLIGHT_IMAGES.book,
    featured: true,
  },
  {
    href: ROUTES.gallery,
    icon: Images,
    title: 'Project Gallery',
    desc: 'Before-and-after bodywork, resprays, and workshop projects.',
    image: HIGHLIGHT_IMAGES.gallery,
    featured: true,
  },
  {
    href: ROUTES.reviews,
    icon: Star,
    title: 'Customer Reviews',
    desc: 'What motorists and fleet operators say about Gwecely.',
    image: HIGHLIGHT_IMAGES.reviews,
    featured: false,
  },
  {
    href: ROUTES.contact,
    icon: MessageCircle,
    title: 'Contact Us',
    desc: 'Call, email, or WhatsApp — we respond within 2 hours.',
    image: HIGHLIGHT_IMAGES.contact,
    featured: false,
  },
  {
    href: ROUTES.hospitality,
    icon: UtensilsCrossed,
    title: 'Hospitality Supplies',
    desc: 'Tableware, kitchen equipment, and institutional procurement for hotels and restaurants.',
    image: HIGHLIGHT_IMAGES.hospitality,
    featured: false,
  },
  {
    href: `${ROUTES.shop}?category=hospitality-supplies`,
    icon: Package,
    title: 'Shop Supplies',
    desc: 'Browse automotive parts, hospitality lines, office goods, and more in our online shop.',
    image: HIGHLIGHT_IMAGES.shop,
    featured: false,
  },
] as const;

export default function HomeHighlights() {
  return (
    <section id="explore" className="py-16 md:py-20 bg-[#F5F3F2]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F05A32]/10 text-[#F05A32] text-sm px-4 py-1.5 rounded-full mb-4 font-['Inter'] font-medium">
            Explore Gwecely
          </div>
          <h2 className="font-['Barlow_Condensed'] font-800 text-3xl md:text-4xl text-[#2D2626] section-heading mb-3">
            GARAGE FIRST. EVERYTHING ELSE FOLLOWS.
          </h2>
          <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed">
            Book repairs, view our workshop services, shop hospitality supplies, or get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HIGHLIGHTS.map(({ href, icon: Icon, title, desc, image, featured }) => (
            <Link
              key={href}
              href={href}
              className={`group block rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                featured
                  ? 'border-[#F05A32]/30 bg-white shadow-md'
                  : 'border-gray-200 bg-white/80 shadow-sm opacity-95'
              }`}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2626]/75 via-[#2D2626]/20 to-transparent" />
                <div
                  className={`absolute bottom-3 left-3 w-10 h-10 rounded-lg flex items-center justify-center ${
                    featured ? 'bg-[#F05A32] text-white' : 'bg-white/90 text-[#F05A32]'
                  }`}
                >
                  <Icon size={20} />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-2 group-hover:text-[#F05A32] transition-colors">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm font-['Inter'] leading-relaxed mb-4">{desc}</p>
                <span className="inline-flex items-center gap-1 text-[#F05A32] text-sm font-['Inter'] font-medium">
                  View page
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href={ROUTES.about}
            className="inline-flex items-center gap-2 text-[#463C3C] hover:text-[#F05A32] font-['Inter'] text-sm font-medium transition-colors"
          >
            <User size={16} />
            Learn about {BRAND.legalName}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
