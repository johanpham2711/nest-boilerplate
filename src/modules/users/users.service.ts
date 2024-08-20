import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Prisma, User } from '@prisma/client';
import {
  ChangePasswordCommand,
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
} from './cqrs/commands/impls';
import {
  GetUserByEmailQuery,
  GetUserByIdQuery,
  GetUserProfileQuery,
} from './cqrs/queries/impls';
import { ChangePasswordDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(data));
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.commandBus.execute(new UpdateUserCommand(id, data));
  }

  async changePassword(
    id: string,
    payload: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return this.commandBus.execute(new ChangePasswordCommand(id, payload));
  }

  async deleteUser(id: string): Promise<User> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }

  async getUserById(id: string): Promise<User> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  async getUserProfile(id: string): Promise<Partial<User>> {
    return this.queryBus.execute(new GetUserProfileQuery(id));
  }
}
