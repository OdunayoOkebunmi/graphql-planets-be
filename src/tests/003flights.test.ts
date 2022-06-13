import db from '../db_config'
import { testClient } from './setup'
import { scheduleFlight, getFlights } from './queries/flight.queries';
import { seedSpaceCenters, seedPlanets } from './helper'



describe('Flights', () => {
  beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })

  afterEach(async () => {
    await db.migrate.rollback()
  })
  test('it should schedule flight', async () => {
    await seedPlanets()
    await seedSpaceCenters()
    const { mutate } = await testClient({
      req: {
        headers: {},
      },
    })

    const res = await mutate({
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
    // expect(typeof res.data.scheduleFlight).toBe('object')
    // expect(res.data.scheduleFlight).toHaveProperty('id')
    // expect(res.data.scheduleFlight.id).toEqual(1)
    // expect(res.data.scheduleFlight).toHaveProperty('launchSite')
  })
  // test('it should fetch all flights', async () => {
  //   await seedPlanets()
  //   await seedSpaceCenters()
  //   const { query } = await testClient({
  //     req: {
  //       headers: {},
  //     },
  //   })

  //   const res = await query({
  //     query: getFlights,
  //   })
  //   expect(res.data).toHaveProperty('flights')
  //   expect(res.data.flights[0]).toHaveProperty('pagination')
  //   expect(res.data.flights[0]).toHaveProperty('nodes')
  //   expect(res.data.flights[0].pagination).toHaveProperty('total')
  // })
})