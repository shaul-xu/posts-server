import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import RedisStore from 'connect-redis'
import * as session from 'express-session'
import { RedisClientType } from 'redis'
import { AppModule } from './app.module'
import { HttpExecptionFilter } from './filters/http-execption.filter'
import { AuthGuard } from './guards/auth.guard'
import { ResponseTransformerInterceptor } from './interceptors/response-transformer.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('/api')

  const configService = app.get(ConfigService)
  const redisClient = app.get<RedisClientType>('REDIS_CLIENT')

  app.useGlobalGuards(new AuthGuard(new Reflector()))

  app.use(
    session({
      rolling: true,
      resave: false,
      saveUninitialized: false,
      secret: configService.get('SESSION_SECRET')!,
      name: 'x',
      cookie: {
        maxAge:
          parseInt(configService.get<string>('SESSION_MAX_AGE')!, 10) ||
          1000 * 60 * 60 * 24,
      },
      store: new RedisStore({ client: redisClient, prefix: 'session_' }),
    }),
  )

  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true, whitelist: true }),
  )

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
    new ResponseTransformerInterceptor(),
  )

  app.useGlobalFilters(new HttpExecptionFilter())

  const port = configService.get<number>('PORT') || 3000

  await app.init()

  await app.listen(port, () => console.log(`Server is running on port ${port}`))
}
bootstrap()
