import db from '../db_config';
import planetsJson from '../../planets.json'
export const seedPlanets = async () => {
  const [planets] = await db('planets')
    .insert(planetsJson)
    .returning('*')

  return planets
}