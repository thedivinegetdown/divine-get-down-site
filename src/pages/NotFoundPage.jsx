// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../App.css';
import './FunnelPages.css';

function NotFoundPage() {
  return (
    <div className="App">
      <Helmet>
        <title>Page Not Found — The Divine Get Down</title>
      </Helmet>

      <div className="funnel-shell">
        <div className="funnel-card">
          <div className="funnel-top">
            <img
              src="/divine_logo.png"
              alt="The Divine Get Down crest"
              className="funnel-logo"
              loading="eager"
              decoding="async"
            />
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
