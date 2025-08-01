import React from "react";
import "../project/project.css";

const ProjectCard = ({ title, description, tags, image, projectLink, githubLink }) => (
  <div className="card">
    <img src={image} alt={title} className="card-image" />
    <h2>{title}</h2>
    <p>{description}</p>
    <div className="tags">
      {tags.map((tag, index) => (
        <span key={index} className="tag">
          {tag}
        </span>
      ))}
    </div>
    <div className="links">
      <button
        className="link-button"
        onClick={() => window.open(projectLink, "_blank")}
      >
        View Project
      </button>
      <button
        className="link-button"
        onClick={() => window.open(githubLink, "_blank")}
      >
        View Github
      </button>
    </div>
  </div>
);

const TestimonyCard = ({ title, description, tags, image }) => (
  <div className="card testimony">
    <img src={image} alt={title} className="card-image" />
    <h2>{title}</h2>
    <p>{description}</p>
    <div className="tags">
      {tags.map((tag, index) => (
        <span key={index} className="tag">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const App = () => {
  const projects = [
    {
      title: "SatyaKiran Portfolio",
      description:
        "A personal portfolio website built using ReactJs and CSS. The website showcases my projects, skills, and contact information.",
      tags: ["Website","ReactJs", "Css", "UI/UX"],
      image: "https://raw.githubusercontent.com/satyakiran29/satyakiran29.github.io/refs/heads/main/src/components/pages/imgs/Project/Portfolio.png",
      projectLink: "https://satyakiran.vercel.app/",
      githubLink: "https://github.com/satyakiran29/satyakiran29.github.io",
      category: "Web",
    },
    {
      title: "Aniset - Kwgt Widgets & Klwp",
      description:
        "Transform your Android Home Screen with Aniset - Anime KWGT Widgets & KLWP! Elevate your device customization to a whole new level with anime-inspired widgets and themes.",
      tags: ["Android App","Kotlin", "JSON", "Firebase", "UI/UX"],
      image: "https://play-lh.googleusercontent.com/X5-j_gJq-zNoshCO96DwKVjh6Y6XNIOWFtFlip3EtWLJ-W5gctNo_Y-Qg1dk-98x00s=w526-h296-rw",
      projectLink: "https://example.com/",
      githubLink: "https://example.com/",
      category: "Mobile",
    },
    {
      title: "Aniset - WebSite",
      description:
        "To Showcase About Aniset Android App and it's widgets website",
      tags: ["Website","ReactJs", "Css", "UI/UX"],
      image: "https://raw.githubusercontent.com/satyakiran29/satyakiran29.github.io/refs/heads/main/src/components/pages/imgs/Project/aniset_web.png",
      projectLink: "https://aniset.vercel.app/",
      githubLink: "https://github.com/satyakiran29/Aniset_Web",
      category: "Web",
    },
    {
      title: "Student Results Management System",
      description:
        "A web application for managing student results, built using Php and Mysql. The application allows teachers to input and manage student results efficiently.",
      tags: ["Website","CSS", "HTML", "PHP","MySQL"],
      image: "https://raw.githubusercontent.com/satyakiran29/satyakiran29.github.io/refs/heads/main/src/components/pages/imgs/Project/student.png",
      projectLink: "https://web.skdev.rf.gd/",
      githubLink: "https://github.com/satyakiran29/Student_mangement_system",
      category: "Web",
    }
  ];

  // Generate unique categories
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  // State for selected category
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // Filter projects by category
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const testimonies = [
    {
      title: "선배야쿠자",
      description:
        "This widget is best in Play Store and it's a game-changer! It's sleek, customizable, and makes app discovery and management a breeze. The developer support for this widget is top-notch. Any questions or issues I had were quickly resolved, and he is very responsive and helpful. It's clear that he is dedicated to providing a great user experience. Great job!",
      tags: ["User Feedback", "5 Star","Aniset User"],
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjWBZULZPa2XhPg5AoC28foZVYMFp3etyrbSyXyYM-uVwjJJtude=s32-rw",
    },
    {
      title: "Gaurav Kumar",
      description:
        "Using it since one year and really like it's widgets. And developer thank you for your efforts.",
        tags: ["User Feedback", "5 Star","Aniset User"],
      image: "https://play-lh.googleusercontent.com/a-/ALV-UjVsxs5270RailQPpjfZGkr57R_3HBL4ywgw0JT5Dd_hHyq2yuvd=s32-rw",
    },
  ];

  return (
    <>
      <center>
        <h1>Projects</h1>
        <p>My projects make use of a vast variety of the latest technology tools.</p>
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
      <div className="container">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <center>
        <h1>Testimonies</h1>
        <p>Here's what people are saying about my work.</p>
      </center>
      <div className="container">
        {testimonies.map((testimony, index) => (
          <TestimonyCard key={index} {...testimony} />
        ))}
      </div>
   
    </>
  );
};

export default App;
