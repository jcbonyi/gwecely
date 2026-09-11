import { PRIMARY_GARAGE_SERVICES } from '@/lib/services';

export type GarageService = (typeof PRIMARY_GARAGE_SERVICES)[number];

export const SERVICE_SLUGS: Record<string, string> = {
  'Panel Beating': 'panel-beating',
  'Spray Painting': 'spray-painting',
  'Accident Repairs': 'accident-repairs',
  'Vehicle Servicing': 'vehicle-servicing',
  'Mechanical Repairs': 'mechanical-repairs',
  'Fleet Maintenance': 'fleet-maintenance',
};

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
      'Panel beating and body repairs in Mombasa behind CMC Motors. Dent removal and structural bodywork at Gwecely Limited.',
    keywords: 'panel beating Mombasa, panel beater Mombasa, car body repair Mombasa',
  },
  'spray-painting': {
    title: 'Car Spray Painting Mombasa | Gwecely Limited',
    description:
      'Vehicle spray painting and refinishing in Mombasa. Resprays and colour matching at Gwecely Limited.',
    keywords: 'spray painting Mombasa, car respray Mombasa',
  },
  'accident-repairs': {
    title: 'Accident Repair Mombasa | Gwecely Limited',
    description:
      'Accident and collision repairs in Mombasa — assessment, panel beating and spray painting at Gwecely Limited.',
    keywords: 'car accident repair Mombasa, collision repair Mombasa',
  },
  'vehicle-servicing': {
    title: 'Vehicle Servicing Mombasa | Gwecely Limited',
    description:
      'Vehicle servicing in Mombasa for cars, vans and SUVs at Gwecely Limited behind CMC Motors.',
    keywords: 'car service Mombasa, vehicle servicing Mombasa, garage Mombasa',
  },
  'mechanical-repairs': {
    title: 'Mechanical Repairs Mombasa | Gwecely Limited',
    description:
      'Mechanical garage repairs in Mombasa — engine, gearbox, brakes and diagnostics at Gwecely Limited.',
    keywords: 'mechanical repairs Mombasa, car garage Mombasa',
  },
  'fleet-maintenance': {
    title: 'Fleet Maintenance Mombasa | Gwecely Limited',
    description:
      'Fleet maintenance and repair for company vehicles in Mombasa at Gwecely Limited.',
    keywords: 'fleet maintenance Mombasa, commercial vehicle repair Mombasa',
  },
};
