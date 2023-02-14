import { Injectable, Logger } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { IUsers } from '../users/interfaces/users.interface'
import { HashingService } from '../shared/hashing/hashing.service'

@Injectable()
export class RegisterService {
  constructor(private readonly usersService: UsersService, private readonly hashingService: HashingService) {}

  public async register(request: RegisterUserDto): Promise<IUsers> {
    Logger.log('RegisterService.regiester.request', request)
    request.password = await this.hashingService.hash(request.password)
    return this.usersService.create(request)
  }
}
