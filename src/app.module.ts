import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadsModule } from './uploads/uploads.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ColorModule } from './color/color.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UploadsModule, ServeStaticModule.forRoot({rootPath:join(__dirname,"..","uploads"),serveRoot:'/file'}), AuthModule, PrismaModule, CategoryModule, ProductModule, ColorModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
