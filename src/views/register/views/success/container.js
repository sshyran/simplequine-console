// 3rd party modules
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// App modules
import SuccessView from './view';
import { userIdQuery } from '../../../../shared/queries/user';

const SuccessContainer = compose(
  graphql(userIdQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(SuccessView));

export default SuccessContainer;
