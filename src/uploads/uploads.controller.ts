import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from "multer" 
import * as  path from 'path';
@Controller('uploads')
export class UploadsController {
  @Post()
 @UseInterceptors(
  FileInterceptor('image',{
    storage:diskStorage({ 
      destination:'./uploads',
      filename(res,file ,cb){
        const filename = `${Date.now()}-${Math.random()*8}${path.extname(file.originalname)}`
        cb(null,filename)
      }
    })
  })

 )
 UploadedFile(@UploadedFile() file:Express.Multer.File){
  console.log(1);
  
  return {filename:`http://localhost:3000/file/${file.filename}`}
}
}
