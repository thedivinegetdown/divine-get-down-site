// src/pages/ThankYouPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../App.css';
import './FunnelPages.css';

function ThankYouPage() {
  return (
    <div className="App">
      <Helmet>
        <title>You're Not Here by Accident — The Divine Get Down</title>
        <meta
          name="description"
          content="Thank you for stepping into stillness. Take a moment to breathe — God is near."
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
            <img
              src="/divine_logo.png"
              alt="The Divine Get Down crest"
              className="funnel-logo"
              loading="eager"
              decoding="async"
            />
          </div>

          <h1 className="funnel-title">You’re not here by accident.</h1>
          <p className="funnel-subtitle">
            Thank you for stepping into stillness.
            <br />
            Before you go, take a moment. Breathe slowly. Let your shoulders soften.
            God is near.
          </p>

          <div className="funnel-divider" />

          <div className="funnel-block">
            <div className="funnel-panel">
              <h3 style={{ textAlign: 'center' }}>A Moment of Stillness</h3>
              <p style={{ textAlign: 'center' }}>
                Inhale… 4…
                <br />
                Hold… 2…
                <br />
                Exhale… 6…
                <br />
                <br />
                Whisper: “Lord, I’m here.”
              </p>
            </div>

            <p style={{ textAlign: 'center', marginTop: 14 }}>
              If you feel led to continue…
            </p>

            <div className="funnel-actions">
              <Link className="primary-cta" to="/vault">
                Enter the Scroll Vault
              </Link>
              <Link className="funnel-link" to="/journey">
                Or begin the 4-Week Journey →
              </Link>
            </div>

            <p className="funnel-footnote">There is no obligation. Only an open door.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
