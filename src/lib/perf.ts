import { useEffect, useState } from 'react';

interface NetworkInfo {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  saveData?: boolean;
}

export interface PerfFlags {
  liteMode: boolean;
  reducedMotion: boolean;
  isTouch: boolean;
  finePointer: boolean;
}

let cached: PerfFlags | null = null;

/**
 * Lite mode triggers ONLY on:
 *  - navigator.connection.saveData
 *  - effectiveType 2g / slow-2g
 *  - a measured poor document load (> 4.5s from fetch to response end)
 *  - manual QA override ?lite=1
 * Never on a normal desktop or 3g/4g connection.
 */
function compute(): PerfFlags {
  if (typeof window === 'undefined') {
    return { liteMode: false, reducedMotion: false, isTouch: false, finePointer: true };
  }
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isTouch = !finePointer;

  let lite = false;
  if (conn?.saveData) lite = true;
  if (conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') lite = true;

  try {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (nav && nav.responseEnd > 0 && nav.responseEnd - nav.fetchStart > 4500) lite = true;
  } catch {
    // ignore
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('lite') === '1') lite = true;
  if (params.get('lite') === '0') lite = false;

  return { liteMode: lite, reducedMotion, isTouch, finePointer };
}

export function getPerfFlags(): PerfFlags {
  if (!cached) cached = compute();
  return cached;
}

/** Apply root classes once at boot so CSS can react (lite, reduced motion, fine pointer). */
export function applyRootFlags() {
  const f = getPerfFlags();
  const root = document.documentElement;
  root.classList.toggle('lite', f.liteMode);
  root.classList.toggle('reduce-motion', f.reducedMotion);
  root.classList.toggle('fine-pointer', f.finePointer);
}

export function usePerfFlags(): PerfFlags {
  const [flags, setFlags] = useState<PerfFlags>(getPerfFlags);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      cached = compute();
      setFlags(cached);
      applyRootFlags();
    };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return flags;
}

export function hapticTap(durationMs = 8) {
  if (typeof navigator === 'undefined') return;
  if (getPerfFlags().reducedMotion) return;
  try {
    navigator.vibrate?.(durationMs);
  } catch {
    // unsupported
  }
}

/** Run work after first paint, when the main thread is idle. */
export function whenIdle(cb: () => void, timeout = 1200): () => void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (typeof w.requestIdleCallback === 'function') {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = globalThis.setTimeout(cb, 300);
  return () => globalThis.clearTimeout(t);
}

/**
 * Lightweight FPS sampler. After idle, samples ~2s of frames.
 * Below 45fps it adds html.lowfps which pauses card backgrounds,
 * particles, and blobs (in that order of cost).
 */
export function startFpsGuard() {
  if (getPerfFlags().liteMode) return;
  whenIdle(() => {
    let frames = 0;
    const start = performance.now();
    const tick = (now: number) => {
      frames++;
      if (now - start < 2000) {
        requestAnimationFrame(tick);
      } else {
        const fps = (frames * 1000) / (now - start);
        if (fps < 45) document.documentElement.classList.add('lowfps');
      }
    };
    requestAnimationFrame(tick);
  }, 2500);
}

/** Shared IntersectionObserver registry: one observer per option set. */
const observers = new Map<string, IntersectionObserver>();
const callbacks = new WeakMap<Element, (inView: boolean) => void>();

export function observeInView(
  el: Element,
  cb: (inView: boolean) => void,
  rootMargin = '0px 0px -8% 0px',
  threshold = 0.12
): () => void {
  const key = `${rootMargin}|${threshold}`;
  let io = observers.get(key);
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) callbacks.get(e.target)?.(e.isIntersecting);
      },
      { rootMargin, threshold }
    );
    observers.set(key, io);
  }
  callbacks.set(el, cb);
  io.observe(el);
  return () => {
    io?.unobserve(el);
    callbacks.delete(el);
  };
}
