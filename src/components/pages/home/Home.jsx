import React from "react";
import "../home/home.css";
import p1 from "../../src/nav/imgs/2.gif";
import { Analytics } from '@vercel/analytics/react';
import Skills from "./Skills";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Analytics />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-image-container">
            <img src={p1} alt="Profile" className="hero-img" />
            <div className="glow-ring"></div>
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Satyakiran</span>
          </h1>
          <p className="hero-subtitle">
            <span className="typewriter">Programmer • Web Developer • Gamer</span>
          </p>
          <div className="hero-actions">
            <a href="/resume.pdf" download className="btn-primary">
              Download Resume
            </a>
            <a href="#projects" className="btn-secondary">
              View Work
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
