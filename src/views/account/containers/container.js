/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import AccountView from '../views/view';
import userQuery from '../network/userQuery';
import updateUserMutation from '../network/updateUser';

const AccountContainer = compose(
  graphql(updateUserMutation, {
    name: 'updateUserMutation',
  }),
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(AccountView));

export default AccountContainer;
