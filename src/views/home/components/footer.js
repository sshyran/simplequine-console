import React from 'react';
import styled from 'styled-components';

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

const SocialIcon = styled('img')`
  margin-left: 30px;
  margin-bottom: 16px;

  &:first-child {
    margin-left: 0;
  }
`;

const Footer = () => (
  <Container>
    <div>
      <SocialIcon src="https://via.placeholder.com/28x28" alt="placeholder" />
      <SocialIcon src="https://via.placeholder.com/28x28" alt="placeholder" />
      <SocialIcon src="https://via.placeholder.com/28x28" alt="placeholder" />
    </div>
    <Copyright>&copy; HorseBitMedia 2017</Copyright>
  </Container>
);

export default Footer;
