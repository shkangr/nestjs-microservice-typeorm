import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserDto } from './dto/user.dto'
import { Users } from './entities/users.entity'
import { UsersService } from './users.service'

const userArray = [
  {
    id: 1,
    name: 'name #1',
    username: 'username #1',
    email: 'test1@example.com',
    password: 'pass123',
  },
  {
    id: 2,
    name: 'name #2',
    username: 'username #2',
    email: 'test2@example.com',
    password: 'pass123',
  },
]

const oneUser = {
  id: 1,
  name: 'name #1',
  username: 'username #1',
  email: 'test@example.com',
  password: 'pass123',
}

const createUser: UserDto = {
  name: 'name #1',
  username: 'username #1',
  email: 'test@example.com',
  password: 'pass123',
}

const updateUserByEmail = {
  name: 'name #1',
  username: 'username #1',
  email: 'test@example.com',
  password: 'pass123',
}

const updateUserByPassword = {
  name: 'name #1',
  username: 'username #1',
  email: 'test@example.com',
  password: 'pass123',
}

const updateProfileUser = {
  name: 'name #1',
  username: 'username #1',
  email: 'test@example.com',
  password: 'pass123',
}

const updateUser = {
  id: 1,
  name: 'name #1 update',
  username: 'username #1 update',
  email: 'test@example.com',
  password: 'pass123',
}

describe('UsersService', () => {
  let service: UsersService
  let repository: Repository<Users>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(oneUser),
            findOneBy: jest.fn().mockReturnValue(oneUser),
            save: jest.fn().mockReturnValue(createUser),
            updateByEmail: jest.fn().mockResolvedValue(updateUserByEmail),
            updateByPassword: jest.fn().mockResolvedValue(updateUserByPassword),
            updateProfileUser: jest.fn().mockResolvedValue(updateProfileUser),
            update: jest.fn().mockReturnValue(updateUser),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get<Repository<Users>>(getRepositoryToken(Users))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll() method', () => {
    it('should return an array of all users', async () => {
      const users = await service.findAll()
      expect(users).toEqual(userArray)
    })
  })

  describe('findByEmail() method', () => {
    it('should find a user by email', async () => {
      expect(await service.findByEmail('test@example.com')).toEqual(oneUser)
    })

    it('should throw an exception if it not found a user by email', async () => {
      jest.spyOn(service, 'findByEmail').mockRejectedValueOnce(new NotFoundException('User test@example.com not found'))
      await expect(service.findByEmail('test@example.com')).rejects.toThrow(
        new NotFoundException('User test@example.com not found'),
      )
    })
  })

  describe('findById() method', () => {
    it('should find a user by id', async () => {
      expect(await service.findById('anyid')).toEqual(oneUser)
    })

    it('should throw an exception if it not found a user by id', async () => {
      jest.spyOn(service, 'findById').mockRejectedValueOnce(new NotFoundException('User anyid not found'))
      await expect(service.findById('anyid')).rejects.toThrow(new NotFoundException('User anyid not found'))
    })
  })
})
