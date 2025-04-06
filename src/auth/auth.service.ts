import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  sendOtp(id: number) {
    return `This action returns a #${id} auth`;
  }

  verify(id: number, updateAuthDto: UpdateAuthDto){
    return `This action updates a #${id} auth`;
  }

  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  login() {
    return `This action returns all auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
