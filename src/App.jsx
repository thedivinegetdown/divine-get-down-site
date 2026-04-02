// src/App.jsx
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import { trackPageview } from './utils/analytics';
import './App.css';

// Route-level code splitting (faster first load)
const Home = lazy(() => import('./Home'));

const StillnessScrollPage = lazy(() => import('./pages/StillnessScrollPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageview();
  }, [location.pathname, location.hash, location.search]);

  useEffect(() => {
    const canPrefetch = typeof window !== 'undefined' && 'requestIdleCallback' in window;

    const prefetch = () => {
      import('./pages/JourneyPage');
      import('./pages/CommunityPage');
      import('./pages/StillnessScrollPage');
    };

    if (canPrefetch) {
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
        <title>The Divine Get Down | Faith-Based Videos & Speaking Services</title>
        <meta
          name="description"
          content="The Divine Get Down provides non-downloadable faith-based videos, motivational and educational speaking services, and spiritual encouragement."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'The Divine Get Down',
            url: 'https://thedivinegetdown.com',
            description:
              'Faith-based platform offering non-downloadable videos in the field of religion, motivational speaking services, educational speaking services, and spiritual encouragement.',
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
