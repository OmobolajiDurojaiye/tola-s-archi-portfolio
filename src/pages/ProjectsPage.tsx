import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react/dist/csr/ArrowLeft';
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { Play } from '@phosphor-icons/react/dist/csr/Play';
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from '../data/projects';
import { CinemaVideoPlayer } from '../components/CinemaVideoPlayer';
import { CoverflowGallery } from '../components/CoverflowGallery';
import { StudioFooter } from '../components/StudioFooter';
import { OptimizedImage } from '../components/OptimizedImage';
import { InteractiveHeadline } from '../components/InteractiveHeadline';
import { hapticTap } from '../lib/perf';

export function ProjectsPage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const activeProject = useMemo(() => {
    if (!slug) return PROJECTS[0];
    return PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  }, [slug]);

  const activeIdx = PROJECTS.findIndex((p) => p.slug === activeProject.slug);
  const prevProject = PROJECTS[(activeIdx - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(activeIdx + 1) % PROJECTS.length];

  const [categoryFilter, setCategoryFilter] = useState<'All' | ProjectCategory>('All');

  const railProjects =
    categoryFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === categoryFilter);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeProject.slug]);

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <main className="pt-26 sm:pt-32 pb-12 px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Top Navigation & Text-Only Filter Row (ZERO pills, ZERO borders) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link
            to="/"
            onClick={() => hapticTap(6)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--tone-600)] transition-colors"
          >
            <ArrowLeft weight="light" className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-5 overflow-x-auto pb-0.5">
            {PROJECT_CATEGORIES.map((cat) => {
              const active = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    hapticTap(6);
                    setCategoryFilter(cat);
                  }}
                  className={`shrink-0 text-xs sm:text-sm tracking-tight transition-all cursor-pointer ${
                    active
                      ? 'font-bold text-[var(--tone-600)] opacity-100'
                      : 'font-normal text-[var(--ink)] opacity-45 hover:opacity-85'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Borderless Glossy Horizontal Project Switcher Rail */}
        <div className="mb-10">
          <div className="flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory py-2">
            {railProjects.map((project) => {
              const isSelected = project.slug === activeProject.slug;
              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => {
                    hapticTap(6);
                    navigate(`/projects/${project.slug}`);
                  }}
                  data-cursor="pointer"
                  className={`snap-start shrink-0 w-[190px] sm:w-[215px] rounded-[22px] p-2.5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'gel-cobalt scale-[1.02]'
                      : 'gel-surface text-[var(--ink)] hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-[14px] overflow-hidden shrink-0 bg-[var(--surface-recessed)]">
                      <OptimizedImage
                        image={project.cover}
                        sizes="64px"
                        className="w-full h-full object-cover"
                      />
                      {project.video && (
                        <span className="absolute inset-0 bg-[#0A0A0C]/45 flex items-center justify-center text-[var(--light-ink)]">
                          <Play weight="light" className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`block text-[11px] font-medium ${
                          isSelected ? 'text-[var(--light-ink)]/80' : 'text-[var(--tone-600)]'
                        }`}
                      >
                        {project.code} · {project.images.length}p
                      </span>
                      <span className="block text-xs sm:text-sm font-bold tracking-tight truncate mt-0.5">
                        {project.shortTitle}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Project Presentation — 3D camera-dolly spring transition */}
        <AnimatePresence mode="wait">
          <motion.article
            key={activeProject.slug}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.03, y: -14 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            className="space-y-10 sm:space-y-14"
          >
            {/* Borderless Glossy Title Surface */}
            <header className="gel-surface rounded-[32px] p-6 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <p className="text-xs sm:text-sm font-medium text-[var(--tone-600)]">
                    {activeProject.code} · {activeProject.category} · {activeProject.year}
                  </p>

                  <InteractiveHeadline
                    text={activeProject.title}
                    as="h1"
                    className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] text-[var(--ink)] leading-[1.02]"
                  />

                  <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
                    {activeProject.summary}
                  </p>

                  <p className="pt-1 text-xs font-medium text-[var(--ink)]/55">
                    {activeProject.tools.join(' · ')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:min-w-[270px]">
                  {activeProject.specs.map((spec) => (
                    <div
                      key={spec}
                      className="rounded-[20px] bg-[var(--surface)]/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                    >
                      <span className="block text-xs font-bold tracking-tight text-[var(--ink)]">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            {/* 3D Walkthrough Film Player (when available) */}
            {activeProject.video && (
              <section className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--tone-600)]">
                    3D Walkthrough Film
                  </p>
                  <p className="text-xs text-[var(--ink-muted)]">
                    Tap to stream · Speed control for rapid review
                  </p>
                </div>
                <CinemaVideoPlayer
                  video={activeProject.video}
                  projectCode={activeProject.code}
                />
              </section>
            )}

            {/* Interaction #5: 3D Coverflow Plate Carousel + Shared-Element Lightbox */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--tone-600)]">
                  3D Coverflow Archive · {activeProject.images.length} Plates
                </p>
                <p className="text-xs text-[var(--ink-muted)]">
                  Drag, swipe, or use arrow keys
                </p>
              </div>

              <CoverflowGallery
                images={activeProject.images}
                projectTitle={activeProject.title}
                projectCode={activeProject.code}
              />
            </section>

            {/* Previous / Next Project Navigation */}
            <nav
              aria-label="Project pagination"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              <Link
                to={`/projects/${prevProject.slug}`}
                onClick={() => hapticTap(6)}
                className="gel-surface rounded-[28px] p-5 flex items-center gap-4 group hover:scale-[1.01] transition-transform"
              >
                <ArrowLeft
                  weight="light"
                  className="w-6 h-6 text-[var(--ink-muted)] group-hover:text-[var(--tone-600)] shrink-0 transition-colors"
                />
                <div className="min-w-0">
                  <span className="block text-xs font-medium text-[var(--tone-600)]">
                    Previous · {prevProject.code}
                  </span>
                  <span className="block text-xl sm:text-2xl font-bold tracking-[-0.03em] text-[var(--ink)] truncate">
                    {prevProject.title}
                  </span>
                </div>
              </Link>

              <Link
                to={`/projects/${nextProject.slug}`}
                onClick={() => hapticTap(6)}
                className="gel-surface rounded-[28px] p-5 flex items-center justify-between gap-4 group text-right hover:scale-[1.01] transition-transform"
              >
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-medium text-[var(--tone-600)]">
                    Next · {nextProject.code}
                  </span>
                  <span className="block text-xl sm:text-2xl font-bold tracking-[-0.03em] text-[var(--ink)] truncate">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight
                  weight="light"
                  className="w-6 h-6 text-[var(--ink-muted)] group-hover:text-[var(--tone-600)] shrink-0 transition-colors"
                />
              </Link>
            </nav>
          </motion.article>
        </AnimatePresence>
      </main>

      <StudioFooter />
    </div>
  );
}
