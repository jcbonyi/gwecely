/**
 * Product imagery — prefer product shots; African people where humans appear
 */

import { AFRICAN_PORTRAITS, portraitUrl } from '@/lib/africanPortraits';

const p = (file: string) => `/products/${file}`;

export const PRODUCT_IMAGES = {
  // Spare parts
  brakeDisc: p('brake-disc.jpg'),
  timingBelt: p('timing-belt.jpg'),
  shockAbsorber: p('shock-absorber.jpg'),
  clutchKit: p('clutch-kit.jpg'),

  // Batteries
  battery60ah: p('battery-60ah.jpg'),
  battery75ah: p('battery-75ah.jpg'),

  // Tyres
  tyreBridgestone: p('tyre-bridgestone.jpg'),
  tyreMichelin: p('tyre-michelin.jpg'),

  // Engine oils
  oilCastrol: p('castrol-oil.jpg'),
  oilTotal: p('total-oil.jpg'),

  // Filters
  oilFilter: p('oil-filter.jpg'),
  airFilter: p('air-filter.jpg'),

  // Office stationery
  paperReams: p('paper-reams.jpg'),
  penSet: p('pen-set.jpg'),
  filingCabinet: p('filing-cabinet.jpg'),

  // Furniture — African office context where people may appear in marketing shots
  officeChair: portraitUrl(AFRICAN_PORTRAITS.officeTeam, 600),
  officeDesk: portraitUrl('photo-1497366754035-f200968a6e72', 600),

  // IT equipment
  laptop: portraitUrl(AFRICAN_PORTRAITS.professionalLaptop, 600),
  printer: p('printer.jpg'),

  // Health & safety — equipment only, no people
  hardHat: portraitUrl('photo-1575311373937-040b8e1fd5b6', 600),
  firstAidKit: p('first-aid.jpg'),
  fireExtinguisher: p('fire-extinguisher.jpg'),

  // Dry foods & beverages
  pishoriRice: '/services/dry-foods-beverages.jpg',
  ketepaTea: '/brand/page12_img1.jpeg',
  cookingOil: '/services/dry-foods-beverages.jpg',
  mumiasSugar: '/brand/page12_img1.jpeg',
} as const;
