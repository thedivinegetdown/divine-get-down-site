import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import DivineGetDownTabs from './components/DivineGetDownTabs';
import './App.css';

const Home = lazy(() => import('./Home'));
const StillnessScrollPage = lazy(() => import('./pages/StillnessScrollPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));

function App() {
  useEffect(() => {
    // Enforce a stable document language for assistive tech + SEO.
    document.documentElement.lang = 'en';
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        {/* Skip link for keyboard users (WCAG 2.2) */}
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <header>
          <nav aria-label="Primary">
            <DivineGetDownTabs />
          </nav>
        </header>

        <main id="main-content" role="main" tabIndex={-1}>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stillness" element={<StillnessScrollPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/scroll" element={<Navigate to="/stillness" replace />} />
            </Routes>
          </Suspense>
        </main>

        <footer role="contentinfo" aria-label="Site footer" className="site-footer">
          <p className="visually-hidden">
            The Divine Get Down. Faith-centered stillness, encouragement, and community.
          </p>
        </footer>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
