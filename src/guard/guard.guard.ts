import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class GuardGuard implements CanActivate {
  constructor(private jwt:JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req:Request = context.switchToHttp().getRequest()
    let token = req.headers.authorization?.split(" ")[1]
    if(!token){
      throw new UnauthorizedException()
    }
    try {
      let user = this.jwt.verify(token,{secret:"accessToken"})
      req["data"]=user
    } catch (error) {
      
    }
    return true;
  }
}
