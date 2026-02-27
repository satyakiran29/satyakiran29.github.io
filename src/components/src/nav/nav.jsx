import React, { useState } from "react";
import { Link } from "react-router-dom"; // Need this for the `/bio` route
import "../nav/Navbar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      // If we're not on the home page (e.g., on /bio), redirect first
      window.location.href = `/#${targetId}`;
      return;
    }
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for the fixed navbar
        behavior: "smooth"
      });
    }
    setClick(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="/#home" className="navbar-logo" onClick={(e) => smoothScroll(e, 'home')}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">satyakiran</span>
            <span className="logo-bracket">/&gt;</span>
          </a>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <a
                href="/#home"
                className="nav-links"
                onClick={(e) => smoothScroll(e, 'home')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#projects"
                className="nav-links"
                onClick={(e) => smoothScroll(e, 'projects')}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#about"
                className="nav-links"
                onClick={(e) => smoothScroll(e, 'about')}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/#contact"
                className="nav-links"
                onClick={(e) => smoothScroll(e, 'contact')}
              >
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <Link
                to="/bio"
                className="nav-links"
                onClick={() => setClick(false)}
              >
                Bio
              </Link>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
