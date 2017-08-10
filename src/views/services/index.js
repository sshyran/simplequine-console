// 3rd party modules
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router-dom';

// App modules
import CreateServiceContainer from './containers/create';
import UpdateServiceContainer from './containers/update';
import ServiceListContainer from './containers/list';

const ServiceMasterView = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/list`} component={ServiceListContainer} />
    <Route exact path={`${match.url}/create`} component={CreateServiceContainer} />
    <Route exact path={`${match.url}/edit/:serviceId`} component={UpdateServiceContainer} />
    <Route exact path={`${match.url}`} render={() => (<Redirect to={`${match.url}/list`} />)} />
  </div>
);

ServiceMasterView.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(ServiceMasterView);
