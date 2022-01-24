import express from 'express';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Server } from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import passport from 'passport';

import { AuthResolver } from '@src/modules/auth/auth.resolver';
import { CategoryResolver } from '@src/modules/category/category.resolver';
import { TaskResolver } from '@src/modules/task/task.resolver';
import { ErrorInterceptor } from '@src/interceptors/error.interceptor';
import config from '@src/config';

interface GraphQLLoaderParams {
  app: express.Application;
  httpServer: Server;
}

export default async ({ app, httpServer }: GraphQLLoaderParams) => {
  const schema = await buildSchema({
    container: Container,
    resolvers: [AuthResolver, CategoryResolver, TaskResolver],
    globalMiddlewares: [ErrorInterceptor],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, passport }),
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, path: `${config.api.prefix}/graphql` });

  return server;
};
