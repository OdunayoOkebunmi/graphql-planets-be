import { Knex } from "knex";
const planets = require('../../planets.json');

export async function seed (knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("planets").del();

    // Inserts seed entries
    await knex('planets').insert(planets);
};
