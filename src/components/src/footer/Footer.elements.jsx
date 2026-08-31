import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: transparent;
  padding: clamp(2rem, 4vw, 3rem) 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--border-color);
  margin-top: clamp(2.5rem, 5vw, 4rem);
  width: 100%;
  box-sizing: border-box;
`;

export const SocialMedia = styled.section`
  max-width: 1000px;
  width: 100%;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    text-align: center;
  }
`;

export const WebsiteRights = styled.div`
  color: var(--text-muted);
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media screen and (max-width: 820px) {
    align-items: center;
    text-align: center;
  }
`;

export const LastUpdatedText = styled.span`
  color: var(--text-muted);
  font-size: clamp(0.72rem, 1.8vw, 0.78rem);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 4px 10px;
  border-radius: 20px;
  margin-top: 4px;
  width: fit-content;
  transition: border-color var(--transition-fast), background var(--transition-fast);

  b {
    color: var(--text-main);
    font-weight: 500;
  }

  &:hover {
    background: rgba(127, 90, 240, 0.08);
    border-color: rgba(127, 90, 240, 0.3);
  }

  @media screen and (max-width: 820px) {
    margin: 4px auto 0 auto;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: clamp(200px, 40vw, 240px);
  gap: 8px;
`;

export const SocialIconLink = styled.a`
  color: var(--text-muted);
  font-size: clamp(20px, 3.5vw, 24px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: all var(--transition-fast);

  &:hover {
    color: var(--accent-primary);
    transform: translateY(-3px);
  }
`;