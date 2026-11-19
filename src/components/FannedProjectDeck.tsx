import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { Play } from '@phosphor-icons/react/dist/csr/Play';
import type { ProjectSummary } from '../data/projectsSummary';
import { OptimizedImage } from './OptimizedImage';
import { Magnetic } from './MagneticButton';
import { hapticTap } from '../lib/perf';

interface FannedProjectDeckProps {
  projects: ProjectSummary[];
}

const DESKTOP_TRANSFORMS = [
  { rotate: -13, y: 26 },
  { rotate: -8, y: 12 },
  { rotate: -4, y: 4 },
  { rotate: 0, y: -4 },
  { rotate: 5, y: 6 },
  { rotate: 9, y: 16 },
  { rotate: 14, y: 28 },
];

export function FannedProjectDeck({ projects }: FannedProjectDeckProps) {
  const deckProjects = projects.slice(0, 7);
  const [activeIndex, setActiveIndex] = useState(3);
  const activeProject = deckProjects[activeIndex] || deckProjects[0];

  if (!activeProject) return null;

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--tone-600)] mb-2">
            Selected Works
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[var(--ink)]">
            Skim the Studio Deck
          </h2>
          <p className="mt-2.5 text-sm text-[var(--ink-muted)] max-w-md mx-auto">
            Hover or tap any plate to preview details instantly, then open the full project sheet.
          </p>
        </div>

        {/* Desktop Fanned 3D Deck — zero borders, soft layered shadows */}
        <div className="hidden lg:flex items-center justify-center relative h-[360px] my-4">
          {deckProjects.map((project, idx) => {
            const t = DESKTOP_TRANSFORMS[idx] || { rotate: 0, y: 0 };
            const isActive = idx === activeIndex;

            return (
              <motion.button
                key={project.slug}
                type="button"
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onClick={() => {
                  setActiveIndex(idx);
                  hapticTap(6);
                }}
                initial={false}
                animate={{
                  rotate: isActive ? 0 : t.rotate,
                  y: isActive ? -30 : t.y,
                  scale: isActive ? 1.12 : 0.95,
                  zIndex: isActive ? 40 : 10 + idx,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                data-cursor="pointer"
                className="relative -mx-5 w-[218px] rounded-[24px] bg-[var(--surface-elevated)] p-2.5 pb-4 text-left cursor-pointer focus:outline-none group"
                style={{
                  boxShadow: isActive
                    ? '0 34px 70px -20px rgba(6, 44, 128, 0.34), 0 12px 24px -12px rgba(10,10,12,0.18)'
                    : '0 20px 44px -20px rgba(6, 44, 128, 0.18)',
                }}
              >
                <div className="relative aspect-[4/4.2] w-full rounded-[18px] overflow-hidden bg-[var(--surface-recessed)]">
                  <OptimizedImage
                    image={project.cover}
                    sizes="220px"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.video && (
                    <span className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[var(--tone-600)] text-[var(--light-ink)] flex items-center justify-center shadow-lg">
                      <Play weight="light" className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  )}
                </div>
                <p className="mt-3 px-1 text-xs font-medium text-[var(--ink)] truncate tracking-tight">
                  {project.deckCaption}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile Horizontal Snap Deck */}
        <div className="lg:hidden flex items-center gap-4 overflow-x-auto snap-x snap-mandatory py-5 px-2 -mx-2">
          {deckProjects.map((project, idx) => {
            const isActive = idx === activeIndex;
            const mobileTilt = idx % 2 === 0 ? -2 : 2;

            return (
              <motion.button
                key={project.slug}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  hapticTap(6);
                }}
                animate={{
                  rotate: isActive ? 0 : mobileTilt,
                  scale: isActive ? 1.03 : 0.96,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="snap-center shrink-0 w-[210px] sm:w-[230px] rounded-[24px] bg-[var(--surface-elevated)] p-2.5 pb-4 text-left"
                style={{
                  boxShadow: isActive
                    ? '0 26px 52px -18px rgba(6, 44, 128, 0.28)'
                    : '0 14px 32px -16px rgba(6, 44, 128, 0.14)',
                }}
              >
                <div className="relative aspect-[4/4.1] rounded-[18px] overflow-hidden bg-[var(--surface-recessed)]">
                  <OptimizedImage
                    image={project.cover}
                    sizes="230px"
                    className="w-full h-full object-cover"
                  />
                  {project.video && (
                    <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[var(--tone-600)] text-[var(--light-ink)] flex items-center justify-center">
                      <Play weight="light" className="w-3 h-3 ml-0.5" />
                    </span>
                  )}
                </div>
                <p className="mt-2.5 px-1 text-xs font-medium text-[var(--ink)] truncate">
                  {project.deckCaption}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Quick-Skim Glossy Preview Surface — NO pills, NO borders */}
        <div className="mt-6 sm:mt-8 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="gel-surface rounded-[28px] p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-[var(--tone-600)] tracking-tight">
                  {activeProject.code} · {activeProject.category} · {activeProject.imageCount} plates
                  {activeProject.video ? ' · 3D film' : ''}
                </p>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[var(--ink)] leading-tight">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed max-w-xl">
                  {activeProject.summary}
                </p>
              </div>

              <Magnetic strength={0.2}>
                <Link
                  to={`/projects/${activeProject.slug}`}
                  className="gel-cobalt shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-tight hover:scale-[1.02] transition-transform"
                >
                  <span>Open Project</span>
                  <ArrowUpRight weight="light" className="w-4 h-4" />
                </Link>
              </Magnetic>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
