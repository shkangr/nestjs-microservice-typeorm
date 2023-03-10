import { Module } from '@nestjs/common'
import { ForgotPasswordService } from './forgot-password.service'
import { ForgotPasswordController } from './forgot-password.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from '../users/entities/users.entity'
import { UsersService } from '../users/users.service'
import { UtilsModule } from '../shared/utils/utils.module'
import { BcryptService } from '../shared/hashing/bcrypt.service'
import { HashingService } from '../shared/hashing/hashing.service'

@Module({
  imports: [TypeOrmModule.forFeature([Users]), UtilsModule],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    ForgotPasswordService,
    UsersService,
  ],
  controllers: [ForgotPasswordController],
})
export class ForgotPasswordModule {}
