/**
 * Before/after repair pairs for the homepage gallery.
 *
 * REPLACE: add genuine pairs (minimum recommended: 8). Until then the homepage
 * section is hidden entirely — never render an empty / "coming soon" block.
 *
 * Each pair needs: beforeSrc, afterSrc, vehicle, damage, optional daysInWorkshop.
 */

export type BeforeAfterPair = {
  id: string;
  beforeSrc: string;
  afterSrc: string;
  vehicle: string;
  damage: string;
  daysInWorkshop?: number;
};

export const BEFORE_AFTER_PAIRS: BeforeAfterPair[] = [
  // REPLACE: { id: '1', beforeSrc: '...', afterSrc: '...', vehicle: 'Toyota Hilux', damage: 'Rear quarter panel', daysInWorkshop: 5 },
];

export function pairCaption(pair: BeforeAfterPair): string {
  const days =
    typeof pair.daysInWorkshop === 'number'
      ? ` · ${pair.daysInWorkshop} day${pair.daysInWorkshop === 1 ? '' : 's'} in workshop`
      : '';
  return `${pair.vehicle} — ${pair.damage}${days}`;
}
