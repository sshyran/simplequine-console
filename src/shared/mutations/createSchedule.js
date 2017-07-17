/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const createSchedule = gql`
  mutation createSchedule (
  $startsAt: Int!,
  $endsAt: Int!,
  $workingDays: [Int!]!,
  $trainerId: ID!
  ){
    createSchedule(
      startsAt: $startsAt,
      endsAt: $endsAt,
      workingDays: $workingDays,
      trainerId: $trainerId,
    ) {
      id
      startsAt
      endsAt
      workingDays
      trainer {
        id
        schedules {
          id
          startsAt
          endsAt
          workingDays
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default createSchedule;
