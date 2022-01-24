import { Container } from 'typedi';
import { Strategy } from 'passport-google-oauth20';

import config from '@src/config';
import AuthService from '@src/modules/auth/auth.service';

export const googleStrategy = new Strategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: `${config.host}/auth/google/redirect`,
    scope: ['email', 'profile'],
  },
  async (accessToken, refreshToken, profile, done) => {
    const authService = Container.get(AuthService);
    const result = await authService.loginWithSocial('Google', profile);

    done(null, result);
  },
);
