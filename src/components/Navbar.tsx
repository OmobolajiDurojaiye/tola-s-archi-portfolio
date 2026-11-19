import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileDown } from 'lucide-react';
import { PROFILE } from '../data/profile';

export function Navbar() {
  const location = useLocation();
  const isProjects = location.pathname.startsWith('/projects');

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className="max-w-6xl mx-auto gloss-pill rounded-full px-3 sm:px-5 py-2 flex items-center justify-between gap-2 pointer-events-auto"
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <span className="w-8 h-8 rounded-full bg-[#0E0D0C] text-[#F7F3EC] flex items-center justify-center font-serif-display text-sm tracking-wider shadow-inner">
            O.D
          </span>
          <div className="leading-tight">
            <span className="block text-xs sm:text-sm font-semibold tracking-tight text-[#0E0D0C]">
              Omotola Durojaiye
            </span>
            <span className="hidden sm:block font-mono-arch text-[10px] uppercase tracking-[0.16em] text-[#6C635A]">
              Architecture · 300L
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1 bg-[#EADFD1]/70 p-1 rounded-full border border-white/70">
          {[
            { label: 'Home', to: '/', active: !isProjects },
            { label: 'Projects', to: '/projects', active: isProjects },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                item.active ? 'text-[#F7F3EC]' : 'text-[#272420] hover:text-[#0E0D0C]'
              }`}
            >
              {item.active && (
                <motion.span
                  layoutId="nav-active-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-[#0E0D0C] shadow-sm"
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={PROFILE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#0E0D0C] bg-white/75 hover:bg-white border border-[#C6A88C]/35 transition"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>
          <a
            href={PROFILE.emailHref}
            className="gloss-black-btn gloss-sheen inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium text-[#F7F3EC] hover:opacity-95 transition"
          >
            <span className="hidden sm:inline">SIWES</span>
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D8C3A8]" />
          </a>
        </div>
      </nav>
    </header>
  );
}
