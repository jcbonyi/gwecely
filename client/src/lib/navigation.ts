import { scrollToSection } from '@/lib/scroll';
import { ROUTES } from '@/lib/routes';

const PENDING_HASH_KEY = 'gwecely-pending-hash';
const PENDING_SHOP_CATEGORY_KEY = 'gwecely-shop-category';

type NavigateFn = (path: string) => void;

let navigate: NavigateFn = (path) => {
  window.location.assign(path);
};

/** Registered by SiteLayout so lib helpers can navigate within the SPA */
export function registerNavigate(fn: NavigateFn): void {
  navigate = fn;
}

export function goTo(path: string): void {
  navigate(path);
}

export function goToShopCategory(categoryId: string): void {
  try {
    sessionStorage.setItem(PENDING_SHOP_CATEGORY_KEY, categoryId);
  } catch {
    /* ignore */
  }
  const target = `${ROUTES.shop}?category=${encodeURIComponent(categoryId)}`;
  if (window.location.pathname === ROUTES.shop) {
    window.history.replaceState({}, '', target);
    window.dispatchEvent(new PopStateEvent('popstate'));
    return;
  }
  navigate(target);
}

export function consumePendingShopCategory(): string | null {
  try {
    const value = sessionStorage.getItem(PENDING_SHOP_CATEGORY_KEY);
    if (value) sessionStorage.removeItem(PENDING_SHOP_CATEGORY_KEY);
    return value;
  } catch {
    return null;
  }
}

export function goToHash(path: string, hash: string): void {
  const selector = hash.startsWith('#') ? hash : `#${hash}`;
  if (window.location.pathname === path) {
    scrollToSection(selector);
    return;
  }
  try {
    sessionStorage.setItem(PENDING_HASH_KEY, selector);
  } catch {
    /* ignore */
  }
  navigate(path);
}

/** Call on route change to scroll to a pending hash or top of page */
export function applyPendingScroll(pathname: string): void {
  try {
    const hash = sessionStorage.getItem(PENDING_HASH_KEY);
    if (hash) {
      sessionStorage.removeItem(PENDING_HASH_KEY);
      requestAnimationFrame(() => scrollToSection(hash));
      return;
    }
  } catch {
    /* ignore */
  }
  if (pathname !== '/') {
    window.scrollTo(0, 0);
  }
}
