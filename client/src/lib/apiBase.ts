/**
 * API base URL for fetch calls.
 * On Vercel production, always use same-origin /api (Turso serverless) — ignore VITE_API_URL.
 * Set VITE_API_URL only for local dev or a separate API host.
 */
function resolveApiBase(): string {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host.endsWith('.vercel.app') || host.endsWith('.vercel.sh')) {
      return '';
    }
  }
  return (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, '') ?? '';
}

const base = resolveApiBase();

export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
