import { Request } from 'express';

import { User } from '@src/entities/user.entity';

export interface Context {
  req: Request & {
    user: User;
  };
}
