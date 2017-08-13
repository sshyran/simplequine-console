/* 3rd party modules */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { ApolloProvider } from 'react-apollo';
import enUS from 'antd/lib/locale-provider/en_US';

/* App modules */
import createHistory from './shared/services/history';
import apolloClient from './core/configureApollo';
import registerServiceWorker from './shared/services/registerServiceWorker';


import App from './App';


ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <LocaleProvider locale={enUS}>
      <Router history={createHistory}>
        <App />
      </Router>
    </LocaleProvider>
  </ApolloProvider>
  , document.getElementById('root'));
registerServiceWorker();
