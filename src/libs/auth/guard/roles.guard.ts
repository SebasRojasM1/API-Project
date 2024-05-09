/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/enums/rol.enum';
import { ROLES_KEY } from '../../decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true; // Si no hay roles definidos, se permite el acceso
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Supongamos que el usuario está disponible en la solicitud

    // Verificar si el usuario tiene al menos uno de los roles requeridos
    return roles.some((role: any) => user.roles.includes(role));
  }
}
