/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const trainersQuery = gql`
  query {
    user {
      id
      trainers {
        email
        firstName
        id
        lastName
        phoneNumber
        isActive
        schedules {
          endsAt
          id
          startsAt
          workingDays
        }
      }
    }
  }
`;

export default trainersQuery;
