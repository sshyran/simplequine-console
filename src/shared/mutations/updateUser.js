/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const updateUser = gql`
  mutation updateUser (
  $userId: ID!,
  $email: String,
  $name: String!,
  $daysInAdvance: Int,
  ){
    updateUser(
      id: $userId,
      email: $email,
      name: $name,
      daysInAdvance: $daysInAdvance,
    ) {
      id
      email
      name
      daysInAdvance
    }
  }
`;

export default updateUser;
