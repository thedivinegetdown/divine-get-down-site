// src/pages/JourneyPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import { JOURNEY_CONTENT } from '../content/journey';
import { SITE } from '../content/site';
import '../App.css';
import './FunnelPages.css';

function JourneyPage() {
  return (
    <div className="App">
      <MetaTags {...JOURNEY_CONTENT.metadata} />

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

          <h1 className="funnel-title">{JOURNEY_CONTENT.title}</h1>
          <p className="funnel-subtitle">
            {JOURNEY_CONTENT.subtitle}
          </p>

          <div className="funnel-divider" />

          <div className="funnel-block">
            <p>
              {JOURNEY_CONTENT.introduction}
            </p>
            <p>
              {JOURNEY_CONTENT.invitation}
              <br />
              {JOURNEY_CONTENT.rhythm}
              <br />
              {JOURNEY_CONTENT.presence}
            </p>

            <h2>{JOURNEY_CONTENT.includedHeading}</h2>
            <ul className="funnel-list">
              {JOURNEY_CONTENT.includedItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="funnel-grid" style={{ marginTop: 16 }}>
              <div className="funnel-panel">
                <h3>{JOURNEY_CONTENT.access.title}</h3>
                <p>
                  {JOURNEY_CONTENT.access.pricePrefix}
                  <strong>{JOURNEY_CONTENT.access.price}</strong>
                </p>
                <p>{JOURNEY_CONTENT.access.description}</p>
              </div>

              <div className="funnel-panel">
                <h3>{JOURNEY_CONTENT.gentleStart.title}</h3>
                <p>
                  {JOURNEY_CONTENT.gentleStart.description}
                </p>
                <div className="funnel-actions">
                  <Link className="primary-cta" to={SITE.links.stillness}>
                    {JOURNEY_CONTENT.gentleStart.button}
                  </Link>
                </div>
              </div>
            </div>

            <div className="funnel-divider" />

            <h2>{JOURNEY_CONTENT.beginHeading}</h2>
            <p style={{ textAlign: 'center' }}>
              {JOURNEY_CONTENT.beginDescription}
            </p>

            <form
              className="funnel-form"
              name="journey-access"
              method="POST"
              action={SITE.links.thankYou}
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="journey-access" />
              <p style={{ display: 'none' }}>
                <label>
                  {JOURNEY_CONTENT.form.honeypotLabel} <input name="bot-field" />
                </label>
              </p>

              <label className="funnel-label" htmlFor="journey-email">
                {JOURNEY_CONTENT.form.emailLabel}
              </label>
              <input
                id="journey-email"
                className="funnel-input"
                type="email"
                name="email"
                required
                placeholder={JOURNEY_CONTENT.form.emailPlaceholder}
                autoComplete="email"
              />

              <label className="funnel-label" htmlFor="journey-intention">
                {JOURNEY_CONTENT.form.intentionLabel}
              </label>
              <textarea
                id="journey-intention"
                className="funnel-textarea"
                name="intention"
                placeholder={JOURNEY_CONTENT.form.intentionPlaceholder}
              />

              <div className="funnel-actions">
                <button className="primary-cta" type="submit">
                  {JOURNEY_CONTENT.form.submitButton}
                </button>
                <Link className="funnel-link" to={SITE.links.community}>
                  {JOURNEY_CONTENT.form.communityLink}
                </Link>
              </div>
            </form>

            <p className="funnel-footnote">
              {JOURNEY_CONTENT.footnote}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default JourneyPage;
