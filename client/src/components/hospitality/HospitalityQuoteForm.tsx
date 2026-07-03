import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { submitContact } from '@/lib/api';
import { BRAND } from '@/lib/brand';
import { QUOTE_CATEGORIES } from '@/lib/hospitality';
import { consumeHospitalityQuotePrefill } from '@/lib/hospitalityQuote';
import { buildHospitalityQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';

interface QuoteForm {
  name: string;
  company: string;
  phone: string;
  email: string;
  category: string;
  quantity: string;
  location: string;
  notes: string;
}

const INITIAL: QuoteForm = {
  name: '',
  company: '',
  phone: '',
  email: '',
  category: QUOTE_CATEGORIES[0],
  quantity: '',
  location: '',
  notes: '',
};

export default function HospitalityQuoteForm() {
  const [form, setForm] = useState<QuoteForm>(INITIAL);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prefill = consumeHospitalityQuotePrefill();
    if (prefill) {
      setForm((prev) => ({
        ...prev,
        category: prefill.category ?? prev.category,
        notes: [prefill.product ? `Product: ${prefill.product}` : '', prefill.notes ?? ''].filter(Boolean).join('\n'),
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    if (!form.name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!form.company.trim()) {
      toast.error('Please enter your company name');
      return false;
    }
    if (!form.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!form.quantity.trim()) {
      toast.error('Please enter the quantity required');
      return false;
    }
    if (!form.location.trim()) {
      toast.error('Please enter the delivery location');
      return false;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const message = [
      `Company: ${form.company}`,
      `Category: ${form.category}`,
      `Quantity: ${form.quantity}`,
      `Delivery: ${form.location}`,
      '',
      form.notes || 'No additional requirements.',
    ].join('\n');

    await submitContact({
      name: form.name,
      email: form.email,
      phone: form.phone,
      topic: 'Hospitality Supplies Quotation',
      message,
    });

    const mailBody = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : '',
      `Category: ${form.category}`,
      `Quantity: ${form.quantity}`,
      `Delivery location: ${form.location}`,
      '',
      form.notes,
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${BRAND.contact.emails[0]}?subject=${encodeURIComponent('Hospitality Supplies Quotation Request')}&body=${encodeURIComponent(mailBody)}`;

    toast.success('Quote request prepared', {
      description: 'Your email app is opening — or use WhatsApp for a faster response.',
    });
    setLoading(false);
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const url = whatsAppUrl(
      buildHospitalityQuoteMessage({
        name: form.name.trim(),
        company: form.company.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        category: form.category,
        quantity: form.quantity.trim(),
        location: form.location.trim(),
        notes: form.notes.trim() || undefined,
      })
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success('Opening WhatsApp…');
  };

  return (
    <section id="quote" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-eyebrow justify-center">
              <span className="section-eyebrow-dot" />
              Get a Quote
            </div>
            <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading mb-4">
              REQUEST A QUOTATION
            </h2>
            <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed">
              Tell us what you need — our procurement team will respond with competitive wholesale pricing and delivery
              options.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#F5F3F2] rounded-2xl p-6 md:p-10 border border-gray-100 shadow-lg space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">Full Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32]"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">Company Name *</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32]"
                  placeholder="Hotel / restaurant / institution"
                />
              </div>
              <div>
                <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">Phone Number *</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32]"
                  placeholder="+254 7XX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32]"
                  placeholder="you@company.co.ke"
                />
              </div>
              <div>
                <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">Product Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32]"
                >
                  {QUOTE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">Quantity Required *</label>
                <input
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32]"
                  placeholder="e.g. 200 dinner plates, 50 sets"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">Delivery Location *</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32]"
                  placeholder="City, county, or full delivery address"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">Additional Requirements</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] resize-y"
                  placeholder="Brand preferences, timeline, setup project details…"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button type="submit" disabled={loading} className="flex-1 btn-gwecely justify-center text-sm py-3">
                <Send size={16} />
                {loading ? 'Submitting…' : 'Submit Quote Request'}
              </button>
              <button type="button" onClick={handleWhatsApp} className="flex-1 btn-whatsapp justify-center text-sm py-3">
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
