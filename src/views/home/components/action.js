import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { colors } from '../../../shared/constants/index';
import LoginButton from '../components/loginButton';

const Container = styled('div')`
  margin: 0 24px 80px;
`;

const Content = styled('div')`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 600px) {
    max-width: 550px;
  }

  @media (min-width: 1024px) {
    max-width: 660px;
  }
`;

const Text = styled('p')`
  font-weight: ${props => (props.bold ? '700' : '400')};
  margin-bottom: 16px;
  opacity: ${props => (props.opacity || 1)};
  text-align: center;
`;

const GreenText = styled('span')`
  color: ${colors.fontGreen};
`;

const ButtonContainer = styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

const Button = styled('button')`
  padding: 10px 16px;
  font-size: 18px;
  color: #FFFFFF;
  background-color: #76AC78;
  border: none;
  cursor: pointer;
`;

const Action = ({ isLoggedIn }) => (
  <Container>
    <Content>
      {isLoggedIn ? (
        <ButtonContainer>
          <Link to={'/app/schedule'}>
            <Button>GO TO APP</Button>
          </Link>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <LoginButton initialScreen={'login'} light>
            LOGIN
          </LoginButton>
          <LoginButton initialScreen={'signUp'}>
            REGISTER
          </LoginButton>
        </ButtonContainer>
      )}
      <Text>
        Just do it - it’s <GreenText>easy</GreenText>.
      </Text>
    </Content>
  </Container>
);

Action.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Action;
