/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import servicesQuery from '../network/servicesQuery';
import ServiceListView from '../views/list';
import deleteServiceMutation from '../../../shared/mutations/deleteService';

const ServiceListContainer = compose(
  graphql(deleteServiceMutation, {
    name: 'deleteServiceMutation',
  }),
  graphql(servicesQuery, {
    options: {
      fetchPolicy: 'network-only',
    },
    props: ({ data: { user, ...rest } }) => {
      if (!user) {
        return { data: { ...rest } };
      }

      const activeServices = user.services.filter(service => service.isActive);

      return {
        data: {
          services: activeServices,
          ...rest,
        },
      };
    },
  }),
)(withRouter(ServiceListView));

export default ServiceListContainer;
