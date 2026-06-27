import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import '../App.css';
import './ResetExperiencePage.css';

const audienceItems = [
  'mentally overwhelmed',
  'disconnected from yourself',
  'emotionally heavy',
  'out of rhythm or unfocused',
];

const receiveItems = [
  'guided Divine Get Down experience',
  'movement + rhythm + presence',
  'encouragement and clarity',
  'repeatable reset experience',
];

const checkoutUrl =
  process.env.REACT_APP_RESET_EXPERIENCE_CHECKOUT_URL || '/experience-access';

function ResetExperiencePage() {
  const checkoutIsExternal = /^https?:\/\//i.test(checkoutUrl);

  return (
    <div className="App reset-experience-page" aria-live="polite">
      <MetaTags
        title="Reset Experience | The Divine Get Down"
        description="A guided movement and rhythm-based experience designed to help you reset your mind, reconnect to your body, and realign your spirit."
        path="/reset-experience"
      />

      <main className="reset-shell" id="main-content">
        <section className="reset-hero" aria-labelledby="reset-hero-title">
          <Link className="reset-back-link" to="/">
            Back to the Sanctuary
          </Link>

          <picture>
            <source srcSet="/divine_logo.webp" type="image/webp" />
            <img
              src="/divine_logo.png"
              alt="The Divine Get Down crest"
              className="reset-logo"
              width="160"
              height="160"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          <p className="reset-kicker">Reset Experience</p>
          <h1 id="reset-hero-title">Return to Alignment.</h1>
          <p className="reset-subheading">
            A guided movement and rhythm-based experience designed to help you reset your
            mind, reconnect to your body, and realign your spirit.
          </p>

          <a
            className="primary-cta reset-cta"
            href={checkoutUrl}
            target={checkoutIsExternal ? '_blank' : undefined}
            rel={checkoutIsExternal ? 'noreferrer' : undefined}
          >
            Unlock The Experience
          </a>
        </section>

        <section className="reset-content" aria-label="Reset Experience details">
          <article className="reset-panel reset-panel-wide">
            <span className="reset-section-number">01</span>
            <h2>What This Is</h2>
            <p>
              This is not just a video. This is a guided experience. Through movement,
              presence, and real encouragement, you&rsquo;ll be led into a space where your
              mind quiets, your body reconnects, and your spirit realigns.
            </p>
          </article>

          <div className="reset-grid">
            <article className="reset-panel">
              <span className="reset-section-number">02</span>
              <h2>Who It&rsquo;s For</h2>
              <ul className="reset-list">
                {audienceItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="reset-panel">
              <span className="reset-section-number">03</span>
              <h2>What You Receive</h2>
              <ul className="reset-list">
                {receiveItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <section className="reset-checkout" id="checkout" aria-labelledby="reset-price-title">
            <span className="reset-section-number">04</span>
            <h2 id="reset-price-title">$17 &mdash; One-Time Access</h2>
            <p>
              Step into the reset whenever you need a guided return to presence, rhythm,
              and clarity.
            </p>
            <a
              className="primary-cta reset-cta"
              href={checkoutUrl}
              target={checkoutIsExternal ? '_blank' : undefined}
              rel={checkoutIsExternal ? 'noreferrer' : undefined}
            >
              Unlock The Experience
            </a>
          </section>

          <p className="reset-footer-line">
            You don&rsquo;t need to stay stuck. You just need to reconnect.
          </p>
        </section>
      </main>
    </div>
  );
}

export default ResetExperiencePage;
