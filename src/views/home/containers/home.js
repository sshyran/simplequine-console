/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import HomeView from '../views/home';
import { userIdQuery } from '../../../shared/queries/user';

const HomeContainer = compose(
  graphql(userIdQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(HomeView));

export default HomeContainer;
