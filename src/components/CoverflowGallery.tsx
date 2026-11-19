import { useEffect, useRef, useState } from 'react';
import { motion, m, AnimatePresence } from 'framer-motion';
import { CaretLeft } from '@phosphor-icons/react/dist/csr/CaretLeft';
import { CaretRight } from '@phosphor-icons/react/dist/csr/CaretRight';
import { X } from '@phosphor-icons/react/dist/csr/X';
import { MagnifyingGlassPlus } from '@phosphor-icons/react/dist/csr/MagnifyingGlassPlus';
import { MagnifyingGlassMinus } from '@phosphor-icons/react/dist/csr/MagnifyingGlassMinus';
import { CornersOut } from '@phosphor-icons/react/dist/csr/CornersOut';
import type { ProjectImage } from '../data/projects';
import { OptimizedImage } from './OptimizedImage';
import { hapticTap } from '../lib/perf';

interface CoverflowGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
  projectCode: string;
}

/**
 * 3D Coverflow plate carousel with drag momentum/inertia, depth-of-field blur
 * on side plates, and shared-element expansion into the fullscreen viewer.
 */
export function CoverflowGallery({
  images,
  projectTitle,
  projectCode,
}: CoverflowGalleryProps) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const pinchStartDist = useRef<number | null>(null);
  const pinchStartZoom = useRef(1);

  useEffect(() => {
    setActive(0);
    setExpanded(false);
    setZoom(1);
  }, [projectCode]);

  const goPrev = () => {
    hapticTap(6);
    setZoom(1);
    setActive((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = () => {
    hapticTap(6);
    setZoom(1);
    setActive((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape' && expanded) {
        setExpanded(false);
        setZoom(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded, images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStartDist.current = Math.hypot(dx, dy);
      pinchStartZoom.current = zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDist.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const nextZoom = Math.max(1, Math.min(3, pinchStartZoom.current * (dist / pinchStartDist.current)));
      setZoom(nextZoom);
    }
  };

  const handleTouchEnd = () => {
    pinchStartDist.current = null;
  };

  return (
    <div className="space-y-6">
      {/* 3D Coverflow Stage with drag inertia & depth-of-field blur on side plates */}
      <div
        data-cursor="drag"
        className="relative h-[320px] sm:h-[460px] w-full flex items-center justify-center overflow-hidden select-none"
        style={{ perspective: 1300 }}
      >
        {images.map((img, idx) => {
          const offset = idx - active;
          if (Math.abs(offset) > 3) return null;

          const isCenter = offset === 0;
          const absOff = Math.abs(offset);
          const xShift = offset * 215;
          const rotateY = offset === 0 ? 0 : offset < 0 ? 34 : -34;
          const zShift = isCenter ? 0 : -155 - absOff * 45;
          const scale = isCenter ? 1 : Math.max(0.68, 0.84 - absOff * 0.08);
          const opacity = isCenter ? 1 : Math.max(0.28, 0.74 - absOff * 0.18);
          const dofBlur = isCenter ? 'none' : `blur(${Math.min(5, absOff * 2)}px)`;

          return (
            <motion.div
              key={img.src}
              layoutId={`plate-${projectCode}-${idx}`}
              drag={isCenter ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.28}
              dragTransition={{ power: 0.3, timeConstant: 180 }}
              onDragEnd={(_, info) => {
                const fling = info.offset.x + info.velocity.x * 0.16;
                if (fling < -180 && images.length > 2) {
                  hapticTap(7);
                  setActive((i) => (i + 2) % images.length);
                } else if (fling < -50) {
                  goNext();
                } else if (fling > 180 && images.length > 2) {
                  hapticTap(7);
                  setActive((i) => (i - 2 + images.length) % images.length);
                } else if (fling > 50) {
                  goPrev();
                }
              }}
              animate={{
                x: xShift,
                z: zShift,
                rotateY,
                scale,
                opacity,
                zIndex: 30 - absOff,
              }}
              transition={{ type: 'spring', stiffness: 170, damping: 22 }}
              onClick={() => {
                if (isCenter) {
                  hapticTap(8);
                  setExpanded(true);
                } else {
                  hapticTap(6);
                  setActive(idx);
                }
              }}
              data-cursor={isCenter ? 'view' : 'drag'}
              className="cf-plate absolute w-[78vw] max-w-[540px] h-[270px] sm:h-[395px] rounded-[26px] p-2.5 cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                filter: dofBlur,
                background: 'linear-gradient(160deg, #FAF7F2 0%, var(--tone-100) 100%)',
                boxShadow: isCenter
                  ? '0 36px 80px -24px rgba(58, 36, 26, 0.34), 0 12px 24px -12px rgba(28, 19, 14, 0.18), inset 0 1px 0 rgba(255,255,255,0.88)'
                  : '0 20px 44px -22px rgba(58, 36, 26, 0.18)',
              }}
            >
              <div
                className="relative w-full h-full rounded-[20px] overflow-hidden bg-[var(--tone-50)] flex items-center justify-center"
                style={isCenter ? { viewTransitionName: 'plate' } : undefined}
              >
                <OptimizedImage
                  image={img}
                  sizes="(max-width: 640px) 80vw, 540px"
                  className="w-full h-full object-contain"
                  priority={isCenter}
                />
                {isCenter && (
                  <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[var(--tone-900)]/80 text-[var(--tone-50)] flex items-center justify-center backdrop-blur-md">
                    <CornersOut weight="light" className="w-4 h-4" />
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous plate"
              data-cursor="button"
              className="glass absolute left-2 sm:left-4 z-40 w-11 h-11 rounded-full flex items-center justify-center text-[var(--tone-900)] hover:text-[var(--tone-600)] transition cursor-pointer"
            >
              <CaretLeft weight="light" className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next plate"
              data-cursor="button"
              className="glass absolute right-2 sm:right-4 z-40 w-11 h-11 rounded-full flex items-center justify-center text-[var(--tone-900)] hover:text-[var(--tone-600)] transition cursor-pointer"
            >
              <CaretRight weight="light" className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Caption & Dot Scrubber */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        <p className="text-xs font-medium text-[var(--ink-muted)] tabular-nums">
          Plate {String(active + 1).padStart(2, '0')} of {String(images.length).padStart(2, '0')} · Drag or tap center plate to expand
        </p>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => {
                hapticTap(5);
                setActive(i);
              }}
              aria-label={`View plate ${i + 1}`}
              data-cursor="button"
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === active
                  ? 'w-7 bg-[var(--tone-600)]'
                  : 'w-1.5 bg-[var(--tone-900)]/20 hover:bg-[var(--tone-900)]/45'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Full-Screen Shared-Element Expanded Viewer */}
      <AnimatePresence>
        {expanded && images[active] && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setExpanded(false);
              setZoom(1);
            }}
            className="fixed inset-0 z-[120] bg-[var(--tone-900)]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between text-[var(--tone-100)]"
            >
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <span className="font-semibold text-[var(--tone-400)]">{projectCode}</span>
                <span className="font-medium truncate max-w-[180px] sm:max-w-md">{projectTitle}</span>
                <span className="opacity-60 tabular-nums">
                  {String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((z) => (z > 1 ? 1 : 1.85))}
                  aria-label={zoom > 1 ? 'Zoom out' : 'Zoom in'}
                  data-cursor="button"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--tone-600)] flex items-center justify-center transition cursor-pointer"
                >
                  {zoom > 1 ? (
                    <MagnifyingGlassMinus weight="light" className="w-5 h-5" />
                  ) : (
                    <MagnifyingGlassPlus weight="light" className="w-5 h-5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExpanded(false);
                    setZoom(1);
                  }}
                  aria-label="Close full screen viewer"
                  data-cursor="button"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--tone-600)] flex items-center justify-center transition cursor-pointer"
                >
                  <X weight="light" className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative flex-1 flex items-center justify-center overflow-hidden my-4"
            >
              <motion.div
                layoutId={`plate-${projectCode}-${active}`}
                drag={zoom === 1 ? 'x' : true}
                dragConstraints={zoom === 1 ? { left: 0, right: 0 } : { left: -240, right: 240, top: -180, bottom: 180 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (zoom === 1) {
                    if (info.offset.x < -65) goNext();
                    else if (info.offset.x > 65) goPrev();
                  }
                }}
                animate={{ scale: zoom }}
                transition={{ type: 'spring', stiffness: 170, damping: 22 }}
                onDoubleClick={() => setZoom((z) => (z > 1 ? 1 : 1.9))}
                className="max-h-[78vh] max-w-[92vw] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={images[active].src}
                  alt={images[active].alt}
                  width={images[active].width}
                  height={images[active].height}
                  className="max-h-[78vh] max-w-[92vw] object-contain select-none pointer-events-none"
                />
              </motion.div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous plate"
                    data-cursor="button"
                    className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[var(--tone-600)] text-[var(--tone-50)] flex items-center justify-center transition cursor-pointer"
                  >
                    <CaretLeft weight="light" className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next plate"
                    data-cursor="button"
                    className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[var(--tone-600)] text-[var(--tone-50)] flex items-center justify-center transition cursor-pointer"
                  >
                    <CaretRight weight="light" className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto py-1"
            >
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setActive(i);
                  }}
                  data-cursor="button"
                  className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden transition-all cursor-pointer ${
                    i === active
                      ? 'scale-105 opacity-100 ring-2 ring-[var(--tone-500)]'
                      : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
