import db from '../db_config'
import PlanetRepo from './planet.repo'

export default {
  planetRepo: new PlanetRepo(db)
}