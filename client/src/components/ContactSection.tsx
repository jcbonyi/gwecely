/**
 * ContactSection — Gwecely Limited
 */

import { useState } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { submitContact } from '@/lib/api';
import { buildContactEnquiryMessage, buildGeneralEnquiryMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
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
      description: 'Or use WhatsApp below for a faster reply.',
    });
    setEnquiry({ name: '', email: '', phone: '', topic: ENQUIRY_TOPICS[0], message: '' });
  };

  const handleWhatsAppEnquiry = () => {
    if (!enquiry.name.trim() || !enquiry.message.trim()) {
      toast.error('Please enter your name and message');
      return;
    }
    const url = whatsAppUrl(
      buildContactEnquiryMessage({
        name: enquiry.name.trim(),
        email: enquiry.email.trim() || undefined,
        phone: enquiry.phone.trim() || undefined,
        topic: enquiry.topic,
        message: enquiry.message.trim(),
      })
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success('Opening WhatsApp…', { description: 'Send the pre-filled message to reach our team.' });
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
                <WhatsAppIcon className="w-8 h-8" />
                <div>
                  <h3 className="font-['Barlow_Condensed'] font-700 text-lg">WhatsApp Us</h3>
                  <p className="text-green-100 text-xs font-['Inter']">Fastest response — usually within minutes</p>
                </div>
              </div>
              <a
                href={whatsAppUrl(buildGeneralEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#25D366] font-['Barlow_Condensed'] font-700 text-sm px-5 py-2.5 rounded-lg hover:bg-green-50 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
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

              <div className="flex flex-col sm:flex-row gap-2">
                <button type="submit" className="btn-gwecely text-sm py-2.5 flex-1 justify-center">
                  <Send size={15} />
                  Send via Email
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="btn-whatsapp text-sm py-2.5 flex-1 justify-center"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Send via WhatsApp
                </button>
              </div>
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
