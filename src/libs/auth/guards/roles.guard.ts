// import { Injectable, ExecutionContext, Logger, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';
// import { Role } from 'src/libs/common/enums/rol.enum'
// import { ROLES_KEY } from '../../decorators/roles.decorator';


// @Injectable()
// export class AtGuard extends AuthGuard('jwt') {
//   private readonly logger = new Logger(AtGuard.name);


//   constructor(private reflector: Reflector) {
//     super();
//   }

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getClass()) || [];

//     if (!roles) {
//       return true; // Si no hay roles definidos, se permite el acceso
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user; // Supongamos que el usuario está disponible en la solicitud

//     // Verificar si el usuario tiene al menos uno de los roles requeridos
//     return roles.some((role: any) => user.roles.includes(role));
//   }

//   handleRequest(err: any, user: any, info: Error) {
//     if (err || info) {
//       this.logger.error(`JWT error: ${info.message || err}`);
//       throw new HttpException('Token is expired!', HttpStatus.UNAUTHORIZED);
//     }

//     if (!user) {
//       this.logger.warn('Access Denied: Unauthorized access attempt');
//       throw new UnauthorizedException('Access Denied.');
//     }

//     return user;
//   }
// }