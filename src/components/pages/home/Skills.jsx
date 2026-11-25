import React from "react";
import "./skills.css";
import {
    FaPython,
    FaJava,
    FaJsSquare,
    FaPhp,
    FaHtml5,
    FaCss3Alt,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaFigma,
    FaLinux
} from "react-icons/fa";
import {
    SiDjango,
    SiExpress,
    SiMongodb,
    SiSqlite,
    SiVercel,
    SiN8N
} from "react-icons/si";

const skillCategories = [
    {
        category: "Languages",
        skills: [
            { name: "Python", icon: <FaPython color="#3776AB" />, filterQuery: "Django" },
            { name: "Java", icon: <FaJava color="#007396" />, filterQuery: "Java" },
            { name: "JavaScript", icon: <FaJsSquare color="#F0DB4F" />, filterQuery: "React" },
            { name: "PHP", icon: <FaPhp color="#8892BF" />, filterQuery: "PHP" },
        ],
    },
    {
        category: "Frontend",
        skills: [
            { name: "HTML5", icon: <FaHtml5 color="#E34C26" />, filterQuery: "HTML" },
            { name: "CSS3", icon: <FaCss3Alt color="#264de4" />, filterQuery: "CSS" },
            { name: "React.js", icon: <FaReact color="#61DBFB" />, filterQuery: "React" },
        ],
    },
    {
        category: "Backend",
        skills: [
            { name: "Django", icon: <SiDjango color="#44B78B" />, filterQuery: "Django" },
            { name: "Node.js", icon: <FaNodeJs color="#3C873A" />, filterQuery: "Node.js" },
            { name: "Express.js", icon: <SiExpress color="currentColor" />, filterQuery: "Express.js" },
        ],
    },
    {
        category: "Databases",
        skills: [
            { name: "MongoDB", icon: <SiMongodb color="#47A248" />, filterQuery: "MongoDB" },
            { name: "SQLite", icon: <SiSqlite color="#3897D3" /> },
        ],
    },
    {
        category: "Tools",
        skills: [
            { name: "Git", icon: <FaGitAlt color="#F1502F" /> },
            { name: "GitHub", icon: <FaGithub color="currentColor" /> },
            { name: "Vercel", icon: <SiVercel color="currentColor" /> },
            { name: "Figma", icon: <FaFigma color="#F24E1E" />, filterQuery: "UI/UX" },
            { name: "Linux", icon: <FaLinux color="#FCC624" /> },
            { name: "n8n", icon: <SiN8N color="#FF6D5A" /> },
        ],
    },
];

const Skills = () => {
    const handleSkillClick = (query) => {
        if (!query) return;
        window.dispatchEvent(
            new CustomEvent("filter-projects-by-skill", { detail: { query } })
        );
        const target = document.getElementById("projects");
        if (target) {
            window.scrollTo({ top: target.offsetTop - 75, behavior: "smooth" });
        }
    };

    return (
        <section className="skills-section">
            <div className="skills-header-center">
                <h2 className="skills-heading">Technical Stack</h2>
                <p className="skills-subtitle">Languages, frameworks, and tools used across production projects. Click a stack item to filter projects.</p>
            </div>
            <div className="skills-container">
                {skillCategories.map((group, index) => (
                    <div key={index} className="skills-category">
                        <h3 className="category-title">{group.category}</h3>
                        <div className="skills-grid">
                            {group.skills.map((skill, idx) => (
                                <div
                                    key={idx}
                                    className={`skill-card${skill.filterQuery ? " skill-card--filterable" : ""}`}
                                    onClick={() => handleSkillClick(skill.filterQuery)}
                                    role={skill.filterQuery ? "button" : undefined}
                                    tabIndex={skill.filterQuery ? 0 : undefined}
                                    title={skill.filterQuery ? `Filter projects by ${skill.filterQuery}` : undefined}
                                    onKeyDown={(e) => {
                                        if (skill.filterQuery && (e.key === "Enter" || e.key === " ")) {
                                            e.preventDefault();
                                            handleSkillClick(skill.filterQuery);
                                        }
                                    }}
                                >
                                    <div className="skill-icon-wrapper">
                                        <div className="skill-icon">{skill.icon}</div>
                                    </div>
                                    <div className="skill-details">
                                        <span className="skill-name">{skill.name}</span>
                                    </div>
                                    {skill.filterQuery && (
                                        <span className="skill-filter-arrow" aria-hidden="true">→</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
