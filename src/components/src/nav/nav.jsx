import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../nav/Navbar.css";
import { HamburgetMenuClose } from "./Icons";
import {
  FaHome,
  FaThLarge,
  FaPalette,
  FaGraduationCap,
  FaHeart,
  FaUserNinja,
  FaChevronRight,
  FaTimes,
  FaTelegramPlane,
  FaGooglePlay,
  FaInstagram,
  FaEnvelope,
  FaGithub
} from "react-icons/fa";

function NavBar() {
  const [click, setClick] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  // Track active section for mobile menu glowing indicator
  useEffect(() => {
    if (location.pathname === "/bio" || location.pathname === "/Bio") {
      setActiveSection("bio");
      return;
    }

    const handleScroll = () => {
      const sections = ["home", "projects", "designs", "about", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (click) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [click]);

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname !== "/") {
      window.location.href = `/#${targetId}`;
      return;
    }
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 75,
        behavior: "smooth"
      });
    }
    setActiveSection(targetId);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/#home" className="navbar-logo" onClick={(e) => smoothScroll(e, "home")}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">satyakiran</span>
            <span className="logo-bracket">/&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-menu desktop-menu">
            <li className="nav-item">
              <a
                href="/#home"
                className={`nav-links ${activeSection === "home" && location.pathname === "/" ? "active" : ""}`}
                onClick={(e) => smoothScroll(e, "home")}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#projects"
                className={`nav-links ${activeSection === "projects" && location.pathname === "/" ? "active" : ""}`}
                onClick={(e) => smoothScroll(e, "projects")}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#designs"
                className={`nav-links ${activeSection === "designs" && location.pathname === "/" ? "active" : ""}`}
                onClick={(e) => smoothScroll(e, "designs")}
              >
                Designs
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#about"
                className={`nav-links ${activeSection === "about" && location.pathname === "/" ? "active" : ""}`}
                onClick={(e) => smoothScroll(e, "about")}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#contact"
                className={`nav-links ${activeSection === "contact" && location.pathname === "/" ? "active" : ""}`}
                onClick={(e) => smoothScroll(e, "contact")}
              >
                Contact
              </a>
            </li>
            <li className="nav-item">
              <NavLink
                to="/bio"
                className="nav-links nav-bio-badge"
              >
                ✦ Full Bio
              </NavLink>
            </li>
          </ul>

          {/* Hamburger trigger for mobile */}
          <div
            className="nav-icon"
            onClick={handleClick}
            role="button"
            tabIndex="0"
            aria-label="Toggle navigation menu"
            onKeyDown={(e) => { if (e.key === "Enter") handleClick(); }}
          >
            <span className="icon">
              <HamburgetMenuClose />
            </span>
          </div>
        </div>
      </nav>

      {/* Modern Mobile Modal Menu (Matching Inspiration Image) */}
      <div className={`mobile-modal-overlay ${click ? "active" : ""}`} onClick={closeMenu}>
        <div
          className="mobile-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Avatar, Title and Close Button */}
          <div className="mobile-modal-header">
            <div className="mobile-header-left">
              <div className="mobile-avatar-ring">
                <img
                  src="https://avatars.githubusercontent.com/u/87798342?v=4"
                  alt="Satyakiran"
                  className="mobile-header-avatar"
                />
              </div>
              <span className="mobile-header-brand">
                <span className="logo-bracket">&lt;</span>
                <span className="logo-name">satyakiran</span>
                <span className="logo-bracket">/&gt;</span>
              </span>
            </div>
            <button
              className="mobile-close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          {/* Menu Items with Left Icon, Label, and Right Chevron */}
          <div className="mobile-nav-list">
            <div
              className={`mobile-nav-card ${activeSection === "home" && location.pathname === "/" ? "active-glow" : ""}`}
              onClick={(e) => smoothScroll(e, "home")}
            >
              <div className="mobile-nav-left">
                <FaHome className="nav-item-icon icon-home" />
                <span className="nav-item-label">Home</span>
              </div>
              <FaChevronRight className="nav-item-chevron" />
            </div>

            <div
              className={`mobile-nav-card ${activeSection === "projects" && location.pathname === "/" ? "active-glow" : ""}`}
              onClick={(e) => smoothScroll(e, "projects")}
            >
              <div className="mobile-nav-left">
                <FaThLarge className="nav-item-icon icon-projects" />
                <span className="nav-item-label">Apps & Projects</span>
              </div>
              <FaChevronRight className="nav-item-chevron" />
            </div>

            <div
              className={`mobile-nav-card ${activeSection === "designs" && location.pathname === "/" ? "active-glow" : ""}`}
              onClick={(e) => smoothScroll(e, "designs")}
            >
              <div className="mobile-nav-left">
                <FaPalette className="nav-item-icon icon-designs" />
                <span className="nav-item-label">UI/UX Designs</span>
              </div>
              <FaChevronRight className="nav-item-chevron" />
            </div>

            <div
              className={`mobile-nav-card ${activeSection === "about" && location.pathname === "/" ? "active-glow" : ""}`}
              onClick={(e) => smoothScroll(e, "about")}
            >
              <div className="mobile-nav-left">
                <FaGraduationCap className="nav-item-icon icon-about" />
                <span className="nav-item-label">Roadmap & Experience</span>
              </div>
              <FaChevronRight className="nav-item-chevron" />
            </div>

            <div
              className={`mobile-nav-card support-card ${activeSection === "contact" && location.pathname === "/" ? "active-support" : ""}`}
              onClick={(e) => smoothScroll(e, "contact")}
            >
              <div className="mobile-nav-left">
                <FaHeart className="nav-item-icon icon-support" />
                <span className="nav-item-label text-support">Contact & Support</span>
              </div>
              <FaChevronRight className="nav-item-chevron chevron-support" />
            </div>

            <NavLink
              to="/bio"
              className={`mobile-nav-card bio-card ${location.pathname === "/bio" || location.pathname === "/Bio" ? "active-bio" : ""}`}
              onClick={closeMenu}
            >
              <div className="mobile-nav-left">
                <FaUserNinja className="nav-item-icon icon-bio" />
                <span className="nav-item-label text-bio">✦ Developer Bio</span>
              </div>
              <FaChevronRight className="nav-item-chevron chevron-bio" />
            </NavLink>
          </div>

          {/* Bottom Social / Quick Action Icons Grid */}
          <div className="mobile-social-bar">
            <a
              href="https://www.t.me/skdev1/"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-pill"
              aria-label="Telegram"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://play.google.com/store/apps/dev?id=9166037782169864125"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-pill"
              aria-label="Google Play Console"
            >
              <FaGooglePlay />
            </a>
            <a
              href="https://www.instagram.com/satyakiran29/"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-pill"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:psatyakiran29@gmail.com"
              className="mobile-social-pill"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://github.com/satyakiran29"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-pill"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
