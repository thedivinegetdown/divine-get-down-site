import React from "react";
import MetaTags from '../components/MetaTags';

export default function ExperienceAccessPage() {
  return (
    <div style={{ padding: "40px", textAlign: "center", color: "white" }}>
      <MetaTags
        title="Reset Experience Access | The Divine Get Down"
        description="Access the guided Reset Experience and open the Reset Companion from The Divine Get Down."
        path="/experience-access"
        noIndex
      />

      <h1>Welcome to The Experience</h1>

      <h2 style={{ color: "#FFD700" }}>THIS IS LIVE TEST</h2>

      <p>You&rsquo;ve unlocked access.</p>

      <div style={{ marginTop: "30px" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-2hkUCrCK_0"
          title="Divine Get Down Experience"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <div style={{ marginTop: "24px" }}>
        <a
          className="primary-cta"
          href="/reset-companion.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open The Reset Companion
        </a>
      </div>
    </div>
  );
}
