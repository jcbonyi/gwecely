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
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export const NAV_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About', href: ROUTES.about },
  { label: 'Garage Services', href: ROUTES.services },
  { label: 'Book Repair', href: ROUTES.book },
  { label: 'Gallery', href: ROUTES.gallery },
  { label: 'Reviews', href: ROUTES.reviews },
  { label: 'Shop Supplies', href: ROUTES.shop },
  { label: 'Contact', href: ROUTES.contact },
];

export const FOOTER_LINKS: { label: string; href: AppRoute }[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About Us', href: ROUTES.about },
  { label: 'Automotive Services', href: ROUTES.services },
  { label: 'Book a Service', href: ROUTES.book },
  { label: 'Project Gallery', href: ROUTES.gallery },
  { label: 'Customer Reviews', href: ROUTES.reviews },
  { label: 'Shop Products', href: ROUTES.shop },
  { label: 'Contact Us', href: ROUTES.contact },
];

/** Match nav highlight — exact path or home for "/" */
export function isActiveRoute(current: string, href: AppRoute): boolean {
  if (href === ROUTES.home) return current === ROUTES.home;
  return current === href || current.startsWith(`${href}/`);
}
