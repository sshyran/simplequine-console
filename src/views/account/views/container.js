/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import AccountView from './view';
import updateUserMutation from '../../../shared/mutations/updateUser';
import { userIdQuery } from '../../../shared/queries/user';

const AccountContainer = compose(
  graphql(updateUserMutation, {
    name: 'updateUserMutation',
  }),
  graphql(userIdQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(withRouter(AccountView));

export default AccountContainer;
