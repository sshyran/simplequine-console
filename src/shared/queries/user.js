/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

export const userIdQuery = gql`
  query {
    user {
      id
      email
      name
    }
  }
`;
