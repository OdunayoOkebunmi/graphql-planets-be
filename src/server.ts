import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from 'type-graphql';
import PlanetResolver from './resolvers/planet-resolver';
import Query from './resolvers';
import database from './db_config';

export const schema = async () => {
  return await buildSchema({
    resolvers: [
      PlanetResolver, Query
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