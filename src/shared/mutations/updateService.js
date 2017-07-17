/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const updateService = gql`
  mutation (
  $serviceId: ID!,
  $currency: String!,
  $description: String,
  $duration: Int!,
  $maxParticipants: Int!,
  $name: String!,
  $price: Float!,
  ){
    updateService(
      id: $serviceId,
      currency: $currency,
      description: $description,
      duration: $duration,
      maxParticipants: $maxParticipants,
      name: $name,
      price: $price,
    ) {
      id
      currency
      description
      duration
      name
      price
      user {
        id
        services {
          id
          currency
          description
          duration
          name
          price
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default updateService;
