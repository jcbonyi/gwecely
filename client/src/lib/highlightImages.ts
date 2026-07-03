/**
 * Home explore cards — Gwecely workshop, gallery, product & Kenyan people imagery
 */

import { GALLERY_IMAGES } from '@/lib/galleryImages';
import { IMAGES } from '@/lib/images';
import { SERVICE_IMAGES, HOSPITALITY_PRODUCT_IMAGES } from '@/lib/categoryImages';

export const HIGHLIGHT_CARD_IMAGES = {
  /** Panel beating & spray painting — core garage service */
  services: SERVICE_IMAGES.panelBeating,
  /** Workshop bay — book bodywork, servicing, fleet jobs */
  book: GALLERY_IMAGES.hiluxRepair,
  /** Real project from our gallery — Mercedes respray */
  gallery: GALLERY_IMAGES.mercedesRespray,
  /** Kenyan motorists & fleet operators */
  reviews: IMAGES.people.team,
  /** Mombasa workshop — call, email, WhatsApp */
  contact: IMAGES.contact.mombasa,
  /** Premium tableware & kitchen lines for hotels */
  hospitality: IMAGES.hospitality.tableware,
  /** Automotive spare parts & shop catalogue */
  shop: SERVICE_IMAGES.automotiveParts,
} as const;

/** Fallback when a local asset fails to load */
export const HIGHLIGHT_IMAGE_FALLBACK = HOSPITALITY_PRODUCT_IMAGES.dinnerPlates;
