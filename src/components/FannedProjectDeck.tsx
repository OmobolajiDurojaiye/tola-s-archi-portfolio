import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Layers } from 'lucide-react';
import type { Project } from '../data/projects';

interface FannedProjectDeckProps {
  projects: Project[];
}

const DESKTOP_TRANSFORMS = [
  { rotate: -13, y: 26, x: -16 },
  { rotate: -8, y: 12, x: -10 },
  { rotate: -4, y: 4, x: -4 },
  { rotate: 0, y: -4, x: 0 },
  { rotate: 5, y: 6, x: 4 },
  { rotate: 9, y: 16, x: 10 },
  { rotate: 14, y: 28, x: 16 },
];

export function FannedProjectDeck({ projects }: FannedProjectDeckProps) {
  const deckProjects = projects.slice(0, 7);
  const [activeIndex, setActiveIndex] = useState(3);
  const activeProject = deckProjects[activeIndex] || deckProjects[0];

  if (!activeProject) return null;

  return (
    <section className="relative py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header inspired by Image 3's minimalist label */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="font-mono-arch text-[11px] uppercase tracking-[0.26em] text-[#6C635A] mb-2">
            what i · build
          </p>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-medium tracking-tight text-[#0E0D0C]">
            Skim the Studio Deck
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6C635A] max-w-md mx-auto">
            Hover or tap any archival card to inspect specs instantly, then jump straight into the full sheet.
          </p>
        </div>

        {/* Desktop Fanned Polaroid Deck (Image 3 layout) */}
        <div className="hidden lg:flex items-center justify-center relative h-[355px] my-4">
          {deckProjects.map((project, idx) => {
            const t = DESKTOP_TRANSFORMS[idx] || { rotate: 0, y: 0, x: 0 };
            const isActive = idx === activeIndex;

            return (
              <motion.button
                key={project.slug}
                type="button"
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                initial={false}
                animate={{
                  rotate: isActive ? 0 : t.rotate,
                  y: isActive ? -28 : t.y,
                  scale: isActive ? 1.12 : 0.96,
                  zIndex: isActive ? 40 : 10 + idx,
                }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className="relative -mx-5 w-[215px] rounded-2xl bg-[#FFFDF9] p-2.5 pb-4 text-left cursor-pointer border border-white shadow-[0_22px_50px_-18px_rgba(14,13,12,0.28)] focus:outline-none group"
              >
                <div className="relative aspect-[4/4.2] w-full rounded-xl overflow-hidden bg-[#EADFD1]">
                  <img
                    src={project.cover.src}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.video && (
                    <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#0E0D0C]/85 text-[#F7F3EC] flex items-center justify-center backdrop-blur-md">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#0E0D0C]/75 text-[#F7F3EC] font-mono-arch text-[9px] tracking-wider backdrop-blur-md">
                    {project.code}
                  </span>
                </div>
                <p className="mt-2.5 px-1 text-xs font-medium text-[#272420] truncate">
                  {project.deckCaption}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile & Tablet Horizontal Tactile Fanned Rail (no visible scrollbar) */}
        <div className="lg:hidden flex items-center gap-3.5 overflow-x-auto snap-x snap-mandatory py-5 px-2 -mx-2">
          {deckProjects.map((project, idx) => {
            const isActive = idx === activeIndex;
            const mobileTilt = idx % 2 === 0 ? -2.2 : 2.2;

            return (
              <motion.button
                key={project.slug}
                type="button"
                onClick={() => setActiveIndex(idx)}
                animate={{
                  rotate: isActive ? 0 : mobileTilt,
                  scale: isActive ? 1.03 : 0.96,
                }}
                transition={{ type: 'spring', stiffness: 320, damping: 25 }}
                className={`snap-center shrink-0 w-[205px] sm:w-[225px] rounded-2xl bg-[#FFFDF9] p-2.5 pb-3.5 text-left border transition-shadow ${
                  isActive
                    ? 'border-[#0E0D0C]/25 shadow-[0_20px_42px_-16px_rgba(14,13,12,0.28)]'
                    : 'border-white shadow-[0_12px_28px_-14px_rgba(14,13,12,0.16)]'
                }`}
              >
                <div className="relative aspect-[4/4.1] rounded-xl overflow-hidden bg-[#EADFD1]">
                  <img
                    src={project.cover.src}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {project.video && (
                    <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#0E0D0C]/85 text-[#F7F3EC] flex items-center justify-center">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#0E0D0C]/75 text-[#F7F3EC] font-mono-arch text-[9px]">
                    {project.code}
                  </span>
                </div>
                <p className="mt-2 px-1 text-xs font-medium text-[#272420] truncate">
                  {project.deckCaption}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Instant Quick-Skim Preview HUD below the deck */}
        <div className="mt-4 sm:mt-8 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="gloss-card rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono-arch text-[10px] uppercase tracking-[0.16em] px-2.5 py-0.5 rounded-full bg-[#0E0D0C] text-[#F7F3EC]">
                    {activeProject.code}
                  </span>
                  <span className="font-mono-arch text-[10px] uppercase tracking-[0.14em] text-[#6C635A]">
                    {activeProject.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#272420]">
                    <Layers className="w-3 h-3 text-[#C6A88C]" />
                    {activeProject.images.length} plates
                    {activeProject.video ? ' + 3D video' : ''}
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#0E0D0C] leading-tight">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#574F47] leading-relaxed max-w-xl">
                  {activeProject.summary}
                </p>
              </div>

              <Link
                to={`/projects/${activeProject.slug}`}
                className="gloss-black-btn gloss-sheen shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium text-[#F7F3EC] hover:opacity-95 transition"
              >
                <span>Open Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#D8C3A8]" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
