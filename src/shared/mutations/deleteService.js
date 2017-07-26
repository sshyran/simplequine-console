/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const deleteService = gql`
  mutation updateService (
    $serviceId: ID!,
  ){
    updateService(
      id: $serviceId,
      isActive: false
    ) {
      currency
      description
      duration
      id
      name
      price
      isActive
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
