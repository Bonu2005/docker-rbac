import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(private prisma:PrismaService){}
 async create(createColorDto: CreateColorDto) {
     try {
          return await this.prisma.color.create({data:createColorDto})
        } catch (error) {
          throw new InternalServerErrorException()
        }
  }

 async findAll() {
  try {
    return await this.prisma.color.findMany()
  } catch (error) {
    throw new InternalServerErrorException()
  }
  }

 async findOne(id: string) {
  try {
    let find = await this.prisma.color.findUnique({where:{id}})
    if(!find){
      return {message:"No data"}
    }
    return find
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }

 async update(id: string, updateColorDto: UpdateColorDto) {
  try {
    let find = await this.prisma.color.findUnique({where:{id}})
    if(!find){
      return {message:"No data"}
    }
   return await this.prisma.color.update({where:{id},data:updateColorDto})
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }

 async remove(id: string) {
  try {
    let find = await this.prisma.color.findUnique({where:{id}})
    if(!find){
      return {message:"No data"}
    }
   return await this.prisma.color.delete({where:{id}})
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }
}
