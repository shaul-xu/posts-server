import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ExpressRequest } from '../types'

declare module 'express-session' {
  interface Session {
    user:
      | {
          id: number
          isAdmin: boolean
        }
      | undefined
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<ExpressRequest>()
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    if (!request.session.user) {
      throw new UnauthorizedException()
    }

    return true
  }
}
