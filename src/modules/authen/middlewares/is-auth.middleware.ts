import Container from 'typedi';
import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

import { Context } from '@src/types/context.interface';
import config from '@src/config';
import UserService from '@src/modules/user/user.service';

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('Not authenticated');
  }

  try {
    const bearerToken = authorization.split('Bearer ');
    if (bearerToken.length < 1) {
      throw new Error('Invalid token');
    }
    const token = bearerToken[1];

    const payload = verify(token, config.jwt.jwtSecret) as { userId: number };

    const userService = Container.get(UserService);
    const user = await userService.getUser(payload?.userId);
    if (!user) {
      throw new Error();
    }

    context.req.user = user;
  } catch (err) {
    throw new Error('Not authenticated');
  }
  return next();
};
