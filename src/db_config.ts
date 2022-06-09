import Knex from 'knex'
import KnexTinyLogger from 'knex-tiny-logger'
import config from '../knexfile';


const env = process.env.NODE_ENV || 'development';
const knex =
  process.env.DEBUG === 'true' ? KnexTinyLogger(Knex(config[env])) : Knex(config[env])

export default knex;
