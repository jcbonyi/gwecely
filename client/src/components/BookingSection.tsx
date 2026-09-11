/**
 * Quote form — WhatsApp-first (honest: no fake backend success)
 */

import { useState, useEffect } from 'react';
import { buildQuoteFormMessage, buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { consumePreselectedService } from '@/lib/booking';
import { BOOKING_SERVICE_OPTIONS } from '@/lib/services';
import { BRAND } from '@/lib/brand';
import { Car, Mail, MessageCircle, Phone, User } from 'lucide-react';

const SERVICES = [...BOOKING_SERVICE_OPTIONS];

interface FormData {
  name: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  regNumber: string;
  service: string;
  notes: string;
  preferredContact: string;
}

const INITIAL: FormData = {
  name: '',
  phone: '',
  email: '',
  vehicleMake: '',
  vehicleModel: '',
  regNumber: '',
  service: '',
  notes: '',
  preferredContact: 'WhatsApp',
};

export default function BookingSection() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const preselected = consumePreselectedService();
    if (preselected && SERVICES.includes(preselected as (typeof SERVICES)[number])) {
      setForm((prev) => ({ ...prev, service: preselected }));
    }
  }, []);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    else if (!/^(\+254|0)[17]\d{8}$/.test(form.phone.replace(/\s/g, '')))
      next.phone = 'Enter a valid Kenyan phone number';
    if (!form.vehicleMake.trim()) next.vehicleMake = 'Vehicle make is required';
    if (!form.vehicleModel.trim()) next.vehicleModel = 'Vehicle model is required';
    if (!form.service) next.service = 'Select a service';
    if (!form.notes.trim()) next.notes = 'Describe the damage or problem';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const openWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const url = whatsAppUrl(buildQuoteFormMessage(form));
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const field = (name: string) =>
    `w-full px-4 py-3 border rounded-sm text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 min-h-[44px] ${
      errors[name]
        ? 'border-red-400 focus:ring-red-100'
        : 'border-[#E6E6E6] focus:border-[#F05030] focus:ring-[#F05030]/15'
    }`;

  return (
    <section id="booking" className="py-14 md:py-20 bg-[#F6F6F6]">
      <div className="container max-w-xl">
        <p className="section-eyebrow">Get a quote</p>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl text-[#111111] section-heading mb-3">
          Request a quotation
        </h1>
        <p className="text-sm text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed mb-6">
          Fill in the details below, then continue on WhatsApp. That opens a message to the workshop with your vehicle
          information so you can attach damage photos in the same chat.
        </p>

        <a
          href={whatsAppUrl(buildPhotoQuoteMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full justify-center mb-6"
          data-conversion="whatsapp-photos-quote-page"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Or send photos on WhatsApp now
        </a>

        <form
          onSubmit={openWhatsApp}
          noValidate
          className="bg-white border border-[#E6E6E6] p-6 md:p-8 space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-[#404040] mb-1.5">
              <User size={12} className="inline mr-1" />
              Name *
            </label>
            <input id="name" name="name" value={form.name} onChange={handleChange} className={field('name')} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-[#404040] mb-1.5">
              <Phone size={12} className="inline mr-1" />
              Phone *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+254 7XX XXX XXX"
              className={field('phone')}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-[#404040] mb-1.5">
              <Mail size={12} className="inline mr-1" />
              Email (optional)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={field('email')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vehicleMake" className="block text-xs font-medium text-[#404040] mb-1.5">
                <Car size={12} className="inline mr-1" />
                Make *
              </label>
              <input
                id="vehicleMake"
                name="vehicleMake"
                value={form.vehicleMake}
                onChange={handleChange}
                placeholder="Toyota"
                className={field('vehicleMake')}
              />
              {errors.vehicleMake && <p className="text-red-500 text-xs mt-1">{errors.vehicleMake}</p>}
            </div>
            <div>
              <label htmlFor="vehicleModel" className="block text-xs font-medium text-[#404040] mb-1.5">
                Model *
              </label>
              <input
                id="vehicleModel"
                name="vehicleModel"
                value={form.vehicleModel}
                onChange={handleChange}
                placeholder="Hilux"
                className={field('vehicleModel')}
              />
              {errors.vehicleModel && <p className="text-red-500 text-xs mt-1">{errors.vehicleModel}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="regNumber" className="block text-xs font-medium text-[#404040] mb-1.5">
              Registration (optional)
            </label>
            <input
              id="regNumber"
              name="regNumber"
              value={form.regNumber}
              onChange={handleChange}
              className={`${field('regNumber')} uppercase`}
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-xs font-medium text-[#404040] mb-1.5">
              Service needed *
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              className={field('service')}
            >
              <option value="">Select…</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
          </div>

          <div>
            <label htmlFor="notes" className="block text-xs font-medium text-[#404040] mb-1.5">
              Description of damage / problem *
            </label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className={`${field('notes')} resize-none`}
            />
            {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes}</p>}
          </div>

          <div>
            <label htmlFor="preferredContact" className="block text-xs font-medium text-[#404040] mb-1.5">
              Preferred contact method
            </label>
            <select
              id="preferredContact"
              name="preferredContact"
              value={form.preferredContact}
              onChange={handleChange}
              className={field('preferredContact')}
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone call">Phone call</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <p className="text-xs text-[#6B6B6B] font-[family-name:var(--font-body)]">
            Your details are used only to respond to this enquiry. After you continue, attach photos in WhatsApp.
          </p>

          <button type="submit" className="btn-whatsapp w-full justify-center" data-conversion="quote-whatsapp-submit">
            <MessageCircle size={16} />
            Continue on WhatsApp
          </button>

          <p className="text-center text-xs text-[#6B6B6B]">
            Or call{' '}
            <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="text-[#F05030] font-semibold">
              {BRAND.contact.phones[0]}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
