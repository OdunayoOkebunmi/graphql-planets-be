import { Knex } from "knex";


export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable('flights', (t) => {
    t.increments('id');
    t.string('code');
    t.dateTime('departureAt');
    t.integer('seatCount');
    t.integer('launchSiteId');
    t.integer('landingSiteId');
    t
      .foreign('launchSiteId')
      .references('space_centers.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t
      .foreign('landingSiteId')
      .references('space_centers.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}


export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('flights');
}

