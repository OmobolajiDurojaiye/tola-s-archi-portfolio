import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { PROFILE } from '../data/profile';
import { CardBackground } from './CardBackground';
import { Key } from './Key';
import { hapticTap } from '../lib/perf';

/**
 * Footer in warm --tone-900 (#1C130E) with --tone-300 text and --tone-500 highlights:
 * - Variant E ("beam") diagonal light-beam background
 * - Oversized "Architecture" word in Ref B depth interlock with cutout building
 * - Large plain-text contact links with underline-draw hover + magnetic extruded CV key
 * - Zero boxes, zero borders
 */
export function StudioFooter() {
  const setUnderlineOrigin = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--ux', `${((e.clientX - r.left) / r.width) * 100}%`);
  };

  return (
    <footer className="relative bg-[var(--tone-900)] text-[var(--tone-300)] overflow-hidden mt-20 sm:mt-32 pt-20 sm:pt-32 pb-16 sm:pb-24 dark-beam">
      {/* Variant E: Slow diagonal light beam across the footer */}
      <CardBackground variant="beam" />

      {/* Warm umber ambient radial glow behind the cutout building */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[85vw] max-w-[900px] h-[360px] rounded-full blur-[120px] opacity-35"
        style={{
          background: 'radial-gradient(circle, var(--tone-600) 0%, transparent 72%)',
        }}
      />

      {/* Ref B Depth-Interlocked Oversized "Architecture" + Cutout Building */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[400px]">
        {/* Back word layer (sits BEHIND the cutout building) */}
        <div
          aria-hidden="true"
          className="relative z-10 select-none text-center leading-none text-[clamp(3.4rem,14.5vw,12rem)] text-[var(--tone-100)]"
          style={{ fontVariationSettings: '"wght" 760, "wdth" 82', letterSpacing: '-0.045em' }}
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
            className="w-full h-auto object-contain brightness-95 contrast-105 drop-shadow-[0_32px_50px_rgba(0,0,0,0.85)]"
          />
        </picture>

        {/* Foreground highlight letters overlapping the building edge (Ref B interlock) */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none text-[clamp(3.4rem,14.5vw,12rem)]"
          style={{ fontVariationSettings: '"wght" 760, "wdth" 82', letterSpacing: '-0.045em' }}
        >
          <span className="opacity-0">Archit</span>
          <span className="opacity-0">ec</span>
          <span className="text-[var(--tone-500)] drop-shadow-[0_12px_32px_rgba(28,19,14,0.85)]">
            ture
          </span>
        </div>

        <div aria-hidden="true" className="scene-grain absolute inset-0 z-25" />
      </div>

      {/* Plain-text Contact & Credentials — large, clean, zero boxes */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 sm:px-10 mt-14 sm:mt-24">
        <div className="space-y-4 sm:space-y-5">
          <p
            className="text-2xl sm:text-4xl lg:text-5xl text-[var(--tone-100)]"
            style={{ fontVariationSettings: '"wght" 680, "wdth" 90', letterSpacing: '-0.035em' }}
          >
            {PROFILE.fullName}
          </p>

          <p className="text-lg sm:text-2xl text-[var(--tone-300)]/80">
            {PROFILE.education.institution} · {PROFILE.education.degree} ({PROFILE.education.level})
          </p>

          <div className="pt-4 sm:pt-6 flex flex-col gap-3.5 sm:gap-4 items-start">
            <a
              href={PROFILE.emailHref}
              onPointerEnter={setUnderlineOrigin}
              onClick={() => hapticTap(6)}
              data-cursor="link"
              className="link-draw email-wrap text-xl sm:text-3xl text-[var(--tone-100)] hover:text-[var(--tone-500)] transition-colors inline-flex items-center gap-2"
              style={{ fontVariationSettings: '"wght" 560, "wdth" 94', letterSpacing: '-0.02em' }}
            >
              <span>{PROFILE.email}</span>
              <ArrowUpRight weight="light" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            </a>

            <a
              href={PROFILE.phoneHref}
              onPointerEnter={setUnderlineOrigin}
              onClick={() => hapticTap(6)}
              data-cursor="link"
              className="link-draw nowrap text-xl sm:text-3xl text-[var(--tone-100)] hover:text-[var(--tone-500)] transition-colors"
              style={{ fontVariationSettings: '"wght" 560, "wdth" 94', letterSpacing: '-0.02em' }}
            >
              {PROFILE.phone}
            </a>

            <p className="text-lg sm:text-2xl text-[var(--tone-300)]/75">
              {PROFILE.location}
            </p>

            <div className="pt-4">
              <Key
                label="Download Curriculum Vitae"
                variant="secondary"
                icon="download"
                href={PROFILE.cvUrl}
                download
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
