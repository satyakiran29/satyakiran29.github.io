import React, { useEffect, useState } from 'react';
import {
  FaTelegram,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaGooglePlay,
  FaClock
} from 'react-icons/fa';
import {
  FooterContainer,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
  LastUpdatedText,
  SocialIcons,
  SocialIconLink
} from './Footer.elements';

function Footer() {
  const [lastUpdated, setLastUpdated] = useState('Sep 1, 2026, 01:29 AM');
  const [currentTime, setCurrentTime] = useState('');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Format current live time
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };

    updateCurrentTime();
    const timer = setInterval(updateCurrentTime, 1000);

    // Fetch commit date or fallback
    const fetchLastCommit = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/satyakiran29/satyakiran29.github.io/commits/main');
        if (res.ok) {
          const data = await res.json();
          const commitDateStr = data.commit?.committer?.date || data.commit?.author?.date;
          if (commitDateStr) {
            const commitDate = new Date(commitDateStr);
            const formatted = commitDate.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            });
            setLastUpdated(formatted);
            return;
          }
        }
      } catch (err) {
        console.warn('Using default date for last updated:', err);
      }

      // Default formatted timestamp
      const fallbackDate = new Date();
      const formatted = fallbackDate.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setLastUpdated(formatted);
    };

    fetchLastCommit();

    return () => clearInterval(timer);
  }, []);

  return (
    <FooterContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <WebsiteRights>
            <span>Developed by Satyakiran © {currentYear}</span>
            {lastUpdated && (
              <LastUpdatedText title={`Local Time: ${currentTime}`}>
                <FaClock style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', flexShrink: 0 }} />
                <span>Last updated: <b>{lastUpdated}</b></span>
              </LastUpdatedText>
            )}
          </WebsiteRights>
          <SocialIcons>
            <SocialIconLink href='https://www.t.me/skdev1/' target='_blank' rel='noopener noreferrer' aria-label='Telegram'>
              <FaTelegram />
            </SocialIconLink>
            <SocialIconLink href='https://www.instagram.com/satyakiran29/' target='_blank' rel='noopener noreferrer' aria-label='Instagram'>
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink href='https://github.com/satyakiran29' target='_blank' rel='noopener noreferrer' aria-label='Github'>
              <FaGithub />
            </SocialIconLink>
            <SocialIconLink href='https://twitter.com/' target='_blank' rel='noopener noreferrer' aria-label='Twitter'>
              <FaTwitter />
            </SocialIconLink>
            <SocialIconLink href='https://in.linkedin.com/in/satyakiran29' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn'>
              <FaLinkedin />
            </SocialIconLink>
            <SocialIconLink href='https://play.google.com/store/apps/dev?id=9166037782169864125' target='_blank' rel='noopener noreferrer' aria-label='Play Console'>
              <FaGooglePlay />
            </SocialIconLink>
          </SocialIcons>
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
}

export default Footer;