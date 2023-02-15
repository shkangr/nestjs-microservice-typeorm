import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ExtractJwt } from 'passport-jwt'
import * as jwt from 'jsonwebtoken'

export const AuthUser = createParamDecorator(async (data: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

  const jwtWebToken = jwtFromRequest(request)

  const authUser = jwt.verify(jwtWebToken, process.env.JWT_SECRET_KEY)

  return authUser || undefined
})
