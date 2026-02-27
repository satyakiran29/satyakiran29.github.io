import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconLoader } from '../icons';
import styled, { keyframes, css } from 'styled-components';

// Simple theme matching the previous dark theme variables
const theme = {
    colors: {
        darkNavy: '#0a0a0b',
        green: '#7f5af0',
    },
    transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
    mixins: {
        flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    }
};

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; visibility: hidden; }
`;

const drawStroke = keyframes`
  to { stroke-dashoffset: 0; }
`;

const drawFill = keyframes`
  to { fill: currentColor; }
`;

const StyledContainer = styled.div`
  ${theme.mixins.flexCenter};
  background-color: ${theme.colors.darkNavy};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  ${props => props.isHiding && css`
    animation: ${fadeOut} 0.5s ease-out forwards;
  `}
`;

const StyledLogo = styled.div`
  width: max-content;
  max-width: 100px;
  transition: ${theme.transition};
  opacity: ${props => (props.isMounted ? 1 : 0)};
  color: ${theme.colors.green};
  
  svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    user-select: none;
    
    text {
      stroke-dashoffset: 1000;
      stroke-dasharray: 1000;
      animation: ${drawStroke} 1.5s ease-in-out forwards, ${drawFill} 0.6s ease-in-out forwards;
      animation-delay: 0.3s, 1.5s;
    }
  }
`;

const Loader = ({ finishLoading }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isHiding, setIsHiding] = useState(false);

    useEffect(() => {
        const mountTimeout = setTimeout(() => setIsMounted(true), 10);

        // Match the previous animejs duration (delay: 300, stroke: 1500, fill: 700, hold: 500 = ~3000ms total)
        const hideTimeout = setTimeout(() => {
            setIsHiding(true);
        }, 2800);

        const finishTimeout = setTimeout(() => {
            if (finishLoading) {
                finishLoading();
            }
        }, 3300);

        return () => {
            clearTimeout(mountTimeout);
            clearTimeout(hideTimeout);
            clearTimeout(finishTimeout);
        };
    }, [finishLoading]);

    return (
        <StyledContainer className="loader" isHiding={isHiding}>
            <StyledLogo isMounted={isMounted}>
                <IconLoader />
            </StyledLogo>
        </StyledContainer>
    );
};

Loader.propTypes = {
    finishLoading: PropTypes.func, // Made optional to prevent errors if not provided
};

export default Loader;
