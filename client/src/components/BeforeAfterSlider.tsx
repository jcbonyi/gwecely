/**
 * BeforeAfterSlider — drag to compare workshop results
 */

import { useCallback, useRef, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt = 'Before and after workshop result',
  className = '',
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={rootRef}
      className={`compare-slider aspect-[16/10] md:aspect-[21/10] bg-[#2D2626] ${className}`}
      style={{ ['--compare-pos' as string]: `${pos}%` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-label="Compare before and after"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(2, p - 3));
        if (e.key === 'ArrowRight') setPos((p) => Math.min(98, p + 3));
      }}
    >
      <img src={beforeSrc} alt={`${alt} — before`} draggable={false} />
      <div className="compare-slider-after">
        <img src={afterSrc} alt={`${alt} — after`} draggable={false} />
      </div>
      <div className="compare-slider-handle">
        <span className="compare-slider-knob">
          <ArrowLeftRight size={16} />
        </span>
      </div>
      <span className="absolute top-3 left-3 z-10 rounded bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white font-[family-name:var(--font-body)]">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 z-10 rounded bg-[#F05A32]/90 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white font-[family-name:var(--font-body)]">
        {afterLabel}
      </span>
    </div>
  );
}
