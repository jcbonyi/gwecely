import { ROUTES } from '@/lib/routes';
import { goTo } from '@/lib/navigation';

const BOOKING_SERVICE_KEY = 'gwecely-book-service';

/** Pre-select a service on the booking form and navigate to the book page */
export function bookService(serviceName: string): void {
  try {
    sessionStorage.setItem(BOOKING_SERVICE_KEY, serviceName);
  } catch {
    /* ignore */
  }
  goTo(ROUTES.book);
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
