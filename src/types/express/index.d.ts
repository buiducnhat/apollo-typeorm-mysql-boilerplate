import { User as UserEntity } from '@src/entities/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: Partial<UserEntity>;
      hasPermission?: boolean;
    }
  }
}
