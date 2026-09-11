import { PRIMARY_GARAGE_SERVICES } from '@/lib/services';
import { SERVICE_SLUGS } from '@/lib/siteContent';

export type GarageService = (typeof PRIMARY_GARAGE_SERVICES)[number];

export function slugForService(title: string): string {
  return SERVICE_SLUGS[title] ?? title.toLowerCase().replace(/\s+/g, '-');
}

export function findServiceBySlug(slug: string): GarageService | undefined {
  return PRIMARY_GARAGE_SERVICES.find((s) => slugForService(s.title) === slug);
}

export const SERVICE_SEO: Record<
  string,
  { title: string; description: string; keywords: string }
> = {
  'panel-beating': {
    title: 'Panel Beating Mombasa | Gwecely Limited',
    description:
      'Professional panel beating and body repairs in Mombasa behind CMC Motors. Dent removal, chassis work, and structural repairs at Gwecely Limited.',
    keywords: 'panel beating Mombasa, panel beater Mombasa, car body repair Mombasa',
  },
  'spray-painting': {
    title: 'Car Spray Painting Mombasa | Gwecely Limited',
    description:
      'Vehicle spray painting and auto body refinishing in Mombasa. Full resprays, colour matching, and clear-coat finishing at Gwecely Limited.',
    keywords: 'spray painting Mombasa, car respray Mombasa, auto body paint Kenya',
  },
  'accident-repairs': {
    title: 'Accident Repair Mombasa | Gwecely Limited',
    description:
      'Accident and collision repairs in Mombasa — assessment, panel beating, spray painting, and related mechanical checks at Gwecely Limited.',
    keywords: 'car accident repair Mombasa, collision repair Mombasa, vehicle body repair Kenya',
  },
  'vehicle-servicing': {
    title: 'Vehicle Servicing Mombasa | Gwecely Limited',
    description:
      'Scheduled vehicle servicing in Mombasa for cars, vans, and SUVs. Oil, filters, fluids, and maintenance at Gwecely Limited.',
    keywords: 'car service Mombasa, vehicle servicing Mombasa, garage Mombasa',
  },
  'mechanical-repairs': {
    title: 'Mechanical Repairs Mombasa | Gwecely Limited',
    description:
      'Mechanical garage repairs in Mombasa — engine, gearbox, brakes, suspension, and diagnostics at Gwecely Limited.',
    keywords: 'mechanical repairs Mombasa, car garage Mombasa, auto repair Mombasa',
  },
  'fleet-maintenance': {
    title: 'Fleet Maintenance Mombasa | Gwecely Limited',
    description:
      'Fleet maintenance and repair programmes for company and commercial vehicles in Mombasa at Gwecely Limited.',
    keywords: 'fleet maintenance Mombasa, commercial vehicle repair Mombasa',
  },
};
