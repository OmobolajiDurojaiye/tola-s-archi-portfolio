import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { getPerfFlags, observeInView } from '../lib/perf';

type RevealKind = 'up' | 'depth' | 'img' | 'tilt';

interface RevealProps {
  children: ReactNode;
  kind?: RevealKind;
  index?: number;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'li' | 'p' | 'span';
}

const CLASS: Record<RevealKind, string> = {
  up: 'rv',
  depth: 'rv-depth',
  img: 'rv-img',
  tilt: 'rv-tilt',
};

/** IntersectionObserver-driven reveal (WAAPI-free, CSS transitions only). */
export function Reveal({ children, kind = 'up', index = 0, className = '', style, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const f = getPerfFlags();
    if (f.liteMode) {
      el.classList.add('is-in');
      return;
    }
    let done = false;
    const stop = observeInView(el, (inView) => {
      if (inView && !done) {
        done = true;
        el.classList.add('is-in');
        stop();
      }
    });
    return stop;
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`${CLASS[kind]} ${className}`}
      style={{ ...style, ['--ri' as string]: index }}
    >
      {children}
    </Tag>
  );
}

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  className?: string;
}

/** Counts up from 0 when it enters the viewport. */
export function Counter({ value, suffix = '', prefix = '', durationMs = 1400, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const f = getPerfFlags();
    if (f.reducedMotion || f.liteMode) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    el.textContent = `${prefix}0${suffix}`;
    let raf = 0;
    let started = false;
    const stop = observeInView(el, (inView) => {
      if (!inView || started) return;
      started = true;
      stop();
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / durationMs);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = `${prefix}${Math.round(eased * value)}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    return () => {
      stop();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix, prefix, durationMs]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
