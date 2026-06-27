/**
 * BookingSection — Gwecely Limited
 * Design: Diagonal top, navy left panel with info, white right panel with form
 * Full form validation, success state
 */

import { useState } from 'react';
import DemoBanner from '@/components/DemoBanner';
import { submitBooking, generateRef } from '@/lib/api';
import { buildBookingMessage, buildServiceBookingQuickMessage, whatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { IMAGES } from '@/lib/images';
import { BRAND } from '@/lib/brand';
import { Calendar, Car, CheckCircle, Clock, Mail, MessageCircle, Phone, User } from 'lucide-react';

const SERVICES = [
  'Mechanical Repairs',
  'Electrical Repairs',
  'Vehicle Diagnostics',
  'Panel Beating',
  'Spray Painting',
  'Full Vehicle Service',
  'Tyre Change / Rotation',
  'Battery Replacement',
  'Brake Service',
  'Other',
];

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
};

export default function BookingSection() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

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
    if (!form.date) newErrors.date = 'Please select a preferred date';
    else {
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
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
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
    `w-full px-4 py-3 border rounded-lg text-sm font-['Inter'] focus:outline-none focus:ring-2 transition-all min-h-[44px] ${
      errors[field]
        ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
        : 'border-gray-200 focus:border-[#F05A32] focus:ring-[#F05A32]/20'
    }`;

  return (
    <section id="booking" className="py-20 md:py-28 bg-[#F5F3F2]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#F05A32]/10 text-[#F05A32] text-sm px-4 py-1.5 rounded-full mb-4 font-['Inter'] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A32]" />
            Book a Service
          </div>
          <h2 className="font-['Barlow_Condensed'] font-800 text-4xl md:text-5xl text-[#2D2626] section-heading centered">
            BOOK YOUR
            <br />
            VEHICLE SERVICE
          </h2>
          <p className="text-gray-600 font-['Inter'] max-w-xl mx-auto mt-4">
            Drop your vehicle at our Mombasa workshop or book online. We confirm within 2 hours and keep you updated throughout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Left info panel */}
          <div className="lg:col-span-2 bg-[#463C3C] rounded-2xl overflow-hidden text-white">
            <div className="relative h-44">
              <img
                src={IMAGES.booking.workshop}
                alt="Gwecely workshop in Mombasa"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#463C3C] via-[#463C3C]/40 to-transparent" />
            </div>
            <div className="p-8 -mt-4 relative">
            <h3 className="font-['Barlow_Condensed'] font-700 text-2xl mb-6">
              BOOKING INFORMATION
            </h3>

            <div className="space-y-5">
              {[
                { icon: Clock, title: 'Working Hours', lines: ['Mon – Fri: 8:00 AM – 6:00 PM', 'Saturday: 8:00 AM – 2:00 PM', 'Sunday: Closed'] },
                { icon: Phone, title: 'Call Us', lines: BRAND.contact.phones },
                { icon: Mail, title: 'Email Us', lines: BRAND.contact.emails },
                { icon: Car, title: 'Workshop Location', lines: [BRAND.contact.address, BRAND.contact.poBox] },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-orange-100" />
                  </div>
                  <div>
                    <p className="font-['Barlow_Condensed'] font-700 text-sm text-orange-50 mb-0.5">{title}</p>
                    {lines.map((l, i) => (
                      <p key={i} className="text-orange-100 text-sm font-['Inter']">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp quick book */}
            <a
              href={whatsAppUrl(buildServiceBookingQuickMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 btn-whatsapp w-full justify-center rounded-xl py-3"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Book via WhatsApp
            </a>
            </div>
          </div>

          {/* Right form panel */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-5 py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F05A32]/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-[#F05A32]" />
                </div>
                <div>
                  <h3 className="font-['Barlow_Condensed'] font-700 text-2xl text-[#2D2626] mb-2">
                    BOOKING RECEIVED
                  </h3>
                  <p className="text-gray-600 font-['Inter'] text-sm max-w-sm">
                    Thank you, <strong>{form.name}</strong>! We have your request for <strong>{form.service}</strong>. Our team will follow up via phone or WhatsApp.
                  </p>
                </div>
                <DemoBanner compact className="w-full max-w-sm text-left" />
                <div className="bg-[#F5F3F2] rounded-xl p-4 text-left w-full max-w-sm">
                  <p className="text-xs text-gray-500 font-['Inter'] mb-1">Reference Number</p>
                  <p className="font-['Barlow_Condensed'] font-700 text-[#F05A32] text-lg">{bookingRef}</p>
                </div>
                <a
                  href={whatsAppUrl(buildBookingMessage(form, bookingRef))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-['Barlow_Condensed'] font-700 text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  <MessageCircle size={18} />
                  Confirm on WhatsApp
                </a>
                <button
                  onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); setBookingRef(''); }}
                  className="btn-gwecely text-sm py-2.5 px-6"
                >
                  Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="font-['Barlow_Condensed'] font-700 text-xl text-[#2D2626] mb-6">
                  VEHICLE SERVICE BOOKING
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">
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
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-['Inter']">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">
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
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-['Inter']">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">
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
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-['Inter']">{errors.email}</p>}
                  </div>

                  {/* Vehicle Make */}
                  <div>
                    <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">
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
                    {errors.vehicleMake && <p className="text-red-500 text-xs mt-1 font-['Inter']">{errors.vehicleMake}</p>}
                  </div>

                  {/* Vehicle Model */}
                  <div>
                    <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">
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
                    {errors.vehicleModel && <p className="text-red-500 text-xs mt-1 font-['Inter']">{errors.vehicleModel}</p>}
                  </div>

                  {/* Registration */}
                  <div>
                    <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">
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
                    {errors.regNumber && <p className="text-red-500 text-xs mt-1 font-['Inter']">{errors.regNumber}</p>}
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={inputClass('service')}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-1 font-['Inter']">{errors.service}</p>}
                  </div>

                  {/* Date */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">
                      <Calendar size={12} className="inline mr-1" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={today}
                      className={inputClass('date')}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1 font-['Inter']">{errors.date}</p>}
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-['Inter'] font-medium text-gray-700 mb-1.5">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe any specific issues or requirements..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-['Inter'] focus:outline-none focus:border-[#F05A32] focus:ring-2 focus:ring-[#F05A32]/20 transition-all resize-none"
                    />
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
                      Submitting Booking...
                    </>
                  ) : (
                    <>
                      <Calendar size={16} />
                      Confirm Booking
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
