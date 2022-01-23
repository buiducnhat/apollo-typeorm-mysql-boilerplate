import express from 'express';
import { Server } from 'http';

import expressLoader from './express.loader';
import dependencyInjectorLoader from './dependency-injector.loader';
import databaseLoader from './database.loader';
import Logger from './logger.loader';
import { Task } from '@src/entities/task.entity';
import { Category } from '@src/entities/category.entity';
import { User } from '@src/entities/user.entity';
import { UserMeta } from '@src/entities/user-meta.entity';

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
    repositories: [User, UserMeta, Task, Category].map(e => ({
      name: e.name.charAt(0).toLowerCase() + e.name.slice(1) + 'Repository',
      repository: connection.manager.getRepository(e),
    })),
  });
  Logger.info('✅ Dependency Injector loaded.');

  await expressLoader({ app: expressApp, httpServer });
  Logger.info('✅ Express loaded.');
};
