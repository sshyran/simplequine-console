// 3rd party modules
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LoginButton from '../components/loginButton';
import { colors } from '../../../shared/constants/index';

const HomeContainer = styled('main')`
  color: ${colors.fontDark};
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;

  @media (min-width: 480px) {
    font-size: 18px;
  }

  @media (min-width: 600px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const HomeIntroWrapper = styled('section')`
  padding-left: 24px;
  padding-right: 24px;
`;

const HomeIntro = styled('div')`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 600px) {
    max-width: 550px;
  }

  @media (min-width: 1024px) {
    max-width: 660px;
  }
`;

const HomeActionWrapper = styled('div')`
  margin: 0 24px 80px;
`;

const HomeAction = styled('div')`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 600px) {
    max-width: 550px;
  }

  @media (min-width: 1024px) {
    max-width: 660px;
  }
`;

const HomeText = styled('p')`
  font-weight: ${props => (props.bold ? '700' : '400')};
  margin-bottom: 16px;
  opacity: ${props => (props.opacity || 1)};
`;

const HomeGreenText = styled('span')`
  color: ${colors.fontGreen};
`;

const BreakLine = styled('span')`
  display: table;
`;

const HomeView = ({ data }) => {
  if (data.loading) {
    return (
      <span>Loading!</span>
    );
  }

  if (data.error) {
    return (
      <span>Error!</span>
    );
  }

  return (
    <HomeContainer>
      <HomeActionWrapper>
        <HomeAction>
          {data.user ? (
            <Link to={'/app/schedule'}>
              <button>Go to app</button>
            </Link>
          ) : (
            <div>
              <LoginButton initialScreen={'login'} label={'Login'} />
              <LoginButton initialScreen={'signUp'} label={'Register'} />
            </div>
          )}
          <HomeText>
            Just do it - it’s <HomeGreenText>simple</HomeGreenText>.
          </HomeText>
        </HomeAction>
      </HomeActionWrapper>
      <HomeIntroWrapper>
        <HomeIntro>
          <HomeText bold>
            A simple application that helps you save your time.
          </HomeText>
          <HomeText opacity={0.8} >
            Never ending calls? No more. <BreakLine />
            Our online reservation system makes horse riding booking process much faster, more convinient and simplier.
          </HomeText>
        </HomeIntro>
      </HomeIntroWrapper>
    </HomeContainer>
  );
};

HomeView.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default HomeView;
