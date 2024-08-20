import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { DeleteUserCommand } from '../impls/delete-user.command';
import { UsersRepository } from 'src/modules/users/users.repository';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: DeleteUserCommand): Promise<User> {
    const { id } = command;
    return this.usersRepository.delete({ id });
  }
}
