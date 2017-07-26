// 3rd party modules
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// App modules
import UpdateTrainerView from './view';
import updateTrainerWithSchedule from '../../../../../shared/mutations/updateTrainer';
import trainerQuery from '../../../../../shared/queries/trainer';

const UpdateTrainerContainer = compose(
  graphql(updateTrainerWithSchedule, {
    name: 'updateTrainerMutation',
  }),
  graphql(trainerQuery, {
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        trainerId: props.match.params.trainerId,
      },
    }
    ),
    props: ({ data: { Trainer, ...rest } }) => {
      if (!Trainer) {
        return { data: { ...rest } };
      }

      return {
        data: {
          trainer: Trainer,
          ...rest,
        },
      };
    },
  }),
)(withRouter(UpdateTrainerView));

export default withRouter(UpdateTrainerContainer);
