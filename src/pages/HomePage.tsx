import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
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
import { SplitHeadline } from '../components/SplitHeadline';
import { Reveal, Counter } from '../components/Reveal';
import { Key } from '../components/Key';
import { Card3D, type CardTone } from '../components/Card3D';
import { variantForCategory } from '../components/CardBackground';
import { OptimizedImage } from '../components/OptimizedImage';
import { hapticTap, usePerfFlags } from '../lib/perf';

const ARCHIVE_TONES: CardTone[] = ['50', '100', '200', '100', '50', '900'];

function ProjectArchiveCard({
  project,
  index,
  handedSlug,
  onSelect,
}: {
  project: ProjectSummary;
  index: number;
  handedSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  const { liteMode, isTouch } = usePerfFlags();
  const [hoverPlay, setHoverPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tone = ARCHIVE_TONES[index % ARCHIVE_TONES.length];
  const bgVariant = project.video ? 'beam' : variantForCategory(project.category);

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
    <m.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 170, damping: 22 }}
      onMouseEnter={!isTouch ? startInlinePreview : undefined}
      onMouseLeave={!isTouch ? stopInlinePreview : undefined}
      className="h-full"
    >
      <Link
        to={`/projects/${project.slug}`}
        viewTransition
        onClick={() => {
          hapticTap(7);
          onSelect(project.slug);
        }}
        className="block h-full group"
      >
        <Card3D
          tone={tone}
          variant={bgVariant}
          cursor="view"
          contentClassName="p-3.5 flex flex-col justify-between"
        >
          <div
            className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[var(--tone-200)]"
            style={handedSlug === project.slug ? { viewTransitionName: 'plate' } : undefined}
          >
            <OptimizedImage
              image={project.cover}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

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
                className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-[var(--tone-900)] text-[var(--tone-50)] flex items-center justify-center shadow-lg"
              >
                <Play weight="light" className="w-4 h-4 ml-0.5" />
              </button>
            )}
          </div>

          <div className="pt-4 px-1.5 pb-1 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="t-label accent">
                  {project.code} · {project.category}
                </span>
                <span className="tabular-nums muted">{project.imageCount} plates</span>
              </div>

              <div className="mt-1.5 flex items-start justify-between gap-2">
                <h3 className="t-h3 transition-colors group-hover:text-[var(--tone-600)]">
                  {project.title}
                </h3>
                <ArrowUpRight
                  weight="light"
                  className="w-5 h-5 muted group-hover:text-[var(--tone-600)] shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>

              <p className="mt-1.5 text-xs sm:text-sm muted line-clamp-2 leading-relaxed">
                {project.summary}
              </p>
            </div>

            <p className="mt-4 text-xs font-medium muted">
              {project.tools.join(' · ')}
            </p>
          </div>
        </Card3D>
      </Link>
    </m.div>
  );
}

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [activeSkill, setActiveSkill] = useState(0);
  const [handedSlug, setHandedSlug] = useState<string | null>(null);

  const highlightProjects = PROJECT_SUMMARIES.filter((p) => p.highlight);
  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECT_SUMMARIES
      : PROJECT_SUMMARIES.filter((p) => p.category === selectedCategory);

  const totalPlates = PROJECT_SUMMARIES.reduce((acc, p) => acc + p.imageCount, 0);
  const totalVideos = PROJECT_SUMMARIES.filter((p) => p.video).length;

  const setUnderlineOrigin = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--ux', `${((e.clientX - r.left) / r.width) * 100}%`);
  };

  return (
    <div className="page-enter min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      {/* HERO SECTION */}
      <section className="pt-24 sm:pt-30 pb-12 sm:pb-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <Reveal index={0}>
              <p className="t-label text-[var(--tone-600)] mb-3">
                {PROFILE.education.institution} · {PROFILE.education.level} · {PROFILE.location}
              </p>
            </Reveal>

            <SplitHeadline
              text="Precision in form, light, and space."
              as="h1"
              heroWeight
              className="t-display text-[var(--tone-900)]"
            />

            <Reveal index={1}>
              <p className="mt-4 t-body text-[var(--ink-muted)] max-w-2xl mx-auto">
                {PROFILE.fullName}. Residential architecture, 3D SketchUp modelling, AutoCAD working drawings, physical scale models, and GIS environmental mapping.
              </p>
            </Reveal>

            <Reveal index={2}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                <Key
                  label={`Explore ${PROJECT_SUMMARIES.length} Projects`}
                  to="/projects"
                  viewTransition
                  icon="arrow"
                />
                <Key
                  label="Download CV"
                  variant="secondary"
                  icon="download"
                  href={PROFILE.cvUrl}
                  download
                />
              </div>
            </Reveal>
          </div>

          {/* Freestanding 3D Elevation + Sun Arc */}
          <HeroElevationStage />

          {/* 3D Stat Cards — fly up from depth, tonal variety (50, 100, 200, 900) + Variant A pixels */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
            <Reveal kind="depth" index={0} className="h-full">
              <Card3D tone="50" variant="pixels" contentClassName="p-5 flex flex-col justify-between">
                <span className="t-label accent">Portfolio archive</span>
                <span className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.03em] leading-none">
                  <Counter value={PROJECT_SUMMARIES.length} suffix=" Projects" />
                </span>
                <span className="mt-1.5 text-xs muted">{totalPlates} curated plates</span>
              </Card3D>
            </Reveal>

            <Reveal kind="depth" index={1} className="h-full">
              <Card3D tone="100" variant="pixels" contentClassName="p-5 flex flex-col justify-between">
                <span className="t-label accent">3D walkthroughs</span>
                <span className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.03em] leading-none">
                  <Counter value={totalVideos} suffix=" Films" />
                </span>
                <span className="mt-1.5 text-xs muted">Mobile &amp; desktop ready</span>
              </Card3D>
            </Reveal>

            <Reveal kind="depth" index={2} className="h-full">
              <Card3D tone="200" variant="pixels" contentClassName="p-5 flex flex-col justify-between">
                <span className="t-label accent">Core toolkit</span>
                <span className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.03em] leading-none nowrap">
                  CAD + 3D
                </span>
                <span className="mt-1.5 text-xs muted">AutoCAD, SketchUp, Archicad, QGIS</span>
              </Card3D>
            </Reveal>

            <Reveal kind="depth" index={3} className="h-full">
              <Card3D tone="900" variant="pixels" contentClassName="p-5 flex flex-col justify-between">
                <span className="t-label accent">Academic standing</span>
                <span className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.03em] leading-none">
                  <Counter value={300} suffix=" Level" />
                </span>
                <span className="mt-1.5 text-xs muted">Nile University of Nigeria</span>
              </Card3D>
            </Reveal>
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
              <p className="t-label text-[var(--tone-600)] mb-2">Complete project index</p>
              <SplitHeadline
                text="Built for Fast Studio Review"
                as="h2"
                className="t-h2 text-[var(--tone-900)]"
              />
            </div>

            {/* Text-only filter row with liquid active weight + underline draw */}
            <div className="flex items-center gap-5 sm:gap-6 overflow-x-auto pb-1">
              {PROJECT_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onPointerEnter={setUnderlineOrigin}
                    onClick={() => {
                      hapticTap(6);
                      setSelectedCategory(cat);
                    }}
                    data-cursor="link"
                    className={`link-draw shrink-0 nowrap text-xs sm:text-sm transition-all cursor-pointer ${
                      active
                        ? 'text-[var(--tone-600)] opacity-100'
                        : 'text-[var(--tone-900)] opacity-50 hover:opacity-90'
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

          <m.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <ProjectArchiveCard
                  key={project.slug}
                  project={project}
                  index={idx}
                  handedSlug={handedSlug}
                  onSelect={setHandedSlug}
                />
              ))}
            </AnimatePresence>
          </m.div>
        </div>
      </section>

      {/* STUDIO WORKSPACE & CV PROFILE */}
      <section className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            {/* Left: Warm Umber Monotone Studio Desk Art — clip-path wipe + perspective tilt on enter */}
            <div className="lg:col-span-6 px-slow">
              <Reveal kind="tilt">
                <Reveal kind="img" className="relative rounded-[32px] overflow-hidden shadow-[0_34px_84px_-26px_rgba(58,36,26,0.42)]">
                  <picture>
                    <source srcSet="/art/studio-desk.avif" type="image/avif" />
                    <source srcSet="/art/studio-desk.webp" type="image/webp" />
                    <img
                      src="/art/studio-desk.jpg"
                      alt="Warm umber monotone isometric studio desk with curved ultrawide architectural monitor"
                      width={1200}
                      height={675}
                      loading="lazy"
                      className="w-full h-auto block"
                    />
                  </picture>
                  <div aria-hidden="true" className="scene-grain absolute inset-0" />
                </Reveal>
              </Reveal>
            </div>

            {/* Right: Profile & Interactive Technical Stack */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="t-label text-[var(--tone-600)] mb-2">Architect profile</p>
                <SplitHeadline
                  text={PROFILE.fullName}
                  as="h2"
                  className="t-h2 text-[var(--tone-900)]"
                />
                <Reveal index={1}>
                  <p className="mt-3 t-body text-[var(--ink-muted)]">
                    {PROFILE.bio}
                  </p>
                </Reveal>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Reveal index={1} className="h-full">
                  <Card3D tone="100" variant="arc" contentClassName="p-4 flex items-start gap-3.5">
                    <GraduationCap weight="light" className="w-6 h-6 accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--tone-900)]">
                        {PROFILE.education.institution}
                      </p>
                      <p className="text-xs muted mt-0.5">
                        {PROFILE.education.degree}
                      </p>
                      <p className="text-xs accent font-medium mt-1">
                        {PROFILE.education.level} · {PROFILE.education.period}
                      </p>
                    </div>
                  </Card3D>
                </Reveal>

                <Reveal index={2} className="h-full">
                  <Card3D tone="200" variant="arc" contentClassName="p-4 flex items-start gap-3.5">
                    <MapPin weight="light" className="w-6 h-6 accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--tone-900)]">
                        SIWES Placement
                      </p>
                      <p className="text-xs muted mt-0.5">
                        Based in {PROFILE.location}
                      </p>
                      <p className="text-xs accent font-medium mt-1">
                        Studio &amp; Site Ready
                      </p>
                    </div>
                  </Card3D>
                </Reveal>
              </div>

              {/* Interactive Software Stack — Variant A pixels + spring bar + cross-fade description */}
              <Reveal index={3}>
                <Card3D tone="50" variant="pixels" tilt={4} contentClassName="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto">
                    {PROFILE.technicalSkills.map((skill, idx) => {
                      const active = activeSkill === idx;
                      return (
                        <button
                          key={skill.name}
                          type="button"
                          onPointerEnter={setUnderlineOrigin}
                          onClick={() => {
                            hapticTap(6);
                            setActiveSkill(idx);
                          }}
                          data-cursor="link"
                          className={`link-draw shrink-0 nowrap text-sm transition-all cursor-pointer ${
                            active
                              ? 'text-[var(--tone-600)] opacity-100'
                              : 'text-[var(--tone-900)] opacity-45 hover:opacity-85'
                          }`}
                          style={{
                            fontVariationSettings: active ? '"wght" 660, "wdth" 92' : '"wght" 450, "wdth" 100',
                          }}
                        >
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>

                  {PROFILE.technicalSkills[activeSkill] && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium text-[var(--tone-900)]">
                          {PROFILE.technicalSkills[activeSkill].level}
                        </span>
                        <span className="font-bold accent tabular-nums">
                          <Counter
                            key={PROFILE.technicalSkills[activeSkill].name}
                            value={PROFILE.technicalSkills[activeSkill].percent}
                            suffix="%"
                            durationMs={700}
                          />
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[var(--tone-200)] overflow-hidden">
                        <m.div
                          initial={{ width: 0 }}
                          animate={{ width: `${PROFILE.technicalSkills[activeSkill].percent}%` }}
                          transition={{ type: 'spring', stiffness: 170, damping: 22 }}
                          className="h-full rounded-full bg-[var(--tone-600)]"
                        />
                      </div>
                      <p
                        key={PROFILE.technicalSkills[activeSkill].name}
                        className="skill-in text-xs sm:text-sm muted leading-relaxed"
                      >
                        {PROFILE.technicalSkills[activeSkill].detail}
                      </p>
                    </div>
                  )}
                </Card3D>
              </Reveal>
            </div>
          </div>

          {/* Practical Training & Areas of Interest — tonal variety (100, 200, 900) + animated backgrounds */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {PROFILE.training.map((item, idx) => (
              <Reveal key={item.title} index={idx} className="h-full">
                <Card3D
                  tone={idx === 0 ? '100' : '200'}
                  variant={idx === 0 ? 'arc' : 'hatch'}
                  contentClassName="p-6 space-y-3.5"
                >
                  <p className="t-label accent">{item.meta}</p>
                  <h3 className="t-h3">
                    {item.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm muted leading-relaxed">
                        <Check weight="light" className="w-4 h-4 accent shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </Card3D>
              </Reveal>
            ))}

            <Reveal index={2} className="h-full">
              <Card3D
                tone="900"
                variant="contour"
                contentClassName="p-6 flex flex-col justify-between space-y-5"
              >
                <div>
                  <p className="t-label accent">Focus areas</p>
                  <h3 className="mt-2 t-h3 text-[var(--tone-100)]">
                    Areas of Interest
                  </h3>
                  <p className="mt-3 text-sm text-[var(--tone-100)] leading-relaxed">
                    {PROFILE.interests.join(' · ')}
                  </p>
                </div>

                <div>
                  <p className="t-label accent mb-2">Studio strengths</p>
                  <p className="text-xs sm:text-sm muted leading-relaxed">
                    {PROFILE.softSkills.join(' · ')}
                  </p>
                </div>
              </Card3D>
            </Reveal>
          </div>
        </div>
      </section>

      <StudioFooter />
    </div>
  );
}
