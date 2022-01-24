import { UseMiddleware } from 'type-graphql';

import { checkPermission } from '../middlewares/check-permission.middleware';
import { UserRole } from '@src/entities/user-meta.entity';

export const PermissionGuard = (roles: UserRole[], required = true) => {
  return UseMiddleware(checkPermission(roles, required));
};
