// src/components/TabContent.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { YOUTUBE } from '../config/youtube';
import LiteYouTube from './youtube/LiteYouTube';
import ShortsGrid from './youtube/ShortsGrid';

const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://thedivinegetdown.com';
const CONTACT_EMAIL = 'thedivinegetdown@gmail.com';

export default function TabContent({ activeTab }) {
  const meta = getTabMeta(activeTab);
  const canonical = `${SITE_URL}${meta.path}`;
  const subscribeUrl = `${YOUTUBE.channelUrl}?sub_confirmation=1`;
  const emailHref = `mailto:${CONTACT_EMAIL}?subject=The%20Divine%20Get%20Down%20Inquiry`;

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Divine Get Down',
    url: SITE_URL,
    email: CONTACT_EMAIL,
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

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:url" content={canonical} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.ogTitle} />
        <meta name="twitter:description" content={meta.ogDescription} />
        <meta name="twitter:image" content={meta.ogImage} />

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
              If you've been carrying weight you can't explain—this space is for you. Watch the latest message,
              subscribe for weekly encouragement, and enter the Scroll Vault when you need a deeper reset.
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

            <div className="uspto-panel-grid">
              <div className="uspto-panel-card">
                <h3>Faith-Based Video Content</h3>
                <p>
                  The Divine Get Down shares non-downloadable online videos centered on faith, reflection,
                  movement, Scripture, and spiritual renewal.
                </p>
              </div>
              <div className="uspto-panel-card">
                <h3>Speaking & Collaboration</h3>
                <p>
                  The platform also offers motivational speaking, educational teaching, interviews, collaborations,
                  and faith-centered media opportunities.
                </p>
              </div>
            </div>

            <PinnedLinks emailHref={emailHref} />
            <StartHereMini />
          </section>
        </TabPanel>
      )}

      {activeTab === 'services' && (
        <TabPanel id="services" heading="Services">
          <section className="panel-block">
            <h2 className="panel-title">What We Offer at The Divine Get Down</h2>
            <p className="panel-lede">
              The Divine Get Down provides faith-based content, movement, and speaking experiences designed to inspire
              spiritual growth, reflection, and connection.
            </p>

            <div className="uspto-panel-grid">
              <div className="uspto-panel-card">
                <h3>Video Content</h3>
                <ul className="uspto-list">
                  <li>Non-downloadable video content focused on faith, purpose, and spiritual awareness</li>
                  <li>Guided movement and reflection experiences</li>
                  <li>Inspirational and faith-based media designed to encourage renewal and clarity</li>
                </ul>
              </div>

              <div className="uspto-panel-card">
                <h3>Speaking & Teaching</h3>
                <ul className="uspto-list">
                  <li>Motivational speaking services</li>
                  <li>Educational and faith-based teaching sessions</li>
                  <li>Collaborations, workshops, and media appearances</li>
                </ul>
              </div>
            </div>

            <p className="muted" style={{ marginTop: 18 }}>
              Explore this platform for faith-centered messages, videos, and speaking opportunities.
            </p>

            <div className="cta-row">
              <a className="primary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
              <button
                type="button"
                className="secondary-cta compliance-button"
                onClick={() => {
                  if (typeof window !== 'undefined') window.location.hash = '#contact';
                }}
              >
                Contact The Divine Get Down
              </button>
            </div>
          </section>
        </TabPanel>
      )}

      {activeTab === 'watch' && (
        <TabPanel id="watch" heading="Watch">
          <section className="panel-block">
            <h2 className="panel-title">Featured Message</h2>
            <p className="panel-lede">
              Watch the latest faith-filled video from The Divine Get Down.
            </p>

            <div className="yt-lite-wrap">
              <LiteYouTube id={YOUTUBE.featuredVideoId} title="The Divine Get Down featured video" />
            </div>

            <div className="cta-row">
              <a className="primary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                Open YouTube Channel
              </a>
              <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
                Subscribe
              </a>
            </div>

            <PinnedLinks emailHref={emailHref} />
          </section>
        </TabPanel>
      )}

      {activeTab === 'shorts' && (
        <TabPanel id="shorts" heading="Shorts">
          <section className="panel-block">
            <h2 className="panel-title">Daily Scripture Resets</h2>
            <p className="panel-lede">
              Short, scripture-centered encouragement designed to reset your mind and strengthen your spirit.
            </p>

            <ShortsGrid items={YOUTUBE.shorts || []} />

            <div className="cta-row">
              <a className="primary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                Watch More Shorts
              </a>
              <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
                Subscribe
              </a>
            </div>
          </section>
        </TabPanel>
      )}

      {activeTab === 'about' && (
        <TabPanel id="about" heading="About">
          <section className="panel-block">
            <h2 className="panel-title">Why This Exists</h2>
            <p className="panel-lede">
              The Divine Get Down is a faith-based media and speaking platform created to share spiritual encouragement,
              Scripture-centered reflection, and motivating messages that help people reconnect with God and move forward with peace.
            </p>

            <div className="uspto-panel-grid">
              <div className="uspto-panel-card">
                <h3>Media Platform</h3>
                <p>
                  The Divine Get Down publishes faith-centered online video content, spiritual encouragement,
                  and movement-rooted reflection experiences.
                </p>
              </div>
              <div className="uspto-panel-card">
                <h3>Mission</h3>
                <p>
                  To create a sacred rhythm for the weary soul—a place to breathe, remember, and rest in God's presence.
                </p>
              </div>
            </div>

            <PinnedLinks emailHref={emailHref} />
          </section>
        </TabPanel>
      )}

      {activeTab === 'contact' && (
        <TabPanel id="contact" heading="Contact">
          <section className="panel-block">
            <h2 className="panel-title">People & Businesses Can Reach Out Here</h2>
            <p className="panel-lede">
              People, ministries, brands, and businesses can contact The Divine Get Down for speaking engagements,
              collaborations, interviews, partnerships, workshops, and other creative opportunities.
            </p>

            <div className="contact-hero-card">
              <p className="contact-kicker">Business Contact</p>
              <a className="contact-email-link" href={emailHref}>
                {CONTACT_EMAIL}
              </a>
              <p className="muted contact-helper">
                Tap the email above to open your mail app instantly.
              </p>
            </div>

            <div className="uspto-panel-grid">
              <div className="uspto-panel-card">
                <h3>Contact for</h3>
                <ul className="uspto-list">
                  <li>Motivational speaking inquiries</li>
                  <li>Educational teaching opportunities</li>
                  <li>Media interviews</li>
                  <li>Faith-based collaborations and workshop invitations</li>
                </ul>
              </div>

              <div className="uspto-panel-card">
                <h3>Best Way to Reach Out</h3>
                <p>
                  Send a brief email with your name, organization, event or project details, and the kind of opportunity
                  you have in mind. The Divine Get Down can then follow up directly with next steps.
                </p>
                <div className="cta-row">
                  <a className="primary-cta" href={emailHref}>
                    Email Now
                  </a>
                  <a className="secondary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                    View Channel
                  </a>
                </div>
              </div>
            </div>
          </section>
        </TabPanel>
      )}

      {activeTab === 'start' && (
        <TabPanel id="start" heading="Scroll Vault">
          <section className="panel-block">
            <h2 className="panel-title">Enter the Scroll Vault</h2>
            <p className="panel-lede">
              Return here when you need a deeper reset, a moment of stillness, or a sacred word to carry with you.
            </p>

            <div className="cta-row">
              <a
                className="primary-cta"
                href={YOUTUBE.emailCaptureUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open the Vault
              </a>
              <a className="secondary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
            </div>

            <div className="muted" style={{ marginTop: 10 }}>
              Placeholder: update <code>emailCaptureUrl</code> in <code>src/config/youtube.js</code> when your form is ready.
            </div>

            <PinnedLinks emailHref={emailHref} />
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

function PinnedLinks({ emailHref }) {
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
        <a className="pinned-link" href={emailHref}>
          <span aria-hidden="true">✉️</span>
          <span>
            <strong>Email The Divine Get Down</strong>
            <div className="muted">{CONTACT_EMAIL}</div>
          </span>
        </a>
      </div>
    </div>
  );
}

PinnedLinks.propTypes = {
  emailHref: PropTypes.string.isRequired,
};

function StartHereMini() {
  return (
    <div className="panel-footer">
      <div className="start-here-mini">
        <p>
          <strong>If life feels loud, start here →</strong> Enter the Scroll Vault
        </p>
        <a className="secondary-cta" href={YOUTUBE.emailCaptureUrl} target="_blank" rel="noreferrer">
          Open the Vault
        </a>
      </div>
    </div>
  );
}

function getTabMeta(tabId) {
  const baseTitle = 'The Divine Get Down';
  const ogImage = `${SITE_URL}/divine_logo.png`;

  switch (tabId) {
    case 'services':
      return {
        path: '/#services',
        title: `Services | ${baseTitle}`,
        description:
          'Explore the video content, motivational speaking, educational teaching, and collaborations offered through The Divine Get Down.',
        ogTitle: `Services | ${baseTitle}`,
        ogDescription:
          'Faith-based video content, motivational speaking, educational teaching, and spiritual encouragement.',
        ogImage,
      };

    case 'watch':
      return {
        path: '/#watch',
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
        path: '/#shorts',
        title: `Shorts | ${baseTitle}`,
        description:
          'Short, scripture-centered encouragement you can watch in under a minute—designed to reset your mind and strengthen your spirit.',
        ogTitle: `Shorts | ${baseTitle}`,
        ogDescription: 'Quick, faith-filled resets you can watch daily.',
        ogImage,
      };

    case 'about':
      return {
        path: '/#about',
        title: `About | ${baseTitle}`,
        description:
          'About The Divine Get Down and its faith-based media platform, spiritual encouragement, and speaking mission.',
        ogTitle: `About | ${baseTitle}`,
        ogDescription: 'Why this exists and what The Divine Get Down provides.',
        ogImage,
      };

    case 'contact':
      return {
        path: '/#contact',
        title: `Contact | ${baseTitle}`,
        description:
          'Contact The Divine Get Down for speaking engagements, teaching, interviews, collaborations, partnerships, and business inquiries.',
        ogTitle: `Contact | ${baseTitle}`,
        ogDescription: 'Speaking, collaboration, partnership, and business inquiries.',
        ogImage,
      };

    case 'start':
      return {
        path: '/#start',
        title: `Scroll Vault | ${baseTitle}`,
        description:
          'Enter the Scroll Vault for deeper reflection, stillness, and faith-filled resources from The Divine Get Down.',
        ogTitle: `Scroll Vault | ${baseTitle}`,
        ogDescription: 'A deeper place for reflection, stillness, and sacred encouragement.',
        ogImage,
      };

    case 'welcome':
    default:
      return {
        path: '/',
        title: `${baseTitle} | Faith-Based Videos, Teaching & Speaking`,
        description:
          'The Divine Get Down offers faith-based video content, motivational speaking, educational teaching, and spiritual encouragement.',
        ogTitle: baseTitle,
        ogDescription:
          'Faith-based video content, motivational speaking, educational teaching, and spiritual encouragement.',
        ogImage,
      };
  }
}
