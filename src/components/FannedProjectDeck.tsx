import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Play } from '@phosphor-icons/react/dist/csr/Play';
import type { ProjectSummary } from '../data/projectsSummary';
import { OptimizedImage } from './OptimizedImage';
import { SplitHeadline } from './SplitHeadline';
import { Card3D } from './Card3D';
import { Key } from './Key';
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
          <p className="t-label text-[var(--tone-600)] mb-2">Selected works</p>
          <SplitHeadline
            text="Skim the Studio Deck"
            as="h2"
            className="t-h2 text-[var(--tone-900)]"
          />
          <p className="mt-2.5 t-body text-[var(--ink-muted)] max-w-md mx-auto">
            Hover or tap any plate to preview details instantly, then open the full project sheet.
          </p>
        </div>

        {/* Desktop Fanned 3D Deck */}
        <div className="hidden lg:flex items-center justify-center relative h-[360px] my-4">
          {deckProjects.map((project, idx) => {
            const t = DESKTOP_TRANSFORMS[idx] || { rotate: 0, y: 0 };
            const isActive = idx === activeIndex;

            return (
              <m.button
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
                transition={{ type: 'spring', stiffness: 170, damping: 22 }}
                data-cursor="view"
                className="relative -mx-5 w-[218px] rounded-[24px] p-2.5 pb-4 text-left cursor-pointer focus:outline-none group"
                style={{
                  background: 'linear-gradient(160deg, #FAF7F2 0%, var(--tone-100) 100%)',
                  boxShadow: isActive
                    ? '0 34px 70px -20px rgba(58, 36, 26, 0.36), 0 12px 24px -12px rgba(28, 19, 14, 0.2), inset 0 1px 0 rgba(255,255,255,0.88)'
                    : '0 20px 44px -20px rgba(58, 36, 26, 0.2), inset 0 1px 0 rgba(255,255,255,0.75)',
                }}
              >
                <div className="relative aspect-[4/4.2] w-full rounded-[18px] overflow-hidden bg-[var(--tone-200)]">
                  <OptimizedImage
                    image={project.cover}
                    sizes="220px"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.video && (
                    <span className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[var(--tone-900)] text-[var(--tone-50)] flex items-center justify-center shadow-lg">
                      <Play weight="light" className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  )}
                </div>
                <p className="mt-3 px-1 text-xs font-medium text-[var(--tone-900)] truncate">
                  {project.deckCaption}
                </p>
              </m.button>
            );
          })}
        </div>

        {/* Mobile Horizontal Snap Deck */}
        <div className="lg:hidden flex items-center gap-4 overflow-x-auto snap-x snap-mandatory py-5 px-2 -mx-2">
          {deckProjects.map((project, idx) => {
            const isActive = idx === activeIndex;
            const mobileTilt = idx % 2 === 0 ? -2 : 2;

            return (
              <m.button
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
                transition={{ type: 'spring', stiffness: 170, damping: 22 }}
                className="snap-center shrink-0 w-[210px] sm:w-[230px] rounded-[24px] p-2.5 pb-4 text-left"
                style={{
                  background: 'linear-gradient(160deg, #FAF7F2 0%, var(--tone-100) 100%)',
                  boxShadow: isActive
                    ? '0 26px 52px -18px rgba(58, 36, 26, 0.3)'
                    : '0 14px 32px -16px rgba(58, 36, 26, 0.16)',
                }}
              >
                <div className="relative aspect-[4/4.1] rounded-[18px] overflow-hidden bg-[var(--tone-200)]">
                  <OptimizedImage
                    image={project.cover}
                    sizes="230px"
                    className="w-full h-full object-cover"
                  />
                  {project.video && (
                    <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[var(--tone-900)] text-[var(--tone-50)] flex items-center justify-center">
                      <Play weight="light" className="w-3 h-3 ml-0.5" />
                    </span>
                  )}
                </div>
                <p className="mt-2.5 px-1 text-xs font-medium text-[var(--tone-900)] truncate">
                  {project.deckCaption}
                </p>
              </m.button>
            );
          })}
        </div>

        {/* Quick-Skim Preview Card with Variant A (pixel blocks) & non-wrapping Key button */}
        <div className="mt-6 sm:mt-8 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <m.div
              key={activeProject.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 170, damping: 22 }}
            >
              <Card3D
                tone="100"
                variant="pixels"
                tilt={4}
                contentClassName="p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
              >
                <div className="space-y-1.5 min-w-0">
                  <p className="t-label accent">
                    {activeProject.code} · {activeProject.category} · {activeProject.imageCount} plates
                    {activeProject.video ? ' · 3D film' : ''}
                  </p>

                  <h3 className="t-h3 text-[var(--tone-900)]">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm muted leading-relaxed max-w-xl">
                    {activeProject.summary}
                  </p>
                </div>

                <Key
                  label="Open Project"
                  to={`/projects/${activeProject.slug}`}
                  viewTransition
                  icon="arrow"
                />
              </Card3D>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
