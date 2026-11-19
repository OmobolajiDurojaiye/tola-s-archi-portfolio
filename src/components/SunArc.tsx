import { useRef, useState, useCallback } from 'react';
import { Sun } from '@phosphor-icons/react/dist/csr/Sun';
import { Moon } from '@phosphor-icons/react/dist/csr/Moon';
import { SUN_LABELS, isDark } from '../lib/sun';
import { hapticTap } from '../lib/perf';

interface SunArcProps {
  value: number;
  onChange: (v: number) => void;
}

const W = 560;
const H = 92;
const PAD = 26;

function pointAt(t: number) {
  // Semi-ellipse from left (t=0) to right (t=1), apex in the middle
  const a = Math.PI * (1 - t);
  const rx = (W - PAD * 2) / 2;
  const ry = H - 30;
  return { x: W / 2 + rx * Math.cos(a), y: H - 12 - ry * Math.sin(a) };
}

/**
 * Time-of-day control: thin arc track under the building, sun/moon thumb travels the arc.
 * No pill container. Keyboard accessible (arrow keys), pointer drag, haptic on release.
 */
export function SunArc({ value, onChange }: SunArcProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [touched, setTouched] = useState(false);
  const dragging = useRef(false);

  const fromPointer = useCallback(
    (clientX: number) => {
      const r = rectRef.current;
      if (!r) return;
      const x = ((clientX - r.left) / r.width) * W;
      const t = Math.min(1, Math.max(0, (x - PAD) / (W - PAD * 2)));
      onChange(Math.round(t * 100) / 100);
    },
    [onChange]
  );

  const p = pointAt(value);
  const dark = isDark(value);
  const steps = 48;
  const d = Array.from({ length: steps + 1 }, (_, i) => {
    const q = pointAt(i / steps);
    return `${i === 0 ? 'M' : 'L'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
  }).join(' ');
  const done = Array.from({ length: Math.max(1, Math.round(value * steps)) + 1 }, (_, i) => {
    const q = pointAt(Math.min(value, i / steps));
    return `${i === 0 ? 'M' : 'L'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none" data-cursor="drag">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto overflow-visible touch-none"
        role="slider"
        tabIndex={0}
        aria-label="Time of day"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') onChange(Math.min(1, value + 0.04));
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') onChange(Math.max(0, value - 0.04));
          setTouched(true);
        }}
        onPointerDown={(e) => {
          rectRef.current = svgRef.current?.getBoundingClientRect() ?? null;
          dragging.current = true;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          setTouched(true);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) fromPointer(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
          hapticTap(6);
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <path d={d} fill="none" stroke="color-mix(in srgb, var(--tone-900) 16%, transparent)" strokeWidth="1.5" strokeDasharray="2 5" strokeLinecap="round" />
        <path d={done} fill="none" stroke="var(--tone-600)" strokeWidth="2" strokeLinecap="round" />
        {SUN_LABELS.map((l) => {
          const q = pointAt(l.t);
          return <circle key={l.label} cx={q.x} cy={q.y} r="2.4" fill="var(--tone-500)" />;
        })}
        {/* hit area */}
        <rect x="0" y="0" width={W} height={H} fill="transparent" />
      </svg>

      {/* Thumb (HTML for crisp icon + glow) */}
      <div
        className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full flex items-center justify-center pointer-events-none ${touched ? '' : 'sun-thumb-pulse'}`}
        style={{
          left: `${(p.x / W) * 100}%`,
          top: `${(p.y / H) * 100}%`,
          background: dark ? 'var(--tone-800)' : 'var(--tone-50)',
          color: dark ? 'var(--tone-200)' : 'var(--tone-600)',
          boxShadow: dark
            ? '0 0 26px 4px color-mix(in srgb, var(--tone-400) 40%, transparent), 0 8px 18px -6px rgba(0,0,0,.6)'
            : '0 0 30px 6px color-mix(in srgb, var(--tone-300) 60%, transparent), 0 8px 18px -6px rgba(58,36,26,.45)',
          transition: 'background 400ms ease, color 400ms ease',
        }}
      >
        {dark ? <Moon weight="light" size={20} /> : <Sun weight="light" size={20} />}
      </div>

      {/* Plain text labels */}
      <div className="relative mt-1 h-5">
        {SUN_LABELS.map((l) => {
          const q = pointAt(l.t);
          const active = Math.abs(l.t - value) < 0.1;
          return (
            <button
              key={l.label}
              type="button"
              onClick={() => {
                setTouched(true);
                hapticTap(5);
                onChange(l.t);
              }}
              className="absolute -translate-x-1/2 nowrap text-[11px] sm:text-xs transition-all duration-300"
              style={{
                left: `${(q.x / W) * 100}%`,
                color: active ? 'var(--tone-900)' : 'color-mix(in srgb, var(--tone-900) 45%, transparent)',
                fontVariationSettings: active ? '"wght" 620, "wdth" 92' : '"wght" 450, "wdth" 100',
              }}
              data-cursor="link"
            >
              {l.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
