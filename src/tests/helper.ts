import db from '../db_config';
const planetsSeed = require('../../planets.json');
const spacecentersSeed = require('../../space-centers.json')

export const seedPlanets = async () => {
  const [planets] = await db('planets')
    .insert(planetsSeed)
    .returning('*')

  return planets
}

export const seedSpaceCenters = async () => {
  const [spaceCenters] = await db('space_centers')
    .insert(spacecentersSeed)
    .returning('*')

  return spaceCenters
}