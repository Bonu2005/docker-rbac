import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule,MailModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
