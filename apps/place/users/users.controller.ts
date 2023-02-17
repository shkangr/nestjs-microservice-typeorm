import {
  Controller,
  Put,
  Get,
  Body,
  Res,
  Param,
  UseGuards,
  HttpStatus,
  NotFoundException,
  Delete,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthGuard } from '@nestjs/passport'
import { IUsers } from './interfaces/users.interface'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAllUser(): Promise<IUsers[]> {
    return this.usersService.findAll()
  }

  @Get('/:userId')
  public async findOneUser(@Param('userId') userId: string): Promise<IUsers> {
    return this.usersService.findById(userId)
  }
}
