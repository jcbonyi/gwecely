/**
 * Gwecely Limited — brand constants
 * Colors sampled from official logo artwork (#F05030 orange, #404040 charcoal)
 */

export const BRAND = {
  name: 'GWECELY',
  legalName: 'Gwecely Limited',
  tagline: 'You dream it. We provide it. You live it.',
  subtitle: 'Motor Vehicle Garage, Panel Beating & Spray Painting',

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

  hours: {
    weekdays: 'Monday – Friday, 8:00 AM – 6:00 PM',
    saturday: 'Saturday, 8:00 AM – 2:00 PM',
    sunday: 'Sunday closed',
  },

  about:
    'Gwecely Limited is a registered motor vehicle garage in Mombasa, specialising in panel beating, spray painting, accident repairs, vehicle servicing, mechanical work, and fleet maintenance. Our workshop sits behind CMC Motors on Bishop Macarios Road and serves private motorists, fleets, and businesses along the coast.',

  expertise:
    'Core workshop work covers panel beating, spray painting, accident repairs, servicing, mechanical repairs, and fleet maintenance. Parts supply, corporate procurement, and hospitality supplies are available as supporting services for clients who already use the garage.',

  mission:
    'To deliver careful panel beating, spray painting, and garage repairs — with honest workmanship and clear pricing — while supporting fleet operators and businesses with dependable parts and procurement when needed.',

  vision:
    'To be Mombasa’s most trusted motor vehicle garage for bodywork, repairs, and fleet maintenance — known first for workshop quality.',

  market:
    'We work with private vehicle owners, sole traders, and limited companies. The same workshop team handles small jobs and fleet work alike.',

  contact: {
    address: 'Behind CMC Motors, Off Bishop Macarios Road, Mombasa',
    poBox: 'P.O. Box 323 - 80100, Mombasa',
    phones: ['+254 712 456 072', '+254 716 191 940'],
    emails: ['info@gwecely.co.ke'],
    whatsapp: '254712456072',
  },
} as const;
