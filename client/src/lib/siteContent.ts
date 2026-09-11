/**
 * Honest site content — no invented proof, stats, or partnerships
 */

export const TRUST_STRIP = [
  'Mombasa workshop behind CMC Motors',
  'Panel, paint and mechanical work',
  'Private vehicles and fleets',
  'Insurance documentation support where required',
] as const;

/** Short customer-facing process */
export const WHAT_HAPPENS_NEXT = [
  {
    step: '1',
    title: 'Send photos or call',
    detail: 'WhatsApp damage photos or call the workshop with your vehicle details.',
  },
  {
    step: '2',
    title: 'Vehicle inspection',
    detail: 'We inspect the vehicle at the bay behind CMC Motors and confirm the scope of work.',
  },
  {
    step: '3',
    title: 'Written estimate',
    detail: 'You receive a clear estimate of the work. Where an insurer must approve, that approval remains with them.',
  },
  {
    step: '4',
    title: 'Repair and updates',
    detail: 'Bodywork, paint, and mechanical work proceed with practical progress updates.',
  },
  {
    step: '5',
    title: 'Check and handover',
    detail: 'We review the finished work before you collect the vehicle.',
  },
] as const;

export const WHY_POINTS = [
  {
    title: 'Accessible Mombasa location',
    detail: 'Workshop behind CMC Motors on Bishop Macarios Road — practical for drop-off and collection.',
  },
  {
    title: 'Direct workshop communication',
    detail: 'Call or WhatsApp the same workshop number you see on this site. No call-centre runaround.',
  },
  {
    title: 'Bodywork and mechanical support',
    detail: 'Panel beating and spray painting sit alongside servicing and mechanical repairs under one roof.',
  },
  {
    title: 'Clear estimates',
    detail: 'Inspection first, then a written scope and estimate before major work proceeds.',
  },
  {
    title: 'Insurance documentation support',
    detail: 'We can prepare assessments and estimates for claim files. Insurer approval stays with the insurer.',
  },
  {
    title: 'Private owners and fleets',
    detail: 'The same bay handles individual vehicles and organised fleet maintenance work.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: 'Do you repair accident-damaged vehicles?',
    a: 'Yes. We handle accident repairs including panel beating, spray painting, and related mechanical checks.',
  },
  {
    q: 'Can I send photos of the damage?',
    a: 'Yes. WhatsApp photos to our workshop number — that is the fastest way to start an assessment conversation.',
  },
  {
    q: 'Do you assist with insurance repairs?',
    a: 'We inspect, estimate, and can provide documentation for your claim file. Approval of the claim remains with your insurer.',
  },
  {
    q: 'Where are you located?',
    a: 'Behind CMC Motors, Off Bishop Macarios Road, Mombasa.',
  },
  {
    q: 'What are your opening hours?',
    a: 'Monday–Friday 8:00 AM – 6:00 PM, Saturday 8:00 AM – 2:00 PM. Closed Sunday.',
  },
] as const;

/** Customer-problem oriented service blurbs */
export const SERVICE_PROBLEMS: Record<string, string> = {
  'Accident Repairs':
    'Collision or impact damage — we assess the vehicle and plan the body and related repairs needed to get it roadworthy again.',
  'Panel Beating':
    'Dents, crumpled panels, or structural body damage that needs reshaping or panel work before painting.',
  'Spray Painting':
    'Faded, mismatched, or repaired panels that need colour-matched refinishing and clear coat.',
  'Mechanical Repairs':
    'Engine, gearbox, brakes, suspension, or electrical faults diagnosed and repaired in the workshop.',
  'Vehicle Servicing':
    'Scheduled maintenance — oils, filters, fluids, and checks to keep the vehicle reliable.',
  'Fleet Maintenance':
    'Company or commercial vehicles that need planned servicing and repair coordination.',
};
