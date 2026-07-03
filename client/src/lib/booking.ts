const BOOKING_SERVICE_KEY = 'gwecely-book-service';

/** Pre-select a service on the booking form and scroll to #booking */
export function bookService(serviceName: string): void {
  try {
    sessionStorage.setItem(BOOKING_SERVICE_KEY, serviceName);
  } catch {
    /* ignore */
  }
  document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
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
