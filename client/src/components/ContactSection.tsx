/**
 * ContactSection — Gwecely Limited
 */

import { useState } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { submitContact } from '@/lib/api';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';

const ENQUIRY_TOPICS = [
  'Vehicle Service / Repairs',
  'Spare Parts & Shop Order',
  'Office Supplies / Procurement',
  'General Enquiry',
];

const CONTACT_INFO = [
  {
    icon: Phone,
    title: 'Phone Numbers',
    lines: BRAND.contact.phones,
    action: { label: 'Call Now', href: `tel:${BRAND.contact.phones[0].replace(/\s/g, '')}` },
  },
  {
    icon: Mail,
    title: 'Email Addresses',
    lines: BRAND.contact.emails,
    action: { label: 'Send Email', href: `mailto:${BRAND.contact.emails[0]}` },
  },
  {
    icon: MapPin,
    title: 'Physical Address',
    lines: [BRAND.contact.address, BRAND.contact.poBox],
    action: { label: 'Get Directions', href: 'https://maps.google.com/?q=Behind+CMC+Motors+Mombasa+Bishop+Macarios+Road' },
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Mon – Fri: 8:00 AM – 6:00 PM', 'Saturday: 8:00 AM – 2:00 PM', 'Sunday: Closed'],
    action: null,
  },
];

export default function ContactSection() {
  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    phone: '',
    topic: ENQUIRY_TOPICS[0],
    message: '',
  });

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiry.name.trim() || !enquiry.message.trim()) {
      toast.error('Please enter your name and message');
      return;
    }
    if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    await submitContact({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      topic: enquiry.topic,
      message: enquiry.message,
    });

    const body = [
      `Name: ${enquiry.name}`,
      enquiry.email ? `Email: ${enquiry.email}` : '',
      enquiry.phone ? `Phone: ${enquiry.phone}` : '',
      `Topic: ${enquiry.topic}`,
      '',
      enquiry.message,
    ].filter(Boolean).join('\n');

    window.location.href = `mailto:${BRAND.contact.emails[0]}?subject=${encodeURIComponent(`Gwecely enquiry: ${enquiry.topic}`)}&body=${encodeURIComponent(body)}`;
    toast.success('Opening your email app…', {
      description: 'If nothing opens, call or WhatsApp us directly.',
    });
    setEnquiry({ name: '', email: '', phone: '', topic: ENQUIRY_TOPICS[0], message: '' });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F5F3F2]">
      <div className="container">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-[#F05A32]/10 text-[#F05A32] text-sm px-4 py-1.5 rounded-full mb-4 font-['Inter'] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32]" />
            Get In Touch
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading">
              FIND US IN
              <br />
              MOMBASA
            </h2>
            <p className="text-gray-600 font-['Inter'] max-w-sm">
              Visit us behind CMC Motors, off Bishop Macarios Road. Call, email, or chat on WhatsApp.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <div className="relative h-48 rounded-2xl overflow-hidden shadow-sm">
              <img
                src="/brand/page13_img1.jpeg"
                alt="Gwecely workshop, Mombasa"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2626]/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-['Barlow_Condensed'] font-700 text-lg">{BRAND.contact.address}</p>
                <p className="text-orange-100 text-sm font-['Inter']">{BRAND.contact.poBox}</p>
              </div>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CONTACT_INFO.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-[#F05A32]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#F05A32]" />
                  </div>
                  <h3 className="font-['Barlow_Condensed'] font-700 text-base text-[#2D2626] mb-2">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-gray-600 text-sm font-['Inter']">{line}</p>
                  ))}
                  {item.action && (
                    <a
                      href={item.action.href}
                      target={item.action.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 mt-3 text-[#F05A32] text-xs font-['Inter'] font-medium hover:text-[#463C3C] transition-colors"
                    >
                      {item.action.label} →
                    </a>
                  )}
                </div>
              );
            })}

            <div className="sm:col-span-2 bg-[#25D366] rounded-xl p-5 text-white">
              <div className="flex items-center gap-3 mb-3">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <div>
                  <h3 className="font-['Barlow_Condensed'] font-700 text-lg">WhatsApp Us</h3>
                  <p className="text-green-100 text-xs font-['Inter']">Fastest response — usually within minutes</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${BRAND.contact.whatsapp}?text=${encodeURIComponent('Hello Gwecely, I would like to inquire about your services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#25D366] font-['Barlow_Condensed'] font-700 text-sm px-5 py-2.5 rounded-lg hover:bg-green-50 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
            </div>

            <form onSubmit={handleEnquiry} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-['Barlow_Condensed'] font-700 text-lg text-[#2D2626] mb-1">Send an Enquiry</h3>
              <p className="text-gray-500 text-xs font-['Inter'] mb-4">We typically respond within one business day.</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="enquiry-name" className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    value={enquiry.name}
                    onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] focus:ring-2 focus:ring-[#F05A32]/20"
                  />
                </div>
                <div>
                  <label htmlFor="enquiry-phone" className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    value={enquiry.phone}
                    onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                    placeholder="+254 7XX XXX XXX"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] focus:ring-2 focus:ring-[#F05A32]/20"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="enquiry-email" className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="enquiry-email"
                  type="email"
                  value={enquiry.email}
                  onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] focus:ring-2 focus:ring-[#F05A32]/20"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="enquiry-topic" className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1">Topic</label>
                <select
                  id="enquiry-topic"
                  value={enquiry.topic}
                  onChange={(e) => setEnquiry({ ...enquiry, topic: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] bg-white"
                >
                  {ENQUIRY_TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="enquiry-message" className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  id="enquiry-message"
                  required
                  rows={4}
                  value={enquiry.message}
                  onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] focus:ring-2 focus:ring-[#F05A32]/20 resize-none"
                />
              </div>

              <button type="submit" className="btn-gwecely text-sm py-2.5 w-full justify-center">
                <Send size={15} />
                Send Enquiry
              </button>
            </form>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 min-h-[400px] bg-white flex flex-col">
            <div className="relative h-36">
              <img
                src={IMAGES.contact.port}
                alt="Mombasa — Gwecely location"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#463C3C]/40" />
            </div>
            <div className="flex-1 relative">
              <iframe
                title="Gwecely Limited Location — Mombasa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.0!2d39.6682!3d-4.0435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012e5a9a9a9a9%3A0x0!2sCMC+Motors+Mombasa!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#F05A32]" />
                <span className="text-sm font-['Inter'] text-gray-700 font-medium">{BRAND.contact.address}</span>
              </div>
              <a
                href="https://maps.google.com/?q=Behind+CMC+Motors+Mombasa+Bishop+Macarios+Road"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#F05A32] font-['Inter'] hover:underline mt-1 block"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
