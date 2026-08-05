// src/Home.jsx
import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './App.css';

import { HOME_CONTENT } from './content/home';
import { EXPERIENCE_TAB_ID, HOME_TABS } from './content/navigation';
import { SITE } from './content/site';
import { YOUTUBE } from './content/youtube';

const NavigationBar = lazy(() => import('./components/NavigationBar'));
const TabContent = lazy(() => import('./components/TabContent'));

function Home() {
  const [activeTab, setActiveTab] = useState(HOME_TABS[0].id);
  const location = useLocation();
  const stickyTabsRef = useRef(null);
  const previousTabRef = useRef(activeTab);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const hash = (location.hash || '').replace('#', '').trim();
    if (!hash) return;
    const exists = HOME_TABS.some((t) => t.id === hash);
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
    if (previousTabRef.current === activeTab) return;
    previousTabRef.current = activeTab;

    const el = document.getElementById('main-content');
    if (el) {
      el.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }, [activeTab, shouldReduceMotion]);

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

  const subscribeUrl = `${YOUTUBE.channelUrl}?sub_confirmation=1`;

  return (
    <div className="App">
      <header aria-label="Site header">
        <motion.div
          className="hero-logo-wrap"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: 'easeOut' }}
        >
          <picture>
            <source srcSet={SITE.logo.webp} type="image/webp" />
            <img
              src={SITE.logo.png}
              width={SITE.logo.width}
              height={SITE.logo.height}
              alt={SITE.logo.alt}
              className="hero-logo"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          <motion.p
            className="hero-subhead"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.35,
              duration: shouldReduceMotion ? 0 : 0.6,
            }}
          >
            {HOME_CONTENT.hero.tagline}
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
              tabs={HOME_TABS}
              activeTab={activeTab}
              onTabChange={(id) => {
                if (id === EXPERIENCE_TAB_ID) {
                  window.location.href = SITE.links.resetExperience;
                } else {
                  setActiveTab(id);
                }
              }}
            />
          </Suspense>
        </div>

        <section
          className="compliance-shell compliance-shell--after-menu"
          aria-label={HOME_CONTENT.compliance.ariaLabel}
        >
          <div className="compliance-card compliance-card--primary">
            <p className="compliance-kicker">{HOME_CONTENT.compliance.kicker}</p>
            <h1 className="compliance-title">{HOME_CONTENT.compliance.title}</h1>
            <p className="compliance-copy">
              {HOME_CONTENT.compliance.description}
            </p>

            <div className="compliance-actions">
              <button
                type="button"
                className="primary-cta compliance-button"
                onClick={() => setActiveTab('services')}
              >
                {HOME_CONTENT.compliance.servicesButton}
              </button>

              <button
                type="button"
                className="secondary-cta compliance-button"
                onClick={() => setActiveTab('contact')}
              >
                {HOME_CONTENT.compliance.inquiriesButton}
              </button>
            </div>
          </div>
        </section>
      </header>

      <main id="main-content" role="main" aria-label="Main content area" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' }}
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
        aria-label={HOME_CONTENT.mobileSubscribe.ariaLabel}
      >
        {HOME_CONTENT.mobileSubscribe.label}
      </a>
    </div>
  );
}

function NavFallback() {
  return (
    <div className="fallback-nav" role="status" aria-live="polite">
      {HOME_CONTENT.fallbacks.navigation}
    </div>
  );
}

function ContentFallback() {
  return (
    <div className="fallback-content" role="status" aria-live="polite">
      {HOME_CONTENT.fallbacks.content}
    </div>
  );
}

export default Home;
