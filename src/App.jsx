// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Route-level code splitting (faster first load)
const Home = lazy(() => import('./Home'));

const StillnessScrollPage = lazy(() => import('./pages/StillnessScrollPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <>
      <Helmet>
        <title>The Divine Get Down — Receive Stillness</title>
        <meta
          name="description"
          content="A fast, modern sanctuary to watch faith-filled videos, find stillness, and subscribe for weekly encouragement."
        />
      </Helmet>

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
    </>
  );
}

export default App;
