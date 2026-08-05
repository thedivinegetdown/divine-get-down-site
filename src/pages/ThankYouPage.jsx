// src/pages/ThankYouPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import { SITE } from '../content/site';
import { THANK_YOU_CONTENT } from '../content/thankYou';
import '../App.css';
import './FunnelPages.css';

function ThankYouPage() {
  return (
    <div className="App">
      <MetaTags {...THANK_YOU_CONTENT.metadata} />

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
                decoding="async"
                width={SITE.logo.width}
                height={SITE.logo.height}
                fetchPriority="high"
              />
            </picture>
          </div>

          <h1 className="funnel-title">{THANK_YOU_CONTENT.title}</h1>
          <p className="funnel-subtitle">
            {THANK_YOU_CONTENT.subtitleLines[0]}
            <br />
            {THANK_YOU_CONTENT.subtitleLines[1]}
          </p>

          <div className="funnel-divider" />

          <div className="funnel-block">
            <div className="funnel-panel">
              <h3 style={{ textAlign: 'center' }}>{THANK_YOU_CONTENT.stillnessHeading}</h3>
              <p style={{ textAlign: 'center' }}>
                {THANK_YOU_CONTENT.breathingLines[0]}
                <br />
                {THANK_YOU_CONTENT.breathingLines[1]}
                <br />
                {THANK_YOU_CONTENT.breathingLines[2]}
                <br />
                <br />
                {THANK_YOU_CONTENT.whisper}
              </p>
            </div>

            <p style={{ textAlign: 'center', marginTop: 14 }}>
              {THANK_YOU_CONTENT.continuePrompt}
            </p>

            <div className="funnel-actions">
              <Link className="primary-cta" to={SITE.links.scrollVault}>
                {THANK_YOU_CONTENT.vaultButton}
              </Link>
              <Link className="funnel-link" to={SITE.links.journey}>
                {THANK_YOU_CONTENT.journeyLink}
              </Link>
            </div>

            <p className="funnel-footnote">{THANK_YOU_CONTENT.footnote}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ThankYouPage;
