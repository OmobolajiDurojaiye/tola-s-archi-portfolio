import { DownloadSimple } from '@phosphor-icons/react/dist/csr/DownloadSimple';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { PROFILE } from '../data/profile';
import { hapticTap } from '../lib/perf';

/**
 * Section 6 Redesigned Footer:
 * - Near-black (#0A0A0C) canvas with generous negative space
 * - Oversized "Architecture" word in Ref B depth interlock with cutout building
 * - Plain-text large white links (cobalt hover) for Name, University, Email, Phone, Location, CV
 * - Zero boxes, zero cards, zero borders, zero pills
 */
export function StudioFooter() {
  return (
    <footer className="relative bg-[var(--dark-surface)] text-[var(--light-ink)] overflow-hidden mt-20 sm:mt-32 pt-20 sm:pt-32 pb-16 sm:pb-24">
      {/* Subtle cobalt ambient radial glow behind the cutout building */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[85vw] max-w-[900px] h-[360px] rounded-full blur-[120px] opacity-30"
        style={{
          background: 'radial-gradient(circle, var(--tone-600) 0%, transparent 72%)',
        }}
      />

      {/* Ref B Depth-Interlocked Oversized "Architecture" + Cutout Building */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[400px]">
        {/* Back word layer (sits BEHIND the cutout building) */}
        <div
          aria-hidden="true"
          className="relative z-10 select-none text-center font-bold tracking-[-0.045em] leading-none text-[clamp(3.6rem,15vw,12.5rem)] text-[var(--light-ink)]"
        >
          <span>Archit</span>
          <span className="opacity-20">ec</span>
          <span className="text-[var(--tone-500)]">ture</span>
        </div>

        {/* Overlapping cutout building sitting IN FRONT of the center letters */}
        <picture className="pointer-events-none select-none absolute z-20 w-[86%] max-w-[640px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[44%]">
          <source srcSet="/art/hero-cutout.webp" type="image/webp" />
          <img
            src="/art/hero-cutout.webp"
            alt=""
            width={1200}
            height={675}
            loading="lazy"
            className="w-full h-auto object-contain brightness-95 contrast-110 drop-shadow-[0_32px_50px_rgba(0,0,0,0.85)]"
          />
        </picture>

        {/* Foreground highlight letters overlapping the building edge (true Ref B interlock) */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold tracking-[-0.045em] leading-none text-[clamp(3.6rem,15vw,12.5rem)]"
        >
          <span className="opacity-0">Archit</span>
          <span className="opacity-0">ec</span>
          <span className="text-[var(--tone-500)] drop-shadow-[0_12px_32px_rgba(11,79,219,0.5)]">
            ture
          </span>
        </div>

        {/* Subtle film grain over the visual interlock only */}
        <div aria-hidden="true" className="scene-grain absolute inset-0 z-25" />
      </div>

      {/* Plain-text Contact & Credentials — large, clean, zero boxes/lines/chips */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 sm:px-10 mt-14 sm:mt-24">
        <div className="space-y-4 sm:space-y-5">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[var(--light-ink)]">
            {PROFILE.fullName}
          </p>

          <p className="text-lg sm:text-2xl font-normal tracking-[-0.02em] text-[var(--light-ink)]/70">
            {PROFILE.education.institution} · {PROFILE.education.degree} ({PROFILE.education.level})
          </p>

          <div className="pt-4 sm:pt-6 flex flex-col gap-3 sm:gap-4 items-start">
            <a
              href={PROFILE.emailHref}
              onClick={() => hapticTap(6)}
              className="text-xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--light-ink)] hover:text-[var(--tone-500)] transition-colors break-all inline-flex items-center gap-2"
            >
              <span>{PROFILE.email}</span>
              <ArrowUpRight weight="light" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            </a>

            <a
              href={PROFILE.phoneHref}
              onClick={() => hapticTap(6)}
              className="text-xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--light-ink)] hover:text-[var(--tone-500)] transition-colors"
            >
              {PROFILE.phone}
            </a>

            <p className="text-lg sm:text-2xl font-normal tracking-[-0.02em] text-[var(--light-ink)]/65">
              {PROFILE.location}
            </p>

            <a
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => hapticTap(8)}
              className="mt-4 text-lg sm:text-2xl font-medium tracking-[-0.02em] text-[var(--light-ink)] hover:text-[var(--tone-500)] transition-colors inline-flex items-center gap-2.5"
            >
              <DownloadSimple weight="light" className="w-6 h-6" />
              <span>Download Curriculum Vitae (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
