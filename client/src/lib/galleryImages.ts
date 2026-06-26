/**
 * Gallery imagery — local closeup workshop photos in /public/gallery/
 */

const g = (file: string) => `/gallery/${file}`;

export const GALLERY_IMAGES = {
  hiluxRepair: g('hilux-body-repair.jpg'),
  mercedesRespray: g('mercedes-respray.jpg'),
  engineOverhaul: g('engine-overhaul.jpg'),
  landCruiserRestore: g('landcruiser-restore.jpg'),
  corollaSpotRepair: g('corolla-spot-repair.jpg'),
  dmaxDent: g('dmax-dent-removal.jpg'),
  gearboxPrado: g('gearbox-rebuild.jpg'),
  golfGti: g('golf-gti-restore.jpg'),
  panelCloseup: g('panel-closeup.jpg'),
  paintSpray: g('paint-spray.jpg'),
  hiluxBodyRepair: g('hilux-body-repair.jpg'),
  wheelBrake: g('wheel-brake-service.jpg'),
  officeStationery: '/brand/page10_img3.jpeg',
  officeFurniture: '/brand/page10_img5.jpeg',
  itSetup: '/services/computer-accessories.jpg',
  safetyGear: '/brand/page11_img3.jpeg',
  dryFoodsSupply: '/services/dry-foods-beverages.jpg',
} as const;
