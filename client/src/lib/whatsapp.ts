/**
 * WhatsApp deep-link helpers for orders, bookings, and enquiries
 */

import { BRAND } from './brand';
import { formatPrice } from './products';

export function whatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildOrderMessage(items: { name: string; quantity: number; price: number }[], total: number, ref: string, phone?: string): string {
  const lines = [
    'Hello Gwecely, I would like to place an order:',
    '',
    `Reference: ${ref}`,
    ...(phone ? [`M-Pesa number: ${phone}`] : []),
    '',
    ...items.map(i => `• ${i.name} × ${i.quantity} — ${formatPrice(i.price * i.quantity)}`),
    '',
    `Total: ${formatPrice(total)}`,
    '',
    'Please confirm availability and payment details. Thank you!',
  ];
  return lines.join('\n');
}

export function buildBookingMessage(form: {
  name: string;
  phone: string;
  email?: string;
  vehicleMake: string;
  vehicleModel: string;
  regNumber: string;
  service: string;
  date: string;
  notes?: string;
}, ref: string): string {
  const lines = [
    'Hello Gwecely, I would like to book a vehicle service:',
    '',
    `Reference: ${ref}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    ...(form.email ? [`Email: ${form.email}`] : []),
    `Vehicle: ${form.vehicleMake} ${form.vehicleModel}`,
    `Reg: ${form.regNumber}`,
    `Service: ${form.service}`,
    `Preferred date: ${form.date}`,
    ...(form.notes?.trim() ? ['', `Notes: ${form.notes.trim()}`] : []),
  ];
  return lines.join('\n');
}
