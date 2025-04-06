import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import  {totp} from "otplib"
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthService {
  constructor(private prisma:PrismaService,private mail:MailService,private jwt:JwtService){
    totp.options = { step: 600 }
  }
 async sendOtp(email:string) {
   let genotp = totp.generate(`${email}secret`)
   await this.mail.sendMessage(email,"Verify accaunt",genotp)
   return {message:"Verify accaunt"}
  }

  verify(otp: string, email: string){
   try {
    let ver=totp.check(otp, `${email}secret`)
    if(!ver){
      return {message:"Wrong otp"}
    }
    return { message: "Your email verifiyed ✅" }
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }

 async register(createAuthDto: CreateAuthDto) {
    try {
      let {password}= createAuthDto
      let hash = bcrypt.hashSync(password,10)
      let created = await this.prisma.user.create({data:{...createAuthDto,password:hash,role:"USER"}})

    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

 async login(loginAuthDto:LoginAuthDto) {
    try {
      let {password,email}= loginAuthDto
      let find = await this.prisma.user.findFirst({where:{email}})
      if(!find){
        return {message:"User not found"}
      }
      let match = bcrypt.compareSync(password,find.password)
      if(!match){
        return {message:"Wrong credentials"}
      }
      return { accessToken: this.genereteAccessToken({ id: find.id, type: find.role }), refreshToken: this.genereteRefreshToken({ id: find.id, type: find.role }) }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  refreshToken(req: Request) {
    let { id, type } = req['user']
    return { accessToken: this.genereteRefreshToken({ id, type }), refreshToken: this.genereteAccessToken({ id, type }) }
  }
  genereteAccessToken(paylod: any) {
    return this.jwt.sign(paylod, {
      secret: "accessToken",
      expiresIn: "15m"
    })
  }
  genereteRefreshToken(paylod: any) {
    return this.jwt.sign(paylod, {
      secret: "refreshToken",
      expiresIn: "7d"
    })
  }

}
