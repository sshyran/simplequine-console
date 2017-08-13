/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import CreateServiceView from '../views/create';
import createService from '../network/create';
import { userIdQuery } from '../../../shared/queries/user';

const CreateServiceContainer = compose(
  graphql(createService, {
    name: 'createServiceMutation',
  }),
  graphql(userIdQuery),
)(withRouter(CreateServiceView));

export default CreateServiceContainer;
