// 3rd party modules
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// App modules
import ScheduleView from './view';
import appointmentsQuery from '../../../shared/queries/appointments';

const ScheduleContainer = compose(
  graphql(appointmentsQuery, {
    props: ({ data: { user, ...rest } }) => {
      if (!user) {
        return { data: { ...rest } };
      }

      return {
        data: {
          appointments: user.services
            .map(service => service.appointments)
            .reduce((acc, cur) => acc.concat(cur), []),
          ...rest,
          isUserLoggedIn: true,
        },
      };
    },
  }),
)(withRouter(ScheduleView));

export default ScheduleContainer;
