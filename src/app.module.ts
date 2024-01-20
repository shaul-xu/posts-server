import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './resources/auth/auth.module'
import { UserModule } from './resources/user/user.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule],
})
export class AppModule {}
