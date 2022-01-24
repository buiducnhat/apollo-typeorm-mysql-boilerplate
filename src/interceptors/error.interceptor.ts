import { MiddlewareFn } from 'type-graphql';

import { Context } from '@src/types/context.interface';
import Container from 'typedi';
import { Logger } from 'winston';

export const ErrorInterceptor: MiddlewareFn<Context> = async ({ context, info }, next) => {
  const logger = Container.get('logger') as Logger;
  try {
    return await next();
  } catch (err) {
    logger.error(err, context, info);
    if (err.includes('sql')) {
      throw new Error('Internal server error');
    }

    throw err;
  }
};
