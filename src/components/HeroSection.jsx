import React from "react";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section id="centerHero" className="hero-section" aria-label="Divine Get Down hero">
      <img
        src="/divine_logo.png"
        alt="Divine Get Down Logo"
        className="floating-logo"
        width="240"
        height="240"
        decoding="async"
        fetchPriority="high"
      />
    </section>
  );
}
