/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const deleteMutation = gql`
  mutation updateTrainer (
    $trainerId: ID!,
  ){
    updateTrainer(
      id: $trainerId,
      isActive: false
    ) {
      id
      email
      firstName
      lastName
      phoneNumber
      isActive
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
    }
  }
`;

export default deleteMutation;
