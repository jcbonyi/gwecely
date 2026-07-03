/**
 * Home explore cards — African & Kenyan people in service context
 */

import { AFRICAN_PORTRAITS, portraitUrl } from '@/lib/africanPortraits';

const p = (id: (typeof AFRICAN_PORTRAITS)[keyof typeof AFRICAN_PORTRAITS], w = 1000) =>
  portraitUrl(id, w);

/** Pinterest — vehicle parts & accessories retail display */
const PARTS_SHOP_IMAGE = '/highlights/parts-shop.jpg';
/** Contact Us — call, email, WhatsApp graphic */
const CONTACT_US_IMAGE = '/highlights/contact-us.png';
/** Book a Repair — accident-damaged vehicle needing bodywork */
const BOOK_REPAIR_IMAGE = '/highlights/book-repair.png';
/** Project Gallery — before & after bodywork restoration */
const PROJECT_GALLERY_IMAGE = '/highlights/project-gallery.png';
/** Hospitality Supplies — premium tableware & hotel lines */
const HOSPITALITY_SUPPLIES_IMAGE = '/highlights/hospitality-supplies.png';

export const HIGHLIGHT_CARD_IMAGES = {
  /** African motorist beside vehicle — garage services */
  services: p(AFRICAN_PORTRAITS.garageTechnician),
  /** Damaged vehicle — book bodywork, respray, or servicing */
  book: BOOK_REPAIR_IMAGE,
  /** Before & after bodywork — project gallery */
  gallery: PROJECT_GALLERY_IMAGE,
  /** Smiling African woman — customer reviews */
  reviews: p(AFRICAN_PORTRAITS.kenyanWoman1),
  /** Contact Us — communication channels graphic */
  contact: CONTACT_US_IMAGE,
  /** Premium tableware, glassware & linens — hospitality supplies */
  hospitality: HOSPITALITY_SUPPLIES_IMAGE,
  /** Auto parts & accessories shop — Pinterest retail display */
  shop: PARTS_SHOP_IMAGE,
} as const;

/** Fallback when an image fails to load */
export const HIGHLIGHT_IMAGE_FALLBACK = p(AFRICAN_PORTRAITS.officeTeam);
