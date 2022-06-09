import { Knex } from "knex";


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('planets', (t) => {
    t.increments('id')
    t.string('name').notNullable().unique()
    t.string('code').notNullable().unique()
    t.timestamps(false, true)
    t.primary(['id'])
  })
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('planets');
}

