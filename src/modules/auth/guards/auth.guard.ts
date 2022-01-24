import { UseMiddleware } from 'type-graphql';

import { isAuth } from '@src/modules/auth/middlewares/is-auth.middleware';
import { isOptionalAuth } from '@src/modules/auth/middlewares/is-optional-auth.middleware';

export const AuthGuard = (required = true) => UseMiddleware(required ? isAuth : isOptionalAuth);
