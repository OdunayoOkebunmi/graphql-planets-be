import db from '../db_config'
import { testClient } from './setup'
import { spaceCenters, getSpaceCenterByID, getSpaceCenterByUID } from './queries/spacecenters.queries';
import { seedSpaceCenters, seedPlanets } from './helper'



describe('Spacecenters', () => {
  beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })

  afterEach(async () => {
    await db.migrate.rollback()
  })

  test('it should fetch the list of spacecenters', async () => {
    await seedPlanets()
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
  test('it should fetch the spacecenter by id', async () => {
    await seedPlanets()
    await seedSpaceCenters()
    const { query } = await testClient({
      req: {
        headers: {},
      },
    })

    const res = await query({
      query: getSpaceCenterByID,
      variables: {
        "spaceCenterId": 1,
      },
    })
    expect(typeof res.data.spaceCenter).toBe('object')
    expect(res.data.spaceCenter).toHaveProperty('id')
    expect(res.data.spaceCenter.id).toEqual(1)
    expect(res.data.spaceCenter).toHaveProperty('name')
    expect(res.data.spaceCenter).toHaveProperty('description')
  })
  test('it should fetch the spacec by uid', async () => {
    await seedPlanets()
    await seedSpaceCenters()
    const { query } = await testClient({
      req: {
        headers: {},
      },
    })

    const res = await query({
      query: getSpaceCenterByUID,
      variables: {
        uid: "da9c2dee-3b38-4d21-b911-083599c05dad"
      },
    })
    expect(typeof res.data.spaceCenter).toBe('object')
    expect(res.data.spaceCenter).toHaveProperty('id')
    expect(res.data.spaceCenter.uid).toEqual("da9c2dee-3b38-4d21-b911-083599c05dad")
    expect(res.data.spaceCenter).toHaveProperty('name')
    expect(res.data.spaceCenter).toHaveProperty('description')
  })
})