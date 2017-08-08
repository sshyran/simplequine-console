/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const updateTrainer = gql`
  mutation updateTrainer (
  $trainerId: ID!,
  $email: String,
  $firstName: String!,
  $lastName: String!,
  $phoneNumber: String,
  $schedules: [TrainerschedulesSchedule!],
  ){
    updateTrainer(
      id: $trainerId,
      email: $email,
      firstName: $firstName,
      lastName: $lastName,
      phoneNumber: $phoneNumber,
      schedules: $schedules
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
            endsAt
            startsAt
            workingDays
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default updateTrainer;
