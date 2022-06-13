import db from '../db_config'
import { testClient } from './setup'
import { getPlanets, getPlanetsByID } from './queries/planets.queries';
import { seedPlanets } from './helper'



describe('Planets', () => {
  beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })

  afterEach(async () => {
    await db.migrate.rollback()
  })

  test('it should fetch the list of planets', async () => {
    await seedPlanets()
    const { query } = await testClient({
      req: {
        headers: {},
      },
    })

    const res = await query({
      query: getPlanets,
    })
    expect(res.data.getPlanets.length).toEqual(15)
    expect(res.data.getPlanets[0]).toHaveProperty('id')
    expect(res.data.getPlanets[0]).toHaveProperty('name')
    expect(res.data.getPlanets[0]).toHaveProperty('code')
  })
  test('it should fetch the planet by id', async () => {
    await seedPlanets()
    const { query } = await testClient({
      req: {
        headers: {},
      },
    })

    const res = await query({
      query: getPlanetsByID,
      variables: {
        "planetId": 1,
      },
    })
    expect(typeof res.data.planet).toBe('object')
    expect(res.data.planet).toHaveProperty('id')
    expect(res.data.planet.id).toEqual(1)
    expect(res.data.planet).toHaveProperty('name')
    expect(res.data.planet).toHaveProperty('code')
  })
})