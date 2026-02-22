import React, { useState } from "react";
import "../project/project.css";
import { FaGithub, FaExternalLinkAlt, FaSearch, FaQuoteLeft, FaStar } from "react-icons/fa";

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
            <span key={idx} className="project-tag">
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

const App = () => {
  const projects = [
    {
      title: "SatyaKiran Portfolio",
      description:
        "A personal portfolio website built using ReactJs and CSS. The website showcases my projects, skills, and contact information.",
      tags: ["Website", "ReactJs", "Css", "UI/UX"],
      image: "https://raw.githubusercontent.com/satyakiran29/satyakiran29.github.io/refs/heads/main/src/components/pages/imgs/Project/Portfolio.png",
      projectLink: "https://satyakiran.vercel.app/",
      githubLink: "https://github.com/satyakiran29/satyakiran29.github.io",
      category: "Web",
    },
    {
      title: "Aniset - Kwgt Widgets & Klwp",
      description:
        "Transform your Android Home Screen with Aniset - Anime KWGT Widgets & KLWP! Elevate your device customization to a whole new level with anime-inspired widgets and themes.",
      tags: ["Android App", "Kotlin", "JSON", "Firebase", "UI/UX"],
      image: "https://play-lh.googleusercontent.com/X5-j_gJq-zNoshCO96DwKVjh6Y6XNIOWFtFlip3EtWLJ-W5gctNo_Y-Qg1dk-98x00s=w526-h296-rw",
      projectLink: "https://example.com/",
      githubLink: "https://example.com/",
      category: "Mobile",
    },
    {
      title: "Aniset - WebSite",
      description:
        "To Showcase About Aniset Android App and it's widgets website",
      tags: ["Website", "ReactJs", "Css", "UI/UX"],
      image: "https://raw.githubusercontent.com/satyakiran29/satyakiran29.github.io/refs/heads/main/src/components/pages/imgs/Project/aniset_web.png",
      projectLink: "https://aniset.vercel.app/",
      githubLink: "https://github.com/satyakiran29/Aniset_Web",
      category: "Web",
    },
    {
      title: "Student Results Management System",
      description:
        "A web application for managing student results, built using Php and Mysql. The application allows teachers to input and manage student results efficiently.",
      tags: ["Website", "CSS", "HTML", "PHP", "MySQL"],
      image: "https://raw.githubusercontent.com/satyakiran29/satyakiran29.github.io/refs/heads/main/src/components/pages/imgs/Project/student.png",
      projectLink: "https://web.skdev.rf.gd/",
      githubLink: "https://github.com/satyakiran29/Student_mangement_system",
      category: "Web",
    },
    {
      title: "Online Temple Information System",
      description:
        "Developed a comprehensive information portal featuring a dynamic landing page and developer profiles. Implemented secure, role-based login functionality to manage access controls for various user tiers.",
      tags: ["React.js", "Node.js", "Express.js"],
      image: "https://placehold.co/600x400?text=Temple+System",
      githubLink: "#",
      category: "Web",
    },
    {
      title: "Aniset Pro / Aniset Android App",
      description:
        "Designed and published a custom widget application on the Google Play Store, managing the full lifecycle. Developed features under a strict hackathon deadline, handling UI/UX, backend integration, and monetization.",
      tags: ["Android", "KWGT", "REST API"],
      image: "https://placehold.co/600x400?text=Aniset+Pro",
      projectLink: "#",
      category: "Mobile",
    },
    {
      title: "Hospital Management System",
      description:
        "Built a comprehensive system to efficiently manage patients, doctors, appointments, and medical records. Engineered database integration and secured access for various administrative levels.",
      tags: ["Django", "PHP", "JavaScript", "HTML/CSS"],
      image: "https://placehold.co/600x400?text=Hospital+System",
      githubLink: "#",
      category: "Web",
    },
    {
      title: "Foodscape Web Application",
      description:
        "Developed a MERN stack web application featuring a highly engaging reels-style video feed integration. Built efficient RESTful APIs to manage content delivery and user interactions in projects.",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
      image: "https://placehold.co/600x400?text=Foodscape+App",
      githubLink: "#",
      category: "Web",
    }
  ];

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

  const testimonies = [
    {
      title: "선배야쿠자",
      description:
        "This widget is best in Play Store and it's a game-changer! It's sleek, customizable, and makes app discovery and management a breeze. The developer support for this widget is top-notch. Any questions or issues I had were quickly resolved, and he is very responsive and helpful. It's clear that he is dedicated to providing a great user experience. Great job!",
      tags: ["User Feedback", "5 Star", "Aniset User"],
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjWBZULZPa2XhPg5AoC28foZVYMFp3etyrbSyXyYM-uVwjJJtude=s32-rw",
    },
    {
      title: "Gaurav Kumar",
      description:
        "Using it since one year and really like it's widgets. And developer thank you for your efforts.",
      tags: ["User Feedback", "5 Star", "Aniset User"],
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjVsxs5270RailQPpjfZGkr57R_3HBL4ywgw0JT5Dd_hHyq2yuvd=s32-rw",
    },
  ];

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

export default App;
