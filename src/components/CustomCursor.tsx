import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePerfFlags } from '../lib/perf';

/**
 * Interaction #6: Desktop-only custom cursor that morphs over interactive elements.
 * Automatically disabled on touch devices, Lite Mode, and reduced-motion.
 */
export function CustomCursor() {
  const { isTouch, liteMode, reducedMotion } = usePerfFlags();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<'default' | 'pointer' | 'view'>('default');

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 420, damping: 32, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (isTouch || liteMode || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [data-cursor]');
      if (!interactive) {
        setMode('default');
      } else if (interactive.getAttribute('data-cursor') === 'view') {
        setMode('view');
      } else {
        setMode('pointer');
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [isTouch, liteMode, reducedMotion, mx, my]);

  if (isTouch || liteMode || reducedMotion || !visible) return null;

  const size = mode === 'view' ? 56 : mode === 'pointer' ? 36 : 14;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        backgroundColor:
          mode === 'view'
            ? 'rgba(11, 79, 219, 0.88)'
            : mode === 'pointer'
              ? 'rgba(11, 79, 219, 0.22)'
              : 'rgba(11, 79, 219, 0.85)',
      }}
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
      className="fixed top-0 left-0 z-[200] rounded-full pointer-events-none flex items-center justify-center backdrop-blur-[2px]"
    >
      {mode === 'view' && (
        <span className="text-[10px] font-medium tracking-wide text-[#F2EFE9]">
          Open
        </span>
      )}
    </motion.div>
  );
}
