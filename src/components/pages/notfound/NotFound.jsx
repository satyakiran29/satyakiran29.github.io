import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './notfound.css';

const NotFound = () => {
    return (
        <div className="notfound-container">
            <Helmet>
                <title>404 - Page Not Found | Satyakiran</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="notfound-content card">
                <h1 className="notfound-code">404</h1>
                <h2 className="notfound-title">Page Not Found</h2>
                <p className="notfound-description">
                    Oops! The page you are looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="link-button back-home-btn">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

