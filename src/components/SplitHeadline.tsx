import { useEffect, useMemo, useRef } from 'react';
import { getPerfFlags, observeInView } from '../lib/perf';

interface SplitHeadlineProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  /** Word-by-word masked reveal on view */
  reveal?: boolean;
  /** Letters react to cursor with weight + width shift */
  interactive?: boolean;
  /** Hero: animate light -> bold on load */
  heroWeight?: boolean;
  delayMs?: number;
}

/**
 * Words are wrapped in unbreakable inline-blocks (white-space: nowrap) with
 * per-letter children inside, so a word can NEVER break across lines.
 * Spaces are real text nodes between word blocks, so wrapping only happens at spaces.
 */
export function SplitHeadline({
  text,
  as: Tag = 'h2',
  className = '',
  reveal = true,
  interactive = true,
  heroWeight = false,
  delayMs = 0,
}: SplitHeadlineProps) {
  const ref = useRef<HTMLElement>(null);
  const words = useMemo(() => text.split(' '), [text]);

  // Reveal on view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const flags = getPerfFlags();
    if (!reveal || flags.reducedMotion || flags.liteMode) {
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
  }, [reveal, text]);

  // Cursor-reactive variable axes (desktop fine pointer only).
  // Letter centres are measured once on pointerenter (no layout reads per frame).
  useEffect(() => {
    const el = ref.current;
    const flags = getPerfFlags();
    if (!el || !interactive || !flags.finePointer || flags.reducedMotion || flags.liteMode) return;

    let letters: HTMLElement[] = [];
    let centers: { x: number; y: number }[] = [];
    let raf = 0;
    let px = -9999;
    let py = -9999;

    const measure = () => {
      letters = Array.from(el.querySelectorAll<HTMLElement>('.ch'));
      centers = letters.map((l) => {
        const r = l.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };

    const apply = () => {
      raf = 0;
      for (let i = 0; i < letters.length; i++) {
        const c = centers[i];
        const d = Math.hypot(c.x - px, (c.y - py) * 1.4);
        const k = Math.max(0, 1 - d / 140);
        if (k > 0.01) {
          letters[i].style.setProperty('--cw', String(Math.round(560 + k * 240)));
          letters[i].style.setProperty('--cx', String(Math.round(92 - k * 16)));
        } else {
          letters[i].style.removeProperty('--cw');
          letters[i].style.removeProperty('--cx');
        }
      }
    };

    const onEnter = () => measure();
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      px = -9999;
      py = -9999;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [interactive, text]);

  return (
    <Tag
      ref={ref as never}
      aria-label={text}
      className={`${className} ${heroWeight ? 'hero-weight' : ''}`}
      style={{ ['--wd' as string]: `${delayMs}ms` }}
    >
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} aria-hidden="true">
          <span className="w-mask">
            <span className="w-inner" style={{ ['--wi' as string]: wi }}>
              {Array.from(word).map((ch, ci) => (
                <span key={ci} className="ch">
                  {ch}
                </span>
              ))}
            </span>
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
