/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const createUser = gql`
  mutation (
    $idToken: String!,
    $email: String!,
    $name: String!,
    $trainers: [UsertrainersTrainer!]!,
    $services: [UserservicesService!]!,
  ){
    createUser(
      authProvider: {auth0: {idToken: $idToken}}
      email: $email
      name: $name
      trainers: $trainers
      services: $services
    ) {
      id
      email
      name
      trainers {
        id
        schedules {
          id
        }
      }
      services {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

export default createUser;
