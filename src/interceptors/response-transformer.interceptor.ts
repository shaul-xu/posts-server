import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { map } from 'rxjs'

export class ResponseTransformerInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        return {
          data: data ?? null,
          code: 200,
          message: 'ok',
        }
      }),
    )
  }
}
