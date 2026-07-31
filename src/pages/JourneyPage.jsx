// src/pages/JourneyPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import '../App.css';
import './FunnelPages.css';

function JourneyPage() {
  return (
    <div className="App" aria-live="polite">
      <MetaTags title="The Journey — The Divine Get Down" description="Step into the 4-week journey: movement, stillness, breath, and breakthrough—rooted in faith." path="/journey" />

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

          <h1 className="funnel-title">The Divine Get Down — A 4-Week Sacred Journey</h1>
          <p className="funnel-subtitle">
            A guided return to stillness, presence, and divine rhythm.
          </p>

          <div className="funnel-divider" />

          <div className="funnel-block">
            <p>
              This four-week journey is designed for those who feel weary, distracted, or
              disconnected — and are ready to slow down with intention.
            </p>
            <p>
              Each week invites you into:
              <br />
              Stillness. Scripture. Gentle movement or breath. Reflection with God.
              <br />
              No pressure. No perfection. Only presence.
            </p>

            <h2>What’s Included</h2>
            <ul className="funnel-list">
              <li>Weekly sacred theme</li>
              <li>Guided prayer & audio</li>
              <li>Scripture reflections</li>
              <li>Gentle movement prompts</li>
              <li>Personal reflection space</li>
            </ul>

            <div className="funnel-grid" style={{ marginTop: 16 }}>
              <div className="funnel-panel">
                <h3>One-time access</h3>
                <p>
                  One-time access: <strong>$97</strong>
                </p>
                <p>This journey does not rush you. It walks with you.</p>
              </div>

              <div className="funnel-panel">
                <h3>Need a gentle start?</h3>
                <p>
                  If you want to begin quietly, start with the free Stillness Scroll.
                </p>
                <div className="funnel-actions">
                  <Link className="primary-cta" to="/stillness">
                    Receive the Stillness Scroll
                  </Link>
                </div>
              </div>
            </div>

            <div className="funnel-divider" />

            <h2>Begin the Journey</h2>
            <p style={{ textAlign: 'center' }}>
              Checkout can be connected next (Gumroad, Stripe, or your preferred flow).
              For now, use this form to request access and we’ll get you set up.
            </p>

            <form
              className="funnel-form"
              name="journey-access"
              method="POST"
              action="/thank-you"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="journey-access" />
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
                name="intention"
                placeholder="Optional: What are you hoping God restores in you during these 4 weeks?"
              />

              <div className="funnel-actions">
                <button className="primary-cta" type="submit">
                  Begin the Journey
                </button>
                <Link className="funnel-link" to="/community">
                  Want to walk with others? Explore the Inner Rhythm →
                </Link>
              </div>
            </form>

            <p className="funnel-footnote">
              This journey does not rush you. It walks with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JourneyPage;
