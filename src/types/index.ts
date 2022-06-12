import { EventEmitter } from 'events'
import knex, { Knex } from 'knex';
import PlanetsRepo from '../repositories/planet.repo'


export type MyContext = {
  req: any
  res: any
  db: Knex
  repositories: {
    planetsRepo: PlanetsRepo
  }
  bus: EventEmitter
}