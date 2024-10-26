import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';
import { UseRoleGuard } from '../guards/use-role.guard';
import { ValidRoles } from '../enum/valid_roles.enum';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(
      // Functions that receives Guards
      AuthGuard(), // This Guard (from @nestjs/passport library) uses the JwtStrategy to validate the token
      UseRoleGuard, // This is one of custom Guards (the implementation is few lines below)
    ),
  );
}
