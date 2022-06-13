import { gql } from 'apollo-server';

export const spaceCenters = gql`
query ($page: Int, $pageSize: Int) {
  spaceCenters(page: $page, pageSize: $pageSize) {
    pagination {
      total
    }
    nodes {
      id
      uid
      name
      description
      latitude
      longitude
      planet {
        id
        name
        created_at
      }
    }
  }
}


`