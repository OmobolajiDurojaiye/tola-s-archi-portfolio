import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPerfFlags, whenIdle, startFpsGuard } from '../lib/perf';

const CustomCursor = lazy(() => import('./CustomCursor'));

type LenisLike = {
  raf: (t: number) => void;
  scrollTo: (target: number, opts?: { immediate?: boolean }) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

const FINAL_LEVEL = 24.6; // metres at the footer

/** Floating elevation readout: text only, bottom-left on desktop. */
function ElevationReadout() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let max = 1;
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      if (ref.current) ref.current.textContent = `+${(p * FINAL_LEVEL).toFixed(2)}m`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    measure();
    update();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex fixed left-6 bottom-6 z-40 items-baseline gap-2 pointer-events-none"
      style={{ color: 'color-mix(in srgb, var(--tone-900) 55%, transparent)', mixBlendMode: 'multiply' }}
    >
      <span className="t-label">Level</span>
      <span
        ref={ref}
        className="tabular-nums text-[13px]"
        style={{ fontVariationSettings: '"wght" 600, "wdth" 86', color: 'var(--tone-600)' }}
      >
        +0.00m
      </span>
    </div>
  );
}

/** Once-per-session intro (<1.2s): the elevation draws itself in, fills, then lifts away. */
function IntroOverlay() {
  const [show, setShow] = useState(() => {
    const f = getPerfFlags();
    if (f.liteMode || f.reducedMotion) return false;
    try {
      return sessionStorage.getItem('od-intro') !== '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem('od-intro', '1');
    } catch {
      // ignore
    }
    const t = window.setTimeout(() => setShow(false), 1150);
    return () => window.clearTimeout(t);
  }, [show]);

  if (!show) return null;

  const stroke = {
    fill: 'var(--tone-200)',
    fillOpacity: 0,
    stroke: 'var(--tone-900)',
    strokeWidth: 1.5,
    strokeDasharray: 900,
    strokeDashoffset: 900,
    animation: 'intro-draw 520ms cubic-bezier(.22,1,.36,1) forwards, intro-fill 260ms ease 520ms forwards',
  } as const;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ background: 'var(--tone-50)', animation: 'intro-out 380ms cubic-bezier(.7,0,.3,1) 780ms forwards' }}
    >
      <svg width="260" height="150" viewBox="0 0 260 150">
        <rect x="20" y="132" width="220" height="6" style={{ ...stroke, animationDelay: '0ms, 520ms' }} />
        <rect x="38" y="40" width="96" height="52" style={{ ...stroke, animationDelay: '60ms, 560ms' }} />
        <rect x="30" y="32" width="112" height="8" style={{ ...stroke, animationDelay: '100ms, 600ms' }} />
        <rect x="134" y="58" width="92" height="74" style={{ ...stroke, animationDelay: '140ms, 620ms' }} />
        <rect x="128" y="52" width="104" height="7" style={{ ...stroke, animationDelay: '180ms, 640ms' }} />
        <rect x="38" y="92" width="58" height="40" style={{ ...stroke, animationDelay: '200ms, 660ms' }} />
        <rect x="104" y="96" width="20" height="36" style={{ ...stroke, fill: 'var(--tone-600)', animationDelay: '240ms, 680ms' }} />
        <rect x="160" y="96" width="50" height="36" style={{ ...stroke, fill: 'var(--tone-300)', animationDelay: '260ms, 700ms' }} />
      </svg>
    </div>
  );
}

/**
 * Lazy enhancements, initialised after first paint and idle:
 * Lenis inertial scroll, custom cursor, FPS guard. Skipped on lite / reduced motion.
 */
export function Enhancements() {
  const [cursorOn, setCursorOn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const f = getPerfFlags();
    startFpsGuard();
    if (f.liteMode || f.reducedMotion) return;

    let lenis: LenisLike | null = null;
    let raf = 0;
    const cancel = whenIdle(() => {
      if (f.finePointer) setCursorOn(true);
      import('lenis').then(({ default: Lenis }) => {
        lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 0.95 }) as unknown as LenisLike;
        window.__lenis = lenis;
        const loop = (t: number) => {
          lenis?.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      });
    });

    return () => {
      cancel();
      cancelAnimationFrame(raf);
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <IntroOverlay />
      <ElevationReadout />
      {cursorOn && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
    </>
  );
}
