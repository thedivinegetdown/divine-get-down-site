// src/App.jsx
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import { trackPageview } from './utils/analytics';

// Route-level code splitting (faster first load)
const Home = lazy(() => import('./Home'));

const StillnessScrollPage = lazy(() => import('./pages/StillnessScrollPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const location = useLocation();
  // Analytics: track client-side route changes (only runs if enabled)
  useEffect(() => {
    trackPageview();
  }, [location.pathname, location.hash, location.search]);

  // Light prefetching to make second-click navigation feel instant
  useEffect(() => {
    const canPrefetch = typeof window !== 'undefined' && 'requestIdleCallback' in window;

    const prefetch = () => {
      import('./pages/JourneyPage');
      import('./pages/CommunityPage');
      import('./pages/StillnessScrollPage');
    };

    if (canPrefetch) {
      // eslint-disable-next-line no-undef
      requestIdleCallback(prefetch, { timeout: 1500 });
    } else {
      const t = setTimeout(prefetch, 700);
      return () => clearTimeout(t);
    }

    return undefined;
  }, []);

  return (
    <>
      <Helmet>
        <title>The Divine Get Down — Receive Stillness</title>
        <meta
          name="description"
          content="A fast, modern sanctuary to watch faith-filled videos, find stillness, and subscribe for weekly encouragement."
        />
            <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "The Divine Get Down",
          "url": "https://resplendent-nougat-a2edad.netlify.app/",
          "description":
            "A cinematic sanctuary for stillness, Scripture, and sacred rhythm.",
        })}
      </script>
      </Helmet>

      <ScrollToTop />

      <ErrorBoundary>
        <Suspense fallback={<div style={{ padding: 16, color: '#fff' }}>Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stillness" element={<StillnessScrollPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/community" element={<CommunityPage />} />

            {/* Legacy aliases (safe + friendly) */}
            <Route path="/scroll" element={<Navigate to="/stillness" replace />} />
            <Route path="/inner-rhythm" element={<Navigate to="/community" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
