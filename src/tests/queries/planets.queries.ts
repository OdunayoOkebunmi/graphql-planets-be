import { gql } from 'apollo-server'

export const getPlanets = gql`
  query {
    getPlanets {
    id
    name
    code
    created_at
    updated_at
  }
  }
`

export const getPlanetsByID = gql`
query ($planetId: Float!) {
  planet(id: $planetId) {
    id
    name
    code
  }
}
`