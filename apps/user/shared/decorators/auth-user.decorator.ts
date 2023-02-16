import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const AuthUser = createParamDecorator(async (data: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  return data ? request.user?.[data] : request.user
})
