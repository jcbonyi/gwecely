/**
 * HomeHighlights — compact cards with photo headers linking to site pages
 */

import { useState } from 'react';
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
import {
  HIGHLIGHT_CARD_IMAGES,
  HIGHLIGHT_IMAGE_FALLBACK,
} from '@/lib/highlightImages';

const HIGHLIGHTS = [
  {
    href: ROUTES.services,
    icon: Wrench,
    title: 'Garage Services',
    desc: 'Panel beating, spray painting, accident repairs, servicing, mechanical work, and fleet maintenance.',
    image: HIGHLIGHT_CARD_IMAGES.services,
    featured: true,
  },
  {
    href: ROUTES.book,
    icon: Calendar,
    title: 'Book a Repair',
    desc: 'Schedule bodywork, respray, servicing, or fleet maintenance online.',
    image: HIGHLIGHT_CARD_IMAGES.book,
    featured: true,
  },
  {
    href: ROUTES.gallery,
    icon: Images,
    title: 'Project Gallery',
    desc: 'Before-and-after bodywork, resprays, and workshop projects.',
    image: HIGHLIGHT_CARD_IMAGES.gallery,
    featured: true,
  },
  {
    href: ROUTES.reviews,
    icon: Star,
    title: 'Customer Reviews',
    desc: 'What motorists and fleet operators say about Gwecely.',
    image: HIGHLIGHT_CARD_IMAGES.reviews,
    featured: false,
  },
  {
    href: ROUTES.contact,
    icon: MessageCircle,
    title: 'Contact Us',
    desc: 'Call, email, or WhatsApp — we respond within 2 hours.',
    image: HIGHLIGHT_CARD_IMAGES.contact,
    featured: false,
  },
  {
    href: ROUTES.hospitality,
    icon: UtensilsCrossed,
    title: 'Hospitality Supplies',
    desc: 'Tableware, kitchen equipment, and institutional procurement for hotels and restaurants.',
    image: HIGHLIGHT_CARD_IMAGES.hospitality,
    featured: false,
  },
  {
    href: ROUTES.shop,
    icon: Package,
    title: 'Parts & Shop',
    desc: 'Automotive spare parts and general procurement — secondary to our garage.',
    image: HIGHLIGHT_CARD_IMAGES.shop,
    featured: false,
  },
] as const;

function HighlightCard({
  href,
  icon: Icon,
  title,
  desc,
  image,
  featured,
}: (typeof HIGHLIGHTS)[number]) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <Link
      href={href}
      className={`group block rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
        featured ? 'border-[#F05A32]/40 bg-white shadow-md' : 'border-gray-200 bg-white shadow-sm'
      }`}
    >
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden bg-[#463C3C]">
        <img
          src={imgSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgSrc(HIGHLIGHT_IMAGE_FALLBACK)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2626]/90 via-[#2D2626]/35 to-[#2D2626]/10" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div
            className={`inline-flex items-center justify-center w-11 h-11 rounded-lg mb-2 shadow-lg ${
              featured ? 'bg-[#F05A32] text-white' : 'bg-white text-[#F05A32]'
            }`}
          >
            <Icon size={22} />
          </div>
          <h3 className="font-['Barlow_Condensed'] font-700 text-xl sm:text-2xl text-white leading-tight drop-shadow-sm">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-600 text-sm font-['Inter'] leading-relaxed mb-4">{desc}</p>
        <span className="inline-flex items-center gap-1 text-[#F05A32] text-sm font-['Inter'] font-medium">
          View page
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {HIGHLIGHTS.map((item) => (
            <HighlightCard key={item.href} {...item} />
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
