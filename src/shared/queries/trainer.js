/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const trainerQuery = gql`
  query($trainerId: ID!) {
    Trainer(id: $trainerId) {
      email
      firstName
      id
      lastName
      phoneNumber
      schedules {
        endsAt
        id
        startsAt
        workingDays
      }
    }
  }
`;

export default trainerQuery;
