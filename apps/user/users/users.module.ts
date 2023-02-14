import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './entities/users.entity'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { BcryptService } from '../shared/hashing/bcrypt.service'
import { HashingService } from '../shared/hashing/hashing.service'

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    UsersService,
  ],
})
export class UsersModule {}
