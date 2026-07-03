/**
 * Curated Unsplash portraits — African / Kenyan people for Kenyan audience
 * https://unsplash.com/license
 */

export const AFRICAN_PORTRAITS = {
  /** Nairobi, Kenya — professional man on phone */
  kenyanMan1: 'photo-1713747451985-761444dd8e75',
  /** African man beside vehicle — garage / motorist */
  kenyanMan2: 'photo-1617244148472-3566e69ae9f8',
  /** African man beside car — workshop customer */
  kenyanMan3: 'photo-1617244148104-e909393c51f1',
  /** African man in business suit */
  kenyanMan4: 'photo-1578758803946-2c4f6738df87',
  /** African woman — confident smile */
  kenyanWoman1: 'photo-1573496799515-eebbb63814f2',
  /** African woman — executive portrait */
  kenyanWoman2: 'photo-1573497019418-b400bb3ab074',
  /** African woman — warm smile */
  kenyanWoman3: 'photo-1573496527892-904f897eb744',
  /** African woman with laptop — procurement / office */
  kenyanWoman4: 'photo-1573166953836-06864dc70a21',
  /** African colleagues in office */
  officeTeam: 'photo-1573164574511-73c773193279',
  /** African professionals in meeting */
  businessMeeting: 'photo-1600880292203-757bb62b4baf',
  /** African man on laptop */
  professionalLaptop: 'photo-1528901166007-3784c7dd3653',
  /** African woman cooking — hospitality / kitchen */
  hospitalityService: 'photo-1697378149850-0910bce142b7',
  /** Motorist beside car in garage setting */
  motoristAtCar: 'photo-1625047509252-ab38fb5c7343',
  /** African man beside car — bodywork / garage services */
  garageTechnician: 'photo-1617244148194-7971ce22f2fb',
  /** Three African women — hospitality procurement */
  hospitalityTeam: 'photo-1573164574397-dd250bc8a598',
  /** African team reviewing catalogue on laptop — shop */
  shopProcurement: 'photo-1655720357872-ce227e4164ba',
} as const;

export type AfricanPortraitId = (typeof AFRICAN_PORTRAITS)[keyof typeof AFRICAN_PORTRAITS];

export function portraitUrl(id: AfricanPortraitId | string, width = 800): string {
  return `https://images.unsplash.com/${id}?w=${width}&q=80&auto=format&fit=crop`;
}
