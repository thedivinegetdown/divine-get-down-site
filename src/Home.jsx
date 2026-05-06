// src/Home.jsx
import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './App.css';

import { YOUTUBE } from './config/youtube';

const NavigationBar = lazy(() => import('./components/NavigationBar'));
const TabContent = lazy(() => import('./components/TabContent'));

const TABS = [
  { id: 'welcome', label: 'Welcome' },

  // 🔥 KEEP THIS SECOND (VISIBLE IMMEDIATELY)
  { id: 'experience', label: 'Experience' },

  { id: 'watch', label: 'Watch' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'services', label: 'Services' },
  { id: 'start', label: 'Scroll Vault' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

function Home() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const location = useLocation();
  const stickyTabsRef = useRef(null);

  useEffect(() => {
    const hash = (location.hash || '').replace('#', '').trim();
    if (!hash) return;
    const exists = TABS.some((t) => t.id === hash);
    if (exists) setActiveTab(hash);
  }, [location.hash]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const next = `#${activeTab}`;
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next);
    }
  }, [activeTab]);

  useEffect(() => {
    const el = document.getElementById('main-content');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeTab]);

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

  const subscribeUrl = `${YOUTUBE?.channelUrl || 'https://www.youtube.com/@TheDivineGetDown'}?sub_confirmation=1`;

  return (
    <div className="App" aria-live="polite">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header aria-label="Site header">
        <motion.div
          className="hero-logo-wrap"
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <picture>
            <source srcSet="/divine_logo.webp" type="image/webp" />
            <img
              src="/divine_logo.png"
              width="160"
              height="160"
              alt="The Divine Get Down crest"
              className="hero-logo"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          <motion.p
            className="hero-subhead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            A sacred rhythm for the weary soul — a place to breathe, remember, and rest in God's presence.
          </motion.p>
        </motion.div>

        <div className="top-menu-anchor" aria-hidden="true" />

        <div
          ref={stickyTabsRef}
          className="sticky-tabs top-site-menu"
          role="navigation"
          aria-label="Primary"
        >
          <Suspense fallback={<NavFallback />}>
            <NavigationBar
              tabs={TABS}
              activeTab={activeTab}
              onTabChange={(id) => {
                if (id === 'experience') {
                  window.location.href = '/reset-experience';
                } else {
                  setActiveTab(id);
                }
              }}
            />
          </Suspense>
        </div>

        <section className="compliance-shell compliance-shell--after-menu" aria-label="Services">
          <div className="compliance-card compliance-card--primary">
            <p className="compliance-kicker">Faith-Based Media, Teaching, and Speaking</p>
            <h1 className="compliance-title">The Divine Get Down</h1>
            <p className="compliance-copy">
              The Divine Get Down is a faith-based platform offering video content,
              spiritual encouragement, motivational speaking, educational teaching,
              and creative collaboration designed to inspire reflection, renewal,
              and connection with God.
            </p>

            <div className="compliance-actions">
              <button
                type="button"
                className="primary-cta compliance-button"
                onClick={() => setActiveTab('services')}
              >
                View Services
              </button>

              <button
                type="button"
                className="secondary-cta compliance-button"
                onClick={() => setActiveTab('contact')}
              >
                Speaking & Business Inquiries
              </button>
            </div>
          </div>
        </section>
      </header>

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