import Container from 'typedi';
import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { Context } from '@src/types/context.interface';
import config from '@src/config';
import UserService from '@src/modules/user/user.service';
import { User } from '@src/entities/user.entity';

export const isOptionalAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  let user: User;

  try {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
      return;
    }
    const bearerToken = authorization.split('Bearer ');
    if (bearerToken.length < 1) {
      return;
    }
    const token = bearerToken[1];

    const payload = verify(token, config.jwt.jwtSecret) as { userId: number };

    const userService = Container.get(UserService);
    user = await userService.getUser(payload?.userId);
  } catch (err) {
  } finally {
    context.req.user = user || null;
    context.req.hasPermission = true;
  }
  return next();
};
