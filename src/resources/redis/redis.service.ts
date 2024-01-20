import { Inject, Injectable } from '@nestjs/common'
import { RedisClientType } from 'redis'

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType

  get(...params: Parameters<RedisClientType['get']>) {
    return this.redisClient.get(...params)
  }

  set(...params: Parameters<RedisClientType['set']>) {
    return this.redisClient.set(...params)
  }

  del(...params: Parameters<RedisClientType['del']>) {
    return this.redisClient.del(...params)
  }
}
