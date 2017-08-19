/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const userQuery = gql`
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

export default userQuery;
