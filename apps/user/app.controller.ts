import { Controller, Get, Res, HttpStatus, UseGuards, HttpCode, Header } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AuthUser } from './shared/decorators/auth-user.decorator'
import { IUsers } from './users/interfaces/users.interface'

@Controller()
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
  @UseGuards(AuthGuard('jwt'))
  @Get('secure')
  @HttpCode(HttpStatus.NO_CONTENT)
  async getProtectedResource(@AuthUser() user: IUsers) {
    return await this.appService.getSecureResource()
  }
}
