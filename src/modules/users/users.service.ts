import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUser(): Promise<any> {
    return this.usersRepository.delete({
      id: 'clzv4nvbi0000lmni5tq6cdrk',
    });
  }
}
