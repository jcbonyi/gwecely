/**
 * Shared opening-hours block — always uses formatOpeningHoursLines()
 */

import { formatOpeningHoursLines } from '@/lib/openingHours';

type Props = {
  className?: string;
  as?: 'p' | 'div';
};

export default function OpeningHours({ className = '', as: Tag = 'div' }: Props) {
  const lines = formatOpeningHoursLines();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={line}>
          {i > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </Tag>
  );
}
