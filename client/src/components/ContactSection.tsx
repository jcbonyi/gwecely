/**
 * Contact — quiet brochure layout + map
 */

import { useState } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { submitContact } from '@/lib/api';
import { buildContactEnquiryMessage, buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { BRAND } from '@/lib/brand';
import { MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from '@/lib/routes';
import { formatOpeningHoursLines } from '@/lib/openingHours';

const HOURS_LINES = formatOpeningHoursLines();

const ENQUIRY_TOPICS = [
  'Vehicle Service / Repairs',
  'Spare Parts & Shop Order',
  'Office Supplies / Procurement',
  'General Enquiry',
];

const CONTACT_INFO = [
  {
    icon: Phone,
    title: 'Phone',
    lines: BRAND.contact.phones,
    action: { label: 'Call now', href: `tel:${BRAND.contact.phones[0].replace(/\s/g, '')}` },
  },
  {
    icon: Mail,
    title: 'Email',
    lines: BRAND.contact.emails,
    action: { label: 'Send email', href: `mailto:${BRAND.contact.emails[0]}` },
  },
  {
    icon: MapPin,
    title: 'Address',
    lines: [BRAND.contact.address, BRAND.contact.poBox],
    action: { label: 'Get directions', href: MAPS_DIRECTIONS_URL },
  },
  {
    icon: Clock,
    title: 'Hours',
    lines: [...HOURS_LINES],
    action: null as { label: string; href: string } | null,
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
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${BRAND.contact.emails[0]}?subject=${encodeURIComponent(`Gwecely enquiry: ${enquiry.topic}`)}&body=${encodeURIComponent(body)}`;
    toast.success('Opening your email app…', {
      description: 'Or use WhatsApp for a faster reply.',
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
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-[#F6F6F6]">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="section-eyebrow">Contact</p>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading mb-3">
            Find us in Mombasa
          </h1>
          <p className="text-[#6B6B6B] font-[family-name:var(--font-body)] text-base leading-relaxed">
            Behind CMC Motors, off Bishop Macarios Road. Call, email, or send photos on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="surface-card bg-white p-5">
                    <div className="w-10 h-10 rounded bg-[#F05030]/10 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-[#F05030]" />
                    </div>
                    <h2 className="font-[family-name:var(--font-display)] font-semibold text-sm text-[#111111] mb-2">
                      {item.title}
                    </h2>
                    {item.lines.map((line) => (
                      <p key={line} className="text-[#6B6B6B] text-sm font-[family-name:var(--font-body)]">
                        {line}
                      </p>
                    ))}
                    {item.action ? (
                      <a
                        href={item.action.href}
                        target={item.action.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center mt-3 text-[#F05030] text-xs font-semibold hover:text-[#D9482A] min-h-[44px]"
                      >
                        {item.action.label} →
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <a
              href={whatsAppUrl(buildPhotoQuoteMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Send photos on WhatsApp
            </a>

            <form onSubmit={handleEnquiry} className="surface-card bg-white p-5 md:p-6 space-y-3">
              <h2 className="font-[family-name:var(--font-display)] font-semibold text-lg text-[#111111]">
                Send an enquiry
              </h2>
              <p className="text-[#6B6B6B] text-xs font-[family-name:var(--font-body)] mb-1">
                Prefer WhatsApp for damage photos. Use this form for general messages.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="enquiry-name" className="block text-xs font-medium text-[#404040] mb-1">
                    Name *
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    value={enquiry.name}
                    onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                    className="form-field"
                  />
                </div>
                <div>
                  <label htmlFor="enquiry-phone" className="block text-xs font-medium text-[#404040] mb-1">
                    Phone
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    value={enquiry.phone}
                    onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                    placeholder="+254 7XX XXX XXX"
                    className="form-field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="enquiry-email" className="block text-xs font-medium text-[#404040] mb-1">
                  Email
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  value={enquiry.email}
                  onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                  className="form-field"
                />
              </div>

              <div>
                <label htmlFor="enquiry-topic" className="block text-xs font-medium text-[#404040] mb-1">
                  Topic
                </label>
                <select
                  id="enquiry-topic"
                  value={enquiry.topic}
                  onChange={(e) => setEnquiry({ ...enquiry, topic: e.target.value })}
                  className="form-field bg-white"
                >
                  {ENQUIRY_TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="enquiry-message" className="block text-xs font-medium text-[#404040] mb-1">
                  Message *
                </label>
                <textarea
                  id="enquiry-message"
                  required
                  rows={4}
                  value={enquiry.message}
                  onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                  className="form-field resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button type="submit" className="btn-gwecely text-sm py-2.5 flex-1 justify-center">
                  <Send size={15} />
                  Send via email
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

          <div className="surface-card overflow-hidden bg-white min-h-[400px] flex flex-col">
            <div className="flex-1 relative min-h-[320px]">
              <iframe
                title="Gwecely Limited Location — Mombasa"
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full absolute inset-0"
              />
            </div>
            <div className="p-4 border-t border-[#E6E6E6]">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#F05030]" />
                <span className="text-sm font-[family-name:var(--font-body)] text-[#404040] font-medium">
                  {BRAND.contact.address}
                </span>
              </div>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#F05030] font-semibold hover:underline mt-2 inline-block min-h-[44px]"
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
