import { gql } from 'apollo-server'

export const bookFlight = gql`
mutation ($bookingInfo: BookFlightInput!) {
  bookFlight(bookingInfo: $bookingInfo) {
    id
    email
    seat_count
    availableSeats
  }
}
`
export const getBookings = gql`
query  {
  bookings {
    pagination {
      total
      page
      pageSize
    }
    nodes {
      id
      email
      seat_count
      availableSeats
    }
  }
}
`
export const getBookingByID = gql`
query ($bookingId: Float!) {
  booking(id: $bookingId) {
    id
    email
    seat_count
    availableSeats
  }
}
`