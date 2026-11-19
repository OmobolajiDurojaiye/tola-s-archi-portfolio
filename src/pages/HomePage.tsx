import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  FileDown,
  Play,
  Layers,
  GraduationCap,
  MapPin,
  Sparkles,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { PROFILE } from '../data/profile';
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from '../data/projects';
import { HeroElevationAssembly } from '../components/HeroElevationAssembly';
import { FannedProjectDeck } from '../components/FannedProjectDeck';
import { StudioFooter } from '../components/StudioFooter';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [activeSkill, setActiveSkill] = useState(0);

  const highlightProjects = PROJECTS.filter((p) => p.highlight);
  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const totalPlates = PROJECTS.reduce((acc, p) => acc + p.images.length, 0);
  const totalVideos = PROJECTS.filter((p) => p.video).length;

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#0E0D0C] arch-grid-bg">
      {/* HERO SECTION: Opening Architectural Piece-by-Piece Assembly */}
      <section className="pt-22 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top editorial intro */}
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full gloss-pill mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#0E0D0C] animate-pulse" />
              <span className="font-mono-arch text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#272420]">
                {PROFILE.statusBadge} · {PROFILE.location}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[1.02] text-[#0E0D0C]"
            >
              Architecture built with{' '}
              <span className="italic font-normal text-[#6C5846]">precision</span> &amp; warmth.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="mt-4 text-sm sm:text-base text-[#574F47] leading-relaxed max-w-2xl mx-auto"
            >
              {PROFILE.fullName}, 300-level Architecture student at{' '}
              <span className="text-[#0E0D0C] font-medium">{PROFILE.education.institution}</span>.
              Residential design, 3D SketchUp modelling, AutoCAD working drawings, physical scale models, and GIS mapping.
            </motion.p>

            {/* Primary Action Pills */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/projects"
                className="gloss-black-btn gloss-sheen inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#F7F3EC] hover:opacity-95 transition"
              >
                <span>Explore {PROJECTS.length} Projects</span>
                <ArrowUpRight className="w-4 h-4 text-[#D8C3A8]" />
              </Link>

              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gloss-pill gloss-sheen inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#0E0D0C] hover:bg-white transition"
              >
                <FileDown className="w-4 h-4 text-[#6C5846]" />
                <span>Download CV</span>
              </a>
            </motion.div>
          </div>

          {/* Animated Piece-by-Piece Elevation Art */}
          <HeroElevationAssembly />

          {/* Quick-Skim Executive Strip for Architecture Firms */}
          <div className="mt-7 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {[
              { label: 'Portfolio Archive', value: `${PROJECTS.length} Projects`, sub: `${totalPlates} curated plates` },
              { label: '3D Walkthroughs', value: `${totalVideos} Films`, sub: 'Mobile & desktop ready' },
              { label: 'Core Toolkit', value: 'CAD + 3D', sub: 'AutoCAD, SketchUp, Archicad, QGIS' },
              { label: 'Academic Standing', value: '300 Level', sub: 'Nile University of Nigeria' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="gloss-card rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between"
              >
                <span className="font-mono-arch text-[10px] uppercase tracking-[0.15em] text-[#6C635A]">
                  {stat.label}
                </span>
                <span className="mt-1.5 font-serif-display text-2xl sm:text-3xl font-semibold text-[#0E0D0C] leading-none">
                  {stat.value}
                </span>
                <span className="mt-1 text-[11px] text-[#574F47]">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE 3 INSPIRED: INTERACTIVE FANNED STUDIO DECK */}
      <FannedProjectDeck projects={highlightProjects} />

      {/* RAPID-SKIM FULL PROJECT ARCHIVE (ALL 15 FOLDERS) */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7 sm:mb-10">
            <div>
              <p className="font-mono-arch text-[11px] uppercase tracking-[0.22em] text-[#6C635A] mb-1.5">
                Complete Project Index
              </p>
              <h2 className="font-serif-display text-3xl sm:text-5xl font-medium text-[#0E0D0C] leading-tight">
                Built for Fast Studio Review
              </h2>
            </div>

            {/* Filter Pills (no visible scrollbar on mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {PROJECT_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                      active
                        ? 'bg-[#0E0D0C] text-[#F7F3EC] shadow-md'
                        : 'gloss-pill text-[#272420] hover:bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.25) }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block gloss-card gloss-sheen rounded-[24px] p-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_-22px_rgba(14,13,12,0.25)]"
                >
                  {/* Adaptive matte frame so any aspect ratio fits cleanly */}
                  <div className="relative aspect-[4/3] rounded-[18px] overflow-hidden bg-[#EADFD1]">
                    <img
                      src={project.cover.src}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C]/55 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0E0D0C]/80 backdrop-blur-md text-[#F7F3EC] font-mono-arch text-[10px] tracking-wider">
                        {project.code}
                      </span>
                      {project.video && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F7F3EC]/90 text-[#0E0D0C] font-mono-arch text-[10px] font-medium">
                          <Play className="w-2.5 h-2.5 fill-current" />
                          3D Video
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#0E0D0C]/75 backdrop-blur-md text-[#F7F3EC] font-mono-arch text-[10px] flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#D8C3A8]" />
                      <span>{project.images.length}</span>
                    </div>
                  </div>

                  <div className="pt-3.5 px-1.5 pb-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-mono-arch text-[10px] uppercase tracking-[0.14em] text-[#6C635A]">
                          {project.category} · {project.year}
                        </p>
                        <h3 className="mt-0.5 font-serif-display text-xl sm:text-2xl font-semibold text-[#0E0D0C] leading-snug group-hover:text-[#574534] transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-[#0E0D0C]/6 group-hover:bg-[#0E0D0C] group-hover:text-[#F7F3EC] flex items-center justify-center shrink-0 transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-[#574F47] line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-0.5 rounded-full bg-[#EADFD1]/85 text-[#272420] text-[10px] font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO WORKSPACE & CV PROFILE (FEATURING IMAGE 4 INSPIRED CURVED DESK ART) */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left: Custom Blueprint-Blue & Cream Curved Ultrawide Studio Desk Art */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[28px] overflow-hidden border border-[#0E0D0C]/10 shadow-[0_28px_80px_-28px_rgba(19,71,176,0.32)] group">
                <img
                  src="/art/studio-desk.jpg"
                  alt="Architect studio desk with curved ultrawide monitor showing 3D building wireframe and CAD floorplan"
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 gloss-dark rounded-2xl px-4 py-3 flex items-center justify-between gap-2 text-[#F7F3EC]">
                  <div>
                    <p className="font-mono-arch text-[10px] uppercase tracking-[0.18em] text-[#D8C3A8]">
                      Digital Drafting Desk
                    </p>
                    <p className="text-xs sm:text-sm font-medium">
                      AutoCAD 2D Plans + SketchUp 3D Massing
                    </p>
                  </div>
                  <Compass className="w-5 h-5 text-[#D8C3A8] shrink-0" />
                </div>
              </div>
            </div>

            {/* Right: Skimmable CV Profile & Interactive Technical Skills */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <p className="font-mono-arch text-[11px] uppercase tracking-[0.22em] text-[#6C635A] mb-1.5">
                  Architect Profile
                </p>
                <h2 className="font-serif-display text-3xl sm:text-5xl font-medium text-[#0E0D0C] leading-tight">
                  {PROFILE.fullName}
                </h2>
                <p className="mt-3 text-sm text-[#574F47] leading-relaxed">
                  {PROFILE.bio}
                </p>
              </div>

              {/* Education & Location badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="gloss-card rounded-2xl p-3.5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0E0D0C] text-[#F7F3EC] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#0E0D0C]">
                      {PROFILE.education.institution}
                    </p>
                    <p className="text-[11px] text-[#574F47]">
                      {PROFILE.education.degree}
                    </p>
                    <p className="font-mono-arch text-[10px] text-[#6C635A] mt-0.5">
                      {PROFILE.education.level} · {PROFILE.education.period}
                    </p>
                  </div>
                </div>

                <div className="gloss-card rounded-2xl p-3.5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EADFD1] text-[#0E0D0C] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#0E0D0C]">
                      SIWES Availability
                    </p>
                    <p className="text-[11px] text-[#574F47]">
                      Based in {PROFILE.location}
                    </p>
                    <p className="font-mono-arch text-[10px] text-[#6C635A] mt-0.5">
                      Site + Studio Ready
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Software Proficiency Selector */}
              <div className="gloss-card rounded-3xl p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono-arch text-[10px] uppercase tracking-[0.18em] text-[#6C635A]">
                    Technical Software Stack
                  </span>
                  <span className="text-[11px] text-[#6C5846] font-medium">
                    Tap to inspect
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PROFILE.technicalSkills.map((skill, idx) => (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setActiveSkill(idx)}
                      className={`px-3 py-2 rounded-xl text-left transition cursor-pointer ${
                        activeSkill === idx
                          ? 'bg-[#0E0D0C] text-[#F7F3EC] shadow-md'
                          : 'bg-[#EADFD1]/65 text-[#272420] hover:bg-[#EADFD1]'
                      }`}
                    >
                      <span className="block text-xs font-semibold">{skill.name}</span>
                      <span
                        className={`block font-mono-arch text-[9px] mt-0.5 ${
                          activeSkill === idx ? 'text-[#D8C3A8]' : 'text-[#6C635A]'
                        }`}
                      >
                        {skill.level.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                {PROFILE.technicalSkills[activeSkill] && (
                  <div className="pt-1 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#0E0D0C]">
                        {PROFILE.technicalSkills[activeSkill].name} ({PROFILE.technicalSkills[activeSkill].level})
                      </span>
                      <span className="font-mono-arch text-[11px] text-[#6C635A]">
                        {PROFILE.technicalSkills[activeSkill].percent}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#EADFD1] overflow-hidden">
                      <motion.div
                        key={PROFILE.technicalSkills[activeSkill].name}
                        initial={{ width: 0 }}
                        animate={{ width: `${PROFILE.technicalSkills[activeSkill].percent}%` }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[#0E0D0C] via-[#4A3E35] to-[#C6A88C]"
                      />
                    </div>
                    <p className="text-xs text-[#574F47] leading-relaxed">
                      {PROFILE.technicalSkills[activeSkill].detail}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Practical Training & Areas of Interest Cards */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {PROFILE.training.map((item) => (
              <div key={item.title} className="gloss-card rounded-3xl p-5 space-y-3">
                <span className="font-mono-arch text-[10px] uppercase tracking-[0.15em] text-[#6C635A]">
                  {item.meta}
                </span>
                <h3 className="font-serif-display text-2xl font-semibold text-[#0E0D0C] leading-snug">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-xs text-[#574F47] leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A88C] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="gloss-card rounded-3xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="font-mono-arch text-[10px] uppercase tracking-[0.15em] text-[#6C635A] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C6A88C]" />
                  <span>Focus &amp; Strengths</span>
                </span>
                <h3 className="mt-2 font-serif-display text-2xl font-semibold text-[#0E0D0C]">
                  Areas of Interest
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {PROFILE.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-full bg-[#0E0D0C] text-[#F7F3EC] text-[11px] font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#0E0D0C]/8">
                <p className="font-mono-arch text-[10px] uppercase tracking-[0.14em] text-[#6C635A] mb-2">
                  Studio Strengths
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PROFILE.softSkills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-full bg-[#EADFD1]/90 text-[#272420] text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE 2 INSPIRED: ANIMATED PIXEL PAVILION OBSIDIAN FOOTER */}
      <StudioFooter />
    </div>
  );
}
