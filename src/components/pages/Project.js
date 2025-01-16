import React from "react";
import "./css/project.css"; 
const ProjectCard = ({ title, description, tags, image, projectLink, githubLink }) => (
  
  <div className="card">
    {/* Projects */}
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

const App = () => {
  const projects = [
    {
      title: "Aniset - Kwgt Widgets & Klwp",
      description:
        "Transform Your Android Home Screen with Aniset - Anime Kwgt Widgets & Klwp! Elevate your device customization to a whole new level with Aniset - Anime Kwgt & Klwp Widgets! This collection of stunning KWGT and KLWP widgets brings the vibrant and dynamic world of anime to your Android home screen. Immerse yourself in the captivating aesthetics of your favorite anime characters and themes, making your device a true anime wonderland.",
      tags: ["Kotlin", "Json", "Firebase","Ui/Ux"],
      image: "https://play-lh.googleusercontent.com/X5-j_gJq-zNoshCO96DwKVjh6Y6XNIOWFtFlip3EtWLJ-W5gctNo_Y-Qg1dk-98x00s=w526-h296-rw", // Replace with your image URL
      projectLink: "https://example.com/",
      githubLink: "https://example.com/", 
    },
    {
      title: "Aniset - Kwgt Widgets & Klwp",
      description:
        "Transform Your Android Home Screen with Aniset - Anime Kwgt Widgets & Klwp! Elevate your device customization to a whole new level with Aniset - Anime Kwgt & Klwp Widgets! This collection of stunning KWGT and KLWP widgets brings the vibrant and dynamic world of anime to your Android home screen. Immerse yourself in the captivating aesthetics of your favorite anime characters and themes, making your device a true anime wonderland.",
      tags: ["Kotlin", "Json", "Firebase","Ui/Ux"],
      image: "https://play-lh.googleusercontent.com/X5-j_gJq-zNoshCO96DwKVjh6Y6XNIOWFtFlip3EtWLJ-W5gctNo_Y-Qg1dk-98x00s=w526-h296-rw", // Replace with your image URL
      projectLink: "https://example.com/",
      githubLink: "https://example.com/", 
    },
  ];

return (
    
    <div className="container">
        {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
        ))}
    </div>
);
};

export default App;
