import React from "react";
import MetaTags from '../components/MetaTags';
import { RESET_EXPERIENCE_CONTENT } from '../content/resetExperience';
import { YOUTUBE } from '../content/youtube';

export default function ExperienceAccessPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      style={{ padding: "40px", textAlign: "center", color: "white" }}
    >
      <MetaTags {...RESET_EXPERIENCE_CONTENT.access.metadata} />

      <h1>{RESET_EXPERIENCE_CONTENT.access.title}</h1>

      <h2 style={{ color: "#FFD700" }}>
        {RESET_EXPERIENCE_CONTENT.access.testBanner}
      </h2>

      <p>{RESET_EXPERIENCE_CONTENT.access.unlocked}</p>

      <div style={{ marginTop: "30px" }}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${YOUTUBE.experienceVideoId}`}
          title={RESET_EXPERIENCE_CONTENT.access.videoTitle}
          frameBorder="0"
          style={{ width: "100%", maxWidth: "560px", height: "auto", aspectRatio: "16 / 9" }}
          allowFullScreen
        ></iframe>
      </div>

      <div style={{ marginTop: "24px" }}>
        <a
          className="primary-cta"
          href={RESET_EXPERIENCE_CONTENT.access.companionHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {RESET_EXPERIENCE_CONTENT.access.companionButton}
        </a>
      </div>
    </main>
  );
}
