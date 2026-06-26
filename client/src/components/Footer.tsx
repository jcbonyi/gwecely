/**
 * Footer — Gwecely Limited
 * Design: Deep navy background, organized columns, newsletter signup, social links
 */

import { Link } from 'wouter';
import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { BRAND } from '@/lib/brand';
import BrandLogo from '@/components/BrandLogo';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Automotive Services', href: '#services' },
  { label: 'Shop Products', href: '#shop' },
  { label: 'Book a Service', href: '#booking' },
  { label: 'Customer Reviews', href: '#testimonials' },
  { label: 'Project Gallery', href: '#gallery' },
  { label: 'Contact Us', href: '#contact' },
];

const PRODUCT_CATEGORIES = [
  'Mechanical & Electrical',
  'Panel Beating & Painting',
  'Office Stationery',
  'Furniture & Fittings',
  'IT Equipment',
  'Health & Safety',
  'Dry Foods & Beverages',
  'Spare Parts',
];

const SOCIAL_LINKS = [
  { icon: MessageCircle, href: `https://wa.me/${BRAND.contact.whatsapp}`, label: 'WhatsApp' },
  { icon: Mail, href: `mailto:${BRAND.contact.emails[0]}`, label: 'Email' },
  { icon: Phone, href: `tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`, label: 'Phone' },
] as const;

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Subscribed successfully!', {
      description: 'You\'ll receive our latest offers and updates.',
    });
    setEmail('');
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'linear-gradient(135deg, #2D2626 0%, #463C3C 50%, #2D2626 100%)' }}>
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company overview */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <BrandLogo size="footer" />
            </div>
            <p className="text-orange-100 text-sm font-['Inter'] leading-relaxed mb-2 italic">
              &ldquo;{BRAND.tagline}&rdquo;
            </p>
            <p className="text-orange-100/80 text-sm font-['Inter'] leading-relaxed mb-5">
              {BRAND.about}
            </p>
            <div className="space-y-2">
              {BRAND.contact.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-orange-100 hover:text-white text-sm font-['Inter'] transition-colors">
                  <Phone size={13} className="text-[#F05A32]" />
                  {phone}
                </a>
              ))}
              {BRAND.contact.emails.map((email) => (
                <a key={email} href={`mailto:${email}`} className="flex items-center gap-2 text-orange-100 hover:text-white text-sm font-['Inter'] transition-colors">
                  <Mail size={13} className="text-[#F05A32]" />
                  {email}
                </a>
              ))}
              <div className="flex items-start gap-2 text-orange-100 text-sm font-['Inter']">
                <MapPin size={13} className="text-[#F05A32] mt-0.5 flex-shrink-0" />
                <span>{BRAND.contact.address}<br />{BRAND.contact.poBox}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-2 mt-5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-orange-100 hover:bg-[#F05A32] hover:text-white transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-['Barlow_Condensed'] font-700 text-white text-base mb-5 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-orange-100 hover:text-white text-sm font-['Inter'] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#F0826E] group-hover:w-2 transition-all" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product categories */}
          <div>
            <h3 className="font-['Barlow_Condensed'] font-700 text-white text-base mb-5 uppercase tracking-wide">
              Product Categories
            </h3>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => scrollTo('#shop')}
                    className="text-orange-100 hover:text-white text-sm font-['Inter'] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#F05A32] group-hover:w-2 transition-all" />
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-['Barlow_Condensed'] font-700 text-white text-base mb-5 uppercase tracking-wide">
              Stay Updated
            </h3>
            <p className="text-orange-100 text-sm font-['Inter'] mb-4">
              Subscribe for exclusive deals, automotive tips, and product updates.
            </p>
            <form onSubmit={handleNewsletter} className="mb-5">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-orange-200 text-sm font-['Inter'] focus:outline-none focus:border-[#F0826E] transition-colors"
                />
                <button
                  type="submit"
                  className="btn-gwecely text-sm py-2.5 justify-center"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {/* Service lines */}
            <div className="space-y-2">
              <p className="text-orange-200 text-xs font-['Inter'] font-medium uppercase tracking-wide">Our Service Lines</p>
              <div className="flex flex-wrap gap-2">
                {['Mechanical Engineering', 'Panel Beating', 'Office Supplies', 'IT Equipment', 'Health & Safety', 'Dry Foods'].map(line => (
                  <span key={line} className="text-[10px] bg-white/10 border border-white/20 text-orange-100 px-2 py-0.5 rounded font-['Inter']">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-orange-200 text-xs font-['Inter']">
            © {new Date().getFullYear()} Gwecely Limited. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/privacy" className="text-orange-200 hover:text-white text-xs font-['Inter'] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-orange-200 hover:text-white text-xs font-['Inter'] transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-orange-300 text-xs font-['Inter']">
            Made with ❤️ in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
