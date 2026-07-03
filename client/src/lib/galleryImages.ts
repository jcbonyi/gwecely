/**
 * Gallery imagery — workshop assets + African representation for supply categories
 */

import { AFRICAN_PORTRAITS, portraitUrl } from '@/lib/africanPortraits';

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
  officeStationery: portraitUrl(AFRICAN_PORTRAITS.officeTeam, 800),
  officeFurniture: portraitUrl('photo-1497366754035-f200968a6e72', 800),
  itSetup: portraitUrl(AFRICAN_PORTRAITS.professionalLaptop, 800),
  safetyGear: portraitUrl('photo-1575311373937-040b8e1fd5b6', 800),
  dryFoodsSupply: '/services/dry-foods-beverages.jpg',
} as const;
