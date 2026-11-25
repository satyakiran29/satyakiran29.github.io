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
            { name: "Python", icon: <FaPython color="#3776AB" />, percentage: 85 },
            { name: "Java", icon: <FaJava color="#007396" />, percentage: 80 },
            { name: "JavaScript", icon: <FaJsSquare color="#F0DB4F" />, percentage: 90 },
            { name: "PHP", icon: <FaPhp color="#8892BF" />, percentage: 70 },
        ],
    },
    {
        category: "Frontend",
        skills: [
            { name: "HTML5", icon: <FaHtml5 color="#E34C26" />, percentage: 95 },
            { name: "CSS3", icon: <FaCss3Alt color="#264de4" />, percentage: 90 },
            { name: "React.js", icon: <FaReact color="#61DBFB" />, percentage: 85 },
        ],
    },
    {
        category: "Backend",
        skills: [
            { name: "Django", icon: <SiDjango color="#44B78B" />, percentage: 80 },
            { name: "Node.js", icon: <FaNodeJs color="#3C873A" />, percentage: 75 },
            { name: "Express.js", icon: <SiExpress color="currentColor" />, percentage: 75 },
        ],
    },
    {
        category: "Databases",
        skills: [
            { name: "MongoDB", icon: <SiMongodb color="#47A248" />, percentage: 80 },
            { name: "SQLite", icon: <SiSqlite color="#3897D3" />, percentage: 85 },
        ],
    },
    {
        category: "Tools",
        skills: [
            { name: "Git", icon: <FaGitAlt color="#F1502F" />, percentage: 90 },
            { name: "GitHub", icon: <FaGithub color="currentColor" />, percentage: 95 },
            { name: "Vercel", icon: <SiVercel color="currentColor" />, percentage: 80 },
            { name: "Figma", icon: <FaFigma color="#F24E1E" />, percentage: 75 },
            { name: "Linux", icon: <FaLinux color="#FCC624" />, percentage: 85 },
            { name: "n8n", icon: <SiN8N color="#FF6D5A" />, percentage: 70 },
        ],
    },
];

const Skills = () => {
    return (
        <section className="skills-section">
            <div className="skills-header-center">
                <h2 className="skills-heading">Technical Stack</h2>
                <p className="skills-subtitle">Languages, frameworks, and tools used across production projects.</p>
            </div>
            <div className="skills-container">
                {skillCategories.map((group, index) => (
                    <div key={index} className="skills-category">
                        <h3 className="category-title">{group.category}</h3>
                        <div className="skills-grid">
                            {group.skills.map((skill, idx) => (
                                <div key={idx} className="skill-card">
                                    <div className="skill-icon-wrapper">
                                        <div className="skill-icon">{skill.icon}</div>
                                    </div>
                                    <div className="skill-details">
                                        <span className="skill-name">{skill.name}</span>
                                    </div>
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
