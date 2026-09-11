/**
 * Owner-supplied proof facts — leave empty until confirmed.
 * Do not invent years, vehicle counts, turnaround, insurers, or review quotes.
 */

export type ProofStat = {
  label: string;
  value: string;
};

/** TODO: years operating, vehicles repaired, average turnaround — ask owner */
export const PROOF_STATS: ProofStat[] = [];

/** TODO: insurer names you actually accept assessments from */
export const ACCEPTED_INSURERS: string[] = [];

export type GoogleReview = {
  name: string;
  rating: number;
  date: string;
  quote: string;
};

/** TODO: paste real Google reviews (name, rating, date, quote) */
export const GOOGLE_REVIEWS: GoogleReview[] = [];

/** TODO: exact Google Business Profile URL for "See all reviews" */
export const GOOGLE_BUSINESS_PROFILE_URL = '';

/** Workshop pin — Google Maps (confirmed) */
export const WORKSHOP_GEO = {
  latitude: -4.061953766630648,
  longitude: 39.65666304822228,
};

export const AREA_SERVED = ['Mombasa', 'Nyali', 'Bamburi', 'Likoni'] as const;
