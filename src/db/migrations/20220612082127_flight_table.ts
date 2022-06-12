import { Knex } from "knex";


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('flights', (t) => {
    t.increments('id');
    t.string('code');
    t.dateTime('departure_at');
    t.integer('seat_count');
  });
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('flights');
}

