/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const deleteService = gql`
  mutation deleteService (
  $serviceId: ID!,
  ){
    deleteService(
      id: $serviceId,
    ) {
      currency
      description
      duration
      id
      name
      price
      user {
        id
        services {
          currency
          description
          duration
          id
          name
          price
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default deleteService;
