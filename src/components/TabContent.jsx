// src/components/TabContent.jsx
import React, { Suspense, lazy, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { ABOUT_CONTENT } from '../content/about';
import { CONTACT_CONTENT } from '../content/contact';
import { HOME_CONTENT } from '../content/home';
import {
  createVideoStructuredData,
  getTabMetadata,
  ORGANIZATION_STRUCTURED_DATA,
} from '../content/tabMetadata';
import { SERVICES_CONTENT } from '../content/services';
import { CONTACT_EMAIL_HREF, SITE, SITE_URL } from '../content/site';
import { YOUTUBE, YOUTUBE_CONTENT } from '../content/youtube';

const LiteYouTube = lazy(() => import('./youtube/LiteYouTube'));
const ShortsGrid = lazy(() => import('./youtube/ShortsGrid'));

const CONTACT_EMAIL = SITE.contactEmail;
const CONTACT_FORM_NAME = SITE.contactFormName;
const INQUIRY_TYPES = CONTACT_CONTENT.inquiryTypes;

export default function TabContent({ activeTab }) {
  const meta = getTabMetadata(activeTab);
  const canonical = `${SITE_URL}${meta.path}`;
  const subscribeUrl = `${YOUTUBE.channelUrl}?sub_confirmation=1`;
  const emailHref = CONTACT_EMAIL_HREF;
  const videoJsonLd = createVideoStructuredData(meta);

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:url" content={canonical} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.ogTitle} />
        <meta name="twitter:description" content={meta.ogDescription} />
        <meta name="twitter:image" content={meta.ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(ORGANIZATION_STRUCTURED_DATA)}
        </script>
        {activeTab === 'watch' && (
          <script type="application/ld+json">{JSON.stringify(videoJsonLd)}</script>
        )}
      </Helmet>

      {activeTab === 'welcome' && (
        <TabPanel id="welcome" heading={HOME_CONTENT.welcome.tabHeading}>
          <section className="panel-block">
            <h2 className="panel-title">{HOME_CONTENT.welcome.title}</h2>
            <p className="panel-lede">
              {HOME_CONTENT.welcome.description}
            </p>

            <div className="cta-row">
              <a
                className="primary-cta"
                href={`https://www.youtube.com/watch?v=${YOUTUBE.featuredVideoId}`}
                target="_blank"
                rel="noreferrer"
              >
                {HOME_CONTENT.welcome.watchButton}
              </a>
              <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
                {HOME_CONTENT.welcome.subscribeButton}
              </a>
            </div>

            <div className="uspto-panel-grid">
              {HOME_CONTENT.welcome.cards.map((card) => (
                <div className="uspto-panel-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>

            <PinnedLinks emailHref={emailHref} />
            <StartHereMini />
          </section>
        </TabPanel>
      )}

      {activeTab === 'services' && (
        <TabPanel id="services" heading={SERVICES_CONTENT.tabHeading}>
          <section className="panel-block">
            <h2 className="panel-title">{SERVICES_CONTENT.title}</h2>
            <p className="panel-lede">
              {SERVICES_CONTENT.description}
            </p>

            <div className="uspto-panel-grid">
              {SERVICES_CONTENT.cards.map((card) => (
                <div className="uspto-panel-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <ul className="uspto-list">
                    {card.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Strong commerce signal – helps direct association for speaking services */}
            <div className="uspto-panel-card" style={{ marginTop: '24px', background: 'rgba(255, 240, 150, 0.08)', borderColor: 'rgba(255, 217, 90, 0.3)' }}>
              <h3>{SERVICES_CONTENT.speaking.title}</h3>
              <p>{SERVICES_CONTENT.speaking.description}</p>
              <button
                type="button"
                className="primary-cta"
                onClick={() => {
                  if (typeof window !== 'undefined') window.location.hash = '#contact';
                }}
                style={{ marginTop: '12px' }}
              >
                {SERVICES_CONTENT.speaking.button}
              </button>
            </div>

            <p className="muted" style={{ marginTop: 18 }}>
              {SERVICES_CONTENT.closing}
            </p>

            <div className="cta-row">
              <a className="primary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                {SERVICES_CONTENT.youtubeButton}
              </a>
              <button
                type="button"
                className="secondary-cta compliance-button"
                onClick={() => {
                  if (typeof window !== 'undefined') window.location.hash = '#contact';
                }}
              >
                {SERVICES_CONTENT.contactButton}
              </button>
            </div>
          </section>
        </TabPanel>
      )}

      {activeTab === 'watch' && (
        <TabPanel id="watch" heading={HOME_CONTENT.watch.tabHeading}>
          <section className="panel-block">
            <h2 className="panel-title">{HOME_CONTENT.watch.title}</h2>
            <p className="panel-lede">
              {HOME_CONTENT.watch.description}
            </p>

            <div className="yt-lite-wrap">
              <Suspense fallback={null}>
                <LiteYouTube
                  videoId={YOUTUBE.featuredVideoId}
                  title={YOUTUBE_CONTENT.featuredVideoTitle}
                />
              </Suspense>
            </div>

            <div className="cta-row">
              <a className="primary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                {HOME_CONTENT.watch.channelButton}
              </a>
              <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
                {HOME_CONTENT.watch.subscribeButton}
              </a>
            </div>

            <PinnedLinks emailHref={emailHref} />
          </section>
        </TabPanel>
      )}

      {activeTab === 'shorts' && (
        <TabPanel id="shorts" heading={HOME_CONTENT.shorts.tabHeading}>
          <section className="panel-block">
            <h2 className="panel-title">{HOME_CONTENT.shorts.title}</h2>
            <p className="panel-lede">
              {HOME_CONTENT.shorts.description}
            </p>

            <Suspense fallback={null}>
              <ShortsGrid videoIds={YOUTUBE.shorts || []} />
            </Suspense>

            <div className="cta-row">
              <a className="primary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                {HOME_CONTENT.shorts.moreButton}
              </a>
              <a className="secondary-cta" href={subscribeUrl} target="_blank" rel="noreferrer">
                {HOME_CONTENT.shorts.subscribeButton}
              </a>
            </div>
          </section>
        </TabPanel>
      )}

      {activeTab === 'about' && (
        <TabPanel id="about" heading={ABOUT_CONTENT.tabHeading}>
          <section className="panel-block">
            <h2 className="panel-title">{ABOUT_CONTENT.title}</h2>
            <p className="panel-lede">
              {ABOUT_CONTENT.description}
            </p>

            <div className="uspto-panel-grid">
              {ABOUT_CONTENT.cards.map((card) => (
                <div className="uspto-panel-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>

            <PinnedLinks emailHref={emailHref} />
          </section>
        </TabPanel>
      )}

      {activeTab === 'contact' && (
        <TabPanel id="contact" heading={CONTACT_CONTENT.tabHeading}>
          <section className="panel-block">
            <h2 className="panel-title">{CONTACT_CONTENT.title}</h2>
            <p className="panel-lede">
              {CONTACT_CONTENT.description}
            </p>

            <div className="contact-hero-card">
              <p className="contact-kicker">{CONTACT_CONTENT.businessContactKicker}</p>
              <a className="contact-email-link" href={emailHref}>
                {CONTACT_EMAIL}
              </a>
              <p className="muted contact-helper">
                {CONTACT_CONTENT.emailHelper}
              </p>
            </div>

            <ContactInquiryForm emailHref={emailHref} />

            <div className="uspto-panel-grid">
              <div className="uspto-panel-card">
                <h3>{CONTACT_CONTENT.contactFor.title}</h3>
                <ul className="uspto-list">
                  {CONTACT_CONTENT.contactFor.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="uspto-panel-card">
                <h3>{CONTACT_CONTENT.bestWay.title}</h3>
                <p>
                  {CONTACT_CONTENT.bestWay.description}
                </p>
                <div className="cta-row">
                  <a className="primary-cta" href={emailHref}>
                    {CONTACT_CONTENT.bestWay.emailButton}
                  </a>
                  <a className="secondary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                    {CONTACT_CONTENT.bestWay.channelButton}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </TabPanel>
      )}

      {activeTab === 'start' && (
        <TabPanel id="start" heading={HOME_CONTENT.scrollVault.tabHeading}>
          <section className="panel-block">
            <h2 className="panel-title">{HOME_CONTENT.scrollVault.title}</h2>
            <p className="panel-lede">
              {HOME_CONTENT.scrollVault.description}
            </p>

            <div className="cta-row">
              <a
                className="primary-cta"
                href={YOUTUBE.emailCaptureUrl}
                target="_blank"
                rel="noreferrer"
              >
                {HOME_CONTENT.scrollVault.vaultButton}
              </a>
              <a className="secondary-cta" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
                {HOME_CONTENT.scrollVault.youtubeButton}
              </a>
            </div>

            <PinnedLinks emailHref={emailHref} />
            <StartHereMini />
          </section>
        </TabPanel>
      )}
    </>
  );
}

TabContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

function TabPanel({ id, heading, children }) {
  return (
    <section
      id={`panel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
      className="tabpanel"
    >
      <h1>{heading}</h1>
      <div className="panel-inner">{children}</div>
    </section>
  );
}

TabPanel.propTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node,
};

function PinnedLinks({ emailHref }) {
  return (
    <div className="panel-footer">
      <div className="pinned-links" aria-label={HOME_CONTENT.pinnedLinks.ariaLabel}>
        <a className="pinned-link" href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer">
          <span aria-hidden="true">🔗</span>
          <span>
            <strong>{HOME_CONTENT.pinnedLinks.youtubeTitle}</strong>
            <div className="muted">{HOME_CONTENT.pinnedLinks.youtubeDescription}</div>
          </span>
        </a>
        <a className="pinned-link" href={emailHref}>
          <span aria-hidden="true">✉️</span>
          <span>
            <strong>{HOME_CONTENT.pinnedLinks.emailTitle}</strong>
            <div className="muted">{CONTACT_EMAIL}</div>
          </span>
        </a>
      </div>
    </div>
  );
}

PinnedLinks.propTypes = {
  emailHref: PropTypes.string.isRequired,
};

function ContactInquiryForm({ emailHref }) {
  const [status, setStatus] = useState('idle');
  const confirmationRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setStatus('invalid');
      form.reportValidity();
      form.querySelector(':invalid')?.focus();
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });

      if (!response.ok) throw new Error(CONTACT_CONTENT.form.submissionFailure);

      form.reset();
      setStatus('success');
      window.requestAnimationFrame(() => confirmationRef.current?.focus());
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section
        className="contact-form-card contact-confirmation"
        aria-labelledby="contact-confirmation-title"
        aria-live="polite"
      >
        <h3 id="contact-confirmation-title" ref={confirmationRef} tabIndex={-1}>
          {CONTACT_CONTENT.form.confirmationTitle}
        </h3>
        <p>
          {CONTACT_CONTENT.form.confirmationDescription}
        </p>
        <p className="muted">
          {CONTACT_CONTENT.form.confirmationEmailPrefix}
          <a href={emailHref}>{CONTACT_EMAIL}</a>
          {CONTACT_CONTENT.form.confirmationEmailSuffix}
        </p>
        <button type="button" className="secondary-cta" onClick={() => setStatus('idle')}>
          {CONTACT_CONTENT.form.sendAnotherButton}
        </button>
      </section>
    );
  }

  const statusMessage = status === 'invalid'
    ? CONTACT_CONTENT.form.statuses.invalid
    : status === 'error'
      ? CONTACT_CONTENT.form.statuses.error
      : status === 'submitting'
        ? CONTACT_CONTENT.form.statuses.submitting
        : '';

  return (
    <section className="contact-form-card" aria-labelledby="contact-inquiry-title">
      <h3 id="contact-inquiry-title">{CONTACT_CONTENT.form.title}</h3>
      <p id="contact-inquiry-guidance" className="contact-form-intro">
        {CONTACT_CONTENT.form.guidance}
      </p>
      <p id="contact-required-note" className="contact-required-note">
        {CONTACT_CONTENT.form.requiredPrefix}
        <span aria-hidden="true">*</span>
        {CONTACT_CONTENT.form.requiredSuffix}
      </p>

      <form
        className="contact-form"
        name={CONTACT_FORM_NAME}
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        noValidate
        aria-describedby="contact-inquiry-guidance contact-required-note contact-privacy-note"
        aria-busy={status === 'submitting'}
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />

        <p className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-bot-field">
            {CONTACT_CONTENT.form.honeypotLabel}
            <input id="contact-bot-field" name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div className="contact-form-grid">
          <div className="contact-field">
            <label htmlFor="contact-name">
              {CONTACT_CONTENT.form.fields.name} <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength="100"
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">
              {CONTACT_CONTENT.form.fields.email} <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength="254"
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-organization">
              {CONTACT_CONTENT.form.fields.organization}
            </label>
            <input
              id="contact-organization"
              name="organization"
              type="text"
              autoComplete="organization"
              maxLength="160"
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-inquiry-type">
              {CONTACT_CONTENT.form.fields.inquiryType} <span aria-hidden="true">*</span>
            </label>
            <select id="contact-inquiry-type" name="inquiry-type" defaultValue="" required>
              <option value="" disabled>{CONTACT_CONTENT.form.fields.inquiryTypePlaceholder}</option>
              {INQUIRY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="contact-field contact-field--full">
            <label htmlFor="contact-message">
              {CONTACT_CONTENT.form.fields.message} <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="7"
              maxLength="3000"
              aria-describedby="contact-message-help"
              required
            />
            <span id="contact-message-help" className="contact-field-help">
              {CONTACT_CONTENT.form.fields.messageHelp}
            </span>
          </div>
        </div>

        <p id="contact-privacy-note" className="contact-privacy-note">
          {CONTACT_CONTENT.form.privacy}
        </p>

        <div className="contact-form-actions">
          <button type="submit" className="primary-cta" disabled={status === 'submitting'}>
            {status === 'submitting'
              ? CONTACT_CONTENT.form.submittingButton
              : CONTACT_CONTENT.form.submitButton}
          </button>
        </div>

        {statusMessage ? (
          <p
            className={`contact-form-status${status === 'error' || status === 'invalid' ? ' is-error' : ''}`}
            role={status === 'error' || status === 'invalid' ? 'alert' : 'status'}
          >
            {statusMessage}
          </p>
        ) : null}
      </form>
    </section>
  );
}

ContactInquiryForm.propTypes = {
  emailHref: PropTypes.string.isRequired,
};

function StartHereMini() {
  return (
    <div className="panel-footer">
      <div className="start-here-mini">
        <p>
          <strong>{HOME_CONTENT.startHere.prompt}</strong> {HOME_CONTENT.startHere.destination}
        </p>
        <a className="secondary-cta" href={YOUTUBE.emailCaptureUrl} target="_blank" rel="noreferrer">
          {HOME_CONTENT.startHere.button}
        </a>
      </div>
    </div>
  );
}
