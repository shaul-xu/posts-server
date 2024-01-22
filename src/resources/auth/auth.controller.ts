import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { isEmail } from 'class-validator'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('code')
  sendCode(@Body() data: { email: string }) {
    if (!isEmail(data.email)) {
      throw new BadRequestException('邮箱格式不正确')
    }
    return this.authService.sendCode(data.email)
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data)
  }
}
