/**
 * Owner-supplied proof — fill arrays to reveal homepage sections.
 * Empty = section is not rendered (never show "coming soon" to visitors).
 */

export type ProofStat = {
  label: string;
  value: string;
};

// REPLACE: years operating, vehicles repaired, average turnaround (real figures only)
export const PROOF_STATS: ProofStat[] = [];

// REPLACE: insurer names you actually accept assessments from
export const ACCEPTED_INSURERS: string[] = [];

export type GoogleReview = {
  name: string;
  rating: number;
  date: string;
  quote: string;
};

// REPLACE: real Google reviews (name, rating, date, quote)
export const GOOGLE_REVIEWS: GoogleReview[] = [];

// REPLACE: Google Business Profile URL — required for reviews section + sameAs schema
export const GOOGLE_BUSINESS_PROFILE_URL = '';

/** Workshop pin — Google Maps (confirmed) */
export const WORKSHOP_GEO = {
  latitude: -4.061953766630648,
  longitude: 39.65666304822228,
};

export const AREA_SERVED = ['Mombasa', 'Nyali', 'Bamburi', 'Likoni'] as const;

/** Reviews section renders only when GBP URL or named reviews exist */
export function hasReviewsContent(): boolean {
  return Boolean(GOOGLE_BUSINESS_PROFILE_URL) || GOOGLE_REVIEWS.length > 0;
}
