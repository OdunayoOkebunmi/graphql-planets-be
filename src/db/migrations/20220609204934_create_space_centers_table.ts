import { Knex } from "knex";


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('space_centers', (t) => {
    t.increments('id');
    t.uuid('uid');
    t.string('name');
    t.text('description');
    t.float('latitude');
    t.float('longitude');
    t.string('planet_code')
    t.foreign('planet_code')
      .references('planets.code')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.timestamps(false, true)
    t.primary(['id'])
  })
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('space_centers');
}

