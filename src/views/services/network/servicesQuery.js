/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const servicesQuery = gql`
  query {
    user {
      id
      services {
        currency
        description
        duration
        id
        name
        isActive
        maxParticipants
        price
      }
    }
  }
`;

export default servicesQuery;
