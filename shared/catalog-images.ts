/**
 * Shared product & category imagery — local workshop assets only for garage surfaces
 */

const local = (path: string) => path;

/** Shop category images — local first; avoid remote Unsplash on trust surfaces */
export const CATEGORY_IMAGES: Record<string, string> = {
  all: local('/images/workshop-bay-800.jpg'),
  'spare-parts': local('/products/brake-disc.jpg'),
  batteries: local('/products/battery-60ah.jpg'),
  tyres: local('/products/tyre-bridgestone.jpg'),
  'engine-oils': local('/products/castrol-oil.jpg'),
  filters: local('/products/oil-filter.jpg'),
  'office-stationery': local('/images/workshop-bay-800.jpg'),
  furniture: local('/images/workshop-bay-800.jpg'),
  'it-equipment': local('/services/computer-accessories.jpg'),
  'safety-equipment': local('/products/hard-hat.jpg'),
  'dry-foods': local('/services/dry-foods-beverages.jpg'),
  'hospitality-supplies': local('/images/workshop-bay-800.jpg'),
};

/** Garage service card images — optimised local derivatives */
export const SERVICE_IMAGES = {
  panelBeating: local('/images/panel-800.jpg'),
  sprayPainting: local('/images/spray-800.jpg'),
  accidentRepair: local('/images/accident-800.jpg'),
  mechanical: local('/images/mechanical-800.jpg'),
  vehicleServicing: local('/images/servicing-800.jpg'),
  fleetMaintenance: local('/images/fleet-800.jpg'),
  automotiveParts: local('/products/brake-disc.jpg'),
  corporateProcurement: local('/images/workshop-bay-800.jpg'),
  hospitality: local('/images/workshop-bay-800.jpg'),
  emergencyBanner: local('/brand/page6_img1.jpeg'),
} as const;

/** Base names for ResponsivePicture (without -size.ext) */
export const SERVICE_IMAGE_BASES: Record<string, string> = {
  panelBeating: '/images/panel',
  sprayPainting: '/images/spray',
  accidentRepair: '/images/accident',
  mechanical: '/images/mechanical',
  vehicleServicing: '/images/servicing',
  fleetMaintenance: '/images/fleet',
};

export const HOSPITALITY_PRODUCT_IMAGES = {
  dinnerPlates: local('/images/workshop-bay-800.jpg'),
  cutlerySet: local('/images/workshop-bay-800.jpg'),
  wineGlasses: local('/images/workshop-bay-800.jpg'),
  chafingDish: local('/images/workshop-bay-800.jpg'),
  buffetSet: local('/images/workshop-bay-800.jpg'),
  housekeepingTrolley: local('/images/workshop-bay-800.jpg'),
  glassPitcher: local('/images/workshop-bay-800.jpg'),
  chefPan: local('/images/workshop-bay-800.jpg'),
} as const;

export const HIGHLIGHT_IMAGES = {
  services: local('/images/panel-800.jpg'),
  book: local('/images/workshop-bay-800.jpg'),
  gallery: local('/images/spray-800.jpg'),
  reviews: local('/images/workshop-bay-800.jpg'),
  contact: local('/images/workshop-bay-800.jpg'),
  hospitality: local('/images/workshop-bay-800.jpg'),
  shop: local('/products/brake-disc.jpg'),
} as const;

export function getCategoryImage(categoryId: string): string {
  return CATEGORY_IMAGES[categoryId] ?? CATEGORY_IMAGES['spare-parts'];
}

export function resolveProductImage(image: string | undefined | null, category: string): string {
  const trimmed = image?.trim();
  if (trimmed && !trimmed.includes('/brand/page12') && !trimmed.includes('unsplash.com')) {
    return trimmed;
  }
  return getCategoryImage(category);
}
