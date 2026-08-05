// src/App.jsx
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import { APP_METADATA } from './content/appMetadata';
import { trackPageView } from './utils/analytics';
import './App.css';

const GOOGLE_SITE_VERIFICATION = process.env.REACT_APP_GOOGLE_SITE_VERIFICATION?.trim();
const BING_SITE_VERIFICATION = process.env.REACT_APP_BING_SITE_VERIFICATION?.trim();

// Route-level code splitting (faster first load)
const Home = lazy(() => import('./Home'));

const StillnessScrollPage = lazy(() => import('./pages/StillnessScrollPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ScrollVaultPage = lazy(() => import('./pages/ScrollVaultPage'));
const ResetExperiencePage = lazy(() => import('./pages/ResetExperiencePage'));

// 🔥 ADD THIS (ACCESS PAGE)
const ExperienceAccessPage = lazy(() => import('./pages/ExperienceAccessPage'));

const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const connection =
      window.navigator.connection ||
      window.navigator.mozConnection ||
      window.navigator.webkitConnection;
    const isConstrained =
      connection?.saveData ||
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g';
    const canPrefetch = 'requestIdleCallback' in window;

    if (!canPrefetch || isConstrained) return undefined;

    const prefetch = () => {
      import('./pages/JourneyPage');
      import('./pages/CommunityPage');
      import('./pages/ScrollVaultPage');
      import('./pages/StillnessScrollPage');
      import('./pages/ResetExperiencePage');
      import('./pages/ExperienceAccessPage'); // 🔥 ADD THIS
    };

    const idleId = window.requestIdleCallback(prefetch, { timeout: 1500 });

    return () => window.cancelIdleCallback?.(idleId);
  }, []);

  return (
    <>
      <Helmet>
        <title>{APP_METADATA.title}</title>
        <meta
          name="description"
          content={APP_METADATA.description}
        />
        {GOOGLE_SITE_VERIFICATION ? (
          <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
        ) : null}
        {BING_SITE_VERIFICATION ? (
          <meta name="msvalidate.01" content={BING_SITE_VERIFICATION} />
        ) : null}
        <script type="application/ld+json">
          {JSON.stringify(APP_METADATA.websiteStructuredData)}
        </script>
      </Helmet>

      <ScrollToTop />

      <ErrorBoundary>
        <Suspense
          fallback={(
            <div role="status" aria-live="polite" style={{ padding: 16, color: '#fff' }}>
              Loading…
            </div>
          )}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stillness" element={<StillnessScrollPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/vault" element={<ScrollVaultPage />} />
            <Route path="/reset-experience" element={<ResetExperiencePage />} />

            {/* 🔥 THIS IS THE KEY ADD */}
            <Route path="/experience-access" element={<ExperienceAccessPage />} />

            <Route path="/scroll" element={<Navigate to="/stillness" replace />} />
            <Route path="/inner-rhythm" element={<Navigate to="/community" replace />} />
            <Route path="/reset" element={<Navigate to="/reset-experience" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
