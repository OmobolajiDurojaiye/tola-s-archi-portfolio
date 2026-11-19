import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { hapticTap, usePerfFlags } from '../lib/perf';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function Magnetic({
  children,
  className = '',
  strength = 0.26,
  onClick,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isTouch, reducedMotion } = usePerfFlags();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22 });
  const sy = useSpring(y, { stiffness: 280, damping: 22 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(dx);
    y.set(dy);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        hapticTap(8);
        onClick?.();
      }}
      data-cursor="pointer"
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
