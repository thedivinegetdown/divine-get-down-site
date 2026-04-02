// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import '../App.css';
import './FunnelPages.css';

function NotFoundPage() {
  return (
    <div className="App" aria-live="polite">
      <MetaTags title="Page Not Found — The Divine Get Down" description="This page doesn’t exist, but the sanctuary is still here. Return home." path="/404" />

      <div className="funnel-shell" id="main-content">
        <div className="funnel-card">
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

          <h1 className="funnel-title">This path isn’t mapped.</h1>
          <p className="funnel-subtitle">
            But you’re still welcome here.
            <br />
            Return to the Sanctuary and we’ll continue in peace.
          </p>

          <div className="funnel-actions">
            <Link className="primary-cta" to="/">
              Return to the Sanctuary
            </Link>
            <Link className="funnel-link" to="/stillness">
              Receive the Stillness Scroll →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
