/**
 * BookingSection — stepped form with progress + clear success state
 */

import { useState, useEffect, useMemo } from 'react';
import DemoBanner from '@/components/DemoBanner';
import { submitBooking, generateRef } from '@/lib/api';
import { buildBookingMessage, buildQuoteQuickMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { consumePreselectedService } from '@/lib/booking';
import { BOOKING_SERVICE_OPTIONS } from '@/lib/services';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { Calendar, Car, CheckCircle, Clock, ImagePlus, Mail, MessageCircle, Phone, User } from 'lucide-react';

const SERVICES = [...BOOKING_SERVICE_OPTIONS];

interface FormData {
  name: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  regNumber: string;
  service: string;
  date: string;
  notes: string;
  preferredContact: string;
}

interface FormErrors {
  [key: string]: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  vehicleMake: '',
  vehicleModel: '',
  regNumber: '',
  service: '',
  date: '',
  notes: '',
  preferredContact: 'WhatsApp',
};

const STEPS = [
  { id: 1, label: 'Contact' },
  { id: 2, label: 'Vehicle' },
  { id: 3, label: 'Service' },
] as const;

export default function BookingSection() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [photoCount, setPhotoCount] = useState(0);

  useEffect(() => {
    const preselected = consumePreselectedService();
    if (preselected && SERVICES.includes(preselected as (typeof SERVICES)[number])) {
      setForm((prev) => ({ ...prev, service: preselected }));
    }
  }, []);

  const activeStep = useMemo(() => {
    const contactDone = Boolean(form.name.trim() && form.phone.trim());
    const vehicleDone = Boolean(
      form.vehicleMake.trim() && form.vehicleModel.trim() && form.regNumber.trim()
    );
    const serviceDone = Boolean(form.service);
    if (!contactDone) return 1;
    if (!vehicleDone) return 2;
    if (!serviceDone) return 3;
    return 3;
  }, [form]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^(\+254|0)[17]\d{8}$/.test(form.phone.replace(/\s/g, '')))
      newErrors.phone = 'Enter a valid Kenyan phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email address';
    if (!form.vehicleMake.trim()) newErrors.vehicleMake = 'Vehicle make is required';
    if (!form.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required';
    if (!form.regNumber.trim()) newErrors.regNumber = 'Registration number is required';
    if (!form.service) newErrors.service = 'Please select a service';
    if (!form.notes.trim()) newErrors.notes = 'Please describe the damage or problem';
    if (form.date) {
      const selected = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) newErrors.date = 'Please select a future date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const ref = generateRef();
    const result = await submitBooking({ ...form, ref });

    setLoading(false);
    setBookingRef(result.ref ?? ref);
    setSubmitted(true);
  };

  const today = new Date().toISOString().split('T')[0];

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-lg text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 transition-all min-h-[44px] ${
      errors[field]
        ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
        : 'border-gray-200 focus:border-[#F05030] focus:ring-[#F05030]/20'
    }`;

  return (
    <section id="booking" className="py-20 md:py-28 bg-[#F6F6F6]">
      <div className="container">
        <div className="mb-14 max-w-2xl">
          <p className="section-eyebrow">Get a quote</p>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl text-[#111111] section-heading">
            Request a quotation
          </h2>
          <p className="text-gray-600 font-[family-name:var(--font-body)] mt-4">
            Tell us about the vehicle and the damage or service you need. We will follow up by phone or WhatsApp during
            opening hours. For faster assessment, attach photos below and send them when you confirm on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 bg-[#404040] rounded-2xl overflow-hidden text-white">
            <div className="relative h-44">
              <img
                src={IMAGES.booking.workshop}
                alt="Gwecely workshop in Mombasa"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#404040] via-[#404040]/40 to-transparent" />
            </div>
            <div className="p-8 -mt-4 relative">
              <h3 className="font-[family-name:var(--font-display)] font-700 text-2xl mb-6">WORKSHOP DETAILS</h3>

              <div className="space-y-5">
                {[
                  {
                    icon: Clock,
                    title: 'Working Hours',
                    lines: ['Mon – Fri: 8:00 AM – 6:00 PM', 'Saturday: 8:00 AM – 2:00 PM', 'Sunday: Closed'],
                  },
                  { icon: Phone, title: 'Call Us', lines: BRAND.contact.phones },
                  { icon: Mail, title: 'Email Us', lines: BRAND.contact.emails },
                  { icon: Car, title: 'Workshop Location', lines: [BRAND.contact.address, BRAND.contact.poBox] },
                ].map(({ icon: Icon, title, lines }) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-orange-100" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-display)] font-700 text-sm text-orange-50 mb-0.5">{title}</p>
                      {lines.map((l, i) => (
                        <p key={i} className="text-orange-100 text-sm font-[family-name:var(--font-body)]">
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={whatsAppUrl(buildQuoteQuickMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 btn-whatsapp w-full justify-center rounded-xl py-3"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Quote via WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-5 py-8 text-center animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-[#F05030]/10 flex items-center justify-center animate-pulse-ring">
                  <CheckCircle size={32} className="text-[#F05030]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] font-700 text-2xl text-[#111111] mb-2">REQUEST RECEIVED</h3>
                  <p className="text-gray-600 font-[family-name:var(--font-body)] text-sm max-w-sm">
                    Thank you, <strong>{form.name}</strong>. We have your quotation request for{' '}
                    <strong>{form.service}</strong>. Confirm on WhatsApp and attach damage photos if you have them.
                  </p>
                </div>
                <DemoBanner compact className="w-full max-w-sm text-left" />
                <div className="bg-[#F6F6F6] rounded-xl p-4 text-left w-full max-w-sm">
                  <p className="text-xs text-gray-500 font-[family-name:var(--font-body)] mb-1">Reference Number</p>
                  <p className="font-[family-name:var(--font-display)] font-700 text-[#F05030] text-lg">{bookingRef}</p>
                </div>
                <a
                  href={whatsAppUrl(
                    buildBookingMessage({ ...form, preferredContact: form.preferredContact, photoCount }, bookingRef)
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-[family-name:var(--font-display)] font-700 text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  <MessageCircle size={18} />
                  Confirm on WhatsApp
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm(INITIAL_FORM);
                    setBookingRef('');
                    setPhotoCount(0);
                  }}
                  className="btn-gwecely text-sm py-2.5 px-6"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-center gap-2 mb-6" aria-label="Booking progress">
                  {STEPS.map((step, i) => {
                    const done = activeStep > step.id || (step.id === 3 && form.service && form.date);
                    const current = activeStep === step.id;
                    return (
                      <div key={step.id} className="flex items-center gap-2 flex-1 min-w-0">
                        <div
                          className={`flex items-center gap-2 min-w-0 ${
                            current || done ? 'opacity-100' : 'opacity-45'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                              done
                                ? 'bg-[#F05030] text-white'
                                : current
                                  ? 'bg-[#404040] text-white'
                                  : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {done && step.id < activeStep ? '✓' : step.id}
                          </span>
                          <span className="font-[family-name:var(--font-display)] font-700 text-sm text-[#111111] truncate hidden sm:inline">
                            {step.label}
                          </span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <div
                            className={`h-0.5 flex-1 rounded transition-colors ${
                              activeStep > step.id ? 'bg-[#F05030]' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <h3 className="font-[family-name:var(--font-display)] font-700 text-xl text-[#111111] mb-6">
                  VEHICLE QUOTE REQUEST
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      <User size={12} className="inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Kamau"
                      className={inputClass('name')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-body)]">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      <Phone size={12} className="inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+254 7XX XXX XXX"
                      className={inputClass('phone')}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-body)]">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      <Mail size={12} className="inline mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClass('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-body)]">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      <Car size={12} className="inline mr-1" />
                      Vehicle Make *
                    </label>
                    <input
                      type="text"
                      name="vehicleMake"
                      value={form.vehicleMake}
                      onChange={handleChange}
                      placeholder="Toyota, Nissan, etc."
                      className={inputClass('vehicleMake')}
                    />
                    {errors.vehicleMake && (
                      <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-body)]">
                        {errors.vehicleMake}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      Vehicle Model *
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={form.vehicleModel}
                      onChange={handleChange}
                      placeholder="Corolla, Hilux, etc."
                      className={inputClass('vehicleModel')}
                    />
                    {errors.vehicleModel && (
                      <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-body)]">
                        {errors.vehicleModel}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      Registration Number *
                    </label>
                    <input
                      type="text"
                      name="regNumber"
                      value={form.regNumber}
                      onChange={handleChange}
                      placeholder="KAA 123A"
                      className={`${inputClass('regNumber')} uppercase`}
                    />
                    {errors.regNumber && (
                      <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-body)]">
                        {errors.regNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={inputClass('service')}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-body)]">{errors.service}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      <Calendar size={12} className="inline mr-1" />
                      Preferred assessment date (optional)
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={today}
                      className={inputClass('date')}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-body)]">{errors.date}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      Preferred contact method *
                    </label>
                    <select
                      name="preferredContact"
                      value={form.preferredContact}
                      onChange={handleChange}
                      className={inputClass('preferredContact')}
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Phone call">Phone call</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      Description of problem / damage *
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe the damage, fault, or service needed..."
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm font-[family-name:var(--font-body)] focus:outline-none focus:border-[#F05030] focus:ring-2 focus:ring-[#F05030]/20 transition-all resize-none ${
                        errors.notes ? 'border-red-400' : 'border-gray-200'
                      }`}
                    />
                    {errors.notes && (
                      <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-body)]">{errors.notes}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-[family-name:var(--font-body)] font-medium text-gray-700 mb-1.5">
                      <ImagePlus size={12} className="inline mr-1" />
                      Damage photos (optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setPhotoCount(e.target.files?.length ?? 0)}
                      className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:border file:border-[#E6E6E6] file:bg-[#F6F6F6] file:text-sm file:font-medium"
                    />
                    <p className="text-xs text-[#6B6B6B] mt-1.5 font-[family-name:var(--font-body)]">
                      {photoCount > 0
                        ? `${photoCount} file(s) selected. After submit, attach them in the WhatsApp chat that opens.`
                        : 'Photos stay on your device until you attach them in WhatsApp after submitting.'}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gwecely justify-center text-sm py-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <MessageCircle size={16} />
                      Send photos &amp; request a quote
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
