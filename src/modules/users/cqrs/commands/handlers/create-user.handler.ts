import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { UsersRepository } from 'src/modules/users/users.repository';
import { CreateUserCommand } from '../impls';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { email, password, name } = command.data;
    return this.usersRepository.create({
      email,
      password,
      name,
    });
  }
}
