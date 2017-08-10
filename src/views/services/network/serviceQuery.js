/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const serviceQuery = gql`
  query($serviceId: ID!) {
    Service(id: $serviceId) {
      currency
      description
      duration
      id
      name
      maxParticipants
      price
    }
  }
`;

export default serviceQuery;
