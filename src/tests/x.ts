import { ValidationError } from 'apollo-server'
import db from '../db_config'
import { testClient } from './setup'
import { spaceCenters } from './queries/spacecenters.queries';
import { seedSpaceCenters } from './helper'



describe('Spacecenters', () => {
  // beforeEach(async () => {
  //   await db.migrate.rollback()
  //   await db.migrate.latest()
  // })

  // afterEach(async () => {
  //   await db.migrate.rollback()
  // })

  test('it should fetch the list of spacecenters', async () => {
    await seedSpaceCenters()
    const { query } = await testClient({
      req: {
        headers: {},
      },
    })

    const res = await query({
      query: spaceCenters,
    })
    expect(res.data.spaceCenters[0]).toHaveProperty('pagination')
    expect(res.data.spaceCenters[0]).toHaveProperty('nodes')
  })
  // test('it should fetch the planet by id', async () => {
  //   await seedPlanets()
  //   const { query } = await testClient({
  //     req: {
  //       headers: {},
  //     },
  //   })

  //   const res = await query({
  //     query: getPlanetsByID,
  //     variables: {
  //       "planetId": 1,
  //     },
  //   })
  //   expect(typeof res.data.planet).toBe('object')
  //   expect(res.data.planet).toHaveProperty('id')
  //   expect(res.data.planet.id).toEqual(1)
  //   expect(res.data.planet).toHaveProperty('name')
  //   expect(res.data.planet).toHaveProperty('code')
  // })
})