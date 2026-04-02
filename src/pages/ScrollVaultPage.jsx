// src/pages/ScrollVaultPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../App.css';
import './FunnelPages.css';

function ScrollVaultPage() {
  return (
    <div className="App">
      <Helmet>
        <title>The Scroll Vault — The Divine Get Down</title>
        <meta
          name="description"
          content="The Scroll Vault is a growing collection of sacred prayers, reflections, and guided moments — a quiet place for those who return."
        />
      </Helmet>

      <div className="funnel-shell">
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
        decoding="async"
        fetchPriority="high"
      />
    </picture>
          </div>

          <h1 className="funnel-title">The Scroll Vault</h1>
          <p className="funnel-subtitle">A quiet place for those who return.</p>

          <div className="funnel-divider" />

          <div className="funnel-block">
            <p>
              The Scroll Vault is a growing collection of sacred prayers, reflections, and guided
              moments — created to help you slow down and realign with God throughout your day.
            </p>
            <p>
              This is not content to consume.
              <br />
              This is a rhythm to live by.
            </p>

            <h2>Inside the Vault</h2>
            <ul className="funnel-list">
              <li>Prayer scrolls for peace, strength, and healing</li>
              <li>Short audio reflections</li>
              <li>Scripture-anchored stillness prompts</li>
              <li>Gentle guidance for daily return</li>
            </ul>

            <div className="funnel-grid" style={{ marginTop: 16 }}>
              <div className="funnel-panel">
                <h3>One-time access</h3>
                <p>
                  One-time access — <strong>$11</strong>
                </p>
                <p>
                  A simple doorway to begin.
                </p>
              </div>

              <div className="funnel-panel">
                <h3>Ongoing access</h3>
                <p>
                  Ongoing access — <strong>$19/month</strong>
                </p>
                <p>
                  For those who want a daily return.
                </p>
              </div>
            </div>

            <div className="funnel-divider" />

            <h2>Request Access</h2>
            <p style={{ textAlign: 'center' }}>
              Checkout links can be connected next (Gumroad, Stripe, or your preferred flow).
              For now, this form captures your request so you can be granted access immediately.
            </p>

            <form
              className="funnel-form"
              name="scroll-vault-access"
              method="POST"
              action="/thank-you"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="scroll-vault-access" />
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

              <select className="funnel-select" name="plan" defaultValue="one-time" required>
                <option value="one-time">One-time access ($11)</option>
                <option value="monthly">Ongoing access ($19/month)</option>
              </select>

              <textarea
                className="funnel-textarea"
                name="note"
                placeholder="Optional: anything you’d like to receive prayer for?"
              />

              <div className="funnel-actions">
                <button className="primary-cta" type="submit">
                  Enter the Scroll Vault
                </button>
                <Link className="funnel-link" to="/journey">
                  Prefer a guided path? Begin the 4-Week Journey →
                </Link>
              </div>
            </form>

            <p className="funnel-footnote">
              You may come and go freely. There is no pressure to stay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollVaultPage;
