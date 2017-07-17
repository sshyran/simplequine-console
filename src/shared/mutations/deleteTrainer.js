/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const deleteTrainer = gql`
  mutation deleteTrainer (
  $trainerId: ID!,
  ){
    deleteTrainer(
      id: $trainerId,
    ) {
      id
      email
      firstName
      lastName
      phoneNumber
      user {
        id
        trainers {
          id
          email
          firstName
          lastName
          phoneNumber
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default deleteTrainer;
