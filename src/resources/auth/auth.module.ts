import { Module } from '@nestjs/common'
import { EmailModule } from '../email/email.module'
import { RedisModule } from '../redis/redis.module'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [EmailModule, RedisModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
