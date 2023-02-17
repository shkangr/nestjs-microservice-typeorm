import { Controller, Get, Header, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiBearerAuth } from '@nestjs/swagger'

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
  @Get('secure')
  @HttpCode(HttpStatus.OK)
  async getProtectedResource() {
    return await this.appService.getSecureResource()
  }
}
