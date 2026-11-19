import { Link, useLocation } from 'react-router-dom';
import { DownloadSimple } from '@phosphor-icons/react/dist/csr/DownloadSimple';
import { PROFILE } from '../data/profile';
import { Magnetic } from './MagneticButton';
import { hapticTap } from '../lib/perf';

/**
 * Clean borderless floating navigation:
 * - NO SIWES Contact button (contact lives in footer as plain text)
 * - NO pills/badges or hairline outlines
 * - Keeps Home, Projects, and CV download with Phosphor Light icon
 */
export function Navbar() {
  const location = useLocation();
  const isProjects = location.pathname.startsWith('/projects');

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 pt-4 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className="max-w-6xl mx-auto gel-nav rounded-full px-5 sm:px-7 py-3 flex items-center justify-between gap-4 pointer-events-auto"
      >
        <Link
          to="/"
          onClick={() => hapticTap(6)}
          className="text-sm sm:text-base font-bold tracking-[-0.03em] text-[var(--ink)] hover:text-[var(--tone-600)] transition-colors"
        >
          Omotola Durojaiye
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            to="/"
            onClick={() => hapticTap(6)}
            className={`text-xs sm:text-sm tracking-tight transition-all ${
              !isProjects
                ? 'font-bold text-[var(--tone-600)] opacity-100'
                : 'font-normal text-[var(--ink)] opacity-55 hover:opacity-100'
            }`}
          >
            Home
          </Link>
          <Link
            to="/projects"
            onClick={() => hapticTap(6)}
            className={`text-xs sm:text-sm tracking-tight transition-all ${
              isProjects
                ? 'font-bold text-[var(--tone-600)] opacity-100'
                : 'font-normal text-[var(--ink)] opacity-55 hover:opacity-100'
            }`}
          >
            Projects
          </Link>
        </div>

        <Magnetic strength={0.22}>
          <a
            href={PROFILE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gel-cobalt rounded-full px-4 py-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-tight transition-transform hover:scale-[1.02]"
          >
            <DownloadSimple weight="light" className="w-4 h-4" />
            <span>CV</span>
          </a>
        </Magnetic>
      </nav>
    </header>
  );
}
