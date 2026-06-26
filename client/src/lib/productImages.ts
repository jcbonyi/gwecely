/**
 * Product imagery — local assets from Pinterest (pinimg.com)
 * https://www.pinterest.com/
 */

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

  // Furniture
  officeChair: p('office-chair.jpg'),
  officeDesk: p('office-desk.jpg'),

  // IT equipment
  laptop: p('laptop.jpg'),
  printer: p('printer.jpg'),

  // Health & safety
  hardHat: p('hard-hat.jpg'),
  firstAidKit: p('first-aid.jpg'),
  fireExtinguisher: p('fire-extinguisher.jpg'),

  // Dry foods & beverages
  pishoriRice: '/services/dry-foods-beverages.jpg',
  ketepaTea: '/brand/page12_img1.jpeg',
  cookingOil: '/services/dry-foods-beverages.jpg',
  mumiasSugar: '/brand/page12_img1.jpeg',
} as const;
