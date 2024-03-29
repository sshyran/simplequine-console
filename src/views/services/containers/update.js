/* 3rd party modules */
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

/* App modules */
import serviceQuery from '../network/serviceQuery';
import updateService from '../network/update';
import UpdateServiceView from '../views/update';

const UpdateServiceContainer = compose(
  graphql(updateService, {
    name: 'updateServiceMutation',
  }),
  graphql(serviceQuery, {
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        serviceId: props.match.params.serviceId,
      },
    }
    ),
    props: ({ data: { Service, ...rest } }) => {
      if (!Service) {
        return { data: { ...rest } };
      }

      return {
        data: {
          service: Service,
          ...rest,
        },
      };
    },
  }),
)(withRouter(UpdateServiceView));

export default withRouter(UpdateServiceContainer);
