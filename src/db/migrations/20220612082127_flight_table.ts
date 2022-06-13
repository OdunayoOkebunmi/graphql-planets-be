import { Knex } from "knex";


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('flights', (t) => {
    t.increments('id');
    t.string('code');
    t.dateTime('departureAt');
    t.integer('seatCount');
    t.integer('availableSeats');
    t.integer('launchSiteId');
    t.integer('landingSiteId');
    t.foreign('landingSiteId')
      .references('id')
      .inTable('space_centers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    t.foreign('launchSiteId')
      .references('id')
      .inTable('space_centers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('flights');
}

