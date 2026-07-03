/**
 * Home explore cards — African & Kenyan people in service context
 */

import { AFRICAN_PORTRAITS, portraitUrl } from '@/lib/africanPortraits';

const p = (id: (typeof AFRICAN_PORTRAITS)[keyof typeof AFRICAN_PORTRAITS], w = 1000) =>
  portraitUrl(id, w);

export const HIGHLIGHT_CARD_IMAGES = {
  /** African motorist beside vehicle — garage services */
  services: p(AFRICAN_PORTRAITS.garageTechnician),
  /** Nairobi professional on phone — book a repair */
  book: p(AFRICAN_PORTRAITS.kenyanMan1),
  /** African customer with vehicle — project gallery */
  gallery: p(AFRICAN_PORTRAITS.motoristAtCar),
  /** Smiling African woman — customer reviews */
  reviews: p(AFRICAN_PORTRAITS.kenyanWoman1),
  /** African professionals in meeting — contact */
  contact: p(AFRICAN_PORTRAITS.businessMeeting),
  /** African women at hospitality table — supplies */
  hospitality: p(AFRICAN_PORTRAITS.hospitalityTeam),
  /** African team on laptop — parts & shop */
  shop: p(AFRICAN_PORTRAITS.shopProcurement),
} as const;

/** Fallback when an image fails to load */
export const HIGHLIGHT_IMAGE_FALLBACK = p(AFRICAN_PORTRAITS.officeTeam);
