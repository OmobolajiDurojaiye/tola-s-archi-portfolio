import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RotateCcw, Compass } from 'lucide-react';

interface PieceSpec {
  id: string;
  label: string;
  clip: string;
  initial: { x: number; y: number; opacity: number; scale: number };
  delay: number;
}

// 6 non-overlapping clipped architectural regions of /art/hero-elevation.jpg
// Together they cover 100% of the canvas seamlessly once locked in place.
const ARCHITECTURAL_PIECES: PieceSpec[] = [
  {
    id: 'plinth',
    label: '01 / Concrete Plinth',
    clip: 'inset(79% 0% 0% 0%)',
    initial: { x: 0, y: 42, opacity: 0, scale: 0.98 },
    delay: 0.12,
  },
  {
    id: 'stone-base',
    label: '02 / Travertine & Foliage',
    clip: 'inset(55% 60% 21% 0%)',
    initial: { x: -56, y: 12, opacity: 0, scale: 0.97 },
    delay: 0.34,
  },
  {
    id: 'timber-core',
    label: '03 / Walnut Entry Core',
    clip: 'inset(55% 42% 21% 40%)',
    initial: { x: 0, y: 38, opacity: 0, scale: 0.96 },
    delay: 0.52,
  },
  {
    id: 'living-wing',
    label: '04 / Glazed Pavilion & Canopy',
    clip: 'inset(46% 0% 21% 58%)',
    initial: { x: 58, y: 14, opacity: 0, scale: 0.97 },
    delay: 0.72,
  },
  {
    id: 'upper-left',
    label: '05 / Cantilevered Volume',
    clip: 'inset(0% 42% 45% 0%)',
    initial: { x: -24, y: -58, opacity: 0, scale: 0.97 },
    delay: 0.95,
  },
  {
    id: 'upper-right',
    label: '06 / Timber Soffit & Roof',
    clip: 'inset(0% 0% 54% 58%)',
    initial: { x: 32, y: -52, opacity: 0, scale: 0.97 },
    delay: 1.15,
  },
];

export function HeroElevationAssembly() {
  const [cycle, setCycle] = useState(0);
  const [assembled, setAssembled] = useState(false);
  const [activeStage, setActiveStage] = useState('Setting Plinth Datum...');
  const stageRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 22 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3.2, 3.2]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.4, -2.4]);

  useEffect(() => {
    setAssembled(false);
    setActiveStage('01 / Setting Plinth Datum');
    const timers: number[] = [];

    ARCHITECTURAL_PIECES.forEach((piece) => {
      timers.push(
        window.setTimeout(() => {
          setActiveStage(piece.label);
        }, piece.delay * 1000)
      );
    });

    timers.push(
      window.setTimeout(() => {
        setAssembled(true);
        setActiveStage('Elevation Complete · Scale 1:100');
      }, 2050)
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cycle]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-5xl mx-auto select-none"
      style={{ perspective: 1200 }}
    >
      {/* Subtle architectural registration frame */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#F7F3EC] border border-[#0E0D0C]/8 shadow-[0_30px_90px_-35px_rgba(14,13,12,0.22)]"
      >
        {/* Top architectural drafting status bar */}
        <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 z-30 flex items-center justify-between gap-2 pointer-events-none">
          <div className="gloss-pill rounded-full px-3 py-1 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                assembled ? 'bg-[#0E0D0C]' : 'bg-[#C6A88C] animate-pulse'
              }`}
            />
            <span className="font-mono-arch text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#272420]">
              {activeStage}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setCycle((c) => c + 1)}
            className="pointer-events-auto gloss-pill rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono-arch uppercase tracking-[0.12em] text-[#0E0D0C] hover:bg-white transition cursor-pointer"
            title="Replay architectural assembly"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Replay Build</span>
            <span className="sm:hidden">Replay</span>
          </button>
        </div>

        {/* Architectural blueprint construction lines that draw in during assembly */}
        <div className="relative aspect-[16/9] w-full bg-[#F7F3EC] overflow-hidden">
          <svg
            aria-hidden="true"
            viewBox="0 0 1600 900"
            className={`absolute inset-0 w-full h-full z-20 pointer-events-none transition-opacity duration-1000 ${
              assembled ? 'opacity-20' : 'opacity-65'
            }`}
          >
            {/* Horizontal datum lines */}
            <motion.line
              key={`datum-plinth-${cycle}`}
              x1="120"
              y1="712"
              x2="1480"
              y2="712"
              stroke="#0E0D0C"
              strokeWidth="1"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
            <motion.line
              key={`datum-mid-${cycle}`}
              x1="160"
              y1="495"
              x2="1440"
              y2="495"
              stroke="#C6A88C"
              strokeWidth="1"
              strokeDasharray="4 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.65 }}
              transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            />
            <motion.line
              key={`datum-roof-${cycle}`}
              x1="210"
              y1="196"
              x2="1360"
              y2="196"
              stroke="#0E0D0C"
              strokeWidth="1"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.45 }}
              transition={{ duration: 0.85, delay: 0.75, ease: 'easeOut' }}
            />
            {/* Vertical alignment axes */}
            <motion.line
              key={`axis-l-${cycle}`}
              x1="640"
              y1="120"
              x2="640"
              y2="780"
              stroke="#0E0D0C"
              strokeWidth="0.75"
              strokeDasharray="3 7"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            />
            <motion.line
              key={`axis-r-${cycle}`}
              x1="928"
              y1="120"
              x2="928"
              y2="780"
              stroke="#0E0D0C"
              strokeWidth="0.75"
              strokeDasharray="3 7"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 0.9, delay: 0.4 }}
            />
          </svg>

          {/* 6 architectural slices assembling into the unified villa elevation */}
          {!assembled &&
            ARCHITECTURAL_PIECES.map((piece) => (
              <motion.img
                key={`${piece.id}-${cycle}`}
                src="/art/hero-elevation.jpg"
                alt=""
                aria-hidden="true"
                initial={piece.initial}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                transition={{
                  delay: piece.delay,
                  duration: 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ clipPath: piece.clip }}
                className="absolute inset-0 w-full h-full object-cover will-change-transform"
              />
            ))}

          {/* Pristine unified elevation image after assembly completes */}
          <motion.img
            src="/art/hero-elevation.jpg"
            alt="Minimalist contemporary architectural front elevation"
            initial={false}
            animate={{ opacity: assembled ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Glossy architectural light sweep right as assembly locks */}
          {assembled && (
            <motion.div
              key={`sweep-${cycle}`}
              initial={{ x: '-110%', opacity: 0.7 }}
              animate={{ x: '130%', opacity: 0 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/45 to-transparent -skew-x-12"
            />
          )}
        </div>

        {/* Bottom elevation scale legend */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#EFE7DB]/85 backdrop-blur-md border-t border-[#0E0D0C]/6 flex items-center justify-between text-[10px] sm:text-xs font-mono-arch text-[#6C635A]">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#0E0D0C]" />
            <span>FRONT ELEVATION · NILE UNIV. STUDIO</span>
          </span>
          <span className="hidden sm:inline">PLINTH +0.00m / SOFFIT +6.80m</span>
          <span className="text-[#0E0D0C] font-medium">SHEET 00</span>
        </div>
      </motion.div>
    </div>
  );
}
