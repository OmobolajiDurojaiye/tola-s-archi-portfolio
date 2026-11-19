import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import type { ProjectImage } from '../data/projects';

interface StudioLightboxProps {
  images: ProjectImage[];
  index: number | null;
  projectTitle: string;
  projectCode: string;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export function StudioLightbox({
  images,
  index,
  projectTitle,
  projectCode,
  onClose,
  onNavigate,
}: StudioLightboxProps) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {index !== null && images[index] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-[#0E0D0C]/92 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6"
        >
          {/* Top Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between gap-3 text-[#F7F3EC]"
          >
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-full bg-[#F7F3EC]/12 border border-[#D8C3A8]/30 font-mono-arch text-[10px] tracking-widest text-[#D8C3A8]">
                {projectCode}
              </span>
              <span className="text-xs sm:text-sm font-medium truncate max-w-[180px] sm:max-w-md">
                {projectTitle}
              </span>
              <span className="font-mono-arch text-[11px] text-[#EADFD1]/65">
                {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
                aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
              >
                {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
                aria-label="Close viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Stage */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 flex items-center justify-center overflow-auto my-3"
          >
            <motion.img
              key={images[index].src}
              src={images[index].src}
              alt={images[index].alt}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: zoomed ? 1.55 : 1 }}
              transition={{ duration: 0.25 }}
              onClick={() => setZoomed((z) => !z)}
              className={`max-h-[76vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10 transition-transform ${
                zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate((index - 1 + images.length) % images.length)}
                  aria-label="Previous plate"
                  className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0E0D0C]/75 hover:bg-[#F7F3EC] text-[#F7F3EC] hover:text-[#0E0D0C] border border-white/20 flex items-center justify-center transition cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate((index + 1) % images.length)}
                  aria-label="Next plate"
                  className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0E0D0C]/75 hover:bg-[#F7F3EC] text-[#F7F3EC] hover:text-[#0E0D0C] border border-white/20 flex items-center justify-center transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Filmstrip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-1"
          >
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => onNavigate(i)}
                className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                  i === index ? 'border-[#D8C3A8] scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-85'
                }`}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
