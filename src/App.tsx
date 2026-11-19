import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, AnimatePresence, m } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Enhancements } from './components/Enhancements';
import { HomePage } from './pages/HomePage';
import { usePerfFlags } from './lib/perf';

const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then((mod) => ({ default: mod.ProjectsPage }))
);

function CameraRouteTransitions() {
  const location = useLocation();
  const { reducedMotion } = usePerfFlags();
  const routeKey = location.pathname.startsWith('/projects') ? 'projects' : 'home';

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={routeKey}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.965, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, scale: 1.035, y: -18 }}
        transition={{ type: 'spring', stiffness: 170, damping: 22 }}
        style={{ transformOrigin: 'center top' }}
      >
        <Suspense fallback={<div className="min-h-screen bg-[var(--surface)]" />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </m.div>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <Enhancements />
        <Navbar />
        <CameraRouteTransitions />
      </BrowserRouter>
    </LazyMotion>
  );
}

export default App;
