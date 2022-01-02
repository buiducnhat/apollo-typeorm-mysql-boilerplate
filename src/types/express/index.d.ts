import { User as UserEntity } from '@src/entities/User';

declare global {
  namespace Express {
    export interface Request {
      token: {
        id: string;
      };
      currentUser: Omit<UserEntity, 'password' | 'salt'>;
    }
  }
}
