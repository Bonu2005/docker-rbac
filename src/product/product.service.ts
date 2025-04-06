import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma:PrismaService){}
 async create(createProductDto: CreateProductDto) {
     try {
          return await this.prisma.product.create({data:createProductDto})
        } catch (error) {
          throw new InternalServerErrorException()
        }
  }

 async findAll() {
    try {
      return await this.prisma.product.findMany()
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

 async findOne(id: string) {
  try {
    let find = await this.prisma.product.findUnique({where:{id}})
    if(!find){
      return {message:"No data"}
    }
    return find
   } catch (error) {
    throw new InternalServerErrorException()
   }
  }

 async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      let find = await this.prisma.product.findUnique({where:{id}})
      if(!find){
        return {message:"No data"}
      }
     return await this.prisma.product.update({where:{id},data:updateProductDto})
     } catch (error) {
      throw new InternalServerErrorException()
     }
  }

 async remove(id: string) {
    try {
      let find = await this.prisma.product.findUnique({where:{id}})
      if(!find){
        return {message:"No data"}
      }
     return await this.prisma.product.delete({where:{id}})
     } catch (error) {
      throw new InternalServerErrorException()
     }
  }
}
