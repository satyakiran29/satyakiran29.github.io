import React from "react";
import "../home/home.css";
import p1 from  "../../src/nav/imgs/2.gif";
import { Analytics } from '@vercel/analytics/react';

const Home = () => {
  // Handler for chat button click
  const handleChatClick = () => {
    alert("Chat feature coming soon!");
  };

  return (
    <div>
      <Analytics />
      {/* Main Section */}
      <section className="main">
        <img src={p1} alt="Profile" />
        <span>Satyakiran</span>
        <p>Programmer • Web Developer •   Gamer</p>
        <button className="chat-btn" onClick={handleChatClick}>
          Guestbook
        </button>
      </section>
    </div>
  );
};

export default Home;
