import React from 'react';
import styled from 'styled-components';

const BreakLine = styled('span')`
  display: table;
`;

const HomeText = styled('p')`
  font-weight: ${props => (props.bold ? '700' : '400')};
  margin-bottom: 16px;
  opacity: ${props => (props.opacity || 1)};
`;

const Container = styled('section')`
  padding-left: 24px;
  padding-right: 24px;
`;

const Content = styled('div')`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 80px;

  @media (min-width: 600px) {
    max-width: 550px;
  }

  @media (min-width: 1024px) {
    max-width: 660px;
  }
`;

const About = () => (
  <Container>
    <Content>
      <HomeText bold>
        An application that helps you save your time.
      </HomeText>
      <HomeText opacity={0.8} >
        Never ending calls? No more. <BreakLine />
        Our online reservation system makes horse riding booking process much faster, more convinient and simplier.
      </HomeText>
    </Content>
  </Container>
);

export default About;
