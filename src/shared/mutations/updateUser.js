/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const updateUser = gql`
  mutation updateUser (
  $userId: ID!,
  $email: String,
  $name: String!,
  ){
    updateUser(
      id: $userId,
      email: $email,
      name: $name,
    ) {
      id
      email
      name
    }
  }
`;

export default updateUser;
