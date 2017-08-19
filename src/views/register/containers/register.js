/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import RegisterView from '../views/register';
import createUser from '../network/createUser';
import userQuery from '../network/userQuery';

const RegisterContainer = compose(
  graphql(createUser, {
    name: 'createUserMutation',
  }),
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(RegisterView));

export default RegisterContainer;
