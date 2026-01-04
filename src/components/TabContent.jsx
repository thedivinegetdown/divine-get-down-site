// src/components/TabContent.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { YOUTUBE } from '../config/youtube';
import LiteYouTube from './youtube/LiteYouTube';
import ShortsGrid from './youtube/ShortsGrid';

/**
 * TabContent
 * - Accessible tab panels (role="tabpanel")
 * - Per-tab SEO via Helmet
 * - Lazy-loads heavy media by only rendering it on the active tab
 */

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://thedivinegetdown.com';

export default function TabContent({ activeTab }) {
  const meta = getTabMeta(activeTab);
  const canonical = `${SITE_URL}${meta.path}`;

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Divine Get Down',
    url: SITE_URL,
    sameAs: [YOUTUBE.channelUrl],
  };

  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: meta.videoTitle || 'Featured Video',
    description: meta.videoDescription || meta.description,
    thumbnailUrl: meta.ogImage ? [meta.ogImage] : undefined,
    uploadDate: meta.uploadDate || '2025-01-01',
    embedUrl: meta.videoId ? `https://www.youtube.com/embed/${meta.videoId}` : undefined,
    contentUrl: meta.videoId ? `https://www.youtube.com/watch?v=${meta.videoId}` : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'The Divine Get Down',
      url: SITE_URL,
    },
  };

  const subscribeUrl = `${YOUTUBE.channelUrl}?sub_confirmation=1`;

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:url" content={canonical} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.ogTitle} />
        <meta name="twitter:description" content={meta.ogDescription} />
        <meta name="twitter:image" content={meta.ogImage} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
        {activeTab === 'watch' && (
          <script type="application/ld+json">{JSON.stringify(videoJsonLd)}</script>
        )}
      </Helmet>

      {activeTab === 'welcome' && (
        <TabPanel id="welcome" heading="Welcome">
          <section className="panel-block">
            <h2 className="panel-title">Stillness. Scripture. Strength.</h2>
            <p className="panel-lede">
              If you’ve been carrying weight you can’t explain, you may find something steady here.
              You’re welcome to watch the latest message at your own pace. Nothing else is required.
            </p>

            <div className="cta-row">
              <a
                className="primary-cta"
                href={`https://www.youtube.com/watch?v=${YOUTUBE.featuredVideoId}`}
                target="_blank"
                rel="noreferrer"
              >
                Watch Latest
              </a>
              <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
                Subscribe
              </a>
            </div>

            <div className="bottom-cta">
              <h3>Stay connected, if it helps</h3>
              <p>Occasional faith‑centered videos and Shorts—shared quietly, without pressure.</p>
              <div className="bottom-cta-actions">
                <a className="secondary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                  Watch on YouTube
                </a>
                <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
                  Subscribe
                </a>
              </div>
            </div>

            <PinnedLinks />

            <StartHereMini />
          </section>
        </TabPanel>
      )}

      {activeTab === 'watch' && (
        <TabPanel id="watch" heading="Watch">
          <section className="panel-block">
            <h2 className="panel-title">Featured message</h2>
            <p className="panel-lede">A short, powerful reset you can return to anytime.</p>

            <LiteYouTube videoId={YOUTUBE.featuredVideoId} title="The Divine Get Down — Featured" />

            <div className="cta-row" style={{ marginTop: 12 }}>
              <a
                className="primary-cta"
                href={`https://www.youtube.com/watch?v=${YOUTUBE.featuredVideoId}`}
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube
              </a>
              <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
                Subscribe
              </a>
              <a className="secondary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                View Channel
              </a>
            </div>

            <div className="playlist-block">
              <h3>Playlists</h3>
              <p className="muted">
                Replace the playlist IDs in <code>src/config/youtube.js</code> to instantly update these links.
              </p>
              <div className="pinned-links">
                <a
                  className="pinned-link"
                  href={`https://www.youtube.com/playlist?list=${YOUTUBE.playlistIds.longform}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden="true">▶️</span>
                  <span>
                    <strong>Longform Playlist</strong>
                    <div className="muted">Deep, cinematic messages and prayers.</div>
                  </span>
                </a>
                <a
                  className="pinned-link"
                  href={`https://www.youtube.com/playlist?list=${YOUTUBE.playlistIds.shorts}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden="true">⚡</span>
                  <span>
                    <strong>Shorts Playlist</strong>
                    <div className="muted">Quick resets you can watch daily.</div>
                  </span>
                </a>
              </div>
            </div>

            <div className="bottom-cta">
              <h3>Subscribe + turn on notifications</h3>
              <p>So you don’t miss the next upload.</p>
              <div className="bottom-cta-actions">
                <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
                  Subscribe
                </a>
                <a className="secondary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                  Watch on YouTube
                </a>
              </div>
            </div>

            <PinnedLinks />
            <StartHereMini />
          </section>
        </TabPanel>
      )}

      {activeTab === 'shorts' && (
        <TabPanel id="shorts" heading="Shorts">
          <section className="panel-block">
            <h2 className="panel-title">Quick resets</h2>
            <p className="panel-lede">Shorts you can watch in under a minute—designed to bring you back to peace.</p>

            <ShortsGrid videoIds={YOUTUBE.shortsVideoIds} />

            <div className="muted" style={{ marginTop: 10 }}>
              Tip: paste 6–12 Shorts IDs in <code>src/config/youtube.js</code>.
            </div>

            <PinnedLinks />
            <StartHereMini />
          </section>
        </TabPanel>
      )}

      {activeTab === 'about' && (
        <TabPanel id="about" heading="About">
          <section className="panel-block">
            <h2 className="panel-title">What this is</h2>
            <p className="panel-lede">
              A clean, faith-filled space for people who want scripture-centered encouragement—without hype.
            </p>

            <div className="about-grid">
              <div className="about-card">
                <h3>Mission</h3>
                <p>Help people find stillness in God, renew their mind, and keep walking—even when life feels heavy.</p>
              </div>
              <div className="about-card">
                <h3>What to expect</h3>
                <ul>
                  <li>Scripture-driven Shorts</li>
                  <li>Cinematic longform messages</li>
                  <li>Prayers for clarity, strength, and peace</li>
                </ul>
              </div>
              <div className="about-card">
                <h3>Credibility</h3>
                <p>Built through years of creative discipline and a consistent practice of faith—showing up, daily.</p>
              </div>
            </div>

            <div className="cta-row" style={{ marginTop: 14 }}>
              <a className="primary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
              <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
                Subscribe
              </a>
            </div>

            <PinnedLinks />
            <StartHereMini />
          </section>
        </TabPanel>
      )}

      {activeTab === 'start' && (
        <TabPanel id="start" heading="Start Here">
          <section className="panel-block">
            <h2 className="panel-title">Receive the Stillness Scroll</h2>
            <p className="panel-lede">
              If life has felt loud or uncertain, this may help you get oriented. A simple, faith‑centered moment you can visit once—or return to when it’s helpful.
            </p>

            <div className="cta-row">
              <a
                className="primary-cta"
                href={YOUTUBE.emailCaptureUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get the Scroll
              </a>
              <a className="secondary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
            </div>

            <div className="muted" style={{ marginTop: 10 }}>
              Placeholder: update <code>emailCaptureUrl</code> in <code>src/config/youtube.js</code> when your form is ready.
            </div>

            <PinnedLinks />
            <StartHereMini />
          </section>
        </TabPanel>
      )}
    </>
  );
}

TabContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

/* ---------------------
   Accessible Tab Panel
   --------------------- */
function TabPanel({ id, heading, children }) {
  return (
    <section
      id={`panel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
      className="tabpanel"
    >
      <h1>{heading}</h1>
      <div className="panel-inner">{children}</div>
    </section>
  );
}

TabPanel.propTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node,
};

function PinnedLinks() {
  return (
    <div className="panel-footer">
      <div className="pinned-links" aria-label="Pinned links">
        <a className="pinned-link" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
          <span aria-hidden="true">🔗</span>
          <span>
            <strong>YouTube Channel</strong>
            <div className="muted">Tap to watch more videos.</div>
          </span>
        </a>
        <a className="pinned-link" href={YOUTUBE.emailCaptureUrl} target="_blank" rel="noreferrer">
          <span aria-hidden="true">📩</span>
          <span>
            <strong>Receive the Stillness Scroll</strong>
            <div className="muted">Start here when life feels loud.</div>
          </span>
        </a>
      </div>
    </div>
  );
}

function StartHereMini() {
  return (
    <div className="panel-footer">
      <div className="start-here-mini">
        <p>
          <strong>If life feels loud, start here →</strong> Receive the Stillness Scroll
        </p>
        <a className="secondary-cta" href={YOUTUBE.emailCaptureUrl} target="_blank" rel="noreferrer">
          Get the Scroll
        </a>
      </div>
    </div>
  );
}

function getTabMeta(tabId) {
  const baseTitle = 'The Divine Get Down';
  const ogImage = `${SITE_URL}/divine_logo.png`;

  switch (tabId) {
    case 'watch':
      return {
        path: '/?tab=watch',
        title: `Watch | ${baseTitle}`,
        description:
          'Watch the featured message, explore playlists, and subscribe for faith-filled videos that bring peace and clarity.',
        ogTitle: `Watch | ${baseTitle}`,
        ogDescription:
          'Watch the featured message, explore playlists, and subscribe for weekly encouragement.',
        ogImage,
        videoId: YOUTUBE.featuredVideoId,
        videoTitle: 'The Divine Get Down — Featured Video',
        videoDescription:
          'A featured message from The Divine Get Down — faith-filled encouragement designed to bring stillness and strength.',
        uploadDate: '2025-01-01',
      };

    case 'shorts':
      return {
        path: '/?tab=shorts',
        title: `Shorts | ${baseTitle}`,
        description:
          'Short, scripture-centered encouragement you can watch in under a minute—designed to reset your mind and strengthen your spirit.',
        ogTitle: `Shorts | ${baseTitle}`,
        ogDescription: 'Quick, faith-filled resets you can watch daily.',
        ogImage,
      };

    case 'about':
      return {
        path: '/?tab=about',
        title: `About | ${baseTitle}`,
        description:
          'A clean, faith-filled space for scripture-centered encouragement—Shorts, longform messages, and prayers to help you keep walking.',
        ogTitle: `About | ${baseTitle}`,
        ogDescription: 'Why this exists and what to expect.',
        ogImage,
      };

    case 'start':
      return {
        path: '/?tab=start',
        title: `Start Here | ${baseTitle}`,
        description:
          'Receive the Stillness Scroll and start with a simple, faith-filled reset you can return to anytime life feels loud.',
        ogTitle: `Start Here | ${baseTitle}`,
        ogDescription: 'Receive the Stillness Scroll — a simple reset for your week.',
        ogImage,
      };

    case 'welcome':
    default:
      return {
        path: '/',
        title: `${baseTitle} — Receive Stillness`,
        description:
          'Watch the latest faith-filled videos, subscribe for weekly encouragement, and start with the Stillness Scroll when life feels loud.',
        ogTitle: baseTitle,
        ogDescription: 'Watch the latest videos and receive the Stillness Scroll.',
        ogImage,
      };
  }
}
