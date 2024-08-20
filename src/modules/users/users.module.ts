import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../prisma';

import {
  ChangePasswordHandler,
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
} from './cqrs/commands';
import {
  GetUserByEmailHandler,
  GetUserByIdHandler,
  GetUserProfileHandler,
} from './cqrs/queries';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const QueryHandlers = [
  GetUserByEmailHandler,
  GetUserByIdHandler,
  GetUserProfileHandler,
];
const CommandHandlers = [
  CreateUserHandler,
  ChangePasswordHandler,
  DeleteUserHandler,
  UpdateUserHandler,
];
@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [UsersController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    UsersService,
    UsersRepository,
  ],
  exports: [UsersService],
})
export class UsersModule {}
