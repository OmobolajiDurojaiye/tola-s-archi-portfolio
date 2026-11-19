import { useEffect, useRef, useState } from 'react';

type Mode = 'default' | 'button' | 'link' | 'view' | 'drag' | 'crosshair';

const TAG_TEXT: Record<Mode, string> = {
  default: 'Omotola',
  button: '',
  link: '',
  view: 'View',
  drag: 'Drag',
  crosshair: '',
};

/**
 * Desktop-only drafting cursor (lazy-loaded after idle; never on touch, lite, or reduced motion).
 * One rAF loop, transform-only writes. Rects are measured only when the hovered target changes.
 */
export default function CustomCursor() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLSpanElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('default');
  const modeRef = useRef<Mode>('default');

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('has-cursor');

    const pos = { x: -100, y: -100 };
    const arrow = { x: -100, y: -100 };
    const tag = { x: -100, y: -100, vx: 0, vy: 0 };
    let visible = false;
    let pressed = 0;
    let target: HTMLElement | null = null;
    let rect: DOMRect | null = null;
    let snapX: number[] = [];
    let snapY: number[] = [];
    let dimW = 12;
    let dimH = 7;
    let raf = 0;

    const setModeSafe = (m: Mode) => {
      if (modeRef.current !== m) {
        modeRef.current = m;
        setMode(m);
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]') ?? null;
      if (el === target) return;
      target = el;
      if (!el) {
        rect = null;
        setModeSafe('default');
        return;
      }
      const m = (el.dataset.cursor as Mode) || 'default';
      rect = el.getBoundingClientRect();
      if (m === 'crosshair') {
        snapX = (el.dataset.snapX || '').split(',').filter(Boolean).map(Number);
        snapY = (el.dataset.snapY || '').split(',').filter(Boolean).map(Number);
        dimW = Number(el.dataset.dimW || 12);
        dimH = Number(el.dataset.dimH || 7);
      }
      if (m === 'link') {
        el.style.setProperty('--ux', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      }
      setModeSafe(m);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        arrow.x = tag.x = pos.x;
        arrow.y = tag.y = pos.y;
        if (layerRef.current) layerRef.current.style.opacity = '1';
      }
    };

    const onLeaveWin = () => {
      visible = false;
      if (layerRef.current) layerRef.current.style.opacity = '0';
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pressed = 1;
      const ring = document.createElement('div');
      ring.style.cssText = `position:fixed;left:0;top:0;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;box-shadow:0 0 0 1.5px var(--tone-600) inset;pointer-events:none;z-index:9999;transform:translate3d(${e.clientX}px,${e.clientY}px,0) scale(.3);`;
      document.body.appendChild(ring);
      ring
        .animate(
          [
            { transform: `translate3d(${e.clientX}px,${e.clientY}px,0) scale(.3)`, opacity: 0.9 },
            { transform: `translate3d(${e.clientX}px,${e.clientY}px,0) scale(1.6)`, opacity: 0 },
          ],
          { duration: 520, easing: 'cubic-bezier(.22,1,.36,1)' }
        )
        .finished.then(() => ring.remove())
        .catch(() => ring.remove());
    };
    const onUp = () => {
      pressed = 0;
    };

    // Re-measure target rect on scroll (cheap, only when hovering a target)
    const onScroll = () => {
      if (target) rect = target.getBoundingClientRect();
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const m = modeRef.current;
      let tx = pos.x;
      let ty = pos.y;

      // Crosshair snapping + dimension readout
      if (m === 'crosshair' && rect) {
        let nx = (pos.x - rect.left) / rect.width;
        let ny = (pos.y - rect.top) / rect.height;
        for (const s of snapX) {
          if (Math.abs(nx - s) < 0.014) {
            nx = nx + (s - nx) * 0.7;
            tx = rect.left + nx * rect.width;
            break;
          }
        }
        for (const s of snapY) {
          if (Math.abs(ny - s) < 0.02) {
            ny = ny + (s - ny) * 0.7;
            ty = rect.top + ny * rect.height;
            break;
          }
        }
        if (readRef.current) {
          const xm = Math.max(0, nx * dimW).toFixed(2);
          const ym = Math.max(0, (1 - ny) * dimH).toFixed(2);
          readRef.current.textContent = `x ${xm}m  y ${ym}m`;
        }
      }

      arrow.x += (tx - arrow.x) * 0.55;
      arrow.y += (ty - arrow.y) * 0.55;

      // Tag follows with spring lag (stiffness ~170, damping ~22 equivalent)
      const ax = (tx - tag.x) * 0.09;
      const ay = (ty - tag.y) * 0.09;
      tag.vx = (tag.vx + ax) * 0.72;
      tag.vy = (tag.vy + ay) * 0.72;
      tag.x += tag.vx;
      tag.y += tag.vy;

      const s = pressed ? 0.82 : 1;
      if (arrowRef.current) arrowRef.current.style.transform = `translate3d(${arrow.x}px, ${arrow.y}px, 0) scale(${s})`;
      if (crossRef.current) crossRef.current.style.transform = `translate3d(${arrow.x}px, ${arrow.y}px, 0)`;
      if (lensRef.current) lensRef.current.style.transform = `translate3d(${tag.x}px, ${tag.y}px, 0) scale(${s})`;
      if (tagRef.current) tagRef.current.style.transform = `translate3d(${tag.x + 14}px, ${tag.y + 18}px, 0)`;
    };
    raf = requestAnimationFrame(loop);

    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveWin);

    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove('has-cursor');
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('mouseleave', onLeaveWin);
    };
  }, []);

  const showArrow = mode === 'default' || mode === 'link';
  const tagText = TAG_TEXT[mode];

  return (
    <div ref={layerRef} aria-hidden="true" className="fixed inset-0 z-[9998] pointer-events-none" style={{ opacity: 0, transition: 'opacity 200ms ease' }}>
      {/* Figma-style arrow */}
      <div ref={arrowRef} className="absolute left-0 top-0 will-change-transform" style={{ transformOrigin: '0 0' }}>
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          style={{
            opacity: showArrow ? 1 : 0,
            transform: `scale(${mode === 'link' ? 0.62 : 1})`,
            transformOrigin: '2px 2px',
            transition: 'opacity 180ms ease, transform 320ms var(--spring)',
            filter: 'drop-shadow(0 2px 3px rgba(28,19,14,0.35))',
          }}
        >
          <path d="M2 2 L17 10.2 L10.4 11.8 L7.2 18.6 Z" fill="var(--tone-900)" stroke="var(--tone-50)" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Drafting crosshair + dimension readout */}
      <div ref={crossRef} className="absolute left-0 top-0 will-change-transform">
        <div
          style={{
            opacity: mode === 'crosshair' ? 1 : 0,
            transform: `scale(${mode === 'crosshair' ? 1 : 0.6})`,
            transition: 'opacity 200ms ease, transform 360ms var(--spring)',
          }}
        >
          <span className="absolute block" style={{ left: -26, top: -0.5, width: 52, height: 1, background: 'var(--tone-900)' }} />
          <span className="absolute block" style={{ top: -26, left: -0.5, width: 1, height: 52, background: 'var(--tone-900)' }} />
          <span className="absolute block rounded-full" style={{ left: -5, top: -5, width: 10, height: 10, boxShadow: '0 0 0 1.2px var(--tone-600) inset' }} />
          <span
            ref={readRef}
            className="absolute nowrap tabular-nums rounded-[8px] px-2 py-1 text-[11px]"
            style={{
              left: 14,
              top: 12,
              background: 'var(--tone-900)',
              color: 'var(--tone-50)',
              fontVariationSettings: '"wght" 520, "wdth" 88',
            }}
          >
            x 0.00m  y 0.00m
          </span>
        </div>
      </div>

      {/* Soft lens (View) */}
      <div ref={lensRef} className="absolute left-0 top-0 will-change-transform">
        <div
          className="rounded-full"
          style={{
            width: 76,
            height: 76,
            marginLeft: -38,
            marginTop: -38,
            background: 'color-mix(in srgb, var(--tone-50) 22%, transparent)',
            backdropFilter: 'blur(2px) saturate(130%)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.5), 0 10px 30px -8px rgba(28,19,14,0.4)',
            opacity: mode === 'view' ? 1 : 0,
            transform: `scale(${mode === 'view' ? 1 : 0.3})`,
            transition: 'opacity 220ms ease, transform 420ms var(--spring)',
          }}
        />
      </div>

      {/* Multiplayer-style name tag */}
      <div ref={tagRef} className="absolute left-0 top-0 will-change-transform">
        <div
          className="nowrap rounded-[10px] rounded-tl-[3px] px-2.5 py-1 text-[12px] flex items-center gap-1.5"
          style={{
            background: 'var(--tone-600)',
            color: 'var(--tone-50)',
            fontVariationSettings: '"wght" 560, "wdth" 92',
            opacity: tagText ? 1 : 0,
            transform: `scale(${tagText ? 1 : 0.6})`,
            transformOrigin: '0 0',
            transition: 'opacity 180ms ease, transform 320ms var(--spring)',
            boxShadow: '0 6px 16px -6px rgba(28,19,14,0.5)',
          }}
        >
          {mode === 'drag' && (
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M4 1.5 L1 5 L4 8.5 M10 1.5 L13 5 L10 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span>{tagText || 'Omotola'}</span>
        </div>
      </div>
    </div>
  );
}
