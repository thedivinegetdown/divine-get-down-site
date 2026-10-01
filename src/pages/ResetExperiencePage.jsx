import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import { RESET_EXPERIENCE_CONTENT } from '../content/resetExperience';
import { SITE } from '../content/site';
import '../App.css';
import './ResetExperiencePage.css';

function ResetExperiencePage() {
  return (
    <div className="App reset-experience-page">
      <MetaTags {...RESET_EXPERIENCE_CONTENT.metadata} />

      <main className="reset-shell" id="main-content" tabIndex={-1}>
        <section className="reset-hero" aria-labelledby="reset-hero-title">
          <Link className="reset-back-link" to={SITE.links.home}>
            {RESET_EXPERIENCE_CONTENT.backLabel}
          </Link>

          <picture>
            <source srcSet={SITE.logo.webp} type="image/webp" />
            <img
              src={SITE.logo.png}
              alt={SITE.logo.alt}
              className="reset-logo"
              width={SITE.logo.width}
              height={SITE.logo.height}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          <p className="reset-kicker">{RESET_EXPERIENCE_CONTENT.kicker}</p>
          <h1 id="reset-hero-title">{RESET_EXPERIENCE_CONTENT.title}</h1>
          <p className="reset-subheading">
            {RESET_EXPERIENCE_CONTENT.description}
          </p>

        </section>

        <section
          className="reset-content"
          aria-label={RESET_EXPERIENCE_CONTENT.detailsAriaLabel}
        >
          <article className="reset-panel reset-panel-wide">
            <span className="reset-section-number">
              {RESET_EXPERIENCE_CONTENT.sections.whatThisIs.number}
            </span>
            <h2>{RESET_EXPERIENCE_CONTENT.sections.whatThisIs.title}</h2>
            <p>
              {RESET_EXPERIENCE_CONTENT.sections.whatThisIs.description}
            </p>
          </article>

          <div className="reset-grid">
            <article className="reset-panel">
              <span className="reset-section-number">
                {RESET_EXPERIENCE_CONTENT.sections.audience.number}
              </span>
              <h2>{RESET_EXPERIENCE_CONTENT.sections.audience.title}</h2>
              <ul className="reset-list">
                {RESET_EXPERIENCE_CONTENT.sections.audience.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="reset-panel">
              <span className="reset-section-number">
                {RESET_EXPERIENCE_CONTENT.sections.receive.number}
              </span>
              <h2>{RESET_EXPERIENCE_CONTENT.sections.receive.title}</h2>
              <ul className="reset-list">
                {RESET_EXPERIENCE_CONTENT.sections.receive.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <section className="reset-checkout" id="availability" aria-labelledby="reset-availability-title">
            <span className="reset-section-number">
              {RESET_EXPERIENCE_CONTENT.sections.availability.number}
            </span>
            <h2 id="reset-availability-title">
              {RESET_EXPERIENCE_CONTENT.sections.availability.title}
            </h2>
            <p>
              {RESET_EXPERIENCE_CONTENT.sections.availability.description}
            </p>
          </section>

          <p className="reset-footer-line">
            {RESET_EXPERIENCE_CONTENT.footer}
          </p>
        </section>
      </main>
    </div>
  );
}

export default ResetExperiencePage;
