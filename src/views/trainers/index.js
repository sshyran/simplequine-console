// 3rd party modules
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router-dom';

// App modules
import CreateTrainerContainer from './containers/create';
import UpdateTrainerContainer from './containers/update';
import TrainerListContainer from './containers/list';

const TrainerMasterView = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/list`} component={TrainerListContainer} />
    <Route exact path={`${match.url}/create`} component={CreateTrainerContainer} />
    <Route exact path={`${match.url}/edit/:trainerId`} component={UpdateTrainerContainer} />
    <Route exact path={`${match.url}`} render={() => (<Redirect to={`${match.url}/list`} />)} />
  </div>
);

TrainerMasterView.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(TrainerMasterView);
