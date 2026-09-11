/**
 * Before/after comparison slider — no new dependencies
 */

import { useCallback, useRef, useState } from 'react';

type Props = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  caption: string;
};

export default function BeforeAfterSlider({ beforeSrc, afterSrc, alt, caption }: Props) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const track = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = track.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, next)));
  }, []);

  return (
    <figure className="border border-[#E6E6E6] bg-white">
      <div
        ref={track}
        className="relative aspect-[16/10] overflow-hidden select-none bg-[#111111] touch-none cursor-ew-resize"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          setFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
        role="img"
        aria-label={`${alt}. Drag to compare before and after.`}
      >
        <img
          src={beforeSrc}
          alt={`${alt} — before repair`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          width={800}
          height={500}
          loading="lazy"
        />
        <img
          src={afterSrc}
          alt={`${alt} — after repair`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
          width={800}
          height={500}
          loading="lazy"
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-sm z-10 pointer-events-none"
          style={{ left: `${pos}%` }}
          aria-hidden
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[#E6E6E6] flex items-center justify-center text-[#111] text-xs font-bold">
            ‖
          </span>
        </div>
        <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] uppercase tracking-wide px-2 py-1 pointer-events-none">
          Before
        </span>
        <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] uppercase tracking-wide px-2 py-1 pointer-events-none">
          After
        </span>
      </div>
      <figcaption className="p-3 text-sm text-[#404040] font-[family-name:var(--font-body)]">{caption}</figcaption>
    </figure>
  );
}
