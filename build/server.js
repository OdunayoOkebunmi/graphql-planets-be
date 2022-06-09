"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
require("reflect-metadata");
const apollo_server_koa_1 = require("apollo-server-koa");
const type_graphql_1 = require("type-graphql");
const resolvers_1 = __importDefault(require("./resolvers"));
async function createApolloServer(app) {
    const server = new apollo_server_koa_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [resolvers_1.default]
        }),
        context: ({ req, res }) => {
            return {
                req,
                res,
            };
        }
    });
    await server.start();
    return server;
}
exports.createApolloServer = createApolloServer;
