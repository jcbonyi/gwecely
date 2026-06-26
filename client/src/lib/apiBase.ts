/** API base URL — empty in dev (Vite proxy); set VITE_API_URL in production (e.g. Render). */
const base = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, '') ?? '';

export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
