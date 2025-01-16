import React from "react";
import logo from "./pages/imgs/1.gif"; // Update with the correct path to your logo file

const Nav = () => {
  return (
    <header>
      <nav>
        <div className="header_logo">
          <img src={logo} alt="Logo" />
          <a href="Gallery" aria-label="Gallery">
          🖼️
          </a>
        </div>
        <div className="header_links">
          <ul className="nav_links">
            <li className="nav_link">
              <a href="/">Home</a>
            </li>
            <li className="nav_link">
              <a href="project">Projects</a>
            </li>
            <li className="nav_link">
              <a href="About">About</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
