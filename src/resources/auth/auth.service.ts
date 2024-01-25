import { BadRequestException, Injectable } from '@nestjs/common'
import { isEmail } from 'class-validator'
import { ExpressRequest } from '../../types'
import { generateRamdomString } from '../../utils/generate-ramdom-string'
import { md5 } from '../../utils/md5'
import { EmailService } from '../email/email.service'
import { RedisService } from '../redis/redis.service'
import { UserService } from '../user/user.service'
import { LoginDto, RegisterDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private emailService: EmailService,
    private redisService: RedisService,
    private userService: UserService,
  ) {}

  private getRedisKey(email: string) {
    const redisKeyPrefix = 'registerCode_'
    return `${redisKeyPrefix}${email}`
  }

  async sendCode(to: string) {
    if (!isEmail(to)) {
      throw new BadRequestException('邮箱格式不正确')
    }
    const minnutes = 15
    const redisKey = this.getRedisKey(to)

    const code = generateRamdomString()

    await this.emailService.sendEmail({
      to,
      subject: '注册验证码',
      text: `您的注册验证码是：${code}，验证码有效期为 ${minnutes} 分钟`,
    })

    await this.redisService.set(redisKey, code, { EX: 60 * minnutes })
  }

  async register(data: RegisterDto) {
    const redisKey = this.getRedisKey(data.email)
    const redisValue = await this.redisService.get(redisKey)
    const { code, ...rest } = data

    if (redisValue !== code) {
      throw new BadRequestException('验证码不正确')
    }

    const existUser = await this.userService.findUser({ email: data.email })

    if (existUser) {
      throw new BadRequestException('用户已存在')
    }

    const user = await this.userService.createUser(rest)
    await this.redisService.del(redisKey)
    return user
  }

  async login(data: LoginDto, req: ExpressRequest) {
    const existUser = await this.userService.findUser({
      email: data.email,
      password: md5(data.password),
    })
    if (!existUser) {
      throw new BadRequestException('密码错误')
    }
    req.session.user = {
      id: existUser.id,
      isAdmin: existUser.isAdmin,
    }
  }
}
