import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { USER_MESSAGES } from 'src/messages';
import { UsersRepository } from 'src/modules/users/users.repository';
import { EncryptHelper, ErrorHelper } from 'src/utils';
import { ChangePasswordCommand } from '../impls/change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: ChangePasswordCommand): Promise<{ message: string }> {
    const { userId } = command;
    const { password, newPassword } = command.payload;

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      ErrorHelper.NotFoundException(USER_MESSAGES.USER_NOT_FOUND);
    }

    const isPasswordMatch = EncryptHelper.compare(password, user.password);
    if (!isPasswordMatch) {
      ErrorHelper.BadRequestException(USER_MESSAGES.OLD_PASSWORD_NOT_MATCH);
    }

    await this.usersRepository.update({
      where: { id: userId },
      data: { password: newPassword },
    });

    return { message: USER_MESSAGES.USER_CHANGED_PASSWORD };
  }
}
