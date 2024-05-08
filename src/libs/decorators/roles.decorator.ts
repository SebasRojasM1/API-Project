import { Role } from '../common/enums/rol.enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (role: Role) => SetMetadata('roles', role);
