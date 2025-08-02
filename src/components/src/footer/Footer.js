import React from 'react';
import {
  FaTelegram,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';
import {
  FooterContainer,
  SocialMedia,
  SocialMediaWrap,
  WebsiteRights,
  SocialIcons,
  SocialIconLink
} from './Footer.elements';

function Footer() {

  const date = new Date();

  return (
    <FooterContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <WebsiteRights>Developed by Satyakiran © {date.getFullYear()} </WebsiteRights>
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
          </SocialIcons>
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
}

export default Footer;