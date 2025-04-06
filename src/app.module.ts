import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadsModule } from './uploads/uploads.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UploadsModule, ServeStaticModule.forRoot({rootPath:join(__dirname,"..","uploads"),serveRoot:'/file'})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
