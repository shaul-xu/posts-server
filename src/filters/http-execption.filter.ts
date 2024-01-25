import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { ExpressResponse } from '../types'

@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<ExpressResponse>()
    const status = exception.getStatus()

    const { message } = exception.getResponse() as any
    response.status(status).json({
      code: status,
      message,
    })
  }
}
