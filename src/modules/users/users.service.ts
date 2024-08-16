import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUser(): Promise<any> {
    return this.usersRepository.delete({
      id: 'clzv4nvbi0000lmni5tq6cdrk',
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
}
