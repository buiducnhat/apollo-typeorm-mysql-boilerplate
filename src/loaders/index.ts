import express from 'express';

import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import databaseLoader from './database';
import Logger from './logger';
import { Task } from '@src/entities/Task';
import { Category } from '@src/entities/Category';
import { Server } from 'http';

interface LoaderParams {
  expressApp: express.Application;
  httpServer: Server;
}

export default async ({ expressApp, httpServer }: LoaderParams) => {
  const runMode = process.env.NODE_ENV;
  Logger.info(`✅ Server is running on [${runMode.toUpperCase()}] mode.`);

  const connection = await databaseLoader.create();
  Logger.info('✅ DB loaded and connected.');

  await dependencyInjectorLoader({
    repositories: [Task, Category].map(e => ({
      name: e.name.charAt(0).toLowerCase() + e.name.slice(1) + 'Repository',
      repository: connection.manager.getRepository(e),
    })),
  });
  Logger.info('✅ Dependency Injector loaded.');

  await expressLoader({ app: expressApp, httpServer });
  Logger.info('✅ Express loaded.');
};
