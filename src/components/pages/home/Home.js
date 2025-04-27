import React from "react";
import "../home/home.css"; // Assuming your CSS file is in the same directory
import { FaGithub, FaYoutube, FaInstagram } from "react-icons/fa"; // Use the icons from react-icons
import p1 from  "../../src/nav/imgs/2.gif";
import { Analytics } from '@vercel/analytics/react';
const Home = () => {
  return (
    <div>
      <Analytics />
      {/* Main Section */}
      <section className="main">
        <img src={p1} alt="Profile" />
        <span>Satyakiran</span>
        <p>Programmer • Web Developer •   Gamer</p>
      </section>
    </div>
    
  );
};

export default Home;
