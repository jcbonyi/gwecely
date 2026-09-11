/**
 * Verified / carefully worded site content — no invented stats or partnerships
 */

export const TRUST_POINTS = [
  {
    title: 'Professional workmanship',
    detail: 'Panel beating, spray painting, and mechanical work handled in our Mombasa workshop.',
  },
  {
    title: 'Insurance claim support',
    detail: 'We assist with assessments and repair documentation where your insurer requires it.',
  },
  {
    title: 'Clear process',
    detail: 'From inspection and estimate through repair and handover — you know the next step.',
  },
  {
    title: 'Local workshop',
    detail: 'Behind CMC Motors, Off Bishop Macarios Road, Mombasa — easy to find and visit.',
  },
  {
    title: 'Fleet & private vehicles',
    detail: 'We work with individual owners, fleets, and organisations that need dependable turnaround.',
  },
  {
    title: 'Direct communication',
    detail: 'Call, WhatsApp, or request a quote online — the workshop team responds during opening hours.',
  },
] as const;

/** Accident / repair journey — careful wording on insurer steps */
export const REPAIR_JOURNEY = [
  {
    step: '01',
    title: 'Report the incident',
    detail: 'Notify your insurer if the repair is part of a claim. Keep photos and details of the damage.',
  },
  {
    step: '02',
    title: 'Contact Gwecely',
    detail: 'Call, WhatsApp, or send a quote request with vehicle details and a short description of the damage.',
  },
  {
    step: '03',
    title: 'Vehicle inspection',
    detail: 'Bring the vehicle to our workshop behind CMC Motors, or arrange assessment as guided by our team.',
  },
  {
    step: '04',
    title: 'Damage assessment',
    detail: 'We inspect bodywork and related systems and prepare an estimate of the work required.',
  },
  {
    step: '05',
    title: 'Approval where required',
    detail: 'Where an insurer or fleet manager must approve the estimate, we support that process with clear documentation.',
  },
  {
    step: '06',
    title: 'Repair & restoration',
    detail: 'Panel beating, spray painting, mechanical work, and related repairs are carried out in the workshop.',
  },
  {
    step: '07',
    title: 'Quality check',
    detail: 'We review the finished work before the vehicle is released.',
  },
  {
    step: '08',
    title: 'Vehicle handover',
    detail: 'Collect your vehicle and confirm the completed work with our team.',
  },
] as const;

export const WHY_GWECELY = [
  {
    title: 'Workshop-first capability',
    detail:
      'Our core work is panel beating, spray painting, accident repairs, servicing, mechanical repairs, and fleet maintenance — not a front desk without a bay.',
  },
  {
    title: 'Structured repair process',
    detail:
      'Inspection, estimate, repair, and handover are organised steps so owners, fleets, and brokers know where the job stands.',
  },
  {
    title: 'Insurance-aware documentation',
    detail:
      'For claim-related jobs we prepare assessments and estimates you can share with your insurer. We do not claim exclusive insurer partnerships.',
  },
  {
    title: 'Accessible Mombasa location',
    detail:
      'The workshop sits behind CMC Motors on Bishop Macarios Road — practical for drop-off, collection, and fleet coordination.',
  },
  {
    title: 'Multiple ways to start',
    detail:
      'Request a quote online, call the workshop, or WhatsApp vehicle details and damage photos to begin assessment.',
  },
  {
    title: 'Transparent communication',
    detail:
      'You receive practical updates on scope and progress. Prefer clear estimates over vague promises.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: 'Do you repair accident-damaged vehicles?',
    a: 'Yes. We handle accident repairs including panel beating, spray painting, and related mechanical checks so the vehicle can return to the road safely.',
  },
  {
    q: 'Can I bring my vehicle after an accident?',
    a: 'Yes. Contact us first by phone or WhatsApp when possible, then bring the vehicle to our workshop behind CMC Motors, Mombasa, for inspection.',
  },
  {
    q: 'Do you assist with insurance repair processes?',
    a: 'We can inspect the vehicle, prepare an estimate, and support documentation your insurer may need. Approval remains with your insurer where a claim applies.',
  },
  {
    q: 'How long does a repair take?',
    a: 'Turnaround depends on the extent of damage, parts availability, and any insurer approval steps. After inspection we give a realistic estimate for your specific job.',
  },
  {
    q: 'Can I request a quotation online?',
    a: 'Yes. Use Get a Quote on this website with your vehicle details and a description of the damage. You can also call or WhatsApp the workshop directly.',
  },
  {
    q: 'Can I send photos of the damage?',
    a: 'Yes. Photos help us prepare for assessment. WhatsApp them to our workshop number, or note in your quote request that you will send photos.',
  },
  {
    q: 'Where is Gwecely located?',
    a: 'Behind CMC Motors, Off Bishop Macarios Road, Mombasa. P.O. Box 323 - 80100, Mombasa.',
  },
  {
    q: 'What types of vehicles do you service?',
    a: 'We work on private cars, vans, SUVs, and fleet/commercial vehicles for panel, paint, servicing, and mechanical repairs.',
  },
  {
    q: 'What are your opening hours?',
    a: 'Monday–Friday 8:00 AM – 6:00 PM, Saturday 8:00 AM – 2:00 PM. Closed on Sunday.',
  },
] as const;

export const SERVICE_SLUGS: Record<string, string> = {
  'Panel Beating': 'panel-beating',
  'Spray Painting': 'spray-painting',
  'Accident Repairs': 'accident-repairs',
  'Vehicle Servicing': 'vehicle-servicing',
  'Mechanical Repairs': 'mechanical-repairs',
  'Fleet Maintenance': 'fleet-maintenance',
};
