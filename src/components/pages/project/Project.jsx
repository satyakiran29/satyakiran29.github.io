import React, { useState, useEffect } from "react";
import "../project/project.css";
import { FaGithub, FaExternalLinkAlt, FaSearch, FaQuoteLeft, FaStar, FaTimes } from "react-icons/fa";

import { projects, testimonies } from "../../../data/projectsData";
const ProjectCard = ({ title, description, tags, image, projectLink, githubLink, onSelect }) => {
  return (
    <div
      className="project-wrapper project-wrapper--clickable"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" loading="lazy" decoding="async" />
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

        <div className="project-links" onClick={(e) => e.stopPropagation()}>
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
      <img src={image} alt={title} className="testimony-image" loading="lazy" decoding="async" />
      <h2 className="testimony-title">{title}</h2>
    </div>
  </div>
);

const Project = () => {

  // Generate unique categories
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  // State for selected category, search term, and case-study modal
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Filter projects by category AND search term
  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="projects-section">
      <div className="section-header-center">
        <h1 className="projects-heading">Featured Projects</h1>
        <p className="projects-subtitle">Production Android applications on Google Play Store and full-stack web platforms.</p>

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
      </div>
      <div className="projects-container">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            index={index}
            {...project}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
        >
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              <FaTimes />
            </button>
            <div className="project-modal-image-wrap">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="project-modal-image"
              />
            </div>
            <div className="project-modal-body">
              <span className="project-modal-category">{selectedProject.category}</span>
              <h2 className="project-modal-title">{selectedProject.title}</h2>
              <p className="project-modal-desc">{selectedProject.description}</p>
              <div className="project-tags">
                {selectedProject.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`project-tag ${tag.toLowerCase().includes("play store") ? "project-tag-playstore" : ""}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-modal-actions">
                {selectedProject.projectLink && selectedProject.projectLink !== "#" && (
                  <a
                    href={selectedProject.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-btn project-modal-btn--primary"
                  >
                    <FaExternalLinkAlt /> View Live
                  </a>
                )}
                {selectedProject.githubLink && selectedProject.githubLink !== "#" && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-btn project-modal-btn--secondary"
                  >
                    <FaGithub /> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="section-header-center section-header-feedback">
        <h1 className="projects-heading">Client & User Feedback</h1>
        <p className="projects-subtitle">
          Verified reviews from published Google Play apps and software collaborations.
        </p>
      </div>
      <div className="testimonies-grid">
        {testimonies.map((testimony, index) => (
          <TestimonyCard key={index} {...testimony} />
        ))}
      </div>
    </div>
  );
};

export default Project;
