// 3rd party modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Auth0Lock from 'auth0-lock';

// App modules
import { auth0ClientId, auth0Domain } from '../../../shared/constants/index';
import { setStorageItem } from '../../../shared/services/localStorage';

class LoginButton extends Component {

  constructor (props) {
    super(props);
    this.clientId = auth0ClientId;
    this.domain = auth0Domain;

    this.options = {
      initialScreen: props.initialScreen,
      allowedConnections: ['google-oauth2', 'facebook'],
      auth: {
        responseType: 'token id_token',
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
      <Button style={{ marginRight: '15px' }} type={'primary'} onClick={this.login}>
        {this.props.label}
      </Button>
    );
  }
}

LoginButton.defaultProps = {
  initialScreen: 'login',
  label: 'Login',
};

LoginButton.propTypes = {
  initialScreen: PropTypes.string,
  label: PropTypes.string,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LoginButton);
