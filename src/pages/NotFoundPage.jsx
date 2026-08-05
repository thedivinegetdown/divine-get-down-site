// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import { NOT_FOUND_CONTENT } from '../content/notFound';
import { SITE } from '../content/site';
import '../App.css';
import './FunnelPages.css';

function NotFoundPage() {
  return (
    <div className="App">
      <MetaTags {...NOT_FOUND_CONTENT.metadata} />

      <main className="funnel-shell" id="main-content" tabIndex={-1}>
        <div className="funnel-card">
          <div className="funnel-top">
            <picture>
              <source srcSet={SITE.logo.webp} type="image/webp" />
              <img
                src={SITE.logo.png}
                alt={SITE.logo.alt}
                className="funnel-logo"
                loading="eager"
                decoding="async"
                width={SITE.logo.width}
                height={SITE.logo.height}
                fetchPriority="high"
              />
            </picture>
          </div>

          <h1 className="funnel-title">{NOT_FOUND_CONTENT.title}</h1>
          <p className="funnel-subtitle">
            {NOT_FOUND_CONTENT.subtitleLines[0]}
            <br />
            {NOT_FOUND_CONTENT.subtitleLines[1]}
          </p>

          <div className="funnel-actions">
            <Link className="primary-cta" to={SITE.links.home}>
              {NOT_FOUND_CONTENT.homeButton}
            </Link>
            <Link className="funnel-link" to={SITE.links.stillness}>
              {NOT_FOUND_CONTENT.stillnessLink}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
