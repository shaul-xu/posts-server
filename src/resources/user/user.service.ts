import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { md5 } from '../../utils/md5'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const { password, ...rest } = await this.prismaService.user.create({
      data: {
        ...data,
        password: md5(data.password),
      },
    })
    return rest
  }

  async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const user = await this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    })
    if (user) {
      const { password, ...rest } = user
      return rest
    }
    return null
  }
}
