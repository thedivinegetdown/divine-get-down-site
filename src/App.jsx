// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Home from './Home';

import StillnessScrollPage from './pages/StillnessScrollPage';
import ThankYouPage from './pages/ThankYouPage';
import JourneyPage from './pages/JourneyPage';
import CommunityPage from './pages/CommunityPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Helmet>
        <title>The Divine Get Down — Sanctuary of Presence</title>
        <meta
          name="description"
          content="A sacred rhythm for the weary soul — a place to breathe, remember, and rest in God’s presence."
        />
      </Helmet>

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
    </>
  );
}

export default App;
