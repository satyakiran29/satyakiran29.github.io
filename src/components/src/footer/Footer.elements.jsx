import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: transparent;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--border-color);
  margin-top: 4rem;
`;

export const SocialMedia = styled.section`
  max-width: 1000px;
  width: 100%;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const WebsiteRights = styled.small`
  color: var(--text-muted);
  font-size: 0.9rem;
  font-family: var(--font-body);
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
`;

export const SocialIconLink = styled.a`
  color: var(--text-muted);
  font-size: 24px;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--accent-primary);
    transform: translateY(-3px);
  }
`;