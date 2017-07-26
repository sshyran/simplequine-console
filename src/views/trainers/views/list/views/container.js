// 3rd party modules
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// App modules
import TrainerListView from './view';
import trainersQuery from '../../../../../shared/queries/trainers';
import deleteTrainerMutation from '../../../../../shared/mutations/deleteTrainer';

const TrainerListContainer = compose(
  graphql(deleteTrainerMutation, {
    name: 'deleteTrainerMutation',
  }),
  graphql(trainersQuery, {
    options: {
      fetchPolicy: 'network-only',
    },
    props: ({ data: { user, ...rest } }) => {
      if (!user) {
        return { data: { ...rest } };
      }

      const onlyActiveTrainers = user.trainers.filter(trainer => trainer.isActive);

      return {
        data: {
          trainers: onlyActiveTrainers,
          ...rest,
        },
      };
    },
  }),
)(withRouter(TrainerListView));

export default TrainerListContainer;
