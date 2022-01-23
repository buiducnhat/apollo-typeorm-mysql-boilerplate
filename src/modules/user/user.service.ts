import { Inject, Service } from 'typedi';
import { Repository } from 'typeorm';

import { User } from '@src/entities/user.entity';

@Service()
export default class UserService {
  serviceName: string;

  constructor(@Inject('userRepository') private userRepository: Repository<User>) {}

  public async getUser(userId: number | string) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.meta', 'meta')
      .leftJoinAndSelect('user.tasks', 'task')
      .where('user.id = :userId', { userId })
      .getOne();
  }
}
