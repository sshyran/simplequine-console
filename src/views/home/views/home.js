// 3rd party modules
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Footer from '../components/footer';
import About from '../components/about';
import Action from '../components/action';
import Hero from '../components/hero';
import { colors } from '../../../shared/constants/index';

const HomeContainer = styled('main')`
  color: ${colors.fontDark};
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const HomeView = ({ data }) => (
  <HomeContainer>
    <Hero />
    <Action isLoggedIn={Boolean(data.user)} />
    <About />
    <Footer />
  </HomeContainer>
);

HomeView.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default HomeView;
