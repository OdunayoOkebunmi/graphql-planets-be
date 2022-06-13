import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from 'type-graphql';
import PlanetResolver from './resolvers/planet-resolver';
import SpaceCenterResolver from './resolvers/spacecenters-resolver';
import FlightResolver from './resolvers/flight-resolver';
import BookingResolver from './resolvers/booking-resolver';
import database from './db_config';

export const schema = async () => {
  return await buildSchema({
    resolvers: [
      PlanetResolver,
      SpaceCenterResolver,
      FlightResolver,
      BookingResolver
    ],
  })
}
export const defaultContext = ({ req, res }: any) => {
  return {
    req,
    res,
    db: database
  }

}

export async function createApolloServer (app: object): Promise<ApolloServer> {

  const server = new ApolloServer({
    schema: await schema(),
    context: defaultContext
  });

  await server.start()

  return server;
}