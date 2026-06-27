/**
 * WhatsApp deep-link helpers — structured messages with WhatsApp formatting
 * (*bold*, _italic_, line breaks via encodeURIComponent)
 */

import { BRAND } from './brand';
import { formatPrice } from './products';

export type WhatsAppIntent = 'general' | 'booking' | 'order' | 'contact' | 'product';

export function whatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function whatsAppUrlForIntent(intent: WhatsAppIntent, payload?: Record<string, unknown>): string {
  switch (intent) {
    case 'booking':
      return whatsAppUrl(buildServiceBookingQuickMessage());
    case 'order':
      return whatsAppUrl(
        buildGeneralEnquiryMessage('Spare Parts & Shop Order')
      );
    case 'contact':
      return whatsAppUrl(buildGeneralEnquiryMessage('General Enquiry'));
    case 'product':
      return whatsAppUrl(
        buildProductEnquiryMessage(
          payload as { name: string; id: string; price: number; category?: string }
        )
      );
    case 'general':
    default:
      return whatsAppUrl(buildGeneralEnquiryMessage());
  }
}

function footer(): string {
  return `\n────────────\n_${BRAND.name} · Mombasa_`;
}

export function buildGeneralEnquiryMessage(topic = 'General Enquiry'): string {
  return [
    `*GWECELY — ENQUIRY*`,
    '',
    `Hello, I'm reaching out via your website.`,
    '',
    `*Topic:* ${topic}`,
    '',
    'Please assist me with:',
    '• ',
    '',
    'Thank you!',
    footer(),
  ].join('\n');
}

export function buildServiceBookingQuickMessage(): string {
  return [
    `*GWECELY — SERVICE BOOKING*`,
    '',
    'Hello, I would like to book a *vehicle service* at your Mombasa workshop.',
    '',
    '*My details*',
    '• Name:',
    '• Phone:',
    '',
    '*Vehicle*',
    '• Make / model:',
    '• Registration number:',
    '',
    '*Service*',
    '• Service type:',
    '• Preferred date:',
    '',
    'Please confirm availability. Thank you!',
    footer(),
  ].join('\n');
}

export function buildContactEnquiryMessage(data: {
  name: string;
  email?: string;
  phone?: string;
  topic: string;
  message: string;
}): string {
  return [
    `*GWECELY — CONTACT FORM*`,
    '',
    `*Topic:* ${data.topic}`,
    '',
    '*Contact*',
    `• Name: ${data.name}`,
    ...(data.phone ? [`• Phone: ${data.phone}`] : []),
    ...(data.email ? [`• Email: ${data.email}`] : []),
    '',
    '*Message*',
    data.message.trim(),
    '',
    'Please get back to me at your earliest convenience.',
    footer(),
  ].join('\n');
}

export function buildProductEnquiryMessage(product: {
  name: string;
  id: string;
  price: number;
  category?: string;
}): string {
  return [
    `*GWECELY — PRODUCT ENQUIRY*`,
    '',
    `I'm interested in the following item from your shop:`,
    '',
    `*${product.name}*`,
    `• Product ID: ${product.id}`,
    ...(product.category ? [`• Category: ${product.category}`] : []),
    `• Price: *${formatPrice(product.price)}*`,
    '',
    'Please confirm availability and how I can order.',
    footer(),
  ].join('\n');
}

export function buildOrderMessage(
  items: { name: string; quantity: number; price: number }[],
  total: number,
  ref: string,
  phone?: string
): string {
  return [
    `*GWECELY — PRODUCT ORDER*`,
    '',
    `*Reference:* ${ref}`,
    ...(phone ? [`*M-Pesa number:* ${phone}`] : []),
    '',
    '*Items*',
    ...items.map((i) => `• ${i.name} × ${i.quantity} — *${formatPrice(i.price * i.quantity)}*`),
    '',
    `*Total: ${formatPrice(total)}*`,
    '',
    'Please confirm stock and share payment details (M-Pesa / cash).',
    footer(),
  ].join('\n');
}

export function buildBookingMessage(
  form: {
    name: string;
    phone: string;
    email?: string;
    vehicleMake: string;
    vehicleModel: string;
    regNumber: string;
    service: string;
    date: string;
    notes?: string;
  },
  ref: string
): string {
  const preferredDate = form.date
    ? new Date(form.date + 'T12:00:00').toLocaleDateString('en-KE', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : form.date;

  return [
    `*GWECELY — SERVICE BOOKING*`,
    '',
    `*Reference:* ${ref}`,
    '',
    '*Customer*',
    `• Name: ${form.name}`,
    `• Phone: ${form.phone}`,
    ...(form.email ? [`• Email: ${form.email}`] : []),
    '',
    '*Vehicle*',
    `• ${form.vehicleMake} ${form.vehicleModel}`,
    `• Registration: *${form.regNumber.toUpperCase()}*`,
    '',
    '*Service requested*',
    `• ${form.service}`,
    `• Preferred date: *${preferredDate}*`,
    ...(form.notes?.trim() ? ['', `*Additional notes:*`, form.notes.trim()] : []),
    '',
    'Please confirm my booking. Thank you!',
    footer(),
  ].join('\n');
}
