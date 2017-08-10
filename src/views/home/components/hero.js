import React from 'react';
import styled from 'styled-components';

import logoSrc from '../../../assets/logo.svg';

const Container = styled('div')`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: 80px;
  padding-top: 80px;
`;

const AppName = styled('p')`
  font-family: 'Raleway', sans-serif;
  font-size: 30px;
  color: #76AC78;
  letter-spacing: 0.1em;
  margin-bottom: 16px;

  @media(min-width: 480px) {
    font-size: 32px;
  }

  @media(min-width: 600px) {
    font-size: 34px;
  }

  @media(min-width: 1024px) {
    font-size: 38px;
  }
`;

const Slogan = styled('p')`
  font-family: 'Raleway', sans-serif;
  font-size: 26px;
  color: #2D2D2C;
`;

const SpecialLetter = styled('span')`
  color: #2D2D2C;
`;

const Logo = styled('img')`
  max-height: 60px;
  margin-bottom: 16px;

  @media(min-width: 480px) {
    max-height: 64px;
  }

  @media(min-width: 600px) {
    max-height: 68px;
  }

  @media(min-width: 1024px) {
    max-height: 76px;
  }
`;

const Hero = () => (
  <Container>
    <Logo src={logoSrc} alt="Product logo" />
    <AppName>SIMPL<SpecialLetter>E</SpecialLetter>QUINE</AppName>
    <Slogan>Simple way of booking</Slogan>
  </Container>
);

export default Hero;
