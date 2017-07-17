// 3rd party modules
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// App modules
import RegisterView from './view';
import createUser from '../../../shared/mutations/createUser';
import { userIdQuery } from '../../../shared/queries/user';

const RegisterContainer = compose(
  graphql(createUser, {
    name: 'createUserMutation',
  }),
  graphql(userIdQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(RegisterView));

export default RegisterContainer;
