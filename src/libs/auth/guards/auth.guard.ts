/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "src/libs/common/enums/rol.enum";
import { ROLES_KEY } from "src/libs/decorators";


@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
    private readonly logger = new Logger(RolesGuard.name);

    constructor(private reflector: Reflector) {
      super();
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      await super.canActivate(context);
      const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
      if (!roles) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      return roles.includes(user.role);
    }

  handleRequest(err, user, info: Error) {
    if (err || info) {
      console.error(`Error de JWT: ${info?.message || err}`);
      throw new UnauthorizedException(
        'The Access Token is invalid or has expired.',
      );
    }
    if (!user) {
      this.logger.warn('Access denied: Unauthorized access attempt.');
      throw new UnauthorizedException('Access denied.');
    }
    return user;
  }
}