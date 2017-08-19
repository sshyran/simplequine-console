/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import SuccessView from '../views/success';
import userQuery from '../network/userQuery';

const SuccessContainer = compose(
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(SuccessView));

export default SuccessContainer;
