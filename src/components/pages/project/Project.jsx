import React, { useState } from "react";
import "../project/project.css";
import { FaGithub, FaExternalLinkAlt, FaSearch, FaQuoteLeft, FaStar } from "react-icons/fa";

import { projects, testimonies } from "../../../data/projectsData";
const ProjectCard = ({ title, description, tags, image, projectLink, githubLink }) => {
  return (
    <div className="project-wrapper">
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" />
      </div>

      <div className="project-content">
        <h2 className="project-title">{title}</h2>
        <div className="project-description-box">
          <p>{description}</p>
        </div>

        <div className="project-tags">
          {tags.map((tag, idx) => (
            <span 
              key={idx} 
              className={`project-tag ${tag.toLowerCase().includes("play store") ? "project-tag-playstore" : ""}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="project-links">
          {githubLink && githubLink !== "#" && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
              <FaGithub className="project-icon" />
            </a>
          )}
          {projectLink && projectLink !== "#" && (
            <a href={projectLink} target="_blank" rel="noopener noreferrer" aria-label="External Link">
              <FaExternalLinkAlt className="project-icon" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const TestimonyCard = ({ title, description, tags, image }) => (
  <div className="testimony-card project-content">
    <div className="testimony-quote-icon">
      <FaQuoteLeft />
    </div>

    <div className="testimony-stars">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} />
      ))}
    </div>

    <div className="testimony-body">
      <p>"{description}"</p>
    </div>

    <div className="testimony-footer">
      <img src={image} alt={title} className="testimony-image" />
      <h2 className="testimony-title">{title}</h2>
    </div>
  </div>
);

const Project = () => {

  // Generate unique categories
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  // State for selected category and search term
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects by category AND search term
  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <center>
        <h1>Projects</h1>
        <p>My projects make use of a vast variety of the latest technology tools.</p>

        {/* Search Bar */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn${selectedCategory === category ? ' active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </center>
      <div className="projects-container">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} index={index} {...project} />
        ))}
      </div>

      <center>
        <h1>Client <span style={{ color: '#7f5af0' }}>Feedback</span></h1>
        <p className="testimony-subtitle">
          What people say about my work
        </p>
      </center>
      <div className="testimonies-grid">
        {testimonies.map((testimony, index) => (
          <TestimonyCard key={index} {...testimony} />
        ))}
      </div>

    </>
  );
};

export default Project;
