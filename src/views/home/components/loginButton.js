/* 3rd party modules */
import Auth0Lock from 'auth0-lock';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

/* App modules */
import { auth0ClientId, auth0Domain } from '../../../shared/constants/index';
import { setStorageItem } from '../../../shared/services/localStorage';

const ActionButton = styled('button')`
  padding: 10px 16px;
  font-size: 18px;
  color: #FFFFFF;
  background-color: ${props => (props.light ? '#CDE1CC' : '#76AC78')};
  border: none;
  cursor: pointer;

  &:first-child {
    margin-right: 32px;
  }
`;

class LoginButton extends Component {

  constructor (props) {
    super(props);
    this.clientId = auth0ClientId;
    this.domain = auth0Domain;

    this.options = {
      initialScreen: props.initialScreen,
      allowedConnections: ['google-oauth2', 'facebook'],
      auth: {
        params: {
          scope: 'openid email',
        },
        responseType: 'token id_token',
      },
      theme: {
        primaryColor: '#76AC78',
      },
      languageDictionary: {
        title: 'Simplequine',
      },
    };

    this.lock = new Auth0Lock(this.clientId, this.domain, this.options);

    this.handleAuthentication();
  }

  setSession = (authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      setStorageItem('auth0AccessToken', authResult.accessToken);
      setStorageItem('auth0IdToken', authResult.idToken);
      setStorageItem('auth0ExpiresAt', expiresAt);
      setStorageItem('auth0Email', authResult.idTokenPayload.email);
      this.props.history.replace('/register');
    }
  };

  handleAuthentication = () => {
    /* eslint-disable no-alert, no-console, no-restricted-globals */
    this.lock.on('authenticated', this.setSession);
    this.lock.on('authorization_error', (err) => {
      console.log(err);
      alert('Error: Authentication failed. Check the console for further details or try again by reloading a page.');
      this.props.history.replace('/');
    });
    /* eslint-enable no-alert, no-console */
  };

  login = () => {
    this.lock.show();
  };

  render () {
    return (
      <ActionButton onClick={this.login} light={this.props.light}>
        {this.props.children}
      </ActionButton>
    );
  }
}

LoginButton.defaultProps = {
  initialScreen: 'login',
  light: false,
};

LoginButton.propTypes = {
  initialScreen: PropTypes.string,
  light: PropTypes.bool,
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LoginButton);
