/** Primary automotive IA — conversion-focused */

export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  insuranceClaims: '/insurance-claims',
  ourWork: '/our-work',
  whyGwecely: '/why-gwecely',
  contact: '/contact',
  quote: '/quote',
  book: '/book',
  gallery: '/gallery',
  reviews: '/reviews',
  shop: '/shop',
  hospitality: '/hospitality',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Primary nav — automotive only */
export const NAV_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Services', href: ROUTES.services },
  { label: 'Our Work', href: ROUTES.ourWork },
  { label: 'About', href: ROUTES.about },
  { label: 'Contact', href: ROUTES.contact },
];

/** Low-priority / other business */
export const OTHER_BUSINESS_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'Insurance & claims guidance', href: ROUTES.insuranceClaims },
  { label: 'Parts shop', href: ROUTES.shop },
  { label: 'Hospitality supplies', href: ROUTES.hospitality },
];

export const FOOTER_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Services', href: ROUTES.services },
  { label: 'Our Work', href: ROUTES.ourWork },
  { label: 'About', href: ROUTES.about },
  { label: 'Contact', href: ROUTES.contact },
  { label: 'Get a quote', href: ROUTES.quote },
];

export function isActiveRoute(current: string, href: AppRoute): boolean {
  if (href === ROUTES.home) return current === ROUTES.home;
  if (href === ROUTES.services) {
    return current === ROUTES.services || current.startsWith('/services/');
  }
  if (href === ROUTES.ourWork) {
    return current === ROUTES.ourWork || current === ROUTES.gallery;
  }
  if (href === ROUTES.quote) {
    return current === ROUTES.quote || current === ROUTES.book;
  }
  return current === href || current.startsWith(`${href}/`);
}

export const SITE_ORIGIN = 'https://www.gwecely.co.ke';

/** Confirmed workshop pin */
export const WORKSHOP_LAT = -4.061953766630648;
export const WORKSHOP_LNG = 39.65666304822228;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${WORKSHOP_LAT},${WORKSHOP_LNG}`;
export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${WORKSHOP_LAT},${WORKSHOP_LNG}&z=16&output=embed`;
