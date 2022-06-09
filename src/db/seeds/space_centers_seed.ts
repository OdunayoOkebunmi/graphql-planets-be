import { Knex } from "knex";
const space_centers = require('../../space-centers.json');

export async function seed (knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("space_centers").del();

    // Inserts seed entries
    await knex('space_centers').insert(space_centers);
};
