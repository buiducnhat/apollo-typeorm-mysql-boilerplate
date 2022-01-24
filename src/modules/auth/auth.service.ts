import { Service, Inject, Container } from 'typedi';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as FacebookProfile } from 'passport-facebook';

import { User } from '@src/entities/user.entity';
import { UserMeta, UserRole } from '@src/entities/user-meta.entity';
import config from '@src/config';

type SocialProvider = 'Google' | 'Facebook';

@Service()
export default class AuthService {
  constructor(
    @Inject('userRepository') private userRepository: Repository<User>,
    @Inject('userMetaRepository') private userMetaRepository: Repository<UserMeta>,
  ) {}

  public async loginWithSocial(
    socialProvider: SocialProvider,
    profile: GoogleProfile | FacebookProfile,
  ) {
    try {
      const userFoundQb = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.meta', 'userMeta')
        .leftJoinAndSelect('user.tasks', 'task');
      if (socialProvider === 'Google') {
        userFoundQb.where('userMeta.googleId = :googleId', { googleId: profile.id });
      } else if (socialProvider === 'Facebook') {
        userFoundQb.where('userMeta.facebookId = :facebookId', { facebookId: profile.id });
      }

      const userFound = await userFoundQb.getOne();
      if (!!userFound) {
        return {
          token: this.generateJWT(userFound),
          user: userFound,
        };
      } else {
        return this.registerWithSocial(socialProvider, profile);
      }
    } catch (error) {}
  }

  public async registerWithSocial(
    socialProvider: SocialProvider,
    profile: GoogleProfile | FacebookProfile,
  ) {
    const userMeta = new UserMeta();
    if (socialProvider === 'Facebook') {
      userMeta.facebookId = profile.id;
    } else if (socialProvider === 'Google') {
      userMeta.googleId = profile.id;
    }

    let user = this.userRepository.create({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatar: profile.photos[0].value,
      meta: userMeta,
    });
    user = await this.userRepository.save(user);

    return {
      token: this.generateJWT(user),
      user,
    };
  }

  public async checkExistUser(email: string): Promise<boolean> {
    const userCount = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getCount();

    return userCount > 0;
  }

  public generateJWT(user: Partial<User>, isLongExpire = false): string {
    return jwt.sign(
      {
        userId: user.id,
      },
      config.jwt.jwtSecret,
      {
        algorithm: config.jwt.jwtAlgorithm,
        expiresIn: isLongExpire ? config.jwt.jwtExpireTimeLong : config.jwt.jwtExpireTimeNormal,
      },
    );
  }
}
