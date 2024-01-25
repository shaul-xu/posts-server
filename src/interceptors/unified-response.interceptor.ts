import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { map } from 'rxjs'
import { ExpressResponse } from '../types'

export class UnifiedResponseInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const response = ctx.switchToHttp().getResponse<ExpressResponse>()
    const { statusCode } = response

    return next.handle().pipe(
      map((data) => {
        return {
          data: data ?? null,
          code: statusCode,
          message: 'ok',
        }
      }),
    )
  }
}
