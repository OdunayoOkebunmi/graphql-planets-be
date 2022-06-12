import { EventEmitter } from 'events'
import { Knex } from 'knex';


export type MyContext = {
  req: any
  res: any
  db: Knex
  bus: EventEmitter
}