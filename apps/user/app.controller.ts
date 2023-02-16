import { Controller, Get, Header, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AuthUser } from './shared/decorators/auth-user.decorator'
import { IUsers } from './users/interfaces/users.interface'
import { JwtAuthGuard } from './login/guard/jwt-auth.guard'
import { Authentication, AuthenticationType } from './shared/decorators/authentication.decorator'

@Controller()
@Authentication(AuthenticationType.PUBLIC)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  getHello() {
    return {
      message: 'hello world',
    }
  }

  @ApiBearerAuth()
  @Authentication(AuthenticationType.PRIVATE)
  @UseGuards(JwtAuthGuard)
  @Get('secure')
  @HttpCode(HttpStatus.OK)
  async getProtectedResource(@AuthUser() user: IUsers) {
    console.log('AuthUser -- ', user)
    return await this.appService.getSecureResource()
  }
}
