import { Knex } from "knex";


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('bookings', (t) => {
    t.increments('id');
    t.integer('seat_count');
    t.string('email');
    t.integer('flight_id');
    t.foreign('flight_id')
      .references('id')
      .inTable('flights')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  });
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('bookings');
}

