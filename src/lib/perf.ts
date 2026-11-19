import { useEffect, useState } from 'react';

interface NetworkInfo {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
}

export interface PerfFlags {
  liteMode: boolean;
  reducedMotion: boolean;
  isTouch: boolean;
  reason: string | null;
}

function computePerfFlags(): PerfFlags {
  if (typeof window === 'undefined') {
    return { liteMode: false, reducedMotion: false, isTouch: false, reason: null };
  }

  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const reducedData = window.matchMedia?.('(prefers-reduced-data: reduce)').matches ?? false;
  const isTouch =
    window.matchMedia?.('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;

  let reason: string | null = null;
  if (conn?.saveData) reason = 'saveData';
  else if (reducedData) reason = 'reduced-data';
  else if (conn?.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) {
    reason = conn.effectiveType;
  }

  // Also allow URL override ?lite=1 for easy QA verification
  const params = new URLSearchParams(window.location.search);
  if (params.get('lite') === '1') reason = 'manual';

  return {
    liteMode: Boolean(reason),
    reducedMotion,
    isTouch,
    reason,
  };
}

export function usePerfFlags(): PerfFlags {
  const [flags, setFlags] = useState<PerfFlags>(() => computePerfFlags());

  useEffect(() => {
    const update = () => setFlags(computePerfFlags());
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const mqMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    conn?.addEventListener?.('change', update);
    mqMotion?.addEventListener?.('change', update);
    return () => {
      conn?.removeEventListener?.('change', update);
      mqMotion?.removeEventListener?.('change', update);
    };
  }, []);

  return flags;
}

export function hapticTap(durationMs = 8) {
  if (typeof navigator === 'undefined') return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  try {
    navigator.vibrate?.(durationMs);
  } catch {
    // ignore unsupported browsers
  }
}
