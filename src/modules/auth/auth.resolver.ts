import Container, { Service, Inject } from 'typedi';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import * as _ from 'lodash';

import { User } from '@src/entities/user.entity';
import { Context } from '@src/types/context.interface';
import { LoginInputDto, LoginResponseDto } from './dto/login.dto';
import { RegisterInputDto, RegisterResponseDto } from './dto/register.dto';
import { randomBytes } from 'crypto';
import { convertDto } from '@src/utils/common.util';
import { UserMeta, UserRole } from '@src/entities/user-meta.entity';
import { AuthGuard } from './guards/auth.guard';
import AuthService from './auth.service';

@Service()
@Resolver(() => User)
export class AuthResolver {
  authService: AuthService;

  constructor(
    @Inject('userRepository') private userRepository: Repository<User>,
    @Inject('userMetaRepository') private userMetaRepository: Repository<UserMeta>,
  ) {
    this.authService = Container.get(AuthService);
  }

  @Query(() => User)
  @AuthGuard()
  public async me(@Ctx() { user }: Context): Promise<User> {
    return user;
  }

  @Mutation(() => LoginResponseDto)
  public async login(@Arg('data') loginInputDto: LoginInputDto): Promise<LoginResponseDto> {
    const { email, password } = loginInputDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .leftJoinAndSelect('user.meta', 'meta')
      .leftJoinAndSelect('user.tasks', 'task')
      .getOne();
    if (!user) {
      throw Error('User with email not found');
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      throw Error('Wrong password');
    }

    return {
      token: this.authService.generateJWT(user, loginInputDto.remember),
      user: _.omit(user, ['password']),
    };
  }

  @Mutation(() => RegisterResponseDto)
  public async register(
    @Arg('data') registerInputDto: RegisterInputDto,
  ): Promise<RegisterResponseDto> {
    if (await this.authService.checkExistUser(registerInputDto.email)) {
      throw Error('This email already exists');
    }

    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(registerInputDto.password, { salt });

    const newUser: User = new User();
    convertDto(registerInputDto, newUser);

    newUser.password = hashedPassword;

    const userMeta = this.userMetaRepository.create({
      isVerifiedEmail: false,
      isVerifiedPhone: false,
      role: UserRole.NORMAL,
    });
    newUser.meta = userMeta;
    newUser.tasks = [];

    const user = await this.userRepository.save(newUser);
    if (!user) {
      throw Error('Internal server error');
    }
    return {
      token: this.authService.generateJWT(user),
      user: _.omit(user, ['password']),
    };
  }
}
