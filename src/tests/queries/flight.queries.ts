import { gql } from 'apollo-server'

export const scheduleFlight = gql`
mutation ($flightInfo: ScheduleFlightInput!) {
  scheduleFlight(flightInfo: $flightInfo) {
    id
    code
    launchSite {
      id
      uid
      name
    }
    landingSite {
      id
      uid
    }
    departureAt
    seatCount
    availableSeats
  }
}
`
export const getFlights = gql`
query {
  flights {
    pagination {
      total
    }
    nodes {
      id
      code
    }
  }
}
`