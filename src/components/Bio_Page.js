import React from "react";
import {  FaSteam, FaInstagram,  FaTelegram } from "react-icons/fa";
import "././pages/css/bio.css"; // Import the CSS file
const ProfileCard = () => {
  return (
    <div className="b_container">
      <div className="b_card">
        <img
          src="https://raw.githubusercontent.com/satyakiran29/satyakiran29/refs/heads/main/Images/photo_2025-02-15_00-51-41.jpg"
          alt="Profile"
          className="profile-pic"
        />
        <h2 className="b_name">Satyakiran</h2>
        <p className="b_title">Gamer & Web Developer</p>

        <div className="b_info-buttons">
          <a href="https://satyakiran.vercel.app" className="b_info-button">Website</a>
          <a href="mailto:psatyakiran1@gmail.com" className="b_info-button">psatyakiran1@gmail.com</a>
        </div>
        
        <div className="b_social-links">
          <a href="https://www.t.me/skdev1/" className="b_social-button">
            <FaTelegram /> Telegram
          </a>
          <a href="https://steamcommunity.com/id/skdev29/" className="b_social-button">
            <FaSteam /> Steam
          </a>
          <a href="https://www.instagram.com/skdev29/" className="b_social-button">
            <FaInstagram /> Instagram (Public)
          </a>
          <a href="https://www.instagram.com/satyakiran29/" className="b_social-button">
            <FaInstagram /> Instagram
          </a>
        
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
