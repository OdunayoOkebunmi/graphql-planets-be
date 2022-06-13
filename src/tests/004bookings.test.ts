import db from '../db_config'
import { testClient } from './setup'
import { bookFlight, getBookings, getBookingByID } from './queries/bookings.queries';
import { seedSpaceCenters, seedPlanets } from './helper'
import { scheduleFlight } from './queries/flight.queries';


describe('Bookings', () => {
  beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })

  afterEach(async () => {
    await db.migrate.rollback()
  })
  test('it should book flight', async () => {
    await seedPlanets()
    await seedSpaceCenters()
    const { mutate } = await testClient({
      req: {
        headers: {},
      },
    })
    await mutate({
      mutation: scheduleFlight,
      variables: {
        flightInfo: {
          launchSiteId: 15,
          landingSiteId: 15,
          departureAt: "1970-01-01T00:00:00Z",
          seatCount: 200
        },
      },
    })
    const res = await mutate({
      mutation: bookFlight,
      variables: {
        bookingInfo: {
          flightId: 1,
          email: "name@email.com",
          seat_count: 20
        },
      },
    })
    expect(typeof res.data).toBe('object')
    expect(res.data).toHaveProperty('bookFlight')
    expect(res.data.bookFlight).toHaveProperty('id')
    expect(res.data.bookFlight.id).toEqual(1)
  })
  test('it should fetch all bookings', async () => {
    await seedPlanets()
    await seedSpaceCenters()
    const { query, mutate } = await testClient({
      req: {
        headers: {},
      },
    })
    await mutate({
      mutation: bookFlight,
      variables: {
        bookingInfo: {
          flightId: 1,
          email: "name@email.com",
          seat_count: 20
        },
      },
    })

    const res = await query({
      query: getBookings,
    })
    expect(res.data).toHaveProperty('bookings')
    expect(res.data.bookings[0]).toHaveProperty('pagination')
    expect(res.data.bookings[0]).toHaveProperty('nodes')

  })
  test('it should fetch bookings by ID', async () => {
    await seedPlanets()
    await seedSpaceCenters()
    const { query, mutate } = await testClient({
      req: {
        headers: {},
      },
    })
    await mutate({
      mutation: scheduleFlight,
      variables: {
        flightInfo: {
          launchSiteId: 15,
          landingSiteId: 15,
          departureAt: "1970-01-01T00:00:00Z",
          seatCount: 200
        },
      },
    })
    await mutate({
      mutation: bookFlight,
      variables: {
        bookingInfo: {
          flightId: 1,
          email: "name@email.com",
          seat_count: 20
        },
      },
    })

    const res = await query({
      query: getBookingByID,
      variables: {
        bookingId: 1
      }
    })
    expect(res.data).toHaveProperty('booking')
    expect(res.data.booking).toHaveProperty('id')
    expect(res.data.booking).toHaveProperty('email')
    expect(res.data.booking).toHaveProperty('seat_count')
    expect(res.data.booking.id).toEqual(1)
  })
})