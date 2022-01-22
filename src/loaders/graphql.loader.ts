import express from 'express';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Server } from 'http';

import { GetCategories } from '@src/modules/category/get-categories.service';
import { CreateCategory } from '@src/modules/category/create-category.service';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

interface GraphQLLoaderParams {
  app: express.Application;
  httpServer: Server;
}

export default async ({ app, httpServer }: GraphQLLoaderParams) => {
  const schema = await buildSchema({
    container: Container,
    resolvers: [CreateCategory, GetCategories],
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
