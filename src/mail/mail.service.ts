import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer"

@Injectable()
export class MailService {
  private transpoter:any
  constructor(){
    this.transpoter= nodemailer.createTransport({
      service:"icloud",
      auth:{
        user:"booonu@icloud.com",
        pass:"nwxt-abvf-oeiv-avpl"
      }

    })
  }
  async sendMessage(to:string,subject:string,message:string){
    let messag = this.transpoter.sendMail({
      from:"booonu@icloud.com",
      to,
      text:message,
      subject
    })
    return messag
  }
}
