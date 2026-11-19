import { useRef, type ReactNode, type CSSProperties } from 'react';
import { getPerfFlags, hapticTap } from '../lib/perf';
import { CardBackground, type BgVariant } from './CardBackground';

export type CardTone = '50' | '100' | '200' | '900';

interface Card3DProps {
  children: ReactNode;
  tone?: CardTone;
  variant?: BgVariant | null;
  className?: string;
  contentClassName?: string;
  cursor?: 'view' | 'pointer' | 'none';
  tilt?: number;
  style?: CSSProperties;
}

/**
 * Material card: tonal surface, thick layered shadows, top-edge specular,
 * inner glow, 3D tilt toward cursor, cursor-following spotlight,
 * animated background variant behind content, press-depth on touch.
 * All updates are transform / CSS-variable only via one rAF.
 */
export function Card3D({
  children,
  tone = '50',
  variant = null,
  className = '',
  contentClassName = '',
  cursor = 'none',
  tilt = 6,
  style,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const raf = useRef(0);
  const target = useRef({ x: 0.5, y: 0.5, on: false });

  const apply = () => {
    raf.current = 0;
    const el = ref.current;
    if (!el) return;
    const { x, y, on } = target.current;
    const rx = on ? (0.5 - y) * tilt : 0;
    const ry = on ? (x - 0.5) * tilt : 0;
    el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(0, ${on ? -4 : 0}px, 0)`;
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
  };

  const onEnter = () => {
    const f = getPerfFlags();
    if (!f.finePointer || f.reducedMotion) return;
    rect.current = ref.current?.getBoundingClientRect() ?? null;
    target.current.on = true;
  };
  const onMove = (e: React.PointerEvent) => {
    const r = rect.current;
    if (!r) return;
    target.current.x = (e.clientX - r.left) / r.width;
    target.current.y = (e.clientY - r.top) / r.height;
    if (!raf.current) raf.current = requestAnimationFrame(apply);
  };
  const onLeave = () => {
    rect.current = null;
    target.current = { x: 0.5, y: 0.5, on: false };
    if (!raf.current) raf.current = requestAnimationFrame(apply);
  };
  const onDown = () => {
    if (getPerfFlags().finePointer) return;
    hapticTap(6);
    const el = ref.current;
    if (el) el.style.transform = 'perspective(1000px) translate3d(0, 3px, -18px)';
  };
  const onUp = () => {
    if (getPerfFlags().finePointer) return;
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={(e) => {
        onLeave();
        onUp();
        void e;
      }}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      data-cursor={cursor === 'none' ? undefined : cursor}
      className={`card card-${tone} h-full ${className}`}
      style={{
        transition: 'transform 520ms var(--spring)',
        ...style,
      }}
    >
      {variant && <CardBackground variant={variant} />}
      <div className="card-spot" aria-hidden="true" />
      <div className={`card-content h-full ${contentClassName}`}>{children}</div>
    </div>
  );
}
