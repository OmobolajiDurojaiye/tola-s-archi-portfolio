import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { DownloadSimple } from '@phosphor-icons/react/dist/csr/DownloadSimple';
import { Play } from '@phosphor-icons/react/dist/csr/Play';
import { GraduationCap } from '@phosphor-icons/react/dist/csr/GraduationCap';
import { MapPin } from '@phosphor-icons/react/dist/csr/MapPin';
import { Check } from '@phosphor-icons/react/dist/csr/Check';
import { PROFILE } from '../data/profile';
import type { ProjectCategory } from '../data/projects';
import { PROJECT_SUMMARIES, PROJECT_CATEGORIES, type ProjectSummary } from '../data/projectsSummary';
import { HeroElevationStage } from '../components/HeroElevationStage';
import { FannedProjectDeck } from '../components/FannedProjectDeck';
import { StudioFooter } from '../components/StudioFooter';
import { InteractiveHeadline } from '../components/InteractiveHeadline';
import { Magnetic } from '../components/MagneticButton';
import { TiltCard3D } from '../components/TiltCard3D';
import { OptimizedImage } from '../components/OptimizedImage';
import { hapticTap, usePerfFlags } from '../lib/perf';

/**
 * Project card with 3D tilt, specular gloss sheen, and Interaction #8
 * (inline muted walkthrough film on hover/tap with lightweight poster first).
 */
function ProjectArchiveCard({ project }: { project: ProjectSummary }) {
  const { liteMode, isTouch } = usePerfFlags();
  const [hoverPlay, setHoverPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startInlinePreview = () => {
    if (!project.video || liteMode) return;
    setHoverPlay(true);
    window.setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 40);
  };

  const stopInlinePreview = () => {
    if (!project.video) return;
    setHoverPlay(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      onMouseEnter={!isTouch ? startInlinePreview : undefined}
      onMouseLeave={!isTouch ? stopInlinePreview : undefined}
      className="h-full"
    >
      <Link to={`/projects/${project.slug}`} className="block h-full group">
        <TiltCard3D className="h-full p-3.5 flex flex-col">
          <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[var(--surface-recessed)]">
            <OptimizedImage
              image={project.cover}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Inline muted walkthrough preview (only loads when hovered/tapped, never in Lite Mode) */}
            {project.video && hoverPlay && !liteMode && (
              <video
                ref={videoRef}
                src={project.video.src}
                poster={project.video.poster}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover z-10"
              />
            )}

            {project.video && (
              <button
                type="button"
                aria-label="Preview 3D film inline"
                onClick={(e) => {
                  if (isTouch && !liteMode) {
                    e.preventDefault();
                    hapticTap(8);
                    if (hoverPlay) stopInlinePreview();
                    else startInlinePreview();
                  }
                }}
                className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-[var(--tone-600)] text-[var(--light-ink)] flex items-center justify-center shadow-lg"
              >
                <Play weight="light" className="w-4 h-4 ml-0.5" />
              </button>
            )}
          </div>

          <div className="pt-4 px-1.5 pb-1 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-[var(--ink-muted)]">
                <span className="font-medium text-[var(--tone-600)]">
                  {project.code} · {project.category}
                </span>
                <span className="tabular-nums">{project.imageCount} plates</span>
              </div>

              <div className="mt-1.5 flex items-start justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.03em] text-[var(--ink)] leading-snug group-hover:text-[var(--tone-600)] transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight
                  weight="light"
                  className="w-5 h-5 text-[var(--ink-muted)] group-hover:text-[var(--tone-600)] shrink-0 mt-1 transition-colors"
                />
              </div>

              <p className="mt-1.5 text-xs sm:text-sm text-[var(--ink-muted)] line-clamp-2 leading-relaxed">
                {project.summary}
              </p>
            </div>

            <p className="mt-4 text-xs font-medium text-[var(--ink)]/55 tracking-tight">
              {project.tools.join(' · ')}
            </p>
          </div>
        </TiltCard3D>
      </Link>
    </motion.div>
  );
}

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [activeSkill, setActiveSkill] = useState(0);

  const highlightProjects = PROJECT_SUMMARIES.filter((p) => p.highlight);
  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECT_SUMMARIES
      : PROJECT_SUMMARIES.filter((p) => p.category === selectedCategory);

  const totalPlates = PROJECT_SUMMARIES.reduce((acc, p) => acc + p.imageCount, 0);
  const totalVideos = PROJECT_SUMMARIES.filter((p) => p.video).length;

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      {/* HERO SECTION: Freestanding 3D Elevation + Depth-Interlocked Headline */}
      <section className="pt-26 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <p className="text-xs sm:text-sm font-medium tracking-tight text-[var(--tone-600)] mb-3">
              {PROFILE.education.institution} · {PROFILE.education.level} · {PROFILE.location}
            </p>

            <InteractiveHeadline
              text="Precision in form, light, and space."
              as="h1"
              className="text-4xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-[-0.035em] leading-[1.02] text-[var(--ink)]"
            />

            <p className="mt-4 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed max-w-2xl mx-auto">
              {PROFILE.fullName}. Residential architecture, 3D SketchUp modelling, AutoCAD working drawings, physical scale models, and GIS environmental mapping.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.22}>
                <Link
                  to="/projects"
                  className="gel-cobalt inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-tight hover:scale-[1.02] transition-transform"
                >
                  <span>Explore {PROJECT_SUMMARIES.length} Projects</span>
                  <ArrowUpRight weight="light" className="w-4 h-4" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.22}>
                <a
                  href={PROFILE.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gel-surface inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium text-[var(--ink)] hover:text-[var(--tone-600)] transition-colors"
                >
                  <DownloadSimple weight="light" className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Freestanding 3D Elevation (NO container, NO replay button, continuous build loop + sun slider) */}
          <HeroElevationStage />

          {/* 3D Depth Stat Blocks — zero borders, tone + layered shadow only */}
          <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {[
              { label: 'Portfolio Archive', value: `${PROJECT_SUMMARIES.length} Projects`, sub: `${totalPlates} curated plates` },
              { label: '3D Walkthroughs', value: `${totalVideos} Films`, sub: 'Mobile & desktop ready' },
              { label: 'Core Toolkit', value: 'CAD + 3D', sub: 'AutoCAD, SketchUp, Archicad, QGIS' },
              { label: 'Academic Standing', value: '300 Level', sub: 'Nile University of Nigeria' },
            ].map((stat) => (
              <TiltCard3D key={stat.label} cursorMode="pointer" className="p-5 flex flex-col justify-between">
                <span className="text-xs font-medium text-[var(--tone-600)] tracking-tight">
                  {stat.label}
                </span>
                <span className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[var(--ink)] leading-none">
                  {stat.value}
                </span>
                <span className="mt-1.5 text-xs text-[var(--ink-muted)]">{stat.sub}</span>
              </TiltCard3D>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE FANNED STUDIO DECK */}
      <FannedProjectDeck projects={highlightProjects} />

      {/* COMPLETE PROJECT ARCHIVE WITH TEXT-ONLY FILTER & FLIP RESHUFFLE */}
      <section className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 sm:mb-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--tone-600)] mb-2">
                Complete Project Index
              </p>
              <InteractiveHeadline
                text="Built for Fast Studio Review"
                as="h2"
                className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[var(--ink)] leading-tight"
              />
            </div>

            {/* Text-only filter row: active state = weight & opacity only, ZERO pills */}
            <div className="flex items-center gap-5 sm:gap-6 overflow-x-auto pb-1">
              {PROJECT_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      hapticTap(6);
                      setSelectedCategory(cat);
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

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectArchiveCard key={project.slug} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* STUDIO WORKSPACE & CV PROFILE */}
      <section className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            {/* Left: Cobalt Monotone Curved Ultrawide Studio Desk Art */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[32px] overflow-hidden shadow-[0_34px_84px_-26px_rgba(11,79,219,0.38)] group">
                <picture>
                  <source srcSet="/art/studio-desk.avif" type="image/avif" />
                  <source srcSet="/art/studio-desk.webp" type="image/webp" />
                  <img
                    src="/art/studio-desk.jpg"
                    alt="Cobalt monotone isometric studio desk with curved ultrawide architectural monitor"
                    width={1200}
                    height={675}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </picture>
                <div aria-hidden="true" className="scene-grain absolute inset-0" />
              </div>
            </div>

            {/* Right: Profile & Interactive Technical Stack */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--tone-600)] mb-2">
                  Architect Profile
                </p>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[var(--ink)] leading-tight">
                  {PROFILE.fullName}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
                  {PROFILE.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="gel-surface rounded-[24px] p-4 flex items-start gap-3.5">
                  <GraduationCap weight="light" className="w-6 h-6 text-[var(--tone-600)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold tracking-tight text-[var(--ink)]">
                      {PROFILE.education.institution}
                    </p>
                    <p className="text-xs text-[var(--ink-muted)] mt-0.5">
                      {PROFILE.education.degree}
                    </p>
                    <p className="text-xs text-[var(--tone-600)] font-medium mt-1">
                      {PROFILE.education.level} · {PROFILE.education.period}
                    </p>
                  </div>
                </div>

                <div className="gel-surface rounded-[24px] p-4 flex items-start gap-3.5">
                  <MapPin weight="light" className="w-6 h-6 text-[var(--tone-600)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold tracking-tight text-[var(--ink)]">
                      SIWES Placement
                    </p>
                    <p className="text-xs text-[var(--ink-muted)] mt-0.5">
                      Based in {PROFILE.location}
                    </p>
                    <p className="text-xs text-[var(--tone-600)] font-medium mt-1">
                      Studio &amp; Site Ready
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Software Stack — text tabs, zero borders */}
              <div className="gel-surface rounded-[28px] p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto">
                  {PROFILE.technicalSkills.map((skill, idx) => (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => {
                        hapticTap(6);
                        setActiveSkill(idx);
                      }}
                      className={`shrink-0 text-sm tracking-tight transition-all cursor-pointer ${
                        activeSkill === idx
                          ? 'font-bold text-[var(--tone-600)] opacity-100'
                          : 'font-normal text-[var(--ink)] opacity-45 hover:opacity-85'
                      }`}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>

                {PROFILE.technicalSkills[activeSkill] && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-[var(--ink)]">
                        {PROFILE.technicalSkills[activeSkill].level}
                      </span>
                      <span className="font-bold text-[var(--tone-600)] tabular-nums">
                        {PROFILE.technicalSkills[activeSkill].percent}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--tone-100)] overflow-hidden">
                      <motion.div
                        key={PROFILE.technicalSkills[activeSkill].name}
                        initial={{ width: 0 }}
                        animate={{ width: `${PROFILE.technicalSkills[activeSkill].percent}%` }}
                        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                        className="h-full rounded-full bg-[var(--tone-600)]"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                      {PROFILE.technicalSkills[activeSkill].detail}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Practical Training & Areas of Interest — borderless glossy depth */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {PROFILE.training.map((item) => (
              <div key={item.title} className="gel-surface rounded-[28px] p-6 space-y-3.5">
                <p className="text-xs font-medium text-[var(--tone-600)]">{item.meta}</p>
                <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.03em] text-[var(--ink)] leading-snug">
                  {item.title}
                </h3>
                <ul className="space-y-2.5">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                      <Check weight="light" className="w-4 h-4 text-[var(--tone-600)] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="gel-surface rounded-[28px] p-6 flex flex-col justify-between space-y-5">
              <div>
                <p className="text-xs font-medium text-[var(--tone-600)]">Focus Areas</p>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-[-0.03em] text-[var(--ink)]">
                  Areas of Interest
                </h3>
                <p className="mt-3 text-sm text-[var(--ink)] leading-relaxed">
                  {PROFILE.interests.join(' · ')}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[var(--tone-600)] mb-2">Studio Strengths</p>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                  {PROFILE.softSkills.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StudioFooter />
    </div>
  );
}
