// src/pages/StillnessScrollPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import '../App.css';
import './FunnelPages.css';

function StillnessScrollPage() {
  return (
    <div className="App" aria-live="polite">
      <MetaTags title="Stillness Scroll — The Divine Get Down" description="A calm, Scripture-rooted stillness space. Slow down, breathe, and return to what is steady." path="/stillness" />

      <div className="funnel-shell" id="main-content">
        <div className="funnel-card">
          <div className="funnel-back">
            <Link className="funnel-link" to="/">
              ← Back to the Sanctuary
            </Link>
          </div>

          <div className="funnel-top">
            <picture>
      <source srcSet="/divine_logo.webp" type="image/webp" />
      <img
        src="/divine_logo.png"
              alt="The Divine Get Down crest"
              className="funnel-logo"
              loading="eager"
        width="160"
        height="160"
        decoding="async"
        fetchPriority="high"
      />
    </picture>
          </div>

          <h1 className="funnel-title">A Sacred Scroll for the Weary Soul</h1>
          <p className="funnel-subtitle">
            A quiet moment of prayer, breath, and scripture — created to help you
            release what you’ve been carrying.
          </p>

          <div className="funnel-divider" />

          <div className="funnel-block">
            <h2>What You’ll Receive</h2>
            <ul className="funnel-list">
              <li>A guided prayer for stillness and surrender</li>
              <li>Gentle breathwork to calm the body</li>
              <li>Scripture to anchor the heart</li>
              <li>A moment of peace you can return to daily</li>
            </ul>

            <p style={{ textAlign: 'center', marginTop: 14 }}>
              This is free. This is a gift.
            </p>

            <div className="funnel-panel" style={{ marginTop: 14 }}>
              <h3 style={{ textAlign: 'center' }}>Enter your email to receive the scroll</h3>

              {/* Netlify Forms (works great on Netlify) */}
              <form
                className="funnel-form"
                name="stillness-scroll"
                method="POST"
                action="/thank-you"
                data-netlify="true"
                netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="stillness-scroll" />
                <p style={{ display: 'none' }}>
                  <label>
                    Don’t fill this out if you’re human:{' '}
                    <input name="bot-field" />
                  </label>
                </p>

                <input
                  className="funnel-input"
                  type="email"
                  name="email"
                  required
                  placeholder="Your email address"
                  autoComplete="email"
                />

                <button className="primary-cta" type="submit">
                  Send Me the Scroll
                </button>
              </form>

              <p className="funnel-footnote">
                We honor your inbox. No noise. No pressure. Only presence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StillnessScrollPage;
