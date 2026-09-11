/**
 * Embedded Google Map — confirmed workshop pin
 */

import { MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from '@/lib/routes';

type Props = {
  className?: string;
  title?: string;
};

export default function ContactMap({
  className = 'w-full h-full min-h-[240px] border-0',
  title = 'Gwecely Limited workshop location on Google Maps',
}: Props) {
  return (
    <iframe
      title={title}
      src={MAPS_EMBED_URL}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}

export function MapDirectionsLink({ className = '' }: { className?: string }) {
  return (
    <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={className}>
      Open in Google Maps
    </a>
  );
}
