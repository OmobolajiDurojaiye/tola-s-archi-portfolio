import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Sun } from '@phosphor-icons/react/dist/csr/Sun';
import { Moon } from '@phosphor-icons/react/dist/csr/Moon';
import { hapticTap, usePerfFlags } from '../lib/perf';

const LazyHeroScene3D = lazy(() => import('./HeroScene3D'));

function getSunLabel(val: number) {
  if (val < 0.25) return 'Dawn';
  if (val < 0.62) return 'Noon';
  if (val < 0.84) return 'Blue Hour';
  return 'Night';
}

export function HeroElevationStage() {
  const { liteMode, reducedMotion, isTouch } = usePerfFlags();
  const [sunTime, setSunTime] = useState(0.38);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cssTilt, setCssTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  // Code-split 3D loads strictly AFTER first paint (never blocks LCP)
  useEffect(() => {
    if (liteMode) return;
    const trigger = () => setShouldLoad3D(true);
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(trigger, { timeout: 900 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = globalThis.setTimeout(trigger, 350);
    return () => globalThis.clearTimeout(t);
  }, [liteMode]);

  // Scroll-driven camera progress (Interaction #3)
  useEffect(() => {
    const onScroll = () => {
      const p = Math.max(0, Math.min(1, window.scrollY / Math.max(380, window.innerHeight * 0.78)));
      setScrollProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // CSS-only parallax fallback for Lite Mode
  const handleLiteMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!liteMode || isTouch || reducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    setCssTilt({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 8,
    });
  };

  const isNight = sunTime > 0.72;

  return (
    <div
      ref={stageRef}
      onPointerMove={handleLiteMove}
      onPointerLeave={() => setCssTilt({ x: 0, y: 0 })}
      className="relative w-full max-w-6xl mx-auto select-none"
    >
      {/* Freestanding 3D Elevation Stage — NO container, NO card, NO borders */}
      <div
        className="relative w-full h-[330px] sm:h-[480px] lg:h-[560px] transition-colors duration-700"
        style={{
          filter: liteMode
            ? `brightness(${isNight ? 0.78 : 1}) contrast(${isNight ? 1.08 : 1})`
            : undefined,
        }}
      >
        {/* Instant First-Paint Static AVIF/WebP Poster (also serves as Lite Mode with CSS parallax) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            sceneReady && !liteMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Soft circular spotlight ground shadow (Ref A & Ref C) */}
          <div
            aria-hidden="true"
            className="absolute bottom-[10%] w-[78%] max-w-[680px] h-[90px] sm:h-[130px] rounded-full blur-2xl transition-colors duration-700"
            style={{
              background: isNight
                ? 'radial-gradient(ellipse at center, rgba(11,79,219,0.28) 0%, transparent 72%)'
                : 'radial-gradient(ellipse at center, rgba(6,44,128,0.16) 0%, transparent 72%)',
            }}
          />

          {/* Depth-interlocked giant headline in Lite / Pre-3D state */}
          <span
            aria-hidden="true"
            style={{
              transform: `translate3d(${cssTilt.x * -0.45}px, ${cssTilt.y * -0.35}px, 0)`,
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="absolute z-10 font-bold tracking-[-0.04em] leading-none text-[clamp(3.6rem,13.5vw,10.5rem)] text-[var(--tone-600)] opacity-90 pointer-events-none"
          >
            Architecture
          </span>

          {/* Floating cutout building poster */}
          <picture
            style={{
              transform: `translate3d(${cssTilt.x}px, ${cssTilt.y}px, 0)`,
              transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="relative z-20 w-[94%] max-w-[820px] h-auto block"
          >
            <source srcSet="/art/hero-cutout.webp" type="image/webp" />
            <img
              src="/art/hero-poster.webp"
              alt="Contemporary architectural front elevation floating on circular ground plane"
              width={1200}
              height={675}
              fetchPriority="high"
              className="w-full h-auto object-contain drop-shadow-[0_28px_36px_rgba(4,27,82,0.22)]"
            />
          </picture>
        </div>

        {/* Deferred Code-Split Live 3D R3F Scene */}
        {shouldLoad3D && !liteMode && (
          <Suspense fallback={null}>
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                sceneReady ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <LazyHeroScene3D
                sunTime={sunTime}
                scrollProgress={scrollProgress}
                isTouch={isTouch}
                reducedMotion={reducedMotion}
                onReady={() => setSceneReady(true)}
              />
            </div>
          </Suspense>
        )}
      </div>

      {/* Signature Interaction #2: Borderless Glossy Time-of-Day Sun Scrubber */}
      <div className="mt-2 sm:mt-3 flex flex-col items-center gap-2 px-4">
        <div className="gel-surface rounded-full px-5 py-2.5 flex items-center gap-3.5 w-full max-w-sm">
          <Sun weight="light" className="w-4 h-4 text-[var(--tone-600)] shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={sunTime}
            aria-label="Time of day sunlight position"
            onChange={(e) => {
              setSunTime(parseFloat(e.target.value));
            }}
            onPointerUp={() => hapticTap(6)}
            className="sun-slider flex-1"
          />
          <Moon weight="light" className="w-4 h-4 text-[var(--tone-800)] shrink-0" />
          <span className="text-xs font-medium text-[var(--ink)] w-16 text-right">
            {getSunLabel(sunTime)}
          </span>
        </div>

        <p className="text-[11px] text-[var(--ink-muted)] tracking-tight">
          {liteMode
            ? 'Lite mode active for slow connection · Drag sun slider to shift tone'
            : 'Drag building to orbit · Scrub sun to shift shadows & glazing glow'}
        </p>
      </div>
    </div>
  );
}
