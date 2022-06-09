import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from 'type-graphql';
import Query from './resolvers';
import database from './db_config';

export async function createApolloServer (app: object): Promise<ApolloServer> {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Query]
    }),
    context: ({ req, res }: any) => {
      return {
        req,
        res,
        db: database,
      }
    }
  });

  await server.start()

  return server;
}