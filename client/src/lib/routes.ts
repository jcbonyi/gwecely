/** Public site routes — single source of truth for nav and links */

export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  book: '/book',
  gallery: '/gallery',
  reviews: '/reviews',
  shop: '/shop',
  contact: '/contact',
  hospitality: '/hospitality',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Primary chrome — keep short for conversion focus */
export const NAV_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'Services', href: ROUTES.services },
  { label: 'Gallery', href: ROUTES.gallery },
  { label: 'Book', href: ROUTES.book },
  { label: 'Shop', href: ROUTES.shop },
];

/** Secondary links — mobile “More” + footer discovery */
export const NAV_SECONDARY_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'About', href: ROUTES.about },
  { label: 'Reviews', href: ROUTES.reviews },
  { label: 'Contact', href: ROUTES.contact },
  { label: 'Hospitality', href: ROUTES.hospitality },
];

export const FOOTER_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About Us', href: ROUTES.about },
  { label: 'Garage Services', href: ROUTES.services },
  { label: 'Book a Service', href: ROUTES.book },
  { label: 'Project Gallery', href: ROUTES.gallery },
  { label: 'Customer Reviews', href: ROUTES.reviews },
  { label: 'Shop Products', href: ROUTES.shop },
  { label: 'Hospitality Supplies', href: ROUTES.hospitality },
  { label: 'Contact Us', href: ROUTES.contact },
];

/** Match nav highlight — exact path or home for "/" */
export function isActiveRoute(current: string, href: AppRoute): boolean {
  if (href === ROUTES.home) return current === ROUTES.home;
  return current === href || current.startsWith(`${href}/`);
}
