// 3rd party modules
import React from 'react';
import { Route } from 'react-router-dom';

// App modules
import HomeContainer from './views/home/views/container';
import RegisterContainer from './views/register/views/container';
import SuccessContainer from './views/register/views/success/container';
import AppContainer from './views/app/views/container';
import './App.css';

const App = () => (
  <div className="full-height-width">
    <Route exact path="/" component={HomeContainer} />
    <Route exact path="/register" component={RegisterContainer} />
    <Route exact path="/register/success" component={SuccessContainer} />
    <Route path="/app" component={AppContainer} />
  </div>
);

export default App;
