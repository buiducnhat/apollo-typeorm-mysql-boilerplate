import { Container } from 'typedi';
import { Strategy } from 'passport-facebook';

import config from '@src/config';
import AuthService from '@src/modules/auth/auth.service';

export const facebookStrategy = new Strategy(
  {
    clientID: config.facebook.appId,
    clientSecret: config.facebook.secretKey,
    callbackURL: `${config.host}/auth/facebook/redirect`,
    profileFields: ['id', 'email', 'name', 'photos'],
    enableProof: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    const authService = Container.get(AuthService);
    const result = await authService.loginWithSocial('Facebook', profile);

    done(null, result);
  },
);
