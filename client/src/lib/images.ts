/**
 * Free Kenyan & African imagery (Unsplash License)
 * https://unsplash.com/license
 */

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const IMAGES = {
  logo: '/gwecely-logo.png',
  icon: '/gwecely-icon.png',

  hero: '/brand/page1_img1.jpeg',
  heroOg: u('photo-1738507869660-b44ea20ab037', 1200), // Kenya highway logistics

  trust: {
    technicians: u('photo-1625047509168-a702453f1d12', 600),
    genuineProducts: u('photo-1558618666-fcd25c85cd64', 600),
    fastDelivery: u('photo-1738507869660-b44ea20ab037', 600), // Kenya trucks
    warranty: u('photo-1619642759868-244088ba5671', 600),
    professional: u('photo-1713747451985-761444dd8e75', 600), // Nairobi, Kenya
    turnaround: u('photo-1486267903955-ab4e62db0cdd', 600),
  },

  services: {
    mechanical: '/brand/page7_img4.jpeg',
    electrical: '/brand/page8_img1.jpeg',
    panelBeating: '/services/panel-beating-spray-painting.jpg',
    sprayPainting: '/brand/page9_img1.jpeg',
    stationery: '/brand/page10_img3.jpeg',
    furniture: '/brand/page10_img5.jpeg',
    itEquipment: '/services/computer-accessories.jpg',
    healthSafety: '/brand/page11_img3.jpeg',
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
    stationery: u('photo-1573164574511-73c77306328f', 600), // African office team
    pens: u('photo-1598488033279-a497ad034b0c', 600),
    filingCabinet: u('photo-1497366216548-37526070297c', 600),
    chair: u('photo-1580489944761-15a19d654956', 600),
    desk: u('photo-1497366754035-f200968a6e72', 600),
    laptop: u('photo-1713747451985-761444dd8e75', 600), // Nairobi professional
    printer: u('photo-1612198182100-3409abaf4bba', 600),
    hardHat: u('photo-1504307651254-35680f356dfd', 600),
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
    james: u('photo-1713747451985-761444dd8e75', 160), // Nairobi, Kenya
    grace: u('photo-1573497019236-462ed122d1b3', 160),
    peter: u('photo-1531384441138-273c54d55e10', 160),
    sarah: u('photo-1580489944761-15a19d654956', 160),
    david: u('photo-1619895862022-09128b1f6580', 160),
    fatuma: u('photo-1594744802523-79037bd6234a', 160),
  },

  booking: {
    workshop: u('photo-1486267903955-ab4e62db0cdd', 800),
  },

  contact: {
    mombasa: '/brand/page13_img1.jpeg',
    port: '/brand/page4_img1.jpeg',
  },

  hospitality: {
    hero: u('photo-1414235077428-338989a2e8e0', 1400),
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
    procurement: u('photo-1578916171728-46686e4458f4', 1000),
    avatars: {
      daniel: u('photo-1531384441138-273c54d55e10', 160),
      amina: u('photo-1594744802523-79037bd6234a', 160),
      robert: u('photo-1619895862022-09128b1f6580', 160),
      faith: u('photo-1573497019236-462ed122d1b3', 160),
    },
  },
} as const;
