/**
 * Gwecely Limited — brand constants (logo-matched colours)
 */

export const BRAND = {
  name: 'GWECELY',
  legalName: 'Gwecely Limited',
  /** Short workshop positioning — not lifestyle slogan */
  tagline: 'Mombasa vehicle repair workshop',
  subtitle: 'Accident repairs, panel beating, spray painting & mechanical work',

  colors: {
    orange: '#F05030',
    orangeHover: '#D9482A',
    charcoal: '#404040',
    black: '#111111',
    silver: '#B0B0B0',
    muted: '#6B6B6B',
    border: '#E6E6E6',
    surface: '#F6F6F6',
    white: '#FFFFFF',
  },

  /**
   * Structured workshop hours (24h). Display via formatOpeningHoursLines() —
   * never pipe these through Date / Intl.DateTimeFormat (hour12 can yield "00 PM").
   */
  hours: {
    weekdays: { days: 'Mon–Fri', open: '08:00', close: '18:00' },
    saturday: { days: 'Saturday', open: '08:00', close: '14:00' },
    sunday: { days: 'Sunday', closed: true as const },
  },

  about:
    'Gwecely Limited operates a motor vehicle workshop in Mombasa behind CMC Motors on Bishop Macarios Road. We handle panel beating, spray painting, accident repairs, vehicle servicing, mechanical repairs, and fleet maintenance for private owners and organisations along the coast.',

  expertise:
    'Primary work is accident repairs, panel beating, spray painting, servicing, mechanical repairs, and fleet maintenance.',

  mission:
    'To inspect damage carefully, give a clear estimate, carry out the repair work, and keep customers informed until handover.',

  vision:
    'To be a trusted Mombasa workshop for bodywork, repairs, and fleet maintenance.',

  market:
    'We work with private vehicle owners, fleets, and organisations that need workshop repairs in Mombasa.',

  contact: {
    address: 'Behind CMC Motors, Off Bishop Macarios Road, Mombasa',
    poBox: 'P.O. Box 323 - 80100, Mombasa',
    phones: ['+254 712 456 072', '+254 716 191 940'],
    emails: ['info@gwecely.co.ke'],
    whatsapp: '254712456072',
  },
} as const;
