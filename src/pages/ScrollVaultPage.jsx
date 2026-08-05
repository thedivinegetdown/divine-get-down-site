// src/pages/ScrollVaultPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import { SCROLL_VAULT_CONTENT } from '../content/scrollVault';
import { SITE } from '../content/site';
import '../App.css';
import './FunnelPages.css';

function ScrollVaultPage() {
  return (
    <div className="App">
      <MetaTags {...SCROLL_VAULT_CONTENT.metadata} />

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

          <h1 className="funnel-title">{SCROLL_VAULT_CONTENT.title}</h1>
          <p className="funnel-subtitle">{SCROLL_VAULT_CONTENT.subtitle}</p>

          <div className="funnel-divider" />

          <div className="funnel-block">
            <p>
              {SCROLL_VAULT_CONTENT.introduction}
            </p>
            <p>
              {SCROLL_VAULT_CONTENT.rhythmLine}
              <br />
              {SCROLL_VAULT_CONTENT.rhythmResponse}
            </p>

            <h2>{SCROLL_VAULT_CONTENT.insideHeading}</h2>
            <ul className="funnel-list">
              {SCROLL_VAULT_CONTENT.insideItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="funnel-grid" style={{ marginTop: 16 }}>
              {SCROLL_VAULT_CONTENT.accessOptions.map((option) => (
                <div className="funnel-panel" key={option.title}>
                  <h3>{option.title}</h3>
                  <p>
                    {option.pricePrefix}
                    <strong>{option.price}</strong>
                  </p>
                  <p>{option.description}</p>
                </div>
              ))}
            </div>

            <div className="funnel-divider" />

            <h2>{SCROLL_VAULT_CONTENT.requestHeading}</h2>
            <p style={{ textAlign: 'center' }}>
              {SCROLL_VAULT_CONTENT.requestDescription}
            </p>

            <form
              className="funnel-form"
              name="scroll-vault-access"
              method="POST"
              action={SITE.links.thankYou}
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="scroll-vault-access" />
              <p style={{ display: 'none' }}>
                <label>
                  {SCROLL_VAULT_CONTENT.form.honeypotLabel} <input name="bot-field" />
                </label>
              </p>

              <label className="funnel-label" htmlFor="vault-email">
                {SCROLL_VAULT_CONTENT.form.emailLabel}
              </label>
              <input
                id="vault-email"
                className="funnel-input"
                type="email"
                name="email"
                required
                placeholder={SCROLL_VAULT_CONTENT.form.emailPlaceholder}
                autoComplete="email"
              />

              <label className="funnel-label" htmlFor="vault-plan">
                {SCROLL_VAULT_CONTENT.form.planLabel}
              </label>
              <select id="vault-plan" className="funnel-select" name="plan" defaultValue="one-time" required>
                {SCROLL_VAULT_CONTENT.form.plans.map((plan) => (
                  <option key={plan.value} value={plan.value}>{plan.label}</option>
                ))}
              </select>

              <label className="funnel-label" htmlFor="vault-note">
                {SCROLL_VAULT_CONTENT.form.noteLabel}
              </label>
              <textarea
                id="vault-note"
                className="funnel-textarea"
                name="note"
                placeholder={SCROLL_VAULT_CONTENT.form.notePlaceholder}
              />

              <div className="funnel-actions">
                <button className="primary-cta" type="submit">
                  {SCROLL_VAULT_CONTENT.form.submitButton}
                </button>
                <Link className="funnel-link" to={SITE.links.journey}>
                  {SCROLL_VAULT_CONTENT.form.journeyLink}
                </Link>
              </div>
            </form>

            <p className="funnel-footnote">
              {SCROLL_VAULT_CONTENT.footnote}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ScrollVaultPage;
