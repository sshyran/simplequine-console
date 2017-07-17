// 3rd party modules
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// App modules
import ServiceListView from './view';
import servicesQuery from '../../../../../shared/queries/services';
import deleteServiceMutation from '../../../../../shared/mutations/deleteService';

const ServiceListContainer = compose(
  graphql(deleteServiceMutation, {
    name: 'deleteServiceMutation',
  }),
  graphql(servicesQuery, {
    props: ({ data: { user, ...rest } }) => {
      if (!user) {
        return { data: { ...rest } };
      }

      return {
        data: {
          services: user.services,
          ...rest,
        },
      };
    },
  }),
)(withRouter(ServiceListView));

export default ServiceListContainer;
