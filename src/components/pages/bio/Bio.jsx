import React from "react";
import { Helmet } from "react-helmet";
import "../bio/bio.css"; // Import the CSS file
import {
  FaSteam,
  FaInstagram,
  FaTelegram,
  FaDiscord,
  FaLinkedin,
  FaGooglePlay,
  FaGlobe,
  FaBookOpen,
  FaEnvelope
} from "react-icons/fa";

const CodingBackground = () => {
  const particles = [
    { text: "const", top: "12%", left: "10%", delay: "0s", duration: "14s" },
    { text: "{ }", top: "25%", left: "80%", delay: "2.5s", duration: "16s" },
    { text: "import React", top: "18%", left: "60%", delay: "4s", duration: "20s" },
    { text: "<div />", top: "45%", left: "6%", delay: "1.2s", duration: "15s" },
    { text: "=>", top: "58%", left: "85%", delay: "5.5s", duration: "12s" },
    { text: "console.log", top: "72%", left: "14%", delay: "3s", duration: "18s" },
    { text: "[ ]", top: "82%", left: "88%", delay: "4.5s", duration: "14s" },
    { text: "function()", top: "35%", left: "88%", delay: "6.5s", duration: "19s" },
    { text: "===", top: "50%", left: "22%", delay: "0.5s", duration: "13s" },
    { text: "export default", top: "88%", left: "38%", delay: "7.5s", duration: "22s" },
    { text: "npm start", top: "8%", left: "35%", delay: "3.2s", duration: "17s" },
    { text: "&&", top: "68%", left: "64%", delay: "2.2s", duration: "14s" },
    { text: "true", top: "30%", left: "8%", delay: "4.8s", duration: "16s" },
    { text: "false", top: "78%", left: "72%", delay: "1.5s", duration: "15s" }
  ];

  return (
    <div className="b_code-bg">
      {particles.map((p, index) => (
        <span
          key={index}
          className="b_code-particle"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
};

const ProfileCard = () => {
  const [steamStatus, setSteamStatus] = React.useState({ state: "loading", message: "Loading..." });

  React.useEffect(() => {
    const fetchSteamStatus = async () => {
      const urls = [
        "https://corsproxy.io/?https://steamcommunity.com/id/skdev29/?xml=1&t=" + Date.now(),
        "https://api.allorigins.win/get?url=" + encodeURIComponent("https://steamcommunity.com/id/skdev29/?xml=1&t=" + Date.now())
      ];

      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;

          let xmlText = "";
          if (url.includes("allorigins")) {
            const data = await res.json();
            xmlText = data.contents;
          } else {
            xmlText = await res.text();
          }

          if (!xmlText) continue;

          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, "text/xml");

          // Check for parser errors
          if (xmlDoc.getElementsByTagName("parsererror").length > 0) continue;

          const onlineState = xmlDoc.getElementsByTagName("onlineState")[0]?.textContent || "offline";
          const stateMessage = xmlDoc.getElementsByTagName("stateMessage")[0]?.textContent || "Offline";

          let state = "offline";
          let message = "Offline";

          if (onlineState === "in-game") {
            state = "in-game";
            const gameName = xmlDoc.getElementsByTagName("gameName")[0]?.textContent;
            message = gameName ? `Playing: ${gameName}` : "In-Game";
          } else if (onlineState === "online") {
            state = "online";
            message = "Online";
          }

          setSteamStatus({ state, message });
          return;
        } catch (err) {
          console.warn("Failed to fetch steam status from", url, err);
        }
      }
      setSteamStatus({ state: "offline", message: "Offline" });
    };

    fetchSteamStatus();
  }, []);

  return (
    <>
      <Helmet>
        <title>Satyakiran | Links & Bio</title>
        <meta name="description" content="Connect with Satyakiran - Gamer & Web Developer. Links to website, blogs, social media profiles, and Play Store developer console." />
        <meta name="keywords" content="Satyakiran, developer bio, Linktree, portfolio, gamer, web developer, Android developer, Play Store developer" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://satyakiran.vercel.app/bio" />
        <meta property="og:title" content="Satyakiran | Links & Bio" />
        <meta property="og:description" content="Connect with Satyakiran - Gamer & Web Developer. Links to portfolio, blog, social media, and apps." />
        <meta property="og:image" content="https://raw.githubusercontent.com/satyakiran29/satyakiran29/refs/heads/main/Images/photo_2025-02-15_00-51-41.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://satyakiran.vercel.app/bio" />
        <meta name="twitter:title" content="Satyakiran | Links & Bio" />
        <meta name="twitter:description" content="Connect with Satyakiran - Gamer & Web Developer. Links to portfolio, blog, social media, and apps." />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/satyakiran29/satyakiran29/refs/heads/main/Images/photo_2025-02-15_00-51-41.jpg" />
      </Helmet>

      <div className="b_container">
        <CodingBackground />
        <div className="b_card">
          <div className="b_profile-image-container">
            <div className="b_glow-ring"></div>
            <img
              src="https://raw.githubusercontent.com/satyakiran29/satyakiran29/refs/heads/main/Images/photo_2025-02-15_00-51-41.jpg"
              alt="Profile"
              className="b_profile-pic"
            />
          </div>
          <h2 className="b_name gradient-text">Satyakiran</h2>
          <p className="b_title">Gamer & Web Developer</p>

          <div className="b_info-buttons">
            <a href="https://satyakiran.vercel.app" className="b_info-button">
              <FaGlobe /> Website
            </a>
            <a href="https://satyakiran-blog.vercel.app" className="b_info-button">
              <FaBookOpen /> Blog Website
            </a>
            <a href="mailto:psatyakiran1@gmail.com" className="b_info-button">
              <FaEnvelope /> Email
            </a>
          </div>

          <div className="b_social-links">
            <a href="https://www.linkedin.com/in/satyakiran29/" className="b_social-button b_linkedin" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> Linkedin
            </a>
            <a href="https://discord.com/users/skdev29" className="b_social-button b_discord" target="_blank" rel="noopener noreferrer">
              <FaDiscord /> Discord
            </a>

            <a href="https://www.t.me/skdev1/" className="b_social-button b_telegram" target="_blank" rel="noopener noreferrer">
              <FaTelegram /> Telegram
            </a>
            <a href="https://steamcommunity.com/id/skdev29/" className="b_social-button b_steam" target="_blank" rel="noopener noreferrer">
              <FaSteam /> Steam
              {steamStatus.state !== "loading" && (
                <span className={`b_steam-badge ${steamStatus.state}`}>
                  {steamStatus.message}
                </span>
              )}
            </a>

            <a href="https://www.instagram.com/skdev29/" className="b_social-button b_instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram /> Instagram (Creative)
            </a>
            <a href="https://www.instagram.com/satyakiran29/" className="b_social-button b_instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram /> Instagram (Personal)
            </a>
            <a href="https://play.google.com/store/apps/dev?id=9166037782169864125" className="b_social-button b_playstore b_playstore-button" target="_blank" rel="noopener noreferrer">
              <FaGooglePlay /> Play Store
            </a>
            <a href="https://myanimelist.net/profile/satyakiran29" className="b_social-button b_myanimelist" target="_blank" rel="noopener noreferrer">
              MyAnimeList
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
