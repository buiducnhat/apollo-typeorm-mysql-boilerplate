import 'reflect-metadata';
import http from 'http';
import express from 'express';

import Logger from './loaders/logger';
import config from './config';
import loaders from './loaders';

export const app = express();

export async function startServer() {
  const httpServer = http.createServer(app);
  await loaders({ expressApp: app, httpServer });

  httpServer.listen(config.port, () => {
    Logger.info(`✅ Everthing is ready.
      #####################################
      🚀  Server listening on port: ${config.port} 🚀
      #####################################
    `);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
