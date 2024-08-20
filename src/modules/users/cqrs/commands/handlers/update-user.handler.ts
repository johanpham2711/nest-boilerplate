import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UpdateUserCommand } from '../impls/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, data } = command;
    return this.usersRepository.update({
      where: { id },
      data,
    });
  }
}
