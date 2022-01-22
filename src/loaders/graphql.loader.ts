import express from 'express';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Server } from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import { CategoryResolver } from '@src/modules/category/category.resolver';

interface GraphQLLoaderParams {
  app: express.Application;
  httpServer: Server;
}

export default async ({ app, httpServer }: GraphQLLoaderParams) => {
  const schema = await buildSchema({
    container: Container,
    resolvers: [CategoryResolver],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    debug: true,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  return server;
};
