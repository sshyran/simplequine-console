/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

export const userIdQuery = gql`
  query user {
    user {
      id
      email
      name
      daysInAdvance
      timeZoneName
    }
  }
`;
