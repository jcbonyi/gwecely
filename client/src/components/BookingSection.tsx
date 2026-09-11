/**
 * Quote form — WhatsApp-primary; secondary form details
 */

import { useState, useRef } from 'react';
import { buildSimpleQuoteMessage, buildPhotoQuoteMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { BRAND } from '@/lib/brand';
import { Camera, Car, FileText, Phone, User } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  vehicle: string;
  damage: string;
}

const INITIAL: FormData = { name: '', phone: '', vehicle: '', damage: '' };

export default function BookingSection() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoName, setPhotoName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    else if (!/^(\+254|0)[17]\d{8}$/.test(form.phone.replace(/\s/g, '')))
      next.phone = 'Enter a valid Kenyan phone number';
    if (!form.vehicle.trim()) next.vehicle = 'Vehicle make / model is required';
    if (!form.damage.trim()) next.damage = 'Briefly describe the damage';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const openWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const url = whatsAppUrl(
      buildSimpleQuoteMessage({
        ...form,
        photoSelected: Boolean(photoName),
      })
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fieldClass = (name: string) =>
    `form-field ${errors[name] ? 'form-field-error' : ''}`;

  return (
    <section id="booking" className="py-14 md:py-20 bg-[#F6F6F6]">
      <div className="container max-w-xl">
        <p className="section-eyebrow">Get a quote</p>
        <h1 className="font-[family-name:var(--font-display)] font-bold text-3xl text-[#111111] section-heading mb-3">
          Get a quote
        </h1>
        <p className="text-base text-[#6B6B6B] font-[family-name:var(--font-body)] leading-relaxed mb-8">
          Fastest path: send damage photos on WhatsApp. Or fill the short form below and continue in chat.
        </p>

        <a
          href={whatsAppUrl(buildPhotoQuoteMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full justify-center mb-8"
          data-conversion="whatsapp-photos-quote-page"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Send photos on WhatsApp
        </a>

        <p className="text-xs uppercase tracking-wider text-[#6B6B6B] font-[family-name:var(--font-display)] font-semibold mb-3">
          Or request a quote with details
        </p>

        <form onSubmit={openWhatsApp} noValidate className="surface-card bg-white p-6 md:p-8 space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-[#404040] mb-1.5">
              <User size={12} className="inline mr-1" />
              Name *
            </label>
            <input id="name" name="name" value={form.name} onChange={handleChange} className={fieldClass('name')} />
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
              className={fieldClass('phone')}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="vehicle" className="block text-xs font-medium text-[#404040] mb-1.5">
              <Car size={12} className="inline mr-1" />
              Vehicle (make / model) *
            </label>
            <input
              id="vehicle"
              name="vehicle"
              value={form.vehicle}
              onChange={handleChange}
              placeholder="e.g. Toyota Hilux"
              className={fieldClass('vehicle')}
            />
            {errors.vehicle && <p className="text-red-500 text-xs mt-1">{errors.vehicle}</p>}
          </div>

          <div>
            <label htmlFor="damage" className="block text-xs font-medium text-[#404040] mb-1.5">
              <FileText size={12} className="inline mr-1" />
              Damage description *
            </label>
            <textarea
              id="damage"
              name="damage"
              rows={3}
              value={form.damage}
              onChange={handleChange}
              placeholder="e.g. Front bumper and left wing after a collision"
              className={fieldClass('damage')}
            />
            {errors.damage && <p className="text-red-500 text-xs mt-1">{errors.damage}</p>}
          </div>

          <div>
            <label htmlFor="photo" className="block text-xs font-medium text-[#404040] mb-1.5">
              <Camera size={12} className="inline mr-1" />
              Damage photo (attach again on WhatsApp)
            </label>
            <input
              ref={fileRef}
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setPhotoName(file ? file.name : null);
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full min-h-[44px] border border-dashed border-[#E6E6E6] rounded px-4 py-3 text-sm text-[#6B6B6B] text-left hover:border-[#F05030]"
            >
              {photoName ? `Selected: ${photoName}` : 'Choose a photo from your phone'}
            </button>
          </div>

          <button type="submit" className="btn-whatsapp w-full justify-center" data-conversion="quote-form-whatsapp">
            <WhatsAppIcon className="w-5 h-5" />
            Continue on WhatsApp
          </button>

          <p className="text-xs text-center text-[#6B6B6B]">
            Or call{' '}
            <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`} className="text-[#F05030] font-medium">
              {BRAND.contact.phones[0]}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
