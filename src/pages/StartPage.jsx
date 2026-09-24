import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import { SITE } from '../content/site';
import { START_CONTENT } from '../content/start';
import '../App.css';
import './StartPage.css';

function ResourceAction({ resource, children, className = 'text-link' }) {
  if (resource.external) {
    return (
      <a className={className} href={resource.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={resource.href}>
      {children}
    </Link>
  );
}

ResourceAction.propTypes = {
  resource: PropTypes.shape({
    external: PropTypes.bool.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function StartPage() {
  const [selectedPathwayId, setSelectedPathwayId] = useState(null);
  const recommendationHeadingRef = useRef(null);
  const selectionHeadingRef = useRef(null);
  const selectedPathway = START_CONTENT.pathways.find(
    ({ id }) => id === selectedPathwayId,
  );

  useEffect(() => {
    if (selectedPathway) recommendationHeadingRef.current?.focus();
  }, [selectedPathway]);

  const chooseAnotherPath = () => {
    setSelectedPathwayId(null);
    window.requestAnimationFrame(() => selectionHeadingRef.current?.focus());
  };

  return (
    <div className="App">
      <MetaTags {...START_CONTENT.metadata} />

      <main className="start-shell page-shell" id="main-content" tabIndex={-1}>
        <div className="start-container section-container">
          <header className="start-hero">
            <Link className="start-brand-link" to={SITE.links.home}>
              <picture>
                <source srcSet={SITE.logo.webp} type="image/webp" />
                <img
                  src={SITE.logo.png}
                  alt={SITE.logo.alt}
                  className="start-logo"
                  width={SITE.logo.width}
                  height={SITE.logo.height}
                  loading="eager"
                  decoding="async"
                />
              </picture>
              <span>{START_CONTENT.brandKicker}</span>
            </Link>

            <h1>{START_CONTENT.title}</h1>
            <p>{START_CONTENT.introduction}</p>
          </header>

          <nav className="start-utility-nav" aria-label="Guided experience navigation">
            {START_CONTENT.utilityLinks.map((link) => (
              <Link className="text-link" key={link.id} to={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          {!selectedPathway ? (
            <section className="start-selection" aria-labelledby="start-selection-heading">
              <h2 id="start-selection-heading" ref={selectionHeadingRef} tabIndex={-1}>
                {START_CONTENT.selectionHeading}
              </h2>
              <div className="start-pathway-list">
                {START_CONTENT.pathways.map((pathway) => (
                  <button
                    className="start-pathway-choice"
                    key={pathway.id}
                    type="button"
                    data-pathway-id={pathway.id}
                    onClick={() => setSelectedPathwayId(pathway.id)}
                  >
                    <span className="start-pathway-name">{pathway.name}</span>
                    <span className="start-pathway-invitation">{pathway.invitation}</span>
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <section
              className="start-recommendation"
              aria-labelledby="start-recommendation-heading"
              aria-live="polite"
            >
              <p className="start-recommendation-kicker">{selectedPathway.name}</p>
              <h2
                id="start-recommendation-heading"
                ref={recommendationHeadingRef}
                tabIndex={-1}
              >
                {START_CONTENT.beginHeading}
              </h2>
              <p className="start-recommendation-invitation">
                {selectedPathway.invitation}
              </p>

              <article className="start-primary-resource panel">
                <p className="start-resource-format">{selectedPathway.primary.format}</p>
                <h3>{selectedPathway.primary.title}</h3>
                <p>{selectedPathway.primary.description}</p>
                <ResourceAction resource={selectedPathway.primary} className="primary-cta">
                  {selectedPathway.primaryCta}
                </ResourceAction>
              </article>

              <div className="start-secondary-resources">
                <h3>{START_CONTENT.secondaryHeading}</h3>
                <ul>
                  {selectedPathway.secondary.map((resource) => (
                    <li key={resource.id}>
                      <p className="start-resource-format">{resource.format}</p>
                      <ResourceAction resource={resource}>{resource.title}</ResourceAction>
                      <p>{resource.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="secondary-cta start-choose-another"
                type="button"
                onClick={chooseAnotherPath}
              >
                {START_CONTENT.chooseAnother}
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default StartPage;
