import { apiUrl } from '@/lib/apiBase';

const API_TIMEOUT_MS = 20_000;
const WARM_TIMEOUT_MS = 25_000;

let warmInFlight: Promise<void> | null = null;

/** Ping the API early so Render free tier is awake before save/upload. */
export function warmAdminApi(token: string): Promise<void> {
  if (warmInFlight) return warmInFlight;

  warmInFlight = (async () => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), WARM_TIMEOUT_MS);
    try {
      await fetch(apiUrl('/api/admin/products'), {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });
    } catch {
      /* ignore — wake attempt only */
    } finally {
      window.clearTimeout(timer);
      warmInFlight = null;
    }
  })();

  return warmInFlight;
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export async function adminFetch(
  path: string,
  token: string,
  init?: RequestInit,
  options?: { retries?: number; onRetry?: () => void }
): Promise<unknown> {
  const retries = options?.retries ?? 1;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    try {
      const res = await fetch(apiUrl(path), {
        ...init,
        signal: controller.signal,
        headers: {
          ...(init?.headers ?? {}),
          Authorization: `Bearer ${token}`,
          ...(init?.body && !(init.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
        },
      });

      const contentType = res.headers.get('content-type') ?? '';
      if (!contentType.includes('application/json')) {
        throw new Error(
          res.ok
            ? 'Product API returned an invalid response. Deploy the Express API and set API_URL on Vercel.'
            : `Request failed (${res.status})`
        );
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error((data as { error?: string }).error ?? `Request failed (${res.status})`);
      }
      return data;
    } catch (e) {
      const timedOut = e instanceof DOMException && e.name === 'AbortError';
      lastError = timedOut
        ? new Error(
            'Request timed out. Add TURSO_DATABASE_URL + TURSO_AUTH_TOKEN on Vercel and redeploy.'
          )
        : e instanceof Error
          ? e
          : new Error('Request failed');

      if (timedOut && attempt < retries) {
        options?.onRetry?.();
        await sleep(2500);
        continue;
      }
      throw lastError;
    } finally {
      window.clearTimeout(timer);
    }
  }

  throw lastError ?? new Error('Request failed');
}
