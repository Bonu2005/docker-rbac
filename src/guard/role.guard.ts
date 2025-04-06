import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@prisma/client';
import { Observable } from 'rxjs';
import { RolesKey } from 'src/decorators/role.decorator';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
  let requiredRole = this.reflector.getAllAndOverride(RolesKey,[context.getHandler(),context.getClass()])
  if(this.reflector){
    return true
  }
  try {
    let {user}=context.switchToHttp().getRequest()
    return requiredRole.some((role:Roles)=>user.type(role))
  } catch (error) {
    throw new UnauthorizedException()
  }
  }
}
