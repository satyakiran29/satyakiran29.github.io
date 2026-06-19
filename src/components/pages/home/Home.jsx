import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../home/home.css";

import { Analytics } from '@vercel/analytics/react';
import Skills from "./Skills";
import { FaGooglePlay } from "react-icons/fa";

const PHRASES = [
  "Web Developer",
  "Android Dev",
  "Linux Enthusiast",
  "Full Stack Engineer",
  "Open Source Contributor",
];

const TYPING_SPEED = 80;   // ms per character when typing
const ERASE_SPEED  = 40;   // ms per character when erasing
const PAUSE_AFTER  = 1800; // ms to hold the completed phrase
const PAUSE_BEFORE = 400;  // ms to wait before typing next phrase

function useTypewriter(phrases) {
  const [displayed, setDisplayed]   = useState("");
  const [phraseIdx, setPhraseIdx]   = useState(0);
  const [charIdx, setCharIdx]       = useState(0);
  const [erasing, setErasing]       = useState(false);
  const [paused, setPaused]         = useState(false);

  useEffect(() => {
    if (paused) return;

    const current = phrases[phraseIdx];

    if (!erasing && charIdx < current.length) {
      // Still typing
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(t);
    }

    if (!erasing && charIdx === current.length) {
      // Finished typing — pause then start erasing
      setPaused(true);
      const t = setTimeout(() => {
        setErasing(true);
        setPaused(false);
      }, PAUSE_AFTER);
      return () => clearTimeout(t);
    }

    if (erasing && charIdx > 0) {
      // Still erasing
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }, ERASE_SPEED);
      return () => clearTimeout(t);
    }

    if (erasing && charIdx === 0) {
      // Finished erasing — pause then move to next phrase
      setPaused(true);
      const t = setTimeout(() => {
        setErasing(false);
        setPhraseIdx(i => (i + 1) % phrases.length);
        setPaused(false);
      }, PAUSE_BEFORE);
      return () => clearTimeout(t);
    }
  }, [charIdx, erasing, paused, phraseIdx, phrases]);

  return { displayed, erasing };
}

const Home = () => {
  const { displayed, erasing } = useTypewriter(PHRASES);

  return (
    <div className="home-wrapper">
      <Helmet>
        <title>Satyakiran | Full-Stack Web Developer & Android Dev</title>
        <meta name="description" content="Official portfolio of Satyakiran, a passionate Full-Stack Web Developer, Android Developer, and Linux enthusiast. Explore projects, certifications, and technical experience." />
        <meta name="keywords" content="Satyakiran, Satyakiran portfolio, web developer, Android developer, full stack engineer, react developer, SkDev, Anify, Aniset" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://satyakiran.vercel.app/" />
        <meta property="og:title" content="Satyakiran | Full-Stack Web Developer & Android Dev" />
        <meta property="og:description" content="Discover projects, experience, and certifications on the official portfolio site of Satyakiran." />
        <meta property="og:image" content="https://raw.githubusercontent.com/satyakiran29/satyakiran29/refs/heads/main/Images/photo_2025-02-15_00-51-41.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://satyakiran.vercel.app/" />
        <meta name="twitter:title" content="Satyakiran | Full-Stack Web Developer & Android Dev" />
        <meta name="twitter:description" content="Discover projects, experience, and certifications on the official portfolio site of Satyakiran." />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/satyakiran29/satyakiran29/refs/heads/main/Images/photo_2025-02-15_00-51-41.jpg" />
      </Helmet>
      <Analytics />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-image-container">
            <img src="https://avatars.githubusercontent.com/u/87798342?v=4" alt="Profile" className="hero-img" />
            <div className="glow-ring"></div>
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Satyakiran</span>
          </h1>
          <p className="hero-subtitle">
            <span className="typewriter-js">
              {displayed}
              <span className={`tw-cursor${erasing ? ' tw-cursor--erasing' : ''}`}>|</span>
            </span>
          </p>
          <div className="hero-actions">
            <a href="/resume.pdf" download className="btn-primary">
              Download Resume
            </a>
            <a href="#projects" className="btn-secondary">
              View Work
            </a>
            <a href="https://play.google.com/store/apps/dev?id=9166037782169864125" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FaGooglePlay /> Play Console
            </a>
          </div>
        </div>


      </section>

      {/* Skills Section */}
      <Skills />
    </div>
  );
};

export default Home;
