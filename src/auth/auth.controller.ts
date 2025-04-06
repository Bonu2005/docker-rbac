import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  sendOtp(@Body() email: string) {
    return this.authService.sendOtp(email);
  }

  @Post()
  verify(@Body('otp') otp: string,@Body('email') email: string) {
    return this.authService.verify(otp,email);
  }

  @Post()
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post()
  login(@Body() loginAuthDto:LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
  
  
  @Post()
  refreshToken(@Req() req:Request) {
    return this.authService.refreshToken(req);
  }
}
