import passport from 'passport';

import { jwtStrategy } from './strategies/jwt.strategy';
import { googleStrategy } from './strategies/google.strategy';
import { facebookStrategy } from './strategies/facebook.strategy';

passport.use(jwtStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

export default passport;
