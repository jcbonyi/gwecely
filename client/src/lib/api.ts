/**
 * API client — booking, contact, and M-Pesa endpoints (when server is configured)
 */

import { apiUrl } from '@/lib/apiBase';

export async function submitBooking(data: Record<string, string>): Promise<{ ok: boolean; ref?: string; error?: string }> {
  try {
    const res = await fetch(apiUrl('/api/booking'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: body.error ?? 'Booking could not be submitted' };
    }
    return res.json();
  } catch {
    return { ok: false, error: 'offline' };
  }
}

export async function submitContact(data: Record<string, string>): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(apiUrl('/api/contact'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return { ok: false };
    return res.json();
  } catch {
    return { ok: false, error: 'offline' };
  }
}

export async function requestMpesaStk(phone: string, amount: number): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(apiUrl('/api/mpesa/stk-push'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, amount }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: body.error ?? 'M-Pesa unavailable' };
    return { ok: true };
  } catch {
    return { ok: false, error: 'offline' };
  }
}

export function generateRef(prefix = 'GWC'): string {
  return `${prefix}-${Date.now().toString().slice(-6)}`;
}
