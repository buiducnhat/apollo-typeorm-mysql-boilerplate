import 'reflect-metadata';
import http from 'http';
import express from 'express';

import Logger from './loaders/logger.loader';
import config from './config';
import loaders from './loaders';

export const app = express();

export async function startServer() {
  const httpServer = http.createServer(app);
  await loaders({ expressApp: app, httpServer });

  httpServer.listen(config.port, () => {
    Logger.info(`✅ Everthing is ready`);
    Logger.info(`🚀 Graphql Server is running at ${config.host}/graphql 🚀`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
