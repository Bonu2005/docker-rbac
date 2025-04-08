import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private i =0
  getHello(): string {
    return 'Hello World!';
  }

  @Cron('* * * * * *')
  handleCron() {
    console.log(this.i++);
  }
}
