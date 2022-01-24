import { MiddlewareFn } from 'type-graphql';
import { ForbiddenError } from 'apollo-server-express';

import { Context } from '@src/types/context.interface';
import { UserRole } from '@src/entities/user-meta.entity';

export const checkPermission =
  (roles: UserRole[], required = true): MiddlewareFn<Context> =>
  async ({ context }, next) => {
    try {
      if (!context.user || !context.user.meta.role) {
        context.hasPermission = false;
      } else {
        context.hasPermission = roles.includes(context?.user?.meta?.role);
      }
      if (required && !context.hasPermission) {
        throw new Error('Forbidden');
      }
      return next();
    } catch (error) {
      throw new ForbiddenError('Forbidden');
    }
  };
