import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient } from 'redis'
import { RedisService } from './redis.service'

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const redisClient = createClient({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            passphrase: configService.get('REDIS_passphrase'),
          },
        })
        return redisClient.connect()
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
