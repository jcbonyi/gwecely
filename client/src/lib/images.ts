/**
 * Site imagery — Kenyan & African representation for people photos
 * https://unsplash.com/license
 */

import { AFRICAN_PORTRAITS, portraitUrl } from '@/lib/africanPortraits';

const u = (id: string, w = 800) => portraitUrl(id, w);
const p = (id: (typeof AFRICAN_PORTRAITS)[keyof typeof AFRICAN_PORTRAITS], w = 800) => portraitUrl(id, w);

export const IMAGES = {
  logo: '/gwecely-logo.png',
  icon: '/gwecely-icon.png',

  hero: '/images/hero-1920.jpg',
  heroOg: '/images/hero-1920.jpg',

  /** Photos featuring African / Kenyan people */
  people: {
    team: p(AFRICAN_PORTRAITS.officeTeam, 1000),
    aboutWorkshop: p(AFRICAN_PORTRAITS.businessMeeting, 1000),
    contactLocation: p(AFRICAN_PORTRAITS.kenyanMan1, 900),
    hospitality: p(AFRICAN_PORTRAITS.hospitalityService, 1200),
  },

  trust: {
    technicians: '/brand/page7_img4.jpeg', // local workshop — vehicles / garage
    genuineProducts: u('photo-1558618666-fcd25c85cd64', 600),
    fastDelivery: u('photo-1738507869660-b44ea20ab037', 600),
    warranty: u('photo-1619642759868-244088ba5671', 600),
    professional: p(AFRICAN_PORTRAITS.kenyanMan1, 600),
    turnaround: u('photo-1486267903955-ab4e62db0cdd', 600),
  },

  services: {
    mechanical: '/brand/page7_img4.jpeg',
    electrical: '/brand/page8_img1.jpeg',
    panelBeating: '/services/panel-beating-spray-painting.jpg',
    sprayPainting: '/brand/page9_img1.jpeg',
    stationery: p(AFRICAN_PORTRAITS.officeTeam, 700),
    furniture: u('photo-1497366754035-f200968a6e72', 700), // office furniture — no people
    itEquipment: p(AFRICAN_PORTRAITS.professionalLaptop, 700),
    healthSafety: u('photo-1575311373937-040b8e1fd5b6', 700), // safety equipment — no people
    dryFoods: '/services/dry-foods-beverages.jpg',
    emergencyBanner: '/brand/page6_img1.jpeg',
  },

  products: {
    brakes: u('photo-1558618666-fcd25c85cd64', 600),
    spareParts: u('photo-1486267903955-ab4e62db0cdd', 600),
    timingBelt: u('photo-1615902146659-c3950b7b8bfb', 600),
    shocks: u('photo-1492144534655-ae79c964c9d7', 600),
    clutch: u('photo-1619642759868-244088ba5671', 600),
    battery: u('photo-1599305445671-ac291c95aaa9', 600),
    batteryHeavy: u('photo-1558618666-fcd25c85cd64', 600),
    tyreBridgestone: u('photo-1615902146659-c3950b7b8bfb', 600),
    tyreMichelin: u('photo-1558618047-3c8c76ca7d13', 600),
    engineOil: u('photo-1632823472960-8c114b7b9a5e', 600),
    engineOilTotal: u('photo-1607860108852-0f3eaacf2fbe', 600),
    oilFilter: u('photo-1486267903955-ab4e62db0cdd', 600),
    airFilter: u('photo-1492144534655-ae79c964c9d7', 600),
    stationery: p(AFRICAN_PORTRAITS.officeTeam, 600),
    pens: u('photo-1598488033279-a497ad034b0c', 600),
    filingCabinet: u('photo-1497366216548-37526070297c', 600),
    chair: p(AFRICAN_PORTRAITS.officeTeam, 600),
    desk: u('photo-1497366754035-f200968a6e72', 600),
    laptop: p(AFRICAN_PORTRAITS.professionalLaptop, 600),
    printer: u('photo-1612198182100-3409abaf4bba', 600),
    hardHat: u('photo-1575311373937-040b8e1fd5b6', 600),
    firstAid: u('photo-1603398937426-94076412ecdd', 600),
    fireExtinguisher: u('photo-1582719478250-c89cae4dc85b', 600),
  },

  gallery: {
    hiluxRepair: '/gallery/hilux-body-repair.jpg',
    mercedesRespray: '/gallery/mercedes-respray.jpg',
    engineOverhaul: '/gallery/engine-overhaul.jpg',
    landCruiserRestore: '/gallery/landcruiser-restore.jpg',
    corollaSpotRepair: '/gallery/corolla-spot-repair.jpg',
    dmaxDent: '/gallery/dmax-dent-removal.jpg',
    gearboxPrado: '/gallery/gearbox-rebuild.jpg',
    golfGti: '/gallery/golf-gti-restore.jpg',
  },

  testimonials: {
    james: p(AFRICAN_PORTRAITS.kenyanMan1, 160),
    grace: p(AFRICAN_PORTRAITS.kenyanWoman1, 160),
    peter: p(AFRICAN_PORTRAITS.kenyanMan2, 160),
    sarah: p(AFRICAN_PORTRAITS.kenyanWoman3, 160),
    david: p(AFRICAN_PORTRAITS.kenyanMan3, 160),
    fatuma: p(AFRICAN_PORTRAITS.kenyanWoman2, 160),
  },

  booking: {
    workshop: '/images/workshop-bay-800.jpg',
  },

  contact: {
    mombasa: p(AFRICAN_PORTRAITS.businessMeeting, 1000),
    port: '/images/workshop-bay-800.jpg',
  },

  hospitality: {
    hero: p(AFRICAN_PORTRAITS.hospitalityService, 1400),
    heroDining: u('photo-1559339352-11d035aa65de', 800),
    heroKitchen: u('photo-1556911220-bff31c812dba', 800),
    heroTableware: u('photo-1544025162-d76694265947', 800),
    tableware: u('photo-1600565893385-07be688dd25a', 700),
    glassware: u('photo-1514362545857-3bc16c4c7d9b', 700),
    cutlery: u('photo-1603199506016-5826e98607e0', 700),
    kitchen: u('photo-1556912173-3bb406ef7e77', 700),
    housekeeping: u('photo-1581578731548-c64695cc6952', 700),
    catering: u('photo-1555244167-11d288d2130f', 700),
    featuredPlates: u('photo-1600565893385-07be688dd25a', 600),
    featuredCutlery: u('photo-1603199506016-5826e98607e0', 600),
    featuredGlassware: u('photo-1514362545857-3bc16c4c7d9b', 600),
    featuredChafing: u('photo-1555244167-11d288d2130f', 600),
    featuredBuffet: u('photo-1556911220-e15b29be8c8f', 600),
    featuredTrolley: u('photo-1581578731548-c64695cc6952', 600),
    procurement: p(AFRICAN_PORTRAITS.businessMeeting, 1000),
    avatars: {
      daniel: p(AFRICAN_PORTRAITS.kenyanMan2, 160),
      amina: p(AFRICAN_PORTRAITS.kenyanWoman2, 160),
      robert: p(AFRICAN_PORTRAITS.kenyanMan3, 160),
      faith: p(AFRICAN_PORTRAITS.kenyanWoman4, 160),
    },
  },
} as const;
