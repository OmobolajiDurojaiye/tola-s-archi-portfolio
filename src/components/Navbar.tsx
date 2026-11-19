import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
import { PROFILE } from '../data/profile';
import { Key } from './Key';
import { hapticTap } from '../lib/perf';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
];

/**
 * Compact floating glass nav (~52px, auto width, max ~620px).
 * - Shrinks 12% after scrolling, hides on scroll-down, springs back on scroll-up
 * - Active link uses a gooey liquid blob (two springs merged by an SVG goo filter)
 */
export function Navbar() {
  const location = useLocation();
  const isProjects = location.pathname.startsWith('/projects');
  const activeIdx = isProjects ? 1 : 0;
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const dy = y - lastY.current;
        setCompact(y > 40);
        if (y < 120) setHidden(false);
        else if (dy > 6) setHidden(true);
        else if (dy < -6) setHidden(false);
        lastY.current = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 pt-3 sm:pt-4 pointer-events-none">
      {/* Goo filter for the liquid indicator */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="g" />
            <feComposite in="SourceGraphic" in2="g" operator="atop" />
          </filter>
        </defs>
      </svg>

      <m.nav
        aria-label="Primary Navigation"
        initial={false}
        animate={{
          y: hidden ? -90 : 0,
          scale: compact ? 0.88 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 170, damping: 22 }}
        style={{ transformOrigin: 'top center' }}
        className="glass pointer-events-auto rounded-[20px] h-[52px] max-w-[620px] w-auto flex items-center gap-2 sm:gap-5 pl-2 pr-1.5"
      >
        <Link
          to="/"
          viewTransition
          onClick={() => hapticTap(6)}
          className="flex items-center gap-2.5 pl-1 pr-1 shrink-0"
          data-cursor="link"
          aria-label="Omotola Durojaiye, home"
        >
          <span
            className="w-9 h-9 rounded-[12px] flex items-center justify-center text-[13px] text-[var(--tone-50)] shrink-0"
            style={{
              background: 'var(--tone-900)',
              boxShadow: '0 3px 0 0 var(--tone-600), inset 0 1px 0 rgba(255,255,255,0.15)',
              fontVariationSettings: '"wght" 720, "wdth" 82',
              letterSpacing: '-0.02em',
            }}
          >
            O.D
          </span>
          <span
            className="hidden md:inline nowrap text-[15px] text-[var(--tone-900)]"
            style={{ fontVariationSettings: '"wght" 640, "wdth" 90', letterSpacing: '-0.025em' }}
          >
            {PROFILE.displayName}
          </span>
        </Link>

        {/* Links + liquid indicator */}
        <div className="relative flex items-center">
          <div className="absolute inset-0 pointer-events-none" style={{ filter: 'url(#goo)' }} aria-hidden="true">
            <div className="relative h-full flex">
              {LINKS.map((l, i) => (
                <div key={l.to} className="relative px-4 h-full">
                  {i === activeIdx && (
                    <>
                      <m.span
                        layoutId="nav-blob"
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                        className="absolute inset-y-[7px] inset-x-0 rounded-[13px]"
                        style={{ background: 'var(--tone-200)' }}
                      />
                      <m.span
                        layoutId="nav-blob-trail"
                        transition={{ type: 'spring', stiffness: 110, damping: 16 }}
                        className="absolute inset-y-[10px] inset-x-[18%] rounded-[12px]"
                        style={{ background: 'var(--tone-200)' }}
                      />
                    </>
                  )}
                  <span className="invisible text-sm nowrap">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {LINKS.map((l, i) => {
            const active = i === activeIdx;
            return (
              <Link
                key={l.to}
                to={l.to}
                viewTransition
                onClick={() => hapticTap(6)}
                data-cursor="link"
                className="relative z-10 px-4 h-[52px] flex items-center text-sm nowrap transition-[color,font-variation-settings] duration-300"
                style={{
                  color: active ? 'var(--tone-900)' : 'color-mix(in srgb, var(--tone-900) 55%, transparent)',
                  fontVariationSettings: active ? '"wght" 650, "wdth" 92' : '"wght" 450, "wdth" 100',
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <Key label="CV" size="sm" icon="download" href={PROFILE.cvUrl} download ariaLabel="Download CV" />
      </m.nav>
    </header>
  );
}
