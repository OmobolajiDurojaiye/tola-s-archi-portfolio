import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { getPerfFlags, whenIdle, observeInView } from '../lib/perf';
import { skyColor, isDark } from '../lib/sun';
import { SunArc } from './SunArc';

const LazyHeroScene3D = lazy(() => import('./HeroScene3D'));

const LAYERS = [
  { src: '/art/layer-rear.webp', z: -60 },
  { src: '/art/layer-stone.webp', z: 0 },
  { src: '/art/layer-roof.webp', z: 20 },
  { src: '/art/layer-upper.webp', z: 70 },
  { src: '/art/layer-tree.webp', z: 100 },
];

// Edge snap lines (fractions of the elevation box) for the drafting crosshair
const SNAP_X = '0.15,0.343,0.376,0.405,0.424,0.482,0.54,0.574,0.733,0.79';
const SNAP_Y = '0.215,0.247,0.341,0.482,0.544,0.58,0.79,0.84';

function GhostCursor({ label, className }: { label: string; className: string }) {
  return (
    <div className={`ghost ${className}`} aria-hidden="true">
      <svg width="16" height="18" viewBox="0 0 20 22" style={{ opacity: 0.55 }}>
        <path d="M2 2 L17 10.2 L10.4 11.8 L7.2 18.6 Z" fill="var(--tone-500)" stroke="var(--tone-50)" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span
        className="nowrap ml-3 inline-block rounded-[9px] rounded-tl-[3px] px-2 py-0.5 text-[11px]"
        style={{ background: 'var(--tone-400)', color: 'var(--tone-50)', opacity: 0.55, fontVariationSettings: '"wght" 540, "wdth" 92' }}
      >
        {label}
      </span>
    </div>
  );
}

export function HeroElevationStage() {
  const flags = getPerfFlags();
  const { liteMode, reducedMotion, isTouch, finePointer } = flags;
  const [sunTime, setSunTime] = useState(0.4);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const ghostsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  // Code-split 3D loads strictly after first paint + idle
  useEffect(() => {
    if (liteMode) return;
    return whenIdle(() => setShouldLoad3D(true), 900);
  }, [liteMode]);

  // Scroll progress for the 3D camera (read inside the scene's frame loop, no re-render)
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.max(0, Math.min(1, window.scrollY / Math.max(420, window.innerHeight * 0.85)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pause ghosts offscreen
  useEffect(() => {
    const el = ghostsRef.current;
    if (!el) return;
    return observeInView(el, (v) => el.setAttribute('data-live', v ? '1' : '0'), '0px', 0);
  }, []);

  // CSS 3D parallax for poster / lite planes (transform-only)
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !stageRef.current || (sceneReady && !liteMode)) return;
    const r = stageRef.current.getBoundingClientRect();
    stageRef.current.style.setProperty('--tx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    stageRef.current.style.setProperty('--ty', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };
  const onLeave = () => {
    stageRef.current?.style.setProperty('--tx', '0');
    stageRef.current?.style.setProperty('--ty', '0');
  };

  const dark = isDark(sunTime);
  const sky = skyColor(sunTime);
  const showPoster = liteMode || !sceneReady;

  return (
    <div className="relative w-full select-none">
      <div
        ref={stageRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="hero-stage relative w-full"
        style={{ ['--grain-o' as string]: dark ? 0.6 : 0.36 }}
        data-cursor="crosshair"
        data-box="[data-elev]"
        data-snap-x={SNAP_X}
        data-snap-y={SNAP_Y}
        data-dim-w="19.6"
        data-dim-h="11.4"
        data-origin-x="0.15"
        data-origin-y="0.84"
      >
        {/* Sky tone that responds to the sun (single warm hue family) */}
        <div
          aria-hidden="true"
          className="absolute -inset-x-[10%] -inset-y-[8%] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 58% 62% at 50% 52%, ${sky} 0%, ${sky} 38%, transparent 72%)`,
            transition: 'background 500ms ease',
          }}
        />

        {/* Instant first paint + lite mode: CSS 3D layered planes with real depth */}
        <div
          className={`absolute inset-0 lite-stage transition-opacity duration-700 ${showPoster ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-hidden={!showPoster}
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 bottom-[4%] -translate-x-1/2 w-[80%] h-[18%] rounded-[50%] blur-2xl"
            style={{ background: dark ? 'rgba(0,0,0,0.5)' : 'color-mix(in srgb, var(--tone-700) 28%, transparent)' }}
          />
          <div className="elev-box" data-elev>
           <div className="elev-sway">
            {LAYERS.map((l, i) => (
              <div key={l.src} className="lite-plane" style={{ ['--z' as string]: l.z, zIndex: i < 3 ? i + 1 : i + 2 }}>
                <img
                  src={l.src}
                  alt={i === 0 ? 'Contemporary residential front elevation' : ''}
                  width={960}
                  height={537}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  decoding="async"
                  className="w-full h-full object-contain"
                  style={{ filter: dark ? 'brightness(0.62) saturate(0.9)' : sunTime > 0.55 ? 'sepia(0.15) saturate(1.08)' : undefined, transition: 'filter 500ms ease' }}
                />
              </div>
            ))}
            {/* Ref B interlock: headline between rear planes and foreground planes */}
            <div className="lite-plane flex items-center justify-center pointer-events-none" style={{ ['--z' as string]: 40, zIndex: 4 }}>
              <span
                className="elev-word nowrap leading-none"
                style={{
                  letterSpacing: '-0.045em',
                  fontVariationSettings: '"wght" 760, "wdth" 82',
                  color: dark ? 'var(--tone-200)' : 'var(--tone-600)',
                  transform: 'translateY(-14%)',
                  transition: 'color 500ms ease',
                }}
              >
                Architecture
              </span>
            </div>
           </div>
          </div>
          <div aria-hidden="true" className="scene-grain absolute inset-0" />
        </div>

        {/* Deferred code-split live 3D scene */}
        {shouldLoad3D && !liteMode && (
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-700 ${sceneReady ? 'opacity-100' : 'opacity-0'}`}>
              <LazyHeroScene3D
                sunTime={sunTime}
                scrollRef={scrollRef}
                isTouch={isTouch}
                reducedMotion={reducedMotion}
                onReady={() => setSceneReady(true)}
              />
            </div>
          </Suspense>
        )}

        {/* Ambient "other visitor" cursors (desktop only, not lite) */}
        {finePointer && !liteMode && !reducedMotion && (
          <div ref={ghostsRef} className="ghosts absolute inset-0 z-20 pointer-events-none" data-live="1">
            <GhostCursor label="Client" className="ghost-a" />
            <GhostCursor label="Site Architect" className="ghost-b" />
          </div>
        )}
      </div>

      {/* Time-of-day control */}
      <div className="relative z-30 -mt-4 sm:-mt-8 px-4">
        <SunArc value={sunTime} onChange={setSunTime} />
      </div>
    </div>
  );
}
