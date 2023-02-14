import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'
import { UsersService } from '../users/users.service'
import { Users } from '../users/entities/users.entity'
import { BcryptService } from '../shared/hashing/bcrypt.service'
import { HashingService } from '../shared/hashing/hashing.service'

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [RegisterController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    RegisterService,
    UsersService,
  ],
})
export class RegisterModule {}
