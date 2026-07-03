import { HOSPITALITY_QUOTE_KEY } from '@/lib/hospitality';
import { ROUTES } from '@/lib/routes';
import { goTo, goToHash } from '@/lib/navigation';

export interface HospitalityQuotePrefill {
  category?: string;
  product?: string;
  notes?: string;
}

export function requestHospitalityQuote(prefill?: HospitalityQuotePrefill): void {
  try {
    if (prefill) {
      sessionStorage.setItem(HOSPITALITY_QUOTE_KEY, JSON.stringify(prefill));
    }
  } catch {
    /* ignore */
  }
  goToHash(ROUTES.hospitality, 'quote');
}

export function consumeHospitalityQuotePrefill(): HospitalityQuotePrefill | null {
  try {
    const raw = sessionStorage.getItem(HOSPITALITY_QUOTE_KEY);
    if (raw) sessionStorage.removeItem(HOSPITALITY_QUOTE_KEY);
    return raw ? (JSON.parse(raw) as HospitalityQuotePrefill) : null;
  } catch {
    return null;
  }
}

export function scrollToHospitalityCatalogue(): void {
  goToHash(ROUTES.hospitality, 'catalogue');
}
