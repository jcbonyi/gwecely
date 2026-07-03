/**
 * Curated Unsplash portraits — African / Kenyan people for Kenyan audience
 * https://unsplash.com/license
 */

export const AFRICAN_PORTRAITS = {
  /** Nairobi, Kenya — professional man */
  kenyanMan1: 'photo-1713747451985-761444dd8e75',
  /** Black man, professional portrait */
  kenyanMan2: 'photo-1531384441138-273c54d55e10',
  /** Black man, smiling portrait */
  kenyanMan3: 'photo-1619895862022-09128b1f6580',
  /** African man, business attire */
  kenyanMan4: 'photo-1589156196458-48c985b4bfb9',
  /** Black woman, executive portrait */
  kenyanWoman1: 'photo-1573497019236-462ed122d1b3',
  /** Black woman, headwrap */
  kenyanWoman2: 'photo-1594744802523-79037bd6234a',
  /** Black woman, warm smile */
  kenyanWoman3: 'photo-1619894423162-f8f7bbf61111',
  /** Black woman, professional */
  kenyanWoman4: 'photo-1545167596-77fd082fda08',
  /** African colleagues in office */
  officeTeam: 'photo-1573164574511-73c77306328f',
  /** African professionals in meeting */
  businessMeeting: 'photo-1600880292203-757bb62b4baf',
  /** Black woman working on laptop */
  professionalLaptop: 'photo-1581092918056-0c4c3acd378a',
  /** African woman in professional kitchen / hospitality context */
  hospitalityService: 'photo-1595475208938-78320c4cace4',
} as const;

export type AfricanPortraitId = (typeof AFRICAN_PORTRAITS)[keyof typeof AFRICAN_PORTRAITS];

export function portraitUrl(id: AfricanPortraitId | string, width = 800): string {
  return `https://images.unsplash.com/${id}?w=${width}&q=80&auto=format&fit=crop`;
}
