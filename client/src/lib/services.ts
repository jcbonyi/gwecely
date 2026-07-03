/**
 * Gwecely service hierarchy — garage primary (~80%), supporting secondary (~20%)
 */

export const PRIMARY_GARAGE_SERVICES = [
  {
    title: 'Panel Beating',
    bookingService: 'Panel Beating',
    desc: 'Expert panel beating and body shaping — dent removal, chassis straightening, and structural repairs to restore your vehicle after collisions.',
    features: ['Dent Removal', 'Chassis Straightening', 'Body Panel Replacement', 'Structural Repairs'],
    imageKey: 'panelBeating' as const,
    galleryHint: 'Before & after body repairs',
  },
  {
    title: 'Spray Painting',
    bookingService: 'Spray Painting',
    desc: 'Professional spray painting and auto body refinishing — full resprays, colour matching, touch-ups, and flawless clear-coat finishes.',
    features: ['Full Respray', 'Colour Matching', 'Spot Repairs', 'Clear-Coat Finishing'],
    imageKey: 'sprayPainting' as const,
    galleryHint: 'Respray & refinishing projects',
  },
  {
    title: 'Accident Repairs',
    bookingService: 'Accident Repairs',
    desc: 'End-to-end accident repair — from insurance assessments and bodywork to mechanical checks, so your vehicle is safe and roadworthy again.',
    features: ['Insurance Assessments', 'Collision Repair', 'Safety Inspections', 'Full Restoration'],
    imageKey: 'panelBeating' as const,
    galleryHint: 'Accident repair projects',
  },
  {
    title: 'Vehicle Servicing',
    bookingService: 'Vehicle Servicing',
    desc: 'Scheduled servicing for cars, vans, and SUVs — oil changes, filters, fluids, and manufacturer-recommended maintenance intervals.',
    features: ['Oil & Filter Changes', 'Fluid Top-Ups', 'Multi-Point Checks', 'Service Records'],
    imageKey: 'mechanical' as const,
    galleryHint: 'Routine servicing in our workshop',
  },
  {
    title: 'Mechanical Repairs',
    bookingService: 'Mechanical Repairs',
    desc: 'Full mechanical garage work — engine, gearbox, brakes, suspension, diagnostics, and electrical faults by experienced technicians.',
    features: ['Engine & Gearbox', 'ECU Diagnostics', 'Brake & Suspension', 'Electrical Faults'],
    imageKey: 'mechanical' as const,
    galleryHint: 'Engine & gearbox work',
  },
  {
    title: 'Fleet Maintenance',
    bookingService: 'Fleet Maintenance',
    desc: 'Planned maintenance and repair programmes for company fleets, logistics vehicles, and commercial operators across Mombasa.',
    features: ['Fleet Servicing Plans', 'Priority Turnaround', 'Bulk Scheduling', 'Maintenance Records'],
    imageKey: 'emergencyBanner' as const,
    galleryHint: 'Commercial fleet work',
  },
] as const;

export const SECONDARY_SUPPORT_SERVICES = [
  {
    title: 'Automotive Parts Supply',
    desc: 'Genuine and aftermarket spare parts, filters, oils, tyres, and workshop consumables — available through our shop.',
    imageKey: 'mechanical' as const,
    link: 'shop' as const,
  },
  {
    title: 'Corporate Procurement',
    desc: 'Office stationery, furniture, IT equipment, and health & safety supplies for businesses and institutions.',
    imageKey: 'stationery' as const,
    link: 'contact' as const,
    enquiryTopic: 'Corporate Procurement',
  },
  {
    title: 'Hospitality Supplies',
    desc: 'Tableware, glassware, kitchen equipment, housekeeping, and catering supplies for hotels, restaurants, and institutions.',
    imageKey: 'dryFoods' as const,
    link: 'hospitality' as const,
  },
] as const;

/** Booking form dropdown — primary garage services first */
export const BOOKING_SERVICE_OPTIONS = [
  'Panel Beating',
  'Spray Painting',
  'Accident Repairs',
  'Vehicle Servicing',
  'Mechanical Repairs',
  'Fleet Maintenance',
  'Other',
] as const;

export const FOOTER_SERVICE_LINES = [
  'Panel Beating',
  'Spray Painting',
  'Accident Repairs',
  'Vehicle Servicing',
  'Mechanical Repairs',
  'Fleet Maintenance',
  'Parts Supply',
  'Corporate Procurement',
  'Hospitality Supplies',
] as const;
