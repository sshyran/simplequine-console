/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const updateUser = gql`
  mutation updateUser (
  $userId: ID!,
  $email: String,
  $name: String!,
  $daysInAdvance: Int,
  $timeZoneName: String,
  ){
    updateUser(
      id: $userId,
      email: $email,
      name: $name,
      daysInAdvance: $daysInAdvance,
      timeZoneName: $timeZoneName,
    ) {
      id
      email
      name
      daysInAdvance
      timeZoneName
    }
  }
`;

export default updateUser;
