/**
 * HomeHighlights — compact cards linking to dedicated site pages
 */

import { Link } from 'wouter';
import {
  ArrowRight,
  Calendar,
  Images,
  MessageCircle,
  ShoppingBag,
  Star,
  User,
  Wrench,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { BRAND } from '@/lib/brand';

const HIGHLIGHTS = [
  {
    href: ROUTES.services,
    icon: Wrench,
    title: 'Garage Services',
    desc: 'Mechanical repairs, panel beating, and spray painting at our CMC Motors workshop.',
    featured: true,
  },
  {
    href: ROUTES.book,
    icon: Calendar,
    title: 'Book a Repair',
    desc: 'Schedule mechanical work, body repairs, or a full service online.',
    featured: true,
  },
  {
    href: ROUTES.gallery,
    icon: Images,
    title: 'Project Gallery',
    desc: 'Before-and-after bodywork, resprays, and workshop projects.',
    featured: false,
  },
  {
    href: ROUTES.reviews,
    icon: Star,
    title: 'Customer Reviews',
    desc: 'What motorists and businesses say about Gwecely.',
    featured: false,
  },
  {
    href: ROUTES.shop,
    icon: ShoppingBag,
    title: 'Shop Supplies',
    desc: 'Stationery, furniture, IT, health & safety, and dry foods.',
    featured: false,
  },
  {
    href: ROUTES.contact,
    icon: MessageCircle,
    title: 'Contact Us',
    desc: 'Call, email, or WhatsApp — we respond within 2 hours.',
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
            EVERYTHING IN ONE PLACE
          </h2>
          <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed">
            Our motor garage is the heart of the business — browse services, book repairs, or shop supplies on
            dedicated pages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HIGHLIGHTS.map(({ href, icon: Icon, title, desc, featured }) => (
            <Link
              key={href}
              href={href}
              className={`group block rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                featured
                  ? 'border-[#F05A32]/30 bg-white shadow-md'
                  : 'border-gray-200 bg-white shadow-sm'
              }`}
            >
              <div className="p-6">
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${
                    featured ? 'bg-[#F05A32] text-white' : 'bg-[#F5F3F2] text-[#F05A32]'
                  }`}
                >
                  <Icon size={22} />
                </div>
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
          <Link href={ROUTES.about} className="inline-flex items-center gap-2 text-[#463C3C] hover:text-[#F05A32] font-['Inter'] text-sm font-medium transition-colors">
            <User size={16} />
            Learn about {BRAND.legalName}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
