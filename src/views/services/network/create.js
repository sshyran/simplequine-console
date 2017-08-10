/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const createService = gql`
  mutation (
  $currency: String!,
  $description: String,
  $duration: Int!,
  $maxParticipants: Int!,
  $name: String!,
  $price: Float!,
  $userId: ID!
  ){
    createService(
      currency: $currency,
      description: $description,
      duration: $duration,
      maxParticipants: $maxParticipants,
      name: $name,
      price: $price,
      userId: $userId,
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

export default createService;
