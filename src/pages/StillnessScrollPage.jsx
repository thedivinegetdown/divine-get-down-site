// src/pages/StillnessScrollPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import '../App.css';
import './FunnelPages.css';

function StillnessScrollPage() {
  return (
    <div className="App">
      <MetaTags
        title="Stillness Scroll — The Divine Get Down"
        description="A calm, Scripture-rooted stillness space. Slow down, breathe, and return to what is steady."
        path="/stillness"
      />

      <main className="funnel-shell" id="main-content" tabIndex={-1}>
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

            <div className="funnel-panel" style={{ marginTop: 14, textAlign: 'center' }}>
              <h3>Open the scroll whenever you need a moment of peace.</h3>

              <div className="funnel-actions">
                <a
                  className="primary-cta"
                  href="/stillness-scroll.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open The Stillness Scroll
                </a>
              </div>

              <p className="funnel-footnote">
                No noise. No pressure. Only stillness, reflection, and peace through Jesus Christ.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StillnessScrollPage;
