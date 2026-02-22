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
            { name: "Python", icon: <FaPython color="#3776AB" /> },
            { name: "Java", icon: <FaJava color="#007396" /> },
            { name: "JavaScript", icon: <FaJsSquare color="#F0DB4F" /> },
            { name: "PHP", icon: <FaPhp color="#8892BF" /> },
        ],
    },
    {
        category: "Frontend",
        skills: [
            { name: "HTML5", icon: <FaHtml5 color="#E34C26" /> },
            { name: "CSS3", icon: <FaCss3Alt color="#264de4" /> },
            { name: "React.js", icon: <FaReact color="#61DBFB" /> },
        ],
    },
    {
        category: "Backend",
        skills: [
            { name: "Django", icon: <SiDjango color="#092E20" /> },
            { name: "Node.js", icon: <FaNodeJs color="#3C873A" /> },
            { name: "Express.js", icon: <SiExpress color="#FFFFFF" /> },
        ],
    },
    {
        category: "Databases",
        skills: [
            { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
            { name: "SQLite", icon: <SiSqlite color="#003B57" /> },
        ],
    },
    {
        category: "Tools",
        skills: [
            { name: "Git", icon: <FaGitAlt color="#F1502F" /> },
            { name: "GitHub", icon: <FaGithub color="#FFFFFF" /> },
            { name: "Vercel", icon: <SiVercel color="#FFFFFF" /> },
            { name: "Figma", icon: <FaFigma color="#F24E1E" /> },
            { name: "Linux", icon: <FaLinux color="#FCC624" /> },
            { name: "n8n", icon: <SiN8N color="#FF6D5A" /> },
        ],
    },
];

const Skills = () => {
    return (
        <section className="skills-section">
            <center>
                <h1>My Skills</h1>
                <p>Technologies and tools I use to build robust applications.</p>
            </center>
            <div className="skills-container">
                {skillCategories.map((group, index) => (
                    <div key={index} className="skills-category">
                        <h3 className="category-title">{group.category}</h3>
                        <div className="skills-grid">
                            {group.skills.map((skill, idx) => (
                                <div key={idx} className="skill-card">
                                    <div className="skill-icon">{skill.icon}</div>
                                    <span className="skill-name">{skill.name}</span>
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
