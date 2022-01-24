import Container from 'typedi';
import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';

import { Context } from '@src/types/context.interface';
import config from '@src/config';
import UserService from '@src/modules/user/user.service';

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new AuthenticationError('Unauthenticated');
  }

  try {
    const bearerToken = authorization.split('Bearer ');
    if (bearerToken.length < 1) {
      throw new AuthenticationError('Unauthenticated');
    }
    const token = bearerToken[1];

    const payload = verify(token, config.jwt.jwtSecret) as { userId: number };

    const userService = Container.get(UserService);
    const user = await userService.getUser(payload?.userId);
    if (!user) {
      throw new AuthenticationError('Unauthenticated');
    }

    context.user = user;
    context.hasPermission = true;
  } catch (error) {
    throw new AuthenticationError('Unauthenticated');
  }
  return next();
};
