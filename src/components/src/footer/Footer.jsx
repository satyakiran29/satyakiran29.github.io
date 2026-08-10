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
  const [lastUpdated, setLastUpdated] = useState('');
  const date = new Date();

  useEffect(() => {
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
        console.error('Failed to fetch commit date:', err);
      }

      // Fallback
      if (document.lastModified) {
        const modDate = new Date(document.lastModified);
        const formatted = modDate.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        setLastUpdated(formatted);
      }
    };

    fetchLastCommit();
  }, []);

  return (
    <FooterContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <WebsiteRights>
            <span>Developed by Satyakiran © {date.getFullYear()}</span>
            {lastUpdated && (
              <LastUpdatedText>
                <FaClock style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }} />
                Last updated: {lastUpdated}
              </LastUpdatedText>
            )}
          </WebsiteRights>
          <SocialIcons>
            <SocialIconLink href='https://www.t.me/skdev1/' target='_blank' aria-label='Telegram'>
              <FaTelegram />
            </SocialIconLink>
            <SocialIconLink href='https://www.instagram.com/satyakiran29/' target='_blank' aria-label='Instagram'>
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink href='https://github.com/satyakiran29' target='_blank' aria-label='Github' >
              <FaGithub />
            </SocialIconLink>
            <SocialIconLink href='' target='_blank' aria-label='Twitter'>
              <FaTwitter />
            </SocialIconLink>
            <SocialIconLink href='https://in.linkedin.com/in/satyakiran29' target='_blank' aria-label='LinkedIn'>
              <FaLinkedin />
            </SocialIconLink>
            <SocialIconLink href='https://play.google.com/store/apps/dev?id=9166037782169864125' target='_blank' aria-label='Play Console'>
              <FaGooglePlay />
            </SocialIconLink>
          </SocialIcons>
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
}

export default Footer;