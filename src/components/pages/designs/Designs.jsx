import React from "react";
import "./designs.css";
import { FaExternalLinkAlt } from "react-icons/fa";

// Import all images from the desgins folder
const imageModules = import.meta.glob("../../../data/desgins/*.webp", { eager: true });
const images = Object.values(imageModules).map((mod) => mod.default);

const Designs = () => {
    return (
        <div className="designs-section">
            <center>
                <h1>UI/UX <span style={{ color: "#7f5af0" }}>Designs</span></h1>
                <p className="designs-subtitle">
                    Showcasing my custom Aniset app widgets design.
                    <br />
                    <a href="https://aniset.vercel.app/" target="_blank" rel="noopener noreferrer" className="aniset-link">
                        Visit Aniset Website <FaExternalLinkAlt className="link-icon" />
                    </a>
                </p>
            </center>

            <div className="designs-grid">
                {images.map((imgSrc, index) => (
                    <div className="design-card" key={index}>
                        <div className="design-image-container">
                            <img src={imgSrc} alt={`Aniset Widget Design ${index + 1}`} className="design-image" loading="lazy" />
                        </div>
                        <div className="design-overlay">
                            <span>Widget {index + 1}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Designs;
