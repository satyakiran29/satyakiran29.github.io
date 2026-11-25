import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

const Loader = () => {
    return (
        <div className="sk-loader" role="status" aria-label="Loading Satya Kiran portfolio">
            <div className="sk-loader-inner">
                <div className="sk-loader-wordmark">
                    <span className="sk-word-satya">Satya</span>
                    <span className="sk-word-kiran">Kiran</span>
                    <span className="sk-word-dot" aria-hidden="true">.</span>
                </div>
                <span className="sk-loader-tagline">Full-Stack &amp; Android Developer</span>
                <div className="sk-loader-track" aria-hidden="true">
                    <div className="sk-loader-bar"></div>
                </div>
            </div>
        </div>
    );
};

Loader.propTypes = {
    finishLoading: PropTypes.func,
};

export default Loader;
