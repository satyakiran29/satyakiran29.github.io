import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import "./designs.css";
import { FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight, FaLink, FaCheck } from "react-icons/fa";

// Import all images from the desgins folder
const imageModules = import.meta.glob("../../../data/desgins/*.webp", { eager: true });
const images = Object.values(imageModules).map((mod) => mod.default);

const Designs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeIndex, setActiveIndex] = useState(null);
    const [copiedPresetLink, setCopiedPresetLink] = useState(false);

    const openLightbox = useCallback((idx) => {
        setActiveIndex(idx);
        setCopiedPresetLink(false);
        const next = new URLSearchParams(searchParams);
        next.set("preset", String(idx + 1));
        setSearchParams(next, { replace: true });
    }, [searchParams, setSearchParams]);

    const closeLightbox = useCallback(() => {
        setActiveIndex(null);
        setCopiedPresetLink(false);
        if (searchParams.has("preset")) {
            const next = new URLSearchParams(searchParams);
            next.delete("preset");
            setSearchParams(next, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const showPrev = useCallback(() => {
        setActiveIndex((prev) => {
            if (prev === null) return null;
            const nextIdx = (prev - 1 + images.length) % images.length;
            const next = new URLSearchParams(searchParams);
            next.set("preset", String(nextIdx + 1));
            setSearchParams(next, { replace: true });
            return nextIdx;
        });
    }, [searchParams, setSearchParams]);

    const showNext = useCallback(() => {
        setActiveIndex((prev) => {
            if (prev === null) return null;
            const nextIdx = (prev + 1) % images.length;
            const next = new URLSearchParams(searchParams);
            next.set("preset", String(nextIdx + 1));
            setSearchParams(next, { replace: true });
            return nextIdx;
        });
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        const param = searchParams.get("preset");
        if (!param) return;
        const parsed = parseInt(param, 10);
        if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= images.length) {
            setActiveIndex(parsed - 1);
        }
    }, [searchParams]);

    useEffect(() => {
        if (activeIndex === null) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";
        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeLightbox();
            else if (e.key === "ArrowLeft") showPrev();
            else if (e.key === "ArrowRight") showNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [activeIndex, closeLightbox, showPrev, showNext]);

    const formatNum = (n) => (n < 10 ? `0${n}` : `${n}`);

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
                    <div
                        className="design-card design-card--clickable"
                        key={index}
                        onClick={() => openLightbox(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View Aniset Widget Preset ${index + 1}`}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                openLightbox(index);
                            }
                        }}
                    >
                        <div className="design-image-container">
                            <img src={imgSrc} alt={`Aniset Widget Preset ${index + 1}`} className="design-image" loading="lazy" decoding="async" />
                        </div>
                        <div className="design-overlay">
                            <span>Preset {formatNum(index + 1)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {activeIndex !== null && (
                <div
                    className="design-lightbox-overlay"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Aniset Widget Preset ${activeIndex + 1}`}
                >
                    <div className="design-lightbox" onClick={(e) => e.stopPropagation()}>
                        <div className="design-lightbox-header">
                            <span className="design-lightbox-title">
                                Aniset Widget Preset{" "}
                                <span className="design-lightbox-counter">
                                    {formatNum(activeIndex + 1)} / {formatNum(images.length)}
                                </span>
                            </span>
                            <div className="design-lightbox-actions">
                                <button
                                    type="button"
                                    className="design-lightbox-share"
                                    onClick={() => {
                                        navigator.clipboard?.writeText(window.location.href);
                                        setCopiedPresetLink(true);
                                        setTimeout(() => setCopiedPresetLink(false), 1800);
                                    }}
                                    aria-label="Copy shareable preset link"
                                >
                                    {copiedPresetLink ? <FaCheck /> : <FaLink />}
                                    <span>{copiedPresetLink ? "Copied" : "Share"}</span>
                                </button>
                                <button
                                    type="button"
                                    className="design-lightbox-close"
                                    onClick={closeLightbox}
                                    aria-label="Close lightbox"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        <div className="design-lightbox-stage">
                            <button
                                type="button"
                                className="design-lightbox-nav design-lightbox-nav--prev"
                                onClick={showPrev}
                                aria-label="Previous preset"
                            >
                                <FaChevronLeft />
                            </button>

                            <img
                                src={images[activeIndex]}
                                alt={`Aniset Widget Preset ${activeIndex + 1}`}
                                className="design-lightbox-img"
                            />

                            <button
                                type="button"
                                className="design-lightbox-nav design-lightbox-nav--next"
                                onClick={showNext}
                                aria-label="Next preset"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Designs;
