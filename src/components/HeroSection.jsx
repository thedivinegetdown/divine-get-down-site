import React from "react";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section id="centerHero" className="hero-section">
      <picture>
      <source srcSet="/divine_logo.webp" type="image/webp" />
      <img
        src="/divine_logo.png"
        alt="Divine Get Down Logo"
        className="floating-logo"
      
        width="160"
        height="160"
        decoding="async"
        fetchPriority="high"
      />
    </picture>
    </section>
  );
}
