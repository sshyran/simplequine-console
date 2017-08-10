/* eslint template-tag-spacing: ["error", "never"] */

import { gql } from 'react-apollo';

const deleteService = gql`
  mutation updateService (
    $serviceId: ID!,
  ){
    updateService(
      id: $serviceId,
      isActive: false
    ) {
      id
      isActive
    }
  }
`;

export default deleteService;
