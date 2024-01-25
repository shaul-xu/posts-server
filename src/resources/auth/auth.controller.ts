import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Session,
} from '@nestjs/common'
import { isEmail } from 'class-validator'
import { Public } from '../../decorators/public.decorator'
import { ExpressRequest, ExpressSession } from '../../types'
import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './dto/auth.dto'

@Public()
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

  @Post('login')
  async login(@Body() data: LoginDto, @Req() req: ExpressRequest) {
    return this.authService.login(data, req)
  }

  @Public(false)
  @Post('logout')
  async logout(@Session() session: ExpressSession) {
    session.cookie.maxAge = 0
  }
}
