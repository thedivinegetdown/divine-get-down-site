// src/pages/StillnessScrollPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import { SITE } from '../content/site';
import { STILLNESS_SCROLL_CONTENT } from '../content/stillnessScroll';
import '../App.css';
import './FunnelPages.css';

function StillnessScrollPage() {
  return (
    <div className="App">
      <MetaTags {...STILLNESS_SCROLL_CONTENT.metadata} />

      <main className="funnel-shell" id="main-content" tabIndex={-1}>
        <div className="funnel-card">
          <div className="funnel-back">
            <Link className="funnel-link" to={SITE.links.home}>
              {SITE.labels.backToSanctuary}
            </Link>
          </div>

          <div className="funnel-top">
            <picture>
              <source srcSet={SITE.logo.webp} type="image/webp" />
              <img
                src={SITE.logo.png}
                alt={SITE.logo.alt}
                className="funnel-logo"
                loading="eager"
                width={SITE.logo.width}
                height={SITE.logo.height}
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>

          <h1 className="funnel-title">{STILLNESS_SCROLL_CONTENT.title}</h1>
          <p className="funnel-subtitle">
            {STILLNESS_SCROLL_CONTENT.subtitle}
          </p>

          <div className="funnel-divider" />

          <div className="funnel-block">
            <h2>{STILLNESS_SCROLL_CONTENT.receiveHeading}</h2>
            <ul className="funnel-list">
              {STILLNESS_SCROLL_CONTENT.receiveItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p style={{ textAlign: 'center', marginTop: 14 }}>
              {STILLNESS_SCROLL_CONTENT.gift}
            </p>

            <div className="funnel-panel" style={{ marginTop: 14, textAlign: 'center' }}>
              <h3>{STILLNESS_SCROLL_CONTENT.panelHeading}</h3>

              <div className="funnel-actions">
                <a
                  className="primary-cta"
                  href={STILLNESS_SCROLL_CONTENT.pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {STILLNESS_SCROLL_CONTENT.button}
                </a>
              </div>

              <p className="funnel-footnote">
                {STILLNESS_SCROLL_CONTENT.footnote}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StillnessScrollPage;
