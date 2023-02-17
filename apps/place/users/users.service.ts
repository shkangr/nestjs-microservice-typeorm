import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common'
import { Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from './entities/users.entity'
import { IUsers } from './interfaces/users.interface'
import { UserDto } from './dto/user.dto'
import { UserUpdateDto } from './dto/user-update.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  public async findAll(): Promise<Users[]> {
    return await this.userRepository.find()
  }

  public async findByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    })

    if (!user) {
      throw new NotFoundException(`User ${email} not found`)
    }

    return user
  }

  public async findById(userId: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({
      id: +userId,
    })

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`)
    }

    return user
  }

  public async create(request: UserDto): Promise<IUsers> {
    const creatableUser = this.userRepository.create(request)
    return await this.userRepository.save(creatableUser)
  }

  public async updateUser(id: string, userUpdateDto: UserUpdateDto): Promise<UpdateResult> {
    try {
      const user = await this.userRepository.update(
        {
          id: +id,
        },
        { ...userUpdateDto },
      )

      if (!user) {
        throw new NotFoundException(`User #${id} does not exist`)
      }

      return user
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }

  public async deleteUser(id: string): Promise<void> {
    const user = await this.findById(id)
    await this.userRepository.remove(user)
  }
}
