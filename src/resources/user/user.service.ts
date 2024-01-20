import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { md5 } from '../../utils/md5'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  createUser(data: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: md5(data.email),
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        isAdmin: true,
      },
    })
  }

  async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    })
  }
}
