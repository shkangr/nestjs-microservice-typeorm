import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { AuthenticationType, IS_AUTHENTICATION_KEY } from '../../shared/decorators/authentication.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    const authenticationType = this.reflector.getAllAndOverride<AuthenticationType | string>(IS_AUTHENTICATION_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (authenticationType === AuthenticationType.PUBLIC) {
      return true
    }

    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
