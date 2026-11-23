import React from "react";
import "./designs.css";
import { FaExternalLinkAlt } from "react-icons/fa";

// Import all images from the desgins folder
const imageModules = import.meta.glob("../../../data/desgins/*.webp", { eager: true });
const images = Object.values(imageModules).map((mod) => mod.default);

const Designs = () => {
    return (
        <div className="designs-section">
            <div className="section-header-center">
                <h1 className="designs-heading">UI/UX & Widget Designs</h1>
                <p className="designs-subtitle">
                    Home screen widget layouts, system UI cards, and personalization themes designed for the Aniset Android suite.
                    <br />
                    <a href="https://aniset.vercel.app/" target="_blank" rel="noopener noreferrer" className="aniset-link">
                        Explore Aniset Web Showcase <FaExternalLinkAlt className="link-icon" />
                    </a>
                </p>
            </div>

            <div className="designs-grid">
                {images.map((imgSrc, index) => (
                    <div className="design-card" key={index}>
                        <div className="design-image-container">
                            <img src={imgSrc} alt={`Aniset Widget Preset ${index + 1}`} className="design-image" loading="lazy" />
                        </div>
                        <div className="design-overlay">
                            <span>Preset {index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Designs;
