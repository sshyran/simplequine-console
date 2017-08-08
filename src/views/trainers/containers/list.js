// 3rd party modules
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// App modules
import TrainerListView from '../views/list';
import trainersQuery from '../network/trainersQuery';
import deleteMutation from '../network/deleteMutation';

const TrainerListContainer = compose(
  graphql(deleteMutation, {
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

      return {
        data: {
          trainers: user.trainers.filter(trainer => trainer.isActive),
          ...rest,
        },
      };
    },
  }),
)(withRouter(TrainerListView));

export default TrainerListContainer;
