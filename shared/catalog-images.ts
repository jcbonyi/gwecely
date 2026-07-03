/**
 * Shared product & category imagery URLs (Unsplash + local assets)
 */

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const local = (path: string) => path;

/** Default image per shop category — used for filters, fallbacks, and cards */
export const CATEGORY_IMAGES: Record<string, string> = {
  all: u('photo-1738507869660-b44ea20ab037', 1000),
  'spare-parts': local('/products/brake-disc.jpg'),
  batteries: local('/products/battery-60ah.jpg'),
  tyres: local('/products/tyre-bridgestone.jpg'),
  'engine-oils': local('/products/castrol-oil.jpg'),
  filters: local('/products/oil-filter.jpg'),
  'office-stationery': u('photo-1573164574511-73c77306328f', 700),
  furniture: u('photo-1497366754035-f200968a6e72', 700),
  'it-equipment': u('photo-1581092918056-0c4c3acd378a', 700),
  'safety-equipment': local('/products/hard-hat.jpg'),
  'dry-foods': local('/services/dry-foods-beverages.jpg'),
  'hospitality-supplies': u('photo-1600565893385-07be688dd25a', 700),
};

/** Garage service card images */
export const SERVICE_IMAGES = {
  panelBeating: local('/services/panel-beating-spray-painting.jpg'),
  sprayPainting: local('/brand/page9_img1.jpeg'),
  accidentRepair: local('/gallery/hilux-body-repair.jpg'),
  mechanical: local('/brand/page7_img4.jpeg'),
  vehicleServicing: local('/gallery/engine-overhaul.jpg'),
  fleetMaintenance: u('photo-1738507869660-b44ea20ab037', 800),
  automotiveParts: local('/products/brake-disc.jpg'),
  corporateProcurement: u('photo-1573164574511-73c77306328f', 700),
  hospitality: u('photo-1559339352-11d035aa65de', 700),
  emergencyBanner: local('/brand/page6_img1.jpeg'),
} as const;

/** Hospitality product imagery for seed catalog */
export const HOSPITALITY_PRODUCT_IMAGES = {
  dinnerPlates: u('photo-1600565893385-07be688dd25a', 800),
  cutlerySet: u('photo-1603199506016-5826e98607e0', 800),
  wineGlasses: u('photo-1514362545857-3bc16c4c7d9b', 800),
  chafingDish: u('photo-1555244167-11d288d2130f', 800),
  buffetSet: u('photo-1556911220-e15b29be8c8f', 800),
  housekeepingTrolley: u('photo-1581578731548-c64695cc6952', 800),
  glassPitcher: u('photo-1514362545857-3bc16c4c7d9b', 800),
  chefPan: u('photo-1556912173-3bb406ef7e77', 800),
} as const;

/** Home page highlight card images — Unsplash for reliable delivery on Vercel */
export const HIGHLIGHT_IMAGES = {
  services: u('photo-1486267903955-ab4e62db0cdd', 1000),
  book: u('photo-1625047509168-a702453f1d12', 1000),
  gallery: u('photo-1615902146659-c3950b7b8bfb', 1000),
  reviews: u('photo-1573164574511-73c77306328f', 1000),
  contact: u('photo-1713747451985-761444dd8e75', 1000),
  hospitality: u('photo-1559339352-11d035aa65de', 1000),
  shop: u('photo-1492144534655-ae79c964c9d7', 1000),
} as const;

export function getCategoryImage(categoryId: string): string {
  return CATEGORY_IMAGES[categoryId] ?? CATEGORY_IMAGES['spare-parts'];
}

/** Prefer stored product image; fall back to category default */
export function resolveProductImage(image: string | undefined | null, category: string): string {
  const trimmed = image?.trim();
  if (trimmed && !trimmed.includes('/brand/page12')) {
    return trimmed;
  }
  return getCategoryImage(category);
}
