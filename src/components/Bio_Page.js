import React from "react";
import { FaBlog, FaSteam, FaInstagram, FaGlobe } from "react-icons/fa";
import "././pages/css/bio.css"; // Import the CSS file
const ProfileCard = () => {
  return (
    <div className="container">
      <div className="card">
        <img
          src="https://bio-satyakiran.vercel.app/_next/image?url=%2Fp.png&w=96&q=75"
          alt="Profile"
          className="profile-pic"
        />
        <h2 className="name">Satyakiran</h2>
        <p className="title">Gamer & Web Developer</p>

        <div className="info-buttons">
          <button className="info-button">Website</button>
          <button className="info-button">psatyakiran1@gmail.com</button>
        </div>

        <div className="social-links">
          <a href="https://example.com/blog" className="social-button">
            <FaBlog /> Blog
          </a>
          <a href="https://steamcommunity.com/id/skdev29/" className="social-button">
            <FaSteam /> Steam
          </a>
          <a href="https://www.instagram.com/skdev29/" className="social-button">
            <FaInstagram /> Instagram (Public)
          </a>
          <a href="https://www.instagram.com/satyakiran29/" className="social-button">
            <FaInstagram /> Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
