import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Layers,
  Maximize2,
  Grid,
  LayoutList,
  Sparkles,
} from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from '../data/projects';
import { CinemaVideoPlayer } from '../components/CinemaVideoPlayer';
import { StudioLightbox } from '../components/StudioLightbox';
import { StudioFooter } from '../components/StudioFooter';

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
  const [viewMode, setViewMode] = useState<'masonry' | 'sheet'>('masonry');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const railProjects =
    categoryFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === categoryFilter);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLightboxIdx(null);
  }, [activeProject.slug]);

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#0E0D0C] arch-grid-bg">
      <main className="pt-22 sm:pt-28 pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Top Breadcrumb + Category Quick Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 text-xs text-[#6C635A]">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full gloss-pill text-[#0E0D0C] font-medium hover:bg-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="font-mono-arch text-[10px] uppercase tracking-[0.16em]">
              Studio Archive · {PROJECTS.length} Projects
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {PROJECT_CATEGORIES.map((cat) => {
              const active = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition cursor-pointer ${
                    active
                      ? 'bg-[#0E0D0C] text-[#F7F3EC]'
                      : 'gloss-pill text-[#272420] hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAGNETIC HORIZONTAL PROJECT SWITCHER RAIL (NO SCROLLBAR, INSTANT SKIMMING) */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-stretch gap-2.5 overflow-x-auto snap-x snap-mandatory py-1.5">
            {railProjects.map((project) => {
              const isSelected = project.slug === activeProject.slug;
              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  className={`snap-start shrink-0 w-[180px] sm:w-[205px] rounded-2xl p-2 text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#0E0D0C] text-[#F7F3EC] border-[#0E0D0C] shadow-[0_18px_40px_-14px_rgba(14,13,12,0.48)] scale-[1.01]'
                      : 'gloss-card text-[#0E0D0C] hover:bg-white/95'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#EADFD1]">
                      <img
                        src={project.cover.src}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      {project.video && (
                        <span className="absolute inset-0 bg-[#0E0D0C]/45 flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 text-[#F7F3EC] fill-current" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`block font-mono-arch text-[9px] uppercase tracking-[0.14em] ${
                          isSelected ? 'text-[#D8C3A8]' : 'text-[#6C635A]'
                        }`}
                      >
                        {project.code} · {project.images.length}p
                      </span>
                      <span className="block text-xs font-semibold truncate mt-0.5">
                        {project.shortTitle}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE ARCHITECTURAL STUDIO PRESENTATION SHEET */}
        <AnimatePresence mode="wait">
          <motion.article
            key={activeProject.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 sm:space-y-10"
          >
            {/* Glossy Architectural Title Block */}
            <header className="gloss-card rounded-[28px] sm:rounded-[34px] p-5 sm:p-8 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0E0D0C] text-[#F7F3EC] font-mono-arch text-[10px] uppercase tracking-[0.18em]">
                      SHEET {activeProject.code}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#EADFD1] text-[#272420] font-mono-arch text-[10px] uppercase tracking-[0.14em]">
                      {activeProject.category}
                    </span>
                    <span className="font-mono-arch text-[11px] text-[#6C635A]">
                      {activeProject.year}
                    </span>
                  </div>

                  <h1 className="font-serif-display text-4xl sm:text-6xl font-medium tracking-tight text-[#0E0D0C] leading-[1.03]">
                    {activeProject.title}
                  </h1>

                  <p className="text-sm sm:text-base text-[#574F47] leading-relaxed">
                    {activeProject.summary}
                  </p>
                </div>

                {/* Skimmable Spec Grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:min-w-[270px]">
                  {activeProject.specs.map((spec) => (
                    <div
                      key={spec}
                      className="rounded-2xl bg-[#F7F3EC]/90 border border-[#0E0D0C]/8 px-3.5 py-2.5"
                    >
                      <span className="block font-mono-arch text-[9px] uppercase tracking-[0.14em] text-[#6C635A]">
                        Spec
                      </span>
                      <span className="block text-xs font-semibold text-[#0E0D0C] mt-0.5">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Layout Mode Switch */}
              <div className="mt-6 pt-4 border-t border-[#0E0D0C]/8 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeProject.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/85 border border-[#C6A88C]/30 text-xs font-medium text-[#272420]"
                    >
                      <Sparkles className="w-3 h-3 text-[#C6A88C]" />
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 bg-[#EADFD1]/75 p-1 rounded-full">
                  <button
                    type="button"
                    onClick={() => setViewMode('masonry')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                      viewMode === 'masonry'
                        ? 'bg-[#0E0D0C] text-[#F7F3EC]'
                        : 'text-[#272420]'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Masonry</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('sheet')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                      viewMode === 'sheet'
                        ? 'bg-[#0E0D0C] text-[#F7F3EC]'
                        : 'text-[#272420]'
                    }`}
                  >
                    <LayoutList className="w-3.5 h-3.5" />
                    <span>Studio Plates</span>
                  </button>
                </div>
              </div>
            </header>

            {/* OUT-OF-THIS-WORLD ARCHITECTURAL CINEMA VIDEO PLAYER (WHEN PROJECT HAS VIDEO) */}
            {activeProject.video && (
              <section className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="font-mono-arch text-[11px] uppercase tracking-[0.2em] text-[#6C635A]">
                    Featured 3D Walkthrough Film
                  </span>
                  <span className="text-xs text-[#574F47]">
                    Speed control &amp; scrubbing built for rapid review
                  </span>
                </div>
                <CinemaVideoPlayer
                  video={activeProject.video}
                  projectCode={activeProject.code}
                />
              </section>
            )}

            {/* ADAPTIVE MIXED-ASPECT GALLERY (PORTRAIT, LANDSCAPE & CAD SHEETS FIT NATURALLY) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="font-mono-arch text-[11px] uppercase tracking-[0.2em] text-[#6C635A] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#0E0D0C]" />
                  <span>Architectural Plates ({activeProject.images.length})</span>
                </span>
                <span className="text-xs text-[#6C635A]">
                  Tap any plate to inspect full screen
                </span>
              </div>

              {viewMode === 'masonry' ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
                  {activeProject.images.map((img, i) => (
                    <motion.button
                      key={img.src}
                      type="button"
                      onClick={() => setLightboxIdx(i)}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.35 }}
                      className="break-inside-avoid w-full block gloss-card rounded-[22px] p-2.5 text-left group cursor-pointer hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Uses the image's exact natural aspect ratio so nothing ever stretches or crops! */}
                      <div
                        style={{ aspectRatio: `${img.width} / ${img.height}` }}
                        className="relative w-full rounded-[16px] overflow-hidden bg-[#EADFD1]"
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          loading="lazy"
                          className="w-full h-full object-contain bg-[#FFFDF9] transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-[#0E0D0C]/0 group-hover:bg-[#0E0D0C]/15 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-full bg-[#F7F3EC]/92 text-[#0E0D0C] flex items-center justify-center shadow-lg">
                            <Maximize2 className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 px-1 flex items-center justify-between text-[10px] font-mono-arch text-[#6C635A]">
                        <span>
                          PLATE {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>
                          {img.width} × {img.height}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="space-y-5">
                  {activeProject.images.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setLightboxIdx(i)}
                      className="w-full block gloss-card rounded-[26px] p-3 sm:p-4 text-left group cursor-pointer"
                    >
                      <div className="relative rounded-[18px] overflow-hidden bg-[#FFFDF9] flex items-center justify-center max-h-[78vh]">
                        <img
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          loading="lazy"
                          className="w-full h-auto max-h-[76vh] object-contain"
                        />
                      </div>
                      <div className="mt-3 px-2 flex items-center justify-between text-xs font-mono-arch text-[#6C635A]">
                        <span>
                          {activeProject.code} / PLATE {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#0E0D0C]">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Zoom</span>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Previous / Next Project Architectural Navigation */}
            <nav
              aria-label="Project pagination"
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4"
            >
              <Link
                to={`/projects/${prevProject.slug}`}
                className="gloss-card gloss-sheen rounded-3xl p-4 sm:p-5 flex items-center gap-3.5 group"
              >
                <span className="w-10 h-10 rounded-full bg-[#EADFD1] group-hover:bg-[#0E0D0C] group-hover:text-[#F7F3EC] flex items-center justify-center shrink-0 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <span className="block font-mono-arch text-[10px] uppercase tracking-[0.16em] text-[#6C635A]">
                    Previous · {prevProject.code}
                  </span>
                  <span className="block font-serif-display text-xl sm:text-2xl font-semibold text-[#0E0D0C] truncate">
                    {prevProject.title}
                  </span>
                </div>
              </Link>

              <Link
                to={`/projects/${nextProject.slug}`}
                className="gloss-card gloss-sheen rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-3.5 group text-right"
              >
                <div className="min-w-0 flex-1">
                  <span className="block font-mono-arch text-[10px] uppercase tracking-[0.16em] text-[#6C635A]">
                    Next · {nextProject.code}
                  </span>
                  <span className="block font-serif-display text-xl sm:text-2xl font-semibold text-[#0E0D0C] truncate">
                    {nextProject.title}
                  </span>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#0E0D0C] text-[#F7F3EC] group-hover:scale-105 flex items-center justify-center shrink-0 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </nav>
          </motion.article>
        </AnimatePresence>
      </main>

      <StudioLightbox
        images={activeProject.images}
        index={lightboxIdx}
        projectTitle={activeProject.title}
        projectCode={activeProject.code}
        onClose={() => setLightboxIdx(null)}
        onNavigate={(next) => setLightboxIdx(next)}
      />

      <StudioFooter />
    </div>
  );
}
