import { useRef, useState } from 'react';
import { usePerfFlags } from '../lib/perf';

interface InteractiveHeadlineProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'div';
}

/**
 * Interaction #7: Letters react to cursor proximity with subtle vertical displacement
 * and weight/opacity shift. Degrades cleanly on touch and reduced-motion.
 */
export function InteractiveHeadline({
  text,
  className = '',
  as: Tag = 'h1',
}: InteractiveHeadlineProps) {
  const { isTouch, reducedMotion } = usePerfFlags();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (isTouch || reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const chars = Array.from(text);

  return (
    <Tag
      ref={containerRef as never}
      onMouseLeave={() => setHoverIdx(null)}
      className={className}
      aria-label={text}
    >
      {chars.map((char, idx) => {
        if (char === ' ') {
          return (
            <span key={idx} aria-hidden="true">
              {' '}
            </span>
          );
        }
        const dist = hoverIdx === null ? 99 : Math.abs(hoverIdx - idx);
        const lift = dist === 0 ? -6 : dist === 1 ? -3 : dist === 2 ? -1 : 0;
        const weight = dist === 0 ? 700 : dist === 1 ? 600 : undefined;

        return (
          <span
            key={idx}
            aria-hidden="true"
            onMouseEnter={() => setHoverIdx(idx)}
            style={{
              display: 'inline-block',
              transform: `translate3d(0, ${lift}px, 0)`,
              fontWeight: weight,
              color: dist === 0 ? 'var(--tone-600)' : undefined,
              transition:
                'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.25s ease, font-weight 0.2s ease',
            }}
          >
            {char}
          </span>
        );
      })}
    </Tag>
  );
}
