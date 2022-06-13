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
export const getSpaceCenterByID = gql`
query ($spaceCenterId: Float) {
  spaceCenter(id: $spaceCenterId) {
    id
    uid
    name
    description
  }
}
`

export const getSpaceCenterByUID = gql`
query ($uid: String) {
  spaceCenter(uid: $uid) {
    id
    uid
    name
    description
  }
}
`