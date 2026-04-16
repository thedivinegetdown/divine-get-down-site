// src/Home.jsx
import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

import { YOUTUBE } from './config/youtube';

const NavigationBar = lazy(() => import('./components/NavigationBar'));
const TabContent = lazy(() => import('./components/TabContent'));

const TABS = [
  { id: 'welcome', label: 'Welcome' },
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
        <div ref={stickyTabsRef} className="sticky-tabs top-site-menu" role="navigation" aria-label="Primary">
          <Suspense fallback={<NavFallback />}>
            <NavigationBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
          </Suspense>
        </div>

        <section className="compliance-shell compliance-shell--after-menu" aria-label="Services">
          <div className="compliance-card compliance-card--primary">
            <p className="compliance-kicker">Faith-Based Media, Teaching, and Speaking</p>
            <h1 className="compliance-title">The Divine Get Down</h1>
            <p className="compliance-copy">
              The Divine Get Down is a faith-based platform offering video content, spiritual encouragement,
              motivational speaking, educational teaching, and creative collaboration designed to inspire reflection,
              renewal, and connection with God.
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

          <div className="compliance-grid">
            <div className="compliance-card">
              <h2>Video Content</h2>
              <ul className="compliance-list">
                <li>Non-downloadable faith-based videos focused on spiritual growth, reflection, and renewal</li>
                <li>Inspirational media created to encourage peace, stillness, and purpose</li>
                <li>Scripture-centered visual messages and movement-based encouragement</li>
              </ul>
            </div>

            <div className="compliance-card">
              <h2>Speaking & Teaching</h2>
              <ul className="compliance-list">
                <li>Motivational speaking services</li>
                <li>Educational and faith-based teaching sessions</li>
                <li>Collaborations, workshops, interviews, and media appearances</li>
              </ul>
            </div>
          </div>

          {/* USPTO-friendly commerce signal – direct association for speaking & teaching services */}
          <div className="compliance-card" style={{ marginTop: '24px', background: 'rgba(255, 240, 150, 0.08)', borderColor: 'rgba(255, 217, 90, 0.3)' }}>
            <h3>Bring The Divine Get Down to Your Event or Group</h3>
            <p>Motivational speaking, educational teaching sessions, workshops, and faith-centered collaborations are available now. Invite us to speak or partner on content.</p>
            <button
              type="button"
              className="primary-cta compliance-button"
              onClick={() => setActiveTab('contact')}
              style={{ marginTop: '12px' }}
            >
              Inquire About Speaking or Collaboration
            </button>
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
