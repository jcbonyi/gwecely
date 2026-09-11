/** Public site routes — conversion-focused IA */

export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  insuranceClaims: '/insurance-claims',
  ourWork: '/our-work',
  whyGwecely: '/why-gwecely',
  contact: '/contact',
  quote: '/quote',
  /** @deprecated use quote — kept for bookmarks */
  book: '/book',
  /** @deprecated use ourWork */
  gallery: '/gallery',
  reviews: '/reviews',
  shop: '/shop',
  hospitality: '/hospitality',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Primary navigation — matches conversion brief */
export const NAV_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'About Us', href: ROUTES.about },
  { label: 'Our Services', href: ROUTES.services },
  { label: 'Insurance & Claims', href: ROUTES.insuranceClaims },
  { label: 'Our Work', href: ROUTES.ourWork },
  { label: 'Why Gwecely', href: ROUTES.whyGwecely },
  { label: 'Contact Us', href: ROUTES.contact },
];

/** Footer / secondary discovery */
export const NAV_SECONDARY_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'Get a Quote', href: ROUTES.quote },
  { label: 'Customer Reviews', href: ROUTES.reviews },
  { label: 'Parts Shop', href: ROUTES.shop },
  { label: 'Hospitality Supplies', href: ROUTES.hospitality },
];

export const FOOTER_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About Us', href: ROUTES.about },
  { label: 'Our Services', href: ROUTES.services },
  { label: 'Insurance & Claims', href: ROUTES.insuranceClaims },
  { label: 'Our Work', href: ROUTES.ourWork },
  { label: 'Why Gwecely', href: ROUTES.whyGwecely },
  { label: 'Get a Quote', href: ROUTES.quote },
  { label: 'Contact Us', href: ROUTES.contact },
  { label: 'Parts Shop', href: ROUTES.shop },
  { label: 'Hospitality Supplies', href: ROUTES.hospitality },
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
