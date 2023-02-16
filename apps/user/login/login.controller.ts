import { Controller, Post, Body } from '@nestjs/common'
import { LoginService } from './login.service'
import { LoginDto } from './dto/login.dto'
import { ApiTags } from '@nestjs/swagger'
import { Authentication, AuthenticationType } from '../shared/decorators/authentication.decorator'

@ApiTags('auth')
@Controller('auth/login')
@Authentication(AuthenticationType.PUBLIC)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  public async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.loginService.login(loginDto)
  }
}
