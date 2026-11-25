import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaHome, FaSearch } from 'react-icons/fa';
import './notfound.css';

const NotFound = () => {
    return (
        <div className="notfound-container">
            <Helmet>
                <title>404 - Page Not Found | Satyakiran</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="notfound-content">
                <span className="notfound-eyebrow">Error 404 • Route Not Found</span>
                <h1 className="notfound-code">404</h1>
                <h2 className="notfound-title">This page couldn't be found</h2>
                <p className="notfound-description">
                    The link you followed may be broken, or the page may have been moved.
                </p>
                <div className="notfound-actions">
                    <Link to="/" className="notfound-btn notfound-btn--primary">
                        <FaHome /> Back to Home
                    </Link>
                    <button
                        type="button"
                        className="notfound-btn notfound-btn--secondary"
                        onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
                    >
                        <FaSearch /> Jump with <kbd>Ctrl K</kbd>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
