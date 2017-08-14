/* 3rd party modules */
import React from 'react';
import styled from 'styled-components';

/* App modules */
import facebookIcon from '../../../assets/facebook.svg';
import linkedInIcon from '../../../assets/linkedin.svg';
import twitterIcon from '../../../assets/twitter.svg';

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

const Copyright = styled('p')`
  font-size: 14px;
  margin-bottom: 32px;
  opacity: 0.7;

  @media (min-width: 480px) {
    font-size: 16px;
  }

  @media (min-width: 600px) {
    font-size: 18px;
  }
`;

const Social = styled('div')`
  margin-bottom: 16px;
`;

const SocialLink = styled('a')`
  margin-left: 30px;

  &:first-child {
    margin-left: 0;
  }
`;

const SocialIcon = styled('img')`
  height: 32px;
`;

const Footer = () => (
  <Container>
    <Social>
      <SocialLink href="https://www.facebook.com/HorseBitMedia" rel="noopener noreferrer" target="_blank">
        <SocialIcon src={facebookIcon} alt="Facebook" />
      </SocialLink>
      <SocialLink href="https://twitter.com/HorseBitMedia" rel="noopener noreferrer" target="_blank">
        <SocialIcon src={twitterIcon} alt="Twitter" />
      </SocialLink>
      <SocialLink href="https://www.linkedin.com/company/horse-bit-media" rel="noopener noreferrer" target="_blank">
        <SocialIcon src={linkedInIcon} alt="LinkedIn" />
      </SocialLink>
    </Social>
    <Copyright>&copy; HorseBitMedia 2017</Copyright>
  </Container>
);

export default Footer;
