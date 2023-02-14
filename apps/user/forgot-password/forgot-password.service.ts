import { Injectable, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from '../users/entities/users.entity'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { UtilsService } from '../shared/utils/utils.service'
import { HashingService } from '../shared/hashing/hashing.service'

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly utilsService: UtilsService,
    private readonly hashingService: HashingService,
  ) {}

  public async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const userUpdate = await this.userRepository.findOneBy({
      email: forgotPasswordDto.email,
    })
    const passwordRand = this.utilsService.generatePassword()
    userUpdate.password = await this.hashingService.hash(passwordRand)

    return await this.userRepository.save(userUpdate)
  }
}
