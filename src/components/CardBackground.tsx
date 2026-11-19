import { memo, useEffect, useRef } from 'react';
import { observeInView } from '../lib/perf';

export type BgVariant = 'pixels' | 'arc' | 'contour' | 'hatch' | 'beam';

/* Deterministic pixel layout (cells that "fill in" like a bitmap) */
const PX_COLS = 7;
const PX_ROWS = 4;
const PX_ON = new Set([3, 9, 10, 16, 17, 18, 22, 25, 26]);

function Pixels() {
  const cells = [];
  for (let r = 0; r < PX_ROWS; r++) {
    for (let c = 0; c < PX_COLS; c++) {
      const i = r * PX_COLS + c;
      // Show more cells toward bottom-right, like ProofDeck
      if (c + r < 3) continue;
      cells.push(
        <rect
          key={i}
          x={c * 34}
          y={r * 34}
          width="28"
          height="28"
          rx="7"
          className={PX_ON.has(i) ? 'on' : undefined}
          style={{ ['--d' as string]: (PX_COLS - c) + r * 2 }}
        />
      );
    }
  }
  return (
    <div className="cbg-pixels absolute inset-0">
      <svg viewBox="0 0 238 136" aria-hidden="true">{cells}</svg>
    </div>
  );
}

function Arc() {
  return (
    <div className="cbg-arc absolute inset-0">
      <div className="arc-wrap">
        <div className="arc-breathe">
          <svg viewBox="0 0 200 200" fill="none" aria-hidden="true">
            <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="14" strokeDasharray="210 380" strokeLinecap="round" />
            <circle cx="100" cy="100" r="66" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
            <circle cx="100" cy="100" r="44" stroke="currentColor" strokeWidth="9" strokeDasharray="90 200" strokeLinecap="round" opacity=".6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Contour() {
  return (
    <div className="cbg-contour absolute inset-0">
      <div className="ct-wrap">
        <svg viewBox="0 0 300 200" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
          <path d="M150 40c48 0 92 22 92 58s-38 66-92 66-98-24-98-60 50-64 98-64z" />
          <path d="M150 58c36 0 70 16 70 42s-30 48-70 48-74-18-74-44 38-46 74-46z" />
          <path d="M152 76c24 0 46 10 46 26s-20 30-46 30-48-12-28-28c10-8 6-28 28-28z" />
          <path d="M156 94c10 0 20 4 20 10s-10 12-20 12-18-6-12-12 4-10 12-10z" />
          <path d="M150 20c66 0 120 32 120 80s-52 92-120 92S20 160 24 108 84 20 150 20z" />
          <path d="M30 30c30 10 40-6 70 4M200 176c30-8 50 6 80-2" />
        </svg>
      </div>
    </div>
  );
}

function Hatch() {
  return (
    <div className="cbg-hatch absolute inset-0">
      <div className="ht" />
    </div>
  );
}

function Beam() {
  return (
    <div className="cbg-beam absolute inset-0">
      <div className="bm" />
    </div>
  );
}

/**
 * Animated card background. CSS/SVG only, transform/opacity animation,
 * paused offscreen via a shared IntersectionObserver; static on reduced motion / lite.
 */
export const CardBackground = memo(function CardBackground({ variant }: { variant: BgVariant }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeInView(el, (inView) => el.setAttribute('data-live', inView ? '1' : '0'), '80px', 0);
  }, []);

  return (
    <div ref={ref} className="cbg" data-live="0" aria-hidden="true">
      {variant === 'pixels' && <Pixels />}
      {variant === 'arc' && <Arc />}
      {variant === 'contour' && <Contour />}
      {variant === 'hatch' && <Hatch />}
      {variant === 'beam' && <Beam />}
    </div>
  );
});

export function variantForCategory(category: string): BgVariant {
  if (category.startsWith('3D')) return 'pixels';
  if (category.startsWith('2D') || category.startsWith('Drafting')) return 'hatch';
  if (category.startsWith('Physical')) return 'arc';
  if (category.startsWith('GIS')) return 'contour';
  return 'beam';
}
