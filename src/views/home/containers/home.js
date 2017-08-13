/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import { userIdQuery } from '../../../shared/queries/user';
import HomeView from '../views/home';

const HomeContainer = compose(
  graphql(userIdQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(HomeView));

export default HomeContainer;
