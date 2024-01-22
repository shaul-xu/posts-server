import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('/api')

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  )

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT') || 3000

  await app.listen(port, () => console.log(`Server is running on port ${port}`))
}
bootstrap()
