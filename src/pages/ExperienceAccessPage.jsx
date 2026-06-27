import React from "react";

export default function ExperienceAccessPage() {
  console.log("🔥 EXPERIENCE ACCESS PAGE LOADED");

  return (
    <div style={{ padding: "40px", textAlign: "center", color: "white" }}>
      <h1>Welcome to The Experience</h1>

      <h2 style={{ color: "#FFD700" }}>THIS IS LIVE TEST</h2>

      <p>You’ve unlocked access.</p>

      <div style={{ marginTop: "30px" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="Divine Get Down Experience"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
