import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma:PrismaService){}
 async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({data:createCategoryDto})
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

 async findAll() {
  try {
    return await this.prisma.category.findMany()
  } catch (error) {
    throw new InternalServerErrorException()
  }

  }

 async findOne(id: string) {
   try {
    let find = await this.prisma.category.findUnique({where:{id}})
    if(!find){
      return {message:"No data"}
    }
    return find
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }

 async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      let find = await this.prisma.category.findUnique({where:{id}})
      if(!find){
        return {message:"No data"}
      }
     return await this.prisma.category.update({where:{id},data:updateCategoryDto})
     } catch (error) {
      throw new InternalServerErrorException()
     }
  }

 async remove(id: string) {
    try {
      let find = await this.prisma.category.findUnique({where:{id}})
      if(!find){
        return {message:"No data"}
      }
     return await this.prisma.category.delete({where:{id}})
     } catch (error) {
      throw new InternalServerErrorException()
     }
  }
}
