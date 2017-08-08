// 3rd party modules
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// App modules
import CreateTrainerView from '../views/create';
import createMutation from '../network/createMutation';
import { userIdQuery } from '../../../shared/queries/user';

const CreateTrainerContainer = compose(
  graphql(createMutation, {
    name: 'createTrainerMutation',
  }),
  graphql(userIdQuery),
)(withRouter(CreateTrainerView));

export default CreateTrainerContainer;
