import React, { useState, useEffect, useRef } from "react";
import HeroSection from "./components/HeroSection";
import NavigationBar from "./components/NavigationBar";
import TabContent from "./components/TabContent";
import StarryBackground from "./components/StarryBackground";

export default function DivineGetDownTabs() {
  const [activeTab, setActiveTab] = useState("welcome");
  const bgMusicRef = useRef(null);

  useEffect(() => {
    if (activeTab === "youUniversalGroove") {
      bgMusicRef.current?.play().catch(() => {});
    } else {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    }
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("centerHero");
      if (hero) {
        const opacity = 1 - window.scrollY / 300;
        hero.style.opacity = opacity < 0 ? 0 : opacity;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <StarryBackground />
      <HeroSection activeTab={activeTab} />
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent activeTab={activeTab} bgMusicRef={bgMusicRef} />
    </>
  );
}
