// src/Home.jsx
import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './App.css';

import { YOUTUBE } from './config/youtube';

// ---- Code-splitting (lazy-loaded heavy sections) ----
const NavigationBar = lazy(() => import('./components/NavigationBar'));
const TabContent = lazy(() => import('./components/TabContent'));

// ---- Tabs (source of truth) ----
const TABS = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'watch', label: 'Watch' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'about', label: 'About' },
  { id: 'start', label: 'Start Here' },
];

function Home() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const stickyTabsRef = useRef(null);

  const subscribeUrl = `${YOUTUBE?.channelUrl || 'https://www.youtube.com/@TheDivineGetDown'}?sub_confirmation=1`;

  // Smooth scroll restore to top of content when tab changes
  useEffect(() => {
    const el = document.getElementById('main-content');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeTab]);

  // Add subtle shadow when sticky bar becomes stuck
  useEffect(() => {
    const el = stickyTabsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.classList.add('is-stuck');
        } else {
          el.classList.remove('is-stuck');
        }
      },
      { rootMargin: '-1px 0px 0px 0px', threshold: [1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      {/* Hero / Header */}
      <header aria-label="Site header">
        <motion.div
          className="hero-logo-wrap"
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src="/divine_logo.png"
            width="160"
            height="160"
            alt="The Divine Get Down crest"
            className="hero-logo"
            loading="eager"
            decoding="async"
          />

          <motion.p
            className="hero-subhead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            A sacred rhythm for the weary soul — a place to breathe, remember, and rest in God’s presence.
          </motion.p>

          {/* Primary Funnel CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Link className="primary-cta" to="/stillness">
              Receive the Stillness Scroll
            </Link>
          </motion.div>

          {/* YouTube actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="hero-actions"
          >
            <a className="secondary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
              Watch on YouTube
            </a>
            <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
              Subscribe
            </a>
            <Link className="secondary-cta" to="/community">
              Join Community
            </Link>
          </motion.div>
        </motion.div>

        {/* Sticky bar */}
        <div className="sticky-tabs-sentinel" aria-hidden="true" style={{ height: 1, marginTop: 12 }} />
        <div ref={stickyTabsRef} className="sticky-tabs" role="navigation" aria-label="Primary">
          <Suspense fallback={<NavFallback />}>
            <NavigationBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
          </Suspense>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main" aria-label="Main content area">
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="tab-content-wrap"
          >
            <Suspense fallback={<ContentFallback />}>
              <TabContent activeTab={activeTab} />
            </Suspense>
          </motion.section>
        </AnimatePresence>
      </main>

      {/* Sticky Subscribe (mobile only) */}
      <a
        className="mobile-subscribe"
        href={subscribeUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Subscribe on YouTube"
      >
        Subscribe
      </a>
    </div>
  );
}

function NavFallback() {
  return <div className="fallback-nav">Loading navigation…</div>;
}

function ContentFallback() {
  return <div className="fallback-content">Preparing your sacred space…</div>;
}

export default Home;
