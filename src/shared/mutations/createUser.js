/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const createUser = gql`
  mutation (
    $idToken: String!,
    $email: String!,
    $name: String!,
    $daysInAdvance: Int!,
    $timeZoneName: String!,
    $trainers: [UsertrainersTrainer!]!,
    $services: [UserservicesService!]!,
  ){
    createUser(
      authProvider: {auth0: {idToken: $idToken}}
      email: $email
      name: $name
      daysInAdvance: $daysInAdvance,
      timeZoneName: $timeZoneName,
      trainers: $trainers
      services: $services
    ) {
      id
      email
      name
      daysInAdvance
      timeZoneName
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
