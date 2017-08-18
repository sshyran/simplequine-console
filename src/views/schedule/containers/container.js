/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import appointmentsQuery from '../network/appointments';
import ScheduleView from '../views/view';

const ScheduleContainer = compose(
  graphql(appointmentsQuery, {
    options: {
      fetchPolicy: 'cache-and-network',
      pollInterval: 300000,
    },
    props: ({ data: { user, ...rest } }) => {
      if (!user) {
        return { data: { ...rest } };
      }

      return {
        data: {
          appointments: user.appointments,
          ...rest,
          isUserLoggedIn: true,
        },
      };
    },
  }),
)(withRouter(ScheduleView));

export default ScheduleContainer;
