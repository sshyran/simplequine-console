/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const appointmentsQuery = gql`
  query {
    user {
      id
      appointments {
        id
        email
        firstName
        lastName
        phoneNumber
        startsAt
        endsAt
        price
        appointmentGroup {
          id
          appointments {
            id
            startsAt
            endsAt
            email
            firstName
            lastName
            phoneNumber
          }
        }
        service {
          id
          name
        }
        trainer {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export default appointmentsQuery;
