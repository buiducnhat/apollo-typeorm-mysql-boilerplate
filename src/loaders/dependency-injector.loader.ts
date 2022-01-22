import Container from 'typedi';

import LoggerInstance from './logger.loader';

export default ({ repositories }: { repositories: { name: string; repository: any }[] }) => {
  try {
    repositories.forEach(async repo => {
      Container.set(repo.name, repo.repository);
    });

    Container.set('logger', LoggerInstance);
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
