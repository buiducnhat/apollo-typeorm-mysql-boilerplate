import { Container } from 'typedi';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import config from '@src/config';
import { User } from '@src/entities/user.entity';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.jwtSecret,
  algorithms: [config.jwt.jwtAlgorithm],
};

export const jwtStrategy = new Strategy(options, async (payload, done) => {
  const { userId }: { userId: number } = payload;
  try {
    const userRepository: Repository<User> = Container.get('userRepository');

    const user = await userRepository.findOne(userId);
    if (!user) {
      return done(null, false, new Error('Verification failed'));
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});
