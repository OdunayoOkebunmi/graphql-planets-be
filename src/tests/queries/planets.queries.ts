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
// npx knex migrate:up 20220612082127_flight_table.ts

// npx knex migrate:up 20220609204934_create_space_centers_table.ts

// npx knex migrate:up 20220609200658_create_planets_table.ts