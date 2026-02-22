import React from "react";
import "../home/home.css";
import p1 from "../../src/nav/imgs/2.gif";
import { Analytics } from '@vercel/analytics/react';
import Skills from "./Skills";

const Home = () => {
  return (
    <div>
      <Analytics />
      {/* Main Section */}
      <section className="main">
        <img src={p1} alt="Profile" />
        <span>Satyakiran</span>
        <p>Programmer • Web Developer • Gamer</p>
        <a href="/resume.pdf" download className="resume-btn">
          Download Resume
        </a>
      </section>

      {/* Skills Section */}
      <Skills />
    </div>
  );
};

export default Home;
