import React from "react";
import "./css/home.css"; // Assuming your CSS file is in the same directory
import { FaGithub, FaYoutube, FaInstagram } from "react-icons/fa"; // Use the icons from react-icons
import logo from  "../pages/imgs/1.gif"
import p1 from  "../pages/imgs/2.gif"
const Home = () => {
  return (
    <div>
      {/* Header Section */}
      <header>
        <nav>
          <div className="header_logo">
            <img src={logo} alt="Logo" />
            <a href="status" aria-label="Status">
              👨‍💻
            </a>
          </div>
          <div className="header_links">
            <ul className="nav_links">
              <li className="nav_link">
                <a href="/">Home</a>
              </li>
              <li className="nav_link">
                <a href="projects">Projects</a>
              </li>
              <li className="nav_link">
                <a href="About">About</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Section */}
      <section className="main">
        <img src={p1} alt="Profile" />
        <span>Satyakiran</span>
        <p>Programmer • Web Developer • Linux User</p>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://bit.ly/satyakiran29_github"
              aria-label="GitHub"
            >
              <FaGithub size={30} /> 
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://bit.ly/GojoMain"
              aria-label="YouTube"
            >
              <FaYoutube size={30} /> 
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://bit.ly/skdev_instagram"
              aria-label="Instagram"
            >
              <FaInstagram size={30} />
            </a>
          </li>
        </ul>
      </section>

  
    </div>
  );
};

export default Home;
