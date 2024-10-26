import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorator/role-protected.decorator';

@Injectable()
export class UseRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Here we get the roles settled in @RoleProtected decorator
    const validRoles: string[] = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );

    // If none roles were sent, then nothing is validated
    if (!validRoles || validRoles.length === 0) {
      return true;
    }

    // If we don't use @Auth() decorator, this request won't contain the logged in user
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { roles } = user;

    if (!roles.some((role: string) => validRoles.includes(role))) {
      throw new ForbiddenException(
        `User ${user.fullName} need a valid role: [${validRoles}]`,
      );
    }

    return true;
  }
}
