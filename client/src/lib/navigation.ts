import { scrollToSection } from '@/lib/scroll';

const PENDING_HASH_KEY = 'gwecely-pending-hash';

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
