/**
 * Before/after repair pairs for the homepage gallery.
 *
 * TODO (owner): Provide at least 8 genuine pairs with:
 *   - beforeSrc / afterSrc (local workshop photos, not stock)
 *   - vehicle (e.g. "Toyota Hilux")
 *   - damage (e.g. "Rear quarter panel collision")
 *   - daysInWorkshop (integer only if accurate — do not invent)
 *
 * Until real pairs are supplied, the UI shows an honest empty state.
 */

export type BeforeAfterPair = {
  id: string;
  beforeSrc: string;
  afterSrc: string;
  vehicle: string;
  damage: string;
  /** Omit or leave undefined until a real figure is confirmed */
  daysInWorkshop?: number;
};

export const BEFORE_AFTER_PAIRS: BeforeAfterPair[] = [
  // TODO: add genuine repair pairs here (minimum 8)
];

export function pairCaption(pair: BeforeAfterPair): string {
  const days =
    typeof pair.daysInWorkshop === 'number'
      ? ` · ${pair.daysInWorkshop} day${pair.daysInWorkshop === 1 ? '' : 's'} in workshop`
      : '';
  return `${pair.vehicle} — ${pair.damage}${days}`;
}
