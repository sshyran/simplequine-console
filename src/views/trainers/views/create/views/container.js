// 3rd party modules
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// App modules
import CreateTrainerView from './view';
import createTrainerWithSchedule from '../../../../../shared/mutations/createTrainer';
import { userIdQuery } from '../../../../../shared/queries/user';

const CreateTrainerContainer = compose(
  graphql(createTrainerWithSchedule, {
    name: 'createTrainerMutation',
  }),
  graphql(userIdQuery),
)(withRouter(CreateTrainerView));

export default CreateTrainerContainer;
