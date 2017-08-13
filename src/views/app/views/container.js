/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import AppView from './view';
import { userIdQuery } from '../../../shared/queries/user';

const AppContainer = compose(
  graphql(userIdQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(AppView));

export default AppContainer;
