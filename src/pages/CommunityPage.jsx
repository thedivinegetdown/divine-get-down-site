// src/pages/CommunityPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import { COMMUNITY_CONTENT } from '../content/community';
import { SITE } from '../content/site';
import '../App.css';
import './FunnelPages.css';

function CommunityPage() {
  return (
    <div className="App">
      <MetaTags {...COMMUNITY_CONTENT.metadata} />

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

          <h1 className="funnel-title">{COMMUNITY_CONTENT.title}</h1>
          <p className="funnel-subtitle">{COMMUNITY_CONTENT.subtitle}</p>

          <div className="funnel-divider" />

          <div className="funnel-block">
            <p>
              {COMMUNITY_CONTENT.introduction}
            </p>
            <p>
              {COMMUNITY_CONTENT.rhythmLine}
              <br />
              {COMMUNITY_CONTENT.rhythmResponse}
            </p>

            <h2>{COMMUNITY_CONTENT.receiveHeading}</h2>
            <ul className="funnel-list">
              {COMMUNITY_CONTENT.receiveItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="funnel-panel" style={{ marginTop: 16 }}>
              <h3>{COMMUNITY_CONTENT.membership.title}</h3>
              <p>
                <strong>{COMMUNITY_CONTENT.membership.price}</strong>
              </p>
              <p>{COMMUNITY_CONTENT.membership.description}</p>
            </div>

            <div className="funnel-divider" />

            <h2>{COMMUNITY_CONTENT.joinHeading}</h2>
            <p style={{ textAlign: 'center' }}>
              {COMMUNITY_CONTENT.joinDescription}
            </p>

            <form
              className="funnel-form"
              name="inner-rhythm-access"
              method="POST"
              action={SITE.links.thankYou}
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="inner-rhythm-access" />
              <p style={{ display: 'none' }}>
                <label>
                  {COMMUNITY_CONTENT.form.honeypotLabel} <input name="bot-field" />
                </label>
              </p>

              <label className="funnel-label" htmlFor="community-email">
                {COMMUNITY_CONTENT.form.emailLabel}
              </label>
              <input
                id="community-email"
                className="funnel-input"
                type="email"
                name="email"
                required
                placeholder={COMMUNITY_CONTENT.form.emailPlaceholder}
                autoComplete="email"
              />

              <label className="funnel-label" htmlFor="community-note">
                {COMMUNITY_CONTENT.form.noteLabel}
              </label>
              <textarea
                id="community-note"
                className="funnel-textarea"
                name="note"
                placeholder={COMMUNITY_CONTENT.form.notePlaceholder}
              />

              <div className="funnel-actions">
                <button className="primary-cta" type="submit">
                  {COMMUNITY_CONTENT.form.submitButton}
                </button>
                <Link className="funnel-link" to={SITE.links.scrollVault}>
                  {COMMUNITY_CONTENT.form.vaultLink}
                </Link>
              </div>
            </form>

            <p className="funnel-footnote">
              {COMMUNITY_CONTENT.footnote}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CommunityPage;
