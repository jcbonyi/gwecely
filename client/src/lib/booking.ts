import { ROUTES } from '@/lib/routes';
import { goTo } from '@/lib/navigation';

const BOOKING_SERVICE_KEY = 'gwecely-book-service';

/** Pre-select a service on the quote form and navigate to Get a Quote */
export function bookService(serviceName: string): void {
  try {
    sessionStorage.setItem(BOOKING_SERVICE_KEY, serviceName);
  } catch {
    /* ignore */
  }
  goTo(ROUTES.quote);
}

/** Alias for conversion-focused CTAs */
export function requestQuote(serviceName?: string): void {
  if (serviceName) {
    bookService(serviceName);
    return;
  }
  goTo(ROUTES.quote);
}

export function consumePreselectedService(): string | null {
  try {
    const value = sessionStorage.getItem(BOOKING_SERVICE_KEY);
    if (value) sessionStorage.removeItem(BOOKING_SERVICE_KEY);
    return value;
  } catch {
    return null;
  }
}
