// src/pages/CommunityPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import '../App.css';
import './FunnelPages.css';

function CommunityPage() {
  return (
    <div className="App" aria-live="polite">
      <MetaTags title="The Inner Rhythm — The Divine Get Down" description="A sanctuary for community, short films, and sacred rhythm. Watch, reflect, and share the light." path="/community" />

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
              decoding="async"
            
        width="160"
        height="160"
        fetchPriority="high"
      />
    </picture>
          </div>

          <h1 className="funnel-title">The Inner Rhythm</h1>
          <p className="funnel-subtitle">For those who want to walk together.</p>

          <div className="funnel-divider" />

          <div className="funnel-block">
            <p>
              This community exists for gentle accountability, shared prayer, and collective
              stillness.
            </p>
            <p>
              Community is not obligation.
              <br />
              It is shared presence.
            </p>

            <h2>What You’ll Receive</h2>
            <ul className="funnel-list">
              <li>Weekly guidance</li>
              <li>Monthly live moments</li>
              <li>Shared scripture & reflection</li>
              <li>A quiet space to belong</li>
            </ul>

            <div className="funnel-panel" style={{ marginTop: 16 }}>
              <h3>Membership</h3>
              <p>
                <strong>$29/month</strong>
              </p>
              <p>Come and go freely. No pressure to stay.</p>
            </div>

            <div className="funnel-divider" />

            <h2>Join the Inner Rhythm</h2>
            <p style={{ textAlign: 'center' }}>
              Checkout can be connected next. For now, request access below and we’ll send you the
              entry link.
            </p>

            <form
              className="funnel-form"
              name="inner-rhythm-access"
              method="POST"
              action="/thank-you"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="inner-rhythm-access" />
              <p style={{ display: 'none' }}>
                <label>
                  Don’t fill this out if you’re human: <input name="bot-field" />
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

              <textarea
                className="funnel-textarea"
                name="note"
                placeholder="Optional: What would you like prayer for this month?"
              />

              <div className="funnel-actions">
                <button className="primary-cta" type="submit">
                  Join the Inner Rhythm
                </button>
                <Link className="funnel-link" to="/vault">
                  Prefer self-paced? Enter the Scroll Vault →
                </Link>
              </div>
            </form>

            <p className="funnel-footnote">
              Community is not obligation. It is shared presence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
