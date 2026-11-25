import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../home/home.css";

import { Analytics } from '@vercel/analytics/react';
import Skills from "./Skills";
import { FaGooglePlay, FaEye, FaDownload, FaBriefcase, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { useIstStatus } from "../../../utils/useIstStatus";

const PHRASES = [
  "Web Developer",
  "Android Dev",
  "Linux Enthusiast",
  "Full Stack Engineer",
  "Open Source Contributor",
];

const TYPING_SPEED = 80;   // ms per character when typing
const ERASE_SPEED = 40;   // ms per character when erasing
const PAUSE_AFTER = 1800; // ms to hold the completed phrase
const PAUSE_BEFORE = 400;  // ms to wait before typing next phrase

function useTypewriter(phrases) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [erasing, setErasing] = useState(false);
  const [paused, setPaused] = useState(false);

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
  const ist = useIstStatus();
  const [searchParams, setSearchParams] = useSearchParams();
  const [resumeOpen, setResumeOpen] = useState(false);

  const openResumeModal = () => {
    setResumeOpen(true);
    const next = new URLSearchParams(searchParams);
    next.set("resume", "1");
    setSearchParams(next, { replace: true });
  };

  const closeResumeModal = () => {
    setResumeOpen(false);
    if (searchParams.has("resume")) {
      const next = new URLSearchParams(searchParams);
      next.delete("resume");
      setSearchParams(next, { replace: true });
    }
  };

  useEffect(() => {
    if (searchParams.get("resume") === "1") {
      setResumeOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!resumeOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const handleEsc = (e) => {
      if (e.key === "Escape") closeResumeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [resumeOpen]);

  return (
    <div className="home-wrapper">
      <Helmet>
        <title>Satyakiran | Full-Stack Web Developer & Android Dev</title>
        <meta name="description" content="Official portfolio of Satyakiran, a passionate Full-Stack Web Developer, Android Developer, and Linux enthusiast. Explore projects, certifications, and technical experience." />
        <meta name="keywords" content="Satyakiran, Satyakiran portfolio, web developer, Android developer, full stack engineer, react developer, SkDev, Anify, Aniset" />
        <link rel="canonical" href="https://satyakiran.vercel.app/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Satyakiran Portfolio" />
        <meta property="og:url" content="https://satyakiran.vercel.app/" />
        <meta property="og:title" content="Satyakiran | Full-Stack Web Developer & Android Dev" />
        <meta property="og:description" content="Discover projects, experience, and certifications on the official portfolio site of Satyakiran." />
        <meta property="og:image" content="https://satyakiran.vercel.app/og-card.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://satyakiran.vercel.app/" />
        <meta name="twitter:title" content="Satyakiran | Full-Stack Web Developer & Android Dev" />
        <meta name="twitter:description" content="Discover projects, experience, and certifications on the official portfolio site of Satyakiran." />
        <meta name="twitter:image" content="https://satyakiran.vercel.app/og-card.png" />
        <meta name="twitter:creator" content="@satyakiran29" />
      </Helmet>
      <Analytics />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-image-container">
            <img src="https://avatars.githubusercontent.com/u/87798342?v=4" alt="Profile" className="hero-img" fetchPriority="high" decoding="async" />
            <Link to="/freelance" className="status-badge" title="Available for Freelance">
              <div className="status-dot-container">
                <div className="status-dot"></div>
              </div>
              <div className="status-text-container">
                <span className="status-label">Status</span>
                <span className="status-text">Open for work</span>
              </div>
            </Link>
          </div>
          <h1 className="hero-title">
            Hi, I'm Satyakiran
          </h1>
          <p className="hero-subtitle">
            <span className="typewriter-js">
              {displayed}
              <span className={`tw-cursor${erasing ? ' tw-cursor--erasing' : ''}`}>|</span>
            </span>
          </p>
          <div className="hero-actions">
            <Link to="/freelance" className="btn-primary">
              <FaBriefcase /> Hire Me
            </Link>
            <div className="resume-btn-group">
              <button
                type="button"
                onClick={openResumeModal}
                className="resume-btn-main"
                title="Preview Resume"
              >
                <FaEye /> Resume
              </button>
              <span className="resume-btn-divider"></span>
              <a href="/resume.pdf" download="satyakiran_resume.pdf" className="resume-btn-dl" title="Download Resume">
                <FaDownload />
              </a>
            </div>
            <a href="#projects" className="btn-secondary">
              View Work
            </a>
            <a href="https://play.google.com/store/apps/dev?id=9166037782169864125" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <FaGooglePlay /> Play Console
            </a>
          </div>

          <div className="hero-proof-strip" aria-label="Highlights">
            <div className="proof-item">
              <span className="proof-value">2+</span>
              <span className="proof-label">Play Store Apps</span>
            </div>
            <div className="proof-item">
              <span className="proof-value proof-value--positive">Open</span>
              <span className="proof-label">Freelance &amp; Collab</span>
            </div>
          </div>

          <div className="ist-availability-pill" title="India Standard Time (UTC+5:30)">
            <span className={`ist-dot${ist.isOnlineHours ? " ist-dot--online" : ""}`} aria-hidden="true"></span>
            <span>IST {ist.timeText} (UTC+5:30)</span>
            <span className="ist-sep">•</span>
            <span>{ist.statusLabel}</span>
          </div>
        </div>


      </section>

      {/* Skills Section */}
      <Skills />

      {resumeOpen && (
        <div
          className="resume-modal-overlay"
          onClick={closeResumeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Resume Preview"
        >
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <div className="resume-modal-title-group">
                <span className="resume-modal-title">Resume Preview</span>
                <span className="resume-modal-file">satyakiran_resume.pdf</span>
              </div>
              <div className="resume-modal-actions">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-modal-action"
                >
                  <FaExternalLinkAlt /> Open Tab
                </a>
                <a
                  href="/resume.pdf"
                  download="satyakiran_resume.pdf"
                  className="resume-modal-action resume-modal-action--primary"
                >
                  <FaDownload /> Download
                </a>
                <button
                  type="button"
                  className="resume-modal-close"
                  onClick={closeResumeModal}
                  aria-label="Close resume preview"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="resume-modal-body">
              <iframe
                src="/resume.pdf#view=FitH"
                title="Satyakiran Resume PDF"
                className="resume-modal-frame"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
