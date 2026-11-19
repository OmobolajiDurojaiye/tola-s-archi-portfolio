import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { hapticTap, usePerfFlags } from '../lib/perf';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  cursorMode?: 'pointer' | 'view';
}

/**
 * Interaction #4: 3D-tilting glossy card with cursor-tracking specular sheen
 * and short press-depth animation on mobile tap. Zero borders.
 */
export function TiltCard3D({
  children,
  className = '',
  onClick,
  cursorMode = 'view',
}: TiltCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isTouch, reducedMotion } = usePerfFlags();
  const [pressed, setPressed] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sRx = useSpring(rx, { stiffness: 260, damping: 24 });
  const sRy = useSpring(ry, { stiffness: 260, damping: 24 });
  const rotateX = useTransform(sRy, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(sRx, [-0.5, 0.5], [-7, 7]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set(px - 0.5);
    ry.set(py - 0.5);
    ref.current.style.setProperty('--mx', `${px * 100}%`);
    ref.current.style.setProperty('--my', `${py * 100}%`);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onPointerDown={() => {
          setPressed(true);
          hapticTap(6);
        }}
        onPointerUp={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
        onClick={onClick}
        style={{
          rotateX: isTouch || reducedMotion ? 0 : rotateX,
          rotateY: isTouch || reducedMotion ? 0 : rotateY,
        }}
        animate={{
          scale: pressed ? 0.975 : 1,
          y: pressed ? 3 : 0,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        data-cursor={cursorMode}
        className={`card-3d rounded-[28px] overflow-hidden ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
