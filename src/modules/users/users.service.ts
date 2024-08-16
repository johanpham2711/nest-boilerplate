import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { TUser } from 'src/interfaces';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.usersRepository.create(data);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getUserProfile(user: TUser): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
