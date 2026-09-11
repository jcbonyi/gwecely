/**
 * Opening-hours display — format from 24h strings without Date/Intl.
 * Avoids Chromium/en-GB hour12 quirks that can render noon as "00 PM",
 * and avoids buggy split/index formatters that print minutes as the hour.
 */

import { BRAND } from './brand';

/** Convert "08:00" / "18:00" → "8:00 AM" / "6:00 PM" (never "00 PM") */
export function formatTime12h(hhmm: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!match) return hhmm;

  const hour24 = Number(match[1]);
  const minutes = match[2];
  if (!Number.isFinite(hour24) || hour24 < 0 || hour24 > 23) return hhmm;

  const period = hour24 >= 12 ? 'PM' : 'AM';
  // 0 → 12 AM, 12 → 12 PM, 13 → 1 PM — never leave a bare 0
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return `${hour12}:${minutes} ${period}`;
}

export function formatDayRange(days: string, open: string, close: string): string {
  return `${days}: ${formatTime12h(open)} – ${formatTime12h(close)}`;
}

/** Canonical visitor-facing lines */
export function formatOpeningHoursLines(): [string, string, string] {
  const { weekdays, saturday, sunday } = BRAND.hours;
  return [
    formatDayRange(weekdays.days, weekdays.open, weekdays.close),
    formatDayRange(saturday.days, saturday.open, saturday.close),
    sunday.closed ? `${sunday.days}: Closed` : formatDayRange(sunday.days, '00:00', '00:00'),
  ];
}

/** Single-line summary (hero, FAQ) */
export function formatOpeningHoursSummary(): string {
  const [weekdays, saturday, sunday] = formatOpeningHoursLines();
  return `${weekdays}, ${saturday}. ${sunday}.`;
}
