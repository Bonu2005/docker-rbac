import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    try {
      return await this.prisma.user.findMany()
    } catch (error) {
      throw new InternalServerErrorException()
    }

  }

  async findOne(id: string) {
    try {
      let find = await this.prisma.user.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data" }
      }
      return find
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let find = await this.prisma.user.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data" }
      }
      return await this.prisma.user.update({ where: { id }, data: updateUserDto })
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: string) {
    try {
      let find = await this.prisma.user.findUnique({ where: { id } })
      if (!find) {
        return { message: "No data" }
      }
      return await this.prisma.user.delete({ where: { id } })
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
