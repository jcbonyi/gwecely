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

export function buildServiceBookingQuickMessage(): string {
  return [
    `*GWECELY — SERVICE ENQUIRY*`,
    '',
    'Hello Gwecely, I would like to enquire about vehicle repair services.',
    '',
    '*My details*',
    '• Name:',
    '• Phone:',
    '',
    '*Vehicle*',
    '• Make / model:',
    '• Registration number:',
    '',
    '*Service / damage*',
    '• ',
    '',
    'Please advise on assessment and quotation. Thank you!',
    footer(),
  ].join('\n');
}

export function buildQuoteQuickMessage(): string {
  return [
    'Hello Gwecely, I would like to request a quotation for my vehicle.',
    '',
    'Name:',
    'Phone:',
    'Vehicle make / model:',
    'Registration:',
    'Service / damage:',
    '',
    'I can send photos of the damage in this chat.',
  ].join('\n');
}

export function buildPhotoQuoteMessage(): string {
  return [
    'Hello Gwecely, I would like to send photos of vehicle damage for an assessment.',
    '',
    'Name:',
    'Phone:',
    'Vehicle make / model:',
    'Registration (optional):',
    '',
    'I will attach the photos in this chat.',
  ].join('\n');
}

export function buildQuoteFormMessage(form: {
  name: string;
  phone: string;
  email?: string;
  vehicleMake: string;
  vehicleModel: string;
  regNumber?: string;
  service: string;
  notes: string;
  preferredContact?: string;
}): string {
  return [
    '*Gwecely — quote request*',
    '',
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    ...(form.email ? [`Email: ${form.email}`] : []),
    ...(form.preferredContact ? [`Preferred contact: ${form.preferredContact}`] : []),
    '',
    `Vehicle: ${form.vehicleMake} ${form.vehicleModel}`,
    ...(form.regNumber?.trim() ? [`Registration: ${form.regNumber.toUpperCase()}`] : []),
    `Service needed: ${form.service}`,
    '',
    'Damage / problem:',
    form.notes.trim(),
    '',
    'I can send photos next in this chat.',
  ].join('\n');
}

export function buildGeneralEnquiryMessage(topic = 'General Enquiry'): string {
  if (topic === 'General Enquiry') {
    return [
      'Hello Gwecely, I would like to enquire about vehicle repair services.',
      '',
      'Please assist me with:',
      '• ',
      footer(),
    ].join('\n');
  }
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

export function buildHospitalityQuoteMessage(data: {
  name: string;
  company: string;
  phone: string;
  email?: string;
  category: string;
  quantity: string;
  location: string;
  notes?: string;
  product?: string;
}): string {
  return [
    `*GWECELY — HOSPITALITY QUOTE REQUEST*`,
    '',
    '*Contact*',
    `• Name: ${data.name}`,
    `• Company: ${data.company}`,
    `• Phone: ${data.phone}`,
    ...(data.email ? [`• Email: ${data.email}`] : []),
    '',
    '*Order details*',
    ...(data.product ? [`• Product: *${data.product}*`] : []),
    `• Category: ${data.category}`,
    `• Quantity: ${data.quantity}`,
    `• Delivery location: ${data.location}`,
    ...(data.notes?.trim() ? ['', '*Additional requirements:*', data.notes.trim()] : []),
    '',
    'Please send me a quotation at your earliest convenience.',
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
    preferredContact?: string;
    photoCount?: number;
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
    `*GWECELY — QUOTE / SERVICE REQUEST*`,
    '',
    `*Reference:* ${ref}`,
    '',
    '*Customer*',
    `• Name: ${form.name}`,
    `• Phone: ${form.phone}`,
    ...(form.email ? [`• Email: ${form.email}`] : []),
    ...(form.preferredContact ? [`• Preferred contact: ${form.preferredContact}`] : []),
    '',
    '*Vehicle*',
    `• ${form.vehicleMake} ${form.vehicleModel}`,
    `• Registration: *${form.regNumber.toUpperCase()}*`,
    '',
    '*Service requested*',
    `• ${form.service}`,
    ...(form.date ? [`• Preferred date: *${preferredDate}*`] : []),
    ...(form.photoCount && form.photoCount > 0
      ? [`• Damage photos selected: ${form.photoCount} (please find attached / following)`]
      : []),
    ...(form.notes?.trim() ? ['', `*Description of damage / problem:*`, form.notes.trim()] : []),
    '',
    'Please send a quotation or confirm assessment. Thank you!',
    footer(),
  ].join('\n');
}
