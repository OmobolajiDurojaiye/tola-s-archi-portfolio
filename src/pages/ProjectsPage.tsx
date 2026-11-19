import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react/dist/csr/ArrowLeft';
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { Play } from '@phosphor-icons/react/dist/csr/Play';
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from '../data/projects';
import { CinemaVideoPlayer } from '../components/CinemaVideoPlayer';
import { CoverflowGallery } from '../components/CoverflowGallery';
import { StudioFooter } from '../components/StudioFooter';
import { OptimizedImage } from '../components/OptimizedImage';
import { SplitHeadline } from '../components/SplitHeadline';
import { Card3D } from '../components/Card3D';
import { variantForCategory } from '../components/CardBackground';
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
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeProject.slug]);

  const setUnderlineOrigin = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--ux', `${((e.clientX - r.left) / r.width) * 100}%`);
  };

  return (
    <div className="page-enter min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <main className="pt-24 sm:pt-30 pb-12 px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Top Navigation & Text-Only Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link
            to="/"
            viewTransition
            onPointerEnter={setUnderlineOrigin}
            onClick={() => hapticTap(6)}
            data-cursor="link"
            className="link-draw inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--tone-600)] transition-colors w-fit"
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
                  onPointerEnter={setUnderlineOrigin}
                  onClick={() => {
                    hapticTap(6);
                    setCategoryFilter(cat);
                  }}
                  data-cursor="link"
                  className={`link-draw shrink-0 nowrap text-xs sm:text-sm transition-all cursor-pointer ${
                    active
                      ? 'text-[var(--tone-600)] opacity-100'
                      : 'text-[var(--tone-900)] opacity-45 hover:opacity-85'
                  }`}
                  style={{
                    fontVariationSettings: active ? '"wght" 660, "wdth" 92' : '"wght" 450, "wdth" 100',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Project Switcher Rail */}
        <div className="mb-10" data-cursor="drag">
          <div className="flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory py-2">
            {railProjects.map((project, idx) => {
              const isSelected = project.slug === activeProject.slug;
              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => {
                    hapticTap(6);
                    navigate(`/projects/${project.slug}`, { viewTransition: true });
                  }}
                  data-cursor="button"
                  className={`snap-start shrink-0 w-[195px] sm:w-[218px] rounded-[22px] p-2.5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'card card-900 scale-[1.02]'
                      : idx % 2 === 0
                        ? 'card card-100 hover:scale-[1.01]'
                        : 'card card-50 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-[14px] overflow-hidden shrink-0 bg-[var(--tone-200)]">
                      <OptimizedImage
                        image={project.cover}
                        sizes="64px"
                        className="w-full h-full object-cover"
                      />
                      {project.video && (
                        <span className="absolute inset-0 bg-[#1C130E]/45 flex items-center justify-center text-[var(--tone-50)]">
                          <Play weight="light" className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`block text-[11px] font-medium ${
                          isSelected ? 'text-[var(--tone-300)]' : 'text-[var(--tone-600)]'
                        }`}
                      >
                        {project.code} · {project.images.length}p
                      </span>
                      <span className="block text-xs sm:text-sm font-semibold truncate mt-0.5">
                        {project.shortTitle}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Project Presentation */}
        <AnimatePresence mode="wait">
          <m.article
            key={activeProject.slug}
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -12 }}
            transition={{ type: 'spring', stiffness: 170, damping: 22 }}
            className="space-y-10 sm:space-y-14"
          >
            {/* Project Info Card with Variant A ("pixels") & category-matched nuance */}
            <Card3D
              tone="100"
              variant={variantForCategory(activeProject.category)}
              tilt={3}
              contentClassName="p-6 sm:p-10"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <p className="t-label accent">
                    {activeProject.code} · {activeProject.category} · {activeProject.year}
                  </p>

                  <SplitHeadline
                    text={activeProject.title}
                    as="h1"
                    className="t-display text-[var(--tone-900)]"
                  />

                  <p className="t-body muted">
                    {activeProject.summary}
                  </p>

                  <p className="pt-1 text-xs font-medium muted">
                    {activeProject.tools.join(' · ')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:min-w-[270px]">
                  {activeProject.specs.map((spec, idx) => (
                    <div
                      key={spec}
                      className={`rounded-[20px] px-4 py-3 ${
                        idx === 3
                          ? 'bg-[var(--tone-900)] text-[var(--tone-100)]'
                          : 'bg-[var(--tone-50)] text-[var(--tone-900)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
                      }`}
                    >
                      <span className="block text-xs font-semibold">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card3D>

            {/* 3D Walkthrough Film Player */}
            {activeProject.video && (
              <section className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <p className="t-label text-[var(--tone-600)]">
                    3D walkthrough film
                  </p>
                  <p className="text-xs text-[var(--ink-muted)]">
                    Hover to scrub preview · Click to play
                  </p>
                </div>
                <CinemaVideoPlayer
                  video={activeProject.video}
                  projectCode={activeProject.code}
                />
              </section>
            )}

            {/* 3D Coverflow Plate Carousel */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <p className="t-label text-[var(--tone-600)]">
                  3D coverflow archive · {activeProject.images.length} plates
                </p>
                <p className="text-xs text-[var(--ink-muted)]">
                  Drag with momentum, swipe, or use arrow keys
                </p>
              </div>

              <CoverflowGallery
                images={activeProject.images}
                projectTitle={activeProject.title}
                projectCode={activeProject.code}
              />
            </section>

            {/* Previous / Next Project Cards with Variant B ("arc") and tonal contrast */}
            <nav
              aria-label="Project pagination"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              <Link
                to={`/projects/${prevProject.slug}`}
                viewTransition
                onClick={() => hapticTap(6)}
                className="block group"
              >
                <Card3D
                  tone="100"
                  variant="arc"
                  cursor="view"
                  contentClassName="p-5 sm:p-6 flex items-center gap-4"
                >
                  <ArrowLeft
                    weight="light"
                    className="w-6 h-6 muted group-hover:text-[var(--tone-600)] shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  <div className="min-w-0">
                    <span className="block t-label accent">
                      Previous · {prevProject.code}
                    </span>
                    <span className="block t-h3 truncate mt-0.5">
                      {prevProject.title}
                    </span>
                  </div>
                </Card3D>
              </Link>

              <Link
                to={`/projects/${nextProject.slug}`}
                viewTransition
                onClick={() => hapticTap(6)}
                className="block group text-right"
              >
                <Card3D
                  tone="900"
                  variant="arc"
                  cursor="view"
                  contentClassName="p-5 sm:p-6 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <span className="block t-label accent">
                      Next · {nextProject.code}
                    </span>
                    <span className="block t-h3 text-[var(--tone-100)] truncate mt-0.5">
                      {nextProject.title}
                    </span>
                  </div>
                  <ArrowRight
                    weight="light"
                    className="w-6 h-6 muted group-hover:text-[var(--tone-300)] shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Card3D>
              </Link>
            </nav>
          </m.article>
        </AnimatePresence>
      </main>

      <StudioFooter />
    </div>
  );
}
