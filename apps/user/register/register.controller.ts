import { Controller, Post, Body, Res, HttpStatus, HttpCode } from '@nestjs/common'
import { RegisterService } from './register.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger'
import { IUsers } from '../users/interfaces/users.interface'
import { UserDto } from '../users/dto/user.dto'

@ApiTags('auth')
@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() registerUserDto: RegisterUserDto): Promise<IUsers> {
    return await this.registerService.register(registerUserDto)
  }
}
