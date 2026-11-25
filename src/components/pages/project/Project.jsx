import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../project/project.css";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaQuoteLeft,
  FaStar,
  FaTimes,
  FaGooglePlay,
  FaDownload,
  FaCheckCircle,
  FaLink,
  FaCheck
} from "react-icons/fa";

const getProjectSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

import { projects, testimonies } from "../../../data/projectsData";
const ProjectCard = ({
  title,
  description,
  tags,
  image,
  projectLink,
  githubLink,
  badge,
  playStore,
  apkLink,
  repoStats,
  onSelect
}) => {
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
        {badge && (
          <span className={`project-badge${playStore ? " project-badge--playstore" : ""}`}>
            {playStore && <FaGooglePlay />}
            <span>{badge}</span>
          </span>
        )}
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
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={playStore ? "View on Google Play" : "External Link"}
              className={playStore ? "project-pill-link project-pill-link--play" : undefined}
            >
              {playStore ? (
                <>
                  <FaGooglePlay /> <span>Google Play</span>
                </>
              ) : (
                <FaExternalLinkAlt className="project-icon" />
              )}
            </a>
          )}
          {apkLink && (
            <a
              href={apkLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-pill-link"
              aria-label="Download Android APK"
            >
              <FaDownload /> <span>APK</span>
            </a>
          )}
          {repoStats && repoStats.stars > 0 && (
            <span className="project-metric-pill" title={`${repoStats.stars} GitHub stars`}>
              <FaStar /> {repoStats.stars}
            </span>
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

  // State for selected category, search term, case-study modal, and live repo metrics
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedProjectLink, setCopiedProjectLink] = useState(false);
  const [repoMetrics, setRepoMetrics] = useState({});

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setCopiedProjectLink(false);
    const next = new URLSearchParams(searchParams);
    next.set("project", getProjectSlug(project.title));
    setSearchParams(next, { replace: true });
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCopiedProjectLink(false);
    if (searchParams.has("project")) {
      const next = new URLSearchParams(searchParams);
      next.delete("project");
      setSearchParams(next, { replace: true });
    }
  };

  useEffect(() => {
    const param = searchParams.get("project");
    if (!param) return;
    const normalized = param.toLowerCase().trim();
    const match =
      projects.find((p) => getProjectSlug(p.title) === normalized) ||
      projects.find((p) => getProjectSlug(p.title).startsWith(normalized));
    if (match) {
      setSelectedProject(match);
    }
  }, [searchParams]);

  useEffect(() => {
    const repos = projects.map((p) => p.githubRepo).filter(Boolean);
    if (!repos.length) return;

    const loadMetrics = async () => {
      const next = {};
      await Promise.all(
        repos.map(async (repo) => {
          const cacheKey = `gh_repo_${repo}`;
          try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
              next[repo] = JSON.parse(cached);
              return;
            }
            const res = await fetch(`https://api.github.com/repos/${repo}`);
            if (!res.ok) return;
            const data = await res.json();
            const entry = {
              stars: data.stargazers_count || 0,
              language: data.language || "",
            };
            next[repo] = entry;
            sessionStorage.setItem(cacheKey, JSON.stringify(entry));
          } catch {
            // Ignore rate limit / network issues silently
          }
        })
      );
      if (Object.keys(next).length) setRepoMetrics(next);
    };

    loadMetrics();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeProjectModal();
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

  useEffect(() => {
    const handleSkillFilter = (e) => {
      const nextQuery = e.detail?.query || "";
      setSelectedCategory("All");
      setSearchTerm(nextQuery);
    };
    window.addEventListener("filter-projects-by-skill", handleSkillFilter);
    return () => window.removeEventListener("filter-projects-by-skill", handleSkillFilter);
  }, []);

  // Filter projects by category AND search term (title, description, or tags)
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      !normalizedSearch ||
      p.title.toLowerCase().includes(normalizedSearch) ||
      p.description.toLowerCase().includes(normalizedSearch) ||
      p.tags.some(tag => tag.toLowerCase().includes(normalizedSearch));
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
            placeholder="Search projects or tech (e.g., React, Django, Java)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search filter"
            >
              <FaTimes />
            </button>
          )}
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
        {filteredProjects.length === 0 ? (
          <div className="projects-empty">
            <p>No projects match "{searchTerm}".</p>
            <button
              type="button"
              className="category-btn active"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              {...project}
              repoStats={project.githubRepo ? repoMetrics[project.githubRepo] : undefined}
              onSelect={() => openProjectModal(project)}
            />
          ))
        )}
      </div>

      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={closeProjectModal}
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
        >
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="project-modal-close"
              onClick={closeProjectModal}
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
              <div className="project-modal-meta-row">
                <span className="project-modal-category">{selectedProject.category}</span>
                {selectedProject.badge && (
                  <span className={`project-badge-inline${selectedProject.playStore ? " project-badge--playstore" : ""}`}>
                    {selectedProject.playStore && <FaGooglePlay />}
                    <span>{selectedProject.badge}</span>
                  </span>
                )}
              </div>
              <h2 className="project-modal-title">{selectedProject.title}</h2>
              {selectedProject.caseStudy?.role && (
                <p className="project-modal-role">{selectedProject.caseStudy.role}</p>
              )}
              <p className="project-modal-desc">{selectedProject.description}</p>
              {selectedProject.caseStudy && (
                <div className="project-case-study-grid">
                  <div className="case-study-block">
                    <span className="case-study-label">Problem</span>
                    <p>{selectedProject.caseStudy.problem}</p>
                  </div>
                  <div className="case-study-block">
                    <span className="case-study-label">Architecture</span>
                    <p>{selectedProject.caseStudy.architecture}</p>
                  </div>
                  <div className="case-study-block case-study-block--wide">
                    <span className="case-study-label">Outcome</span>
                    <p>{selectedProject.caseStudy.outcome}</p>
                  </div>
                </div>
              )}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <ul className="project-modal-highlights">
                  {selectedProject.highlights.map((item, idx) => (
                    <li key={idx}>
                      <FaCheckCircle />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
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
                    {selectedProject.playStore ? <FaGooglePlay /> : <FaExternalLinkAlt />}
                    {selectedProject.actionLabel || "View Live"}
                  </a>
                )}
                {selectedProject.apkLink && (
                  <a
                    href={selectedProject.apkLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-btn project-modal-btn--secondary"
                  >
                    <FaDownload /> Download APK
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
                <button
                  type="button"
                  className="project-modal-btn project-modal-btn--secondary"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    setCopiedProjectLink(true);
                    setTimeout(() => setCopiedProjectLink(false), 1800);
                  }}
                >
                  {copiedProjectLink ? <FaCheck /> : <FaLink />}
                  {copiedProjectLink ? "Copied Link" : "Share"}
                </button>
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
