/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const createTrainerWithSchedule = gql`
  mutation createTrainer (
  $email: String,
  $firstName: String!,
  $lastName: String!,
  $phoneNumber: String,
  $schedules: [TrainerschedulesSchedule!],  
  $userId: ID!
  ){
    createTrainer(
      email: $email,
      firstName: $firstName,
      lastName: $lastName,
      phoneNumber: $phoneNumber,
      schedules: $schedules
      userId: $userId,
    ) {
      id
      email
      firstName
      lastName
      phoneNumber
      schedules {
        id
      }
      user {
        id
        trainers {
          id
          email
          firstName
          lastName
          phoneNumber
          schedules {
            id
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default createTrainerWithSchedule;
